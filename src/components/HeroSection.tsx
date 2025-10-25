import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";
import { useState, useEffect } from "react";
import { sendEmail } from "@/utils/emailconfig";
import { SuccessPopup } from "@/components/SuccessPopup";
import TradingChartBackground from "@/components/TradingChartBackground";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
const HeroSection = () => {
  const { count: traderCount, incrementCounter } = useWaitlistCounter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const userData = {
      firstName: String(formData.get('firstname') || ''),
      lastName: String(formData.get('lastname') || ''),
      email: String(formData.get('email') || ''),
      contactNumber: String(formData.get('contact') || ''),
      country: String(formData.get('country') || '')
    };
    
    try {
      // Submit to Google Sheets
      await fetch(
        "https://script.google.com/macros/s/AKfycbw27vL5_kC_lXcbnVq2xyC1fdbRkSbVh0mvYwPCpwv-JGYkdRwxIOMpPbsWLCFJyM8GCQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(userData),
          headers: { "Content-Type": "application/json" }
        }
      );
      
      // Send email notification
      const { success } = await sendEmail(userData);
      
      if (success) {
        console.log("Registration successful, showing popup");
        incrementCounter(); // Increment the waitlist counter
        setIsDialogOpen(false); // Close the dialog first
        setTimeout(() => {
          console.log("Setting showSuccessPopup to true");
          setShowSuccessPopup(true);
        }, 100); // Small delay to ensure dialog closes first
        form.reset();
      } else {
        throw new Error('Email send failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
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
            Unlocking Soon
          </h2>
        </div>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-3 sm:px-4">
          Blazing execution. Unmatched security. Tools built for future markets.
          <span className="block mt-2 sm:mt-3 md:mt-4 text-accent font-semibold text-base sm:text-lg md:text-xl">
            Experience the future of trading with AI-powered insights.
          </span>
        </p>

        {/* Dynamic Counter */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-border/50 cyber-glow min-w-[240px]">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
              <span className="counter">{traderCount.toLocaleString()}</span>
            </div>
            <div className="text-sm sm:text-base text-muted-foreground">Traders on waitlist</div>
          </div>

          {/* Pre-register Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="pre-register-btn text-sm sm:text-base" onClick={() => setIsDialogOpen(true)}>
                <svg height="20" width="20" viewBox="0 0 24 24" fill="#FFFFFF" data-name="Layer 1" id="Layer_1" className="sparkle sm:h-6 sm:w-6">
                  <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                </svg>
                <span className="text">Pre-register</span>
              </button>
            </DialogTrigger>
            <DialogContent className="shadow-input mx-auto w-[95%] sm:w-full max-w-md rounded-lg sm:rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 sm:p-6 md:p-8 border border-blue-800/50">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Welcome to MoneyScalper
              </h2>
              <p className="mt-2 max-w-sm text-sm sm:text-base text-white/80">
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

                <button className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-blue-600 to-blue-800 font-medium text-white shadow-[0px_1px_0px_0px_#1e40af_inset,0px_-1px_0px_0px_#1e40af_inset] hover:from-blue-500 hover:to-blue-700 transition-all duration-200" type="submit" disabled={isSubmitting}>
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

      {/* Success Popup */}
      <SuccessPopup isVisible={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </section>;
};
const BottomGradient = () => {
  return <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>;
};
const LabelInputContainer = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>;
};
export default HeroSection;