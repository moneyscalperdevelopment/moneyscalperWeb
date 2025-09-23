import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [traderCount, setTraderCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setTraderCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

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
            Next-Gen Crypto Trading
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

        {/* Dynamic Counter */}
        <div className="mt-16 flex justify-center">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 cyber-glow">
            <div className="text-3xl font-bold text-primary mb-2">
              <span className="counter">{traderCount.toLocaleString()}</span>
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