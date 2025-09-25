import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useToast } from "@/hooks/use-toast";
const HeroSection = () => {
  const [traderCount, setTraderCount] = useState(12847);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setTraderCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await emailjs.send(
        'service_tdx4qi4', // service ID
        'template_rak8f58', // template ID
        {
          firstname: formData.get('firstname'),
          lastname: formData.get('lastname'),
          email: formData.get('email'),
          contact: formData.get('contact'),
          country: formData.get('country'),
        },
        'XtWp493g7vwVe6q_-' // public key
      );
      
      toast({
        title: "Registration Successful! 🚀",
        description: "You'll be notified when we launch. Welcome to the future of trading!",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Registration Failed",
        description: "Please try again. If the problem persists, contact support.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <ShootingStars />
      <StarsBackground />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Coming Soon Badge */}
        

        {/* Main Headlines */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">Next-Gen Trading</h1>
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
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/50 cyber-glow">
            <div className="text-3xl font-bold text-primary mb-2">
              <span className="counter">{traderCount.toLocaleString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">Traders on waitlist</div>
          </div>

          {/* Pre-register Button */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="pre-register-btn text-xs">
                <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className="text">Pre-register</span>
              </button>
            </DialogTrigger>
            <DialogContent className="shadow-input mx-auto w-full max-w-md rounded-none bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 md:rounded-2xl md:p-8 border border-blue-800/50">
              <h2 className="text-xl font-bold text-white">
                Welcome to MoneyScalper
              </h2>
              <p className="mt-2 max-w-sm text-sm text-white/80">
                Join the future of trading - register early for exclusive access
              </p>
              <form className="my-8" onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <LabelInputContainer>
                    <Label htmlFor="firstname">First name</Label>
                    <Input id="firstname" name="firstname" placeholder="John" type="text" required />
                  </LabelInputContainer>
                  <LabelInputContainer>
                    <Label htmlFor="lastname">Last name</Label>
                    <Input id="lastname" name="lastname" placeholder="Doe" type="text" required />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" placeholder="john@example.com" type="email" required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" name="contact" placeholder="+1 234 567 8900" type="tel" required />
                </LabelInputContainer>
                <LabelInputContainer className="mb-8">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" placeholder="United States" type="text" required />
                </LabelInputContainer>

                <button
                  className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-600 to-blue-800 font-medium text-white shadow-[0px_1px_0px_0px_#1e40af_inset,0px_-1px_0px_0px_#1e40af_inset] hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                  type="submit"
                  disabled={isSubmitting}>
                  {isSubmitting ? "Pre-registering..." : "Pre-register →"}
                  <BottomGradient />
                </button>
              </form>
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

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default HeroSection;