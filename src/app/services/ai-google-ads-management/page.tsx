import { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { GoogleAdsContent } from "./GoogleAdsContent";

export const metadata: Metadata = constructMetadata({
  title: "AI-Driven Google Ads Agency in Raipur | AIZONET",
  description: "Maximize ROI with predictive PPC and smart bidding. The best AI digital marketing agency in Chhattisgarh for Google Ads management.",
});

export default function GoogleAdsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Google Ads Management Raipur",
            "description": "Premium AI-driven Google Ads strategies for Raipur businesses. Predictive bidding and ROI optimization.",
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
      <GoogleAdsContent />
    </>
  );
}
