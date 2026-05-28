"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  Loader2,
  Download,
  Wand2,
  Heading,
  AlignLeft,
  List,
  Code,
  MessageSquare,
  Search,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getUserCredits, deductUserCredit } from "@/lib/audit/seo-analyzer";

const contentTools = [
  {
    id: "blog",
    name: "Blog Post Generator",
    icon: FileText,
    description: "Generate full SEO-optimized blog posts",
    placeholder: "Enter topic (e.g., '10 AI SEO Tools for 2025')",
    color: "#3B82F6",
  },
  {
    id: "meta",
    name: "Meta Description",
    icon: Heading,
    description: "Write compelling meta descriptions",
    placeholder: "Enter page topic and keywords",
    color: "#8B5CF6",
  },
  {
    id: "title",
    name: "Title Optimizer",
    icon: Wand2,
    description: "Create click-worthy page titles",
    placeholder: "Enter your content topic",
    color: "#F59E0B",
  },
  {
    id: "faq",
    name: "FAQ Generator",
    icon: List,
    description: "Generate FAQ schema content",
    placeholder: "Enter your product/service",
    color: "#10B981",
  },
  {
    id: "schema",
    name: "Schema Markup",
    icon: Code,
    description: "Generate JSON-LD structured data",
    placeholder: "Enter business type and details",
    color: "#EC4899",
  },
  {
    id: "keywords",
    name: "Keyword Cluster",
    icon: Search,
    description: "Build topic clusters",
    placeholder: "Enter seed keyword",
    color: "#22D3EE",
  },
];

const systemPrompts: Record<string, string> = {
  blog: `You are an expert SEO content writer. Generate a complete, well-structured blog post that is:
- SEO-optimized with proper heading hierarchy (H1, H2, H3)
- Engaging and valuable to readers
- 1500-2000 words in length
- Includes an introduction, main sections, and conclusion
- Has a compelling meta description at the end

Format with markdown headings and bullet points where appropriate.`,
  meta: `You are an SEO meta description specialist. Create compelling, click-worthy meta descriptions that:
- Are 150-160 characters
- Include the main keyword naturally
- Have a clear call-to-action
- Stand out in search results

Provide 3 variations.`,
  title: `You are a headline writing expert. Create SEO-optimized, click-worthy page titles that:
- Are 50-60 characters
- Include the target keyword near the beginning
- Create curiosity or promise value
- Use power words when appropriate

Provide 5 variations numbered.`,
  faq: `You are an FAQ schema expert. Generate 8-10 relevant FAQ items with:
- Clear, specific questions users actually ask
- Concise, helpful answers (2-3 sentences)
- Natural keyword integration
- Schema-ready format

Format as Q: followed by A: for each item.`,
  schema: `You are a schema markup specialist. Generate valid JSON-LD structured data for:
- Include @context and @type
- All relevant properties for the business type
- Proper nesting for complex schemas

Output only the JSON code block.`,
  keywords: `You are a keyword research expert. Build a comprehensive topic cluster with:
- 1 pillar keyword (broad, high volume)
- 8-12 supporting cluster keywords
- Search intent classification for each
- Brief content angle suggestions

Format as a strategic content map.`,
};

export default function ContentPage() {
  const [selectedTool, setSelectedTool] = useState(contentTools[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    setCredits(getUserCredits());
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter a topic");
      return;
    }

    const currentCreds = getUserCredits();
    if (currentCreds <= 0) {
      toast.error("Insufficient credits! Please upgrade your plan.");
      return;
    }

    setIsGenerating(true);
    setOutput("");

    try {
      deductUserCredit();
      setCredits(getUserCredits());

      const response = await fetch("/api/ai/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedTool.id,
          topic: input,
          keywords: input,
          tone: "professional"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to generate content");
      }

      setOutput(json.content);
      toast.success("Content generated!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTool.id}-content.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Content AI</h1>
          <p className="text-white/50 text-sm mt-1">Generate SEO-optimized content with specialized AI tools.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
          <Zap className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
          <span>Research Credits: <strong className="text-white font-bold">{credits}</strong></span>
        </div>
      </div>

      {/* Insufficient Credits Banner */}
      {credits <= 0 && (
        <div className="glass-card rounded-2xl p-5 border border-red-500/20 bg-red-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20 flex-shrink-0">
              <Zap className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Research Credits Exhausted</h3>
              <p className="text-xs text-white/50">Your active monthly balance has reached 0 credits. Upgrade now to continue generating content.</p>
            </div>
          </div>
          <Link
            href="/settings?tab=billing"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Recharge Credits
          </Link>
        </div>
      )}

      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {contentTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool);
                setOutput("");
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedTool.id === tool.id
                  ? "border-primary bg-primary/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5 mb-2" style={{ color: tool.color }} />
              <div className="text-sm font-medium text-white">{tool.name}</div>
            </button>
          );
        })}
      </div>

      {/* Content Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="glass-card rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${selectedTool.color}20` }}
            >
              <selectedTool.icon className="w-5 h-5" style={{ color: selectedTool.color }} />
            </div>
            <div>
              <h3 className="font-semibold text-white">{selectedTool.name}</h3>
              <p className="text-sm text-white/50">{selectedTool.description}</p>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={selectedTool.placeholder}
            className="w-full h-48 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors resize-none mb-4"
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Content
              </>
            )}
          </button>
        </div>

        {/* Output */}
        <AnimatePresence mode="wait">
          {output ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-card rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Generated Content</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
              <div className="h-[300px] overflow-y-auto">
                <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                  {output}
                </pre>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl p-6 border border-white/5 flex items-center justify-center h-[400px]"
            >
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40">Your generated content will appear here</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
