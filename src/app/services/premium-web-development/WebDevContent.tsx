"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Globe, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Smartphone,
  Gauge,
  ShieldCheck,
  Search,
  Layers,
  Layout,
  Rocket
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

export function WebDevContent() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] animate-pulse delay-700" />
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>Premium Web Development in Raipur | Best in India</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
            >
              Performance <span className="text-gradient">Websites</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Your website is your 24/7 digital office in Raipur. We build ultra-fast, Next.js powered websites that rank #1 and load in under 1 second.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all text-center w-full sm:w-auto">
                Build My Website
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-black border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "<1s", label: "Page Load Time" },
                { value: "100", label: "Lighthouse Score" },
                { value: "SEO", label: "Built-in Optimization" },
                { value: "Mobile", label: "First Design" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <SectionHeading title="Cutting-Edge Stack" subtitle="Best Website Designer in Chhattisgarh" center />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Next.js 15+ Hub", desc: "Server-side rendering for the fastest possible load times and perfect SEO.", icon: Cpu },
                { title: "Mobile-First UX", desc: "80% of Raipur traffic is mobile. We ensure your site looks stunning on every screen.", icon: Smartphone },
                { title: "SEO-Ready Core", desc: "Every site is built with technical SEO, schema, and meta-data from day one.", icon: Search },
                { title: "Ultra-Security", desc: "Hardened security protocols to protect your Raipur business from any cyber threats.", icon: ShieldCheck },
                { title: "Custom Dashboard", desc: "Manage your content easily with a modern, high-speed headless CMS.", icon: Layout },
                { title: "Core Web Vitals", desc: "We guarantee a 90+ score on Google's Core Web Vitals for better rankings.", icon: Gauge }
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

        {/* Comparison */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading title="Slow Sites Kill Business" subtitle="The Performance Gap" />
                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                  Most websites in Raipur are slow, bloated, and not optimized for mobile. Our premium development approach gives you a competitive edge.
                </p>
                <div className="space-y-4">
                  {[
                    "SSR & ISR for Instant Page Delivery",
                    "Image Optimization & Next-Gen Formats",
                    "Integrated AI Chatbot Ready",
                    "Conversion-First UI/UX Design"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3 text-white/80 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video glass rounded-[3rem] p-12 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <Code2 className="h-full w-full text-primary/10 absolute inset-0 -z-10 p-20" />
                <div className="flex flex-col h-full justify-between relative">
                  <div className="flex items-center space-x-2 mb-8">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                    <div className="h-4 w-1/2 bg-white/10 rounded-full" />
                    <div className="h-20 w-full bg-white/5 rounded-2xl border border-white/5" />
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Rocket className="h-6 w-6 text-primary" />
                      <span className="text-white font-bold">100% Performance</span>
                    </div>
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
              Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
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
