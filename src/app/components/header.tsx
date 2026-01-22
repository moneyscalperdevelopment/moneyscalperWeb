import { useState, useEffect } from "react";
// import logoImage from "../../../asset/21dfbea38eb41bd20bcae2b3a53e45cdcade99eb.png";
import logoImage from "../../assets/21dfbea38eb41bd20bcae2b3a53e45cdcade99eb.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById('book-session');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={scrollToForm}
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <img 
              src={logoImage} 
              alt="Money Scalper Logo" 
              className="h-10 w-auto transition-all duration-300 group-hover:brightness-110"
            />
            <span className="text-white text-xl font-bold tracking-tight group-hover:text-teal-400 transition-colors duration-300">
              Money Scalper
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-all duration-300 text-sm relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-[#0a9957] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={scrollToForm}
              className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
            >
              Sign In
            </button>
            <button 
              onClick={scrollToForm}
              className="bg-gradient-to-r from-teal-600 to-[#0a9957] hover:from-teal-500 hover:to-[#0a9957] text-white px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-teal-500/30"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span 
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span 
                className={`w-full h-0.5 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-4 pt-4 border-t border-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(scrollToForm, 300);
                }}
                className="text-gray-300 hover:text-white px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                Sign In
              </button>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(scrollToForm, 300);
                }}
                className="bg-gradient-to-r from-teal-600 to-[#0a9957] hover:from-teal-500 hover:to-[#0a9957] text-white px-4 py-3 rounded-lg transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}