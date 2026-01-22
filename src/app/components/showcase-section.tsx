import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { IMAGES } from "@/config/images";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const tabs = [
    "Dashboard",
    "Expert Setups",
    "Mock Tests",
    "Journal",
    "Live Data",
    "Feedback"
  ];

  return (
    <section className="py-24 bg-black border-b border-gray-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl text-white mb-6 tracking-tight transition-all duration-500 hover:text-teal-400">
            Your trading headquarters
          </h2>
          <p className="text-xl text-gray-400">
            Everything you need in one beautiful interface
          </p>
        </div>

        <div className="max-w-6xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-teal-600 to-[#0a9957] text-white shadow-lg shadow-teal-500/50"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="group transform transition-all duration-500 hover:scale-[1.02]">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-purple-500/0 group-hover:from-teal-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
              
              <div className="aspect-video relative z-10 overflow-hidden">
                <ImageWithFallback 
                  src={IMAGES.showcase.dashboard}
                  alt="Trading Dashboard Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}