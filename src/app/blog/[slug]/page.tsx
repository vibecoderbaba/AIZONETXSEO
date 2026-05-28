import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/seo/metadata";
import { Calendar, User, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

// In a real app, this would come from a CMS like Sanity or Contentful
const postsData: Record<string, any> = {
  "ai-marketing-for-small-business": {
    title: "How AI is Leveling the Playing Field for Small Businesses in Raipur",
    description: "Discover why AI is no longer just for big corporations and how local businesses are winning.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    date: "May 10, 2026",
    author: "AIZONET Editorial",
    category: "AI Marketing",
    content: `
      <p>The digital marketing landscape in Raipur is undergoing a seismic shift. For years, only large enterprises with massive budgets could afford advanced data analytics and automation tools. But that has changed.</p>
      <h2>The Democracy of Intelligence</h2>
      <p>Today, AI tools like ChatGPT, Midjourney, and proprietary marketing algorithms have democratized access to high-level strategy and execution. A small boutique in Civil Lines can now compete with global fashion brands by using AI to hyper-personalize their customer outreach.</p>
      <h2>Why Raipur Businesses Should Care</h2>
      <p>Local businesses in Chhattisgarh often struggle with limited staff. AI acts as a force multiplier, allowing a one-person marketing team to perform like a department of ten. From generating social media content to automating customer inquiries on WhatsApp, the possibilities are endless.</p>
      <blockquote>"AI isn't going to replace marketers, but marketers who use AI will replace those who don't."</blockquote>
      <h2>Practical Steps to Start</h2>
      <ul>
        <li>Audit your repetitive tasks.</li>
        <li>Implement a basic AI chatbot for common queries.</li>
        <li>Use AI for SEO-driven content research.</li>
      </ul>
    `
  },
  "ai-seo-raipur-guide": {
    title: "AI SEO Raipur: How to Rank #1 for Competitive Local Keywords",
    description: "Master the art of AI-powered local SEO in Raipur. Learn how to use NLP and semantic search to dominate Chhattisgarh's digital market.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    date: "May 12, 2026",
    author: "SEO Team",
    category: "SEO",
    content: `
      <p>Local SEO in Raipur is more competitive than ever. With thousands of businesses vying for the top spot on Google Maps and search results, traditional keyword stuffing is dead. Enter AI SEO.</p>
      <h2>The Shift to Semantic Search</h2>
      <p>Google's algorithms now prioritize <em>intent</em> over exact matches. In Raipur, this means when someone searches for "best CA in Raipur," Google is looking for entities, proximity, and authority. AI helps us map these entities effectively.</p>
      <h2>Using NLP for Content Dominance</h2>
      <p>Natural Language Processing (NLP) tools allow us to write content that speaks both to humans and search bots. By analyzing the top-ranking pages for "Real Estate in Raipur," our AI identifies the exact sub-topics you need to cover to be seen as the ultimate local authority.</p>
      <h2>Voice Search Optimization</h2>
      <p>As more people in Chhattisgarh use voice assistants (Google Assistant, Alexa) in Hindi and English, long-tail conversational keywords are becoming vital. AI helps us predict these conversational patterns and integrate them into your technical SEO structure.</p>
      <h3>Key SEO Benefits:</h3>
      <ul>
        <li>Faster indexation of local landing pages.</li>
        <li>Higher click-through rates (CTR) with AI-optimized meta titles.</li>
        <li>Localized schema markup for Raipur neighborhoods like Shankar Nagar and Samta Colony.</li>
      </ul>
    `
  },
  "google-ads-ai-roi": {
    title: "Maximizing ROI with AI-Driven Google Ads Management",
    description: "Stop wasting budget on low-performing ads. Discover how AI bidding and predictive analytics can triple your conversion rate in Raipur.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    date: "May 14, 2026",
    author: "Ads Expert",
    category: "Google Ads",
    content: `
      <p>If you're running Google Ads in Raipur without AI optimization, you're likely leaving 40% of your budget on the table. High CPCs and low-quality scores are the enemies of local growth.</p>
      <h2>Predictive Bidding Strategies</h2>
      <p>Traditional manual bidding is reactive. AI-driven predictive bidding analyzes millions of data points—time of day, device type, user behavior in Raipur—to place the perfect bid in real-time. This ensures your ad appears when a customer is most likely to convert.</p>
      <h2>Dynamic Search Ads (DSA)</h2>
      <p>AI scans your website and automatically creates ads based on the user's search query. This is perfect for Raipur's e-commerce brands with large inventories. It saves time and ensures 100% relevance.</p>
      <blockquote>"Our clients in Raipur have seen an average decrease of 25% in Cost Per Acquisition (CPA) within the first 30 days of switching to AI-managed campaigns."</blockquote>
      <h2>A/B Testing at Scale</h2>
      <p>AI doesn't just test two versions of an ad; it can test hundreds. It identifies which headlines resonate with the Raipur audience and automatically prioritizes the winners, ensuring your budget is always spent on what works.</p>
    `
  },
  "viral-social-media-ai-strategy": {
    title: "The Secret to Viral Social Media: AI Content Strategy Exposed",
    description: "Learn how to use AI to predict trends and generate viral-worthy Reels and Shorts for your Raipur-based brand.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    date: "May 15, 2026",
    author: "Social Team",
    category: "Social Media",
    content: `
      <p>Social media algorithms are no longer a mystery. With AI-powered trend analysis, we can now predict what will go viral in Raipur before it even happens.</p>
      <h2>Trend Spotting in Chhattisgarh</h2>
      <p>AI tools scan millions of interactions to identify rising audio tracks, visual styles, and topics. For a restaurant in Telibandha, this means knowing exactly which type of food-reveal video will hit the Explore page this weekend.</p>
      <h2>AI-Enhanced Video Production</h2>
      <p>Creating high-quality Reels is time-consuming. AI video editors help us cut, subtitle, and color-grade videos in minutes. This allows Raipur brands to maintain a daily posting schedule without a massive production budget.</p>
      <h2>Sentiment Analysis &amp; Engagement</h2>
      <p>How do people feel about your brand? AI sentiment analysis scans comments and mentions to gauge the public mood in Raipur. This allows us to pivot your strategy instantly if a certain topic resonates particularly well.</p>
      <h3>3 Tips for Viral Growth:</h3>
      <ol>
        <li>Use AI to generate 50+ hook ideas for every video.</li>
        <li>Analyze competitor engagement patterns using machine learning.</li>
        <li>Automate your posting schedule for peak Raipur traffic times.</li>
      </ol>
    `
  },
  "whatsapp-automation-raipur-sales": {
    title: "WhatsApp Business API: Automating Your Sales in Raipur",
    description: "Transform your WhatsApp into a sales machine. Learn how AI chatbots can handle leads 24/7 for your Raipur business.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1200&q=80",
    date: "May 16, 2026",
    author: "Automation Team",
    category: "Automation",
    content: `
      <p>In Raipur, customers prefer WhatsApp over email. But managing hundreds of messages manually is impossible. The solution? AI-powered WhatsApp Business API.</p>
      <h2>The 24/7 Virtual Salesperson</h2>
      <p>Imagine a chatbot that answers pricing queries, books appointments, and provides product details at 2 AM. For a doctor's clinic or a car dealership in Raipur, this means zero missed opportunities and instant customer gratification.</p>
      <h2>Lead Qualification on Autopilot</h2>
      <p>Not every message is a hot lead. Our AI chatbots ask the right questions—location, budget, requirement—to qualify leads before they ever reach your human team. This ensures your sales staff in Raipur spends time only on high-value conversations.</p>
      <blockquote>"Automated WhatsApp workflows can increase lead-to-customer conversion rates by up to 300% for local service businesses."</blockquote>
      <h2>Personalized Broadcasting</h2>
      <p>Gone are the days of spammy broadcast lists. AI allows us to send personalized updates to your Raipur customers based on their previous interests, significantly increasing open rates and engagement.</p>
    `
  },
  "nextjs-vs-wordpress-performance": {
    title: "Next.js vs WordPress: Why Performance Wins in 2026",
    description: "Why we choose Next.js for our premium clients. Comparing speed, security, and SEO benefits for businesses in Raipur.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    date: "May 17, 2026",
    author: "Web Team",
    category: "Web Development",
    content: `
      <p>Most agencies in Raipur still build on WordPress. At AIZONET, we choose Next.js. Here's why the difference matters for your business growth.</p>
      <h2>The Need for Speed</h2>
      <p>Google's Core Web Vitals are a major ranking factor. Next.js sites are statically generated, meaning they load almost instantly. A faster site means lower bounce rates and higher rankings in Raipur's search results.</p>
      <h2>Superior SEO Control</h2>
      <p>While WordPress relies on plugins, Next.js gives us granular control over every SEO tag. This allows us to implement advanced schema and meta strategies that are simply impossible on legacy platforms.</p>
      <h2>Security &amp; Scalability</h2>
      <p>WordPress is the most targeted platform for hackers. Next.js, being a static-first framework, is inherently more secure. Whether you have 100 visitors or 100,000 from all over Chhattisgarh, your site will remain stable and fast.</p>
      <h3>Why It Matters for Raipur Brands:</h3>
      <ul>
        <li>Sub-second page loads even on mobile data.</li>
        <li>Premium, custom UI/UX that stands out from generic templates.</li>
        <li>Future-proof technology that won't need a rebuild in 2 years.</li>
      </ul>
    `
  }
};

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData[slug];
  if (!post) return constructMetadata();

  return constructMetadata({
    title: post.title,
    description: post.description,
  });
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = postsData[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blog" className="flex items-center text-sm font-semibold text-primary mb-8 hover:underline">
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Blog
          </Link>

          <article>
            {/* Header */}
            <header className="mb-12">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-white/50 flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" /> {post.date}
                </span>
                <span className="text-sm text-white/50 flex items-center">
                  <User className="h-4 w-4 mr-1.5" /> {post.author}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                {post.title}
              </h1>
              {/* Feature image — full opacity */}
              <div className="aspect-video bg-white/5 border border-white/10 rounded-[2.5rem] relative overflow-hidden mb-12">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </header>

            {/* Article body — explicit light text so it's visible on dark bg */}
            <div
              className="
                [&_p]:text-white/80 [&_p]:leading-8 [&_p]:mb-5 [&_p]:text-base
                [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5
                [&_li]:text-white/80 [&_li]:mb-2 [&_li]:leading-7
                [&_em]:text-accent [&_em]:not-italic
                [&_strong]:text-white
                [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-6
                [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:bg-white/5
                [&_blockquote]:rounded-r-xl [&_blockquote]:text-white/70 [&_blockquote]:italic
                [&_a]:text-primary [&_a]:underline
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Want to implement this in your business?</h3>
                <p className="text-white/60 mb-6">
                  Our team in Raipur specializes in helping local companies adopt AI strategies that actually work.
                </p>
                <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-bold text-white hover:bg-primary/90 transition-all">
                  Book a Strategy Call
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
