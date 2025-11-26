import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Smartphone, Loader2 } from "lucide-react";

interface SmsVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
}

export const SmsVerification = ({ phoneNumber, onVerified }: SmsVerificationProps) => {
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("send-sms-otp", {
        body: {
          action: "send",
          phoneNumber: phoneNumber,
        },
      });

      if (error) throw error;

      toast.success("Verification code sent to your phone!");
      setCodeSent(true);
    } catch (error: any) {
      console.error("Error sending SMS:", error);
      toast.error(error.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase.functions.invoke("send-sms-otp", {
        body: {
          action: "verify",
          phoneNumber: phoneNumber,
          otpCode: otpCode,
        },
      });

      if (error) throw error;

      if (data?.success) {
        toast.success("Phone number verified successfully!");
        onVerified();
      } else {
        toast.error(data?.error || "Invalid verification code");
      }
    } catch (error: any) {
      console.error("Error verifying code:", error);
      toast.error(error.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Verify Your Phone Number</CardTitle>
          <CardDescription>
            We'll send a verification code to <strong>{phoneNumber}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!codeSent ? (
            <>
              <p className="text-sm text-muted-foreground text-center">
                Click the button below to receive a 6-digit verification code via SMS.
              </p>
              
              <Button
                onClick={handleSendCode}
                disabled={loading}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Sending..." : "Send Verification Code"}
              </Button>
            </>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  required
                  disabled={loading}
                  className="text-center text-2xl tracking-widest"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || otpCode.length !== 6}
                className="w-full"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Verifying..." : "Verify Code"}
              </Button>

              <Button
                type="button"
                onClick={handleSendCode}
                disabled={loading}
                variant="ghost"
                className="w-full"
              >
                Resend Code
              </Button>
            </form>
          )}

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => supabase.auth.signOut()}
              className="text-sm"
            >
              Sign out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
