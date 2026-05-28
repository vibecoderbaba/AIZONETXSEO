"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Zap, ArrowRight, Play, TrendingUp, Users, Star, CheckCircle, Globe } from "lucide-react";

const TYPING_PHRASES = [
  "analyzing your website's SEO score...",
  "detecting 47 technical issues...",
  "generating your growth roadmap...",
  "identifying competitor gaps...",
  "building your content strategy...",
];

const TICKER_ITEMS = [
  { icon: TrendingUp, text: "247% traffic increase for TechCorp India" },
  { icon: Star, text: "4.9/5 rating from 500+ users" },
  { icon: Globe, text: "12,000+ websites audited this month" },
  { icon: CheckCircle, text: "AI agents running 24/7 for our clients" },
  { icon: Users, text: "Join 2,400+ businesses on AIZONET" },
  { icon: Zap, text: "Avg. 38-point SEO score jump in 90 days" },
];

function TypingDemo() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    const speed = deleting ? 25 : 55;
    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIdx < phrase.length) {
          setDisplayed(phrase.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1800);
        }
      } else {
        if (charIdx > 0) {
          setDisplayed(phrase.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setPhraseIdx(i => (i + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 font-mono text-sm">
      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-white/50">AI:</span>
      <span className="text-accent">{displayed}</span>
      <span className="animate-blink text-primary">|</span>
    </div>
  );
}

function ScoreMockup() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setScore(s => (s < 78 ? s + 1 : 78));
    }, 18);
    return () => clearInterval(timer);
  }, []);

  const color = score >= 70 ? "#3B82F6" : score >= 50 ? "#FBBF24" : "#F87171";

  return (
    <div className="relative glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">AI SEO Score</div>
          <div className="text-white font-semibold mt-0.5">aizonet.in</div>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <circle
              cx="32" cy="32" r="26" fill="none"
              stroke={color} strokeWidth="6"
              strokeDasharray={`${(score / 100) * 163.4} 163.4`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.1s linear", filter: `drop-shadow(0 0 6px ${color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-black text-white">{score}</span>
          </div>
        </div>
      </div>
      {[
        { label: "Technical SEO", score: 82, color: "#3B82F6" },
        { label: "Content Quality", score: 71, color: "#8B5CF6" },
        { label: "Core Web Vitals", score: 65, color: "#FBBF24" },
        { label: "Backlink Authority", score: 58, color: "#34D399" },
      ].map((item) => (
        <div key={item.label} className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-white/50">{item.label}</span>
            <span className="text-white/70 font-medium">{item.score}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${item.score}%`, background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const [email, setEmail] = useState("");
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative min-h-screen flex flex-col pt-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#030308]" />
      <div className="absolute inset-0 bg-mesh opacity-60" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-2/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/60">AI Platform • 12,000+ Audits Completed</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40" />
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white">
                  The AI SEO
                  <br />
                  <span className="text-gradient">Operating</span>
                  <br />
                  System
                </h1>
                <p className="text-lg text-white/50 max-w-xl leading-relaxed">
                  5 specialized AI agents audit your website, generate content, analyze competitors, 
                  and build your growth strategy — fully automated, 24/7.
                </p>
              </div>

              {/* Typing demo */}
              <TypingDemo />

              {/* Email CTA */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your website URL..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-xl glass border border-white/10 text-white placeholder:text-white/30 text-sm outline-none focus:border-primary/50 focus:bg-white/5 transition-all"
                />
                <Link
                  href="/audit"
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary font-semibold text-white text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex-shrink-0"
                >
                  <Zap className="w-4 h-4 group-hover:animate-bounce" />
                  Audit Now — Free
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/40">
                {["No credit card", "Results in 60 seconds", "AI-powered insights"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Score mockup */}
            <div className="hidden xl:block relative">
              <div className="relative animate-float">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />
                <ScoreMockup />

                {/* Floating badges */}
                <div className="absolute -top-6 -right-6 glass-card rounded-2xl px-4 py-3 flex items-center gap-2 border border-green-400/20 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-xs font-bold text-white">+247%</div>
                    <div className="text-[10px] text-white/40">Traffic Growth</div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-4 py-3 flex items-center gap-2 border border-purple-400/20 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <div>
                    <div className="text-xs font-bold text-white">AI Rank #1</div>
                    <div className="text-[10px] text-white/40">SERP Position</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker bar */}
      <div className="relative z-10 border-t border-white/5 bg-white/[0.02] overflow-hidden py-3">
        <div className="flex gap-12 animate-ticker whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-white/40 flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary/60" />
              {item.text}
              <span className="text-white/10 ml-4">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
