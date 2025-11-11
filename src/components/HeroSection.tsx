import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Zap, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-crypto.jpg";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { SuccessPopup } from "@/components/SuccessPopup";
import TradingChartBackground from "@/components/TradingChartBackground";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const HeroSection = () => {
  const navigate = useNavigate();
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
      firstName: String(formData.get('firstname') || '').trim(),
      lastName: String(formData.get('lastname') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      contactNumber: String(formData.get('contact') || '').trim(),
      country: String(formData.get('country') || '').trim()
    };

    // Validate inputs
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.contactNumber || !userData.country) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      toast.error("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }
    
    console.log("Starting registration for:", userData.email);
    
    try {
      // Submit to Google Sheets
      console.log("Submitting to Google Sheets...");
      const sheetsResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbw27vL5_kC_lXcbnVq2xyC1fdbRkSbVh0mvYwPCpwv-JGYkdRwxIOMpPbsWLCFJyM8GCQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            contact: userData.contactNumber,
            country: userData.country
          }),
          headers: { "Content-Type": "application/json" }
        }
      );
      console.log("Google Sheets submission completed (no-cors mode)");
      
      // Send email notification via EmailJS
      console.log("Sending email via EmailJS...");
      const emailResult = await emailjs.send(
        'service_tdx4qi4',
        'template_rak8f58',
        {
          source: 'Pre-Registration',
          first_name: userData.firstName,
          last_name: userData.lastName,
          from_email: userData.email,
          contact_number: userData.contactNumber,
          country: userData.country,
          to_name: 'Money Scalper'
        },
        'XtWp493g7vwVe6q_-'
      );
      
      console.log("Email sent successfully:", emailResult);
      console.log("Registration successful, showing popup");
      
      incrementCounter(); // Increment the waitlist counter
      toast.success("Registration successful! Check your email.");
      setIsDialogOpen(false); // Close the dialog first
      
      setTimeout(() => {
        console.log("Setting showSuccessPopup to true");
        setShowSuccessPopup(true);
      }, 100); // Small delay to ensure dialog closes first
      
      form.reset();
    } catch (error: any) {
      console.error('Error during registration:', error);
      const msg = error?.text || error?.message || 'Please check your details and try again.';
      toast.error(`Registration failed: ${msg}`);
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

        {/* Live Market Card - Modern Glass Design */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex flex-col items-center gap-4 sm:gap-6 md:gap-8">
          <div className="relative w-full max-w-2xl">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" 
              style={{
                backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Main Glass Card */}
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-card/40 via-card/30 to-card/20 rounded-3xl border border-primary/20 shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden group hover:shadow-[0_0_80px_rgba(16,185,129,0.25)] transition-all duration-500">
              {/* Top Bar with Status */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border/30">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground">Market Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                    <span className="text-xs text-green-500 font-medium">Live</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-primary/40" />
                  <div className="w-2 h-2 rounded-full bg-accent/40" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                {/* Headline */}
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                    Live Crypto Markets
                  </h3>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Real-time charts, advanced analytics, and instant execution
                  </p>
                </div>

                {/* Body Copy with Accent Line */}
                <div className="relative pl-4 sm:pl-6 border-l-4 border-green-500 space-y-2">
                  <p className="text-sm sm:text-base text-foreground/80">
                    Access professional-grade trading charts with multiple timeframes, technical indicators, and live price updates every 30 seconds.
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-medium">Market data streaming</span>
                  </div>
                </div>

                {/* Footer with CTA */}
                <div className="flex flex-col items-stretch gap-3 pt-2">
                  {/* Primary CTA - Pill Button */}
                  <button
                    onClick={() => navigate('/market/bitcoin')}
                    className="group/btn relative w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-full font-bold text-base sm:text-lg text-white shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_50px_rgba(34,197,94,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>View Live Markets</span>
                    </span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-shimmer" />
                  </button>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-green-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-primary/10 blur-3xl rounded-full" />
              </div>
            </div>
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
            <DialogContent className="w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 border border-blue-800/50">
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