import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    // Extract IP and User-Agent for security logging
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Helper function to log security events
    const logSecurityEvent = async (eventType: string, eventDetails: any, phoneNumber?: string) => {
      try {
        await supabase.from("security_logs").insert({
          user_id: user.id,
          event_type: eventType,
          event_details: eventDetails,
          phone_number: phoneNumber,
          ip_address: ipAddress,
          user_agent: userAgent,
        });
      } catch (error) {
        console.error("Failed to log security event:", error);
      }
    };

    const { action, phoneNumber, otpCode } = await req.json();

    if (action === "send") {
      // Rate limiting: Check if user has requested OTP in the last 60 seconds
      const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
      const { data: recentOtps, error: recentError } = await supabase
        .from("sms_otp_codes")
        .select("created_at")
        .eq("user_id", user.id)
        .eq("phone_number", phoneNumber)
        .gt("created_at", oneMinuteAgo)
        .order("created_at", { ascending: false })
        .limit(1);

      if (recentError) {
        console.error("Error checking recent OTPs:", recentError);
      }

      if (recentOtps && recentOtps.length > 0) {
        const secondsSinceLastRequest = Math.floor(
          (Date.now() - new Date(recentOtps[0].created_at).getTime()) / 1000
        );
        const waitTime = 60 - secondsSinceLastRequest;
        
        await logSecurityEvent("rate_limit_exceeded", {
          reason: "Too many OTP requests within 60 seconds",
          wait_time: waitTime,
        }, phoneNumber);
        
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Please wait ${waitTime} seconds before requesting another code` 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          }
        );
      }

      // Check daily limit: Max 5 OTP requests per phone per day
      const oneDayAgo = new Date(Date.now() - 86400000).toISOString();
      const { count: dailyCount, error: countError } = await supabase
        .from("sms_otp_codes")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("phone_number", phoneNumber)
        .gt("created_at", oneDayAgo);

      if (countError) {
        console.error("Error checking daily limit:", countError);
      }

      if (dailyCount && dailyCount >= 5) {
        await logSecurityEvent("daily_limit_exceeded", {
          reason: "Maximum 5 OTP requests reached for phone number in 24 hours",
          attempts_count: dailyCount,
        }, phoneNumber);

        return new Response(
          JSON.stringify({ 
            success: false, 
            error: "Daily SMS limit reached. Please try again tomorrow or use email verification." 
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 429,
          }
        );
      }

      // Generate 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      // Store OTP in database
      const { error: insertError } = await supabase
        .from("sms_otp_codes")
        .insert({
          user_id: user.id,
          phone_number: phoneNumber,
          otp_code: generatedOtp,
        });

      if (insertError) {
        console.error("Error storing OTP:", insertError);
        throw new Error("Failed to store OTP");
      }

      // Send SMS via Twilio
      const twilioAccountSid = Deno.env.get("TWILIO_ACCOUNT_SID");
      const twilioAuthToken = Deno.env.get("TWILIO_AUTH_TOKEN");
      const twilioPhoneNumber = Deno.env.get("TWILIO_PHONE_NUMBER");

      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`;
      
      const twilioResponse = await fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phoneNumber,
          From: twilioPhoneNumber!,
          Body: `Your Money Scalper verification code is: ${generatedOtp}. This code expires in 10 minutes.`,
        }),
      });

      if (!twilioResponse.ok) {
        const error = await twilioResponse.text();
        console.error("Twilio error:", error);
        throw new Error("Failed to send SMS");
      }

      console.log(`SMS OTP sent to ${phoneNumber}`);

      await logSecurityEvent("otp_generated", {
        phone_number_masked: phoneNumber.slice(0, -4) + "****",
      }, phoneNumber);

      return new Response(
        JSON.stringify({ success: true, message: "OTP sent successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else if (action === "verify") {
      // Verify OTP
      const { data: otpRecord, error: fetchError } = await supabase
        .from("sms_otp_codes")
        .select("*")
        .eq("user_id", user.id)
        .eq("phone_number", phoneNumber)
        .eq("otp_code", otpCode)
        .eq("verified", false)
        .gt("expires_at", new Date().toISOString())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (fetchError) {
        console.error("Error fetching OTP:", fetchError);
        throw new Error("Failed to verify OTP");
      }

      if (!otpRecord) {
        // Check if OTP is expired or invalid
        const { data: latestOtp } = await supabase
          .from("sms_otp_codes")
          .select("*")
          .eq("user_id", user.id)
          .eq("phone_number", phoneNumber)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (latestOtp && new Date(latestOtp.expires_at) < new Date()) {
          await logSecurityEvent("expired_otp_attempt", {
            reason: "Attempted to verify expired OTP",
            otp_id: latestOtp.id,
            expired_at: latestOtp.expires_at,
          }, phoneNumber);

          return new Response(
            JSON.stringify({ success: false, error: "OTP has expired. Please request a new code." }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            }
          );
        }

        // Increment attempts
        if (latestOtp) {
          const newAttempts = latestOtp.attempts + 1;
          
          await supabase
            .from("sms_otp_codes")
            .update({ attempts: newAttempts })
            .eq("id", latestOtp.id);

          await logSecurityEvent("failed_verification_attempt", {
            reason: "Incorrect OTP code provided",
            otp_id: latestOtp.id,
            attempts: newAttempts,
          }, phoneNumber);
        }

        return new Response(
          JSON.stringify({ success: false, error: "Invalid OTP code. Please try again." }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }

      // Mark OTP as verified
      const { error: updateError } = await supabase
        .from("sms_otp_codes")
        .update({ verified: true })
        .eq("id", otpRecord.id);

      if (updateError) {
        console.error("Error updating OTP:", updateError);
        throw new Error("Failed to verify OTP");
      }

      // Update profile with verified phone number
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          phone_number: phoneNumber,
          sms_verified: true,
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        throw new Error("Failed to update profile");
      }

      console.log(`SMS verified for user ${user.id}`);

      await logSecurityEvent("successful_verification", {
        otp_id: otpRecord.id,
        phone_number_masked: phoneNumber.slice(0, -4) + "****",
      }, phoneNumber);

      return new Response(
        JSON.stringify({ success: true, message: "Phone number verified successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    } else {
      throw new Error("Invalid action");
    }
  } catch (error: any) {
    console.error("Error in send-sms-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
