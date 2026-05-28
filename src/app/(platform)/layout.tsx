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
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Upgrade button */}
            <Link
              href="/settings?tab=billing"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upgrade
            </Link>

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

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
