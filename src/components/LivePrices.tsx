import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useState, memo } from "react";
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bitcoinLogo from "@/assets/bitcoin-logo.webp";
import ethereumLogo from "@/assets/ethereum-logo.png";

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  logo?: string;
}

// Separate component for coin card to avoid hook violations
const CoinCard = memo(({ coin, index }: { coin: CoinPrice; index: number }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? "300px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            hsl(var(--primary) / 0.15),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onClick={() => navigate(`/market/${coin.id}`)}
      className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
      <div className="relative z-10 flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        {coin.logo ? (
          <img src={coin.logo} alt={coin.name} className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-xl sm:text-2xl font-bold text-primary">{coin.symbol[0]}</span>
          </div>
        )}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold">{coin.name}</h3>
          <p className="text-sm sm:text-base text-muted-foreground">{coin.symbol}</p>
        </div>
      </div>
      <div className="relative z-10 space-y-1.5 sm:space-y-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
          ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className={`flex items-center gap-2 ${coin.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
          {coin.change24h >= 0 ? <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /> : <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />}
          <span className="text-sm sm:text-base font-semibold">{Math.abs(coin.change24h).toFixed(2)}% (24h)</span>
        </div>
      </div>
    </motion.div>
  );
});

CoinCard.displayName = 'CoinCard';

const LivePrices = memo(() => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,cardano,ripple,polkadot,avalanche-2,chainlink&vs_currencies=usd&include_24hr_change=true"
        );
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
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
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayedCoins = showAll ? prices : prices.slice(0, 2);

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-2">
            Live Crypto Prices
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl px-3">
            Real-time market data updated every 30 seconds
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card animate-pulse">
                <div className="h-32 bg-muted/50 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {displayedCoins.map((coin, index) => (
                <CoinCard key={coin.id} coin={coin} index={index} />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {prices.length > 2 && (
                <Button
                  onClick={() => setShowAll(!showAll)}
                  variant="outline"
                  className="gap-2 px-6 py-6 text-base font-semibold"
                >
                  {showAll ? (
                    <>
                      Show Less <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      View More Coins <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={() => navigate("/market/all")}
                className="gap-2 px-6 py-6 text-base font-semibold"
              >
                View All Markets
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
});

LivePrices.displayName = 'LivePrices';
export default LivePrices;
