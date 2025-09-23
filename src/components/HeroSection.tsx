import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Zap } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Futuristic crypto trading visualization"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Coming Soon Badge */}
        <Badge className="mb-8 px-6 py-2 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 text-primary cyber-glow">
          <Zap className="w-4 h-4 mr-2" />
          Coming Q4 2025 • Join the Revolution
        </Badge>

        {/* Main Headlines */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
            Next-Gen Crypto Trading,
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent glow-pulse">
            Unlocking Soon
          </h2>
        </div>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Blazing execution. Unmatched security. Tools built for future markets.
          <span className="block mt-4 text-accent font-semibold">
            Experience the future of trading with AI-powered insights.
          </span>
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
            <Shield className="w-5 h-5 text-cyber-green" />
            <span className="text-sm font-medium">Audited Contracts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
            <Lock className="w-5 h-5 text-electric-blue" />
            <span className="text-sm font-medium">256-bit Encryption</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg border border-border/50 backdrop-blur-sm">
            <Zap className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-medium">Cold Storage</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 cyber-glow transition-all duration-300 transform hover:scale-105">
            Join Waitlist
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-primary/50 text-primary hover:bg-primary/10 hover:border-primary cyber-glow transition-all duration-300">
            Get Early Access
          </Button>
        </div>

        {/* Dynamic Counter */}
        <div className="mt-16 flex justify-center">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 cyber-glow">
            <div className="text-3xl font-bold text-primary mb-2">
              <span className="counter">12,847</span>
            </div>
            <div className="text-sm text-muted-foreground">Traders on waitlist</div>
          </div>
        </div>
      </div>

      {/* Scanning beam effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-cyber-scan" />
      </div>
    </section>
  );
};

export default HeroSection;