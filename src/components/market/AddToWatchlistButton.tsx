import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AddToWatchlistButtonProps {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const AddToWatchlistButton = ({
  coinId,
  coinName,
  coinSymbol,
  variant = "outline",
  size = "default",
  className = ""
}: AddToWatchlistButtonProps) => {
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      checkWatchlistStatus();
    }
  }, [user, coinId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const checkWatchlistStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('id')
        .eq('user_id', user.id)
        .eq('coin_id', coinId)
        .maybeSingle();

      if (error) throw error;
      setIsInWatchlist(!!data);
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  };

  const handleToggleWatchlist = async () => {
    if (!user) {
      toast.error("Please sign in to use watchlist");
      return;
    }

    setLoading(true);

    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const { error } = await supabase
          .from('watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('coin_id', coinId);

        if (error) throw error;

        setIsInWatchlist(false);
        toast.success("Removed from watchlist");
      } else {
        // Add to watchlist
        const { error } = await supabase
          .from('watchlist')
          .insert({
            user_id: user.id,
            coin_id: coinId,
            coin_name: coinName,
            coin_symbol: coinSymbol,
          });

        if (error) throw error;

        setIsInWatchlist(true);
        toast.success("Added to watchlist", {
          action: {
            label: "View Dashboard",
            onClick: () => navigate('/dashboard'),
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update watchlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWatchlist}
      disabled={loading}
      className={`${className} transition-all duration-200`}
      style={{
        background: isInWatchlist ? 'rgba(229, 255, 61, 0.2)' : undefined,
        borderColor: isInWatchlist ? '#E5FF3D' : undefined,
      }}
    >
      <Star 
        className={`${size === 'icon' ? 'h-4 w-4' : 'mr-2 h-4 w-4'}`}
        fill={isInWatchlist ? "#E5FF3D" : "none"}
        style={{ color: isInWatchlist ? '#E5FF3D' : undefined }}
      />
      {size !== 'icon' && (isInWatchlist ? 'In Watchlist' : 'Add to Watchlist')}
    </Button>
  );
};
