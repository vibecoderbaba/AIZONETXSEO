"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CEO, TechSolutions Raipur",
    avatar: "RK",
    rating: 5,
    text: "AIZONET's AI audit found 73 technical SEO issues we had no idea about. Within 6 months, our organic traffic grew by 312%. The AI agents work 24/7 and we've not needed to hire an SEO team.",
    metrics: { before: "1.2K", after: "5.1K", label: "Monthly Visitors" },
    color: "#3B82F6",
  },
  {
    name: "Priya Sharma",
    role: "Marketing Head, CloudERP India",
    avatar: "PS",
    rating: 5,
    text: "The competitor analysis alone is worth 10x the subscription price. We discovered 47 keywords our competitors were ranking for that we missed. Now we're outranking them on 31 of those terms.",
    metrics: { before: "#47", after: "#3", label: "Avg. SERP Position" },
    color: "#8B5CF6",
  },
  {
    name: "Amit Agrawal",
    role: "Founder, HealthCare Chhattisgarh",
    avatar: "AA",
    rating: 5,
    text: "The AI content agent generates SEO-optimized blog posts that actually rank. We went from publishing 1 post/month to 20 posts/month — without hiring a single content writer. Leads up 180%.",
    metrics: { before: "8", after: "23", label: "Monthly Leads" },
    color: "#10B981",
  },
  {
    name: "Sneha Patel",
    role: "Digital Manager, FashionHub",
    avatar: "SP",
    rating: 5,
    text: "The AI chatbot on our website is incredible. It qualifies leads, handles objections, and has booked over 40 sales calls in the last month — all automatically, even at 2am.",
    metrics: { before: "2.1%", after: "8.7%", label: "Conversion Rate" },
    color: "#F59E0B",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const t = testimonials[current];

  return (
    <section className="relative py-28 bg-[#050510] overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white mb-4">
            Trusted by{" "}
            <span className="text-gradient">2,400+ Businesses</span>
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 text-yellow-400 fill-current" />)}
            <span className="text-white/40 text-sm ml-2">4.9/5 from 500+ reviews</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card rounded-3xl p-10 border border-white/5 overflow-hidden">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 opacity-5">
              <Quote className="w-24 h-24 text-white" />
            </div>

            {/* Color accent */}
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-3xl transition-all duration-500"
              style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left: Author */}
              <div className="lg:col-span-1 flex flex-col items-center lg:items-start gap-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black font-heading"
                  style={{ background: `${t.color}25`, border: `2px solid ${t.color}40` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-white/40 text-sm">{t.role}</div>
                  <div className="flex items-center gap-0.5 mt-2">
                    {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 text-yellow-400 fill-current" />)}
                  </div>
                </div>

                {/* Metric */}
                <div className="glass rounded-2xl p-4 w-full text-center">
                  <div className="text-xs text-white/40 mb-2">{t.metrics.label}</div>
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-lg font-bold text-white/40">{t.metrics.before}</div>
                    <div className="text-primary text-sm">→</div>
                    <div className="text-2xl font-black text-gradient">{t.metrics.after}</div>
                  </div>
                </div>
              </div>

              {/* Right: Quote */}
              <div className="lg:col-span-2">
                <p className="text-white/70 text-lg leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current ? t.color : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
