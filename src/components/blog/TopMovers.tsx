import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinMover {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

export const TopMovers = () => {
  const [gainers, setGainers] = useState<CoinMover[]>([]);
  const [losers, setLosers] = useState<CoinMover[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopMovers();
  }, []);

  const fetchTopMovers = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=100&page=1&price_change_percentage=24h"
      );
      const coins: CoinMover[] = await response.json();

      // Filter coins with sufficient volume
      const filtered = coins.filter((c) => c.current_price > 0);

      // Top 10 gainers
      const topGainers = filtered.slice(0, 10);

      // Top 10 losers (sort by ascending price change)
      const topLosers = [...filtered]
        .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))
        .slice(0, 10);

      setGainers(topGainers);
      setLosers(topLosers);
    } catch (error) {
      console.error("Error fetching top movers:", error);
    } finally {
      setLoading(false);
    }
  };

  const MoverCard = ({ coin, isGainer }: { coin: CoinMover; isGainer: boolean }) => (
    <div
      className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-accent/50"
      style={{ background: "rgba(255, 255, 255, 0.02)" }}
    >
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
        <div>
          <p className="font-medium text-sm" style={{ color: "#FFFFFF" }}>
            {coin.name}
          </p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            {coin.symbol.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
          ${coin.current_price.toLocaleString()}
        </p>
        <p
          className="text-xs font-semibold flex items-center gap-1 justify-end"
          style={{ color: isGainer ? "#22C55E" : "#EF4444" }}
        >
          {isGainer ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="rounded-xl p-6" style={{ background: "#111111", border: "1px solid #1F2933" }}>
        <h3 className="text-xl font-semibold mb-6" style={{ color: "#FFFFFF" }}>
          Top Movers (24h)
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 space-y-6" style={{ background: "#111111", border: "1px solid #1F2933" }}>
      {/* Top Gainers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: "#22C55E" }} />
          <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
            Top Gainers
          </h3>
        </div>
        <div className="space-y-2">
          {gainers.slice(0, 5).map((coin) => (
            <MoverCard key={coin.id} coin={coin} isGainer={true} />
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5" style={{ color: "#EF4444" }} />
          <h3 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
            Top Losers
          </h3>
        </div>
        <div className="space-y-2">
          {losers.slice(0, 5).map((coin) => (
            <MoverCard key={coin.id} coin={coin} isGainer={false} />
          ))}
        </div>
      </div>
    </div>
  );
};
