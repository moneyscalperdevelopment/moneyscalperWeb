import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function SolutionSection() {
  const steps = [
    {
      title: "Learn",
      description: "6 foundational videos + LIVE class with Piyush every Saturday",
      image: IMAGES.solution.learn
    },
    {
      title: "Practice",
      description: "₹10L virtual portfolio with unlimited trades and daily setups",
      image: IMAGES.solution.practice
    },
    {
      title: "Track",
      description: "Auto-recorded journal with TradingView charts and P&L stats",
      image: IMAGES.solution.track
    },
    {
      title: "Improve",
      description: "AI analyzes every trade with actionable recommendations",
      image: IMAGES.solution.improve
    }
  ];

  return (
    <section className="py-24 bg-gray-900 border-b border-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            How Money Scalper works
          </h2>
          <p className="text-xl text-gray-400">
            Complete trading academy in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group transform transition-all duration-500 hover:-translate-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-black rounded-2xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-500 h-full relative">
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback 
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Step badge */}
                  <div className="absolute top-4 left-4 text-sm text-teal-400 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                    Step {index + 1}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                
                {/* Number indicator */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-bold text-white/5 group-hover:text-teal-500/10 transition-colors duration-500">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}