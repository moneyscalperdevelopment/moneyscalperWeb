import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import discordIcon from "@/assets/discord-logo.jpg";
import telegramIcon from "@/assets/telegram-logo.webp";
import { ArrowRight, Menu } from "lucide-react";
import { useState } from "react";
import CareerForm from "@/components/CareerForm";
const Header = () => {
  const [careerDialogOpen, setCareerDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const openCareerDialog = () => {
    setCareerDialogOpen(true);
    setMobileMenuOpen(false); // Close mobile menu when opening career dialog
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Money Scalper
            </span>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden"
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
                  onClick={() => scrollToSection('about')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Plans
                </button>
                <button
                  onClick={openCareerDialog}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Careers
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left py-3 px-4 rounded-lg hover:bg-accent transition-colors text-lg font-medium"
                >
                  Contact Us
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('about')} style={{
                cursor: 'pointer'
              }}>
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('pricing')} style={{
                cursor: 'pointer'
              }}>Plans</NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()} 
                  onClick={() => setCareerDialogOpen(true)} 
                  style={{
                    cursor: 'pointer'
                  }}
                >
                  Careers
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} onClick={() => scrollToSection('contact')} style={{
                cursor: 'pointer'
              }}>
                  Contact Us
                </NavigationMenuLink>
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
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Join Our Community
                </DialogTitle>
                <DialogDescription className="text-center text-base pt-2">
                  Connect with thousands of traders and get real-time signals
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
                    <img src={discordIcon} alt="Discord" className="w-14 h-14 object-contain" />
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
                    <img src={telegramIcon} alt="Telegram" className="w-14 h-14 object-contain" />
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold text-xl mb-1">Telegram Channel</h3>
                    <p className="text-sm text-white/90">Get instant trading signals</p>
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

          {/* Career Dialog */}
          <Dialog open={careerDialogOpen} onOpenChange={setCareerDialogOpen}>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Career at Money Scalper
                </DialogTitle>
                <DialogDescription className="text-center text-base pt-2">
                  Join our team and help shape the future of crypto trading
                </DialogDescription>
              </DialogHeader>
              <CareerForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>;
};
export default Header;