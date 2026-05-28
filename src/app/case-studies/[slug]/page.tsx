import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import { TrendingUp, Target, CheckCircle, ChevronLeft, Users, Clock, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

const caseStudies: Record<string, any> = {
  "raipur-realty-group": {
    client: "Raipur Realty Group",
    industry: "Real Estate",
    location: "Raipur, Chhattisgarh",
    duration: "4 Months",
    services: ["WhatsApp Business API", "Meta Ads (Facebook & Instagram)", "AI Lead Scoring"],
    heroGradient: "from-blue-600 to-cyan-500",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
    impact: "300% Increase in Qualified Leads",
    metrics: [
      { label: "Lead Response Time", before: "4 Hours", after: "2 Seconds", icon: Clock },
      { label: "Monthly Qualified Leads", before: "45 leads", after: "180 leads", icon: Users },
      { label: "Cost Per Lead", before: "₹850", after: "₹320", icon: BarChart3 },
      { label: "WhatsApp Open Rate", before: "18%", after: "94%", icon: Zap },
    ],
    challenge: `Raipur Realty Group was managing property inquiries the traditional way — phone calls and emails. With a growing inventory of 200+ properties across Naya Raipur and Shankar Nagar, their 3-person sales team was overwhelmed. Leads would wait for hours for a response, and by the time the team followed up, the prospect had already contacted a competitor.`,
    solution: `AIZONET deployed a full AI-powered lead capture and qualification system using the WhatsApp Business API. When a potential buyer clicked an ad or filled a form, they were instantly connected to an intelligent chatbot that:
    
    — Asked qualifying questions (budget, location preference, property type)
    — Shared relevant property photos and virtual tour links
    — Booked site visits directly in the sales team's calendar
    — Sent automated follow-ups at optimal times based on engagement data
    
    On the Meta Ads side, we used AI-powered lookalike audiences modeled on their top 50 existing buyers to laser-target property seekers in Raipur's key localities.`,
    results: [
      "Qualified leads increased from 45 to 180 per month within 90 days",
      "Lead response time dropped from 4 hours to under 2 seconds",
      "Cost per qualified lead reduced by 62% (₹850 → ₹320)",
      "WhatsApp open rates reached 94% vs. 18% for email",
      "3 new premium properties sold directly from WhatsApp pipeline in Month 2",
      "Sales team reclaimed 60% of their time previously spent on unqualified follow-ups",
    ],
    testimonial: {
      quote: "AIZONET completely changed how we handle leads. Our WhatsApp now works like a 24/7 salesperson. The quality of inquiries has improved dramatically and our team closes deals faster than ever.",
      name: "Rajesh Verma",
      title: "Director, Raipur Realty Group",
    },
  },
  "central-india-electronics": {
    client: "Central India Electronics",
    industry: "Electronics Retail & E-commerce",
    location: "Raipur, Chhattisgarh",
    duration: "6 Months",
    services: ["AI SEO", "Google Performance Max", "Local Search Domination"],
    heroGradient: "from-purple-600 to-pink-500",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1400&q=80",
    impact: "₹1.2Cr Revenue Growth in 6 Months",
    metrics: [
      { label: "Organic Traffic Growth", before: "3,200/mo", after: "28,000/mo", icon: TrendingUp },
      { label: "Google Ads ROAS", before: "2.1x", after: "7.4x", icon: BarChart3 },
      { label: "Top 3 Keywords Ranking", before: "4 keywords", after: "67 keywords", icon: Target },
      { label: "Monthly Revenue", before: "₹18L", after: "₹38L", icon: Zap },
    ],
    challenge: `Central India Electronics had a strong physical presence in Raipur's Pandri market but their online visibility was near zero. When customers searched for "buy laptop Raipur," "best TV price Raipur," or "mobile repair near me," competitors from outside the city dominated the results. Their Google Ads account was running on manual bidding, burning ₹80,000/month with a 2.1x ROAS — barely breaking even.`,
    solution: `AIZONET executed a dual-track AI strategy: organic SEO authority-building paired with smart paid performance.

    For SEO, we used NLP-based content intelligence to identify 200+ high-intent local keywords. We created product-category landing pages optimized for each product line (laptops, ACs, TVs, mobiles) with local schema markup naming specific Raipur neighborhoods. Technical SEO fixes improved Core Web Vitals scores from 42 to 91.
    
    For Google Ads, we migrated to AI-powered Performance Max campaigns with custom audience signals based on their top-converting customer profiles. Automated bidding strategies were configured with a target ROAS of 6x, which the AI consistently exceeded after a 3-week learning phase.`,
    results: [
      "Organic traffic grew from 3,200 to 28,000 monthly visitors — an 775% increase",
      "67 keywords now rank in Top 3 positions on Google (up from just 4)",
      "Google Ads ROAS improved from 2.1x to 7.4x — same budget, 3.5x more revenue",
      "Total monthly revenue grew from ₹18L to ₹38L within 6 months",
      "₹1.2 Crore in total incremental revenue attributed to digital channels",
      "Brand now appears in Google's local 3-pack for 40+ product searches in Raipur",
    ],
    testimonial: {
      quote: "I was skeptical about spending on AI marketing, but the numbers don't lie. We're now dominating searches we couldn't even appear on before. The ROI has been extraordinary.",
      name: "Sunil Agrawal",
      title: "Managing Director, Central India Electronics",
    },
  },
  "taste-of-raipur": {
    client: "Taste of Raipur",
    industry: "Food & Beverage (Restaurant Chain)",
    location: "Raipur, Chhattisgarh (5 Outlets)",
    duration: "3 Months",
    services: ["AI Social Media Strategy", "Instagram & Facebook Ads", "Hyper-local Targeting"],
    heroGradient: "from-orange-600 to-yellow-500",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=80",
    impact: "15,000+ Monthly Online Orders",
    metrics: [
      { label: "Monthly Online Orders", before: "1,200", after: "15,400", icon: TrendingUp },
      { label: "Instagram Followers", before: "4,200", after: "89,000", icon: Users },
      { label: "Average Delivery Radius", before: "2km", after: "6km", icon: Target },
      { label: "Reels Average Views", before: "800", after: "142,000", icon: Zap },
    ],
    challenge: `Taste of Raipur had 5 outlets serving excellent local cuisine but their social media presence was practically dead — 4,200 followers, inconsistent posting, and zero paid strategy. Online orders through Zomato and Swiggy were minimal because the brand had no digital recall. They were entirely dependent on walk-in customers and word of mouth, which capped their growth ceiling significantly.`,
    solution: `AIZONET built a full AI-powered social media engine for Taste of Raipur.
    
    Content Intelligence: Our AI analysed the top 500 viral food videos in Central India to identify patterns — hook styles, music trends, timing, and color palettes. We created a monthly content calendar with 30 pieces: Reels showcasing food preparation, customer reactions, behind-the-scenes kitchen content, and festival-special offers.
    
    Hyper-local Paid Strategy: We deployed Meta Ads with a 5km radius targeting around each outlet, running at peak hunger hours (12–2 PM and 7–9 PM). Custom audiences were built from existing delivery customers for retargeting, achieving exceptional frequency at low cost.
    
    UGC Amplification: We launched a "Taste Challenge" campaign encouraging customers to post their own videos, creating a flywheel of organic content that amplified reach without additional budget.`,
    results: [
      "Monthly online orders grew from 1,200 to 15,400 — a 1,183% increase",
      "Instagram followers grew from 4,200 to 89,000 in just 90 days",
      "Average Reels views grew from 800 to 142,000 per post",
      "One viral Reel featuring their 'Raipur Special Thali' hit 2.4 million views",
      "Effective delivery radius expanded from 2km to 6km due to brand recognition",
      "A new outlet was opened in Shankar Nagar due to demand overflow",
    ],
    testimonial: {
      quote: "We went from being a local secret to a Raipur institution in 3 months. AIZONET's social media strategy made our food famous. The orders just don't stop coming in now.",
      name: "Priya Sharma",
      title: "Co-founder, Taste of Raipur",
    },
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return constructMetadata();
  return constructMetadata({
    title: `${cs.client} Case Study | ${cs.impact}`,
    description: `How AIZONET helped ${cs.client} achieve ${cs.impact} using ${cs.services[0]} and AI-driven marketing in Raipur.`,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">

        {/* Hero */}
        <section className="relative overflow-hidden mb-16">
          <div className="absolute inset-0">
            <img src={cs.image} alt={cs.client} className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>
          <div className="relative container mx-auto px-4 py-24 max-w-5xl">
            <Link href="/case-studies" className="inline-flex items-center text-sm font-semibold text-primary mb-8 hover:underline">
              <ChevronLeft className="mr-1 h-4 w-4" /> All Case Studies
            </Link>
            <div className="flex flex-wrap gap-3 mb-6">
              {cs.services.map((s: string) => (
                <span key={s} className="text-xs font-bold uppercase tracking-widest bg-white/10 text-white/70 px-3 py-1 rounded-full border border-white/20">
                  {s}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {cs.client}
            </h1>
            <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${cs.heroGradient} bg-clip-text text-transparent mb-8`}>
              {cs.impact}
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/50">
              <span>📍 {cs.location}</span>
              <span>🏭 {cs.industry}</span>
              <span>⏱ {cs.duration}</span>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-5xl">

          {/* Metrics Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {cs.metrics.map((m: any) => (
              <div key={m.label} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <m.icon className="h-6 w-6 text-primary mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">{m.label}</p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Before:</span>
                    <span className="text-sm text-white/60 line-through">{m.before}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">After:</span>
                    <span className="text-lg font-bold text-white">{m.after}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Challenge */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">!</span>
              The Challenge
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-white/75 leading-8 text-base whitespace-pre-line">{cs.challenge}</p>
            </div>
          </section>

          {/* Solution */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">→</span>
              Our AI Strategy
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <p className="text-white/75 leading-8 text-base whitespace-pre-line">{cs.solution}</p>
            </div>
          </section>

          {/* Results */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">✓</span>
              Results Delivered
            </h2>
            <div className="space-y-3">
              {cs.results.map((r: string) => (
                <div key={r} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="mb-16">
            <div className={`bg-gradient-to-br ${cs.heroGradient} rounded-3xl p-10 text-center`}>
              <p className="text-2xl font-medium text-white leading-relaxed mb-6 italic">
                "{cs.testimonial.quote}"
              </p>
              <p className="text-white font-bold text-lg">{cs.testimonial.name}</p>
              <p className="text-white/70 text-sm">{cs.testimonial.title}</p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-white/5 border border-white/10 rounded-3xl p-10">
            <h3 className="text-3xl font-bold text-white mb-4">Want results like these?</h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Book a free strategy session and let's map out how AI can transform your Raipur business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white hover:bg-primary/90 transition-all">
                Book Free Strategy Call
              </Link>
              <Link href="/case-studies" className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 border border-white/20 px-8 text-sm font-bold text-white hover:bg-white/20 transition-all">
                View More Case Studies
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
