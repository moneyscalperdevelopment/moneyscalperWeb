import { CheckCircle, X } from "lucide-react";
import { motion } from "motion/react";
import { Meteors } from "@/components/ui/meteors";
import discordIcon from "@/assets/discord-icon.png";
import telegramIcon from "@/assets/telegram-icon.png";

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SuccessPopup = ({ isVisible, onClose }: SuccessPopupProps) => {
  console.log("SuccessPopup render - isVisible:", isVisible);

  if (!isVisible) return null;

  const handleDiscordRedirect = () => {
    console.log("Discord button clicked");
    window.open("https://discord.gg/VNkhzUGw", "_blank");
  };

  const handleTelegramRedirect = () => {
    console.log("Telegram button clicked");
    window.open("https://t.me/+lARYvYyc_odjODY1", "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <motion.div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      
      <motion.div 
        className="relative pointer-events-auto"
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 50 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          duration: 0.8 
        }}
      >
        <div className="relative bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 
                        border border-blue-400/30 rounded-3xl p-8 backdrop-blur-xl min-w-[400px]
                        shadow-[0_20px_50px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.1),0_0_100px_rgba(139,92,246,0.3)]
                        transform perspective-1000 overflow-hidden">
          
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/70 
                       border border-slate-600/30 transition-all duration-200 hover:scale-110"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5 text-slate-300 hover:text-white" />
          </motion.button>
          
          {/* Meteors Effect */}
          <Meteors number={15} className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" />
          
          {/* Animated background patterns */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse pointer-events-none z-0" style={{ animationDelay: '1s' }} />
          
          {/* Success icon */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse scale-150" />
              <CheckCircle className="w-16 h-16 text-green-400 relative z-10 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
            </div>
          </motion.div>
          
          {/* Success message */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 
                            bg-clip-text text-transparent">
                Registration Successful!
              </h2>
              
              <p className="text-blue-200/90 text-lg font-medium">
                🚀 Welcome to the future of trading!
              </p>
              <p className="text-blue-300/70 text-sm">
                You'll be notified when we launch our revolutionary platform.
              </p>
            </div>
            
            {/* Join channels section */}
            <div className="space-y-4 pt-4 border-t border-blue-400/20">
              <p className="text-blue-200/80 text-base font-medium">
                Join channel for the Upcoming Updates
              </p>
              
              {/* Social buttons */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={handleDiscordRedirect}
                  className="flex items-center space-x-2 px-4 py-3 bg-indigo-600/20 hover:bg-indigo-600/30 
                           border border-indigo-400/30 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={discordIcon} alt="Discord" className="w-6 h-6" />
                  <span className="text-blue-200 font-medium">Discord</span>
                </motion.button>
                
                <motion.button
                  onClick={handleTelegramRedirect}
                  className="flex items-center space-x-2 px-4 py-3 bg-cyan-600/20 hover:bg-cyan-600/30 
                           border border-cyan-400/30 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={telegramIcon} alt="Telegram" className="w-6 h-6" />
                  <span className="text-blue-200 font-medium">Telegram</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Cyber scan lines */}
          <div aria-hidden className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse pointer-events-none z-0" />
          <div aria-hidden className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse pointer-events-none z-0" style={{ animationDelay: '2s' }} />
        </div>
      </motion.div>
    </div>
  );
};