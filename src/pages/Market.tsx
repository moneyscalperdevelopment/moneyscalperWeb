import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const Market = () => {
  const { coin } = useParams<{ coin: string }>();
  const navigate = useNavigate();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const candleSeriesRef = useRef<any>(null);
  const [days, setDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);

  const coinMap: Record<string, string> = {
    btc: "bitcoin",
    bitcoin: "bitcoin",
    eth: "ethereum",
    ethereum: "ethereum",
  };

  const coinId = coinMap[coin?.toLowerCase() || ""] || coin;

  const availableCoins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "cardano", name: "Cardano", symbol: "ADA" },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE" },
  ];

  const handleCoinChange = (newCoinId: string) => {
    navigate(`/market/${newCoinId}`);
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 560,
      layout: {
        background: { type: ColorType.Solid, color: "#0D0D2B" },
        textColor: "#d1d4dc",
      },
      rightPriceScale: { 
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.2 }
      },
      timeScale: { 
        borderVisible: false, 
        timeVisible: true, 
        secondsVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.3)" },
        horzLines: { color: "rgba(42, 46, 57, 0.3)" },
      },
      crosshair: {
        vertLine: {
          color: "rgba(155, 155, 155, 0.5)",
          labelBackgroundColor: "#26a69a",
        },
        horzLine: {
          color: "rgba(155, 155, 155, 0.5)",
          labelBackgroundColor: "#26a69a",
        },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    const loadOHLC = async () => {
      if (!coinId) return;
      
      setLoading(true);
      try {
        const url = `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error("Failed to fetch OHLC data");
        
        const data = await res.json();
        
        const formattedData = data.map((row: number[]) => ({
          time: Math.round(row[0] / 1000) as any,
          open: row[1],
          high: row[2],
          low: row[3],
          close: row[4],
        }));

        if (candleSeriesRef.current && formattedData.length > 0) {
          candleSeriesRef.current.setData(formattedData);
          
          // Set current price and calculate change
          const latestClose = formattedData[formattedData.length - 1].close;
          const firstClose = formattedData[0].close;
          const change = ((latestClose - firstClose) / firstClose) * 100;
          
          setCurrentPrice(latestClose);
          setPriceChange(change);
        }
      } catch (err) {
        console.error("Error loading OHLC:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOHLC();
  }, [coinId, days]);

  return (
    <div className="min-h-screen bg-[#0D0D2B]">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="text-foreground hover:bg-white/10 px-4"
            >
              Back
            </Button>
            
            {/* Crypto Switcher */}
            <select
              value={coinId}
              onChange={(e) => handleCoinChange(e.target.value)}
              className="border border-gray-700 rounded-lg px-4 py-2 bg-[#1a1a2e] text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary min-w-[180px]"
            >
              {availableCoins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
            
            <span className="text-gray-400 text-lg">/ USD</span>
          </div>
          
          {/* Timeframe Selector */}
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border border-gray-700 rounded-lg px-3 py-2 bg-[#1a1a2e] text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">1D</option>
            <option value="7">7D</option>
            <option value="14">14D</option>
            <option value="30">30D</option>
            <option value="90">90D</option>
            <option value="180">180D</option>
            <option value="365">1Y</option>
            <option value="max">Max</option>
          </select>
        </div>

        {/* Price Summary */}
        <div className="mb-6 bg-[#1a1a2e] rounded-xl p-4 border border-gray-800">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">Current Price</div>
              <div className="text-3xl font-bold text-white">
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`${priceChange >= 0 ? "text-[#26a69a]" : "text-[#ef5350]"} font-semibold text-lg`}>
                {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
              </span>
              <span className="text-gray-400 text-sm ml-2">({days}D)</span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">Loading chart data...</p>
          </div>
        )}

        {/* Chart Container */}
        <div className="relative rounded-2xl border border-gray-800 overflow-hidden shadow-2xl bg-[#1a1a2e]">
          <style>{`
            .tv-lightweight-charts {
              position: relative !important;
            }
            /* Hide any watermarks */
            [style*="position: absolute"][style*="pointer-events: none"] {
              display: none !important;
            }
          `}</style>
          <div
            ref={chartContainerRef}
            className="w-full"
            style={{ height: "560px" }}
          />
        </div>

        {/* Market Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">24h Volume</div>
            <div className="text-xl font-bold text-white">High Liquidity</div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Market Cap Rank</div>
            <div className="text-xl font-bold text-white">
              #{coinId === "bitcoin" ? "1" : "2"}
            </div>
          </div>
          <div className="bg-[#1a1a2e] rounded-xl p-4 border border-gray-800">
            <div className="text-sm text-gray-400 mb-2">Trading Status</div>
            <div className="text-xl font-bold text-[#26a69a]">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
