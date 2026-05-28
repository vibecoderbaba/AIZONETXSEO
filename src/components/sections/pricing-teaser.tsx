"use client";

import Link from "next/link";
import { Check, Zap, Star, ArrowRight, Shield } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    period: "Free forever",
    desc: "Perfect for trying out the AI SEO platform",
    color: "#3B82F6",
    popular: false,
    features: [
      "5 website audits / month",
      "Basic SEO score",
      "1 AI agent (SEO only)",
      "10 keyword lookups",
      "PDF report (watermarked)",
    ],
    cta: "Start Free",
    href: "/signup",
  },
  {
    name: "Growth",
    price: "₹2,999",
    period: "/month",
    desc: "For growing businesses ready to scale",
    color: "#8B5CF6",
    popular: true,
    features: [
      "50 website audits / month",
      "Full AI audit (200+ checks)",
      "All 5 AI agents",
      "Unlimited keyword research",
      "Competitor analysis (3 sites)",
      "AI content generation (50 pieces)",
      "White-label reports",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    href: "/signup?plan=growth",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "Contact us",
    desc: "For agencies and large organizations",
    color: "#22D3EE",
    popular: false,
    features: [
      "Unlimited audits",
      "Multi-site management",
      "Custom AI agents",
      "API access",
      "Team workspaces",
      "CRM integrations",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    href: "/contact",
  },
];

export function PricingTeaser() {
  return (
    <section className="relative py-28 bg-[#030308] overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-yellow-400/20 text-sm text-yellow-400/80 mb-6">
            <Star className="w-4 h-4 fill-current" /> Simple, transparent pricing
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
            Invest in AI Growth,
            <br />
            <span className="text-gradient">Not Tool Subscriptions</span>
          </h2>
          <p className="text-white/50 text-lg">
            One platform replaces Ahrefs + SEMrush + Jasper AI + SurferSEO. Save ₹25,000/month.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 border transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-accent-2/10 to-transparent border-accent-2/30 shadow-2xl shadow-accent-2/10"
                  : "glass-card border-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent-2 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-accent-2/30">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: plan.color }}>
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white font-heading">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="text-white/40 text-sm">{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-white/60">
                    <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {feat}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm transition-all"
                style={
                  plan.popular
                    ? { background: plan.color, color: "white", boxShadow: `0 8px 24px ${plan.color}40` }
                    : { background: `${plan.color}12`, color: plan.color, border: `1px solid ${plan.color}25` }
                }
              >
                {plan.cta === "Start Free" && <Zap className="w-4 h-4" />}
                {plan.cta === "Contact Sales" && <Shield className="w-4 h-4" />}
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
            Compare all features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
