import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ContactDialog from "@/components/ContactDialog";
import discordIcon from "@/assets/discord-icon-new.png";
import telegramIcon from "@/assets/telegram-icon-new.png";
import instagramIcon from "@/assets/instagram-icon-new.png";
import msLogo from "@/assets/ms-logo-3d.jpeg";
import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
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
                <Link
                  to="/careers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Careers
                </Link>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Plans
                </button>
                <ContactDialog>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                  >
                    Contact Us
                  </button>
                </ContactDialog>
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
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/careers">Careers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('pricing')} style={{
                cursor: 'pointer'
              }}>Plans</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ContactDialog>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} style={{ cursor: 'pointer' }}>
                    Contact Us
                  </NavigationMenuLink>
                </ContactDialog>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Join Now Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2">
                Join Now
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[500px] max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Join Us Now
                </DialogTitle>
                <DialogDescription className="text-center text-base pt-2">
                  Master The Market With Real-time Expert Support
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-6">
                <a 
                  href="https://discord.gg/VNkhzUGw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-6 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                >
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <img src={discordIcon} alt="Discord" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold text-xl mb-1">Discord Community</h3>
                    <p className="text-sm text-white/90">Join 10,000+ active traders</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://t.me/+lARYvYyc_odjODY1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-6 rounded-xl bg-[#0088cc] hover:bg-[#006699] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                >
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <img src={telegramIcon} alt="Telegram" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold text-xl mb-1">Telegram Channel</h3>
                    <p className="text-sm text-white/90">Get instant trading signals</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center gap-4 p-6 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                >
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <img src={instagramIcon} alt="Instagram" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold text-xl mb-1">Instagram</h3>
                    <p className="text-sm text-white/90">Follow us for updates</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
              <div className="text-center pt-2 pb-2">
                <p className="text-sm text-muted-foreground">
                  🔒 Secure • 🚀 Active 24/7 • 💬 Expert Support
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>;
};
export default Header;