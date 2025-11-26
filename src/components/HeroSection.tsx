import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import TradingChartBackground from "@/components/TradingChartBackground";
import { useNavigate } from "react-router-dom";
import { Auth } from "@/components/auth/Auth";
const HeroSection = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return <section className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 overflow-hidden pt-8 sm:pt-24 pb-2 sm:pb-8">
      {/* Animated Trading Chart Background */}
      <TradingChartBackground />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto w-full">
        {/* Main Headlines */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight py-2 sm:py-3 md:py-4 px-2">
            Next-Gen Trading
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-accent via-primary to-foreground bg-clip-text text-transparent glow-pulse py-2 sm:py-3 md:py-4 px-2">
            Built for the Future
          </h2>
        </div>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4">
          Blazing execution. Unmatched security. Tools built for future markets.
          <span className="block mt-2 sm:mt-3 md:mt-4 text-accent font-semibold text-base sm:text-lg md:text-xl">
            Experience the future of trading with AI-powered insights.
          </span>
        </p>

        {/* Live Market Button - Simplified */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <button
            onClick={() => navigate('/market/bitcoin')}
            className="group/btn relative px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full font-bold text-lg sm:text-xl text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2 sm:gap-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>View Live Markets</span>
            </span>
          </button>

          {/* Get Started Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="pre-register-btn text-sm sm:text-base" onClick={() => setIsDialogOpen(true)}>
                <svg height="20" width="20" viewBox="0 0 24 24" fill="#FFFFFF" data-name="Layer 1" id="Layer_1" className="sparkle sm:h-6 sm:w-6">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className="text">Get Started</span>
              </button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[450px]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  Welcome to Money Scalper
                </DialogTitle>
              </DialogHeader>
              <Auth onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Scanning beam effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-cyber-scan" />
      </div>
    </section>;
};
export default HeroSection;