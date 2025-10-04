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
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">Get started in 5 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;