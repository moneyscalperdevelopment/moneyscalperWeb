import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChart, ColorType, CandlestickSeries, LineSeries, AreaSeries, BarSeries, HistogramSeries } from "lightweight-charts";
import { Button } from "@/components/ui/button";
import { Download, Moon, Sun } from "lucide-react";
import Header from "@/components/Header";

const Market = () => {
  const { coin } = useParams<{ coin: string }>();
  const navigate = useNavigate();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [days, setDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area" | "bars" | "hlc">("candlestick");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showVolume, setShowVolume] = useState(false);
  const [scaleType, setScaleType] = useState<"normal" | "logarithmic" | "percentage">("normal");

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

  const timeframes = [
    { label: "1D", value: "1" },
    { label: "7D", value: "7" },
    { label: "1M", value: "30" },
    { label: "3M", value: "90" },
    { label: "6M", value: "180" },
    { label: "1Y", value: "365" },
  ];

  const handleCoinChange = (newCoinId: string) => {
    navigate(`/market/${newCoinId}`);
  };

  const handleExportChart = () => {
    if (!chartContainerRef.current) return;
    
    const canvas = chartContainerRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${coinId}-chart-${new Date().toISOString().split('T')[0]}.png`;
      link.href = url;
      link.click();
    }
  };

  const updateChartType = (newType: "candlestick" | "line" | "area" | "bars" | "hlc") => {
    if (!chartRef.current || !chartData.length) return;
    
    // Remove old series
    if (seriesRef.current) {
      chartRef.current.removeSeries(seriesRef.current);
    }

    let newSeries;
    
    if (newType === "candlestick") {
      newSeries = chartRef.current.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderUpColor: "#26a69a",
        borderDownColor: "#ef5350",
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
      newSeries.setData(chartData);
    } else if (newType === "bars") {
      newSeries = chartRef.current.addSeries(BarSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        openVisible: true,
        thinBars: false,
      });
      newSeries.setData(chartData);
    } else if (newType === "line") {
      newSeries = chartRef.current.addSeries(LineSeries, {
        color: "#26a69a",
        lineWidth: 2,
      });
      const lineData = chartData.map(d => ({
        time: d.time,
        value: d.close,
      }));
      newSeries.setData(lineData);
    } else if (newType === "area") {
      newSeries = chartRef.current.addSeries(AreaSeries, {
        topColor: "rgba(38, 166, 154, 0.4)",
        bottomColor: "rgba(38, 166, 154, 0.0)",
        lineColor: "#26a69a",
        lineWidth: 2,
      });
      const areaData = chartData.map(d => ({
        time: d.time,
        value: d.close,
      }));
      newSeries.setData(areaData);
    } else if (newType === "hlc") {
      // HLC using bar series
      newSeries = chartRef.current.addSeries(BarSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        openVisible: false,
        thinBars: true,
      });
      newSeries.setData(chartData);
    }

    seriesRef.current = newSeries;
    chartRef.current.timeScale().fitContent();
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const bgColor = isDarkTheme ? "#0D0D2B" : "#ffffff";
    const textColor = isDarkTheme ? "#d1d4dc" : "#191919";
    const gridColor = isDarkTheme ? "rgba(42, 46, 57, 0.3)" : "rgba(197, 203, 206, 0.4)";

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 560,
      layout: {
        background: { type: ColorType.Solid, color: bgColor },
        textColor: textColor,
      },
      rightPriceScale: { 
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.2 },
        mode: scaleType === "logarithmic" ? 1 : scaleType === "percentage" ? 2 : 0,
      },
      timeScale: { 
        borderVisible: false, 
        timeVisible: true, 
        secondsVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      grid: {
        vertLines: { color: gridColor },
        horzLines: { color: gridColor },
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

    let series;
    if (chartType === "candlestick") {
      series = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderUpColor: "#26a69a",
        borderDownColor: "#ef5350",
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });
    }

    chartRef.current = chart;
    seriesRef.current = series;

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
  }, [isDarkTheme]);

  useEffect(() => {
    const loadOHLC = async () => {
      if (!coinId) return;
      
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crypto-ohlc?coin=${coinId}&days=${days}&vs=usd`;
        const res = await fetch(url);
        
        if (!res.ok) throw new Error("Failed to fetch OHLC data");
        
        const formattedData = await res.json();
        setChartData(formattedData);
        setLastUpdate(new Date());

        if (seriesRef.current && formattedData.length > 0) {
          if (chartType === "candlestick") {
            seriesRef.current.setData(formattedData);
          } else {
            const convertedData = formattedData.map((d: any) => ({
              time: d.time,
              value: d.close,
            }));
            seriesRef.current.setData(convertedData);
          }
          
          const latestClose = formattedData[formattedData.length - 1].close;
          const firstClose = formattedData[0].close;
          const change = ((latestClose - firstClose) / firstClose) * 100;
          
          setCurrentPrice(latestClose);
          setPriceChange(change);

          chartRef.current?.timeScale().fitContent();
        }
      } catch (err) {
        console.error("Error loading OHLC:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOHLC();

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      loadOHLC();
    }, 30000);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      clearInterval(refreshInterval);
    };
  }, [coinId, days, chartType]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.applyOptions({
        rightPriceScale: {
          mode: scaleType === "logarithmic" ? 1 : scaleType === "percentage" ? 2 : 0,
        },
      });
    }
  }, [scaleType]);

  useEffect(() => {
    if (chartData.length > 0) {
      updateChartType(chartType);
    }
  }, [chartType]);

  const bgColor = isDarkTheme ? "#0D0D2B" : "#f5f5f5";
  const cardBg = isDarkTheme ? "#1a1a2e" : "#ffffff";
  const borderColor = isDarkTheme ? "gray-800" : "gray-200";
  const textPrimary = isDarkTheme ? "white" : "gray-900";
  const textSecondary = isDarkTheme ? "gray-400" : "gray-600";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bgColor }}>
      <Header />
      <div className="container mx-auto px-4 py-6 max-w-[1600px]">
        {/* Top Controls Bar */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Coin Selector & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className={`${isDarkTheme ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'} px-4`}
              >
                Back
              </Button>
              
              <select
                value={coinId}
                onChange={(e) => handleCoinChange(e.target.value)}
                className={`border rounded-lg px-4 py-2 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary min-w-[180px] ${
                  isDarkTheme 
                    ? 'border-gray-700 bg-[#1a1a2e] text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                {availableCoins.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name} ({coin.symbol})
                  </option>
                ))}
              </select>
              
              <span className={`text-lg ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>/ USD</span>
            </div>

            {/* Theme & Export */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDarkTheme(!isDarkTheme)}
                className={isDarkTheme ? 'border-gray-700 hover:bg-white/10' : 'border-gray-300'}
              >
                {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleExportChart}
                className={isDarkTheme ? 'border-gray-700 hover:bg-white/10' : 'border-gray-300'}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chart Type & Timeframe Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            {/* Chart Type Selector */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={chartType === "candlestick" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("candlestick")}
                className={chartType !== "candlestick" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
              >
                Candlestick
              </Button>
              <Button
                variant={chartType === "bars" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bars")}
                className={chartType !== "bars" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
              >
                Bars
              </Button>
              <Button
                variant={chartType === "hlc" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("hlc")}
                className={chartType !== "hlc" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
              >
                HLC
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
                className={chartType !== "line" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
              >
                Line
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("area")}
                className={chartType !== "area" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
              >
                Area
              </Button>
            </div>

            {/* Timeframe Buttons */}
            <div className="flex gap-2 flex-wrap items-center">
              {timeframes.map((tf) => (
                <Button
                  key={tf.value}
                  variant={days === tf.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDays(tf.value)}
                  className={days !== tf.value && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
                >
                  {tf.label}
                </Button>
              ))}
              
              {/* Price Scale Options */}
              <div className="flex gap-1 ml-2 border-l pl-2">
                <Button
                  variant={scaleType === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScaleType("normal")}
                  className={scaleType !== "normal" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
                  title="Normal Scale"
                >
                  Normal
                </Button>
                <Button
                  variant={scaleType === "logarithmic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScaleType("logarithmic")}
                  className={scaleType !== "logarithmic" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
                  title="Logarithmic Scale"
                >
                  Log
                </Button>
                <Button
                  variant={scaleType === "percentage" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setScaleType("percentage")}
                  className={scaleType !== "percentage" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}
                  title="Percentage Scale"
                >
                  %
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className={`mb-6 rounded-xl p-4 border ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div>
                <div className={`text-sm mb-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Current Price</div>
                <div className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                  ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`${priceChange >= 0 ? "text-[#26a69a]" : "text-[#ef5350]"} font-semibold text-lg`}>
                  {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(2)}%
                </span>
                <span className={`text-sm ml-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>({days}D)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                Live
              </span>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <p className={isDarkTheme ? 'text-gray-400' : 'text-gray-600'}>Loading chart data...</p>
          </div>
        )}

        {/* Chart Container */}
        <div className={`relative rounded-2xl border overflow-hidden shadow-2xl ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
          <style>{`
            .tv-lightweight-charts {
              position: relative !important;
            }
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
          <div className={`rounded-xl p-4 border ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>24h Volume</div>
            <div className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>High Liquidity</div>
          </div>
          <div className={`rounded-xl p-4 border ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Market Cap Rank</div>
            <div className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              #{coinId === "bitcoin" ? "1" : "2"}
            </div>
          </div>
          <div className={`rounded-xl p-4 border ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
            <div className={`text-sm mb-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>Trading Status</div>
            <div className="text-xl font-bold text-[#26a69a]">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
