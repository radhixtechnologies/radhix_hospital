import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import HeroSection from "@/components/public/HeroSection";
import TrustBadges from "@/components/public/TrustBadges";
import ServicesSection from "@/components/public/ServicesSection";
import HowItWorks from "@/components/public/HowItWorks";
import FeaturedDoctors from "@/components/public/FeaturedDoctors";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import FAQSection from "@/components/public/FAQSection";
import ContactSection from "@/components/public/ContactSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustBadges />
        <ServicesSection />
        <HowItWorks />
        <FeaturedDoctors />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
