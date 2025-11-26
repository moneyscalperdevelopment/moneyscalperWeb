import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Calendar, Shield } from "lucide-react";
import { toast } from "sonner";

const AccountSettings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/');
      return;
    }
    setUser(session.user);
    setLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdatingPassword(true);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("new-password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      setUpdatingPassword(false);
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      setUpdatingPassword(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Password updated successfully");
      e.currentTarget.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050509' }}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Account Settings - Money Scalper</title>
        <meta name="description" content="Manage your Money Scalper account settings" />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050509' }}>
        <Header />

        <section className="pt-24 pb-16">
          <div className="container max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8" style={{ color: '#FFFFFF' }}>
              Account Settings
            </h1>

            <div className="space-y-6">
              {/* Account Information */}
              <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#FFFFFF' }}>Account Information</CardTitle>
                  <CardDescription style={{ color: '#9CA3AF' }}>
                    Your account details and information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <Mail className="w-5 h-5" style={{ color: '#22C55E' }} />
                    <div>
                      <p className="text-sm" style={{ color: '#9CA3AF' }}>Email</p>
                      <p className="font-medium" style={{ color: '#FFFFFF' }}>{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <Calendar className="w-5 h-5" style={{ color: '#22C55E' }} />
                    <div>
                      <p className="text-sm" style={{ color: '#9CA3AF' }}>Member Since</p>
                      <p className="font-medium" style={{ color: '#FFFFFF' }}>
                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                    <Shield className="w-5 h-5" style={{ color: '#22C55E' }} />
                    <div>
                      <p className="text-sm" style={{ color: '#9CA3AF' }}>User ID</p>
                      <p className="font-mono text-xs" style={{ color: '#FFFFFF' }}>{user?.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#FFFFFF' }}>Change Password</CardTitle>
                  <CardDescription style={{ color: '#9CA3AF' }}>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" style={{ color: '#FFFFFF' }}>New Password</Label>
                      <Input
                        id="new-password"
                        name="new-password"
                        type="password"
                        placeholder="Enter new password"
                        required
                        minLength={6}
                        disabled={updatingPassword}
                        style={{ background: '#0D0D2B', border: '1px solid #1F2933', color: '#FFFFFF' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" style={{ color: '#FFFFFF' }}>Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        required
                        minLength={6}
                        disabled={updatingPassword}
                        style={{ background: '#0D0D2B', border: '1px solid #1F2933', color: '#FFFFFF' }}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updatingPassword}
                      className="w-full"
                      style={{ background: '#22C55E', color: '#111111' }}
                    >
                      {updatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {updatingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AccountSettings;
