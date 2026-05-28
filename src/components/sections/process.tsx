"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Zap, BarChart } from "lucide-react";

const steps = [
  {
    title: "Discovery & AI Audit",
    description: "We use proprietary AI tools to perform a deep-dive analysis of your digital footprint and competitor gaps in Raipur.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Strategic Roadmap",
    description: "Our team designs a custom 12-month growth plan, mapping out AI-first SEO, ad strategies, and automation triggers.",
    icon: Lightbulb,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Automated Execution",
    description: "We deploy high-performance AI agents and automated campaigns that work 24/7 to capture and convert leads.",
    icon: Zap,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Intelligence & Scaling",
    description: "Continuous real-time data analysis allows us to pivot strategies and scale your ROI at an exponential rate.",
    icon: BarChart,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function Process() {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            The <span className="text-gradient">AIZONET</span> Method
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            A precise, data-driven approach to digital dominance. We don't just market; we build intelligent ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem] h-full hover:border-primary/50 transition-all duration-500 relative z-10 backdrop-blur-sm">
                <div className="mb-8 relative">
                  <div className={`h-16 w-16 rounded-2xl ${step.bg} flex items-center justify-center relative z-10`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <span className="absolute -top-4 -right-2 text-6xl font-black text-white/5 select-none">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Arrow indicator for next step (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                    <div className="h-4 w-4 border-t-2 border-r-2 border-white/10 rotate-45" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
