import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import { TrendingUp, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Case Studies | Real Results for Raipur Businesses",
  description: "See how AIZONET helped local businesses in Chhattisgarh achieve massive growth using AI-driven marketing strategies.",
});

const cases = [
  {
    slug: "raipur-realty-group",
    client: "Raipur Realty Group",
    impact: "300% Increase in Qualified Leads",
    strategy: "AI WhatsApp Automation + Meta Ads",
    summary: "How we automated property inquiries and reduced lead response time from 4 hours to 2 seconds.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    slug: "central-india-electronics",
    client: "Central India Electronics",
    impact: "₹1.2Cr Revenue Growth in 6 Months",
    strategy: "AI SEO + Performance Marketing",
    summary: "Dominating local search for high-intent keywords and optimizing ad spend using predictive analytics.",
    color: "from-purple-600 to-pink-500",
  },
  {
    slug: "taste-of-raipur",
    client: "Taste of Raipur (F&B Chain)",
    impact: "15,000+ Monthly Online Orders",
    strategy: "AI Social Media + Hyper-local Targeting",
    summary: "Using AI to generate viral content and targeting hungry customers within 5km of every outlet.",
    color: "from-orange-600 to-yellow-500",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Data-Driven <span className="text-gradient">Success</span>
            </h1>
            <p className="text-xl text-white/60">
              We don't just promise results. We deliver them using the power of intelligence.
            </p>
          </div>

          <div className="space-y-12 max-w-6xl mx-auto">
            {cases.map((c) => (
              <div key={c.client} className="group relative bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:border-primary/30 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`p-12 bg-gradient-to-br ${c.color} opacity-90 flex flex-col justify-center`}>
                    <TrendingUp className="h-12 w-12 text-white mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-2">{c.impact}</h3>
                    <p className="text-white/80 font-semibold">{c.client}</p>
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-2 mb-4">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-widest text-primary">{c.strategy}</span>
                    </div>
                    <p className="text-lg text-white mb-6 font-medium">
                      {c.summary}
                    </p>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="inline-flex items-center text-white font-bold group-hover:text-primary transition-colors"
                    >
                      View Full Story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
