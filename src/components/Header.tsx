import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Auth } from "@/components/auth/Auth";
import msLogo from "@/assets/ms-logo-3d.jpeg";
import { Menu, User, Settings, LogOut, Activity, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { toast } from "sonner";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      setEmailVerified(!!session?.user?.email_confirmed_at);
      
      // Check SMS verification status
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("sms_verified")
          .eq("id", session.user.id)
          .maybeSingle();
        
        setSmsVerified(profile?.sms_verified || false);
        
        // Check admin role
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        setIsAdmin(!!role);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setEmailVerified(!!session?.user?.email_confirmed_at);
      
      // Check SMS verification status
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("sms_verified")
          .eq("id", session.user.id)
          .maybeSingle();
        
        setSmsVerified(profile?.sms_verified || false);
        
        // Check admin role
        const { data: role } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();
        
        setIsAdmin(!!role);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };
  
  const handleHomeClick = () => {
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
    setMobileMenuOpen(false);
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button - Left Side */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden w-10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={handleHomeClick}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Home
                </button>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  About Us
                </Link>
                <button
                  onClick={() => {
                    navigate('/insights');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Insights
                </button>
                <button
                  onClick={() => {
                    navigate('/market/bitcoin');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Market
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Plans
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo - Centered on mobile */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0 md:flex-1">
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={msLogo} alt="MS Logo" className="h-6 sm:h-8 md:h-10 w-auto object-contain" />
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent whitespace-nowrap">
                Money Scalper
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={handleHomeClick}
                  style={{ cursor: 'pointer' }}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/about">About Us</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => {
                    navigate('/insights');
                    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Insights
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => navigate('/market/bitcoin')}
                  style={{ cursor: 'pointer' }}
                >
                  Market
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('pricing')} style={{
                cursor: 'pointer'
              }}>Plans</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Button or User Profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full border-2"
                  style={{ borderColor: '#22C55E' }}
                >
                  <User className="h-5 w-5" style={{ color: '#22C55E' }} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-[100]" style={{ background: '#1a1a2e', border: '1px solid #1F2933' }}>
                <DropdownMenuLabel style={{ color: '#FFFFFF' }}>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs font-normal text-muted-foreground truncate" style={{ color: '#9CA3AF' }}>
                      {user.email}
                    </p>
                    <div className="flex gap-2 mt-2">
                      {emailVerified && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          Email ✓
                        </span>
                      )}
                      {smsVerified && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                          SMS ✓
                        </span>
                      )}
                      {!emailVerified && !smsVerified && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                          Unverified
                        </span>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator style={{ background: '#1F2933' }} />
                <DropdownMenuItem 
                  onClick={() => navigate('/dashboard')}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/account')}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Account Settings</span>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuItem 
                      onClick={() => navigate('/admin/security')}
                      className="cursor-pointer"
                      style={{ color: '#22C55E' }}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Security Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => navigate('/admin/users')}
                      className="cursor-pointer"
                      style={{ color: '#3B82F6' }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>User Management</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator style={{ background: '#1F2933' }} />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="cursor-pointer text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[450px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">
                    Welcome to Money Scalper
                  </DialogTitle>
                </DialogHeader>
                <Auth onSuccess={() => setAuthDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>;
};
export default Header;