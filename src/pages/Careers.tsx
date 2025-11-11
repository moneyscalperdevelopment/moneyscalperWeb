import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Users, 
  Heart,
  Zap,
  Shield,
  Globe,
  Code,
  BarChart3,
  Headphones
} from "lucide-react";

const jobListings = [
  {
    id: "1",
    title: "Senior Blockchain Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    icon: Code,
    description: "Build and optimize our cutting-edge blockchain infrastructure for real-time trading.",
    requirements: [
      "5+ years experience with Solidity and smart contracts",
      "Deep understanding of DeFi protocols",
      "Experience with Web3.js or Ethers.js",
      "Strong knowledge of blockchain security"
    ]
  },
  {
    id: "2",
    title: "Quantitative Trading Analyst",
    department: "Trading",
    location: "New York, NY / Remote",
    type: "Full-time",
    icon: BarChart3,
    description: "Develop and implement algorithmic trading strategies using advanced data analysis.",
    requirements: [
      "Advanced degree in Mathematics, Physics, or Computer Science",
      "3+ years experience in quantitative trading",
      "Proficiency in Python, R, or MATLAB",
      "Strong statistical and mathematical modeling skills"
    ]
  },
  {
    id: "3",
    title: "Product Designer (UI/UX)",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    icon: Zap,
    description: "Design intuitive and beautiful interfaces for our next-gen trading platform.",
    requirements: [
      "4+ years experience in product design",
      "Portfolio showcasing fintech or trading platform work",
      "Expert in Figma and design systems",
      "Understanding of Web3 and crypto trading"
    ]
  },
  {
    id: "4",
    title: "Customer Success Manager",
    department: "Support",
    location: "London, UK / Remote",
    type: "Full-time",
    icon: Headphones,
    description: "Help our traders succeed by providing exceptional support and guidance.",
    requirements: [
      "2+ years in customer success or support",
      "Deep knowledge of crypto trading",
      "Excellent communication skills",
      "Experience with CRM and support tools"
    ]
  },
  {
    id: "5",
    title: "Security Engineer",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    icon: Shield,
    description: "Protect our platform and users with world-class security infrastructure.",
    requirements: [
      "5+ years in security engineering",
      "Experience with penetration testing",
      "Knowledge of cryptographic protocols",
      "Certifications like CISSP or CEH preferred"
    ]
  },
  {
    id: "6",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    icon: Globe,
    description: "Drive growth and build our brand in the competitive crypto trading space.",
    requirements: [
      "3+ years in fintech or crypto marketing",
      "Experience with growth marketing strategies",
      "Strong content creation and SEO skills",
      "Data-driven approach to marketing"
    ]
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Competitive Compensation",
    description: "Top-tier salary, equity, and crypto bonuses"
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs"
  },
  {
    icon: Globe,
    title: "Remote First",
    description: "Work from anywhere with flexible hours"
  },
  {
    icon: Users,
    title: "Learning & Growth",
    description: "Annual learning budget and career development"
  },
  {
    icon: Zap,
    title: "Cutting-Edge Tech",
    description: "Latest tools and technology stack"
  },
  {
    icon: Briefcase,
    title: "Work-Life Balance",
    description: "Unlimited PTO and mental health days"
  }
];

const Careers = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-4" variant="outline">
            <Briefcase className="w-3 h-3 mr-1" />
            We're Hiring
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Build the Future of Trading
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our mission to democratize crypto trading with cutting-edge technology and AI-powered insights. 
            We're looking for talented individuals who are passionate about innovation.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            View Open Positions
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Why Work With Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe in creating an environment where talent thrives and innovation flourishes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect role and start making an impact from day one
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobListings.map((job) => (
              <Card key={job.id} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <job.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{job.type}</Badge>
                  </div>
                  
                  <CardTitle className="text-xl sm:text-2xl mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </CardTitle>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4 text-base">
                    {job.description}
                  </CardDescription>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-sm">Key Requirements:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {job.requirements.slice(0, 3).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    onClick={() => navigate(`/careers/apply/${job.id}`)}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Don't See Your Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented people. Send us your resume and let us know how you can contribute.
          </p>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => window.location.href = 'mailto:careers@moneyscalper.com'}
          >
            Send General Application
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
