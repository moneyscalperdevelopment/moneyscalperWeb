import { HeroSection } from "@/app/components/hero-section";
import { ProblemsSection } from "@/app/components/problems-section";
import { SolutionSection } from "@/app/components/solution-section";
import { ShowcaseSection } from "@/app/components/showcase-section";
import { FeaturesSection } from "@/app/components/features-section";
import { TestimonialsSection } from "@/app/components/testimonials-section";
import { GettingStartedSection } from "@/app/components/getting-started-section";
import { FAQSection } from "@/app/components/faq-section";
import { CTASection } from "@/app/components/cta-section";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      {/* <ShowcaseSection /> */}
      <FeaturesSection />
      <TestimonialsSection />
      <GettingStartedSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}