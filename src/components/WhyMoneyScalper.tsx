import { motion } from "motion/react";
import { Zap, Shield, Bot, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
const features = [{
  icon: Zap,
  title: "Instant AI Crypto Trading",
  description: "Execute trades at lightning speed with our advanced AI algorithms"
}, {
  icon: Shield,
  title: "Secure & Transparent",
  description: "Bank-level security with full transparency on all transactions"
}, {
  icon: Bot,
  title: "AI Trading Bot 24/7",
  description: "Never miss an opportunity with round-the-clock automated trading"
}, {
  icon: TrendingUp,
  title: "Grow Your Crypto Portfolio",
  description: "Maximize returns with intelligent portfolio management"
}];
const WhyMoneyScalper = () => {
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-background">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-2">
            Why Money Scalper?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-3 sm:px-4">
            Experience the future of cryptocurrency trading with cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => <motion.div key={feature.title} initial={{
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
        }}>
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 sm:mb-4">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default WhyMoneyScalper;