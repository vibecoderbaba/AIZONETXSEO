"use client";

import Link from "next/link";
import { Bot, Brain, TrendingUp, Palette, ShoppingCart, ArrowRight, Zap } from "lucide-react";

const agents = [
  {
    id: "seo",
    icon: TrendingUp,
    name: "SEO Agent",
    tagline: "Technical SEO Expert",
    desc: "Analyzes Core Web Vitals, crawlability, schema, internal links, and SERP competitiveness in real-time.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.3)",
    tasks: ["Technical audit", "Schema markup", "Internal linking", "SERP analysis"],
    badge: "Most Popular",
  },
  {
    id: "content",
    icon: Brain,
    name: "Content Agent",
    tagline: "Content Strategy AI",
    desc: "Clusters keywords, maps topical authority, creates semantic content plans and competitive gap analyses.",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.3)",
    tasks: ["Keyword clusters", "Topic authority", "Content briefs", "Gap analysis"],
    badge: null,
  },
  {
    id: "cro",
    icon: Zap,
    name: "CRO Agent",
    tagline: "Conversion Optimizer",
    desc: "Identifies conversion blockers, optimizes CTAs, analyzes funnels, and boosts lead generation rates.",
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.3)",
    tasks: ["CTA optimization", "Funnel analysis", "UX improvements", "Lead scoring"],
    badge: null,
  },
  {
    id: "brand",
    icon: Palette,
    name: "Brand Agent",
    tagline: "Branding Intelligence",
    desc: "Evaluates EEAT signals, brand positioning, trust indicators, and authority-building strategies.",
    color: "#10B981",
    glow: "rgba(16,185,129,0.3)",
    tasks: ["EEAT analysis", "Brand positioning", "Trust signals", "Authority map"],
    badge: null,
  },
  {
    id: "sales",
    icon: ShoppingCart,
    name: "Sales Agent",
    tagline: "AI Sales Assistant",
    desc: "Detects user intent, qualifies leads, recommends services, and drives conversions automatically.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.3)",
    tasks: ["Lead qualification", "Intent detection", "Service matching", "Upsell paths"],
    badge: "New",
  },
];

export function AIAgentsPreview() {
  return (
    <section className="relative py-28 bg-[#030308] overflow-hidden">
      <div className="absolute inset-0 bg-mesh-purple opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-2/20 text-sm text-accent-2 mb-6">
            <Bot className="w-4 h-4" /> 5 Specialized AI Agents
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-5">
            An Entire AI Marketing
            <br />
            <span className="text-gradient-purple">Team at Your Fingertips</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Each agent is a domain expert trained on thousands of SEO and marketing datasets. 
            They work together autonomously to grow your business.
          </p>
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, i) => (
            <div
              key={agent.id}
              className="group relative glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                style={{ background: agent.glow }}
              />

              {/* Badge */}
              {agent.badge && (
                <div
                  className="absolute -top-3 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `${agent.color}25`, color: agent.color, border: `1px solid ${agent.color}40` }}
                >
                  {agent.badge}
                </div>
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${agent.color}15`, border: `1px solid ${agent.color}30` }}
              >
                <agent.icon className="w-6 h-6" style={{ color: agent.color }} />
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: agent.color }}>
                  {agent.tagline}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{agent.desc}</p>
              </div>

              {/* Task pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {agent.tasks.map((task) => (
                  <span
                    key={task}
                    className="text-[11px] px-2.5 py-1 rounded-lg font-medium"
                    style={{ background: `${agent.color}10`, color: `${agent.color}cc`, border: `1px solid ${agent.color}20` }}
                  >
                    {task}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`/agents`}
                className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                style={{ color: agent.color }}
              >
                Talk to Agent <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}

          {/* CTA card */}
          <div className="glass-card rounded-2xl p-6 border border-primary/20 flex flex-col items-center justify-center text-center gap-5 bg-primary/5">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Launch All Agents</h3>
              <p className="text-white/40 text-sm">Deploy all 5 AI agents to work on your website simultaneously.</p>
            </div>
            <Link
              href="/agents"
              className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4" /> Start All Agents
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
