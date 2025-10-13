import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import bitcoinLogo from "@/assets/bitcoin-logo.webp";
import ethereumLogo from "@/assets/ethereum-logo.png";
const LivePrices = () => {
  const [prices, setPrices] = useState<{
    bitcoin?: number;
    ethereum?: number;
  }>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
        const data = await res.json();
        setPrices({
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prices", err);
        setLoading(false);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);
  return <section className="py-20 px-6 bg-background">
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
      }} className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent py-[20px] md:text-6xl">
            Live Crypto Prices
          </h2>
          <p className="text-muted-foreground text-lg">Real-time market data updated every 10 seconds</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img src={bitcoinLogo} alt="Bitcoin" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Bitcoin</h3>
                <p className="text-sm text-muted-foreground">BTC Price #1</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">
                {loading ? "Loading..." : `$${prices.bitcoin?.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">2.1% (24h)</span>
              </div>
              <div className="text-sm text-muted-foreground">
                1.0000 BTC • 0.0%
              </div>
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="p-6 rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <img src={ethereumLogo} alt="Ethereum" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Ethereum</h3>
                <p className="text-sm text-muted-foreground">ETH Price #2</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">
                {loading ? "Loading..." : `$${prices.ethereum?.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-2 text-green-500">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold">0.7% (24h)</span>
              </div>
              <div className="text-sm text-muted-foreground">
                0.03683 BTC • 1.3%
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default LivePrices;