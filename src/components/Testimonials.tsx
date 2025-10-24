import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const testimonials = [{
  name: "Sarah Johnson",
  role: "Crypto Investor",
  content: "Money Scalper's AI bot has transformed my trading strategy. I've seen consistent returns without spending hours monitoring markets.",
  rating: 5
}, {
  name: "Michael Chen",
  role: "Day Trader",
  content: "The 24/7 automated trading is a game-changer. I can sleep knowing my portfolio is being managed by advanced AI algorithms.",
  rating: 5
}, {
  name: "Emily Rodriguez",
  role: "Portfolio Manager",
  content: "Transparent, secure, and incredibly efficient. The analytics dashboard gives me insights I never had before.",
  rating: 5
}];
const Testimonials = () => {
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-2 sm:py-3 px-2">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-3">
            See what our users have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {testimonials.map((testimonial, index) => <motion.div key={testimonial.name} initial={{
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
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-4 sm:pt-5 md:pt-6 p-4 sm:p-5 md:p-6">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />)}
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 italic text-sm sm:text-base">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default Testimonials;