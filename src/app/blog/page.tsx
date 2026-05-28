import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export const metadata = constructMetadata({
  title: "AI Marketing Blog | Insights for Raipur Businesses",
  description: "Stay ahead with the latest in AI SEO, marketing automation, and business growth strategies from AIZONET.",
});

const posts = [
  {
    slug: "ai-seo-raipur-guide",
    title: "AI SEO Raipur: How to Rank #1 for Competitive Local Keywords",
    excerpt: "Master the art of AI-powered local SEO in Raipur. Learn how to use NLP and semantic search to dominate Chhattisgarh's digital market.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    date: "May 12, 2026",
    category: "SEO",
    author: "SEO Team",
  },
  {
    slug: "google-ads-ai-roi",
    title: "Maximizing ROI with AI-Driven Google Ads Management",
    excerpt: "Stop wasting budget on low-performing ads. Discover how AI bidding and predictive analytics can triple your conversion rate in Raipur.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    date: "May 14, 2026",
    category: "Google Ads",
    author: "Ads Expert",
  },
  {
    slug: "viral-social-media-ai-strategy",
    title: "The Secret to Viral Social Media: AI Content Strategy Exposed",
    excerpt: "Learn how to use AI to predict trends and generate viral-worthy Reels and Shorts for your Raipur-based brand.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    date: "May 15, 2026",
    category: "Social Media",
    author: "Social Team",
  },
  {
    slug: "whatsapp-automation-raipur-sales",
    title: "WhatsApp Business API: Automating Your Sales in Raipur",
    excerpt: "Transform your WhatsApp into a sales machine. Learn how AI chatbots can handle leads 24/7 for your Raipur business.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80",
    date: "May 16, 2026",
    category: "Automation",
    author: "Automation Team",
  },
  {
    slug: "nextjs-vs-wordpress-performance",
    title: "Next.js vs WordPress: Why Performance Wins in 2026",
    excerpt: "Why we choose Next.js for our premium clients. Comparing speed, security, and SEO benefits for businesses in Raipur.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    date: "May 17, 2026",
    category: "Web Development",
    author: "Web Team",
  },
  {
    slug: "ai-marketing-for-small-business",
    title: "How AI is Leveling the Playing Field for Small Businesses in Raipur",
    excerpt: "Discover why AI is no longer just for big corporations and how local businesses are winning.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    date: "May 10, 2026",
    category: "AI Marketing",
    author: "AIZONET Editorial",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
              The <span className="text-gradient">Intelligence</span> Hub
            </h1>
            <p className="text-xl text-white/60 text-center">
              Insights, strategies, and success stories from the forefront of AI marketing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <article key={post.slug} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all">
                <div className="aspect-video bg-primary/10 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/40 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" /> {post.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-bold text-white group-hover:text-primary">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
