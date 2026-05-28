"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  MessageSquare,
  Share2,
  Video,
  Camera,
  Globe,
  Search
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

export function SocialMediaContent() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] animate-pulse delay-700" />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "60px 60px" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Top AI Digital Marketing Agency Near Me</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
            >
              Viral <span className="text-gradient">AI Social</span> Marketing
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Turn your social presence into a lead machine in Raipur. We use AI to analyze Chhattisgarh trends and create content that stops the scroll.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all text-center w-full sm:w-auto">
                Go Viral in Raipur
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-black border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500%", label: "Engagement Increase" },
                { value: "10k+", label: "Leads via Reels" },
                { value: "100+", label: "Viral Campaigns" },
                { value: "24/7", label: "Smart Posting" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <SectionHeading title="Dominate Every Platform" subtitle="Best Digital Marketing in Chhattisgarh" center />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Instagram", icon: Camera, color: "from-pink-500 to-orange-500", desc: "AI-generated Reels that match Raipur's viral trends." },
                { title: "LinkedIn", icon: Users, color: "from-blue-600 to-blue-800", desc: "B2B thought leadership for Chhattisgarh's industry leaders." },
                { title: "Facebook", icon: Share2, color: "from-blue-500 to-blue-700", desc: "Hyper-local community building for Raipur local businesses." },
                { title: "YouTube", icon: Video, color: "from-red-500 to-red-700", desc: "Automated video scripts and editing for high-impact vlogs." }
              ].map((platform, i) => (
                <GlassCard key={i} className="group">
                  <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <platform.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{platform.title}</h3>
                  <p className="text-white/60 leading-relaxed">{platform.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading title="AI Content Factory" subtitle="Content That Converts" />
                <div className="space-y-6">
                  {[
                    { title: "Viral Trend Analysis", desc: "We use AI to scan what's trending in Raipur instantly.", icon: TrendingUp },
                    { title: "AI Video Editing", desc: "Professional Reels and Shorts edited for maximum retention.", icon: Video },
                    { title: "Community Automation", desc: "Never miss a comment or DM with 24/7 smart response bots.", icon: MessageSquare },
                    { title: "Influencer Matchmaking", desc: "AI identifies the best Raipur influencers for your brand.", icon: Users }
                  ].map((feature, i) => (
                    <div key={i} className="flex space-x-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                        <p className="text-white/60">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square glass rounded-[3rem] p-12 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.02, 1] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-full h-full relative rounded-[2rem] overflow-hidden border border-white/5 flex items-center justify-center"
                >
                  <img 
                    src="/images/social-media-marketing.png" 
                    alt="Social Media Marketing AI" 
                    className="w-full h-full object-contain opacity-90 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
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
