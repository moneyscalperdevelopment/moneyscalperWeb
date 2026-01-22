import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function ProblemsSection() {
  const problems = [
    {
      title: "Emotional Trading",
      description: "Fear और greed guide trades, not logic. One bad day = ₹10K loss.",
      image: IMAGES.problems.emotionalTrading
    },
    {
      title: "No System",
      description: "Which setup? When to enter? Where SL? Complete confusion.",
      image: IMAGES.problems.noSystem
    },
    {
      title: "No Learning",
      description: "Trade, get result, learn nothing. Same mistakes repeat.",
      image: IMAGES.problems.noLearning
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl mb-16 animate-fade-in">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            Most traders lose money
          </h2>
          <p className="text-xl text-gray-400">
            Here are the three core problems holding you back
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-teal-500/50 transition-all duration-500 relative">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={problem.image}
                    alt={problem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                </div>
                
                {/* Content */}
                <div className="p-8 relative z-10">
                  <h3 className="text-xl text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {problem.description}
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