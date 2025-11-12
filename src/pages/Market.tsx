import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChart, ColorType, CandlestickSeries, LineSeries, AreaSeries, BarSeries, HistogramSeries } from "lightweight-charts";
import { Button } from "@/components/ui/button";
import { Download, Moon, Sun } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";

const Market = () => {
  const { coin } = useParams<{ coin: string }>();
  const navigate = useNavigate();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [days, setDays] = useState("30");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [chartType, setChartType] = useState<"candlestick" | "line" | "area" | "bars" | "hlc">("candlestick");
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showVolume, setShowVolume] = useState(false);
  const [scaleType, setScaleType] = useState<"normal" | "logarithmic" | "percentage">("normal");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const isMobile = useIsMobile();
  
  // Check for tablet/iPad view (under 1024px)
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  
  useEffect(() => {
    const checkSize = () => {
      setIsTabletOrMobile(window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const coinMap: Record<string, string> = {
    btc: "bitcoin",
    bitcoin: "bitcoin",
    eth: "ethereum",
    ethereum: "ethereum",
  };

  const coinId = coinMap[coin?.toLowerCase() || ""] || coin;

  // Cache key for localStorage
  const getCacheKey = (coinId: string, days: string) => `chart_${coinId}_${days}`;

  // Load cached data immediately
  const loadCachedData = (coinId: string, days: string) => {
    try {
      const cacheKey = getCacheKey(coinId, days);
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Use cached data if less than 5 minutes old
        const age = Date.now() - timestamp;
        if (age < 5 * 60 * 1000) {
          return data;
        }
      }
    } catch (err) {
      console.error('Error loading cached data:', err);
    }
    return null;
  };

  // Save data to cache
  const saveToCache = (coinId: string, days: string, data: any[]) => {
    try {
      const cacheKey = getCacheKey(coinId, days);
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error saving to cache:', err);
    }
  };

  // Retry with exponential backoff
  const fetchWithRetry = async (url: string, maxRetries = 3): Promise<Response> => {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        
        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
        });
        
        clearTimeout(timeoutId);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        return res;
      } catch (err) {
        lastError = err as Error;
        
        // Don't retry on abort
        if (err.name === 'AbortError') {
          throw err;
        }
        
        // If not the last attempt, wait with exponential backoff
        if (attempt < maxRetries - 1) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.log(`Retry attempt ${attempt + 1} after ${delay}ms`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError || new Error('Failed to fetch after retries');
  };

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

  const handleManualRefresh = () => {
    setFetchError(null);
    setRefreshing(true);
    setRefreshTrigger(prev => prev + 1);
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

    // Always initialize with candlestick series, updateChartType will handle conversion
    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    chartRef.current = chart;
    seriesRef.current = series;
    
    console.log('Chart initialized - chartRef:', !!chartRef.current, 'seriesRef:', !!seriesRef.current);

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
    let isMounted = true;
    let refreshInterval: NodeJS.Timeout | null = null;
    
    console.log('Data loading effect - chartRef:', !!chartRef.current, 'seriesRef:', !!seriesRef.current);
    
    // Load cached data immediately for instant UI
    const cachedData = loadCachedData(coinId, days);
    if (cachedData && cachedData.length > 0) {
      console.log('Loaded cached data:', cachedData.length, 'points');
      setChartData(cachedData);
      setLoading(false);
      
      // Update chart with cached data - wait for series to be ready
      const updateCachedData = () => {
        if (seriesRef.current && chartRef.current) {
          console.log('Setting cached data to chart');
          try {
            if (chartType === "candlestick" || chartType === "bars" || chartType === "hlc") {
              seriesRef.current.setData(cachedData);
            } else {
              const convertedData = cachedData.map((d: any) => ({
                time: d.time,
                value: d.close,
              }));
              seriesRef.current.setData(convertedData);
            }
            
            const latestClose = cachedData[cachedData.length - 1].close;
            const firstClose = cachedData[0].close;
            const change = ((latestClose - firstClose) / firstClose) * 100;
            
            setCurrentPrice(latestClose);
            setPriceChange(change);
            
            requestAnimationFrame(() => {
              if (chartRef.current && isMounted) {
                chartRef.current.timeScale().fitContent();
              }
            });
          } catch (err) {
            console.error('Error setting cached data:', err);
          }
        } else {
          console.log('Chart not ready yet, retrying...');
          setTimeout(updateCachedData, 50);
        }
      };
      
      updateCachedData();
      
      // Set refreshing state to show we're fetching fresh data
      setRefreshing(true);
    }
    
    const loadOHLC = async (isInitialLoad = true) => {
      if (!coinId || !isMounted) return;
      
      if (isInitialLoad && !cachedData) {
        setLoading(true);
      }
      
      // Clear previous error when starting fresh fetch
      setFetchError(null);
      
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/crypto-ohlc?coin=${coinId}&days=${days}&vs=usd`;
        const res = await fetchWithRetry(url);
        
        const formattedData = await res.json();
        
        if (!isMounted) return;
        
        // Save to cache
        saveToCache(coinId, days, formattedData);
        
        setChartData(formattedData);
        setLastUpdate(new Date());

        if (seriesRef.current && formattedData.length > 0) {
          console.log('Setting fresh data to chart:', formattedData.length, 'points');
          try {
            if (chartType === "candlestick" || chartType === "bars" || chartType === "hlc") {
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

            requestAnimationFrame(() => {
              if (chartRef.current && isMounted) {
                chartRef.current.timeScale().fitContent();
              }
            });
          } catch (err) {
            console.error('Error setting fresh data:', err);
          }
        } else {
          console.log('Series not ready or no data:', !!seriesRef.current, formattedData.length);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error("Error loading OHLC:", err);
          const errorMsg = err instanceof Error ? err.message : "Failed to load chart data";
          setFetchError(errorMsg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    // Load fresh data
    loadOHLC(true);

    // Set up background refresh
    refreshInterval = setInterval(() => {
      if (isMounted) {
        setRefreshing(true);
        loadOHLC(false);
      }
    }, 60000);

    return () => {
      isMounted = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [coinId, days, chartType, refreshTrigger]);

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
    if (chartData.length > 0 && chartRef.current) {
      // Debounce chart type updates
      const timeoutId = setTimeout(() => {
        updateChartType(chartType);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [chartType]);

  // Ensure chart resizes when it becomes visible after loading
  useEffect(() => {
    if (!loading && chartRef.current && chartContainerRef.current) {
      const width = chartContainerRef.current.clientWidth || 600;
      chartRef.current.applyOptions({ width });
      requestAnimationFrame(() => {
        try {
          chartRef.current.timeScale().fitContent();
        } catch (_) {}
      });
    }
  }, [loading]);

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
            </div>

            {/* Theme & Export - Desktop Only */}
            {!isTabletOrMobile && (
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
            )}
          </div>

          {/* Chart Type & Timeframe Controls */}
          <div className="flex flex-col gap-3">
            {/* Mobile & Tablet Dropdowns */}
            {isTabletOrMobile ? (
              <div className="flex gap-2">
                {/* Chart Type Dropdown */}
                <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                  <SelectTrigger className={`flex-1 ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                    <SelectValue placeholder="Chart Type" />
                  </SelectTrigger>
                  <SelectContent className={`${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white'} z-50`}>
                    <SelectItem value="candlestick">Candlestick</SelectItem>
                    <SelectItem value="bars">Bars</SelectItem>
                    <SelectItem value="hlc">HLC</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>

                {/* Timeframe Dropdown */}
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger className={`flex-1 ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent className={`${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white'} z-50`}>
                    {timeframes.map((tf) => (
                      <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Scale Type Dropdown */}
                <Select value={scaleType} onValueChange={(value: any) => setScaleType(value)}>
                  <SelectTrigger className={`flex-1 ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white border-gray-300'}`}>
                    <SelectValue placeholder="Scale" />
                  </SelectTrigger>
                  <SelectContent className={`${isDarkTheme ? 'bg-[#1a1a2e] border-gray-700 text-white' : 'bg-white'} z-50`}>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="logarithmic">Log</SelectItem>
                    <SelectItem value="percentage">%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                {/* Desktop Buttons - Chart Type Selector */}
                <div className="flex gap-1.5 flex-wrap">
                  <Button
                    variant={chartType === "candlestick" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("candlestick")}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 ${chartType !== "candlestick" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                  >
                    Candlestick
                  </Button>
                  <Button
                    variant={chartType === "bars" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("bars")}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 ${chartType !== "bars" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                  >
                    Bars
                  </Button>
                  <Button
                    variant={chartType === "hlc" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("hlc")}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 ${chartType !== "hlc" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                  >
                    HLC
                  </Button>
                  <Button
                    variant={chartType === "line" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("line")}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 ${chartType !== "line" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                  >
                    Line
                  </Button>
                  <Button
                    variant={chartType === "area" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("area")}
                    className={`text-xs sm:text-sm px-2.5 sm:px-3 ${chartType !== "area" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                  >
                    Area
                  </Button>
                </div>

                {/* Timeframe and Scale Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  {/* Timeframe Buttons */}
                  <div className="flex gap-1.5 flex-wrap">
                    {timeframes.map((tf) => (
                      <Button
                        key={tf.value}
                        variant={days === tf.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDays(tf.value)}
                        className={`text-xs sm:text-sm px-2.5 sm:px-3 ${days !== tf.value && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                      >
                        {tf.label}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Price Scale Options */}
                  <div className="flex gap-1.5 flex-wrap sm:border-l sm:pl-3">
                    <Button
                      variant={scaleType === "normal" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setScaleType("normal")}
                      className={`text-xs sm:text-sm px-2.5 sm:px-3 ${scaleType !== "normal" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                      title="Normal Scale"
                    >
                      Normal
                    </Button>
                    <Button
                      variant={scaleType === "logarithmic" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setScaleType("logarithmic")}
                      className={`text-xs sm:text-sm px-2.5 sm:px-3 ${scaleType !== "logarithmic" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                      title="Logarithmic Scale"
                    >
                      Log
                    </Button>
                    <Button
                      variant={scaleType === "percentage" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setScaleType("percentage")}
                      className={`text-xs sm:text-sm px-2.5 sm:px-3 ${scaleType !== "percentage" && isDarkTheme ? 'border-gray-700 hover:bg-white/10' : ''}`}
                      title="Percentage Scale"
                    >
                      %
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Price Summary */}
        <div className={`mb-6 rounded-xl p-4 border ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
          {/* Mobile & Tablet: Toggle on top */}
          {isTabletOrMobile && (
            <div className="flex justify-center mb-4">
              <div className={`inline-flex rounded-lg border p-1 ${isDarkTheme ? 'bg-[#0D0D2B] border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                <Button
                  variant={coinId === "bitcoin" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleCoinChange("bitcoin")}
                  className={`px-4 py-2 ${coinId === "bitcoin" ? '' : isDarkTheme ? 'text-white hover:bg-white/10' : 'text-gray-900'}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">₿</span>
                    <span className="font-bold">Bitcoin</span>
                  </span>
                </Button>
                <Button
                  variant={coinId === "ethereum" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleCoinChange("ethereum")}
                  className={`px-4 py-2 ${coinId === "ethereum" ? '' : isDarkTheme ? 'text-white hover:bg-white/10' : 'text-gray-900'}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">Ξ</span>
                    <span className="font-bold">Ethereum</span>
                  </span>
                </Button>
              </div>
            </div>
          )}
          
          <div className={`grid ${isTabletOrMobile ? 'grid-cols-1' : 'grid-cols-3'} items-center gap-4`}>
            {/* Left: Price Info */}
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
            
            {/* Center: Bitcoin/Ethereum Toggle Switcher - Desktop only */}
            {!isTabletOrMobile && (
              <div className="flex justify-center">
                <div className={`inline-flex rounded-lg border p-1 ${isDarkTheme ? 'bg-[#0D0D2B] border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                  <Button
                    variant={coinId === "bitcoin" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCoinChange("bitcoin")}
                    className={`px-6 py-2 ${coinId === "bitcoin" ? '' : isDarkTheme ? 'text-white hover:bg-white/10' : 'text-gray-900'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">₿</span>
                      <span className="font-bold">Bitcoin</span>
                    </span>
                  </Button>
                  <Button
                    variant={coinId === "ethereum" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleCoinChange("ethereum")}
                    className={`px-6 py-2 ${coinId === "ethereum" ? '' : isDarkTheme ? 'text-white hover:bg-white/10' : 'text-gray-900'}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">Ξ</span>
                      <span className="font-bold">Ethereum</span>
                    </span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Right: Live Indicator */}
            <div className={`flex items-center gap-2 ${isTabletOrMobile ? 'justify-start' : 'justify-end'}`}>
              {refreshing && !loading && (
                <>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-spin border-2 border-transparent border-t-blue-500" />
                  <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    Updating...
                  </span>
                </>
              )}
              {!refreshing && (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                    Live
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {loading && (
          <div className={`relative rounded-2xl border overflow-hidden shadow-2xl mb-6 ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}
            style={{ height: "560px" }}>
            {/* Skeleton Loader */}
            <div className="absolute inset-0 p-4">
              {/* Chart Header Skeleton */}
              <div className="flex items-center justify-between mb-4">
                <div className={`h-6 w-32 rounded animate-pulse ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className={`h-6 w-24 rounded animate-pulse ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
              
              {/* Chart Area with Animated Bars */}
              <div className="relative h-[440px] flex items-end justify-around gap-1 px-4">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" />
                
                {/* Animated skeleton bars */}
                {[65, 45, 75, 55, 85, 60, 70, 50, 80, 65, 55, 75, 60, 70, 80, 55, 65, 75, 60, 70].map((height, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t transition-all duration-1000 ${isDarkTheme ? 'bg-gray-700/50' : 'bg-gray-300/50'}`}
                    style={{ 
                      height: `${height}%`,
                      animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`
                    }}
                  />
                ))}
                
                {/* Horizontal grid lines */}
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 25, 50, 75, 100].map((pos) => (
                    <div
                      key={pos}
                      className={`absolute left-0 right-0 h-px ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-200'}`}
                      style={{ top: `${pos}%` }}
                    />
                  ))}
                </div>
              </div>
              
              {/* X-axis Time Labels Skeleton */}
              <div className="flex justify-between px-4 mt-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`h-4 w-16 rounded animate-pulse ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />
                ))}
              </div>
              
              {/* Loading Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <p className={`text-sm font-medium ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    Loading chart data...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Banner */}
        {fetchError && !loading && (
          <div className={`mb-4 rounded-xl border p-4 ${isDarkTheme ? 'bg-red-950/20 border-red-900/50' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className={`font-semibold mb-1 ${isDarkTheme ? 'text-red-400' : 'text-red-700'}`}>
                  Unable to load chart data
                </div>
                <div className={`text-sm ${isDarkTheme ? 'text-red-300' : 'text-red-600'}`}>
                  {fetchError}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualRefresh}
                className={`flex-shrink-0 ${isDarkTheme ? 'border-red-800 hover:bg-red-900/30 text-red-400' : 'border-red-300 hover:bg-red-100 text-red-700'}`}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Chart Container */}
        <div className={`relative rounded-2xl border overflow-hidden shadow-2xl ${loading ? 'hidden' : ''} ${isDarkTheme ? 'bg-[#1a1a2e] border-gray-800' : 'bg-white border-gray-200'}`}>
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
