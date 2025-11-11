import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChart, ColorType } from "lightweight-charts";
import { ArrowLeft } from "lucide-react";
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

  const coinMap: Record<string, string> = {
    btc: "bitcoin",
    bitcoin: "bitcoin",
    eth: "ethereum",
    ethereum: "ethereum",
  };

  const coinId = coinMap[coin?.toLowerCase() || ""] || coin;

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 560,
      layout: {
        background: { type: ColorType.Solid, color: "hsl(var(--background))" },
        textColor: "hsl(var(--foreground))",
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, timeVisible: true, secondsVisible: false },
      grid: {
        vertLines: { color: "hsl(var(--border))" },
        horzLines: { color: "hsl(var(--border))" },
      },
    });

    // @ts-ignore
    const candleSeries = chart.addCandlestickSeries({
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

        if (candleSeriesRef.current) {
          candleSeriesRef.current.setData(formattedData);
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold">
              {coinId?.charAt(0).toUpperCase() + coinId?.slice(1)} / USD
            </h1>
          </div>
          
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

        {loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        )}

        <div
          ref={chartContainerRef}
          className="rounded-2xl border border-border overflow-hidden shadow-lg"
          style={{ height: "560px" }}
        />
      </div>
    </div>
  );
};

export default Market;
