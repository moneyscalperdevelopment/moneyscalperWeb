import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Bell, 
  Plus, 
  Trash2,
  ExternalLink,
  DollarSign,
  Activity,
  Star
} from "lucide-react";
import { toast } from "sonner";

interface WatchlistItem {
  id: string;
  coin_id: string;
  coin_name: string;
  coin_symbol: string;
  created_at: string;
  price?: number;
  price_change_24h?: number;
  image?: string;
}

interface PriceAlert {
  id: string;
  coin_id: string;
  coin_name: string;
  coin_symbol: string;
  condition: string;
  target_price: number;
  is_triggered: boolean;
  created_at: string;
}

interface MarketOverview {
  totalCoins: number;
  gainers: number;
  losers: number;
  topGainer?: { name: string; change: number };
  topLoser?: { name: string; change: number };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketOverview | null>(null);
  const [pricesLoading, setPricesLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/');
      return;
    }
    setUser(session.user);
    await Promise.all([
      fetchWatchlist(session.user.id),
      fetchAlerts(session.user.id),
      fetchMarketOverview()
    ]);
    setLoading(false);
  };

  const fetchWatchlist = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('watchlist')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setWatchlist(data || []);
      
      // Fetch live prices for watchlist items
      if (data && data.length > 0) {
        fetchWatchlistPrices(data);
      }
    } catch (error: any) {
      console.error('Error fetching watchlist:', error);
      toast.error('Failed to load watchlist');
    }
  };

  const fetchWatchlistPrices = async (items: WatchlistItem[]) => {
    setPricesLoading(true);
    try {
      const coinIds = items.map(item => item.coin_id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
      );
      const prices = await response.json();

      const updatedWatchlist = items.map(item => ({
        ...item,
        price: prices[item.coin_id]?.usd,
        price_change_24h: prices[item.coin_id]?.usd_24h_change,
      }));

      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setPricesLoading(false);
    }
  };

  const fetchAlerts = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('user_id', userId)
        .eq('is_triggered', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error: any) {
      console.error('Error fetching alerts:', error);
      toast.error('Failed to load alerts');
    }
  };

  const fetchMarketOverview = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'
      );
      const data = await response.json();

      const gainers = data.filter((coin: any) => coin.price_change_percentage_24h > 0).length;
      const losers = data.filter((coin: any) => coin.price_change_percentage_24h < 0).length;

      const sortedByChange = [...data].sort((a, b) => 
        Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h)
      );

      const topGainer = sortedByChange.find((coin: any) => coin.price_change_percentage_24h > 0);
      const topLoser = sortedByChange.find((coin: any) => coin.price_change_percentage_24h < 0);

      setMarketOverview({
        totalCoins: data.length,
        gainers,
        losers,
        topGainer: topGainer ? { name: topGainer.name, change: topGainer.price_change_percentage_24h } : undefined,
        topLoser: topLoser ? { name: topLoser.name, change: topLoser.price_change_percentage_24h } : undefined,
      });
    } catch (error) {
      console.error('Error fetching market overview:', error);
    }
  };

  const removeFromWatchlist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setWatchlist(watchlist.filter(item => item.id !== id));
      toast.success('Removed from watchlist');
    } catch (error: any) {
      toast.error('Failed to remove from watchlist');
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('price_alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAlerts(alerts.filter(alert => alert.id !== id));
      toast.success('Alert deleted');
    } catch (error: any) {
      toast.error('Failed to delete alert');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#050509' }}>
        <div className="text-center">
          <Activity className="h-12 w-12 animate-pulse mx-auto mb-4" style={{ color: '#22C55E' }} />
          <p className="text-lg" style={{ color: '#FFFFFF' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Money Scalper</title>
        <meta name="description" content="Your personal crypto trading dashboard" />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050509' }}>
        <Header />

        <section className="pt-24 pb-16">
          <div className="container max-w-7xl mx-auto px-4">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>
                Welcome back!
              </h1>
              <p className="text-lg" style={{ color: '#9CA3AF' }}>
                {user?.email}
              </p>
            </div>

            {/* Market Overview */}
            {marketOverview && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Total Tracked</p>
                        <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                          {marketOverview.totalCoins}
                        </p>
                      </div>
                      <Activity className="w-8 h-8" style={{ color: '#22C55E' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Gainers (24h)</p>
                        <p className="text-2xl font-bold" style={{ color: '#22C55E' }}>
                          {marketOverview.gainers}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8" style={{ color: '#22C55E' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Losers (24h)</p>
                        <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                          {marketOverview.losers}
                        </p>
                      </div>
                      <TrendingDown className="w-8 h-8" style={{ color: '#EF4444' }} />
                    </div>
                  </CardContent>
                </Card>

                <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm mb-1" style={{ color: '#9CA3AF' }}>Watchlist</p>
                        <p className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>
                          {watchlist.length}
                        </p>
                      </div>
                      <Star className="w-8 h-8" style={{ color: '#E5FF3D' }} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Watchlist */}
              <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5" style={{ color: '#22C55E' }} />
                      <CardTitle style={{ color: '#FFFFFF' }}>My Watchlist</CardTitle>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => navigate('/market/bitcoin')}
                      style={{ background: '#22C55E', color: '#111111' }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Coins
                    </Button>
                  </div>
                  <CardDescription style={{ color: '#9CA3AF' }}>
                    Track your favorite cryptocurrencies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {watchlist.length === 0 ? (
                    <div className="text-center py-8">
                      <Eye className="w-12 h-12 mx-auto mb-3" style={{ color: '#9CA3AF' }} />
                      <p style={{ color: '#9CA3AF' }}>No coins in watchlist yet</p>
                      <Button
                        className="mt-4"
                        onClick={() => navigate('/market/bitcoin')}
                        style={{ background: '#22C55E', color: '#111111' }}
                      >
                        Browse Market
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {watchlist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/10 transition-colors"
                          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                        >
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                              <DollarSign className="w-5 h-5" style={{ color: '#22C55E' }} />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                                {item.coin_name}
                              </p>
                              <p className="text-sm" style={{ color: '#9CA3AF' }}>
                                {item.coin_symbol.toUpperCase()}
                              </p>
                            </div>
                          </div>

                          {pricesLoading ? (
                            <Skeleton className="h-8 w-24" />
                          ) : item.price ? (
                            <div className="text-right mr-2">
                              <p className="font-semibold" style={{ color: '#FFFFFF' }}>
                                ${item.price.toLocaleString()}
                              </p>
                              <p
                                className="text-sm font-semibold"
                                style={{ 
                                  color: item.price_change_24h && item.price_change_24h > 0 ? '#22C55E' : '#EF4444' 
                                }}
                              >
                                {item.price_change_24h && item.price_change_24h > 0 ? '+' : ''}
                                {item.price_change_24h?.toFixed(2)}%
                              </p>
                            </div>
                          ) : null}

                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => navigate(`/market/${item.coin_id}`)}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFromWatchlist(item.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Price Alerts */}
              <Card style={{ background: '#111111', border: '1px solid #1F2933' }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5" style={{ color: '#E5FF3D' }} />
                      <CardTitle style={{ color: '#FFFFFF' }}>Active Alerts</CardTitle>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => navigate('/market/bitcoin')}
                      style={{ background: '#E5FF3D', color: '#111111' }}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      New Alert
                    </Button>
                  </div>
                  <CardDescription style={{ color: '#9CA3AF' }}>
                    Get notified when prices hit your targets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.length === 0 ? (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 mx-auto mb-3" style={{ color: '#9CA3AF' }} />
                      <p style={{ color: '#9CA3AF' }}>No active alerts</p>
                      <Button
                        className="mt-4"
                        onClick={() => navigate('/market/bitcoin')}
                        style={{ background: '#E5FF3D', color: '#111111' }}
                      >
                        Create Alert
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{ background: 'rgba(229, 255, 61, 0.1)', border: '1px solid rgba(229, 255, 61, 0.2)' }}
                        >
                          <div className="flex-1">
                            <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                              {alert.coin_name} ({alert.coin_symbol.toUpperCase()})
                            </p>
                            <p className="text-sm" style={{ color: '#9CA3AF' }}>
                              Alert when price goes {alert.condition === 'above' ? 'above' : 'below'}{' '}
                              <span className="font-semibold" style={{ color: '#E5FF3D' }}>
                                ${alert.target_price.toLocaleString()}
                              </span>
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteAlert(alert.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            {marketOverview && (
              <Card className="mt-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                <CardHeader>
                  <CardTitle style={{ color: '#FFFFFF' }}>Market Insights</CardTitle>
                  <CardDescription style={{ color: '#9CA3AF' }}>
                    Top movers in the last 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {marketOverview.topGainer && (
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5" style={{ color: '#22C55E' }} />
                          <h3 className="font-semibold" style={{ color: '#22C55E' }}>Top Gainer</h3>
                        </div>
                        <p className="text-xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                          {marketOverview.topGainer.name}
                        </p>
                        <p className="text-2xl font-bold" style={{ color: '#22C55E' }}>
                          +{marketOverview.topGainer.change.toFixed(2)}%
                        </p>
                      </div>
                    )}

                    {marketOverview.topLoser && (
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingDown className="w-5 h-5" style={{ color: '#EF4444' }} />
                          <h3 className="font-semibold" style={{ color: '#EF4444' }}>Top Loser</h3>
                        </div>
                        <p className="text-xl font-bold mb-1" style={{ color: '#FFFFFF' }}>
                          {marketOverview.topLoser.name}
                        </p>
                        <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>
                          {marketOverview.topLoser.change.toFixed(2)}%
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex gap-4">
                    <Button
                      onClick={() => navigate('/insights')}
                      className="flex-1"
                      style={{ background: '#22C55E', color: '#111111' }}
                    >
                      View Full Insights
                    </Button>
                    <Button
                      onClick={() => navigate('/market/bitcoin')}
                      variant="outline"
                      className="flex-1"
                      style={{ borderColor: '#1F2933', color: '#FFFFFF' }}
                    >
                      Browse Markets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
