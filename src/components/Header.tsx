import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg cyber-glow" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CryptoFlow
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Buy / Sell</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Grow</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Markets</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Business</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Support</a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 cyber-glow">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;