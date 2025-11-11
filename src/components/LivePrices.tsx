import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { useEffect, useState, memo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bitcoinLogo from "@/assets/bitcoin-logo.webp";
import ethereumLogo from "@/assets/ethereum-logo.png";
const LivePrices = memo(() => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState<{
    bitcoin?: number;
    ethereum?: number;
  }>({});
  const [loading, setLoading] = useState(true);

  // Bitcoin card hover effect
  const [btcVisible, setBtcVisible] = useState(false);
  let btcMouseX = useMotionValue(0);
  let btcMouseY = useMotionValue(0);

  function handleBtcMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    btcMouseX.set(clientX - left);
    btcMouseY.set(clientY - top);
  }

  // Ethereum card hover effect
  const [ethVisible, setEthVisible] = useState(false);
  let ethMouseX = useMotionValue(0);
  let ethMouseY = useMotionValue(0);

  function handleEthMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    ethMouseX.set(clientX - left);
    ethMouseY.set(clientY - top);
  }
  
  useEffect(() => {
    // Load cached prices immediately
    const loadCachedPrices = () => {
      try {
        const cached = localStorage.getItem('crypto_prices');
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          const age = Date.now() - timestamp;
          // Use if less than 2 minutes old
          if (age < 2 * 60 * 1000) {
            setPrices(data);
            setLoading(false);
            return true;
          }
        }
      } catch (err) {
        console.error('Error loading cached prices:', err);
      }
      return false;
    };

    const hasCached = loadCachedPrices();
    
    const fetchPrices = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd", {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) throw new Error('API request failed');
        
        const data = await res.json();
        const newPrices = {
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd
        };
        
        setPrices(newPrices);
        setLoading(false);
        
        // Save to cache
        localStorage.setItem('crypto_prices', JSON.stringify({
          data: newPrices,
          timestamp: Date.now()
        }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching prices", err);
        }
        if (!hasCached) {
          setLoading(false);
        }
      }
    };
    
    fetchPrices();
    // Increased interval to 30 seconds to reduce API calls
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);
  return <section className="py-10 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-2 sm:py-3 md:py-4 px-2">
            Live Crypto Prices
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl px-3">Real-time market data updated every 30 seconds</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${btcVisible ? "300px" : "0px"} circle at ${btcMouseX}px ${btcMouseY}px,
                  hsl(var(--primary) / 0.15),
                  transparent 80%
                )
              `,
            }}
            onMouseMove={handleBtcMouseMove}
            onMouseEnter={() => setBtcVisible(true)}
            onMouseLeave={() => setBtcVisible(false)}
            onClick={() => navigate("/market/bitcoin")} 
            className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
            <div className="relative z-10 flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img src={bitcoinLogo} alt="Bitcoin" className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Bitcoin</h3>
                <p className="text-sm sm:text-base text-muted-foreground">BTC Price #1</p>
              </div>
            </div>
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {loading ? "Loading..." : `$${prices.bitcoin?.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base font-semibold">2.1% (24h)</span>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                1.0000 BTC • 0.0%
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  ${ethVisible ? "300px" : "0px"} circle at ${ethMouseX}px ${ethMouseY}px,
                  hsl(var(--primary) / 0.15),
                  transparent 80%
                )
              `,
            }}
            onMouseMove={handleEthMouseMove}
            onMouseEnter={() => setEthVisible(true)}
            onMouseLeave={() => setEthVisible(false)}
            onClick={() => navigate("/market/ethereum")} 
            className="relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-border bg-card shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
            <div className="relative z-10 flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <img src={ethereumLogo} alt="Ethereum" className="w-12 h-12 sm:w-14 sm:h-14 group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Ethereum</h3>
                <p className="text-sm sm:text-base text-muted-foreground">ETH Price #2</p>
              </div>
            </div>
            <div className="relative z-10 space-y-1.5 sm:space-y-2">
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold">
                {loading ? "Loading..." : `$${prices.ethereum?.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base font-semibold">0.7% (24h)</span>
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                0.03683 BTC • 1.3%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
});
LivePrices.displayName = 'LivePrices';
export default LivePrices;