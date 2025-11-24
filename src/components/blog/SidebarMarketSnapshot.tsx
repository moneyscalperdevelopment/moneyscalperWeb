import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Activity, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bitcoinLogo from "@/assets/bitcoin-logo.webp";
import ethereumLogo from "@/assets/ethereum-logo.png";
import solanaLogo from "@/assets/solana-logo.png";
import cardanoLogo from "@/assets/cardano-logo.png";
import rippleLogo from "@/assets/ripple-logo.png";
import polkadotLogo from "@/assets/polkadot-logo.png";
import avalancheLogo from "@/assets/avalanche-logo.png";
import chainlinkLogo from "@/assets/chainlink-logo.png";

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  logo?: string;
}

const SidebarMarketSnapshot = () => {
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

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
            logo: bitcoinLogo,
          },
          {
            id: "ethereum",
            symbol: "ETH",
            name: "Ethereum",
            price: data.ethereum.usd,
            change24h: data.ethereum.usd_24h_change,
            logo: ethereumLogo,
          },
          {
            id: "solana",
            symbol: "SOL",
            name: "Solana",
            price: data.solana.usd,
            change24h: data.solana.usd_24h_change,
            logo: solanaLogo,
          },
          {
            id: "cardano",
            symbol: "ADA",
            name: "Cardano",
            price: data.cardano.usd,
            change24h: data.cardano.usd_24h_change,
            logo: cardanoLogo,
          },
          {
            id: "ripple",
            symbol: "XRP",
            name: "Ripple",
            price: data.ripple.usd,
            change24h: data.ripple.usd_24h_change,
            logo: rippleLogo,
          },
          {
            id: "polkadot",
            symbol: "DOT",
            name: "Polkadot",
            price: data.polkadot.usd,
            change24h: data.polkadot.usd_24h_change,
            logo: polkadotLogo,
          },
          {
            id: "avalanche-2",
            symbol: "AVAX",
            name: "Avalanche",
            price: data["avalanche-2"].usd,
            change24h: data["avalanche-2"].usd_24h_change,
            logo: avalancheLogo,
          },
          {
            id: "chainlink",
            symbol: "LINK",
            name: "Chainlink",
            price: data.chainlink.usd,
            change24h: data.chainlink.usd_24h_change,
            logo: chainlinkLogo,
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

  const displayedCoins = showAll ? prices : prices.slice(0, 3);

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Live Market</h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-muted/50" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/50 rounded w-1/3" />
                  <div className="h-5 bg-muted/50 rounded w-2/3" />
                </div>
                <div className="h-4 bg-muted/50 rounded w-1/6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayedCoins.map((coin) => (
            <div
              key={coin.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/30 transition-colors"
            >
              {coin.logo ? (
                <img src={coin.logo} alt={coin.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{coin.symbol[0]}</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{coin.symbol}</span>
                  <span className="text-xs text-muted-foreground truncate">{coin.name}</span>
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

          {prices.length > 3 && (
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="ghost"
              className="w-full mt-3 gap-2 text-sm font-semibold hover:bg-secondary/50"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  View More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          )}
        </>
      )}

      <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
        <Link to="/market/all">
          <Button
            variant="outline"
            className="w-full gap-2 text-sm font-semibold hover:bg-primary/10 hover:text-primary"
          >
            View All Markets <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground text-center">
          Data updates every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default SidebarMarketSnapshot;
