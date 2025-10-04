import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);
  return;
};
export default LivePrices;