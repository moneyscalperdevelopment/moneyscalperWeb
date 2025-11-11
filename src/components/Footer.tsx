import { Link } from "react-router-dom";
import ContactDialog from "@/components/ContactDialog";
import telegramIcon from "@/assets/telegram-icon-new.png";
import discordIcon from "@/assets/discord-icon-new.png";
import instagramIcon from "@/assets/instagram-icon-new.png";
import gmailIcon from "@/assets/gmail-icon.png";
const Footer = () => {
  return <footer className="bg-background border-t border-border/40 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column A - Platform */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column B - Resources */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog / Insights
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Glossary
                </Link>
              </li>
            </ul>
          </div>

          {/* Column C - Company */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Partner Program
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Column D - Legal & Support */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-4">Legal & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Risk Warning
                </Link>
              </li>
              <li>
                <ContactDialog>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </button>
                </ContactDialog>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-4 justify-center">
              <a href="https://t.me/moneyscalper" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <img src={telegramIcon} alt="Telegram" className="w-12 h-12 animate-scale-in" />
              </a>
              <a href="https://discord.gg/moneyscalper" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <img src={discordIcon} alt="Discord" className="w-12 h-12 animate-scale-in" style={{ animationDelay: '0.1s' }} />
              </a>
              <a href="https://instagram.com/moneyscalper" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
                <img src={instagramIcon} alt="Instagram" className="w-12 h-12 animate-scale-in" style={{ animationDelay: '0.2s' }} />
              </a>
              <a href="mailto:contact@moneyscalper.com" className="hover:scale-110 transition-transform duration-300">
                <img src={gmailIcon} alt="Email" className="w-12 h-12 animate-scale-in" style={{ animationDelay: '0.3s' }} />
              </a>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 MoneyScalper. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;