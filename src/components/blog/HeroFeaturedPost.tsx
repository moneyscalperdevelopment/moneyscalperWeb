import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroFeaturedPost = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border/50 backdrop-blur-sm">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-card/60 to-background/80" />
      
      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Left Column - Content */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">FEATURED INSIGHT</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            The Real Way To Trade Crypto With AI
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover how artificial intelligence is revolutionizing crypto trading. Learn advanced strategies, 
            risk management techniques, and how to leverage AI-powered signals for consistent profits.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Read Featured Story
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" className="border-border hover:bg-secondary">
              Explore All Articles
            </Button>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
            <span>By Money Scalper Team</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span>Dec 18, 2024</span>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full rounded-xl overflow-hidden border border-border/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-neon-violet/20" />
            <img 
              src="/src/assets/hero-crypto.jpg" 
              alt="AI Crypto Trading"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeaturedPost;
