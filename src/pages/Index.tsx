import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ParticleBackground from "@/components/ParticleBackground";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <FloatingElements />
      <Header />
      <HeroSection />
    </div>
  );
};

export default Index;
