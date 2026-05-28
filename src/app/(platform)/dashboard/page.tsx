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
  Settings,
  Plus,
  ArrowRight,
  RotateCcw,
  Check
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

import { getSavedReports, getUserCredits } from "@/lib/audit/seo-analyzer";
import { getActiveAnomalyAlerts, type AnomalyAlert } from "@/lib/alerts/scheduler";

// Recharts Progression Mock Datasets
const cwvData = [
  { name: "Dec", ttfb: 480, lcp: 3.8 },
  { name: "Jan", ttfb: 420, lcp: 3.5 },
  { name: "Feb", ttfb: 390, lcp: 2.9 },
  { name: "Mar", ttfb: 350, lcp: 2.6 },
  { name: "Apr", ttfb: 290, lcp: 2.2 },
  { name: "May", ttfb: 210, lcp: 1.8 }
];

const trafficGrowthData = [
  { name: "Dec", you: 12000, competitor: 15000 },
  { name: "Jan", you: 14500, competitor: 16200 },
  { name: "Feb", you: 18000, competitor: 17500 },
  { name: "Mar", you: 21000, competitor: 19800 },
  { name: "Apr", you: 24500, competitor: 22000 },
  { name: "May", you: 29800, competitor: 25400 }
];

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  stage: "todo" | "progress" | "synced";
  platformSynced?: string;
  syncedUrl?: string;
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [credits, setCredits] = useState(5);
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  
  // Kanban Task States
  const [tasks, setTasks] = useState<KanbanTask[]>([
    {
      id: "t_1",
      title: "Compress Static Images in Raipur Silos",
      description: "Compress hero banner images to lower LCP speeds from 4.2s to under 2.5s.",
      priority: "high",
      stage: "todo"
    },
    {
      id: "t_2",
      title: "Deploy Organization JSON-LD Schema",
      description: "Embed structured metadata schema inside layouts footer to capture Google rich snippet badges.",
      priority: "medium",
      stage: "todo"
    },
    {
      id: "t_3",
      title: "Optimize Raipur Real Estate H2 Heading Density",
      description: "Inject local target keywords naturally inside the landing page headers to address rankings gaps.",
      priority: "high",
      stage: "progress"
    }
  ]);

  // Modals & Forms States
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium");

  const [activeSyncTask, setActiveSyncTask] = useState<KanbanTask | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReports(getSavedReports());
    setCredits(getUserCredits());
    setAlerts(getActiveAnomalyAlerts());
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
      change: latestAudit ? "Audited Live" : "Baseline State",
      trend: "up",
      icon: Target,
      color: "#3B82F6"
    },
    {
      label: "Organic Traffic",
      value: latestAudit ? `${(seoScore * 285).toLocaleString()}` : "24.5K",
      change: "+18.2% Growth",
      trend: "up",
      icon: TrendingUp,
      color: "#10B981"
    },
    {
      label: "Keywords Ranked",
      value: latestAudit ? Math.round(seoScore * 2.1) : 156,
      change: "Live Google Index",
      trend: "up",
      icon: Search,
      color: "#8B5CF6"
    },
    {
      label: "Backlinks Index",
      value: latestAudit ? (seoScore / 9.5).toFixed(1) : "1.2",
      change: "Authority Tier",
      trend: "up",
      icon: Globe,
      color: "#F59E0B",
      suffix: "K"
    }
  ];

  // Drag-and-drop simulated stage changes
  const moveTaskStage = (taskId: string, stage: "todo" | "progress" | "synced") => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, stage } : t));
    toast.success(`Task shifted to ${stage === "progress" ? "In Progress" : stage === "synced" ? "Synced" : "To Do"}`);
  };

  // Add custom manual tasks
  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: KanbanTask = {
      id: `task_${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || "Custom operational SEO task details.",
      priority: newTaskPriority,
      stage: "todo"
    };

    setTasks(prev => [...prev, task]);
    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskPriority("medium");
    setIsAddTaskOpen(false);
    toast.success("New SEO Task created on board!");
  };

  // Execute actual Sync pipeline via API Router post request
  const handleExecuteSync = async (platform: string) => {
    if (!activeSyncTask) return;
    setIsSyncing(true);

    try {
      const response = await fetch("/api/integration/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "task",
          platform,
          title: activeSyncTask.title,
          body: activeSyncTask.description,
          priority: activeSyncTask.priority
        })
      });

      if (!response.ok) throw new Error("Sync request failed");
      const json = await response.json();

      if (json.success) {
        setTasks(prev => prev.map(t => t.id === activeSyncTask.id ? {
          ...t,
          stage: "synced",
          platformSynced: json.data.platform,
          syncedUrl: json.data.taskUrl
        } : t));

        toast.success(`Task successfully synced to ${json.data.platform}!`);
      }
    } catch (err) {
      toast.error("Failed to synchronize task to target workspace");
    } finally {
      setIsSyncing(false);
      setActiveSyncTask(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            AI SEO Command Center
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] uppercase font-bold tracking-wider border border-primary/20">Active</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Autonomous growth monitoring and execution operating system.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
            <Zap className="w-3.5 h-3.5 text-primary fill-primary/20 animate-pulse" />
            <span>Balance: <strong className="text-white font-bold">{credits} Cr</strong></span>
          </div>
          <Link
            href="/audit"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Launch Audit
          </Link>
        </div>
      </div>

      {/* SEO Danger/Alert Warnings center */}
      <AnimatePresence>
        {alerts.filter(a => !a.fixed).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {alerts.filter(a => !a.fixed).map(alert => (
              <div key={alert.id} className="p-4 rounded-xl border border-red-500/10 bg-red-500/5 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm font-bold text-white">{alert.title}</strong>
                    <span className="px-2 py-0.2 rounded-full bg-red-500/20 text-red-400 text-[9px] font-bold uppercase tracking-wider">{alert.impact}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1 leading-relaxed">{alert.description}</p>
                </div>
                <button
                  onClick={() => {
                    const task: KanbanTask = {
                      id: `t_${Date.now()}`,
                      title: alert.title,
                      description: alert.description,
                      priority: "high",
                      stage: "todo"
                    };
                    setTasks(prev => [...prev, task]);
                    setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, fixed: true } : a));
                    toast.success("Alert compiled as actionable task on board!");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-white hover:bg-white/10 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Convert to Task
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dynamicStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-bold uppercase tracking-wider">
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white select-all">
              {stat.value}
              {stat.suffix && <span className="text-lg font-bold">{stat.suffix}</span>}
            </div>
            <div className="text-xs text-white/40 mt-1 uppercase tracking-wider font-semibold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Progression Graphs Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Web Vitals progression */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded bg-primary" />
              Core Web Vitals Progression
            </h3>
            <p className="text-xs text-white/40 mt-0.5">Historical latency checks measuring TTFB response times (ms) and LCP (s).</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cwvData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTtfb" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip contentStyle={{ background: "#121214", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px", color: "#fff" }} />
                <Area type="monotone" dataKey="ttfb" name="TTFB latency (ms)" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTtfb)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Competitor growth comparison */}
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-4.5 rounded bg-green-500" />
              Organic Traffic Comparison
            </h3>
            <p className="text-xs text-white/40 mt-0.5">6-month growth index matched against localized organic market competition.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
                <Tooltip contentStyle={{ background: "#121214", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "12px", color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }} />
                <Bar dataKey="you" name="Your Site Sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="competitor" name="Competitor Hub" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Kanban SEO Execution board */}
      <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI SEO Execution Task Board
            </h2>
            <p className="text-xs text-white/40 mt-0.5">Proactively execute recommended SEO upgrades. Sync tasks to third-party tools in one click.</p>
          </div>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 transition-all font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>

        {/* Task Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TO DO column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                To Do ({tasks.filter(t => t.stage === "todo").length})
              </span>
            </div>
            <div className="space-y-3 min-h-[250px] rounded-xl bg-white/[0.01] p-2 border border-dashed border-white/5">
              {tasks.filter(t => t.stage === "todo").map(task => (
                <div key={task.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all space-y-3 group relative">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{task.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex-shrink-0 ${
                      task.priority === "high" ? "bg-red-500/10 text-red-400" : task.priority === "medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{task.description}</p>
                  
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveSyncTask(task)}
                      className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-[10px] text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" /> Execute & Sync
                    </button>
                    <button
                      onClick={() => moveTaskStage(task.id, "progress")}
                      className="text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      Start <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.stage === "todo").length === 0 && (
                <div className="text-center py-12 text-white/35 text-xs">No pending tasks. Great job!</div>
              )}
            </div>
          </div>

          {/* IN PROGRESS column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                In Progress ({tasks.filter(t => t.stage === "progress").length})
              </span>
            </div>
            <div className="space-y-3 min-h-[250px] rounded-xl bg-white/[0.01] p-2 border border-dashed border-white/5">
              {tasks.filter(t => t.stage === "progress").map(task => (
                <div key={task.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/15 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug">{task.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider flex-shrink-0 ${
                      task.priority === "high" ? "bg-red-500/10 text-red-400" : task.priority === "medium" ? "bg-yellow-500/10 text-yellow-400" : "bg-blue-500/10 text-blue-400"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{task.description}</p>
                  
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveSyncTask(task)}
                      className="px-2.5 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-[10px] text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Zap className="w-3 h-3" /> Execute & Sync
                    </button>
                    <button
                      onClick={() => moveTaskStage(task.id, "todo")}
                      className="text-[10px] text-white/40 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Revert
                    </button>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.stage === "progress").length === 0 && (
                <div className="text-center py-12 text-white/35 text-xs">Move tasks here to begin working.</div>
              )}
            </div>
          </div>

          {/* SYNCED / COMPLETED column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-white/60 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Synced & Published ({tasks.filter(t => t.stage === "synced").length})
              </span>
            </div>
            <div className="space-y-3 min-h-[250px] rounded-xl bg-white/[0.01] p-2 border border-dashed border-white/5">
              {tasks.filter(t => t.stage === "synced").map(task => (
                <div key={task.id} className="p-4 rounded-xl border border-green-500/10 bg-green-500/5 hover:border-green-500/20 transition-all space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-white leading-snug flex items-center gap-1">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {task.title}
                    </h4>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{task.description}</p>
                  
                  {task.platformSynced && (
                    <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-green-400 font-bold uppercase tracking-wider">Synced to {task.platformSynced}</span>
                      </div>
                      {task.syncedUrl && (
                        <a
                          href={task.syncedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 rounded bg-green-500/15 hover:bg-green-500/25 border border-green-500/20 text-green-400 text-[10px] font-bold text-center block transition-all"
                        >
                          Open Live Task Link
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {tasks.filter(t => t.stage === "synced").length === 0 && (
                <div className="text-center py-12 text-white/35 text-xs">Execute sync integrations to complete actions!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MODALS & OVERLAYS SECTION
         ========================================== */}

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddTaskOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.form
              onSubmit={handleAddNewTask}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md glass-card rounded-2xl p-6 border border-white/10 bg-neutral-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="font-bold text-white text-base">Add New SEO Task</h3>
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(false)}
                  className="text-white/60 hover:text-white text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">Task Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Optimize localized headings sitemap"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">Description</label>
                  <textarea
                    placeholder="Add details, instructions, and target URLs..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors text-xs resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e: any) => setNewTaskPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors text-xs [&>option]:bg-[#121214] [&>option]:text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-primary text-white hover:bg-primary/95 transition-all text-xs cursor-pointer"
              >
                Create Task
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* Sync Workspace Execution Modal */}
      <AnimatePresence>
        {activeSyncTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card rounded-2xl p-6 border border-white/10 bg-neutral-900 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-primary" />
                    One-Click SEO Sync Execution
                  </h3>
                  <p className="text-[10px] text-white/40 mt-0.5">Select a destination workspace to deploy this upgrade immediately.</p>
                </div>
                <button
                  onClick={() => setActiveSyncTask(null)}
                  className="text-white/60 hover:text-white text-xs cursor-pointer"
                  disabled={isSyncing}
                >
                  Cancel
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] space-y-1.5">
                <span className="text-[9px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold uppercase tracking-wider">Active Task payload</span>
                <h4 className="text-white font-bold text-sm leading-tight mt-1">{activeSyncTask.title}</h4>
                <p className="text-xs text-white/50 mt-1 leading-relaxed">{activeSyncTask.description}</p>
              </div>

              {isSyncing ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <span className="text-xs text-white/60 font-medium">Connecting APIs and synchronizing live workspace logs...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Task Trackers Category */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Sync to Project Trackers</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { name: "Jira Service Desk", key: "jira", color: "#3B82F6" },
                        { name: "ClickUp Workspace", key: "clickup", color: "#8B5CF6" },
                        { name: "Trello Board", key: "trello", color: "#10B981" },
                        { name: "Notion Team Workspace", key: "notion", color: "#F59E0B" },
                        { name: "GitHub Issues", key: "github", color: "#EF4444" }
                      ].map(plat => (
                        <button
                          key={plat.key}
                          onClick={() => handleExecuteSync(plat.key)}
                          className="p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-white/10 text-xs font-bold text-white text-left transition-colors flex items-center justify-between cursor-pointer group"
                        >
                          {plat.name}
                          <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CMS direct publication Category */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <h5 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Direct Deploy to Website CMS</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "WordPress", key: "wordpress", color: "#21759B" },
                        { name: "Shopify Store", key: "shopify", color: "#96BF48" },
                        { name: "Webflow Layouts", key: "webflow", color: "#4353FF" }
                      ].map(cmsPlat => (
                        <button
                          key={cmsPlat.key}
                          onClick={async () => {
                            setIsSyncing(true);
                            try {
                              const response = await fetch("/api/integration/sync", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  action: "cms",
                                  platform: cmsPlat.key,
                                  title: activeSyncTask.title,
                                  body: activeSyncTask.description
                                })
                              });
                              if (!response.ok) throw new Error("CMS publication failed");
                              const json = await response.json();
                              if (json.success) {
                                setTasks(prev => prev.map(t => t.id === activeSyncTask.id ? {
                                  ...t,
                                  stage: "synced",
                                  platformSynced: json.data.platform,
                                  syncedUrl: json.data.postUrl
                                } : t));
                                toast.success(`Upgrade deployed live to ${json.data.platform}!`);
                              }
                            } catch {
                              toast.error("Failed to deploy changes to your CMS website");
                            } finally {
                              setIsSyncing(false);
                              setActiveSyncTask(null);
                            }
                          }}
                          className="p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-white/10 text-[10px] font-bold text-white text-center transition-colors cursor-pointer block"
                        >
                          {cmsPlat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
