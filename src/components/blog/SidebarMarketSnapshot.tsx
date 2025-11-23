import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

const SidebarMarketSnapshot = () => {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,polkadot,avalanche-2,chainlink&vs_currencies=usd&include_24hr_change=true"
        );
        const data = await response.json();

        const formattedPrices: CoinPrice[] = [
          {
            id: "bitcoin",
            symbol: "BTC",
            name: "Bitcoin",
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change,
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change,
          },
          {
            id: "solana",
            symbol: "SOL",
            name: "Solana",
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change,
          },
          {
            id: "cardano",
            symbol: "ADA",
            name: "Cardano",
            price: data.cardano.usd,
            change24h: data.cardano.usd_24h_change,
          },
          {
            id: "ripple",
            symbol: "XRP",
            name: "Ripple",
            price: data.ripple.usd,
            change24h: data.ripple.usd_24h_change,
          },
          {
            id: "polkadot",
            symbol: "DOT",
            name: "Polkadot",
            price: data.polkadot.usd,
            change24h: data.polkadot.usd_24h_change,
          },
          {
            id: "avalanche-2",
            symbol: "AVAX",
            name: "Avalanche",
            price: data["avalanche-2"].usd,
            change24h: data["avalanche-2"].usd_24h_change,
          },
          {
            id: "chainlink",
            symbol: "LINK",
            name: "Chainlink",
            price: data.chainlink.usd,
            change24h: data.chainlink.usd_24h_change,
          },
        ];

        setPrices(formattedPrices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Live Market</h3>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-muted/50 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {prices.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground">{coin.name}</span>
                </div>
                <p className="text-lg font-bold text-foreground mt-1">
                  ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className={`flex items-center gap-1 ${coin.change24h >= 0 ? "text-cyber-green" : "text-destructive"}`}>
                {coin.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">
                  {Math.abs(coin.change24h).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          Data updates every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default SidebarMarketSnapshot;
