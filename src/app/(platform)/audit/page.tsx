"use client";

import { useState, useEffect } from "react";
import {
  AUDIT_STEPS,
  runSEOAudit,
  getUserCredits,
  deductUserCredit,
  saveReport,
  type AuditResult
} from "@/lib/audit/seo-analyzer";
import {
  Zap,
  Search,
  AlertCircle,
  CheckCircle,
  Loader2,
  Globe,
  Clock,
  ChevronRight,
  Download,
  Share2,
  RefreshCw,
  ArrowRight,
  FileText,
  Target,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    setCredits(getUserCredits());
  }, []);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a website URL");
      return;
    }

    const currentCreds = getUserCredits();
    if (currentCreds <= 0) {
      toast.error("Insufficient audit credits! Please upgrade your plan.");
      return;
    }

    setIsAuditing(true);
    setCurrentStep(0);
    setAuditResult(null);
    setError("");

    // Simulate progress through steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      if (step >= AUDIT_STEPS.length) {
        clearInterval(interval);
      }
    }, 400);

    try {
      // Deduct credit
      deductUserCredit();
      setCredits(getUserCredits());

      const result = await runSEOAudit(url);
      setAuditResult(result);
      
      // Save report to database history registry
      let hostname = url;
      try {
        hostname = new URL(result.url).hostname;
      } catch {}

      saveReport({
        name: `SEO Audit - ${hostname}`,
        url: result.url,
        type: "audit",
        status: "completed",
        size: `${(result.processingTime / 100).toFixed(1)} KB`,
        score: result.overallScore,
        pages: 1,
        data: result
      });

      toast.success("Audit completed successfully!");
    } catch (err: any) {
      setError(err.message || "Failed to complete audit. Please try again.");
      toast.error(err.message || "Audit failed");
    } finally {
      setIsAuditing(false);
      clearInterval(interval);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#3B82F6";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Good";
    if (score >= 60) return "Average";
    return "Needs Work";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">AI SEO Audit</h1>
          <p className="text-white/50 text-sm mt-1">Deep technical analysis powered by 5 specialized AI agents.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
          <Zap className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
          <span>Credits Remaining: <strong className="text-white font-bold">{credits}</strong></span>
        </div>
      </div>

      {/* URL Input */}
      <div className="glass-card rounded-2xl p-6 border border-white/5">
        <form onSubmit={handleAudit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., example.com)"
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
              disabled={isAuditing}
            />
          </div>
          <button
            type="submit"
            disabled={isAuditing}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 min-w-[160px]"
          >
            {isAuditing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Auditing...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Start Audit
              </>
            )}
          </button>
        </form>
      </div>

      {/* Progress Steps */}
      <AnimatePresence>
        {isAuditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-2xl p-6 border border-white/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center animate-pulse">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Running AI Audit</h3>
                <p className="text-sm text-white/50">Analyzing {url || "website"}...</p>
              </div>
            </div>
            <div className="space-y-3">
              {AUDIT_STEPS.map((step, i) => {
                const isDone = i < currentStep;
                const isRunning = i === currentStep;
                const isPending = i > currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isRunning ? "bg-primary/10 border border-primary/20" : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isDone
                          ? "bg-green-500/20 text-green-400"
                          : isRunning
                          ? "bg-primary/20 text-primary animate-pulse"
                          : "bg-white/5 text-white/20"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isRunning ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        isDone ? "text-white/60" : isRunning ? "text-white" : "text-white/30"
                      }`}
                    >
                      {step.label}
                    </span>
                    {isRunning && <span className="ml-auto text-xs text-primary">Running...</span>}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Results */}
      <AnimatePresence>
        {auditResult && !isAuditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <div className="glass-card rounded-2xl p-8 border border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Score Circle */}
                <div className="relative">
                  <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={getScoreColor(auditResult.overallScore)}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={283}
                      initial={{ strokeDashoffset: 283 }}
                      animate={{
                        strokeDashoffset: 283 - (auditResult.overallScore / 100) * 283,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ filter: `drop-shadow(0 0 10px ${getScoreColor(auditResult.overallScore)}50)` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{auditResult.overallScore}</span>
                    <span className="text-xs text-white/50 uppercase tracking-wider">{auditResult.grade}</span>
                  </div>
                </div>

                {/* Score Details */}
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-4">
                    <Globe className="w-4 h-4 text-white/40" />
                    <span className="text-white/70">{auditResult.url}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    SEO Score: {getScoreLabel(auditResult.overallScore)}
                  </h2>
                  <p className="text-white/50 mb-4">
                    We analyzed {auditResult.categories.technical.checks.length * 5} data points across 5 categories.
                    Processing time: {(auditResult.processingTime / 1000).toFixed(1)}s
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all">
                      <Download className="w-4 h-4" />
                      Export PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all">
                      <Share2 className="w-4 h-4" />
                      Share Report
                    </button>
                    <button
                      onClick={() => {
                        setAuditResult(null);
                        setUrl("");
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      New Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Object.entries(auditResult.categories).map(([key, category], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-5 border border-white/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-white/60">{category.label}</span>
                    <span
                      className="text-lg font-bold"
                      style={{ color: getScoreColor(category.score) }}
                    >
                      {category.score}
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: getScoreColor(category.score) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <div className="space-y-2">
                    {category.checks.slice(0, 3).map((check) => (
                      <div key={check.name} className="flex items-center gap-2 text-xs">
                        {check.status === "pass" ? (
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        ) : check.status === "warn" ? (
                          <AlertCircle className="w-3 h-3 text-yellow-400" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-red-400" />
                        )}
                        <span className="text-white/50">{check.name}</span>
                      </div>
                    ))}
                    {category.checks.length > 3 && (
                      <div className="text-xs text-white/30">+{category.checks.length - 3} more checks</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Issues & Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Issues */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">Issues Found</h3>
                  <span className="ml-auto px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium">
                    {auditResult.issues.length} total
                  </span>
                </div>
                <div className="space-y-4">
                  {auditResult.issues.map((issue, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/5 border-l-4"
                      style={{
                        borderLeftColor:
                          issue.severity === "critical" ? "#EF4444" : issue.severity === "warning" ? "#F59E0B" : "#3B82F6",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            issue.severity === "critical"
                              ? "text-red-400"
                              : issue.severity === "warning"
                              ? "text-yellow-400"
                              : "text-blue-400"
                          }`}
                        >
                          {issue.severity}
                        </span>
                      </div>
                      <h4 className="font-medium text-white text-sm mb-1">{issue.title}</h4>
                      <p className="text-xs text-white/50 mb-2">{issue.description}</p>
                      <div className="flex items-start gap-2 text-xs">
                        <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-white/40">Fix: {issue.fix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opportunities */}
              <div className="glass-card rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-white">AI-Detected Opportunities</h3>
                </div>
                <div className="space-y-4">
                  {auditResult.opportunities.map((opp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{opp.title}</h4>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            opp.effort === "low"
                              ? "bg-green-500/10 text-green-400"
                              : opp.effort === "medium"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {opp.effort} effort
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary mb-2">
                        <Target className="w-3 h-3" />
                        {opp.potential}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {opp.timeframe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-white">AI Strategic Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auditResult.aiRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
