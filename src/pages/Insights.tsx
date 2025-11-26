import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, TrendingDown, BarChart3, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { createChart, ColorType, IChartApi, LineSeries } from "lightweight-charts";
import { AddToWatchlistButton } from "@/components/market/AddToWatchlistButton";
import { CreatePriceAlert } from "@/components/market/CreatePriceAlert";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CoinMover {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

const Insights = () => {
  const [gainers, setGainers] = useState<CoinMover[]>([]);
  const [losers, setLosers] = useState<CoinMover[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<CoinMover | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchTopMovers();
  }, []);

  useEffect(() => {
    if (selectedCoin?.sparkline_in_7d?.price) {
      renderChart(selectedCoin.sparkline_in_7d.price);
    }
  }, [selectedCoin]);

  const fetchTopMovers = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=price_change_percentage_24h_desc&per_page=100&page=1&price_change_percentage=24h&sparkline=true"
      );
      const coins: CoinMover[] = await response.json();

      const filtered = coins.filter((c) => c.current_price > 0 && c.total_volume > 50000);

      const topGainers = filtered.slice(0, 20);
      const topLosers = [...filtered]
        .sort((a, b) => (a.price_change_percentage_24h || 0) - (b.price_change_percentage_24h || 0))
        .slice(0, 20);

      setGainers(topGainers);
      setLosers(topLosers);
      
      if (topGainers.length > 0) {
        setSelectedCoin(topGainers[0]);
      }
    } catch (error) {
      console.error("Error fetching top movers:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderChart = (priceData: number[]) => {
    const chartContainer = document.getElementById('insights-chart');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';

    const chart: IChartApi = createChart(chartContainer, {
      layout: {
        background: { type: ColorType.Solid, color: '#111111' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#1F2933' },
        horzLines: { color: '#1F2933' },
      },
      width: chartContainer.clientWidth,
      height: 400,
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: selectedCoin && selectedCoin.price_change_percentage_24h > 0 ? '#22C55E' : '#EF4444',
      lineWidth: 2,
    });

    const chartData = priceData.map((price, index) => ({
      time: (Date.now() / 1000 - (priceData.length - index) * 3600) as any,
      value: price,
    }));

    lineSeries.setData(chartData);
    chart.timeScale().fitContent();

    const handleResize = () => {
      chart.applyOptions({ width: chartContainer.clientWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const MoverRow = ({ coin, isGainer }: { coin: CoinMover; isGainer: boolean }) => {
    const navigate = useNavigate();
    
    return (
      <div
        className={`rounded-lg transition-all ${
          selectedCoin?.id === coin.id ? 'bg-accent/20' : 'hover:bg-accent/10'
        }`}
        style={{ background: selectedCoin?.id === coin.id ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255, 255, 255, 0.02)' }}
      >
        <div
          onClick={() => setSelectedCoin(coin)}
          className="flex items-center justify-between p-4 cursor-pointer"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex items-center gap-3 flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/market/${coin.id}`);
                  }}
                >
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-semibold underline decoration-primary/50" style={{ color: '#FFFFFF' }}>
                      {coin.name}
                    </p>
                    <p className="text-sm" style={{ color: '#9CA3AF' }}>
                      {coin.symbol.toUpperCase()}
                    </p>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to view detailed chart on Market page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="text-right">
            <p className="font-semibold" style={{ color: '#FFFFFF' }}>
              ${coin.current_price.toLocaleString()}
            </p>
            <p
              className="text-sm font-bold flex items-center gap-1 justify-end"
              style={{ color: isGainer ? '#22C55E' : '#EF4444' }}
            >
              {isGainer ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>
        </div>
        
        {/* Action Buttons - Show when selected */}
        {selectedCoin?.id === coin.id && (
          <div className="px-4 pb-4 flex gap-2 animate-fade-in">
            <AddToWatchlistButton
              coinId={coin.id}
              coinName={coin.name}
              coinSymbol={coin.symbol}
              size="sm"
              className="flex-1"
            />
            <CreatePriceAlert
              coinId={coin.id}
              coinName={coin.name}
              coinSymbol={coin.symbol}
              currentPrice={coin.current_price}
              size="sm"
              className="flex-1"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Market Insights - Money Scalper | Top Movers & Analytics</title>
        <meta 
          name="description" 
          content="Discover top cryptocurrency gainers and losers with real-time analytics, charts, and market insights from Money Scalper." 
        />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050509' }}>
        <Header />
        
        <section className="pt-24 pb-16">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Market Insights & Analytics
              </h1>
              <p className="text-lg" style={{ color: '#9CA3AF' }}>
                Track top movers, analyze trends, and stay ahead of the market
              </p>
            </div>

            {loading ? (
              <div className="grid lg:grid-cols-3 gap-6">
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
                <Skeleton className="h-96" />
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Top Gainers */}
                <div className="rounded-xl p-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-6 h-6" style={{ color: '#22C55E' }} />
                    <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                      Top Gainers (24h)
                    </h2>
                  </div>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {gainers.map((coin) => (
                      <MoverRow key={coin.id} coin={coin} isGainer={true} />
                    ))}
                  </div>
                </div>

                {/* Analytics Chart */}
                <div className="lg:col-span-1 rounded-xl p-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <BarChart3 className="w-6 h-6" style={{ color: '#E5FF3D' }} />
                    <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                      7-Day Price Chart
                    </h2>
                  </div>
                  
                  {selectedCoin && (
                    <div className="mb-4 p-4 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <img src={selectedCoin.image} alt={selectedCoin.name} className="w-8 h-8 rounded-full" />
                        <div>
                          <p className="font-bold" style={{ color: '#FFFFFF' }}>
                            {selectedCoin.name}
                          </p>
                          <p className="text-sm" style={{ color: '#9CA3AF' }}>
                            {selectedCoin.symbol.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                        ${selectedCoin.current_price.toLocaleString()}
                      </p>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: selectedCoin.price_change_percentage_24h > 0 ? '#22C55E' : '#EF4444' }}
                      >
                        {selectedCoin.price_change_percentage_24h > 0 ? '+' : ''}
                        {selectedCoin.price_change_percentage_24h.toFixed(2)}% (24h)
                      </p>
                    </div>
                  )}

                  <div id="insights-chart" className="w-full" />

                  {selectedCoin && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                        <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>Market Cap</p>
                        <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                          ${(selectedCoin.market_cap / 1e9).toFixed(2)}B
                        </p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                        <p className="text-xs mb-1" style={{ color: '#9CA3AF' }}>24h Volume</p>
                        <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>
                          ${(selectedCoin.total_volume / 1e9).toFixed(2)}B
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Top Losers */}
                <div className="rounded-xl p-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingDown className="w-6 h-6" style={{ color: '#EF4444' }} />
                    <h2 className="text-xl font-bold" style={{ color: '#FFFFFF' }}>
                      Top Losers (24h)
                    </h2>
                  </div>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {losers.map((coin) => (
                      <MoverRow key={coin.id} coin={coin} isGainer={false} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Insights;
