import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Scale, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions | AIZONET",
  description: "Read the service terms, SLA parameters, and usage policies for AIZONET OS.",
};

export default function TermsPage() {
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
              <Scale className="w-8 h-8" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
              Terms & <span className="text-gradient">Conditions</span>
            </h1>
            <p className="text-white/40 text-sm">
              Effective Date: May 28, 2026 • AIZONET Growth Platforms Terms of Service
            </p>
          </div>

          {/* Grid cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-4" />
              <h3 className="text-white font-bold mb-2">99.9% Uptime</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Enterprise SLA packages promise rock-solid system availability and real-time support.
              </p>
            </div>
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-yellow-400 mb-4" />
              <h3 className="text-white font-bold mb-2">Fair Usage Rules</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Limits are enforced on crawler scraping request bounds to avoid network flooding.
              </p>
            </div>
            <div className="glass-dark border border-white/5 p-6 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-primary mb-4" />
              <h3 className="text-white font-bold mb-2">IP Protection</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                All generated copy, keywords taxonomies, and analytics belong exclusively to your brand.
              </p>
            </div>
          </div>

          {/* Document Content */}
          <div className="glass-dark border border-white/5 p-8 md:p-12 rounded-3xl space-y-8 text-white/75 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By signing up for an account, deploying our local trackers, or using the AIZONET Operating System (AIZONET OS), you agree to comply with and be bound by these service terms. If you do not accept these terms, you are restricted from utilizing our automated tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. User Account and Integration Responsibility</h2>
              <p className="mb-4">
                To run sitemap synchronizations, CMS page publishing, and task trackers updates, you will link your workspace with third-party keys. You declare that:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-white/60">
                <li>You hold legitimate administrative rights to any crawled domain URL.</li>
                <li>You will protect the integration tokens from leaks on client sides.</li>
                <li>You will not use automated scrapers inside prohibited spaces or in violation of robots.txt flags.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Subscriptions, Credits, and Refunds</h2>
              <p>
                AIZONET OS uses a transparent credit-based calculation model. Each site audit, serp scraper execution, and agent planner execution consumes platform credits as defined on your settings billing tier. Unused credits carry over up to 3 billing cycles. Subscription upgrades take effect instantly, whereas downgrades are scheduled at the next billing date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Limitation of Liability</h2>
              <p>
                AIZONET does not guarantee search engine position listings. Because search ranking factors, core algorithm updates, and core web vitals parameters fluctuate dynamically, all diagnostic optimization strategies are provided "as-is" without explicit warranties of commercial return.
              </p>
            </section>

            <section className="pt-6 border-t border-white/5">
              <p className="text-white/50 text-xs text-center">
                For legal inquiries, contact: <strong>legal@aizonet.in</strong> • AIZONET Legal Department, Chhattisgarh.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
