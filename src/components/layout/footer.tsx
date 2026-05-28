import Link from "next/link";
import { Cpu, Mail, Phone, MapPin, Globe, MessageCircle, Camera, Send, Briefcase } from "lucide-react";

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Services", href: "/services" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI SEO Raipur", href: "/services/ai-seo-services" },
      { name: "AI Google Ads", href: "/services/ai-google-ads-management" },
      { name: "AI Social Media", href: "/services/ai-social-media-marketing" },
      { name: "WhatsApp Bots", href: "/services/ai-chatbot-development" },
      { name: "Premium Web Dev", href: "/services/premium-web-development" },
    ],
  },
  {
    title: "Locations",
    links: [
      { name: "Raipur", href: "/locations/raipur" },
      { name: "Bilaspur", href: "/locations/bilaspur" },
      { name: "Durg-Bhilai", href: "/locations/durg-bhilai" },
      { name: "Naya Raipur", href: "/locations/raipur" },
      { name: "Chhattisgarh", href: "/services" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Cpu className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                AIZONET
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              Empowering Raipur's businesses with AI-first marketing strategies. 
              The future of digital growth is here.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/40 hover:text-primary">
                <Camera className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-primary">
                <Send className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-white/40 hover:text-primary">
                <Briefcase className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} AIZONET Digital. All rights reserved. 
              Located in Raipur, Chhattisgarh.
            </p>
            <div className="flex items-center space-x-6 text-xs text-white/40">
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3" />
                <span>Raipur, Chhattisgarh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3" />
                <span>hello@aizonet.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
