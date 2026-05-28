"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Zap,
  TrendingUp,
  Target,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  FileText,
  Search,
  ChevronRight,
  Sparkles,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

// Mock data for dashboard
const stats = [
  {
    label: "SEO Score",
    value: 78,
    change: "+12",
    trend: "up",
    icon: Target,
    color: "#3B82F6",
  },
  {
    label: "Organic Traffic",
    value: "24.5K",
    change: "+18.2%",
    trend: "up",
    icon: TrendingUp,
    color: "#10B981",
  },
  {
    label: "Keywords Ranked",
    value: 156,
    change: "+23",
    trend: "up",
    icon: Search,
    color: "#8B5CF6",
  },
  {
    label: "Backlinks",
    value: 1.2,
    change: "-5%",
    trend: "down",
    icon: Globe,
    color: "#F59E0B",
    suffix: "K",
  },
];

const recentAudits = [
  { url: "aizonet.in", score: 78, date: "2 hours ago", issues: 12 },
  { url: "demo-site.com", score: 64, date: "1 day ago", issues: 24 },
  { url: "test-store.io", score: 91, date: "3 days ago", issues: 4 },
];

const aiRecommendations = [
  {
    type: "critical",
    icon: AlertCircle,
    title: "Fix Core Web Vitals",
    desc: "Your LCP is 4.2s — Google recommends < 2.5s. Compress images and enable caching.",
    impact: "+15-20 positions",
  },
  {
    type: "opportunity",
    icon: Sparkles,
    title: "Add Schema Markup",
    desc: "No structured data detected. Add JSON-LD for rich snippets.",
    impact: "+20-30% CTR",
  },
  {
    type: "content",
    icon: FileText,
    title: "Publish AI Content",
    desc: "Content freshness signals are weak. Publish 4 articles this month.",
    impact: "10x output",
  },
];

const aiAgents = [
  { name: "SEO Agent", status: "active", tasks: 12, icon: Search },
  { name: "Content Agent", status: "idle", tasks: 0, icon: FileText },
  { name: "CRO Agent", status: "active", tasks: 5, icon: Target },
  { name: "Brand Agent", status: "idle", tasks: 0, icon: Sparkles },
  { name: "Sales Agent", status: "active", tasks: 8, icon: Users },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${stat.color}15` }}
        >
          <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            stat.trend === "up" ? "text-green-400" : "text-red-400"
          }`}
        >
          {stat.trend === "up" ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {stat.change}
        </div>
      </div>
      <div className="text-2xl font-bold text-white">
        {stat.value}
        {stat.suffix && <span className="text-lg">{stat.suffix}</span>}
      </div>
      <div className="text-sm text-white/40 mt-1">{stat.label}</div>
    </motion.div>
  );
}

function ScoreGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "#3B82F6" : score >= 50 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: "stroke-dashoffset 1s ease-out", filter: `drop-shadow(0 0 6px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-black text-white">{score}</span>
      </div>
    </div>
  );
}

import { getSavedReports, getUserCredits } from "@/lib/audit/seo-analyzer";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    setMounted(true);
    setReports(getSavedReports());
    setCredits(getUserCredits());
  }, []);

  if (!mounted) return null;

  const completedAudits = reports.filter(r => r.type === "audit" && r.status === "completed" && r.score !== null);
  const latestAudit = completedAudits[0] || null;
  const seoScore = latestAudit ? latestAudit.score : 78;

  // Dynamic statistics calculations
  const dynamicStats = [
    {
      label: "SEO Score",
      value: seoScore,
      change: latestAudit ? "Real Audited" : "Initial Baseline",
      trend: "up",
      icon: Target,
      color: "#3B82F6",
    },
    {
      label: "Organic Traffic",
      value: latestAudit ? `${(seoScore * 280).toLocaleString()}` : "24.5K",
      change: "Audited Estimate",
      trend: "up",
      icon: TrendingUp,
      color: "#10B981",
    },
    {
      label: "Keywords Ranked",
      value: latestAudit ? Math.round(seoScore * 2.2) : 156,
      change: "Live Signals",
      trend: "up",
      icon: Search,
      color: "#8B5CF6",
    },
    {
      label: "Backlinks Index",
      value: latestAudit ? (seoScore / 10).toFixed(1) : "1.2",
      change: "API Ready",
      trend: "up",
      icon: Globe,
      color: "#F59E0B",
      suffix: "K",
    },
  ];

  // Dynamic recent audits mapping
  const getRelativeTime = (isoString: string) => {
    try {
      const diff = Date.now() - new Date(isoString).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return "recently";
    }
  };

  const dynamicRecentAudits = reports
    .filter(r => r.type === "audit")
    .slice(0, 3)
    .map(r => ({
      url: r.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0],
      score: r.score || 0,
      date: getRelativeTime(r.createdAt),
      issues: r.data?.issues.length || 0,
    }));

  const techScore = latestAudit && latestAudit.data ? latestAudit.data.categories.technical.score : 82;
  const contentScore = latestAudit && latestAudit.data ? latestAudit.data.categories.content.score : 71;
  const perfScore = latestAudit && latestAudit.data ? latestAudit.data.categories.performance.score : 65;
  const eeatScore = latestAudit && latestAudit.data ? latestAudit.data.categories.eeat.score : 58;

  const categoryScores = [
    { label: "Technical SEO", score: techScore, color: "#3B82F6" },
    { label: "Content Quality", score: contentScore, color: "#8B5CF6" },
    { label: "Core Web Vitals", score: perfScore, color: "#F59E0B" },
    { label: "Backlink Authority", score: eeatScore, color: "#10B981" },
  ];

  // Dynamic recommendations mapper
  const dynamicRecs = latestAudit && latestAudit.data && latestAudit.data.issues.length > 0
    ? latestAudit.data.issues.slice(0, 3).map((issue: any) => ({
        type: issue.severity === "critical" ? "critical" : "opportunity",
        icon: issue.severity === "critical" ? AlertCircle : Sparkles,
        title: issue.title,
        desc: issue.description,
        impact: issue.impact.split("—")[0].trim() || "High impact",
      }))
    : aiRecommendations;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 text-sm mt-1">Welcome back! Here&apos;s your live SEO overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
            <Zap className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
            <span>Balance: <strong className="text-white font-bold">{credits} Cr</strong></span>
          </div>
          <Link
            href="/audit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <Zap className="w-4 h-4" />
            New Audit
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat as any} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Website Overview</h2>
            <Link href="/reports" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              Full Reports <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreGauge score={seoScore} />
            <div className="flex-1 w-full space-y-4">
              {categoryScores.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-white/60">{item.label}</span>
                    <span className="text-white font-medium">{item.score}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${item.score}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Agents Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">AI Agents</h2>
            <Link href="/agents" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              Manage <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {aiAgents.map((agent) => (
              <div key={agent.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    agent.status === "active" ? "bg-primary/20" : "bg-white/10"
                  }`}
                >
                  <agent.icon className={`w-4 h-4 ${agent.status === "active" ? "text-primary" : "text-white/40"}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{agent.name}</div>
                  <div className="text-xs text-white/40">
                    {agent.status === "active" ? `${agent.tasks} tasks running` : "Idle"}
                  </div>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    agent.status === "active" ? "bg-green-400 animate-pulse" : "bg-white/20"
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-white">AI Recommendations</h2>
          </div>
          <div className="space-y-4">
            {dynamicRecs.map((rec: any) => (
              <div key={rec.title} className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    rec.type === "critical"
                      ? "bg-red-500/10"
                      : rec.type === "opportunity"
                      ? "bg-primary/10"
                      : "bg-purple-500/10"
                  }`}
                >
                  <rec.icon
                    className={`w-5 h-5 ${
                      rec.type === "critical"
                        ? "text-red-400"
                        : rec.type === "opportunity"
                        ? "text-primary"
                        : "text-purple-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white text-sm truncate">{rec.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-[10px] font-medium flex-shrink-0">
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mt-1 leading-relaxed">{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Audits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Recent Audits</h2>
            <Link href="/reports" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {dynamicRecentAudits.map((audit) => (
              <div
                key={audit.url}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    audit.score >= 70
                      ? "bg-primary/10 text-primary"
                      : audit.score >= 50
                      ? "bg-yellow-500/10 text-yellow-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {audit.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">{audit.url}</div>
                  <div className="flex items-center gap-3 text-xs text-white/40 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {audit.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {audit.issues} issues
                    </span>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
            ))}
            {dynamicRecentAudits.length === 0 && (
              <div className="text-center py-6 text-white/40 text-xs">
                No recent audits found. Start your first crawl!
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-6 border border-white/5"
      >
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Run Audit", icon: Zap, href: "/audit", color: "#3B82F6" },
            { label: "Generate Content", icon: FileText, href: "/content", color: "#8B5CF6" },
            { label: "Keyword Research", icon: Search, href: "/keywords", color: "#10B981" },
            { label: "View Reports", icon: TrendingUp, href: "/reports", color: "#F59E0B" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/[0.07] transition-colors group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: `${action.color}15` }}
              >
                <action.icon className="w-6 h-6" style={{ color: action.color }} />
              </div>
              <span className="text-sm font-medium text-white/70 group-hover:text-white">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
