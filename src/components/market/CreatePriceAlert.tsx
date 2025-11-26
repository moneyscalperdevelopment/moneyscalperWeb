import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CreatePriceAlertProps {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  currentPrice?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const CreatePriceAlert = ({
  coinId,
  coinName,
  coinSymbol,
  currentPrice,
  variant = "default",
  size = "default",
  className = ""
}: CreatePriceAlertProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [condition, setCondition] = useState<"above" | "below">("above");
  const [targetPrice, setTargetPrice] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
  };

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please sign in to create alerts");
      setOpen(false);
      return;
    }

    const price = parseFloat(targetPrice);

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (currentPrice) {
      if (condition === "above" && price <= currentPrice) {
        toast.error("Target price must be above current price");
        return;
      }
      if (condition === "below" && price >= currentPrice) {
        toast.error("Target price must be below current price");
        return;
      }
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('price_alerts')
        .insert({
          user_id: user.id,
          coin_id: coinId,
          coin_name: coinName,
          coin_symbol: coinSymbol,
          condition: condition,
          target_price: price,
        });

      if (error) throw error;

      toast.success("Price alert created", {
        description: `You'll be notified when ${coinName} goes ${condition} $${price.toLocaleString()}`,
        action: {
          label: "View Dashboard",
          onClick: () => navigate('/dashboard'),
        },
      });

      setOpen(false);
      setTargetPrice("");
      setCondition("above");
    } catch (error: any) {
      toast.error(error.message || "Failed to create alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={className}
          style={{ background: '#E5FF3D', color: '#111111' }}
        >
          <Bell className="mr-2 h-4 w-4" />
          Set Price Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[425px]" style={{ background: '#1a1a2e', border: '1px solid #1F2933' }}>
        <DialogHeader>
          <DialogTitle style={{ color: '#FFFFFF' }}>
            Create Price Alert
          </DialogTitle>
          <DialogDescription style={{ color: '#9CA3AF' }}>
            Get notified when {coinName} reaches your target price
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateAlert} className="space-y-4 mt-4">
          {currentPrice && (
            <div className="p-3 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
              <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Current Price</p>
              <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                ${currentPrice.toLocaleString()}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="condition" style={{ color: '#FFFFFF' }}>
              Alert Condition
            </Label>
            <Select value={condition} onValueChange={(value: any) => setCondition(value)}>
              <SelectTrigger 
                id="condition"
                style={{ background: '#0D0D2B', border: '1px solid #1F2933', color: '#FFFFFF' }}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: '#1a1a2e', border: '1px solid #1F2933' }}>
                <SelectItem value="above" style={{ color: '#FFFFFF' }}>
                  Price goes above
                </SelectItem>
                <SelectItem value="below" style={{ color: '#FFFFFF' }}>
                  Price goes below
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-price" style={{ color: '#FFFFFF' }}>
              Target Price (USD)
            </Label>
            <Input
              id="target-price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter target price"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              required
              disabled={loading}
              style={{ background: '#0D0D2B', border: '1px solid #1F2933', color: '#FFFFFF' }}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              style={{ borderColor: '#1F2933', color: '#FFFFFF' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
              style={{ background: '#E5FF3D', color: '#111111' }}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creating..." : "Create Alert"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
