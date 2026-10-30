"use client";

import React, { useState } from "react";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { Copy, Check, Code2, Globe } from "lucide-react";

export default function WidgetEmbedPage() {
  const [copied, setCopied] = useState(false);

  const embedSnippet = `<iframe 
  src="https://radhixclinic.com/book" 
  width="100%" 
  height="700" 
  frameborder="0" 
  style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);" 
  allow="payment"
></iframe>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest bg-teal-50 dark:bg-teal-950 px-3 py-1 rounded-full border border-teal-500/20">
              Developer & Clinic Tools
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Embeddable Clinic Booking Widget
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Copy this lightweight iframe snippet and paste it into WordPress, Webflow, Squarespace, or any custom website.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 text-slate-200 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <span className="font-mono text-teal-400">HTML Iframe Embed Code</span>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Snippet"}</span>
              </button>
            </div>
            <pre className="font-mono text-xs overflow-x-auto text-blue-300">
              {embedSnippet}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Widget Features:</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
              <li>Auto-adapts to container width (fully responsive on mobile & desktop).</li>
              <li>Includes full 4-step booking flow, doctor picker, and Razorpay integration.</li>
              <li>Syncs directly into your clinic admin dashboard in real-time.</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
