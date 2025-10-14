import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import discordIcon from "@/assets/discord-icon.png";
import telegramIcon from "@/assets/telegram-icon.png";

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Money Scalper
            </span>
          </div>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => scrollToSection('about')}
                  style={{ cursor: 'pointer' }}
                >
                  About Us
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => scrollToSection('pricing')}
                  style={{ cursor: 'pointer' }}
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle()}
                  onClick={() => scrollToSection('contact')}
                  style={{ cursor: 'pointer' }}
                >
                  Contact Us
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Join Now Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Join Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">Join Our Community</DialogTitle>
                <DialogDescription className="text-center">
                  Connect with us on your preferred platform
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <a
                  href="https://discord.gg/VNkhzUGw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-colors"
                >
                  <img src={discordIcon} alt="Discord" className="w-12 h-12" />
                  <div className="flex-1 text-white">
                    <h3 className="font-semibold text-lg">Discord</h3>
                    <p className="text-sm text-white/80">Join our Discord server</p>
                  </div>
                </a>
                <a
                  href="https://t.me/+lARYvYyc_odjODY1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-lg bg-[#0088cc] hover:bg-[#006699] transition-colors"
                >
                  <img src={telegramIcon} alt="Telegram" className="w-12 h-12" />
                  <div className="flex-1 text-white">
                    <h3 className="font-semibold text-lg">Telegram</h3>
                    <p className="text-sm text-white/80">Join our Telegram group</p>
                  </div>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;