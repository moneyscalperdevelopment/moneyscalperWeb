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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent py-2 sm:py-3 px-2">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl px-3">
            See what our users have to say
          </p>
        </motion.div>

        {/* Desktop view */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-primary text-primary" />)}
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 italic text-base sm:text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm sm:text-base">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-base sm:text-lg">{testimonial.name}</p>
                      <p className="text-sm sm:text-base text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>

        {/* Mobile view with horizontal scroll animation */}
        <div className="sm:hidden overflow-hidden">
          <motion.div 
            className="flex gap-4"
            animate={{
              x: [0, -100 * testimonials.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear"
              }
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className="min-w-[300px]">
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="pt-4 p-4">
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                    </div>
                    <p className="text-muted-foreground mb-4 italic text-base">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-base">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Testimonials;