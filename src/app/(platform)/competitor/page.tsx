"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Target,
  Globe,
  Loader2,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Link2,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getUserCredits, deductUserCredit, saveReport } from "@/lib/audit/seo-analyzer";

// Mock competitor data
const generateMockCompetitorData = (url1: string, url2: string) => ({
  metrics: [
    { name: "Domain Authority", you: 45, competitor: 52 },
    { name: "Organic Traffic", you: 24500, competitor: 67000 },
    { name: "Backlinks", you: 1200, competitor: 3400 },
    { name: "Indexed Pages", you: 156, competitor: 423 },
    { name: "Keywords", you: 890, competitor: 2100 },
  ],
  keywordGap: [
    { keyword: "ai marketing tools", yourRank: 0, competitorRank: 4, volume: 8100 },
    { keyword: "seo automation", yourRank: 12, competitorRank: 3, volume: 5400 },
    { keyword: "digital marketing ai", yourRank: 0, competitorRank: 7, volume: 4400 },
    { keyword: "marketing automation software", yourRank: 24, competitorRank: 5, volume: 12100 },
    { keyword: "ai content strategy", yourRank: 8, competitorRank: 2, volume: 2900 },
  ],
});

export default function CompetitorPage() {
  const [yourUrl, setYourUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [credits, setCredits] = useState(5);
  const [analysis, setAnalysis] = useState<{
    metrics: { name: string; you: number; competitor: number }[];
    keywordGap: { keyword: string; yourRank: number; competitorRank: number; volume: number }[];
    aiInsight: string;
  } | null>(null);

  useEffect(() => {
    setCredits(getUserCredits());
  }, []);

  const handleAnalyze = async () => {
    if (!yourUrl.trim() || !competitorUrl.trim()) {
      toast.error("Please enter both URLs");
      return;
    }

    const currentCreds = getUserCredits();
    if (currentCreds <= 0) {
      toast.error("Insufficient credits! Please upgrade your plan.");
      return;
    }

    setIsAnalyzing(true);
    setShowResults(false);

    try {
      deductUserCredit();
      setCredits(getUserCredits());

      const response = await fetch("/api/ai/competitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ yourUrl: yourUrl.trim(), competitorUrl: competitorUrl.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to compile competitor metrics");
      }

      const json = await response.json();
      if (!json.success) {
        throw new Error(json.error || "Failed to compile competitor metrics");
      }

      const payload = json.data;

      setAnalysis({
        metrics: payload.metrics,
        keywordGap: payload.keywordGap,
        aiInsight: payload.aiInsight,
      });

      // Save report in local storage registry
      saveReport({
        name: `Competitor Audit - ${yourUrl.trim()} vs ${competitorUrl.trim()}`,
        url: `${yourUrl.trim()} vs ${competitorUrl.trim()}`,
        type: "competitor",
        status: "completed",
        size: `${(JSON.stringify(payload).length / 1024).toFixed(1)} KB`,
        score: Math.max(0, 100 - (payload.metrics[0].competitor - payload.metrics[0].you)),
        pages: 2,
        data: payload as any
      });

      setShowResults(true);
      toast.success("Competitor analysis complete!");
    } catch (error: any) {
      toast.error(error.message || "Failed to run competitor analysis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Competitor Analysis</h1>
          <p className="text-white/50 text-sm mt-1">Compare your SEO performance against competitors.</p>
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
              <p className="text-xs text-white/50">Your active monthly balance has reached 0 credits. Upgrade now to continue competitive analyses.</p>
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

      {/* URL Inputs */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Your Website</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="url"
                value={yourUrl}
                onChange={(e) => setYourUrl(e.target.value)}
                placeholder="yourwebsite.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Competitor Website</label>
            <div className="relative">
              <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="url"
                value={competitorUrl}
                onChange={(e) => setCompetitorUrl(e.target.value)}
                placeholder="competitor.com"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Compare Now
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Metrics Comparison */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h3 className="font-semibold text-white mb-6">Performance Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analysis.metrics} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={12} width={120} />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(8,8,20,0.9)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "white" }}
                    />
                    <Bar dataKey="you" name="Your Site" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="competitor" name="Competitor" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Keyword Gap */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Keyword Gap Analysis
                </h3>
                <div className="space-y-3">
                  {analysis.keywordGap.map((item) => (
                    <div key={item.keyword} className="p-4 rounded-xl bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white">{item.keyword}</span>
                        <span className="text-xs text-white/40">{item.volume.toLocaleString()} vol</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-white/50">Your rank</span>
                            <span className={item.yourRank === 0 ? "text-red-400" : "text-white/70"}>
                              {item.yourRank === 0 ? "Not ranked" : `#${item.yourRank}`}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${item.yourRank === 0 ? "bg-red-400" : "bg-primary"}`}
                              style={{ width: item.yourRank === 0 ? "5%" : `${Math.max(5, 100 - item.yourRank * 5)}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-white/50">Competitor</span>
                            <span className="text-purple-400">#{item.competitorRank}</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full bg-purple-400"
                              style={{ width: `${Math.max(5, 100 - item.competitorRank * 5)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Insights */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  AI Strategic Recommendations
                </h3>
                <div className="p-4 rounded-xl bg-white/5">
                  <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                    {analysis.aiInsight}
                  </pre>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Quick Win Available</div>
                      <div className="text-xs text-white/50">Target 5 low-competition keywords</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Content Gap Detected</div>
                      <div className="text-xs text-white/50">Competitor has 267 more pages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
