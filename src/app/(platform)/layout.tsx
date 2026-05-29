"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Bot,
  FileText,
  Target,
  Search,
  BarChart3,
  Settings,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Command,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { addCredits } from "@/lib/audit/seo-analyzer";
import { toast } from "react-hot-toast";
import { X, Check } from "lucide-react";

const platformNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/godfather", label: "Godfather AI", icon: Sparkles },
  { href: "/audit", label: "AI Audit", icon: Zap },
  { href: "/agents", label: "AI Agents", icon: Bot },
  { href: "/content", label: "Content AI", icon: FileText },
  { href: "/competitor", label: "Competitors", icon: Target },
  { href: "/keywords", label: "Keywords", icon: Search },
  { href: "/reports", label: "Reports", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const filtered = platformNav.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const onSelect = (href: string) => {
    router.push(href);
    onClose();
    setSearch("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
          <Command className="w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none"
            autoFocus
          />
          <kbd className="px-2 py-1 rounded bg-white/10 text-white/40 text-xs">ESC</kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-white/40 text-sm">No commands found</div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.href}
                onClick={() => onSelect(item.href)}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-white">{item.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState(3);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [notificationList, setNotificationList] = useState([
    { id: "n_1", text: "Raipur Real Estate sitemap auto-sync completed", time: "5 mins ago", isRead: false },
    { id: "n_2", text: "Crawler flagged LCP latency issue on services route", time: "1 hour ago", isRead: false },
    { id: "n_3", text: "Godfather predictive forecast successfully compiled", time: "2 hours ago", isRead: false },
  ]);

  // Load user from localStorage (mock auth)
  useEffect(() => {
    const stored = localStorage.getItem("aizonet_user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      // Create demo user if none exists
      const demoUser = { name: "Demo User", email: "demo@aizonet.com" };
      localStorage.setItem("aizonet_user", JSON.stringify(demoUser));
      setUser(demoUser);
    }
  }, []);

  // Cmd+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aizonet_user");
    router.push("/");
  };

  const handleMarkAllRead = () => {
    setNotificationList(prev => prev.map(item => ({ ...item, isRead: true })));
    setNotifications(0);
    toast.success("All notifications marked as read");
  };

  const handlePurchaseCredits = (amount: number, packageName: string) => {
    addCredits(amount);
    setUpgradeOpen(false);
    toast.success(`Successfully refilled +${amount} credits (${packageName})!`);
    
    // Dispatch a custom event so other components (e.g. settings/dashboard) refresh their balance instantly
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("credits_updated"));
    }
  };

  return (
    <div className="min-h-screen bg-[#030308] flex">
      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 z-40 glass-dark border-r border-white/5 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-45" />
              <div className="absolute inset-1 bg-black rounded-md rotate-45 flex items-center justify-center">
                <span className="text-primary font-black text-xs rotate-[-45deg]">AI</span>
              </div>
            </div>
            {!collapsed && (
              <span className="font-heading font-black text-lg text-white">
                AIZO<span className="text-gradient">NET</span>
              </span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {platformNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-4 left-4 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Main content area */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          collapsed ? "ml-16" : "ml-64"
        )}
      >
        {/* Header */}
        <header className="h-16 glass-dark border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30">
          {/* Search trigger */}
          <button
            onClick={() => setCommandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 hover:text-white/60 transition-colors"
          >
            <Command className="w-4 h-4" />
            <span className="text-sm">Search</span>
            <kbd className="ml-2 px-1.5 py-0.5 rounded bg-white/10 text-white/40 text-xs">⌘K</kbd>
          </button>



          {/* Right side */}
          <div className="flex items-center gap-3 relative">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={cn(
                  "relative w-9 h-9 rounded-lg border flex items-center justify-center transition-colors",
                  notificationsOpen
                    ? "bg-primary/20 border-primary text-primary"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                )}
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Overlay */}
              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationsOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 z-50 glass-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Alerts & Telemetry</h4>
                      {notifications > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[10px] text-primary hover:underline font-bold"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                      {notificationList.map((not) => (
                        <div
                          key={not.id}
                          className={cn(
                            "p-2.5 rounded-xl border text-xs leading-relaxed transition-all",
                            not.isRead
                              ? "bg-white/5 border-white/5 text-white/50"
                              : "bg-primary/10 border-primary/20 text-white font-medium"
                          )}
                        >
                          <p>{not.text}</p>
                          <span className="text-[9px] text-white/20 mt-1 block">{not.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Upgrade button */}
            <button
              onClick={() => setUpgradeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all cursor-pointer border-0 outline-none"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade
            </button>

            {/* User menu */}
            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-white">{user?.name || "Demo User"}</div>
                <div className="text-xs text-white/40">{user?.email || "demo@aizonet.com"}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <button
                onClick={handleLogout}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-danger transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Upgrade pricing modal overlay */}
        {upgradeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setUpgradeOpen(false)} />
            
            <div className="relative w-full max-w-4xl glass-dark border border-white/10 rounded-3xl overflow-hidden p-8 md:p-12 shadow-2xl space-y-8 animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setUpgradeOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-xs text-primary font-bold">
                  <Sparkles className="w-3 h-3" /> Growth Boost Options
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-black text-white">
                  Add Account <span className="text-gradient">Credits</span> Tiers
                </h2>
                <p className="text-white/50 text-sm max-w-lg mx-auto">
                  Top up credits to trigger more real-time site crawler audits, SEO organic keyword research dashboards, and multi-agent collaborations.
                </p>
              </div>

              {/* Grid Pricing Plans */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Pack 1 */}
                <div className="glass-dark border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-primary/30 transition-all">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white/70">Starter Top-Up</h3>
                    <div className="text-3xl font-black text-white font-heading">+10 <span className="text-sm text-white/50">Credits</span></div>
                    <p className="text-white/40 text-xs leading-relaxed">Perfect for simple छत्तीसगढ़ single-page audits or fast landing conversions checks.</p>
                  </div>
                  <button
                    onClick={() => handlePurchaseCredits(10, "Starter Pack")}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all border border-white/10"
                  >
                    Buy Pack for $9
                  </button>
                </div>

                {/* Pack 2 */}
                <div className="glass-dark border border-primary/30 p-6 rounded-2xl flex flex-col justify-between space-y-6 relative overflow-hidden bg-primary/5 hover:scale-[1.02] transition-all">
                  <div className="absolute top-0 right-0 bg-primary px-3 py-1 text-[9px] font-black text-white rounded-bl-xl uppercase tracking-wider">Most Popular</div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-primary">Professional Growth</h3>
                    <div className="text-3xl font-black text-white font-heading">+50 <span className="text-sm text-white/50">Credits</span></div>
                    <p className="text-white/40 text-xs leading-relaxed">Ideal for Raipur multi-domain competitive tracking and dynamic keywords cluster modeling.</p>
                  </div>
                  <button
                    onClick={() => handlePurchaseCredits(50, "Pro Pack")}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-bold transition-all shadow-lg shadow-primary/20"
                  >
                    Buy Pack for $29
                  </button>
                </div>

                {/* Pack 3 */}
                <div className="glass-dark border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-6 hover:border-accent/30 transition-all">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white/70">Agency Unlimited</h3>
                    <div className="text-3xl font-black text-white font-heading">+250 <span className="text-sm text-white/50">Credits</span></div>
                    <p className="text-white/40 text-xs leading-relaxed">High volume operations. Automate monthly SEO reporting, deep crawls, and telemetry.</p>
                  </div>
                  <button
                    onClick={() => handlePurchaseCredits(250, "Agency Pack")}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all border border-white/10"
                  >
                    Buy Pack for $79
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
