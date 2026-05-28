"use client";

import { motion } from "framer-motion";
import { Search, MessageSquare, BarChart3, Zap, Globe, Target } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "AI Search Optimization",
    description: "Go beyond traditional SEO. We use AI to dominate search results and Google SGE.",
    icon: Search,
    href: "/services/ai-seo-services",
    color: "bg-blue-500",
  },
  {
    title: "AI Ad Management",
    description: "Automated bid management and creative testing for Google & Meta Ads.",
    icon: Target,
    href: "/services/ai-google-ads-management",
    color: "bg-purple-500",
  },
  {
    title: "AI Chatbots & CRM",
    description: "Intelligent customer service and lead nurturing on autopilot.",
    icon: MessageSquare,
    href: "/services/ai-chatbot-development",
    color: "bg-emerald-500",
  },
  {
    title: "Performance Marketing",
    description: "Data-driven strategies focused on one thing: Your bottom line ROI.",
    icon: BarChart3,
    href: "/services/performance-marketing",
    color: "bg-orange-500",
  },
  {
    title: "Local SEO Raipur",
    description: "Dominate the local market in Raipur with location-based AI targeting.",
    icon: Globe,
    href: "/services/local-seo-raipur",
    color: "bg-red-500",
  },
  {
    title: "Marketing Automation",
    description: "Zapier & Custom AI workflows to save you 20+ hours every week.",
    icon: Zap,
    href: "/services/ai-automation",
    color: "bg-yellow-500",
  },
];

export function ServicesGrid() {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Our <span className="text-gradient">AI-First</span> Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/60">
            Comprehensive marketing solutions designed for the era of intelligence. 
            Built to scale small businesses in Raipur and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={service.href}
                className="group relative block h-full rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/50 hover:bg-white/10"
              >
                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${service.color} bg-opacity-10 transition-transform group-hover:scale-110`}>
                  <service.icon className={`h-6 w-6 text-white`} />
                </div>
                <h3 className="mb-4 text-xl font-bold text-white group-hover:text-primary">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {service.description}
                </p>
                <div className="mt-8 flex items-center text-sm font-semibold text-primary opacity-0 transition-all group-hover:opacity-100">
                  Learn More
                  <Zap className="ml-2 h-4 w-4 fill-current" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
