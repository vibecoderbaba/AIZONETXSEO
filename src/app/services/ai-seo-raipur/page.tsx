import { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { AISEORaipurContent } from "./AISEORaipurContent";

export const metadata: Metadata = constructMetadata({
  title: "AI-Powered SEO Services in Raipur | AIZONET",
  description: "Dominating Google Raipur rankings with AI-driven SEO strategies. NLP optimization, SGE readiness, and local entity mapping for Raipur businesses.",
});

export default function AISEORaipurPage() {
  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI-Powered SEO Services in Raipur",
            "description": "Premium AI-driven SEO strategies to dominate Google Raipur rankings. NLP optimization, SGE readiness, and entity mapping.",
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
              "name": "AI SEO Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NLP-Based Content Optimization" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Google SGE Optimization" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI-Powered Backlink Analysis" } }
              ]
            }
          }),
        }}
      />
      <AISEORaipurContent />
    </>
  );
}
