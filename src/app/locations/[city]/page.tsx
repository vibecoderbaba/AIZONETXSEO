import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { constructMetadata } from "@/seo/metadata";
import { MapPin, CheckCircle2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

interface LocationPageProps {
  params: Promise<{
    city: string;
  }>;
}

const locationData: Record<string, any> = {
  "raipur": {
    name: "Raipur",
    fullName: "Raipur, Chhattisgarh",
    tagline: "The Digital Hub of Chhattisgarh",
    description: "As the capital city and commercial epicenter, Raipur businesses face intense competition. We provide AI-driven marketing solutions that help local brands dominate the market from Pandri to Naya Raipur.",
    stats: [
      { label: "Local Businesses Served", value: "50+" },
      { label: "Avg. ROI Increase", value: "250%" },
      { label: "Top Rank Keywords", value: "500+" }
    ],
    sectors: ["Real Estate", "Retail & Fashion", "Healthcare", "Education", "Manufacturing"],
    keywords: ["digital marketing agency raipur", "best seo company in raipur", "social media marketing raipur"]
  },
  "bilaspur": {
    name: "Bilaspur",
    fullName: "Bilaspur, Chhattisgarh",
    tagline: "Scaling Growth in the Nyaydhani",
    description: "Bilaspur is rapidly emerging as a business powerhouse. Our AI strategies are designed to help Bilaspur-based enterprises capture the regional market and scale nationally.",
    stats: [
      { label: "Local Clients", value: "15+" },
      { label: "Lead Growth", value: "180%" },
      { label: "Search Visibility", value: "95%" }
    ],
    sectors: ["Energy & Power", "Logistics", "Local Retail", "Professional Services"],
    keywords: ["digital marketing bilaspur", "seo services bilaspur", "website design bilaspur"]
  },
  "durg-bhilai": {
    name: "Durg-Bhilai",
    fullName: "Durg & Bhilai, Chhattisgarh",
    tagline: "Industrial Marketing Reinvented",
    description: "For the industrial and educational heart of the state, we offer specialized AI automation and B2B lead generation strategies that drive real business impact.",
    stats: [
      { label: "Industrial Projects", value: "10+" },
      { label: "B2B Lead Increase", value: "300%" },
      { label: "Automation Saved", value: "200h/mo" }
    ],
    sectors: ["Steel & Industrial", "Education Hubs", "IT Services", "Real Estate"],
    keywords: ["marketing bhilai", "digital agency durg", "seo bhilai"]
  }
};

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { city } = await params;
  const data = locationData[city.toLowerCase()];
  if (!data) return constructMetadata();

  return constructMetadata({
    title: `Best AI Digital Marketing Agency in ${data.name} | AIZONET`,
    description: `Leading AI-powered digital marketing services in ${data.fullName}. Specializing in SEO, Ads, and Automation for local businesses in ${data.name}.`,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { city: cityParam } = await params;
  const city = locationData[cityParam.toLowerCase()];

  if (!city) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `AIZONET ${city.name}`,
            "description": city.description,
            "url": `https://aizonet.in/locations/${cityParam}`,
            "telephone": "+91 9343356066",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": city.name,
              "addressRegion": "Chhattisgarh",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "21.2514",
              "longitude": "81.6296"
            },
            "areaServed": city.fullName
          }),
        }}
      />

      <main className="flex-1 pt-32">
        {/* Hero Section */}
        <section className="py-24 bg-zinc-950 border-b border-white/5">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <MapPin className="h-4 w-4" />
              <span>Dedicated Support for {city.name}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
              AI Digital Marketing in <span className="text-gradient">{city.name}</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12">
              {city.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {city.stats.map((stat: any) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services for City */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our {city.name} Expertise</h2>
              <p className="text-white/60">Tailored AI solutions for the {city.name} business ecosystem.</p>
            </div>
            <ServicesGrid />
          </div>
        </section>

        {/* Local Sectors */}
        <section className="py-24 bg-zinc-950 border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Key Industries We Support in {city.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {city.sectors.map((sector: string) => (
                    <div key={sector} className="flex items-center space-x-3 p-4 rounded-xl bg-black border border-white/5">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-white/80 font-medium">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-primary/10 border border-primary/20">
                  <TrendingUp className="h-10 w-10 text-primary mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Growth Focused</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    We don't just provide vanity metrics. Our goal is to drive actual revenue 
                    growth for {city.name} businesses through measurable AI-driven results.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <Users className="h-10 w-10 text-white/40 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Local Context</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Understanding the local {city.name} market is our edge. We know what 
                    the local audience responds to and how to capture their attention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Process />

        {/* Local Keywords Silo */}
        <section className="py-12 bg-black border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/30">
              <span className="font-bold text-white/50 uppercase tracking-widest">Local SEO Keywords:</span>
              {city.keywords.map((kw: string) => (
                <span key={kw} className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8">Become the #1 Brand in <span className="text-gradient">{city.name}</span></h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto text-lg">
              Partner with the leading AI marketing agency in Chhattisgarh. Let's build your dominance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/contact" className="px-10 py-5 bg-primary text-black font-bold rounded-full hover:scale-105 transition-all">
                Claim Your Free Audit
              </Link>
              <Link href="/free-consultation" className="px-10 py-5 bg-white/10 text-white font-bold rounded-full border border-white/10 hover:bg-white/20 transition-all">
                Speak with an Expert
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
