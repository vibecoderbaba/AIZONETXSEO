"use client";

import Link from "next/link";
import { Zap, Search, BarChart3, FileText, Globe, Shield, ArrowRight, Sparkles, TrendingUp, Bot } from "lucide-react";

const features = [
  {
    id: "audit",
    icon: Zap,
    title: "AI Website Audit",
    desc: "Deep 200-point SEO audit powered by Gemini AI. Get your score in 60 seconds.",
    color: "#3B82F6",
    size: "large",
    href: "/audit",
    stat: "200+ checks",
  },
  {
    id: "content",
    icon: FileText,
    title: "AI Content Engine",
    desc: "Generate blog posts, meta descriptions, and full content strategies.",
    color: "#8B5CF6",
    size: "normal",
    href: "/content",
    stat: "10x faster",
  },
  {
    id: "competitor",
    icon: BarChart3,
    title: "Competitor Analysis",
    desc: "Spy on competitor keywords, traffic, and content gaps.",
    color: "#F59E0B",
    size: "normal",
    href: "/competitor",
    stat: "Real-time data",
  },
  {
    id: "keywords",
    icon: Search,
    title: "Keyword Intelligence",
    desc: "Discover high-opportunity keywords with AI clustering and topical authority mapping.",
    color: "#10B981",
    size: "large",
    href: "/keywords",
    stat: "1M+ keywords",
  },
  {
    id: "reports",
    icon: Globe,
    title: "Premium Reports",
    desc: "White-label PDF reports with growth roadmaps and action plans.",
    color: "#EC4899",
    size: "normal",
    href: "/reports",
    stat: "Shareable",
  },
  {
    id: "security",
    icon: Shield,
    title: "SEO Health Monitor",
    desc: "24/7 monitoring for ranking changes, broken links, and algorithm updates.",
    color: "#22D3EE",
    size: "normal",
    href: "/dashboard",
    stat: "24/7 alerts",
  },
];

export function FeaturesBento() {
  return (
    <section className="relative py-28 bg-[#050510]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/50 mb-6">
            <Sparkles className="w-4 h-4 text-primary" /> Everything in one platform
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
            The Complete AI SEO
            <br />
            <span className="text-gradient">Growth Stack</span>
          </h2>
          <p className="text-white/50 text-lg">
            Replace 7 different tools with one AI-powered platform that does everything automatically.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className={`group relative glass-card rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 dashboard-card ${
                feature.size === "large" ? "lg:col-span-1" : ""
              }`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)` }}
              />

              {/* Icon + stat */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}25` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: `${feature.color}10`, color: feature.color, border: `1px solid ${feature.color}20` }}
                >
                  {feature.stat}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gradient transition-all">{feature.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed mb-5">{feature.desc}</p>

              <div className="flex items-center gap-1.5 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: feature.color }}>
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all text-sm"
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            View Full Platform
            <ArrowRight className="w-4 h-4 text-white/40" />
          </Link>
        </div>
      </div>
    </section>
  );
}
