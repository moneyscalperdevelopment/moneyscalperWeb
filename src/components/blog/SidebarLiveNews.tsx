import { useEffect, useState } from "react";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
}

const SidebarLiveNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using CryptoCompare free API (no key required for basic usage)
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=BTC,ETH"
        );
        const data = await response.json();

        if (data.Data) {
          const formattedNews: NewsItem[] = data.Data.slice(0, 6).map((item: any) => ({
            id: item.id,
            title: item.title,
            source: item.source,
            url: item.url,
            publishedAt: new Date(item.published_on * 1000).toISOString(),
          }));

          setNews(formattedNews);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Live Crypto News</h3>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-muted/50 rounded" />
              <div className="h-3 bg-muted/30 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.source}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{getTimeAgo(item.publishedAt)}</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Divider */}
              {item.id !== news[news.length - 1].id && (
                <div className="h-px bg-border/30 mt-4" />
              )}
            </a>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border/30">
        <p className="text-xs text-muted-foreground text-center">
          News updates every 5 minutes
        </p>
      </div>
    </div>
  );
};

export default SidebarLiveNews;
