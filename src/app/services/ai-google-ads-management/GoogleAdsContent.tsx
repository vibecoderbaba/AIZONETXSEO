"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Target, 
  BarChart3, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Minus,
  LineChart,
  ShieldCheck,
  TrendingUp,
  Phone,
  Bot,
  MousePointer2,
  DollarSign,
  PieChart
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass rounded-3xl p-8 border border-white/10 hover:border-primary/50 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

const SectionHeading = ({ 
  title, 
  subtitle, 
  center = false 
}: { 
  title: string; 
  subtitle?: string; 
  center?: boolean 
}) => (
  <div className={`mb-16 ${center ? "text-center" : ""}`}>
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-6xl font-bold text-white"
    >
      {title}
    </motion.h2>
  </div>
);

export function GoogleAdsContent() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] animate-pulse delay-700" />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Best AI Digital Marketing in Chhattisgarh</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
            >
              AI-Driven <span className="text-gradient">Google Ads</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Stop wasting budget on broad keywords. Our AI-driven Google Ads agency in Raipur uses predictive modeling to identify high-converting clicks before they happen.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/free-consultation" className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all text-center w-full sm:w-auto">
                Boost Your ROAS Now
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-center w-full sm:w-auto">
                Book Consultation
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-black border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "40%", label: "Lower Cost Per Lead" },
                { value: "2.5x", label: "Average ROAS Boost" },
                { value: "1M+", label: "Ad Budget Managed" },
                { value: "AI", label: "Real-time Bidding" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <SectionHeading title="Precision PPC Solutions" subtitle="Why We're the Best Digital Marketing in India" center />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Predictive Bidding", desc: "Our AI adjusts bids every second based on 100+ variables for maximum efficiency.", icon: DollarSign },
                { title: "Competitor Hijacking", desc: "Target your competitors' customers with surgical precision using AI intent mapping.", icon: Target },
                { title: "Dynamic Ad Copy", desc: "Machine learning creates 1,000s of ad variations to find what Raipur customers click most.", icon: Bot },
                { title: "Smart Remarketing", desc: "Re-engage visitors with personalized ads that feel like a helpful suggestion.", icon: MousePointer2 },
                { title: "Budget Protection", desc: "AI algorithms detect and block click fraud instantly, saving your Raipur ad spend.", icon: ShieldCheck },
                { title: "Deep ROI Tracking", desc: "Know exactly which rupee brought in which customer with cross-channel attribution.", icon: PieChart }
              ].map((service, i) => (
                <GlassCard key={i}>
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-white/60 leading-relaxed">{service.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Why AI Ads */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading title="Manual Bidding is a Trap" subtitle="The AI Advantage" />
                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                  Traditional PPC agencies in Raipur rely on humans to guess bids. Our AI digital marketing agency near me uses real-time data to win the auctions that matter.
                </p>
                <div className="space-y-4">
                  {[
                    "24/7 Automated Campaign Management",
                    "Hyper-local Targeting for Raipur Pincodes",
                    "Predictive Keyword Discovery",
                    "Automated Negative Keyword Filtering"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-white/80 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass p-12 rounded-[3rem] border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <LineChart className="h-full w-full text-primary/20 absolute inset-0 -z-10 p-20" />
                <h4 className="text-2xl font-bold text-white mb-6 relative">Projected ROI Growth</h4>
                <div className="space-y-6 relative">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} className="h-full bg-primary" />
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} className="h-full bg-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready for <span className="text-gradient">Explosive Growth?</span></h2>
            <Link href="/contact" className="px-10 py-5 bg-primary text-white font-bold rounded-full shadow-[0_0_40px_rgba(0,102,255,0.5)] hover:scale-105 transition-all inline-flex items-center mx-auto mb-20">
              Claim Your Free Ads Audit <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <div className="max-w-4xl mx-auto mt-20">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
