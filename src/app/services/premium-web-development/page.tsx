import { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { WebDevContent } from "./WebDevContent";

export const metadata: Metadata = constructMetadata({
  title: "Premium Web Development in Raipur | AIZONET",
  description: "Ultra-fast, Next.js powered websites for your Raipur business. The best web design agency in Chhattisgarh for high-performance digital presence.",
});

export default function WebDevPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Premium Web Development Raipur",
            "description": "High-performance Next.js website development for businesses in Raipur and Chhattisgarh.",
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
            "areaServed": "Raipur, Chhattisgarh, India"
          }),
        }}
      />
      <WebDevContent />
    </>
  );
}
