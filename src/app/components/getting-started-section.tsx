export function GettingStartedSection() {
  const steps = [
    {
      title: "Start Small",
      description: "Watch 6 foundation videos and join the LIVE Saturday class",
      duration: "Week 1"
    },
    {
      title: "Practice",
      description: "Take mock tests and copy daily setups on your virtual portfolio",
      duration: "Week 2"
    },
    {
      title: "Master",
      description: "Build 70%+ win rate with AI feedback before going live",
      duration: "Week 3-4"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            Get started in 3 steps
          </h2>
          <p className="text-xl text-gray-400">
            Zero to profitable trader in 4 weeks
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mb-16">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group transform transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-teal-500/50 transition-all duration-500 relative overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-transparent group-hover:from-teal-500/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="text-sm text-teal-400 mb-4 inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                    {step.duration}
                  </div>
                  <h3 className="text-2xl text-white mb-3 group-hover:text-teal-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                
                {/* Step number */}
                <div className="absolute -bottom-2 -right-2 text-7xl font-bold text-white/5 group-hover:text-teal-500/10 transition-colors duration-500">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Coming Soon */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700 text-center relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-transparent to-purple-500/0 group-hover:from-teal-500/10 group-hover:to-purple-500/10 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="inline-block mb-6">
                <span className="text-6xl animate-pulse">💰</span>
              </div>
              <h3 className="text-4xl text-white mb-4">Pricing Coming Soon</h3>
              <p className="text-xl text-gray-400 mb-8">
                We're finalizing our pricing plans. Book a free session now and get early access with exclusive benefits!
              </p>
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
                className="bg-gradient-to-r from-teal-600 to-[#0a9957] hover:from-teal-500 hover:to-[#0a9957] text-white px-10 py-4 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50"
              >
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}