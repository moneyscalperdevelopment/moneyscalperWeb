import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, CheckCircle, XCircle, Activity, TrendingUp, Download, FileText, FileSpreadsheet, Calendar } from "lucide-react";
import { toast } from "sonner";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { exportToCSV, exportToPDF } from "@/utils/securityReports";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

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

interface ChartData {
  date: string;
  successful: number;
  failed: number;
  rate_limited: number;
  generated: number;
}

interface HourlyData {
  hour: string;
  events: number;
}

interface EventTypeData {
  name: string;
  value: number;
  fill: string;
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
  const [dailyTrends, setDailyTrends] = useState<ChartData[]>([]);
  const [hourlyActivity, setHourlyActivity] = useState<HourlyData[]>([]);
  const [eventTypeBreakdown, setEventTypeBreakdown] = useState<EventTypeData[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [exporting, setExporting] = useState(false);

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

        // Calculate daily trends (last 7 days)
        const dailyData = calculateDailyTrends(logsData);
        setDailyTrends(dailyData);

        // Calculate hourly activity (last 24 hours)
        const hourlyData = calculateHourlyActivity(logsData);
        setHourlyActivity(hourlyData);

        // Calculate event type breakdown
        const eventBreakdown = calculateEventTypeBreakdown(logsData);
        setEventTypeBreakdown(eventBreakdown);
      }
    } catch (error) {
      console.error("Error loading security data:", error);
      toast.error("Failed to load security data");
    }
  };

  const calculateDailyTrends = (logs: SecurityLog[]): ChartData[] => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayLogs = logs.filter(log => 
        log.created_at.startsWith(date)
      );

      return {
        date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        successful: dayLogs.filter(l => l.event_type === 'successful_verification').length,
        failed: dayLogs.filter(l => l.event_type === 'failed_verification_attempt').length,
        rate_limited: dayLogs.filter(l => 
          l.event_type === 'rate_limit_exceeded' || 
          l.event_type === 'daily_limit_exceeded'
        ).length,
        generated: dayLogs.filter(l => l.event_type === 'otp_generated').length,
      };
    });
  };

  const calculateHourlyActivity = (logs: SecurityLog[]): HourlyData[] => {
    const last24Hours = Array.from({ length: 24 }, (_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - (23 - i), 0, 0, 0);
      return date;
    });

    return last24Hours.map(date => {
      const hourStart = date.toISOString();
      const hourEnd = new Date(date.getTime() + 3600000).toISOString();

      const hourLogs = logs.filter(log => 
        log.created_at >= hourStart && log.created_at < hourEnd
      );

      return {
        hour: date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        events: hourLogs.length,
      };
    });
  };

  const calculateEventTypeBreakdown = (logs: SecurityLog[]): EventTypeData[] => {
    const eventCounts: Record<string, number> = {};
    
    logs.forEach(log => {
      eventCounts[log.event_type] = (eventCounts[log.event_type] || 0) + 1;
    });

    const colorMap: Record<string, string> = {
      'successful_verification': '#22C55E',
      'failed_verification_attempt': '#EF4444',
      'rate_limit_exceeded': '#F59E0B',
      'daily_limit_exceeded': '#F59E0B',
      'otp_generated': '#3B82F6',
      'expired_otp_attempt': '#6B7280',
      'suspicious_ip_activity': '#DC2626',
      'ip_blocked': '#991B1B',
    };

    return Object.entries(eventCounts)
      .map(([name, value]) => ({
        name: name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value,
        fill: colorMap[name] || '#9CA3AF',
      }))
      .sort((a, b) => b.value - a.value);
  };

  const handleExportCSV = () => {
    setExporting(true);
    try {
      const reportData = {
        logs,
        suspiciousIPs,
        metrics,
        startDate: format(dateRange.from, "PPP"),
        endDate: format(dateRange.to, "PPP"),
      };
      
      exportToCSV(reportData);
      toast.success("CSV report downloaded successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV report");
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = () => {
    setExporting(true);
    try {
      const reportData = {
        logs,
        suspiciousIPs,
        metrics,
        startDate: format(dateRange.from, "PPP"),
        endDate: format(dateRange.to, "PPP"),
      };
      
      exportToPDF(reportData);
      toast.success("PDF report downloaded successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF report");
    } finally {
      setExporting(false);
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
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3 space-y-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">From Date</p>
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                      disabled={(date) => date > dateRange.to}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">To Date</p>
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                      disabled={(date) => date < dateRange.from || date > new Date()}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => loadSecurityData()}
                  >
                    Apply Date Range
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              onClick={handleExportCSV} 
              variant="outline"
              disabled={exporting}
              className="gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV
            </Button>
            
            <Button 
              onClick={handleExportPDF} 
              variant="outline"
              disabled={exporting}
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              Export PDF
            </Button>
            
            <Button onClick={() => navigate("/admin/users")} variant="outline">
              User Management
            </Button>
            
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              Back to Dashboard
            </Button>
          </div>
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
        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
            <TabsTrigger value="ips">Suspicious IPs</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            {/* Daily Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  7-Day Security Trends
                </CardTitle>
                <CardDescription>
                  Daily verification activity over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyTrends}>
                    <defs>
                      <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRateLimited" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="successful" 
                      stroke="#22C55E" 
                      fillOpacity={1}
                      fill="url(#colorSuccessful)"
                      name="Successful"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="failed" 
                      stroke="#EF4444" 
                      fillOpacity={1}
                      fill="url(#colorFailed)"
                      name="Failed"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate_limited" 
                      stroke="#F59E0B" 
                      fillOpacity={1}
                      fill="url(#colorRateLimited)"
                      name="Rate Limited"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Hourly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>24-Hour Activity Pattern</CardTitle>
                  <CardDescription>
                    Security events by hour (last 24 hours)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={hourlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="hour" 
                        stroke="#9CA3AF"
                        style={{ fontSize: '10px' }}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="events" 
                        fill="#3B82F6"
                        radius={[8, 8, 0, 0]}
                        name="Events"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Event Type Breakdown Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Type Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of security event types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={eventTypeBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        type="number"
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        type="category"
                        dataKey="name" 
                        stroke="#9CA3AF"
                        style={{ fontSize: '10px' }}
                        width={120}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 8, 8, 0]}
                        name="Count"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Success Rate Card */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Success Rate</CardTitle>
                <CardDescription>
                  Overall verification performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold text-green-500">
                      {metrics.total_events > 0 
                        ? Math.round((metrics.successful_verifications / (metrics.successful_verifications + metrics.failed_attempts)) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Failure Rate</p>
                    <p className="text-3xl font-bold text-red-500">
                      {metrics.total_events > 0 
                        ? Math.round((metrics.failed_attempts / (metrics.successful_verifications + metrics.failed_attempts)) * 100)
                        : 0}%
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Rate Limit Hit Rate</p>
                    <p className="text-3xl font-bold text-orange-500">
                      {metrics.total_events > 0 
                        ? Math.round((metrics.rate_limit_violations / metrics.total_events) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
