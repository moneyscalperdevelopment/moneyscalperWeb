export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white text-lg mb-4 group cursor-pointer transition-all duration-300 hover:text-teal-400">
              Money Scalper
            </h3>
            <p className="text-sm leading-relaxed transition-all duration-300 hover:text-gray-300">
              Your complete trading academy powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="text-white mb-4 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="hover:text-gray-300 transition-colors duration-300">
            © 2019 Money Scalper. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:scale-110 inline-block">
              Twitter
            </a>
            <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:scale-110 inline-block">
              LinkedIn
            </a>
            <a href="#" className="hover:text-teal-400 transition-all duration-300 hover:scale-110 inline-block">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}