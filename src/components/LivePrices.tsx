import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LivePrices = () => {
  const [prices, setPrices] = useState<{ bitcoin?: number; ethereum?: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
        );
        const data = await res.json();
        setPrices({
          bitcoin: data.bitcoin.usd,
          ethereum: data.ethereum.usd,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching prices", err);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Live Crypto Prices
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time market data powered by CoinGecko
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {loading ? (
            <>
              {[1, 2].map((i) => (
                <Card key={i} className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <div className="h-6 w-24 bg-muted animate-pulse rounded" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Bitcoin (BTC)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-mono">
                      ${prices.bitcoin?.toLocaleString() || "Loading..."}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Live Price</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Ethereum (ETH)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold font-mono">
                      ${prices.ethereum?.toLocaleString() || "Loading..."}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Live Price</p>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default LivePrices;
