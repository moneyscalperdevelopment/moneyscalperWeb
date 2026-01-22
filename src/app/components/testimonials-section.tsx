import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Beginner Trader",
      text: "₹5K loss in first week. After 4 weeks: 62% win rate + ₹50K virtual profit. Piyush's daily setups are game-changing!",
      image: IMAGES.testimonials.beginner
    },
    {
      name: "Priya Sharma",
      role: "Active Trader",
      text: "Journal + feedback showed I win 65% on support-resistance. 2 months = 2x profit. Now disciplined & consistent!",
      image: IMAGES.testimonials.active
    },
    {
      name: "Amit Patel",
      role: "Comeback Trader",
      text: "Lost ₹10L in 2012. Money Scalper rebuilt confidence. 3 months practicing, now ready for real trading.",
      image: IMAGES.testimonials.comeback
    }
  ];

  return (
    <section className="py-24 bg-black border-b border-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            Trusted by traders
          </h2>
          <p className="text-xl text-gray-400">
            Join 5,000+ profitable traders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group transform transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-500 h-full relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-500"
                  />
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-purple-500/0 group-hover:from-teal-500/5 group-hover:to-purple-500/5 transition-all duration-700"></div>
                
                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500/30 to-purple-500/30 rounded-full flex items-center justify-center mb-4 border-2 border-teal-500/30 group-hover:scale-110 group-hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <h4 className="text-lg text-white mb-1 group-hover:text-teal-400 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-teal-400/80">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex gap-1 text-teal-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-sm">⭐</span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
