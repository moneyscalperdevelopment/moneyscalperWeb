import { motion } from "motion/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const faqs = [{
  question: "What is Money Scalper?",
  answer: "Money Scalper is an AI-powered cryptocurrency trading platform that automates trading strategies using advanced machine learning algorithms. Our bots trade 24/7 to maximize your portfolio returns."
}, {
  question: "How does the AI trading bot work?",
  answer: "Our AI analyzes market trends, price movements, and historical data in real-time to make informed trading decisions. It executes trades automatically based on proven strategies and adjusts to market conditions."
}, {
  question: "Is my investment secure?",
  answer: "Yes, we use military-grade encryption and store funds in secure, insured wallets. We never have direct access to your funds, and you can withdraw at any time."
}, {
  question: "What cryptocurrencies can I trade?",
  answer: "We support Bitcoin, Ethereum, and over 50 other major cryptocurrencies. The exact number depends on your plan, with Pro members having access to all available pairs."
}, {
  question: "Can I withdraw my funds anytime?",
  answer: "Absolutely! You have full control of your funds and can withdraw at any time, 24/7. Most withdrawals are processed within minutes."
}, {
  question: "Do I need trading experience?",
  answer: "No experience necessary! Our AI handles all the trading decisions. However, we provide educational resources and analytics to help you understand your portfolio performance."
}];
const FAQs = () => {
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-2 sm:py-3 px-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-3">
            Everything you need to know about Money Scalper
          </p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                <AccordionTrigger className="text-left hover:text-primary transition-colors text-sm sm:text-base py-3 sm:py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </motion.div>
      </div>
    </section>;
};
export default FAQs;