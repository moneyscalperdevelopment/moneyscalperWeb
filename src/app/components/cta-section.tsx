import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Background image with overlay - Trading Success */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src={IMAGES.cta.success}
          alt="Trading Success"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight transform transition-all duration-500 hover:scale-105">
            Ready to start your{" "}
            <span className="bg-gradient-to-r from-teal-400 to-[#0a9957] bg-clip-text text-transparent">
              trading journey?
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 mb-12 leading-relaxed transition-all duration-300 hover:text-gray-300">
            Join 5,000+ traders who transformed their results in just 4 weeks.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => {
                const element = document.getElementById('book-session');
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="group bg-gradient-to-r from-teal-600 to-[#0a9957] hover:from-teal-500 hover:to-[#0a9957] text-white px-10 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">Get Started</span>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('book-session');
                if (element) {
                  const offset = 100;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="group bg-transparent text-white px-10 py-4 rounded-xl text-lg border-2 border-gray-700 hover:border-teal-500 transition-all duration-300 transform hover:scale-105 hover:bg-teal-500/10"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">Book a Call</span>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-500 mt-12">
            <div className="group cursor-pointer transition-all duration-300 hover:text-teal-400">
              <span className="group-hover:scale-110 inline-block transition-transform duration-300">✓</span> 14-day money-back
            </div>
            <div className="group cursor-pointer transition-all duration-300 hover:text-teal-400">
              <span className="group-hover:scale-110 inline-block transition-transform duration-300">✓</span> Cancel anytime
            </div>
            <div className="group cursor-pointer transition-all duration-300 hover:text-teal-400">
              <span className="group-hover:scale-110 inline-block transition-transform duration-300">✓</span> No credit card required
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}