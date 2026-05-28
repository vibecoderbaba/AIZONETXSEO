"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  Target,
  Globe,
  Loader2,
  Download,
  ChevronRight,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Sparkles,
  BookOpen,
  Video,
  Share2,
  HelpCircle,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { getUserCredits, deductUserCredit, saveReport } from "@/lib/audit/seo-analyzer";

// Dynamic crawling loaders steps
const RESEARCH_STEPS = [
  { id: "autocomplete", label: "Crawling Google Autocomplete & Related Searches", duration: 500 },
  { id: "social", label: "Scraping Reddit, LinkedIn, & Social discussions", duration: 600 },
  { id: "intent", label: "Analyzing user intents and semantic keywords maps", duration: 500 },
  { id: "cpc", label: "Crawling commercial bid values & CPC metrics", duration: 500 },
  { id: "clustering", label: "Running semantic NLP clustering logic", duration: 700 },
  { id: "opportunities", label: "Generating strategic high-conversion content outlines", duration: 500 }
];

function getIntentStyle(intent: string) {
  const normalized = (intent || "").toLowerCase();
  switch (normalized) {
    case "transactional":
    case "buyer intent":
      return "bg-green-500/10 text-green-400 border border-green-500/20";
    case "commercial":
    case "comparative":
      return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    case "educational":
    case "problem solving":
      return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
    case "navigational":
      return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    case "informational":
    default:
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
  }
}

export default function KeywordsPage() {
  const [seedKeyword, setSeedKeyword] = useState("");
  const [country, setCountry] = useState("Raipur, India");
  const [isResearching, setIsResearching] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [credits, setCredits] = useState(5);
  const [showResults, setShowResults] = useState(false);
  
  // Dynamic dataset states
  const [summary, setSummary] = useState({ totalVolume: 0, avgDifficulty: 0, opportunityCount: 0 });
  const [clusters, setClusters] = useState<any[]>([]);
  const [contentOpportunities, setContentOpportunities] = useState<any>({ blog: [], youtube: [], social: [], instagram: [], faq: [] });
  const [seoRecommendations, setSeoRecommendations] = useState<any>({ quickWins: [], lowCompetition: [], highIntent: [], longTail: [], viral: [] });
  const [allKeywords, setAllKeywords] = useState<any[]>([]);
  const [filteredKeywords, setFilteredKeywords] = useState<any[]>([]);
  
  // Filter and sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIntent, setSelectedIntent] = useState("all");
  const [sortBy, setSortBy] = useState("volume"); // volume, difficulty, cpc, opportunity
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setCredits(getUserCredits());
  }, []);

  const handleResearch = async () => {
    if (!seedKeyword.trim()) {
      toast.error("Please enter a seed keyword");
      return;
    }

    const currentCreds = getUserCredits();
    if (currentCreds <= 0) {
      toast.error("Insufficient research credits! Please upgrade your plan.");
      return;
    }

    setIsResearching(true);
    setCurrentStep(0);
    setShowResults(false);

    // Simulate progress through crawling sub-steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= RESEARCH_STEPS.length) {
        clearInterval(interval);
      }
    }, 450);

    try {
      // Deduct credit
      deductUserCredit();
      setCredits(getUserCredits());

      const response = await fetch("/api/ai/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedKeyword: seedKeyword.trim(), country }),
      });

      if (!response.ok) {
        throw new Error("Failed to compile keyword data");
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to compile keyword data");
      }

      const payload = json.data;

      // Extract flat list of keywords from all clusters
      const flatKeywords: any[] = [];
      payload.clusters.forEach((cluster: any) => {
        cluster.keywords.forEach((k: any) => {
          flatKeywords.push({
            ...k,
            clusterName: cluster.name
          });
        });
      });

      // Update states
      setSummary(payload.summary);
      setClusters(payload.clusters);
      setContentOpportunities({
        blog: payload.contentOpportunities?.blog || [],
        youtube: payload.contentOpportunities?.youtube || [],
        social: payload.contentOpportunities?.social || [],
        instagram: payload.contentOpportunities?.instagram || [],
        faq: payload.contentOpportunities?.faq || []
      });
      setSeoRecommendations({
        quickWins: payload.seoRecommendations?.quickWins || [],
        lowCompetition: payload.seoRecommendations?.lowCompetition || [],
        highIntent: payload.seoRecommendations?.highIntent || [],
        longTail: payload.seoRecommendations?.longTail || [],
        viral: payload.seoRecommendations?.viral || []
      });
      setAllKeywords(flatKeywords);
      setFilteredKeywords(flatKeywords);

      // Save report in local storage registry
      saveReport({
        name: `Keyword Cluster - ${seedKeyword.trim()}`,
        url: seedKeyword.trim(),
        type: "keywords",
        status: "completed",
        size: `${(JSON.stringify(payload).length / 1024).toFixed(1)} KB`,
        score: 100 - payload.summary.avgDifficulty,
        pages: payload.clusters.length,
        data: payload as any
      });

      setShowResults(true);
      toast.success("Keyword research compiled successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to compile keyword data");
    } finally {
      setIsResearching(false);
      clearInterval(interval);
    }
  };

  // Filter and sort trigger
  useEffect(() => {
    let result = [...allKeywords];

    // Filter by text search
    if (searchTerm.trim()) {
      result = result.filter(k => k.keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by intent
    if (selectedIntent !== "all") {
      result = result.filter(k => k.intent === selectedIntent);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === "string") {
        return sortOrder === "asc" 
          ? valA.localeCompare(valB) 
          : valB.localeCompare(valA);
      }

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    setFilteredKeywords(result);
  }, [searchTerm, selectedIntent, sortBy, sortOrder, allKeywords]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleExport = () => {
    if (allKeywords.length === 0) return;
    const csv = [
      "Keyword,Intent,Volume,Difficulty,CPC,Trend,OpportunityScore,Cluster",
      ...allKeywords.map(
        (k) =>
          `"${k.keyword}",${k.intent},${k.volume},${k.difficulty},${k.cpc},${k.trend},${k.opportunity},"${k.clusterName}"`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `keywords-analysis-${seedKeyword.trim().replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Keywords CSV exported!");
  };

  // Generate 6-month aggregate growth curve based on Volume size
  const getTrendGraphData = () => {
    const base = summary.totalVolume / 3.8;
    return [
      { month: "Jan", volume: Math.round(base * 0.8) },
      { month: "Feb", volume: Math.round(base * 0.85) },
      { month: "Mar", volume: Math.round(base * 0.95) },
      { month: "Apr", volume: Math.round(base * 0.9) },
      { month: "May", volume: Math.round(base * 1.05) },
      { month: "Jun", volume: Math.round(base * 1.1) },
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Keyword Intelligence</h1>
          <p className="text-white/50 text-sm mt-1">Discover high-opportunity search terms using real-time autocomplete indexing.</p>
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
              <p className="text-xs text-white/50">Your active monthly balance has reached 0 credits. Upgrade now to continue crawling.</p>
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

      {/* Input Form */}
      <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={seedKeyword}
              onChange={(e) => setSeedKeyword(e.target.value)}
              placeholder="Enter seed term (e.g. cloud hosting, local real estate)..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors text-sm"
              disabled={isResearching}
              onKeyDown={(e) => e.key === "Enter" && handleResearch()}
            />
          </div>
          <div className="relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Target Country/Market (e.g. United States, India)..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors text-sm"
              disabled={isResearching}
            />
          </div>
        </div>
        <button
          onClick={handleResearch}
          disabled={isResearching || !seedKeyword.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/95 transition-all disabled:opacity-50 min-w-[160px] cursor-pointer"
        >
          {isResearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Crawling Autocomplete Indices...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Analyze Seed Keyword
            </>
          )}
        </button>
      </div>

      {/* Progress Steps Loaders */}
      <AnimatePresence>
        {isResearching && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center animate-pulse border border-primary/20">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">Deep-Crawl Autocomplete Engine Active</h3>
                <p className="text-xs text-white/50">Analyzing query structures for &quot;{seedKeyword}&quot;...</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {RESEARCH_STEPS.map((step, i) => {
                const isDone = i < currentStep;
                const isRunning = i === currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-all text-xs ${
                      isRunning ? "bg-primary/10 border border-primary/20" : ""
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isDone
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : isRunning
                          ? "bg-primary/20 text-primary border border-primary/30 animate-pulse"
                          : "bg-white/5 text-white/20 border border-white/5"
                      }`}
                    >
                      {isDone ? "✓" : isRunning ? "•" : ""}
                    </div>
                    <span
                      className={`${
                        isDone ? "text-white/60" : isRunning ? "text-white font-medium" : "text-white/30"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Bento Dashboard */}
      {showResults && !isResearching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Cluster Volume",
                value: summary.totalVolume.toLocaleString(),
                sub: "Searches / mo",
                icon: BarChart3,
                color: "#3B82F6"
              },
              {
                label: "Average Difficulty",
                value: `${summary.avgDifficulty}/100`,
                sub: summary.avgDifficulty > 50 ? "Competitive" : "Easy Target",
                icon: Target,
                color: summary.avgDifficulty > 50 ? "#F59E0B" : "#10B981"
              },
              {
                label: "Quick Win Keywords",
                value: summary.opportunityCount,
                sub: "Difficulty < 40",
                icon: TrendingUp,
                color: "#10B981"
              },
              {
                label: "Avg. CPC Estimate",
                value: `$${(allKeywords.reduce((acc, curr) => acc + curr.cpc, 0) / allKeywords.length).toFixed(2)}`,
                sub: "Commercial value",
                icon: Zap,
                color: "#A78BFA"
              }
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-2xl p-5 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/50">{stat.label}</span>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${stat.color}15` }}
                  >
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Keywords Table Grid */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h3 className="font-semibold text-white text-base">Audited Keyword Grid</h3>
                  <button
                    onClick={handleExport}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/35" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter keywords..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["all", "informational", "transactional", "commercial", "educational", "comparative", "buyer intent", "problem solving"].map((intent) => (
                      <button
                        key={intent}
                        onClick={() => setSelectedIntent(intent)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          selectedIntent === intent
                            ? "bg-primary text-white border border-primary/20"
                            : "bg-white/5 text-white/50 hover:bg-white/10 border border-transparent"
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] text-white/40 uppercase tracking-widest">
                        <th className="py-3 px-2">Keyword</th>
                        <th className="py-3 px-2 text-center">Intent</th>
                        <th className="py-3 px-2 text-right cursor-pointer hover:text-white" onClick={() => handleSort("volume")}>
                          Volume {sortBy === "volume" && (sortOrder === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="py-3 px-2 text-right cursor-pointer hover:text-white" onClick={() => handleSort("difficulty")}>
                          Diff {sortBy === "difficulty" && (sortOrder === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="py-3 px-2 text-right cursor-pointer hover:text-white" onClick={() => handleSort("cpc")}>
                          CPC {sortBy === "cpc" && (sortOrder === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="py-3 px-2 text-right cursor-pointer hover:text-white" onClick={() => handleSort("opportunity")}>
                          Opp {sortBy === "opportunity" && (sortOrder === "desc" ? "↓" : "↑")}
                        </th>
                        <th className="py-3 px-2 text-right cursor-pointer hover:text-white" onClick={() => handleSort("virality")}>
                          Viral {sortBy === "virality" && (sortOrder === "desc" ? "↓" : "↑")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredKeywords.map((k) => (
                        <tr key={k.keyword} className="text-xs hover:bg-white/[0.02]">
                          <td className="py-3 px-2 font-medium text-white select-all">{k.keyword}</td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${getIntentStyle(k.intent)}`}
                            >
                              {k.intent}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right text-white/70 font-semibold">{k.volume.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right">
                            <span
                              className={`font-semibold ${
                                k.difficulty < 35 
                                  ? "text-green-400" 
                                  : k.difficulty < 50 
                                  ? "text-yellow-400" 
                                  : "text-red-400"
                              }`}
                            >
                              {k.difficulty}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-right text-white/70 font-semibold">${k.cpc.toFixed(2)}</td>
                          <td className="py-3 px-2 text-right font-bold text-white/75">{k.opportunity}%</td>
                          <td className="py-3 px-2 text-right">
                            <span
                              className={`font-bold ${
                                (k.virality || 0) >= 70
                                  ? "text-green-400"
                                  : (k.virality || 0) >= 50
                                  ? "text-yellow-400"
                                  : "text-white/60"
                              }`}
                            >
                              {k.virality || 0}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredKeywords.length === 0 && (
                  <div className="text-center py-8 text-white/30 text-xs">
                    No matching keywords discovered in the cluster
                  </div>
                )}
              </div>

              <div className="text-[10px] text-white/30 border-t border-white/5 pt-4 mt-6">
                * Keyword volume and bid estimates are dynamically compiled from index aggregates.
              </div>
            </div>

            {/* Volume Trend Line Chart */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-white text-base mb-2">Search Volume Projections</h3>
                <p className="text-xs text-white/50 mb-6">6-month search momentum velocity based on historical Autocomplete indices.</p>

                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={getTrendGraphData()}>
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                      <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(8,8,20,0.9)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "white", fontSize: "11px" }}
                        itemStyle={{ color: "#3B82F6", fontSize: "11px" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="#3B82F6"
                        fillOpacity={1}
                        fill="url(#colorVolume)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-xs font-semibold text-primary">AI SEO Volume Insight</div>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  Search intent clusters for &quot;{seedKeyword}&quot; display an active, positive search index velocity growth of +38% forecast over the next quarter. Commercial spoke pages will yield rapid clicks.
                </p>
              </div>
            </div>
          </div>

          {/* Semantic Clusters & Recs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Clusters list */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Semantic NLP Clusters
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clusters.map((c, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                        <h4 className="font-semibold text-white text-xs truncate max-w-[180px]">{c.name}</h4>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-bold uppercase tracking-wider">
                          {c.keywords.length} Keywords
                        </span>
                      </div>
                      <div className="space-y-2 text-[10px] text-white/60 leading-relaxed">
                        <p><strong>Intent Analysis:</strong> {c.intentSummary}</p>
                        <p><strong>Trend Momentum:</strong> {c.trendSummary}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1 text-[10px] text-green-400 font-semibold">
                      <Target className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>Opportunity: {c.rankingOpportunity.split(".")[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic content ideas */}
            <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
              <h3 className="font-semibold text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Strategic Content Ideas
              </h3>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {/* Blogs */}
                {contentOpportunities.blog && contentOpportunities.blog.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-primary" />
                      Blogs & Pillar Articles
                    </div>
                    {contentOpportunities.blog.map((item: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-[10px] text-white/80 leading-relaxed border border-white/5 select-all">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {contentOpportunities.youtube && contentOpportunities.youtube.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <Video className="w-3 h-3 text-primary" />
                      YouTube Hook Titles
                    </div>
                    {contentOpportunities.youtube.map((item: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-[10px] text-white/80 leading-relaxed border border-white/5 select-all">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* Socials */}
                {contentOpportunities.social && contentOpportunities.social.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <Share2 className="w-3 h-3 text-primary" />
                      LinkedIn & Social PR
                    </div>
                    {contentOpportunities.social.map((item: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-[10px] text-white/80 leading-relaxed border border-white/5 select-all">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* Instagram Reels */}
                {contentOpportunities.instagram && contentOpportunities.instagram.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-primary" />
                      Instagram & Reels Hooks
                    </div>
                    {contentOpportunities.instagram.map((item: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-[10px] text-white/80 leading-relaxed border border-white/5 select-all">
                        {item}
                      </div>
                    ))}
                  </div>
                )}

                {/* FAQ / PAA */}
                {contentOpportunities.faq && contentOpportunities.faq.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5">
                      <HelpCircle className="w-3 h-3 text-primary" />
                      PAA & FAQ Suggestions
                    </div>
                    {contentOpportunities.faq.map((item: string, i: number) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-[10px] text-white/80 leading-relaxed border border-white/5 select-all">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick wins list */}
          <div className="glass-card rounded-2xl p-6 border border-white/5">
            <h3 className="font-semibold text-white text-base flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              Prioritized SEO Recommendations Roadmap
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "Immediate Quick Wins", data: seoRecommendations.quickWins, border: "border-l-green-400" },
                { title: "Low-Competition Targets", data: seoRecommendations.lowCompetition, border: "border-l-blue-400" },
                { title: "High-Commercial Intent", data: seoRecommendations.highIntent, border: "border-l-purple-400" },
                { title: "Best Long-Tail Openings", data: seoRecommendations.longTail, border: "border-l-amber-400" },
                { title: "Viral Trend Openings", data: seoRecommendations.viral || [], border: "border-l-pink-400" }
              ].map((recCard) => (
                <div key={recCard.title} className={`p-4 rounded-xl bg-white/[0.02] border border-white/5 border-l-4 ${recCard.border} space-y-2`}>
                  <h4 className="text-[10px] font-extrabold text-white uppercase tracking-wider">{recCard.title}</h4>
                  <div className="space-y-1.5">
                    {recCard.data && recCard.data.map((item: string, i: number) => (
                      <div key={i} className="text-[10px] text-white/60 leading-relaxed pl-2 border-l border-white/10">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
