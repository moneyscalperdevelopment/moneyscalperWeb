import { X } from "lucide-react";
import { motion } from "motion/react";
import { Meteors } from "@/components/ui/meteors";
import discordIcon from "@/assets/discord-icon-new.png";
import telegramIcon from "@/assets/telegram-icon-new.png";
import instagramIcon from "@/assets/instagram-icon-new.png";
interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}
export const SuccessPopup = ({
  isVisible,
  onClose
}: SuccessPopupProps) => {
  console.log("SuccessPopup render - isVisible:", isVisible);
  if (!isVisible) return null;
  const handleDiscordRedirect = () => {
    console.log("Discord button clicked");
    window.open("https://discord.gg/QjQqxheB", "_blank");
  };
  const handleTelegramRedirect = () => {
    console.log("Telegram button clicked");
    window.open("https://t.me/+lARYvYyc_odjODY1", "_blank");
  };
  const handleInstagramRedirect = () => {
    console.log("Instagram button clicked");
    window.open("https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", "_blank");
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} />
      
      <motion.div className="relative pointer-events-auto" initial={{
      scale: 0.5,
      opacity: 0,
      y: 50
    }} animate={{
      scale: 1,
      opacity: 1,
      y: 0
    }} exit={{
      scale: 0.5,
      opacity: 0,
      y: 50
    }} transition={{
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.8
    }}>
        <div className="relative bg-gradient-to-br from-slate-900/98 via-blue-900/98 to-purple-900/98 
                        border border-blue-400/40 rounded-3xl p-8 md:p-10 backdrop-blur-xl w-[90vw] max-w-[500px]
                        shadow-[0_25px_60px_rgba(59,130,246,0.2),0_0_0_1px_rgba(59,130,246,0.15),0_0_120px_rgba(139,92,246,0.4)]
                        transform perspective-1000 overflow-hidden">
          
          {/* Close Button */}
          <motion.button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-1.5 rounded-full 
                       bg-background/80 backdrop-blur-sm border border-border/50
                       hover:bg-slate-700/80 transition-all duration-200 opacity-90 hover:opacity-100 hover:scale-110" whileHover={{
          scale: 1.1,
          rotate: 90
        }} whileTap={{
          scale: 0.95
        }}>
            <X className="w-5 h-5 sm:w-4 sm:h-4 text-slate-300 hover:text-white" />
          </motion.button>
          
          {/* Meteors Effect */}
          <Meteors number={20} className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
          
          {/* Animated background patterns */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse pointer-events-none z-0" style={{
          animationDelay: '1s'
        }} />
          
          {/* Success message */}
          <motion.div className="text-center space-y-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }}>
            <div className="space-y-3">
              <motion.h2 initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.6
            }} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mx-0 py-[5px]">
                Registration Successful!
              </motion.h2>
              
              <motion.p className="text-blue-200/90 text-lg md:text-xl font-medium" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.7
            }}>
                Welcome to the future of trading!
              </motion.p>
              <motion.p className="text-blue-300/80 text-sm md:text-base px-4" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.8
            }}>
                You&apos;ll be notified when we launch our revolutionary platform.
              </motion.p>
            </div>
            
            {/* Join channels section */}
            <motion.div className="space-y-5 pt-6 border-t border-blue-400/30" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.9
          }}>
              <p className="text-blue-200/90 text-base md:text-lg font-semibold">
                Join channel for the Upcoming Updates
              </p>
              
              {/* Social buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-2">
                <motion.button onClick={handleDiscordRedirect} className="flex items-center justify-center space-x-2 px-5 py-3.5 
                           bg-[#5865F2]/20 hover:bg-[#5865F2]/30 
                           border border-[#5865F2]/40 rounded-xl transition-all duration-200
                           shadow-lg hover:shadow-[#5865F2]/20" whileHover={{
                scale: 1.05,
                y: -2
              }} whileTap={{
                scale: 0.95
              }} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.0
              }}>
                  <img src={discordIcon} alt="Discord" className="w-6 h-6 object-contain" loading="eager" />
                  <span className="text-white font-semibold">Discord</span>
                </motion.button>
                
                <motion.button onClick={handleTelegramRedirect} className="flex items-center justify-center space-x-2 px-5 py-3.5 
                           bg-[#0088cc]/20 hover:bg-[#0088cc]/30 
                           border border-[#0088cc]/40 rounded-xl transition-all duration-200
                           shadow-lg hover:shadow-[#0088cc]/20" whileHover={{
                scale: 1.05,
                y: -2
              }} whileTap={{
                scale: 0.95
              }} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.1
              }}>
                  <img src={telegramIcon} alt="Telegram" className="w-6 h-6 object-contain" loading="eager" />
                  <span className="text-white font-semibold">Telegram</span>
                </motion.button>

                <motion.button onClick={handleInstagramRedirect} className="flex items-center justify-center space-x-2 px-5 py-3.5 
                           bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-500/20
                           hover:from-purple-600/30 hover:via-pink-600/30 hover:to-orange-500/30
                           border border-pink-500/40 rounded-xl transition-all duration-200
                           shadow-lg hover:shadow-pink-500/20" whileHover={{
                scale: 1.05,
                y: -2
              }} whileTap={{
                scale: 0.95
              }} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 1.2
              }}>
                  <img src={instagramIcon} alt="Instagram" className="w-6 h-6 object-contain" loading="eager" />
                  <span className="text-white font-semibold">Instagram</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Cyber scan lines */}
          <div aria-hidden className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse pointer-events-none z-0" style={{
          animationDelay: '2s'
        }} />
        </div>
      </motion.div>
    </div>;
};