"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-3xl p-12 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Request Received!</h3>
        <p className="text-white/60">
          Our AI strategy team will analyze your business and reach out within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/60">Full Name</label>
          <input
            required
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/60">Business Email</label>
          <input
            required
            type="email"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="john@company.com"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/60">Service Interested In</label>
        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors">
          <option value="seo">AI SEO Services</option>
          <option value="automation">AI Automation</option>
          <option value="ads">Ads Management</option>
          <option value="chatbot">AI Chatbot</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-white/60">Message / Business Goal</label>
        <textarea
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Tell us about your business goals in Raipur..."
        />
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full h-14 bg-primary rounded-xl text-white font-bold text-lg flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <>
            Get Free Consultation
            <Send className="ml-2 h-5 w-5" />
          </>
        )}
      </button>
    </form>
  );
}
