import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroFeaturedPost from "@/components/blog/HeroFeaturedPost";
import ArticleGrid from "@/components/blog/ArticleGrid";
import SidebarTrending from "@/components/blog/SidebarTrending";
import SidebarMarketSnapshot from "@/components/blog/SidebarMarketSnapshot";
import SidebarLiveNews from "@/components/blog/SidebarLiveNews";

const Blog = () => {
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

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12">
          <div className="container max-w-7xl mx-auto px-4">
            <HeroFeaturedPost />
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="pb-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="lg:grid lg:grid-cols-3 gap-8">
              {/* Left 2 columns - Article List */}
              <div className="lg:col-span-2">
                <ArticleGrid />
              </div>

              {/* Right 1 column - Sidebar */}
              <div className="lg:col-span-1 mt-8 lg:mt-0">
                <div className="lg:sticky lg:top-24 space-y-6">
                  <SidebarTrending />
                  <SidebarMarketSnapshot />
                  <SidebarLiveNews />
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
