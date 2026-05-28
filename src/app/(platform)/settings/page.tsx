"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Globe,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Users,
  Key,
  Save,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getUserCredits, addCredits } from "@/lib/audit/seo-analyzer";
import { Zap, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    website: "",
    industry: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [credits, setCredits] = useState(5);

  useEffect(() => {
    const stored = localStorage.getItem("aizonet_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        name: parsed.name || "",
        email: parsed.email || "",
        website: parsed.website || "",
        industry: parsed.industry || "",
      });
    }
    setCredits(getUserCredits());

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab && ["profile", "notifications", "billing", "team", "api"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  const handleAddCredits = (amount: number, planName: string) => {
    addCredits(amount);
    setCredits(getUserCredits());
    toast.success(`Successfully recharged ${amount} credits on ${planName}!`);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    localStorage.setItem("aizonet_user", JSON.stringify(user));
    toast.success("Settings saved!");
    setIsLoading(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "team", label: "Team", icon: Users },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/50 text-sm mt-1">Manage your account preferences and configuration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-2 border border-white/5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-6">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="url"
                      value={user.website}
                      onChange={(e) => setUser({ ...user, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Industry</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <select
                      value={user.industry}
                      onChange={(e) => setUser({ ...user, industry: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select industry</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Technology">Technology</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: "Audit Complete", desc: "Get notified when an audit finishes", default: true },
                  { label: "Weekly Report", desc: "Receive weekly SEO performance summary", default: true },
                  { label: "Keyword Rankings", desc: "Alert when rankings change significantly", default: false },
                  { label: "Competitor Updates", desc: "Notify when competitors publish new content", default: false },
                  { label: "AI Agent Tasks", desc: "Updates on automated AI tasks", default: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                    <div>
                      <div className="font-medium text-white text-sm">{item.label}</div>
                      <div className="text-xs text-white/50">{item.desc}</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              {/* Billing Overview Card */}
              <div className="glass-card rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
                <h2 className="text-lg font-semibold text-white mb-6">Billing & Subscription</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Current Plan Bento */}
                  <div className="p-5 rounded-xl bg-primary/10 border border-primary/20 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-primary font-medium text-xs">Current Plan</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">Active</span>
                      </div>
                      <div className="text-2xl font-black text-white mb-1">Growth Tier</div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Access to advanced AI Keyword Research, Competitor Analysis, and E-E-A-T Auditing tools.
                      </p>
                    </div>
                  </div>

                  {/* Credits Balance Bento */}
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/50 text-xs">Available Credits</span>
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                      </div>
                      <div className="text-3xl font-black text-white mb-1 flex items-baseline gap-1">
                        {credits} <span className="text-xs font-normal text-white/40">Credits left</span>
                      </div>
                      <p className="text-xs text-white/45">
                        Each credit allows you to run 1 full website audit or keyword research crawl.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/60 font-medium hover:bg-white/5 hover:text-white transition-all cursor-pointer text-xs">
                    View Billing History
                  </button>
                </div>
              </div>

              {/* Dynamic Credit Top-up / Upgrades Panel */}
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-white flex items-center gap-2 pl-1">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Upgrade Plan & Recharge Credits
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Starter Pack",
                      credits: 10,
                      price: "$9",
                      desc: "Perfect for basic website audits and quick research.",
                      badge: "Best for Starters",
                      color: "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:border-blue-500/50"
                    },
                    {
                      name: "Professional Pack",
                      credits: 50,
                      price: "$29",
                      desc: "Ideal for growing agencies and marketing professionals.",
                      badge: "Most Popular",
                      color: "border-primary/20 text-primary bg-primary/5 hover:border-primary/50"
                    },
                    {
                      name: "Enterprise Unlimited",
                      credits: 250,
                      price: "$79",
                      desc: "Full-scale corporate crawls and semantic keyword maps.",
                      badge: "Best Value",
                      color: "border-purple-500/20 text-purple-400 bg-purple-500/5 hover:border-purple-500/50"
                    }
                  ].map((pkg) => (
                    <div 
                      key={pkg.name} 
                      className={`glass-card rounded-2xl p-5 border transition-all flex flex-col justify-between bg-white/[0.01] ${pkg.color}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-white/60">{pkg.name}</span>
                          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-extrabold uppercase text-white/50">{pkg.badge}</span>
                        </div>
                        <div className="text-3xl font-black text-white mb-2">{pkg.price}</div>
                        <div className="text-xs font-semibold text-primary mb-3">+{pkg.credits} Credits</div>
                        <p className="text-[11px] text-white/50 leading-relaxed mb-6">{pkg.desc}</p>
                      </div>

                      <button
                        onClick={() => handleAddCredits(pkg.credits, pkg.name)}
                        className="w-full flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all text-xs cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        Buy {pkg.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-6">Team Members</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{user.name || "You"}</div>
                      <div className="text-xs text-white/50">{user.email || "demo@aizonet.com"}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">Owner</span>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/60 font-medium hover:bg-white/5 transition-all">
                <Users className="w-4 h-4" />
                Invite Team Member
              </button>
            </div>
          )}

          {activeTab === "api" && (
            <div className="glass-card rounded-2xl p-6 border border-white/5">
              <h2 className="text-lg font-semibold text-white mb-6">API Keys</h2>
              <div className="p-4 rounded-xl bg-white/5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">Production API Key</span>
                  <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded-lg bg-black/30 text-white/60 text-sm font-mono">
                    aizonet_live_••••••••••••••••
                  </code>
                  <button
                    onClick={() => toast.success("API key copied!")}
                    className="px-3 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-white/60 font-medium hover:bg-white/10 transition-all">
                  Regenerate Key
                </button>
                <button className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white/60 font-medium hover:bg-white/5 transition-all">
                  View Docs
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
