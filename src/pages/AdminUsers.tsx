import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, FileText, FileSpreadsheet, Mail, Search, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { exportUsersToPDF, exportUsersToCSV } from "@/utils/userReports";
import emailjs from '@emailjs/browser';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: string;
  email: string;
  phone_number: string | null;
  created_at: string;
  email_confirmed_at: string | null;
  sms_verified: boolean;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [exporting, setExporting] = useState(false);
  const [emailingAll, setEmailingAll] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.phone_number && user.phone_number.includes(searchQuery))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

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
      await loadUsers();
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      // Get all users from profiles
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Map profile data to user data format
      const combinedUsers: UserData[] = profiles?.map(profile => {
        return {
          id: profile.id,
          email: profile.email || "N/A",
          phone_number: profile.phone_number,
          created_at: profile.created_at,
          email_confirmed_at: null, // We'll fetch this separately if needed
          sms_verified: profile.sms_verified || false,
        };
      }) || [];

      setUsers(combinedUsers);
      setFilteredUsers(combinedUsers);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    }
  };

  const handleExportPDF = () => {
    setExporting(true);
    try {
      exportUsersToPDF(filteredUsers);
      toast.success("PDF report downloaded successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF report");
    } finally {
      setExporting(false);
    }
  };

  const handleExportCSV = () => {
    setExporting(true);
    try {
      exportUsersToCSV(filteredUsers);
      toast.success("CSV report downloaded successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV report");
    } finally {
      setExporting(false);
    }
  };

  const handleEmailUser = async (user: UserData) => {
    try {
      await emailjs.send(
        'service_o5z56fm',
        'template_vuxezaw',
        {
          to_name: 'Admin',
          full_name: 'User Details',
          user_email: user.email,
          contact_number: user.phone_number || 'N/A',
          user_password: '***PROTECTED***',
          additional_info: `Registration Date: ${new Date(user.created_at).toLocaleString()}
Email Verified: ${user.email_confirmed_at ? 'Yes' : 'No'}
SMS Verified: ${user.sms_verified ? 'Yes' : 'No'}`,
        },
        'AnyGKIBS05v_ugsa4'
      );
      
      toast.success(`User details emailed successfully for ${user.email}`);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    }
  };

  const handleEmailAllUsers = async () => {
    setEmailingAll(true);
    try {
      const emailPromises = filteredUsers.map(user => 
        emailjs.send(
          'service_o5z56fm',
          'template_vuxezaw',
          {
            to_name: 'Admin',
            full_name: 'Bulk User Report',
            user_email: user.email,
            contact_number: user.phone_number || 'N/A',
            user_password: '***PROTECTED***',
            additional_info: `Registration Date: ${new Date(user.created_at).toLocaleString()}`,
          },
          'AnyGKIBS05v_ugsa4'
        )
      );

      await Promise.all(emailPromises);
      toast.success(`Successfully emailed details for ${filteredUsers.length} users`);
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      toast.error("Failed to send bulk emails");
    } finally {
      setEmailingAll(false);
    }
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
              <Users className="h-8 w-8 text-primary" />
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage registered users
            </p>
          </div>
          <Button onClick={() => navigate("/admin/security")} variant="outline">
            Back to Security
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Email Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {users.filter(u => u.email_confirmed_at).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                SMS Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {users.filter(u => u.sms_verified).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Unverified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {users.filter(u => !u.email_confirmed_at && !u.sms_verified).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <Card>
          <CardHeader>
            <CardTitle>User Database</CardTitle>
            <CardDescription>
              Search, export, and email user details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by email or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button 
                onClick={handleExportPDF} 
                variant="outline"
                disabled={exporting || filteredUsers.length === 0}
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
              
              <Button 
                onClick={handleExportCSV} 
                variant="outline"
                disabled={exporting || filteredUsers.length === 0}
                className="gap-2"
              >
                <FileSpreadsheet className="h-4 w-4" />
                Export CSV
              </Button>
              
              <Button 
                onClick={handleEmailAllUsers} 
                variant="outline"
                disabled={emailingAll || filteredUsers.length === 0}
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                {emailingAll ? "Emailing..." : "Email All"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Email Status</TableHead>
                  <TableHead>SMS Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.phone_number || "N/A"}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {user.email_confirmed_at ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.sms_verified ? (
                        <Badge variant="default" className="bg-blue-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />
                          Unverified
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEmailUser(user)}
                        className="gap-2"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
