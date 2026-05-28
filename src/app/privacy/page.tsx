import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | AIZONET",
  description: "Learn how AIZONET collects, protects, and handles your digital marketing data and analytics.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030308]">
      <Navbar />
      
      <main className="flex-1 relative py-20 px-4 md:px-8">
        <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl border border-primary/20 text-primary mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-white/40 text-sm">
              Last Updated: May 28, 2026 • Version 1.2 • AIZONET Growth OS Compliance
            </p>
          </div>

          {/* Grid cards of focus */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <Lock className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">Secure Encryption</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                All client databases and integration tokens are protected with industry-standard AES-256 protocols.
              </p>
            </div>
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <Eye className="w-6 h-6 text-accent mb-4" />
              <h3 className="text-white font-bold mb-2">Zero Data Trading</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                We never rent, trade, or distribute your search rankings history or customer lead metrics.
              </p>
            </div>
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <FileCheck className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="text-white font-bold mb-2">GDPR & CCPA Ready</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Full user controls to review, delete, or export your sync pipelines at any time.
              </p>
            </div>
          </div>

          {/* Document Content */}
          <div className="glass-dark border border-white/5 p-8 md:p-12 rounded-3xl space-y-8 text-white/75 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Scope and Information We Collect</h2>
              <p className="mb-4">
                At AIZONET, we operate under strict transparency rules regarding data extraction. We collect specific categories of data necessary to provide a high-performing autonomous growth system:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-white/60">
                <li><strong>Account Credentials:</strong> Email, company name, billing details.</li>
                <li><strong>SEO Diagnostics & Crawl Logs:</strong> URLs queried, technical audit latency metrics, sitemap structures.</li>
                <li><strong>Third-Party Integrations:</strong> Dynamic API access tokens for HubSpot, Jira, Trello, Shopify, Webflow, and WordPress, stored with strict client-side encryption.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Processing Principles</h2>
              <p>
                We use the gathered telemetry to perform organic SEO modeling, estimate keyword competition matrices, detect system anomalies, and generate actionable cold sales emails. Your analytics are processed inside isolated container sandboxes to prevent cross-account inference.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Storage and Data Retention</h2>
              <p>
                Crawl telemetry is retained for 90 days in our semantic caches to prevent redundant third-party API latency. Account diagnostics remain secure in our cloud instance unless explicitly purged by requesting account closure at <span className="text-primary font-semibold">compliance@aizonet.in</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Security Measures</h2>
              <p>
                AIZONET maintains administrative, technical, and physical safeguards designed to protect personal information against accidental, unlawful or unauthorized destruction, loss, alteration, access, disclosure or use.
              </p>
            </section>

            <section className="pt-6 border-t border-white/5">
              <p className="text-white/50 text-xs text-center">
                Questions or concerns? Contact our Data Protection Officer at: <strong>dpo@aizonet.in</strong> • Raipur, Chhattisgarh, India.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
