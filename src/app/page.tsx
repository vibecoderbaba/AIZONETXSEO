import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { AIAgentsPreview } from "@/components/sections/ai-agents-preview";
import { FeaturesBento } from "@/components/sections/features-bento";
import { Testimonials } from "@/components/sections/testimonials";
import { PricingTeaser } from "@/components/sections/pricing-teaser";
import { SocialProof } from "@/components/sections/social-proof";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030308]">
      <Navbar />
      <Hero />
      <StatsBar />
      <AIAgentsPreview />
      <FeaturesBento />
      <SocialProof />
      <Testimonials />
      <PricingTeaser />

      {/* Final CTA */}
      <section className="relative py-28 bg-[#030308] overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-primary mb-8">
              <Zap className="w-4 h-4" /> Free forever plan available
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Start Dominating
              <br />
              <span className="text-gradient">Search Rankings</span>
              <br />
              Today
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join 2,400+ businesses using AIZONET to outrank competitors, 
              generate leads automatically, and grow revenue with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30"
              >
                <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Launch Free Audit
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-all"
              >
                View Demo Dashboard <ArrowRight className="w-5 h-5 text-white/40" />
              </Link>
            </div>
            <p className="text-white/25 text-sm mt-6">No credit card required • 60-second setup • Cancel anytime</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
