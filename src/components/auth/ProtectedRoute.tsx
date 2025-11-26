import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { EmailVerification } from "./EmailVerification";
import { SmsVerification } from "./SmsVerification";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Smartphone } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [verificationMethod, setVerificationMethod] = useState<"email" | "sms" | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      setAuthenticated(!!session);
      setEmailVerified(!!session?.user?.email_confirmed_at);
      setUserEmail(session?.user?.email || "");
      setUserPhone(session?.user?.user_metadata?.phone_number || "");

      // Check if SMS is verified
      if (userId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("sms_verified")
          .eq("id", userId)
          .maybeSingle();
        
        setSmsVerified(profile?.sms_verified || false);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const userId = session?.user?.id;
      
      setAuthenticated(!!session);
      setEmailVerified(!!session?.user?.email_confirmed_at);
      setUserEmail(session?.user?.email || "");
      setUserPhone(session?.user?.user_metadata?.phone_number || "");

      if (userId) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("sms_verified")
          .eq("id", userId)
          .maybeSingle();
        
        setSmsVerified(profile?.sms_verified || false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  // Show verification method selection if neither is verified
  if (!emailVerified && !smsVerified && !verificationMethod) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle>Verify Your Account</CardTitle>
            <CardDescription>
              Choose how you'd like to verify your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => setVerificationMethod("email")}
              variant="outline"
              className="w-full h-20 flex-col"
            >
              <Mail className="h-6 w-6 mb-2" />
              <span>Verify via Email</span>
            </Button>

            {userPhone && (
              <Button
                onClick={() => setVerificationMethod("sms")}
                variant="outline"
                className="w-full h-20 flex-col"
              >
                <Smartphone className="h-6 w-6 mb-2" />
                <span>Verify via SMS</span>
              </Button>
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
  }

  // Show email verification if selected or if no phone number
  if (!emailVerified && (verificationMethod === "email" || !userPhone)) {
    return <EmailVerification email={userEmail} />;
  }

  // Show SMS verification if selected and phone exists
  if (!smsVerified && verificationMethod === "sms" && userPhone) {
    return (
      <SmsVerification 
        phoneNumber={userPhone} 
        onVerified={() => setSmsVerified(true)} 
      />
    );
  }

  // User is verified via either method
  return <>{children}</>;
};
