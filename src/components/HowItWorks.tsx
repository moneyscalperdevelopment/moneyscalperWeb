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
    <section className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Get started with AI-powered crypto trading in minutes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;