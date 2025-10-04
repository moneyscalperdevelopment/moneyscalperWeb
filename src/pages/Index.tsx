import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyMoneyScalper from "@/components/WhyMoneyScalper";
import HowItWorks from "@/components/HowItWorks";
import FeaturesTable from "@/components/FeaturesTable";
import LivePrices from "@/components/LivePrices";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";
import FAQs from "@/components/FAQs";
import FinalCTA from "@/components/FinalCTA";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <HeroSection />
      <WhyMoneyScalper />
      <HowItWorks />
      <FeaturesTable />
      <LivePrices />
      <Testimonials />
      <PricingPlans />
      <FAQs />
      <FinalCTA />
      <Toaster />
    </div>
  );
};

export default Index;
