import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/sections/contact-form";
import { constructMetadata } from "@/seo/metadata";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata = constructMetadata({
  title: "Free AI Marketing Audit & Consultation | AIZONET",
  description: "Get a comprehensive analysis of your digital presence and a custom AI growth roadmap for your business. 100% Free.",
});

export default function FreeConsultation() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6">
                  <Zap className="h-4 w-4 text-primary mr-2" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Limited Slots Available</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                  Get Your <span className="text-gradient">AI Growth</span> Roadmap
                </h1>
                <p className="text-xl text-white/60 mb-10">
                  Stop guessing. Start growing. Our experts will perform a deep audit of your 
                  SEO, Ads, and Workflows to identify exactly where AI can save you time and make you money.
                </p>

                <div className="space-y-6 mb-12">
                  {[
                    "Comprehensive SEO Site Audit",
                    "Competitor AI Strategy Analysis",
                    "Workflow Automation Identification",
                    "Custom 12-Month Growth Roadmap"
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <span className="text-white/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  <div>
                    <p className="text-white font-bold">No Obligations. No Spam.</p>
                    <p className="text-white/40 text-sm">Just pure value for Raipur's business owners.</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-[3rem] p-10 shadow-2xl shadow-primary/10 relative">
                <div className="absolute -top-6 -right-6 h-20 w-20 bg-primary rounded-full flex items-center justify-center font-bold text-white rotate-12 shadow-lg">
                  FREE
                </div>
                <h2 className="text-2xl font-bold text-white mb-8 text-center">Claim Your Audit</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
