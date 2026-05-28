import { Metadata } from "next";
import { constructMetadata } from "@/seo/metadata";
import { ChatbotContent } from "./ChatbotContent";

export const metadata: Metadata = constructMetadata({
  title: "AI Chatbot & WhatsApp Automation Raipur | AIZONET",
  description: "Automate your sales and support 24/7. The best AI chatbot agency in India for official WhatsApp Business API and business automation.",
});

export default function ChatbotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Chatbot & WhatsApp Automation Raipur",
            "description": "Premium AI-driven chatbot solutions for Raipur businesses. WhatsApp automation and lead qualification.",
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
      <ChatbotContent />
    </>
  );
}
