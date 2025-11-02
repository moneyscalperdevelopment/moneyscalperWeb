import { motion } from "motion/react";
import gmailIcon from "@/assets/gmail-icon.png";
import telegramIcon from "@/assets/telegram-icon-circle.png";
import instagramIcon from "@/assets/instagram-icon.png";
import discordIcon from "@/assets/discord-icon.png";

const FinalCTA = () => {
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 md:mb-7 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-2">
            Contact Us
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-7 sm:mb-8 md:mb-9 max-w-2xl mx-auto px-3">
            Connect with us through your preferred platform
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-10 md:mt-12">
            <motion.a
              href="mailto:contact@moneyscalper.com"
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img src={gmailIcon} alt="Email" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Email
              </span>
            </motion.a>

            <motion.a
              href="https://t.me/moneyscalper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img src={telegramIcon} alt="Telegram" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Telegram
              </span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Instagram
              </span>
            </motion.a>

            <motion.a
              href="https://discord.gg/VNkhzUGw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img src={discordIcon} alt="Discord" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                Discord
              </span>
            </motion.a>
          </div>

          <p className="mt-8 sm:mt-10 md:mt-12 text-sm sm:text-base text-muted-foreground px-3">
            We'll respond within 24 hours • Available 24/7 • Your privacy is protected
          </p>
        </motion.div>
      </div>
    </section>;
};
export default FinalCTA;