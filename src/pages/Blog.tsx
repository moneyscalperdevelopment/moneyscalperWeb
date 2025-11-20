import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Clock, Calendar } from "lucide-react";
import SidebarMarketSnapshot from "@/components/blog/SidebarMarketSnapshot";
import SidebarLiveNews from "@/components/blog/SidebarLiveNews";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  slug: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Bitcoin Price Prediction 2025: What the Data Tells Us",
    excerpt: "As we move into 2025, Bitcoin remains the most influential asset in the digital economy. Data-driven forecasts provide sharper clarity on what may come next.",
    category: "Bitcoin",
    image: "/src/assets/blog/bitcoin-prediction-2025.jpg",
    date: "Nov 28, 2025",
    readTime: "8 min read",
    slug: "bitcoin-price-prediction-2024"
  },
  {
    id: "2",
    title: "Ethereum Smart Contract Trading Strategies: A Complete Money Scalper Guide",
    excerpt: "Smart contracts are reshaping the future of decentralized finance (DeFi), offering traders new ways to automate strategies and unlock high-potential opportunities.",
    category: "Ethereum",
    image: "/src/assets/blog/ethereum-smart-contracts.jpg",
    date: "Nov 25, 2025",
    readTime: "6 min read",
    slug: "ethereum-smart-contract-strategies"
  },
  {
    id: "3",
    title: "AI Trading Bots: Complete Beginner's Guide (Money Scalper)",
    excerpt: "Artificial intelligence is reshaping cryptocurrency trading. What was once limited to manual chart analysis is now automated through intelligent algorithms.",
    category: "Strategy",
    image: "/src/assets/blog/ai-trading-bots.jpg",
    date: "Nov 22, 2025",
    readTime: "10 min read",
    slug: "ai-trading-bots-guide"
  },
  {
    id: "4",
    title: "Understanding On-Chain Metrics for Trading: A Complete Money Scalper Guide",
    excerpt: "On-chain data has become one of the most powerful tools for modern cryptocurrency traders, offering unmatched transparency into market behavior.",
    category: "On-chain",
    image: "/src/assets/blog/onchain-metrics.jpg",
    date: "Nov 20, 2025",
    readTime: "7 min read",
    slug: "on-chain-metrics-trading"
  },
  {
    id: "5",
    title: "Risk Management in Volatile Crypto Markets: Money Scalper Complete Guide",
    excerpt: "The cryptocurrency market is one of the most exciting — and most unpredictable — financial environments. Risk management is the most important skill a trader can develop.",
    category: "Strategy",
    image: "/src/assets/blog/risk-management.jpg",
    date: "Nov 18, 2025",
    readTime: "5 min read",
    slug: "risk-management-crypto"
  },
  {
    id: "6",
    title: "DeFi Yield Farming: Maximizing Returns Safely (Money Scalper Guide)",
    excerpt: "Yield farming has quickly become one of the most popular ways to earn passive income in the cryptocurrency ecosystem through lending, staking, or providing liquidity.",
    category: "DeFi",
    image: "/src/assets/blog/defi-yield-farming.jpg",
    date: "Nov 15, 2025",
    readTime: "9 min read",
    slug: "defi-yield-farming-guide"
  }
];

const trendingPosts = [
  { rank: 1, title: "Bitcoin Hits New All-Time High", category: "Bitcoin" },
  { rank: 2, title: "AI Trading: The Future is Now", category: "AI" },
  { rank: 3, title: "DeFi Security Best Practices", category: "Security" },
  { rank: 4, title: "Ethereum 2.0 Staking Guide", category: "Ethereum" },
  { rank: 5, title: "Technical Analysis Masterclass", category: "Education" },
];

const Blog = () => {
  const featuredArticle = articles[0];

  return (
    <>
      <Helmet>
        <title>Blog & Insights - Money Scalper | AI-Powered Crypto Trading Education</title>
        <meta 
          name="description" 
          content="Learn crypto trading strategies, AI signals, and market analysis from Money Scalper. Stay updated with live market data and trending crypto news." 
        />
        <meta name="keywords" content="crypto trading blog, AI trading strategies, bitcoin analysis, ethereum insights, crypto education" />
        <link rel="canonical" href="https://www.moneyscalper.com/blog" />
      </Helmet>

      <div className="min-h-screen" style={{ background: '#050509' }}>
        <Header />
        
        {/* Hero Section - Popin Style */}
        <section className="pt-24 pb-16">
          <div className="container max-w-6xl mx-auto px-4">
            {/* Featured Article Hero */}
            <div className="relative rounded-2xl overflow-hidden" style={{ background: '#111111', border: '1px solid #1F2933' }}>
            {/* Green gradient accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-green-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left Column - Content */}
                <div className="flex flex-col justify-center space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full w-fit" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                  <Sparkles className="w-4 h-4" style={{ color: '#22C55E' }} />
                  <span className="text-sm font-semibold" style={{ color: '#22C55E' }}>FEATURED INSIGHT</span>
                </div>

                  <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: '#FFFFFF' }}>
                    The Real Way To Trade Crypto With AI
                  </h1>

                  <p className="text-lg leading-relaxed" style={{ color: '#9CA3AF' }}>
                    Discover how artificial intelligence is revolutionizing crypto trading. Learn advanced strategies, 
                    risk management techniques, and how to leverage AI-powered signals for consistent profits.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <Link to={`/blog/${featuredArticle.slug}`}>
                      <Button 
                        className="font-semibold px-6 py-6 rounded-full transition-all hover:scale-105"
                        style={{ 
                          background: '#E5FF3D',
                          color: '#111111'
                        }}
                      >
                        Read Featured Story
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="px-6 py-6 rounded-full font-semibold transition-all hover:scale-105"
                      style={{ 
                        borderColor: '#1F2933',
                        color: '#FFFFFF'
                      }}
                    >
                      Explore All Articles
                    </Button>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 pt-4 text-sm" style={{ color: '#9CA3AF' }}>
                    <span>By Money Scalper Team</span>
                    <span>•</span>
                    <span>5 min read</span>
                    <span>•</span>
                    <span>Nov 30, 2025</span>
                  </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative">
                  <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full rounded-xl overflow-hidden" style={{ border: '1px solid #1F2933' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-600/10 to-transparent" />
                    <img 
                      src="/src/assets/hero-crypto.jpg" 
                      alt="AI Crypto Trading"
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="pb-16">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left 2 columns - Article List */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl md:text-3xl font-semibold" style={{ color: '#FFFFFF' }}>
                    Latest Articles
                  </h2>
                  <p className="text-sm" style={{ color: '#9CA3AF' }}>
                    {articles.length} articles
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {articles.map((article) => (
                    <Link key={article.id} to={`/blog/${article.slug}`}>
                      <article 
                        className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        style={{ 
                          background: '#111111', 
                          border: '1px solid #1F2933' 
                        }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#22C55E';
                      }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#1F2933';
                        }}
                      >
                        {/* Image */}
                        <div className="relative aspect-[16/9] overflow-hidden" style={{ background: '#18181B' }}>
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                          <span 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase"
                            style={{ 
                              background: 'rgba(34, 197, 94, 0.1)', 
                              color: '#22C55E',
                              border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}
                          >
                            {article.category}
                          </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                        <h3 
                          className="text-xl font-semibold group-hover:text-green-400 transition-colors duration-300 line-clamp-2"
                          style={{ color: '#FFFFFF' }}
                        >
                          {article.title}
                        </h3>

                          <p className="text-sm line-clamp-2 leading-relaxed" style={{ color: '#9CA3AF' }}>
                            {article.excerpt}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-3 pt-2 text-xs" style={{ color: '#9CA3AF' }}>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{article.date}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right 1 column - Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Trending Now */}
                  <div className="rounded-xl p-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="w-5 h-5" style={{ color: '#22C55E' }} />
                      <h3 className="text-lg font-semibold" style={{ color: '#FFFFFF' }}>
                        Trending Now
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {trendingPosts.map((post) => (
                        <div 
                          key={post.rank}
                          className="flex gap-3 group cursor-pointer"
                        >
                          {/* Rank Number */}
                          <div 
                            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ 
                              background: 'rgba(34, 197, 94, 0.1)',
                              border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}
                          >
                            <span className="text-sm font-bold" style={{ color: '#22C55E' }}>
                              {post.rank}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 
                              className="text-sm font-medium group-hover:text-green-400 transition-colors line-clamp-2"
                              style={{ color: '#FFFFFF' }}
                            >
                              {post.title}
                            </h4>
                            <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
                              {post.category}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <SidebarMarketSnapshot />
                  <SidebarLiveNews />

                  {/* Newsletter Card */}
                  <div className="rounded-xl p-6" style={{ background: '#111111', border: '1px solid #1F2933' }}>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#FFFFFF' }}>
                      Stay Ahead of the Market
                    </h3>
                    <p className="text-sm mb-4" style={{ color: '#9CA3AF' }}>
                      Get weekly crypto insights and AI trading strategies delivered to your inbox.
                    </p>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg mb-3 text-sm outline-none"
                      style={{ 
                        background: '#18181B',
                        border: '1px solid #1F2933',
                        color: '#FFFFFF'
                      }}
                    />
                    <Button 
                      className="w-full font-semibold rounded-lg"
                      style={{ 
                        background: '#E5FF3D',
                        color: '#111111'
                      }}
                    >
                      Get Weekly Alpha
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
