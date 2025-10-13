import { motion } from "motion/react";
import { UserPlus, Wallet, Bot, LineChart, ArrowDownToLine } from "lucide-react";
const steps = [{
  icon: UserPlus,
  title: "Create Account",
  description: "Sign up in seconds"
}, {
  icon: Wallet,
  title: "Deposit Funds",
  description: "Add crypto or fiat"
}, {
  icon: Bot,
  title: "Choose AI Bot",
  description: "Select your strategy"
}, {
  icon: LineChart,
  title: "Monitor Trades",
  description: "Track performance"
}, {
  icon: ArrowDownToLine,
  title: "Withdraw Anytime",
  description: "Access your funds 24/7"
}];
const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;