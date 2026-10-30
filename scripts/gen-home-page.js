const fs = require("fs");

const layoutCode = `import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Radhix Clinic - Fast Doctor Appointments & Healthcare SaaS",
  description: "Book certified doctor appointments in 60 seconds with real-time slot availability, instant WhatsApp confirmations, and zero queue waiting. Powered by Radhix Technologies.",
  keywords: ["doctor appointment booking", "clinic software", "healthcare saas", "radhix clinic", "radhix technologies"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        {children}
      </body>
    </html>
  );
}
`;

fs.writeFileSync("src/app/layout.tsx", layoutCode, "utf8");
console.log("Created src/app/layout.tsx");

const pageCode = `import Navbar from "@/components/public/Navbar";
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
`;

fs.writeFileSync("src/app/page.tsx", pageCode, "utf8");
console.log("Created src/app/page.tsx");
