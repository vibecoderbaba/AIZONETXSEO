"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Process } from "@/components/sections/process";
import { Cpu, Rocket, Shield, Users, Brain, Target, TrendingUp, Award, Zap, Globe, Heart, Lightbulb, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Born in Raipur, Built for the Future
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Empowering Businesses with <span className="text-gradient">Intelligence</span>
              </h1>
              <p className="text-xl text-white/60 leading-relaxed">
                AIZONET was founded in Raipur with a single mission: To bridge the gap 
                between cutting-edge AI technology and local business growth. We believe every business, 
                regardless of size, deserves access to enterprise-grade marketing intelligence.
              </p>
            </motion.div>
          </div>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { icon: Rocket, title: "Our Mission", desc: "To democratize enterprise-grade AI for small businesses and level the playing field." },
              { icon: Shield, title: "Our Vision", desc: "To become the #1 AI marketing partner in Central India by 2027." },
              { icon: Cpu, title: "Our Tech", desc: "Proprietary algorithms tuned for the Indian market and local consumer behavior." },
              { icon: Users, title: "Our People", desc: "A passionate blend of expert marketers, AI engineers, and local business enthusiasts." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center hover:border-primary/30 transition-all group"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* AIZONET Method - Process Component */}
          <Process />

          {/* NEW: Our AI Culture Section */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                    <Brain className="w-4 h-4" />
                    The Mindset Behind the Magic
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Built on <span className="text-gradient-purple">Innovation</span>, Driven by Passion
                  </h2>
                  <p className="text-white/60 max-w-3xl mx-auto text-lg">
                    We're not just another marketing agency. We're a team of dreamers, builders, and problem-solvers 
                    who believe that AI should work for humans, not the other way around.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Lightbulb,
                    title: "Innovation First",
                    desc: "We question everything. Why settle for 'good enough' when AI can help us achieve 'extraordinary'? Every strategy we create pushes the boundaries of what's possible.",
                    color: "#F59E0B",
                    stat: "47+",
                    statLabel: "AI Tools Built"
                  },
                  {
                    icon: Heart,
                    title: "Client Obsessed",
                    desc: "Your success is our success metric. We celebrate when your leads convert, when your rankings climb, and when your revenue grows. Your wins fuel our passion.",
                    color: "#EC4899",
                    stat: "500+",
                    statLabel: "Happy Clients"
                  },
                  {
                    icon: Target,
                    title: "Results Driven",
                    desc: "No fluff, no jargon—just measurable outcomes. We speak in ROI, conversion rates, and organic traffic growth. Every action we take is designed to move your bottom line.",
                    color: "#3B82F6",
                    stat: "340%",
                    statLabel: "Avg. ROI Increase"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative group"
                  >
                    <div className="bg-zinc-950/80 border border-white/5 p-8 rounded-[2rem] h-full hover:border-white/10 transition-all">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                        style={{ background: `${item.color}15` }}
                      >
                        <item.icon className="w-7 h-7" style={{ color: item.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-6">{item.desc}</p>
                      <div className="pt-6 border-t border-white/5">
                        <div className="text-3xl font-black" style={{ color: item.color }}>{item.stat}</div>
                        <div className="text-xs text-white/40 uppercase tracking-wider">{item.statLabel}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW: Meet the Minds Behind AIZONET */}
          <section className="py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Meet the <span className="text-gradient">Visionaries</span>
                  </h2>
                  <p className="text-white/60 max-w-2xl mx-auto">
                    A small but mighty team of experts who eat, sleep, and breathe AI marketing.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Rahul Sharma", role: "Founder & AI Lead", icon: Brain, color: "#8B5CF6" },
                  { name: "Priya Patel", role: "Head of Strategy", icon: Target, color: "#3B82F6" },
                  { name: "Amit Kumar", role: "SEO Architect", icon: TrendingUp, color: "#10B981" },
                  { name: "Sneha Gupta", role: "Creative Director", icon: Award, color: "#F59E0B" },
                ].map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-white/20 transition-all">
                      <div
                        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform"
                        style={{ background: `${member.color}15` }}
                      >
                        <member.icon className="w-10 h-10" style={{ color: member.color }} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                      <p className="text-white/50 text-sm">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why We Started in Raipur - ENHANCED with AI Growth Visualization */}
          <div className="bg-zinc-950 border border-white/5 rounded-[3rem] p-12 mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                  <Globe className="w-4 h-4" />
                  Rooted in Raipur, Reaching the World
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why We Started in <span className="text-gradient">Raipur</span>
                </h2>
                <p className="text-white/60 mb-6 leading-relaxed">
                  Raipur is the beating heart of Chhattisgarh's economy—a city of entrepreneurs, 
                  innovators, and dreamers. We saw a massive opportunity to help local retailers, 
                  real estate developers, and service providers leapfrog their competition by 
                  adopting AI earlier than the rest of the country.
                </p>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Our local presence allows us to offer personalized support that global agencies 
                  simply can't match. We're not just your agency; we're your neighbors, your partners, 
                  and your biggest cheerleaders.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: "Local Businesses", value: "200+" },
                    { label: "Jobs Created", value: "50+" },
                    { label: "Revenue Generated", value: "₹10Cr+" },
                  ].map((stat) => (
                    <div key={stat.label} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/40">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Growth Visualization - ENHANCED */}
              <div className="relative">
                <div className="relative h-[450px] rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-purple-500/20 overflow-hidden border border-white/10">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-mesh opacity-30" />
                  
                  {/* Floating Orbs */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
                  />

                  {/* Growth Chart Visualization */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="w-full max-w-xs space-y-6">
                      {/* Chart Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/60 text-sm">AI Growth Trajectory</span>
                        <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          +847%
                        </span>
                      </div>

                      {/* Animated Bars */}
                      <div className="space-y-3">
                        {[
                          { label: "2021", value: 15, color: "#3B82F6" },
                          { label: "2022", value: 35, color: "#8B5CF6" },
                          { label: "2023", value: 62, color: "#22D3EE" },
                          { label: "2024", value: 89, color: "#10B981" },
                          { label: "2025", value: 100, color: "#F59E0B", glow: true },
                        ].map((bar, i) => (
                          <motion.div
                            key={bar.label}
                            initial={{ width: 0, opacity: 0 }}
                            whileInView={{ width: "100%", opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="flex items-center gap-3"
                          >
                            <span className="text-white/40 text-xs w-10">{bar.label}</span>
                            <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${bar.value}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
                                className="h-full rounded-full relative"
                                style={{ 
                                  background: `linear-gradient(90deg, ${bar.color}80, ${bar.color})`,
                                  boxShadow: bar.glow ? `0 0 20px ${bar.color}50` : "none"
                                }}
                              >
                                {bar.glow && (
                                  <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                  />
                                )}
                              </motion.div>
                            </div>
                            <span className="text-white/60 text-xs w-8">{bar.value}%</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* AI Brain Icon */}
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="flex items-center justify-center pt-6"
                      >
                        <div className="relative">
                          <div className="w-20 h-20 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                            <Brain className="w-10 h-10 text-primary" />
                          </div>
                          {/* Orbiting dots */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                          >
                            <div className="absolute -top-2 left-1/2 w-3 h-3 bg-accent rounded-full" />
                          </motion.div>
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                          >
                            <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-purple-400 rounded-full" />
                          </motion.div>
                        </div>
                      </motion.div>

                      <p className="text-center text-white/40 text-xs mt-4">
                        AI Adoption Rate Among Our Clients
                      </p>
                    </div>
                  </div>

                  {/* Grid Overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                </div>

                {/* Floating Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute -left-4 top-1/4 glass-card rounded-xl p-3 border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">+340%</div>
                      <div className="text-[10px] text-white/40">Client Growth</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="absolute -right-4 bottom-1/3 glass-card rounded-xl p-3 border border-white/10 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">12,000+</div>
                      <div className="text-[10px] text-white/40">Audits Run</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* NEW: Join Us CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="glass-card rounded-3xl p-12 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience the <span className="text-gradient">AIZONET Difference</span>?
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto mb-8">
                Join hundreds of businesses in Raipur and beyond who are already leveraging 
                AI to dominate their markets. Your success story starts here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/signup"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  <Zap className="w-5 h-5" />
                  Start Your Free Audit
                </a>
                <a
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
                >
                  Talk to Our Team
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
