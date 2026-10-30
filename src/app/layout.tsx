import type { Metadata } from "next";
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
