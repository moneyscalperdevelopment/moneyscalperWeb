import ArticleCard from "./ArticleCard";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

// Dummy article data - can be replaced with CMS later
const articles: Article[] = [
  {
    id: "1",
    title: "Bitcoin Price Prediction 2024: Expert Analysis",
    excerpt: "Deep dive into Bitcoin's technical indicators and on-chain metrics to forecast potential price movements in Q1 2024.",
    category: "Bitcoin",
    image: "/src/assets/bitcoin-logo.webp",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    slug: "bitcoin-price-prediction-2024"
  },
  {
    id: "2",
    title: "Ethereum Smart Contract Trading Strategies",
    excerpt: "Learn how to leverage Ethereum smart contracts for automated trading and maximize your DeFi returns.",
    category: "Ethereum",
    image: "/src/assets/ethereum-logo.png",
    date: "Dec 14, 2024",
    readTime: "6 min read",
    slug: "ethereum-smart-contract-strategies"
  },
  {
    id: "3",
    title: "AI Trading Bots: Complete Beginner's Guide",
    excerpt: "Everything you need to know about AI-powered trading bots, from setup to advanced configuration.",
    category: "Strategy",
    image: "/src/assets/ms-logo-3d.jpeg",
    date: "Dec 13, 2024",
    readTime: "10 min read",
    slug: "ai-trading-bots-guide"
  },
  {
    id: "4",
    title: "Understanding On-Chain Metrics for Trading",
    excerpt: "Master the art of reading blockchain data to make informed trading decisions and spot trends early.",
    category: "On-chain",
    image: "/src/assets/hero-crypto.jpg",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    slug: "on-chain-metrics-trading"
  },
  {
    id: "5",
    title: "Risk Management in Volatile Crypto Markets",
    excerpt: "Essential risk management techniques to protect your capital during extreme market volatility.",
    category: "Strategy",
    image: "/src/assets/bitcoin-logo.webp",
    date: "Dec 11, 2024",
    readTime: "5 min read",
    slug: "risk-management-crypto"
  },
  {
    id: "6",
    title: "DeFi Yield Farming: Maximizing Returns Safely",
    excerpt: "Explore proven yield farming strategies and learn how to identify legitimate opportunities.",
    category: "DeFi",
    image: "/src/assets/ethereum-logo.png",
    date: "Dec 10, 2024",
    readTime: "9 min read",
    slug: "defi-yield-farming-guide"
  }
];

const ArticleGrid = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Latest Articles</h2>
        <p className="text-sm text-muted-foreground">{articles.length} articles</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleGrid;
