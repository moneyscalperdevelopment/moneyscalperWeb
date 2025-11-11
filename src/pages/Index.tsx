import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyMoneyScalper from "@/components/WhyMoneyScalper";
import FeaturesTable from "@/components/FeaturesTable";
import LivePrices from "@/components/LivePrices";
import Testimonials from "@/components/Testimonials";
import PricingPlans from "@/components/PricingPlans";
import FAQs from "@/components/FAQs";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <HeroSection />
      <div id="about">
        <WhyMoneyScalper />
      </div>
      <FeaturesTable />
      <LivePrices />
      <div id="pricing">
        <PricingPlans />
      </div>
      <Testimonials />
      <FAQs />
      <div id="contact">
        <FinalCTA />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
