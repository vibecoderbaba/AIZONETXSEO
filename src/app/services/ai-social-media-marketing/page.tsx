import { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { SocialMediaContent } from "./SocialMediaContent";

export const metadata: Metadata = constructMetadata({
  title: "AI Social Media Marketing in Raipur | AIZONET",
  description: "Turn your social presence into a lead machine. The best AI digital marketing agency in India for viral Instagram Reels and LinkedIn growth.",
});

export default function SocialMediaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Social Media Marketing Raipur",
            "description": "Premium AI-driven social media strategies for viral growth in Raipur and Chhattisgarh.",
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
      <SocialMediaContent />
    </>
  );
}
