import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Lightbulb, Shield, Zap, Heart, Bot, TrendingUp, Wallet, BookOpen, Signal, BarChart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { motion } from "motion/react";
import gmailIcon from "@/assets/gmail-icon.png";
import telegramIcon from "@/assets/telegram-icon-circle.png";
import instagramIcon from "@/assets/instagram-icon.png";
import discordIcon from "@/assets/discord-icon-new.png";
import telegramIconNew from "@/assets/telegram-icon-new.png";
import instagramIconNew from "@/assets/instagram-icon-new.png";

const About = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving with cutting-edge AI algorithms and blockchain integration"
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "AI-driven insights promoting clarity, accuracy, and real-time visibility"
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "Educating traders through community-driven knowledge and AI tools"
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Every trade and signal rooted in fairness and verified data"
    }
  ];

  const team = [
    {
      name: "Piyush Sukhwal",
      role: "Founder & Head Trader",
      description: "Professional trader with 5+ years of experience in crypto and forex markets, leading trading strategy, risk management, and AI signal development.",
      expertise: "Scalping, Algorithmic Trading, Blockchain Market Analytics"
    },
    {
      name: "Siddhant Singh Rao",
      role: "Co-Founder & R&D Head",
      description: "Research & Development Analyst specializing in AI and automation, driving platform development and model optimization.",
      expertise: "AI & Automation, Product Innovation, Predictive Trading Insights"
    }
  ];

  const technology = [
    { icon: Bot, text: "AI Trading Bots for automated buy/sell execution" },
    { icon: TrendingUp, text: "Real-Time Crypto Charts & Analytics" },
    { icon: BookOpen, text: "Educational Learning Hub for crypto traders" },
    { icon: Wallet, text: "Secure Crypto Wallet Integration" },
    { icon: Signal, text: "Market Insights & Daily Signals" }
  ];

  const benefits = [
    "AI-powered crypto trading signals",
    "Real-time Bitcoin & Ethereum market data",
    "Automated trading bot with precision entries",
    "Secure crypto wallet management",
    "Trading community & educational resources",
    "Transparent analytics and 24/7 support"
  ];

  return (
    <>
      <Helmet>
        <title>Money Scalper | AI-Powered Crypto Trading Platform for Bitcoin & Ethereum</title>
        <meta 
          name="description" 
          content="Trade smarter with Money Scalper — an AI-powered crypto trading platform delivering real-time signals, insights, and automation for Bitcoin, Ethereum, and top cryptocurrencies." 
        />
        <meta 
          name="keywords" 
          content="moneyscalper, money scalper, crypto trading, cryptocurrency, bitcoin, ethereum, crypto wallet, bitcoin trading, ethereum trading, buy bitcoin, bitcoin price, ai trading, ai crypto trading bot, blockchain, trading platform, crypto signals, automated trading, AI trading" 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              About Money Scalper
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Money Scalper is a next-generation AI-powered trading and education ecosystem built to help traders analyze, trade, and grow in the cryptocurrency market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base">
                <Link to="/#get-started">Start Trading Smarter</Link>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="text-base">
                    Join Us
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-[500px] max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Join Us Now
                    </DialogTitle>
                    <DialogDescription className="text-center text-base pt-2">
                      Master The Market With Real-time Expert Support
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-4 py-6">
                    <a 
                      href="https://discord.gg/VNkhzUGw" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-4 p-6 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                    >
                      <div className="bg-white rounded-lg p-2 shadow-md">
                        <img src={discordIcon} alt="Discord" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="font-bold text-xl mb-1">Discord Community</h3>
                        <p className="text-sm text-white/90">Join 10,000+ active traders</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="https://t.me/+lARYvYyc_odjODY1" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-4 p-6 rounded-xl bg-[#0088cc] hover:bg-[#006699] transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                    >
                      <div className="bg-white rounded-lg p-2 shadow-md">
                        <img src={telegramIconNew} alt="Telegram" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="font-bold text-xl mb-1">Telegram Channel</h3>
                        <p className="text-sm text-white/90">Get instant trading signals</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group flex items-center gap-4 p-6 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02] transform"
                    >
                      <div className="bg-white rounded-lg p-2 shadow-md">
                        <img src={instagramIconNew} alt="Instagram" className="w-14 h-14 object-contain" loading="eager" fetchPriority="high" decoding="async" />
                      </div>
                      <div className="flex-1 text-white">
                        <h3 className="font-bold text-xl mb-1">Instagram</h3>
                        <p className="text-sm text-white/90">Follow us for updates</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                  <div className="text-center pt-2 pb-2">
                    <p className="text-sm text-muted-foreground">
                      🔒 Secure • 🚀 Active 24/7 • 💬 Expert Support
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        {/* Welcome Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="space-y-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Welcome to Money Scalper</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Money Scalper is a modern learning platform created to help traders understand the markets, master trading platforms, and build strong trading skills from scratch.

                We focus on making trading education simple, practical, and accessible for everyone — whether you are a beginner exploring the basics or an active trader looking to refine your strategies.

                Through step-by-step learning, real-time insights, and easy-to-follow lessons, Money Scalper guides you on how to analyze the market, manage risk, use trading tools effectively, and make confident trading decisions.

                Our mission is to help you learn trading the right way and grow into a smart, independent, and successful trader.
              </p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                We're redefining crypto trading by merging AI technology with deep market knowledge — giving traders a powerful platform to analyze, execute, and automate profitable trading strategies.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the most intelligent, transparent, and trusted AI crypto trading platform — empowering every trader to succeed through automation, real-time insights, and professional education.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Money Scalper aims to revolutionize the way people interact with the crypto market by providing a secure, data-driven, and AI-enhanced trading ecosystem.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our mission is simple: Make intelligent crypto trading accessible to everyone.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to build a platform that bridges AI trading automation, crypto education, and data analytics, helping traders execute profitable trades, get real-time market insights, learn trading strategies, and use blockchain-powered tools to manage portfolios securely.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Values</h2>
            
            {/* Desktop Grid View */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Mobile Horizontal Scrolling Animation */}
            <div className="sm:hidden overflow-hidden relative">
              <motion.div
                className="flex gap-4"
                animate={{
                  x: [0, -1000],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...values, ...values, ...values].map((value, index) => (
                  <Card key={index} className="shadow-md flex-shrink-0 w-[280px]">
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{value.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Leadership Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold">{member.name}</h3>
                      <p className="text-primary font-semibold">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{member.description}</p>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">Expertise:</p>
                      <p className="text-sm text-muted-foreground">{member.expertise}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Technology</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              At Money Scalper, we leverage advanced AI trading algorithms, real-time crypto data feeds, and blockchain-backed analytics to create a seamless trading experience. Our systems monitor price fluctuations, detect high-probability setups, and send AI trading signals across multiple markets.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {technology.map((tech, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tech.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm leading-relaxed">{tech.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Money Scalper</h2>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <BarChart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">{benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Trading Smarter Today</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of AI crypto trading with Money Scalper — where artificial intelligence meets financial freedom. Buy, trade, and learn crypto with real-time insights and automation that work for you.
            </p>
            <div className="space-y-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/#get-started">Get Started Now</Link>
              </Button>
              <div className="pt-8 flex gap-6 justify-center items-center">
                <a 
                  href="mailto:contact@moneyscalper.com" 
                  className="transition-transform hover:scale-110"
                  aria-label="Email us at contact@moneyscalper.com"
                >
                  <img src={gmailIcon} alt="Email" className="w-12 h-12" />
                </a>
                <a 
                  href="https://t.me/moneyscalper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                  aria-label="Join us on Telegram"
                >
                  <img src={telegramIcon} alt="Telegram" className="w-12 h-12" />
                </a>
                <a 
                  href="https://www.instagram.com/money_scalper?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-110"
                  aria-label="Follow us on Instagram"
                >
                  <img src={instagramIcon} alt="Instagram" className="w-12 h-12" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
