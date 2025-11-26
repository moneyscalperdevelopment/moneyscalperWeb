import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity } from "lucide-react";
import { toast } from "sonner";

interface SecurityLog {
  id: string;
  user_id: string;
  event_type: string;
  event_details: any;
  phone_number: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface SuspiciousIP {
  id: string;
  ip_address: string;
  reason: string;
  event_count: number;
  first_seen: string;
  last_seen: string;
  blocked: boolean;
}

interface SecurityMetrics {
  total_events: number;
  failed_attempts: number;
  successful_verifications: number;
  rate_limit_violations: number;
  suspicious_ips: number;
}

export default function AdminSecurity() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [suspiciousIPs, setSuspiciousIPs] = useState<SuspiciousIP[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    total_events: 0,
    failed_attempts: 0,
    successful_verifications: 0,
    rate_limit_violations: 0,
    suspicious_ips: 0,
  });

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .single();

      if (!roles) {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      await loadSecurityData();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadSecurityData = async () => {
    try {
      // Load security logs
      const { data: logsData, error: logsError } = await supabase
        .from("security_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (logsError) throw logsError;
      setLogs(logsData || []);

      // Load suspicious IPs
      const { data: ipsData, error: ipsError } = await supabase
        .from("suspicious_ips")
        .select("*")
        .order("last_seen", { ascending: false });

      if (ipsError) throw ipsError;
      setSuspiciousIPs(ipsData || []);

      // Calculate metrics
      if (logsData) {
        const metrics: SecurityMetrics = {
          total_events: logsData.length,
          failed_attempts: logsData.filter(l => 
            l.event_type === "failed_verification_attempt"
          ).length,
          successful_verifications: logsData.filter(l => 
            l.event_type === "successful_verification"
          ).length,
          rate_limit_violations: logsData.filter(l => 
            l.event_type === "rate_limit_exceeded" || 
            l.event_type === "daily_limit_exceeded"
          ).length,
          suspicious_ips: ipsData?.length || 0,
        };
        setMetrics(metrics);
      }
    } catch (error) {
      console.error("Error loading security data:", error);
      toast.error("Failed to load security data");
    }
  };

  const toggleIPBlock = async (ip: SuspiciousIP) => {
    try {
      const { error } = await supabase
        .from("suspicious_ips")
        .update({ blocked: !ip.blocked })
        .eq("id", ip.id);

      if (error) throw error;

      toast.success(`IP ${ip.blocked ? "unblocked" : "blocked"} successfully`);
      await loadSecurityData();
    } catch (error) {
      console.error("Error toggling IP block:", error);
      toast.error("Failed to update IP status");
    }
  };

  const getEventBadge = (eventType: string) => {
    const badges: Record<string, { label: string; variant: "default" | "destructive" | "secondary" | "outline" }> = {
      otp_generated: { label: "OTP Generated", variant: "secondary" },
      successful_verification: { label: "Verified", variant: "default" },
      failed_verification_attempt: { label: "Failed", variant: "destructive" },
      rate_limit_exceeded: { label: "Rate Limited", variant: "destructive" },
      daily_limit_exceeded: { label: "Daily Limit", variant: "destructive" },
      expired_otp_attempt: { label: "Expired OTP", variant: "outline" },
      ip_blocked: { label: "IP Blocked", variant: "destructive" },
    };

    const badge = badges[eventType] || { label: eventType, variant: "outline" as const };
    return <Badge variant={badge.variant}>{badge.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Security Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor OTP verification security and detect suspicious patterns
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            Back to Dashboard
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">{metrics.total_events}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Successful Verifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-2xl font-bold text-green-500">
                  {metrics.successful_verifications}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Failed Attempts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-2xl font-bold text-red-500">
                  {metrics.failed_attempts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rate Limit Violations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-2xl font-bold text-orange-500">
                  {metrics.rate_limit_violations}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Suspicious IPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                <span className="text-2xl font-bold text-red-500">
                  {metrics.suspicious_ips}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
            <TabsTrigger value="ips">Suspicious IPs</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Security Events</CardTitle>
                <CardDescription>
                  Latest 100 security events from OTP verification system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {getEventBadge(log.event_type)}
                          <span className="text-sm text-muted-foreground">
                            {new Date(log.created_at).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">IP:</span> {log.ip_address || "N/A"}
                        </div>
                        {log.phone_number && (
                          <div className="text-sm">
                            <span className="font-medium">Phone:</span> {log.phone_number}
                          </div>
                        )}
                        {log.event_details && (
                          <div className="text-sm text-muted-foreground">
                            <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
                              {JSON.stringify(log.event_details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {logs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No security events recorded yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Suspicious IP Addresses</CardTitle>
                <CardDescription>
                  IP addresses flagged for suspicious verification patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suspiciousIPs.map((ip) => (
                    <div
                      key={ip.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-medium">{ip.ip_address}</span>
                          {ip.blocked && (
                            <Badge variant="destructive">Blocked</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {ip.reason}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Events: {ip.event_count} | First seen:{" "}
                          {new Date(ip.first_seen).toLocaleString()} | Last seen:{" "}
                          {new Date(ip.last_seen).toLocaleString()}
                        </div>
                      </div>
                      <Button
                        variant={ip.blocked ? "outline" : "destructive"}
                        size="sm"
                        onClick={() => toggleIPBlock(ip)}
                      >
                        {ip.blocked ? "Unblock" : "Block"}
                      </Button>
                    </div>
                  ))}
                  {suspiciousIPs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No suspicious IPs detected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
