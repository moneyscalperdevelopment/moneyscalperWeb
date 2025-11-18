import { TrendingUp } from "lucide-react";

interface TrendingItem {
  rank: number;
  title: string;
  category: string;
}

const trendingPosts: TrendingItem[] = [
  { rank: 1, title: "Bitcoin Hits New All-Time High", category: "Bitcoin" },
  { rank: 2, title: "AI Trading: The Future is Now", category: "AI" },
  { rank: 3, title: "DeFi Security Best Practices", category: "Security" },
  { rank: 4, title: "Ethereum 2.0 Staking Guide", category: "Ethereum" },
  { rank: 5, title: "Technical Analysis Masterclass", category: "Education" },
];

const SidebarTrending = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Trending Now</h3>
      </div>

      <div className="space-y-4">
        {trendingPosts.map((post) => (
          <div 
            key={post.rank}
            className="flex gap-3 group cursor-pointer"
          >
            {/* Rank Number */}
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-sm font-bold text-primary">{post.rank}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">{post.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarTrending;
