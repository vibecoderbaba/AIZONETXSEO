import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { constructMetadata } from "@/seo/metadata";

export const metadata = constructMetadata({
  title: "AI Marketing Services | AIZONET Digital Agency",
  description: "Explore our comprehensive suite of AI-driven marketing solutions including SEO, Ads, Automation, and Chatbots.",
});

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="bg-zinc-950 py-20 border-b border-white/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-gradient">Core Solutions</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              We combine human creativity with artificial intelligence to deliver 
              unparalleled growth for your business in Raipur.
            </p>
          </div>
        </div>
        <ServicesGrid />
        <Process />
      </main>

      <Footer />
    </div>
  );
}
