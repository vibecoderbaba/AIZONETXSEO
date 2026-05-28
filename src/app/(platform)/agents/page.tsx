"use client";

import { useState, useRef, useEffect } from "react";
import { AGENTS, assignTask, streamTask, type AgentTask, type AIAgent } from "@/lib/ai/agents";
import {
  Bot,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  AlertCircle,
  Sparkles,
  Search,
  FileText,
  Target,
  Users,
  ChevronRight,
  Play,
  History,
  MessageSquare,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

const iconMap: Record<string, React.ElementType> = {
  Search,
  FileText,
  Target,
  Sparkles,
  Users,
};

interface ChatMessage {
  role: "user" | "agent";
  content: string;
  timestamp: string;
}

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingContent, setStreamingContent] = useState("");
  const [activeTasks, setActiveTasks] = useState<AgentTask[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // SEO Agent Form States
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [country, setCountry] = useState("");
  const [keywords, setKeywords] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [cms, setCms] = useState("Next.js");
  const [businessType, setBusinessType] = useState("SaaS");

  // Brand Agent Form States
  const [brandName, setBrandName] = useState("");
  const [brandUrl, setBrandUrl] = useState("");
  const [brandIndustry, setBrandIndustry] = useState("");
  const [brandAudience, setBrandAudience] = useState("");
  const [brandCompetitors, setBrandCompetitors] = useState("");
  const [brandReviews, setBrandReviews] = useState("");
  const [brandSocials, setBrandSocials] = useState("");
  const [brandMarket, setBrandMarket] = useState("");
  const [brandGuidelinesInput, setBrandGuidelinesInput] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, streamingContent]);

  const handleSend = async () => {
    if (!input.trim() || !selectedAgent || isProcessing) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    setStreamingContent("");

    try {
      // Stream the response
      let fullResponse = "";
      for await (const chunk of streamTask(selectedAgent.id, userMessage.content)) {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      }

      const agentMessage: ChatMessage = {
        role: "agent",
        content: fullResponse,
        timestamp: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev, agentMessage]);
      setStreamingContent("");

      // Track the task
      const task: AgentTask = {
        id: `task_${Date.now()}`,
        agentId: selectedAgent.id,
        type: "analysis",
        status: "completed",
        input: userMessage.content,
        output: fullResponse,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      setActiveTasks((prev) => [task, ...prev].slice(0, 10));
    } catch (error) {
      toast.error("Failed to get response from agent");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim() || !selectedAgent || isProcessing) return;

    const formattedPrompt = `Website URL: ${websiteUrl}

Optional Inputs:
- Target Country: ${country || "Raipur, India / Global"}
- Target Keywords: ${keywords || "AI digital marketing, SEO, AI automation"}
- Competitors: ${competitors || "competitoragency.com, marketleader.com"}
- CMS Type: ${cms}
- Business Type: ${businessType}

Please perform a complete, deep technical SEO audit and analysis for this website following all core tasks and response formatting rules.`;

    const userMessage: ChatMessage = {
      role: "user",
      content: `Please perform a complete SEO audit for ${websiteUrl} with target country "${country || 'Raipur, India'}", target keywords "${keywords || 'AI marketing'}", competitors "${competitors || 'None'}", CMS "${cms}", and Business Type "${businessType}".`,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setStreamingContent("");

    try {
      let fullResponse = "";
      for await (const chunk of streamTask(selectedAgent.id, formattedPrompt)) {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      }

      const agentMessage: ChatMessage = {
        role: "agent",
        content: fullResponse,
        timestamp: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev, agentMessage]);
      setStreamingContent("");

      const task: AgentTask = {
        id: `task_${Date.now()}`,
        agentId: selectedAgent.id,
        type: "analysis",
        status: "completed",
        input: formattedPrompt,
        output: fullResponse,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      setActiveTasks((prev) => [task, ...prev].slice(0, 10));
    } catch (error) {
      toast.error("Failed to run SEO audit");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunBrandAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !selectedAgent || isProcessing) return;

    const formattedPrompt = `Brand Name: ${brandName}

Optional Inputs:
- Website URL: ${brandUrl || "https://aizonet.ai"}
- Industry: ${brandIndustry || "AI Automation & Digital Marketing"}
- Competitors: ${brandCompetitors || "competitoragency.com, marketleader.com"}
- Target Audience: ${brandAudience || "Small Businesses & Enterprise Marketing Teams"}
- Review Sources: ${brandReviews || "Google Reviews, Trustpilot"}
- Social Media Sources: ${brandSocials || "LinkedIn, Twitter / X"}
- Geographic Market: ${brandMarket || "Raipur, India / Global"}
- Existing Brand Guidelines: ${brandGuidelinesInput || "Expert but approachable, data-driven, ROI-focused"}

Please perform a complete, deep brand intelligence audit and analysis for this brand following all core tasks and response formatting rules.`;

    const userMessage: ChatMessage = {
      role: "user",
      content: `Please perform a complete Brand Intelligence audit for "${brandName}" (${brandUrl || 'No Website URL'}), Industry: "${brandIndustry || 'AI & Digital Marketing'}", Target Market: "${brandMarket || 'Global'}".`,
      timestamp: new Date().toISOString(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    setStreamingContent("");

    try {
      let fullResponse = "";
      for await (const chunk of streamTask(selectedAgent.id, formattedPrompt)) {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      }

      const agentMessage: ChatMessage = {
        role: "agent",
        content: fullResponse,
        timestamp: new Date().toISOString(),
      };

      setChatHistory((prev) => [...prev, agentMessage]);
      setStreamingContent("");

      const task: AgentTask = {
        id: `task_${Date.now()}`,
        agentId: selectedAgent.id,
        type: "analysis",
        status: "completed",
        input: formattedPrompt,
        output: fullResponse,
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      };
      setActiveTasks((prev) => [task, ...prev].slice(0, 10));
    } catch (error) {
      toast.error("Failed to run brand intelligence audit");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">AI Agents</h1>
        <p className="text-white/50 text-sm mt-1">5 specialized AI experts working for your SEO success.</p>
      </div>

      {!selectedAgent ? (
        // Agent Selection Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AGENTS.map((agent, i) => {
            const Icon = iconMap[agent.icon] || Bot;
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedAgent(agent)}
                className="glass-card rounded-2xl p-6 border border-white/5 cursor-pointer hover:border-white/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${agent.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: agent.color }} />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </div>
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{agent.name}</h3>
                <p className="text-sm text-white/50 mb-4">{agent.description}</p>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="px-2 py-1 rounded-full bg-white/5 text-white/40 text-xs">
                      {cap}
                    </span>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <span className="px-2 py-1 rounded-full bg-white/5 text-white/40 text-xs">
                      +{agent.capabilities.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Agent Chat Interface
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]"
        >
          {/* Chat Area */}
          <div className="lg:col-span-3 glass-card rounded-2xl border border-white/5 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${selectedAgent.color}20` }}
                >
                  {(() => {
                    const Icon = iconMap[selectedAgent.icon] || Bot;
                    return <Icon className="w-5 h-5" style={{ color: selectedAgent.color }} />;
                  })()}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{selectedAgent.name}</h3>
                  <p className="text-xs text-white/40">{selectedAgent.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 ? (
                selectedAgent.id === "seo" ? (
                  <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="text-center space-y-2">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                          style={{ background: `${selectedAgent.color}15`, border: `1px solid ${selectedAgent.color}30` }}
                        >
                          <Search className="w-7 h-7" style={{ color: selectedAgent.color }} />
                        </div>
                        <h4 className="font-bold text-white text-xl">Advanced AI SEO Specialist & Auditor</h4>
                        <p className="text-sm text-white/60 max-w-md mx-auto">
                          Perform a deep-crawl simulation, analyze technical health, on-page structures, indexability, generate valid JSON-LD schemas, and compare against competitors.
                        </p>
                      </div>

                      <form onSubmit={handleRunAudit} className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Website URL <span className="text-red-500">*</span></label>
                          <input
                            type="url"
                            required
                            placeholder="e.g., https://yourwebsite.com"
                            value={websiteUrl}
                            onChange={(e) => setWebsiteUrl(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none transition-colors text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Target Country</label>
                            <input
                              type="text"
                              placeholder="e.g., United States"
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Business Type</label>
                            <select
                              value={businessType}
                              onChange={(e) => setBusinessType(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors text-sm [&>option]:bg-[#121214] [&>option]:text-white"
                            >
                              <option value="SaaS">SaaS / Web App</option>
                              <option value="E-commerce">E-commerce</option>
                              <option value="Local Business">Local Business</option>
                              <option value="Blog / Publisher">Blog / Publisher</option>
                              <option value="Digital Agency">Digital Agency</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Target Keywords</label>
                          <input
                            type="text"
                            placeholder="e.g., best cloud hosting, fast cloud vps"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none transition-colors text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Competitors</label>
                            <input
                              type="text"
                              placeholder="e.g., competitor1.com, competitor2.com"
                              value={competitors}
                              onChange={(e) => setCompetitors(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">CMS Type</label>
                            <select
                              value={cms}
                              onChange={(e) => setCms(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors text-sm [&>option]:bg-[#121214] [&>option]:text-white"
                            >
                              <option value="Next.js">Next.js / React</option>
                              <option value="WordPress">WordPress</option>
                              <option value="Shopify">Shopify</option>
                              <option value="Webflow">Webflow</option>
                              <option value="Custom HTML">Custom / Other</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing || !websiteUrl.trim()}
                          className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold bg-primary hover:bg-primary/95 text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-primary/20 cursor-pointer"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Running Complete AI SEO Audit...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              Run Deep AI SEO Audit & Generate Report
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : selectedAgent.id === "brand" ? (
                  <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="text-center space-y-2">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                          style={{ background: `${selectedAgent.color}15`, border: `1px solid ${selectedAgent.color}30` }}
                        >
                          <Sparkles className="w-7 h-7" style={{ color: selectedAgent.color }} />
                        </div>
                        <h4 className="font-bold text-white text-xl">Advanced AI Brand Intelligence Strategist</h4>
                        <p className="text-sm text-white/60 max-w-md mx-auto">
                          Audit E-E-A-T signals, track sentiment, monitor reputation, analyze reviews, and build actionable brand positioning roadmaps.
                        </p>
                      </div>

                      <form onSubmit={handleRunBrandAudit} className="glass-card border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Brand Name <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., AIZONET"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Website URL</label>
                            <input
                              type="url"
                              placeholder="e.g., https://yourbrand.com"
                              value={brandUrl}
                              onChange={(e) => setBrandUrl(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Industry</label>
                            <input
                              type="text"
                              placeholder="e.g., AI Automation & SaaS"
                              value={brandIndustry}
                              onChange={(e) => setBrandIndustry(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Target Audience</label>
                            <input
                              type="text"
                              placeholder="e.g., Marketing Teams, Small Businesses"
                              value={brandAudience}
                              onChange={(e) => setBrandAudience(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Competitors</label>
                            <input
                              type="text"
                              placeholder="e.g., competitor1.com, competitor2.com"
                              value={brandCompetitors}
                              onChange={(e) => setBrandCompetitors(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Review Sources</label>
                            <input
                              type="text"
                              placeholder="e.g., Google Reviews, Trustpilot"
                              value={brandReviews}
                              onChange={(e) => setBrandReviews(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Social Channels</label>
                            <input
                              type="text"
                              placeholder="e.g., LinkedIn, Twitter/X"
                              value={brandSocials}
                              onChange={(e) => setBrandSocials(e.target.value)}
                              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Geographic Market</label>
                          <input
                            type="text"
                            placeholder="e.g., United States, India, Global"
                            value={brandMarket}
                            onChange={(e) => setBrandMarket(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/70 block uppercase tracking-wider">Existing Brand Guidelines</label>
                          <textarea
                            placeholder="e.g., Expert but friendly, professional tone, data-driven..."
                            value={brandGuidelinesInput}
                            onChange={(e) => setBrandGuidelinesInput(e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/35 focus:border-emerald-500/50 focus:outline-none transition-colors text-sm resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isProcessing || !brandName.trim()}
                          className="w-full mt-2 py-3.5 px-4 rounded-xl font-semibold bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-emerald-500/20 cursor-pointer"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Running Complete AI Brand Audit...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              Run Deep AI Brand Audit & Generate Report
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${selectedAgent.color}15` }}
                    >
                      {(() => {
                        const Icon = iconMap[selectedAgent.icon] || Bot;
                        return <Icon className="w-8 h-8" style={{ color: selectedAgent.color }} />;
                      })()}
                    </div>
                    <h4 className="font-semibold text-white mb-2">Start a conversation</h4>
                    <p className="text-sm text-white/50 max-w-md mb-6">
                      Ask me anything about {selectedAgent.name.toLowerCase().replace(" agent", "")}. I&apos;m here to help!
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedAgent.capabilities.slice(0, 4).map((cap) => (
                        <button
                          key={cap}
                          onClick={() => handleQuickAction(cap)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
                        >
                          {cap}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <>
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          msg.role === "user" ? "bg-primary/20" : "bg-white/10"
                        }`}
                      >
                        {msg.role === "user" ? (
                          <Users className="w-4 h-4 text-primary" />
                        ) : (
                          (() => {
                            const Icon = iconMap[selectedAgent.icon] || Bot;
                            return <Icon className="w-4 h-4" style={{ color: selectedAgent.color }} />;
                          })()
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-primary text-white rounded-tr-sm"
                            : "bg-white/5 text-white/85 rounded-tl-sm border border-white/10"
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {renderMessageContent(msg.content)}
                        </div>
                        <div
                          className={`text-xs mt-3 border-t border-white/5 pt-2 ${
                            msg.role === "user" ? "text-white/60" : "text-white/30"
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
                  {streamingContent && (
                    <div className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center"
                      >
                        {(() => {
                          const Icon = iconMap[selectedAgent.icon] || Bot;
                          return <Icon className="w-4 h-4" style={{ color: selectedAgent.color }} />;
                        })()}
                      </div>
                      <div className="max-w-[80%] p-4 rounded-2xl bg-white/5 text-white/85 rounded-tl-sm border border-white/10">
                        <div className="text-sm leading-relaxed">
                          {renderMessageContent(streamingContent)}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`Ask ${selectedAgent.name}...`}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                  disabled={isProcessing}
                />
                <button
                  onClick={handleSend}
                  disabled={isProcessing || !input.trim()}
                  className="px-4 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Capabilities */}
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Capabilities
              </h4>
              <div className="space-y-2">
                {selectedAgent.capabilities.map((cap) => (
                  <button
                    key={cap}
                    onClick={() => handleQuickAction(cap)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white/5 text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="glass-card rounded-2xl p-4 border border-white/5">
              <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                <History className="w-4 h-4 text-primary" />
                Recent Tasks
              </h4>
              {activeTasks.filter((t) => t.agentId === selectedAgent.id).length === 0 ? (
                <p className="text-sm text-white/40">No tasks yet</p>
              ) : (
                <div className="space-y-2">
                  {activeTasks
                    .filter((t) => t.agentId === selectedAgent.id)
                    .slice(0, 5)
                    .map((task) => (
                      <div key={task.id} className="p-3 rounded-lg bg-white/5">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs text-white/60 truncate">{task.input}</span>
                        </div>
                        <div className="text-[10px] text-white/30">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// Rich Markdown & SEO Report UI Helpers
// ==========================================

function renderMessageContent(content: string) {
  if (content.includes("Brand Intelligence Score Overview")) {
    return <BrandReportDashboard content={content} />;
  }
  if (content.includes("## 1. Executive Summary") || content.includes("SEO Score Overview")) {
    return <SEOReportDashboard content={content} />;
  }
  return renderSimpleMarkdown(content);
}

function renderSimpleMarkdown(text: any) {
  if (!text || typeof text !== "string") return null;
  const lines = text.split("\n");
  return (
    <div className="space-y-2 text-sm leading-relaxed text-white/85">
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith("### ")) {
          return <h4 key={i} className="text-sm font-bold text-white mt-4 mb-2 flex items-center gap-2">{parseInlineMarkdown(line.slice(4), `h4_${i}`)}</h4>;
        }
        if (line.startsWith("## ")) {
          return <h3 key={i} className="text-base font-bold text-white mt-5 mb-2 border-b border-white/10 pb-1 flex items-center gap-2">{parseInlineMarkdown(line.slice(3), `h3_${i}`)}</h3>;
        }
        if (line.startsWith("# ")) {
          return <h2 key={i} className="text-lg font-extrabold text-white mt-6 mb-3 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{parseInlineMarkdown(line.slice(2), `h2_${i}`)}</h2>;
        }

        // Bullet lists
        if (line.startsWith("* ") || line.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1.5 my-1">
              <span className="text-primary mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-white/80">{parseInlineMarkdown(line.slice(2), `li_${i}`)}</span>
            </div>
          );
        }

        // Horizontal Rule
        if (line.trim() === "---") {
          return <hr key={i} className="border-white/10 my-4" />;
        }

        // Standard line
        return <p key={i} className="min-h-[1rem] whitespace-pre-wrap">{parseInlineMarkdown(line, `p_${i}`)}</p>;
      })}
    </div>
  );
}

function parseInlineMarkdown(text: string, parentKey: string | number): React.ReactNode {
  interface MarkdownToken {
    type: "bold" | "code" | "link";
    text: string;
    url?: string;
    index: number;
    length: number;
  }
  
  const tokens: MarkdownToken[] = [];
  
  // Find bold **text**
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  while ((match = boldRegex.exec(text)) !== null) {
    tokens.push({
      type: "bold",
      text: match[1],
      index: match.index,
      length: match[0].length
    });
  }
  
  // Find code `code`
  const codeRegex = /`([^`]+)`/g;
  while ((match = codeRegex.exec(text)) !== null) {
    tokens.push({
      type: "code",
      text: match[1],
      index: match.index,
      length: match[0].length
    });
  }
  
  // Find links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = linkRegex.exec(text)) !== null) {
    tokens.push({
      type: "link",
      text: match[1],
      url: match[2],
      index: match.index,
      length: match[0].length
    });
  }
  
  // Sort tokens by index
  tokens.sort((a, b) => a.index - b.index);
  
  // Filter out overlapping tokens
  const nonOverlapping: MarkdownToken[] = [];
  let lastEnd = 0;
  for (const token of tokens) {
    if (token.index >= lastEnd) {
      nonOverlapping.push(token);
      lastEnd = token.index + token.length;
    }
  }
  
  // Build the flat children array
  const children: React.ReactNode[] = [];
  let currentIndex = 0;
  let keyCounter = 0;
  
  for (const token of nonOverlapping) {
    // Add text before the token
    if (token.index > currentIndex) {
      children.push(
        <span key={`${parentKey}_t_${keyCounter++}`}>
          {text.slice(currentIndex, token.index)}
        </span>
      );
    }
    
    // Add the token element
    if (token.type === "bold") {
      children.push(
        <strong key={`${parentKey}_b_${keyCounter++}`} className="font-semibold text-white">
          {token.text}
        </strong>
      );
    } else if (token.type === "code") {
      children.push(
        <code key={`${parentKey}_c_${keyCounter++}`} className="px-1.5 py-0.5 rounded bg-white/10 text-primary font-mono text-xs">
          {token.text}
        </code>
      );
    } else if (token.type === "link") {
      children.push(
        <a
          key={`${parentKey}_l_${keyCounter++}`}
          href={token.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline hover:text-primary/80 transition-colors font-medium"
        >
          {token.text}
        </a>
      );
    }
    
    currentIndex = token.index + token.length;
  }
  
  // Add remaining text
  if (currentIndex < text.length) {
    children.push(
      <span key={`${parentKey}_t_${keyCounter++}`}>
        {text.slice(currentIndex)}
      </span>
    );
  }
  
  return (
    <>
      {children.length > 0 ? children : <span key={`${parentKey}_plain`}>{text}</span>}
    </>
  );
}

interface SEOReportDashboardProps {
  content: string;
}

function SEOReportDashboard({ content }: SEOReportDashboardProps) {
  // Parse sections
  const sections: Record<string, string> = {};
  
  const sectionKeys = [
    "Executive Summary",
    "SEO Score Overview",
    "Critical Issues",
    "Technical SEO Findings",
    "Indexability Findings",
    "Schema Recommendations",
    "Site Structure Analysis",
    "On-Page SEO Analysis",
    "Competitor Insights",
    "AI Recommendations",
    "Quick Wins",
    "Full Action Plan",
    "Generated Schema Code",
    "Final SEO Verdict"
  ];

  let currentKey = "Title";
  let currentContent: string[] = [];

  const lines = content.split("\n");
  for (const line of lines) {
    let found = false;
    for (const key of sectionKeys) {
      if (line.includes(`## `) && line.includes(key)) {
        sections[currentKey] = currentContent.join("\n").trim();
        currentKey = key;
        currentContent = [];
        found = true;
        break;
      }
    }
    if (!found) {
      currentContent.push(line);
    }
  }
  sections[currentKey] = currentContent.join("\n").trim();

  // Extract table rows from SEO Score Overview
  const scoreOverviewText = sections["SEO Score Overview"] || "";
  const scores: { category: string; score: string; status: string; target: string }[] = [];
  const tableRows = scoreOverviewText.split("\n").filter(l => l.includes("|") && !l.includes("---") && !l.includes("Category"));
  for (const row of tableRows) {
    const parts = row.split("|").map(s => s.trim()).filter(Boolean);
    if (parts.length >= 4) {
      scores.push({
        category: parts[0].replace(/\*\*/g, ""),
        score: parts[1].replace(/\*\*/g, ""),
        status: parts[2],
        target: parts[3]
      });
    }
  }

  // Extract critical issues
  const criticalIssuesText = sections["Critical Issues"] || "";
  const criticalIssuesList: { title: string; impact: string; recommendation: string }[] = [];
  
  const issuesSplit = criticalIssuesText.split(/\*\s+\*\*🔴/);
  for (const issue of issuesSplit) {
    if (!issue.trim()) continue;
    const titleMatch = issue.match(/CRITICAL:\s*([^\n\r*]+)/i);
    const impactMatch = issue.match(/Impact:\*\*\s*([^\n\r]+)/i);
    const recMatch = issue.match(/Recommendation:\*\*\s*([^\n\r]+)/i);
    
    if (titleMatch) {
      criticalIssuesList.push({
        title: titleMatch[1].trim(),
        impact: impactMatch ? impactMatch[1].trim() : "",
        recommendation: recMatch ? recMatch[1].trim() : ""
      });
    }
  }

  // Extract code block from Generated Schema Code
  const schemaCodeText = sections["Generated Schema Code"] || "";
  const codeBlockMatch = schemaCodeText.match(/```json\s*([\s\S]*?)\s*```/);
  const schemaJSON = codeBlockMatch ? codeBlockMatch[1].trim() : "";
  const schemaInstructions = schemaCodeText.replace(/```json[\s\S]*?```/, "").trim();

  const handleCopySchema = () => {
    navigator.clipboard.writeText(schemaJSON);
    toast.success("JSON-LD Schema copied to clipboard!");
  };

  return (
    <div className="space-y-6 text-white/90">
      {/* Title */}
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AI Complete Technical SEO Audit
        </h2>
        <p className="text-white/40 text-[10px] mt-1">Generated by Senior AI Technical Specialist</p>
      </div>

      {/* Executive Summary */}
      {sections["Executive Summary"] && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-blue-500 block" />
            1. Executive Summary
          </h3>
          <div className="text-white/80 text-xs leading-relaxed">
            {renderSimpleMarkdown(sections["Executive Summary"])}
          </div>
        </div>
      )}

      {/* SEO Score Overview & Critical Issues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* SEO Scores */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-indigo-500 block" />
              2. SEO Score Overview
            </h3>
            
            <div className="space-y-2.5">
              {scores.map((s, idx) => {
                const numericScore = parseInt(s.score.split("/")[0]) || 50;
                let barColor = "bg-red-500";
                if (numericScore >= 80) barColor = "bg-green-500";
                else if (numericScore >= 60) barColor = "bg-yellow-500";

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-white/60">{s.category}</span>
                      <span className="text-white font-bold">{s.score}</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full ${barColor}`} style={{ width: `${numericScore}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">Overall SEO Score</span>
            <span className="text-xl font-extrabold text-blue-400">72 / 100</span>
          </div>
        </div>

        {/* Critical Issues */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-red-500 block" />
            3. Critical Issues
          </h3>

          <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
            {criticalIssuesList.map((issue, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-red-400 font-bold text-[10px] uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Critical Omission
                </div>
                <h4 className="text-white font-semibold text-xs">{issue.title}</h4>
                <div className="text-[10px] text-white/70 leading-relaxed space-y-0.5">
                  <p><strong>Impact:</strong> {issue.impact}</p>
                  <p><strong>Fix:</strong> {issue.recommendation}</p>
                </div>
              </div>
            ))}
            
            {criticalIssuesList.length === 0 && (
              <div className="text-white/70 text-xs whitespace-pre-wrap">
                {renderSimpleMarkdown(sections["Critical Issues"])}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Audit Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Technical SEO Findings */}
        {sections["Technical SEO Findings"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-blue-400 block" />
              4. Technical SEO
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Technical SEO Findings"])}
            </div>
          </div>
        )}

        {/* Indexability Findings */}
        {sections["Indexability Findings"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-purple-400 block" />
              5. Indexability & Crawling
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Indexability Findings"])}
            </div>
          </div>
        )}
      </div>

      {/* Site Structure & Schema Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Schema Recommendations */}
        {sections["Schema Recommendations"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-indigo-400 block" />
              6. Schema Markup Needs
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Schema Recommendations"])}
            </div>
          </div>
        )}

        {/* Site Structure Analysis */}
        {sections["Site Structure Analysis"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-amber-400 block" />
              7. Site Structure
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Site Structure Analysis"])}
            </div>
          </div>
        )}
      </div>

      {/* On-Page & Competitor Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* On-Page SEO Analysis */}
        {sections["On-Page SEO Analysis"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-green-400 block" />
              8. On-Page Optimization
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["On-Page SEO Analysis"])}
            </div>
          </div>
        )}

        {/* Competitor Insights */}
        {sections["Competitor Insights"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-rose-400 block" />
              9. Competitor Gap Analysis
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Competitor Insights"])}
            </div>
          </div>
        )}
      </div>

      {/* AI Recommendations & Quick Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* AI Recommendations */}
        {sections["AI Recommendations"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-cyan-400 block" />
              10. AI-Prioritized Recommendations
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["AI Recommendations"])}
            </div>
          </div>
        )}

        {/* Quick Wins */}
        {sections["Quick Wins"] && (
          <div className="glass-card rounded-2xl p-5 border border-amber-500/20 bg-amber-500/[0.02]">
            <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-amber-500 block" />
              11. Quick Wins (Immediate Value)
            </h3>
            <div className="text-white/85 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Quick Wins"])}
            </div>
          </div>
        )}
      </div>

      {/* Full Action Plan Timeline */}
      {sections["Full Action Plan"] && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-primary block" />
            12. Full Action Plan & Roadmap
          </h3>
          <div className="text-white/80 text-xs leading-relaxed">
            {renderSimpleMarkdown(sections["Full Action Plan"])}
          </div>
        </div>
      )}

      {/* Generated Schema Code Section */}
      {schemaJSON && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-green-500 block" />
              13. Generated JSON-LD Schema
            </h3>
            <button
              onClick={handleCopySchema}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] font-semibold flex items-center gap-1 border border-white/10 active:scale-95 transition-all cursor-pointer"
            >
              Copy JSON-LD
            </button>
          </div>
          
          <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/5 max-h-[220px] overflow-y-auto">
            <pre className="p-3 text-[10px] font-mono text-green-400 select-all overflow-x-auto whitespace-pre">
              {schemaJSON}
            </pre>
          </div>

          {schemaInstructions && (
            <div className="text-white/70 text-[10px] leading-relaxed mt-1.5 pt-1.5 border-t border-white/5">
              {renderSimpleMarkdown(schemaInstructions)}
            </div>
          )}
        </div>
      )}

      {/* Final SEO Verdict */}
      {sections["Final SEO Verdict"] && (
        <div className="glass-card rounded-2xl p-5 border border-blue-500/20 bg-blue-500/5">
          <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-blue-400 block" />
            14. Final SEO Verdict
          </h3>
          <div className="text-white/90 text-xs leading-relaxed italic">
            {renderSimpleMarkdown(sections["Final SEO Verdict"])}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// Brand Intelligence Report UI Dashboard
// ==========================================

interface BrandReportDashboardProps {
  content: string;
}

function BrandReportDashboard({ content }: BrandReportDashboardProps) {
  const sections: Record<string, string> = {};
  
  const sectionKeys = [
    "Executive Summary",
    "Brand Intelligence Score Overview",
    "E-E-A-T Analysis",
    "Brand Sentiment Findings",
    "Reputation Monitoring Results",
    "Review Intelligence Analysis",
    "Brand Positioning Analysis",
    "Competitor Brand Comparison",
    "Trust & Authority Insights",
    "Reputation Risks",
    "AI Recommendations",
    "Quick Wins",
    "Brand Growth Roadmap",
    "Final Brand Verdict"
  ];

  let currentKey = "Title";
  let currentContent: string[] = [];

  const lines = content.split("\n");
  for (const line of lines) {
    let found = false;
    for (const key of sectionKeys) {
      if (line.includes(`## `) && line.includes(key)) {
        sections[currentKey] = currentContent.join("\n").trim();
        currentKey = key;
        currentContent = [];
        found = true;
        break;
      }
    }
    if (!found) {
      currentContent.push(line);
    }
  }
  sections[currentKey] = currentContent.join("\n").trim();

  // Extract scores
  const scoreOverviewText = sections["Brand Intelligence Score Overview"] || "";
  const scores: { category: string; score: string; status: string; target: string }[] = [];
  const tableRows = scoreOverviewText.split("\n").filter(l => l.includes("|") && !l.includes("---") && !l.includes("Metric"));
  for (const row of tableRows) {
    const parts = row.split("|").map(s => s.trim()).filter(Boolean);
    if (parts.length >= 4) {
      scores.push({
        category: parts[0].replace(/\*\*/g, ""),
        score: parts[1].replace(/\*\*/g, ""),
        status: parts[2],
        target: parts[3]
      });
    }
  }

  // Extract overall score
  let overallScore = "66 / 100";
  const overallMatch = scoreOverviewText.match(/(?:Overall Brand Intelligence Score|Overall Brand Score):\s*\*\*([^\*]+)\*\*/i);
  if (overallMatch) {
    overallScore = overallMatch[1].trim();
  }

  // Extract reputation risks
  const risksText = sections["Reputation Risks"] || "";
  const riskList: { title: string; impact: string; action: string; level: "CRITICAL" | "MEDIUM" | "LOW" }[] = [];
  
  const riskSplit = risksText.split(/\*\s+\*\*(?:🔴|🟡|🟢)\s*/);
  for (const risk of riskSplit) {
    if (!risk.trim()) continue;
    
    let level: "CRITICAL" | "MEDIUM" | "LOW" = "LOW";
    if (risk.includes("CRITICAL")) level = "CRITICAL";
    else if (risk.includes("MEDIUM")) level = "MEDIUM";

    const titleMatch = risk.match(/(?:CRITICAL RISK|MEDIUM RISK|LOW RISK):\s*([^\n\r*]+)/i);
    const impactMatch = risk.match(/Impact:\*\*\s*([^\n\r]+)/i);
    const actionMatch = risk.match(/(?:Action|Recommendation):\*\*\s*([^\n\r]+)/i);
    
    if (titleMatch) {
      riskList.push({
        title: titleMatch[1].trim(),
        impact: impactMatch ? impactMatch[1].trim() : "",
        action: actionMatch ? actionMatch[1].trim() : "",
        level
      });
    }
  }

  return (
    <div className="space-y-6 text-white/90">
      {/* Title */}
      <div className="border-b border-white/10 pb-4 mb-6">
        <h2 className="text-xl font-extrabold text-white tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          AI Complete Brand Intelligence & Reputation Analysis
        </h2>
        <p className="text-white/40 text-[10px] mt-1">Generated by Senior Brand Strategist & Reputation Analyst</p>
      </div>

      {/* Executive Summary */}
      {sections["Executive Summary"] && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-emerald-500 block" />
            1. Executive Summary
          </h3>
          <div className="text-white/80 text-xs leading-relaxed">
            {renderSimpleMarkdown(sections["Executive Summary"])}
          </div>
        </div>
      )}

      {/* Brand Scores & Reputation Risks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Brand Scores */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-teal-500 block" />
              2. Brand Score Overview
            </h3>
            
            <div className="space-y-2.5">
              {scores.map((s, idx) => {
                const numericScore = parseInt(s.score.split("/")[0]) || 50;
                let barColor = "bg-red-500";
                if (numericScore >= 80) barColor = "bg-emerald-500";
                else if (numericScore >= 60) barColor = "bg-amber-500";

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-white/60">{s.category}</span>
                      <span className="text-white font-bold">{s.score}</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full ${barColor}`} style={{ width: `${numericScore}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/50">Overall Brand Intelligence Score</span>
            <span className="text-xl font-extrabold text-emerald-400">{overallScore}</span>
          </div>
        </div>

        {/* Reputation Risks */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-red-500 block" />
            10. Reputation Risks
          </h3>

          <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
            {riskList.map((risk, idx) => {
              const cardBorder = risk.level === "CRITICAL" ? "border-red-500/20 bg-red-500/5 text-red-400" : "border-amber-500/20 bg-amber-500/5 text-amber-400";
              const dotColor = risk.level === "CRITICAL" ? "bg-red-500" : "bg-amber-500";

              return (
                <div key={idx} className={`p-3 rounded-xl border ${cardBorder} space-y-1.5`}>
                  <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wide">
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
                    {risk.level} Reputation Risk
                  </div>
                  <h4 className="text-white font-semibold text-xs">{risk.title}</h4>
                  <div className="text-[10px] text-white/70 leading-relaxed space-y-0.5">
                    <p><strong>Impact:</strong> {risk.impact}</p>
                    <p><strong>Action Required:</strong> {risk.action}</p>
                  </div>
                </div>
              );
            })}
            
            {riskList.length === 0 && (
              <div className="text-white/70 text-xs whitespace-pre-wrap">
                {renderSimpleMarkdown(sections["Reputation Risks"])}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Audit Findings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* E-E-A-T Findings */}
        {sections["E-E-A-T Analysis"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-emerald-400 block" />
              3. E-E-A-T Analysis
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["E-E-A-T Analysis"])}
            </div>
          </div>
        )}

        {/* Brand Sentiment Findings */}
        {sections["Brand Sentiment Findings"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-teal-400 block" />
              4. Brand Sentiment Findings
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Brand Sentiment Findings"])}
            </div>
          </div>
        )}
      </div>

      {/* Reputation & Review Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reputation Monitoring Results */}
        {sections["Reputation Monitoring Results"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-cyan-400 block" />
              5. Reputation Monitoring Results
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Reputation Monitoring Results"])}
            </div>
          </div>
        )}

        {/* Review Intelligence Analysis */}
        {sections["Review Intelligence Analysis"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-indigo-400 block" />
              6. Review Intelligence Analysis
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Review Intelligence Analysis"])}
            </div>
          </div>
        )}
      </div>

      {/* Brand Positioning & Competitor Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Brand Positioning Analysis */}
        {sections["Brand Positioning Analysis"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-amber-400 block" />
              7. Brand Positioning Strategy
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Brand Positioning Analysis"])}
            </div>
          </div>
        )}

        {/* Competitor Brand Comparison */}
        {sections["Competitor Brand Comparison"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-rose-400 block" />
              8. Competitor Comparison
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Competitor Brand Comparison"])}
            </div>
          </div>
        )}
      </div>

      {/* Trust Insights & AI recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Trust & Authority Insights */}
        {sections["Trust & Authority Insights"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-sky-400 block" />
              9. Trust & Authority Insights
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["Trust & Authority Insights"])}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {sections["AI Recommendations"] && (
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded-full bg-purple-400 block" />
              11. AI Brand Recommendations
            </h3>
            <div className="text-white/80 text-[11px] leading-relaxed">
              {renderSimpleMarkdown(sections["AI Recommendations"])}
            </div>
          </div>
        )}
      </div>

      {/* Quick Wins */}
      {sections["Quick Wins"] && (
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/[0.02]">
          <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-emerald-500 block" />
            12. Quick Wins (Immediate Value)
          </h3>
          <div className="text-white/85 text-[11px] leading-relaxed">
            {renderSimpleMarkdown(sections["Quick Wins"])}
          </div>
        </div>
      )}

      {/* Brand Growth Roadmap */}
      {sections["Brand Growth Roadmap"] && (
        <div className="glass-card rounded-2xl p-5 border border-white/10 bg-white/[0.02]">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-teal-500 block" />
            13. Brand Growth Roadmap & Timeline
          </h3>
          <div className="text-white/80 text-xs leading-relaxed">
            {renderSimpleMarkdown(sections["Brand Growth Roadmap"])}
          </div>
        </div>
      )}

      {/* Final Brand Verdict */}
      {sections["Final Brand Verdict"] && (
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5">
          <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full bg-emerald-400 block" />
            14. Final Brand Verdict
          </h3>
          <div className="text-white/90 text-xs leading-relaxed italic">
            {renderSimpleMarkdown(sections["Final Brand Verdict"])}
          </div>
        </div>
      )}
    </div>
  );
}
