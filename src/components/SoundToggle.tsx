import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  isVisible: boolean;
}

export const SoundToggle = ({ isMuted, onToggle, isVisible }: SoundToggleProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-8 right-8 z-40"
    >
      <Button
        onClick={onToggle}
        size="icon"
        className="w-14 h-14 rounded-full bg-gradient-to-r from-primary/80 to-purple-500/80 backdrop-blur-lg border border-primary/30 hover:from-primary hover:to-purple-600 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all group"
      >
        <motion.div
          animate={{ rotate: isMuted ? 0 : 360 }}
          transition={{ duration: 0.3 }}
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-white" />
          ) : (
            <Volume2 className="w-6 h-6 text-white" />
          )}
        </motion.div>
      </Button>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-xs text-white whitespace-nowrap pointer-events-none"
      >
        {isMuted ? 'Sound Off' : 'Sound On'}
      </motion.div>
    </motion.div>
  );
};
