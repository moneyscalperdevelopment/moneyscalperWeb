import { motion, AnimatePresence } from "motion/react";
import { Volume2 } from "lucide-react";
import { Button } from "./ui/button";

interface StartExperienceProps {
  isVisible: boolean;
  onStart: () => void;
}

export const StartExperience = ({ isVisible, onStart }: StartExperienceProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center space-y-8 px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <Volume2 className="w-20 h-20 text-primary" />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
                Welcome to Money Scalper
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Experience an immersive journey with ambient soundscapes and dynamic audio
              </p>
            </div>

            <Button
              onClick={onStart}
              size="lg"
              className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-purple-500 to-primary hover:from-primary/90 hover:via-purple-600 hover:to-primary/90 transition-all shadow-lg shadow-primary/50 hover:shadow-primary/70"
            >
              Start Experience
            </Button>

            <p className="text-sm text-muted-foreground">
              Click to enable audio and begin your journey
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
