import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <HeroSection />
      <Toaster />
    </div>
  );
};

export default Index;
