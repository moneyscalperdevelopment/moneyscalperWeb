import { useState, useEffect } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import CryptoCoins3D from "@/components/CryptoCoins3D";

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
      
      {/* Sparkles Background */}
      <div className="absolute inset-0 z-[1]">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          className="w-full h-full"
          particleColor="#8b5cf6"
        />
      </div>

      {/* 3D Crypto Coins */}
      <div className="absolute inset-0 z-[2]">
        <CryptoCoins3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Main Headlines */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent leading-tight breathing-text">
            Next-Gen Crypto Trading
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent breathing-text">
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

        {/* CTA Button */}
        <div className="mb-16 flex justify-center">
          <button className="btn">
            <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
              <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
            </svg>
            <span className="text">Pre-register</span>
          </button>
        </div>

        {/* Dynamic Counter */}
        <div className="flex justify-center">
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