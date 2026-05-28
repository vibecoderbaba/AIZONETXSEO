"use client";

import { Shield, Award, Globe, TrendingUp } from "lucide-react";

const logos = [
  "TechSolutions", "CloudERP", "HealthCare+", "FashionHub",
  "GrowthLabs", "MediaSync", "BrandCraft", "DataFlow",
];

const trustBadges = [
  { icon: Shield, label: "SSL Secured", sub: "256-bit encryption" },
  { icon: Award, label: "ISO Certified", sub: "Quality assured" },
  { icon: Globe, label: "99.9% Uptime", sub: "Enterprise SLA" },
  { icon: TrendingUp, label: "ROI Guaranteed", sub: "Or money back" },
];

export function SocialProof() {
  return (
    <section className="py-16 bg-[#030308] border-y border-white/5">
      <div className="container mx-auto px-4 space-y-12">

        {/* Client logos */}
        <div>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/25 mb-8">
            Trusted by leading businesses across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {logos.map((logo) => (
              <div
                key={logo}
                className="font-heading font-black text-lg text-white/15 hover:text-white/35 transition-colors duration-300 tracking-tight"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all text-center"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-sm font-bold text-white">{badge.label}</div>
              <div className="text-xs text-white/35">{badge.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
