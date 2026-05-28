import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import { Check, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Pricing Plans | ROI-Focused AI Marketing for Raipur Businesses",
  description: "Transparent pricing for AI-driven SEO, ads, and automation services. Choose the best plan for your business growth.",
});

const tiers = [
  {
    name: "Starter AI",
    price: "₹14,999",
    description: "Perfect for local businesses in Raipur starting their AI journey.",
    features: [
      "Local SEO Optimization",
      "AI Content Research (5 Posts/mo)",
      "Basic WhatsApp Automation",
      "Monthly Performance Report",
      "GMB Management"
    ],
    cta: "Start Scaling",
    featured: false,
  },
  {
    name: "Growth Engine",
    price: "₹34,999",
    description: "The most popular plan for businesses ready to dominate Chhattisgarh.",
    features: [
      "Everything in Starter",
      "AI Ad Management (Google & Meta)",
      "Advanced SEO Silo Architecture",
      "Custom AI Chatbot (1 Instance)",
      "Bi-weekly Strategy Calls",
      "Competitor AI Analysis"
    ],
    cta: "Dominate Market",
    featured: true,
  },
  {
    name: "Enterprise Intelligence",
    price: "Custom",
    description: "Fully custom AI workflows and omni-channel dominance.",
    features: [
      "Everything in Growth",
      "Custom LLM Fine-tuning",
      "Full CRM AI Integration",
      "Multi-location Expansion",
      "Dedicated AI Account Manager",
      "Unlimited Content Generation"
    ],
    cta: "Contact for Quote",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Invest in <span className="text-gradient">Growth</span>
            </h1>
            <p className="text-xl text-white/60">
              No hidden fees. No complicated jargon. Just results-driven AI marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-[2.5rem] border ${
                  tier.featured 
                    ? "bg-primary/10 border-primary shadow-2xl shadow-primary/20" 
                    : "bg-white/5 border-white/10"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-white/40 text-sm mb-6">{tier.description}</p>
                
                <div className="flex items-baseline space-x-1 mb-8">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-white/40">/mo</span>}
                </div>

                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start space-x-3 text-sm text-white/80">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`flex h-12 w-full items-center justify-center rounded-xl font-bold transition-all ${
                    tier.featured
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-white/40 text-sm">
              All prices are inclusive of AI tool costs. Custom development may vary.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
