import { useEffect } from "react";
import { CheckCircle, Zap, Star, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Meteors } from "@/components/ui/meteors";

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SuccessPopup = ({ isVisible, onClose }: SuccessPopupProps) => {
  console.log("SuccessPopup render - isVisible:", isVisible);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

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
          
          {/* Meteors Effect */}
          <Meteors number={15} className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400" />
          
          {/* Animated background patterns */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-cyan-500/5 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Success icon with enhanced 3D effect */}
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse scale-150" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-ping" />
              <CheckCircle className="w-20 h-20 text-green-400 relative z-10 filter drop-shadow-[0_0_20px_rgba(34,197,94,0.8)]" />
              
              {/* Floating particles around success icon */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, (Math.cos(i * 60 * Math.PI / 180) * 60)],
                    y: [0, (Math.sin(i * 60 * Math.PI / 180) * 60)],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5 + i * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Success message with enhanced styling */}
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 
                            bg-clip-text text-transparent relative">
                <Sparkles className="inline w-8 h-8 text-yellow-400 mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                Registration Successful!
                <Sparkles className="inline w-8 h-8 text-yellow-400 ml-2 animate-spin" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
              </h2>
              
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            <p className="text-blue-200/90 text-lg font-medium">
              🚀 Welcome to the future of trading!
            </p>
            <p className="text-blue-300/70 text-sm">
              You'll be notified when we launch our revolutionary platform.
            </p>
          </motion.div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-6 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-6 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          
          {/* Cyber scan lines */}
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-purple-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};