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
import { useAudioManager } from "@/hooks/useAudioManager";
import { SoundToggle } from "@/components/SoundToggle";
import { SectionObserver } from "@/components/SectionObserver";

const Index = () => {
  const {
    isMuted,
    isStarted,
    toggleMute,
    changeSection,
  } = useAudioManager();

  return (
    <div className="relative min-h-screen">
      <SoundToggle isMuted={isMuted} onToggle={toggleMute} isVisible={isStarted} />
      
      <Header />
      
      <SectionObserver sectionId="hero" onSectionEnter={changeSection}>
        <HeroSection />
      </SectionObserver>
      
      <SectionObserver sectionId="why" onSectionEnter={changeSection}>
        <WhyMoneyScalper />
      </SectionObserver>
      
      <SectionObserver sectionId="how" onSectionEnter={changeSection}>
        <HowItWorks />
      </SectionObserver>
      
      <SectionObserver sectionId="features" onSectionEnter={changeSection}>
        <FeaturesTable />
        <LivePrices />
      </SectionObserver>
      
      <SectionObserver sectionId="testimonials" onSectionEnter={changeSection}>
        <Testimonials />
      </SectionObserver>
      
      <SectionObserver sectionId="prices" onSectionEnter={changeSection}>
        <PricingPlans />
        <FAQs />
        <FinalCTA />
      </SectionObserver>
      
      <Toaster />
    </div>
  );
};

export default Index;
