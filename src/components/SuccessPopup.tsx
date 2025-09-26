import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export const SuccessPopup = ({ isVisible, onClose }: SuccessPopupProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="relative pointer-events-auto animate-[scale-in_0.6s_cubic-bezier(0.34,1.56,0.64,1),fade-in_0.4s_ease-out] transform-gpu">
        <div className="relative bg-gradient-to-br from-slate-900/95 via-blue-900/95 to-slate-800/95 
                        border border-blue-400/30 rounded-2xl p-8 backdrop-blur-xl
                        shadow-[0_20px_50px_rgba(59,130,246,0.15),0_0_0_1px_rgba(59,130,246,0.1)]
                        transform perspective-1000 hover:scale-105 transition-all duration-500
                        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r 
                        before:from-blue-500/20 before:via-transparent before:to-purple-500/20 
                        before:blur-xl before:-z-10">
          
          {/* Animated background glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 
                          animate-pulse blur-xl -z-10" />
          
          {/* Success icon with 3D effect */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-lg animate-pulse" />
              <CheckCircle className="w-16 h-16 text-green-400 relative z-10 animate-bounce" />
            </div>
          </div>
          
          {/* Success message */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white 
                          bg-clip-text text-transparent animate-pulse">
              Registration Successful
            </h2>
            <p className="text-blue-200/80 text-sm">
              Welcome to the future of trading! You'll be notified when we launch.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
          <div className="absolute top-4 right-3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-3 left-4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};