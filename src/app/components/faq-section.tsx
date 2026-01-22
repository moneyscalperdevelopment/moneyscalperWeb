import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need real money to start?",
      answer: "No! Start with ₹10L virtual portfolio. Practice until confident."
    },
    {
      question: "When can I see results?",
      answer: "Most traders see 60%+ win rate within 4 weeks of consistent practice."
    },
    {
      question: "What if I'm a complete beginner?",
      answer: "Perfect! We teach from scratch. 6 foundation videos + LIVE support."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes. Cancel anytime. 14-day money-back guarantee."
    }
  ];

  return (
    <section className="py-24 bg-gray-900 border-b border-gray-800 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback 
          src={IMAGES.faq.background}
          alt="Trading Charts Background"
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden border border-gray-700 group-hover:border-teal-500/50 transition-all duration-500">
                <ImageWithFallback 
                  src={IMAGES.faq.support}
                  alt="Trading Platform Support"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
          
          {/* Right: FAQs */}
          <div>
            <div className="max-w-3xl mb-12">
              <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
                Frequently asked questions
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to know about Money Scalper
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl overflow-hidden group hover:border-teal-500/50 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors duration-300"
                  >
                    <span className="text-lg text-white pr-8 group-hover:text-teal-400 transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span className={`text-2xl text-teal-400 flex-shrink-0 transition-all duration-300 ${
                      openIndex === index ? "rotate-45 scale-110" : "group-hover:scale-110"
                    }`}>
                      +
                    </span>
                  </button>
                  
                  <div 
                    className={`transition-all duration-500 overflow-hidden ${
                      openIndex === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-8 pb-6 text-gray-400">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Contact CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-teal-900/20 to-purple-900/20 rounded-2xl border border-gray-700">
              <h4 className="text-xl text-white mb-2">Still have questions?</h4>
              <p className="text-gray-400 mb-4">Can't find the answer you're looking for? Please chat with our friendly team.</p>
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
                className="bg-gradient-to-r from-teal-600 to-[#0a9957] hover:from-teal-500 hover:to-[#0a9957] text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}