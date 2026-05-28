"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Search, 
  BarChart3, 
  Target, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Plus, 
  Minus,
  MessageSquare,
  Bot,
  Layers,
  LineChart,
  ShieldCheck,
  TrendingUp,
  Phone
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";

// --- Components ---

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

// --- Sections ---

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span>Next-Gen SEO for Raipur Businesses</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
          >
            AI-Powered <span className="text-gradient">SEO Services</span> in Raipur
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Dominate Google Rankings with AI-Driven SEO Strategies. We combine NLP, Entity Mapping, and Predictive Analytics to scale your presence in Raipur and Chhattisgarh.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/free-consultation"
              className="group relative px-8 py-4 bg-primary text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,102,255,0.4)] w-full sm:w-auto text-center"
            >
              <div className="relative z-10 flex items-center justify-center">
                Get Free SEO Audit <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all hover:border-white/20 w-full sm:w-auto text-center"
            >
              Book Consultation
            </Link>
          </motion.div>

          {/* Floating Elements */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
            {[
              { icon: TrendingUp, label: "Real-time Tracking" },
              { icon: Cpu, label: "AI Optimization" },
              { icon: Search, label: "Entity Mapping" },
              { icon: Globe, label: "Global Reach" }
            ].map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                className="flex items-center space-x-2 bg-white/5 p-4 rounded-2xl border border-white/5"
              >
                <item.icon className="h-5 w-5 text-accent" />
                <span className="text-white text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustIndicators = () => {
  return (
    <section className="py-24 bg-black border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "300%", label: "Average Traffic Growth" },
            { value: "10x", label: "Lead Generation Scale" },
            { value: "98%", label: "Client Retention Rate" },
            { value: "24/7", label: "AI Monitoring" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const servicesList = [
    {
      title: "NLP-Based Content",
      desc: "Optimize content for Google's Natural Language Processing to match intent perfectly.",
      icon: MessageSquare,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Google SGE Ready",
      desc: "Future-proof your site for AI-generated search experiences and snapshot rankings.",
      icon: Bot,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Backlink Analysis",
      desc: "Predictive gap analysis to identify high-authority local link opportunities.",
      icon: Layers,
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Auto Technical SEO",
      desc: "AI-driven core web vitals optimization and automatic schema injection.",
      icon: Zap,
      color: "from-accent to-blue-600"
    },
    {
      title: "Entity Clustering",
      desc: "Beyond keywords: build topical authority with semantic entity mapping.",
      icon: Target,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Predictive Analytics",
      desc: "Forecast ranking trends and ROI before you even launch a campaign.",
      icon: BarChart3,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <SectionHeading 
          title="Elite AI SEO Services" 
          subtitle="Modern Solutions for Modern Problems" 
          center 
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, i) => (
            <GlassCard key={i} className="group overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity`} />
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-white/60 leading-relaxed">{service.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyAI = () => {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="Traditional SEO is Dead. AI is the Future." 
              subtitle="The Evolution of Search" 
            />
            <div className="space-y-8">
              {[
                { title: "Semantic Intelligence", desc: "AI understands context, not just keywords. We map your brand to the entities Google cares about." },
                { title: "SGE Dominance", desc: "With Google's Search Generative Experience, visibility now depends on being part of the AI's answer." },
                { title: "Predictive Scaling", desc: "Don't guess what works. Use data-driven predictions to focus on keywords that actually drive revenue." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square glass rounded-[3rem] p-8 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative z-10 w-64 h-64 border-2 border-dashed border-primary/30 rounded-full flex items-center justify-center"
              >
                <div className="w-48 h-48 border-2 border-dashed border-accent/30 rounded-full flex items-center justify-center" />
              </motion.div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Cpu className="h-20 w-20 text-primary animate-pulse" />
              </div>
              <div className="absolute inset-0 p-12">
                {[LineChart, ShieldCheck, Globe, Zap].map((Icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, Math.cos(i * 1.5) * 50, 0],
                      y: [0, Math.sin(i * 1.5) * 50, 0]
                    }}
                    transition={{ duration: 5, delay: i, repeat: Infinity }}
                    className="absolute"
                    style={{ 
                      top: `${20 + i * 20}%`, 
                      left: `${10 + i * 25}%` 
                    }}
                  >
                    <div className="glass p-3 rounded-xl">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { 
      q: "What is AI SEO and how is it different?", 
      a: "AI SEO leverages machine learning to analyze search patterns, competitor strategies, and content gaps in real-time. Unlike traditional SEO, it focuses on semantic intent and entity mapping rather than simple keyword stuffing." 
    },
    { 
      q: "Will my business rank for Raipur-specific keywords?", 
      a: "Absolutely. We specialize in localized AI SEO, ensuring your business dominates terms like 'Best [Service] in Raipur' through hyper-targeted entity optimization." 
    },
    { 
      q: "How fast will I see results with AI SEO?", 
      a: "While SEO is a long-term game, our AI-driven approach identifies quick-win opportunities. Most Raipur clients see significant ranking improvements within 45-90 days." 
    },
    { 
      q: "Is AI SEO future-proof for Google SGE?", 
      a: "Yes. Our strategy is built specifically for Google's Search Generative Experience, ensuring your brand appears in the AI-generated snapshots that are becoming the new 'Position 0'." 
    }
  ];

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeading title="Common Questions" subtitle="Knowledge Base" center />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border border-white/5">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between text-white hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold">{faq.q}</span>
                {openIndex === i ? <Minus className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-white/60 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessTimeline = () => {
  const steps = [
    { title: "Deep AI Audit", desc: "Our algorithms scan 1,000+ data points to find your hidden ranking potential." },
    { title: "Entity Mapping", desc: "We align your content with the semantic entities Google's AI values most." },
    { title: "Smart Optimization", desc: "Dynamic content adjustments based on real-time search intent shifts." },
    { title: "Authority Scaling", desc: "AI-driven backlink acquisition from high-relevance local sources." }
  ];

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <SectionHeading title="Our 4-Step Mastery" subtitle="The AI SEO Blueprint" center />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group text-center md:text-left">
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform mx-auto md:mx-0">
                  <span className="text-2xl font-black text-primary">0{i + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTASection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 -z-10 blur-[120px]" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Ready to Rank <br /><span className="text-gradient">#1 in Raipur?</span></h2>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              Join the elite businesses in Chhattisgarh who have already switched to AI SEO. Get a free, comprehensive audit worth ₹15,000 today.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-white/80 text-sm font-medium">Free Audit</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-white/80 text-sm font-medium">No Contract</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-white/80 text-sm font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
          <div className="glass p-10 rounded-[2.5rem] border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Claim Your Free AI Audit</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export function AISEORaipurContent() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <Services />
        <WhyAI />
        <ProcessTimeline />
        <FAQSection />
        <FinalCTASection />
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
        <Link 
          href="https://wa.me/91XXXXXXXXXX" 
          target="_blank"
          className="p-4 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform group"
        >
          <Phone className="h-6 w-6" />
        </Link>
        <button className="p-4 bg-primary text-white rounded-full shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:scale-110 transition-transform group">
          <Bot className="h-6 w-6" />
        </button>
      </div>

      <Footer />
    </div>
  );
}
