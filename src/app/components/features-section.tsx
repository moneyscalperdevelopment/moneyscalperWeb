import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Expert Guidance",
      description: "11 years of experience. Daily setups with video explanations. LIVE Saturday classes at 7 PM.",
      image: IMAGES.features.expertGuidance
    },
    {
      id: 2,
      title: "Risk-Free Practice",
      description: "₹10L virtual portfolio with real market data. Unlimited mock tests and leaderboards.",
      image: IMAGES.features.riskFreePractice
    },
    {
      id: 3,
      title: "AI Feedback",
      description: "Instant analysis on every trade. Setup quality, risk audit, and psychology assessment.",
      image: IMAGES.features.aiFeedback
    },
    {
      id: 4,
      title: "Complete Ecosystem",
      description: "Videos, live classes, expert setups, mock tests, journal, and live data in one place.",
      image: IMAGES.features.completeEcosystem
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            Why choose us
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need to become a profitable trader
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group transform transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-500 relative">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40"></div>
                </div>
                
                {/* Content */}
                <div className="p-8 relative z-10">
                  <h3 className="text-2xl text-white mb-4 group-hover:text-teal-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
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