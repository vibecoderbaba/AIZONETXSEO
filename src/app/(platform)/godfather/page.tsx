"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Bot,
  Zap,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Activity,
  Maximize2,
  FileCheck,
  Building,
  RotateCcw,
  Check,
  Send,
  Loader2,
  Sliders,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

import { getTelemetrySpans, type Span } from "@/lib/observability/tracer";
import { getWhiteLabelConfig, type WhiteLabelConfig, type MeteredUsageLog } from "@/features/billing/metering";
import { type OptimizationOutcome, type SelfImprovingHeuristics } from "@/features/learning/reinforcement";
import { type ForecastingMetrics } from "@/features/predictive/forecaster";
import { type DynamicCoWorkingState } from "@/features/collaboration/multi-agent";

export default function GodfatherPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"orchestrator" | "forecaster" | "whitelabel" | "observability">("orchestrator");

  // State Variables
  const [urlInput, setUrlInput] = useState("https://aizonet.in");
  const [kwInput, setKwInput] = useState("raipur real estate marketing");
  const [volumeInput, setVolumeInput] = useState(2500);
  const [diffInput, setDiffInput] = useState(55);
  const [cpcInput, setCpcInput] = useState(2.2);

  // Loaded database items
  const [heuristics, setHeuristics] = useState<SelfImprovingHeuristics | null>(null);
  const [outcomes, setOutcomes] = useState<OptimizationOutcome[]>([]);
  const [telemetrySummary, setTelemetrySummary] = useState<any>(null);
  const [whiteLabel, setWhiteLabel] = useState<WhiteLabelConfig>({ isEnabled: false, companyName: "AIZONET OS" });
  const [usageLogs, setUsageLogs] = useState<MeteredUsageLog[]>([]);
  const [spans, setSpans] = useState<Span[]>([]);

  // Action status loading flags
  const [isExecutingAgents, setIsExecutingAgents] = useState(false);
  const [agentResult, setAgentResult] = useState<DynamicCoWorkingState | null>(null);
  
  const [isCompilingForecast, setIsCompilingForecast] = useState(false);
  const [forecastResult, setForecastResult] = useState<ForecastingMetrics | null>(null);
  const [volatilityTicks, setVolatilityTicks] = useState<any[]>([]);

  const [isSavingWhiteLabel, setIsSavingWhiteLabel] = useState(false);

  // Fetch initial server-side logs
  const fetchGodfatherStats = async () => {
    try {
      const res = await fetch("/api/ai/godfather");
      if (res.ok) {
        const data = await res.json();
        setHeuristics(data.heuristics);
        setOutcomes(data.history);
        setTelemetrySummary(data.telemetry);
        setWhiteLabel(data.whiteLabel);
        setUsageLogs(data.usageLogs);
        setSpans(getTelemetrySpans());
      }
    } catch (err) {
      console.error("Failed to load Godfather statistics:", err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchGodfatherStats();
  }, []);

  const handleExecuteAgents = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return toast.error("Please enter a target URL");

    setIsExecutingAgents(true);
    setAgentResult(null);
    try {
      const res = await fetch("/api/ai/godfather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "execute_agents", url: urlInput })
      });
      const data = await res.json();
      if (data.success) {
        setAgentResult(data.agentState);
        toast.success("Autonomous agents loop completed!");
        fetchGodfatherStats();
      } else {
        toast.error(data.error || "Execution failed");
      }
    } catch (err) {
      toast.error("Network error during agent execution");
    } finally {
      setIsExecutingAgents(false);
    }
  };

  const handleCompileForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kwInput) return toast.error("Please enter a focus keyword");

    setIsCompilingForecast(true);
    setForecastResult(null);
    try {
      const res = await fetch("/api/ai/godfather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "compile_forecast",
          keyword: kwInput,
          volume: volumeInput,
          difficulty: diffInput,
          cpc: cpcInput
        })
      });
      const data = await res.json();
      if (data.success) {
        setForecastResult(data.forecast);
        setVolatilityTicks(data.volatility);
        toast.success("Forecasting metrics generated!");
        fetchGodfatherStats();
      } else {
        toast.error(data.error || "Compilation failed");
      }
    } catch (err) {
      toast.error("Network error compiling forecasting results");
    } finally {
      setIsCompilingForecast(false);
    }
  };

  const handleSaveWhiteLabel = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWhiteLabel(true);
    try {
      const res = await fetch("/api/ai/godfather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save_whitelabel", whiteLabel })
      });
      const data = await res.json();
      if (data.success) {
        setWhiteLabel(data.config);
        toast.success("White-label configurations saved!");
        fetchGodfatherStats();
      } else {
        toast.error(data.error || "Failed to save white-label configurations");
      }
    } catch (err) {
      toast.error("Network error saving white-label configs");
    } finally {
      setIsSavingWhiteLabel(false);
    }
  };

  if (!mounted) return null;

  // Render dummy metrics for forecast chart projections
  const projectionChartData = forecastResult ? [
    { name: "Current", traffic: forecastResult.currentTraffic, value: forecastResult.currentValueUsd },
    { name: "30 Days", traffic: Math.round(forecastResult.currentTraffic * 1.3), value: parseFloat((forecastResult.currentValueUsd * 1.3).toFixed(2)) },
    { name: "60 Days", traffic: Math.round(forecastResult.currentTraffic * 1.7), value: parseFloat((forecastResult.currentValueUsd * 1.7).toFixed(2)) },
    { name: "90 Days Plan", traffic: forecastResult.projectedTraffic90d, value: forecastResult.projectedValueUsd }
  ] : [];

  return (
    <div className="space-y-8 pb-12">
      {/* Dynamic Header */}
      <div className="relative p-8 rounded-3xl overflow-hidden border border-white/5 bg-[#080816]/75 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-primary/20 text-xs font-bold text-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Self-Improving AI growth infrastructure
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-white leading-tight">
              Godfather <span className="text-gradient">Control Center</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-2xl leading-relaxed">
              Your autonomous AI growth operating layer. Orchestrates planning loops, calculates predictive traffic outcomes, logs tracing telemetry, and automates sitemaps updates.
            </p>
          </div>
          
          {/* Action Navigation Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-fit">
            {[
              { id: "orchestrator", label: "Multi-Agent Loop", icon: Bot },
              { id: "forecaster", label: "Predictive Forecast", icon: TrendingUp },
              { id: "whitelabel", label: "White Label", icon: Sliders },
              { id: "observability", label: "Observability", icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Heuristics learning scorecards (Self-improving indicator) */}
      {heuristics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-dark border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-white/40 text-xs font-semibold">Continuous Optimization loops</div>
              <div className="text-3xl font-black text-white font-heading">{heuristics.totalTracked}</div>
              <div className="text-emerald-400 text-xs font-bold">Outcome-monitored</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Cpu className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-dark border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-white/40 text-xs font-semibold">Heuristic Success Rate</div>
              <div className="text-3xl font-black text-white font-heading">{heuristics.successRatePercent}%</div>
              <div className="text-primary text-xs font-bold">Dynamic Reinforcement Loop</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-dark border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-white/40 text-xs font-semibold">Average Organic Position Lift</div>
              <div className="text-3xl font-black text-white font-heading">+{heuristics.averageRankLift}</div>
              <div className="text-emerald-400 text-xs font-bold">SERP positions gained</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="glass-dark border border-white/5 p-6 rounded-2xl flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-white/40 text-xs font-semibold">Self-Improving confidence Factor</div>
              <div className="text-3xl font-black text-white font-heading">{heuristics.confidenceAdjustmentMultiplier}x</div>
              <div className="text-primary text-xs font-bold">Score tuning multiplier</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      {/* Main Tabs Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Interactive Panel (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            
            {/* Orchestrator Agentic loop Tab */}
            {activeTab === "orchestrator" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="glass-dark border border-white/5 p-8 rounded-3xl space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Bot className="w-5 h-5 text-primary" /> Autonomous Multi-Agent Growth Loop
                    </h3>
                    <span className="text-white/30 text-xs">Sandbox Pipeline</span>
                  </div>

                  <form onSubmit={handleExecuteAgents} className="flex gap-4">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://yourdomain.com"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 text-sm"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isExecutingAgents}
                      className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isExecutingAgents ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Orchestrating...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Trigger Loop
                        </>
                      )}
                    </button>
                  </form>

                  {/* Co-working agent execution feeds */}
                  {agentResult && (
                    <div className="space-y-6 border-t border-white/5 pt-6">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-white">Execution Telemetry Summary</div>
                        <div className="text-xs text-primary font-bold">Overall Health Score: {agentResult.overallHealthScore}/100</div>
                      </div>
                      
                      <div className="space-y-4">
                        {agentResult.activities.map((act, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                              0{i + 1}
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{act.agentName}</span>
                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/50">{act.role}</span>
                              </div>
                              <p className="text-white/60 text-xs leading-relaxed">{act.message}</p>
                              <span className="text-[9px] text-white/25">{new Date(act.timestamp).toLocaleTimeString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Predictive Forecaster Tab */}
            {activeTab === "forecaster" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="glass-dark border border-white/5 p-8 rounded-3xl space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" /> Predictive SEO & ROI Forecast Models
                  </h3>

                  <form onSubmit={handleCompileForecast} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 font-bold">Keyword Target</label>
                      <input
                        type="text"
                        value={kwInput}
                        onChange={(e) => setKwInput(e.target.value)}
                        placeholder="Keyword..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 font-bold">Monthly Search Volume</label>
                      <input
                        type="number"
                        value={volumeInput}
                        onChange={(e) => setVolumeInput(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 font-bold">Difficulty (0-100)</label>
                      <input
                        type="number"
                        value={diffInput}
                        onChange={(e) => setDiffInput(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-white/40 font-bold">Estimated CPC ($)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cpcInput}
                        onChange={(e) => setCpcInput(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-primary/50 text-xs"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isCompilingForecast}
                      className="sm:col-span-2 lg:col-span-4 mt-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isCompilingForecast ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Compiling Models...
                        </>
                      ) : (
                        <>
                          <Maximize2 className="w-4 h-4" /> Generate 90d Projection Matrix
                        </>
                      )}
                    </button>
                  </form>

                  {/* Projections charts & analytics output */}
                  {forecastResult && (
                    <div className="space-y-8 border-t border-white/5 pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white/40 text-[10px] font-bold">Traffic Growth Lift</div>
                          <div className="text-2xl font-black text-white mt-1">+{forecastResult.trafficGrowthPercent}%</div>
                          <div className="text-white/30 text-[9px]">estimated within 90 days</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white/40 text-[10px] font-bold">Monthly Conversions</div>
                          <div className="text-2xl font-black text-accent mt-1">{forecastResult.projectedConversions90d}</div>
                          <div className="text-white/30 text-[9px]">assumes 2.2% baseline conversions</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white/40 text-[10px] font-bold">Value Growth Pipeline</div>
                          <div className="text-2xl font-black text-emerald-400 mt-1">+${forecastResult.valueGrowthUsd}</div>
                          <div className="text-white/30 text-[9px]">traffic CPC value gain</div>
                        </div>
                      </div>

                      {/* Projections Chart */}
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-white">90-Day Organic Value Progression Projections</div>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectionChartData}>
                              <defs>
                                <linearGradient id="projColor" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                              <Tooltip contentStyle={{ background: '#080816', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} />
                              <Area type="monotone" dataKey="value" stroke="#7c3aed" fillOpacity={1} fill="url(#projColor)" name="Value ($)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Agency White Label Configuration Tab */}
            {activeTab === "whitelabel" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="glass-dark border border-white/5 p-8 rounded-3xl space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" /> Agency White-Label & Custom Branding
                  </h3>

                  <form onSubmit={handleSaveWhiteLabel} className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white">Enable White-Label Overrides</h4>
                        <p className="text-white/40 text-xs">Injects your custom agency name across platform dashboards and generated reports.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={whiteLabel.isEnabled}
                        onChange={(e) => setWhiteLabel({ ...whiteLabel, isEnabled: e.target.checked })}
                        className="w-10 h-5 bg-white/10 border-white/20 rounded focus:ring-0 cursor-pointer accent-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold">Agency Name</label>
                        <input
                          type="text"
                          value={whiteLabel.companyName}
                          onChange={(e) => setWhiteLabel({ ...whiteLabel, companyName: e.target.value })}
                          placeholder="My Creative Agency"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 text-xs"
                          required={whiteLabel.isEnabled}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-white/40 font-bold">Agency Domain URL (Optional)</label>
                        <input
                          type="text"
                          value={whiteLabel.customDomain || ""}
                          onChange={(e) => setWhiteLabel({ ...whiteLabel, customDomain: e.target.value })}
                          placeholder="portal.myagency.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSavingWhiteLabel}
                      className="px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSavingWhiteLabel ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving Configurations...
                        </>
                      ) : (
                        <>
                          <Sliders className="w-4 h-4" /> Save White-Label Layout
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Distributed Tracing Observability Tab */}
            {activeTab === "observability" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="glass-dark border border-white/5 p-8 rounded-3xl space-y-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" /> Live Distributed Agent Telemetry Tracing
                  </h3>

                  {telemetrySummary && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-white/40 text-[10px] font-bold uppercase">Average Execution Latency</div>
                        <div className="text-2xl font-black text-white mt-1">{telemetrySummary.averageLatencyMs}ms</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-white/40 text-[10px] font-bold uppercase">SLA Pass Ratio (1.5s limit)</div>
                        <div className="text-2xl font-black text-emerald-400 mt-1">{telemetrySummary.slaPassRatePercent}%</div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <div className="text-white/40 text-[10px] font-bold uppercase">SLA Error Ratio</div>
                        <div className="text-2xl font-black text-yellow-400 mt-1">{telemetrySummary.errorRatio * 100}%</div>
                      </div>
                    </div>
                  )}

                  {/* Active trace logs list */}
                  <div className="space-y-4">
                    <div className="text-xs text-white font-bold">Span History Tracer</div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                      {spans.length === 0 ? (
                        <div className="text-center py-8 text-white/30 text-xs">No active telemetry logged. Execute dynamic loops first.</div>
                      ) : (
                        spans.map((span) => (
                          <div key={span.spanId} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                            <div className="space-y-1">
                              <div className="font-bold text-white">{span.name}</div>
                              <div className="text-white/40 text-[10px]">{new Date(span.timestamp).toLocaleTimeString()} • ID: {span.spanId}</div>
                            </div>
                            <div className="text-right space-y-1">
                              <span className="text-primary font-bold">{span.durationMs}ms</span>
                              <div className={`text-[10px] ${span.statusCode === 200 ? 'text-emerald-400' : 'text-danger'}`}>
                                Status: {span.statusCode}
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Sidebar (1 col) - Optimization outcome ledger & metering limits */}
        <div className="space-y-8">
          
          {/* Credits metering widget */}
          <div className="glass-dark border border-white/5 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Metred SaaS Credit Consumption
            </h4>
            
            <div className="space-y-3">
              {usageLogs.length === 0 ? (
                <div className="text-center py-6 text-white/30 text-xs">No billing logs detected.</div>
              ) : (
                usageLogs.slice(0, 3).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white truncate max-w-[150px]">{log.action}</span>
                      <span className="text-primary">-{log.creditsConsumed} Credit</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-white/30">
                      <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                      <span>{log.remainingCredits} Left</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Self-improving learning outcome history ledger */}
          <div className="glass-dark border border-white/5 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-accent" /> Reinforcement Learning Ledger
            </h4>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {outcomes.length === 0 ? (
                <div className="text-center py-8 text-white/30 text-xs">No outcome ledger found.</div>
              ) : (
                outcomes.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white uppercase tracking-wider text-[9px]">{item.optimizationType}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        item.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/60 text-[11px] leading-relaxed">{item.details}</p>
                    <div className="flex items-center justify-between text-[10px] text-white/30 border-t border-white/5 pt-2">
                      <span>Rank: {item.crawledRankBefore} → {item.crawledRankAfter}</span>
                      {item.conversionLift > 0 && (
                        <span className="text-emerald-400 font-bold">+{item.conversionLift}% Lift</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
