import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const servicesData: Record<string, any> = {
  "ai-seo-services": {
    title: "AI-Powered SEO Services in Raipur",
    subtitle: "Dominate Google Raipur with AI-Driven Ranking Strategies",
    description: "Traditional SEO is dead. In the age of SGE (Search Generative Experience), you need an AI-first approach. We combine NLP (Natural Language Processing) with technical SEO to rank your business for high-intent keywords in Raipur and Chhattisgarh.",
    features: [
      "NLP-Based Content Optimization for Raipur Search Intent",
      "AI-Powered Backlink Gap Analysis",
      "Google SGE (AI Search) Optimization",
      "Automated Technical SEO & Core Web Vitals Fixes",
      "Entity-Based Keyword Clustering"
    ],
    whyLocal: "Raipur's real estate, retail, and healthcare sectors are booming. We help you capture local demand by dominating the Map Pack and localized search results.",
    benefits: "Expect a 300% increase in organic reach and #1 rankings for Raipur-specific industry keywords within 90 days.",
    faqs: [
      { q: "How is AI SEO different?", a: "AI SEO uses algorithms to predict search trends and optimize content for how Google's AI actually reads pages, not just keyword stuffing." },
      { q: "Do you focus on Raipur keywords?", a: "Yes, we target hyper-local keywords like 'best [industry] in Raipur' to ensure high-quality local leads." }
    ],
    keywords: ["SEO Raipur", "best SEO agency Chhattisgarh", "AI marketing Raipur", "local SEO Raipur"]
  },
  "ai-google-ads-management": {
    title: "AI-Driven Google Ads Agency in Raipur",
    subtitle: "Maximize ROI with Predictive PPC & Smart Bidding",
    description: "Stop wasting budget on broad keywords. Our AI-driven Google Ads management uses predictive modeling to identify high-converting clicks before they happen, specifically tuned for the Raipur and Indian consumer market.",
    features: [
      "Predictive Bid Management",
      "Dynamic Search Ads for Local Inventory",
      "AI Copywriting for High CTR",
      "Competitor Ad Hijacking (AI Enabled)",
      "Automated Negative Keyword Filtering"
    ],
    whyLocal: "We understand the Raipur consumer mindset—from Pandri to Shankar Nagar. Our ads are localized to speak the language of your local customers.",
    benefits: "Reduce your Cost Per Lead (CPL) by 40% while doubling your conversion rate through intelligent targeting.",
    faqs: [
      { q: "What is the minimum budget?", a: "We work with businesses of all sizes in Raipur, starting from modest budgets to large-scale enterprise campaigns." },
      { q: "How fast do I see results?", a: "Google Ads provide instant visibility. You will start seeing leads within the first 48 hours of launch." }
    ],
    keywords: ["Google Ads Raipur", "PPC agency Raipur", "best digital ads Chhattisgarh"]
  },
  "ai-social-media-marketing": {
    title: "AI Social Media Marketing in Raipur",
    subtitle: "Turn Your Social Presence into a Lead Machine",
    description: "Social media in Raipur is about more than just posting photos. We use AI to analyze viral trends in Chhattisgarh and create content that stops the scroll. From Instagram Reels to LinkedIn thought leadership.",
    features: [
      "AI-Generated Viral Reels & Posts",
      "Automated Community Management",
      "Hyper-Local Targeting for Raipur Pincodes",
      "Social Listening & Sentiment Analysis",
      "Influencer Matchmaking (AI Powered)"
    ],
    whyLocal: "Raipur is highly social. Whether it's the latest cafe in Samta Colony or a new township in Nardaha, we make sure your brand is the talk of the town.",
    benefits: "Build a loyal community of 10,000+ local followers and drive consistent traffic to your store or website.",
    faqs: [
      { q: "Which platforms do you manage?", a: "We focus on Instagram, Facebook, LinkedIn, and YouTube, where Raipur's audience is most active." },
      { q: "Is content AI-generated?", a: "We use AI for data and drafts, but every post is polished by human experts to ensure brand voice." }
    ],
    keywords: ["social media Raipur", "Instagram marketing Raipur", "best digital agency Raipur"]
  },
  "ai-chatbot-development": {
    title: "AI Chatbot & WhatsApp Automation Raipur",
    subtitle: "Automate Sales & Support 24/7",
    description: "Don't let your Raipur customers wait. Deploy intelligent, multilingual chatbots (Hindi/English) that qualify leads, book appointments, and answer FAQs on WhatsApp, Instagram, and your Website.",
    features: [
      "Intelligent WhatsApp Business API Integration",
      "Lead Qualification & CRM Sync",
      "Multilingual Support (Hindi/English/Chhattisgarhi)",
      "Automated Appointment Booking",
      "E-commerce Checkout via WhatsApp"
    ],
    whyLocal: "In Raipur, WhatsApp is the primary communication tool. We turn your WhatsApp into a high-converting sales funnel.",
    benefits: "Capture 100% of midnight inquiries and reduce customer support costs by 70%.",
    faqs: [
      { q: "Is it an official API?", a: "Yes, we provide official WhatsApp Business API integration for verified green tick potential." },
      { q: "Does it understand Hindi?", a: "Our bots are trained on Hinglish and Hindi to perfectly serve the Raipur audience." }
    ],
    keywords: ["WhatsApp bot Raipur", "AI chatbot agency India", "business automation Raipur"]
  },
  "premium-web-development": {
    title: "Premium Web Development in Raipur",
    subtitle: "Ultra-Fast, SEO-Ready Websites That Convert",
    description: "Your website is your digital storefront in Raipur. We build high-performance, Next.js-powered websites that load in under 1 second and are built from day one to rank on Google.",
    features: [
      "Next.js 14+ Server Side Rendering",
      "Core Web Vitals Optimized (100 Score)",
      "Mobile-First Futuristic Design",
      "Conversion Rate Optimized (CRO) Layouts",
      "Integrated SEO Silo Architecture"
    ],
    whyLocal: "Most local websites in Raipur are slow and outdated. We give you a competitive edge with a premium, Silicon Valley-style website.",
    benefits: "Rank faster, load faster, and convert more visitors into paying customers in Chhattisgarh.",
    faqs: [
      { q: "How long does it take?", a: "A premium business website typically takes 2-4 weeks from design to launch." },
      { q: "Is it mobile responsive?", a: "100%. Over 80% of Raipur's traffic is mobile, so we prioritize mobile-first performance." }
    ],
    keywords: ["web development Raipur", "best website designer Raipur", "Next.js developer India"]
  }
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return constructMetadata();

  return constructMetadata({
    title: `${service.title} | AIZONET`,
    description: service.description,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.title,
            "description": service.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": "AIZONET",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Raipur",
                "addressRegion": "Chhattisgarh",
                "addressCountry": "IN"
              }
            },
            "areaServed": "Raipur, Chhattisgarh",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Marketing Services",
              "itemListElement": service.features.map((f: string, i: number) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": f
                }
              }))
            }
          }),
        }}
      />

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 translate-y-1/2" />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                Expert Solutions in Raipur
              </span>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-primary font-medium mb-8">
                {service.subtitle}
              </p>
              <p className="text-lg text-white/60 leading-relaxed max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">What We Deliver</h2>
                <div className="space-y-6">
                  {service.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-start space-x-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-1 group-hover:bg-primary transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-primary group-hover:text-black transition-colors" />
                      </div>
                      <span className="text-white/80 font-medium text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-950 p-10 rounded-[3rem] border border-white/5 relative">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/10 blur-[80px] -z-10" />
                <h3 className="text-2xl font-bold text-white mb-6">Why Raipur Businesses Choose AIZONET</h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  {service.whyLocal}
                </p>
                <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20">
                  <h4 className="text-primary font-bold mb-2 flex items-center">
                    <Zap className="mr-2 h-5 w-5" /> Projected Impact
                  </h4>
                  <p className="text-white/80 text-sm leading-relaxed">{service.benefits}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.faqs.map((faq: any, i: number) => (
                  <div key={i} className="p-8 rounded-3xl bg-black border border-white/5 hover:border-white/10 transition-all">
                    <h3 className="text-lg font-bold text-white mb-4">{faq.q}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Local Keywords Silo */}
        <section className="py-12 bg-black border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
              <span className="font-bold text-white/50 uppercase tracking-widest">Optimized for:</span>
              {service.keywords.map((kw: string) => (
                <span key={kw} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8">Ready to scale your <span className="text-gradient">Raipur Business?</span></h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg">
              Stop guessing. Start growing. Join the top 1% of businesses in Chhattisgarh using AI to win.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                Get Your Free AI Audit
              </Link>
              <Link href="/pricing" className="px-10 py-5 bg-white/10 text-white font-bold rounded-full border border-white/10 hover:bg-white/20 transition-all">
                View Service Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
