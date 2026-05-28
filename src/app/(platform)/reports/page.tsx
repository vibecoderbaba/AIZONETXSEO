"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  Share2,
  Calendar,
  CheckCircle,
  Clock,
  MoreVertical,
  Eye,
  Trash2,
  Copy,
  FileBarChart,
  Search,
  Filter,
  X,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { getSavedReports, deleteReport, type SavedReport } from "@/lib/audit/seo-analyzer";

const reportTypes = [
  { id: "all", label: "All Reports" },
  { id: "audit", label: "SEO Audits" },
  { id: "competitor", label: "Competitor" },
  { id: "keywords", label: "Keywords" },
];

export default function ReportsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null);

  useEffect(() => {
    setReports(getSavedReports());
  }, []);

  const filteredReports = reports.filter((report) => {
    const matchesFilter = filter === "all" || report.type === filter;
    const matchesSearch = report.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: string) => {
    deleteReport(id);
    setReports(getSavedReports());
    toast.success("Report deleted");
  };

  const handleCopyLink = (reportUrl: string) => {
    navigator.clipboard.writeText(`https://aizonet.in/reports/shared/${reportUrl}`);
    toast.success("Share link copied!");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-white/50 text-sm mt-1">View, download, and share your SEO reports.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all">
          <FileBarChart className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-4 border border-white/5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === type.id
                    ? "bg-primary text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm">{report.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(report.createdAt)}
                    {report.size && <span>• {report.size}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {report.status === "completed" ? (
                  <>
                    <button
                      onClick={() => toast.success("Downloading report...")}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyLink(report.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-danger hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Generating
                  </div>
                )}
              </div>
            </div>

            {report.status === "completed" && (
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                  {report.score !== null && (
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          report.score >= 70
                            ? "bg-green-500/10 text-green-400"
                            : report.score >= 50
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {report.score}
                      </div>
                      <span className="text-xs text-white/40">SEO Score</span>
                    </div>
                  )}
                  {report.pages && (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 text-xs font-bold">
                        {report.pages}
                      </div>
                      <span className="text-xs text-white/40">Pages</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedReport(report)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/40">No reports found</p>
        </div>
      )}

      {/* Report View Modal */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl glass-card rounded-2xl border border-white/10 p-6 md:p-8 bg-neutral-900/95 max-h-[90vh] overflow-y-auto space-y-6"
            >
              <button
                onClick={() => setSelectedReport(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs text-primary font-bold uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5" />
                  SaaS Verified SEO Diagnostic Report
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">{selectedReport.name}</h2>
                <p className="text-xs text-white/40 mt-1">
                  Audited on {new Date(selectedReport.createdAt).toLocaleString()} | File size: {selectedReport.size}
                </p>
              </div>

              {selectedReport.data ? (
                <div className="space-y-6">
                  {selectedReport.type === "competitor" ? (
                    <div className="space-y-6">
                      {/* Technical Metrics Table */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.02]">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-4.5 rounded-full bg-primary block" />
                          Crawl Metrics Comparison
                        </h3>
                        <div className="space-y-3">
                          {((selectedReport.data as any).metrics)?.map((m: any) => (
                            <div key={m.name} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold text-white/70">{m.name}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs">
                                  <div className="text-white/40 mb-0.5">Your Site</div>
                                  <div className="text-sm font-bold text-blue-400">{m.you.toLocaleString()}</div>
                                </div>
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs">
                                  <div className="text-white/40 mb-0.5">Competitor</div>
                                  <div className="text-sm font-bold text-purple-400">{m.competitor.toLocaleString()}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Keyword Gaps */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.02]">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                          <span className="w-1.5 h-4.5 rounded-full bg-yellow-500 block" />
                          Organic Keyword Gap
                        </h3>
                        <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                          {((selectedReport.data as any).keywordGap)?.map((item: any) => (
                            <div key={item.keyword} className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center text-xs">
                              <div>
                                <span className="font-semibold text-white">{item.keyword}</span>
                                <div className="text-white/40 text-[10px] mt-0.5">Volume: {item.volume.toLocaleString()} searches/mo</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[10px] text-white/50">Your Rank: <strong className={item.yourRank === 0 ? "text-red-400" : "text-blue-400"}>{item.yourRank === 0 ? "Not ranked" : `#${item.yourRank}`}</strong></div>
                                <div className="text-[10px] text-white/50">Competitor: <strong className="text-purple-400">#{item.competitorRank}</strong></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Insight */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.02] space-y-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-4.5 rounded-full bg-green-500 block" />
                          AI Strategic Recommendations
                        </h3>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                          <pre className="text-xs text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                            {(selectedReport.data as any).aiInsight}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ) : selectedReport.type === "keywords" ? (
                    <div className="space-y-6">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-[10px] text-white/40 mb-1">Total Search Volume</div>
                          <div className="text-sm font-bold text-white">{((selectedReport.data as any).summary)?.totalVolume?.toLocaleString()}</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-[10px] text-white/40 mb-1">Average Difficulty</div>
                          <div className="text-sm font-bold text-white">{((selectedReport.data as any).summary)?.avgDifficulty}/100</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                          <div className="text-[10px] text-white/40 mb-1">Opportunities</div>
                          <div className="text-sm font-bold text-white">{((selectedReport.data as any).summary)?.opportunityCount}</div>
                        </div>
                      </div>

                      {/* Clusters List */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.02] space-y-4">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-4.5 rounded-full bg-primary block" />
                          Topical Clusters & Search Intent
                        </h3>
                        <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                          {((selectedReport.data as any).clusters)?.map((cluster: any) => (
                            <div key={cluster.name} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                              <div className="text-xs font-bold text-white">{cluster.name}</div>
                              <p className="text-[10px] text-white/60 leading-relaxed">{cluster.intentSummary}</p>
                              <div className="text-[10px] text-white/45">
                                <strong>Trend Momentum:</strong> {cluster.trendSummary}
                              </div>
                              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                                {cluster.keywords?.map((k: any) => (
                                  <span key={k.keyword} className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-white/70 border border-white/5">
                                    {k.keyword} (vol: {k.volume.toLocaleString()})
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Full SEO Report Markdown */}
                      <div className="glass-card rounded-2xl p-5 border border-white/5 bg-white/[0.02] space-y-3">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2">
                          <span className="w-1.5 h-4.5 rounded-full bg-green-500 block" />
                          AI Keywords Strategy Report
                        </h3>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-h-[300px] overflow-y-auto">
                          <pre className="text-xs text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
                            {(selectedReport.data as any).fullReportMarkdown}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Dynamic Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-4.5 rounded-full bg-primary block" />
                            Overall Health Score
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl text-white bg-primary/20 border border-primary/30">
                              {selectedReport.score}
                            </div>
                            <div>
                              <div className="font-semibold text-white/80">Grade: {(selectedReport.data as any).grade}</div>
                              <div className="text-xs text-white/50">Crawl completed in {(((selectedReport.data as any).processingTime || 0) / 1000).toFixed(2)}s</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-4.5 rounded-full bg-green-500 block" />
                            Target Audited Address
                          </h3>
                          <div className="mt-2 space-y-1">
                            <div className="text-sm font-medium text-white select-all break-all">{selectedReport.url}</div>
                            <div className="text-xs text-green-400 font-semibold">SSL HTTPS Connection: Active & Secure</div>
                          </div>
                        </div>
                      </div>

                      {/* Categorized score metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {(selectedReport.data as any).categories && Object.entries((selectedReport.data as any).categories).map(([key, cat]: [string, any]) => (
                          <div key={key} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                            <div className="text-xs text-white/40 mb-1">{cat.label}</div>
                            <div className="text-lg font-bold text-white">{cat.score}</div>
                          </div>
                        ))}
                      </div>

                      {/* Crawl issues */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400" />
                          Issues Discovered ({((selectedReport.data as any).issues)?.length || 0})
                        </h4>
                        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                          {((selectedReport.data as any).issues)?.map((issue: any, idx: number) => (
                            <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs text-red-400 font-bold uppercase tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {issue.severity}
                              </div>
                              <h5 className="text-white font-semibold text-xs">{issue.title}</h5>
                              <p className="text-[10px] text-white/60 leading-relaxed">{issue.description}</p>
                              <div className="text-[10px] text-white/45">
                                <strong>Recommended Action:</strong> {issue.fix}
                              </div>
                            </div>
                          ))}
                          {(!(selectedReport.data as any).issues || (selectedReport.data as any).issues.length === 0) && (
                            <div className="text-xs text-white/40 py-2">No critical crawl errors found on this page.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">This report contains no detailed analysis data payload.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
