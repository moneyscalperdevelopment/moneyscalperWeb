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
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent py-2 sm:py-3 px-2">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl px-3">
            Get started in 5 simple steps
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center max-w-xs w-full"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/50">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white" />
                </div>
                <h3 className="font-bold text-lg sm:text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{step.description}</p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="hidden md:block w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;