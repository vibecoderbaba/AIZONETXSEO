"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  MessageCircle, 
  Bot, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  MessageSquare,
  Cpu,
  Clock,
  ShieldCheck,
  Smartphone,
  Globe
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

export function ChatbotContent() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30 selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 blur-[120px] animate-pulse delay-700" />
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "50px 50px" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Best Digital Marketing in India | Business Automation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight"
            >
              AI <span className="text-gradient">Chatbot</span> & WhatsApp
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Automate your sales and support 24/7. Our intelligent WhatsApp bots understand Hindi and English, qualified leads, and book appointments for your Raipur business.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="px-8 py-4 bg-primary text-white font-bold rounded-full shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:scale-105 transition-all text-center w-full sm:w-auto">
                Automate Your Business
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-black border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "0 sec", label: "Response Time" },
                { value: "70%", label: "Cost Reduction" },
                { value: "100%", label: "Inquiry Capture" },
                { value: "50k+", label: "Messages Handled" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Types */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <SectionHeading title="Intelligent Automation" subtitle="Best AI Digital Marketing Agency Near Me" center />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Official WhatsApp API", desc: "Green tick potential with enterprise-grade WhatsApp Business API integration.", icon: Phone },
                { title: "Multilingual AI", desc: "Bots that speak Hinglish, Hindi, and English perfectly for the Raipur audience.", icon: MessageCircle },
                { title: "Lead Qualification", desc: "AI qualifies every lead and syncs directly with your CRM or Google Sheets.", icon: CheckCircle2 },
                { title: "Appointment Booking", desc: "Automated scheduling for clinics, salons, and consultancies in Chhattisgarh.", icon: Clock },
                { title: "E-commerce Bot", desc: "Let customers browse and buy products directly within WhatsApp and Instagram.", icon: Smartphone },
                { title: "24/7 Web Chat", desc: "Intelligent support on your website that actually answers questions like a human.", icon: MessageSquare }
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

        {/* Why Bots */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading title="Don't Let Leads Cool Down" subtitle="Instant Engagement" />
                <p className="text-white/60 text-lg mb-8 leading-relaxed">
                  In Raipur, business happens on WhatsApp. If you don't respond in 60 seconds, you lose the customer. Our AI bots ensure you capture 100% of midnight inquiries.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Hindi Support", icon: Globe },
                    { label: "CRM Integration", icon: Cpu },
                    { label: "Secure & Encrypted", icon: ShieldCheck },
                    { label: "Smart Handover", icon: Bot }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-2 p-4 rounded-xl bg-white/5 border border-white/10">
                      <item.icon className="h-5 w-5 text-accent" />
                      <span className="text-white/80 text-sm font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video glass rounded-[3rem] p-8 flex flex-col justify-end">
                <div className="absolute top-8 right-8 h-12 w-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                    <p className="text-white text-sm">Hello! How can I help you today?</p>
                  </div>
                  <div className="bg-primary p-4 rounded-2xl rounded-br-none max-w-[80%] ml-auto">
                    <p className="text-white text-sm">I want to book an appointment for tomorrow in Raipur.</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl rounded-bl-none max-w-[80%]">
                    <p className="text-white text-sm">Sure! I have slots at 10 AM and 4 PM. Which one works?</p>
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
              Deploy Your AI Bot <ArrowRight className="ml-2 h-5 w-5" />
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
