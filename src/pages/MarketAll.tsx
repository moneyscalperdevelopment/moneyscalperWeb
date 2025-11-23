import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { Search, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

const MarketAll = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"market_cap" | "price" | "change">("market_cap");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
        );
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        setCoins(data);
        setFilteredCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    };

    fetchAllCoins();
    const interval = setInterval(fetchAllCoins, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Filter and sort coins
  useEffect(() => {
    let filtered = [...coins];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;

      switch (sortBy) {
        case "price":
          aValue = a.current_price;
          bValue = b.current_price;
          break;
        case "change":
          aValue = a.price_change_percentage_24h;
          bValue = b.price_change_percentage_24h;
          break;
        case "market_cap":
        default:
          aValue = a.market_cap;
          bValue = b.market_cap;
          break;
      }

      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });

    setFilteredCoins(filtered);
  }, [searchQuery, sortBy, sortOrder, coins]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <Helmet>
        <title>All Cryptocurrencies Market - Money Scalper | Live Crypto Prices</title>
        <meta 
          name="description" 
          content="Explore live prices for 100+ cryptocurrencies. Search, filter, and sort by market cap, price, and 24h change. Real-time crypto market data." 
        />
        <meta name="keywords" content="cryptocurrency market, crypto prices, bitcoin price, ethereum price, altcoins, market cap, crypto trading" />
        <link rel="canonical" href="https://www.moneyscalper.com/market/all" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Cryptocurrency Market Overview
              </h1>
              <p className="text-lg text-muted-foreground">
                Track live prices for top 100 cryptocurrencies by market cap
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by name or symbol..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                {/* Sort By */}
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-[180px] h-12">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market_cap">Market Cap</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="change">24h Change</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleSortOrder}
                    className="h-12 w-12"
                  >
                    <ArrowUpDown className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Showing {filteredCoins.length} of {coins.length} cryptocurrencies</span>
                <span>•</span>
                <span>Updated every minute</span>
              </div>
            </div>

            {/* Coins Table */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-card border border-border rounded-xl p-6 animate-pulse">
                    <div className="h-16 bg-muted/50 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredCoins.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-12 text-center">
                <p className="text-lg text-muted-foreground">No cryptocurrencies found matching your search.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    onClick={() => navigate(`/market/${coin.id}`)}
                    className="bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      {/* Coin Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 transition-transform"
                        />
                        <div>
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {coin.name}
                          </h3>
                          <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right md:text-left">
                        <p className="text-lg md:text-xl font-bold text-foreground">
                          ${coin.current_price.toLocaleString(undefined, { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: coin.current_price < 1 ? 6 : 2 
                          })}
                        </p>
                      </div>

                      {/* 24h Change */}
                      <div className="flex items-center justify-start md:justify-center gap-2">
                        <div className={`flex items-center gap-1 ${
                          coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {coin.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-semibold">
                            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                          </span>
                        </div>
                      </div>

                      {/* Market Cap */}
                      <div className="text-right hidden md:block">
                        <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                        <p className="font-semibold text-foreground">
                          ${(coin.market_cap / 1e9).toFixed(2)}B
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MarketAll;
