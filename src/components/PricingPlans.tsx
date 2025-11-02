import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RegistrationForm from "@/components/RegistrationForm";
import { useState } from "react";
const plans = [{
  name: "Starter",
  price: "99",
  period: "week",
  description: "Perfect for beginners",
  features: ["Basic AI trading bot", "Up to ₹5,000 portfolio", "2 cryptocurrency pairs", "Email support", "Basic analytics"],
  popular: false
}, {
  name: "Standard",
  price: "499",
  period: "month",
  description: "Most popular choice",
  features: ["Advanced AI trading bot", "Up to ₹50,000 portfolio", "10 cryptocurrency pairs", "Priority support 24/7", "Advanced analytics", "Risk management tools"],
  popular: true
}, {
  name: "Pro",
  price: "1,499",
  period: "month",
  description: "For serious traders",
  features: ["Premium AI trading bot", "Unlimited portfolio size", "50+ cryptocurrency pairs", "Dedicated account manager", "Real-time analytics", "Advanced risk management", "API access", "Custom strategies"],
  popular: false
}];
const PricingPlans = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl px-3">
            Choose the plan that fits your trading needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-4 sm:mt-6 md:mt-8">
          {plans.map((plan, index) => <motion.div key={plan.name} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="relative pt-3 sm:pt-4">
              {plan.popular && <Badge className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-3 sm:px-4 md:px-6 py-0.5 sm:py-1 md:py-1.5 text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/50 z-10">
                  Most Popular
                </Badge>}
              <Card className={`h-full backdrop-blur-sm transition-all duration-300 ${plan.popular ? 'bg-gradient-to-br from-card/90 via-card/90 to-blue-500/10 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30' : 'bg-card/50 border border-border/30 hover:border-primary/40'}`}>
                <CardHeader className="pb-3 sm:pb-4 md:pb-6 p-4 sm:p-5 md:p-6">
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground">{plan.description}</CardDescription>
                  <div className="mt-3 sm:mt-4 md:mt-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">₹{plan.price}</span>
                    <span className="text-muted-foreground text-sm sm:text-base md:text-lg">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 sm:pb-6 md:pb-8 px-4 sm:px-5 md:px-6">
                  <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                    {plan.features.map(feature => <li key={feature} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base leading-relaxed">{feature}</span>
                      </li>)}
                  </ul>
                </CardContent>
                <CardFooter className="pt-0 p-4 sm:p-5 md:p-6">
                  <Dialog open={openDialog === plan.name} onOpenChange={open => setOpenDialog(open ? plan.name : null)}>
                    <DialogTrigger asChild>
                      <Button className={`w-full py-3 sm:py-4 md:py-5 lg:py-6 text-xs sm:text-sm md:text-base font-semibold transition-all ${plan.popular ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 shadow-lg shadow-purple-500/50 text-white' : 'border-2 border-primary/40 bg-transparent text-white hover:bg-primary/20 hover:border-primary/60 hover:text-white'}`} variant={plan.popular ? "default" : "ghost"}>
                        Get Started
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Register for {plan.name} Plan</DialogTitle>
                      </DialogHeader>
                      <RegistrationForm />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default PricingPlans;