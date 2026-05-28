"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Zap, BarChart3, Bot, Brain, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const platformLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3, desc: "Your SEO command center" },
  { href: "/audit", label: "AI Audit", icon: Zap, desc: "Deep website analysis" },
  { href: "/agents", label: "AI Agents", icon: Bot, desc: "5 specialized AI experts" },
  { href: "/content", label: "Content AI", icon: Brain, desc: "Generate SEO content" },
];

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark border-b border-white/5 shadow-2xl shadow-black/50"
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
              <div className="absolute inset-1 bg-black rounded-md rotate-45 flex items-center justify-center">
                <span className="text-primary font-black text-xs rotate-[-45deg]">AI</span>
              </div>
            </div>
            <span className="font-heading font-black text-xl text-white tracking-tight">
              AIZO<span className="text-gradient">NET</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Platform Dropdown */}
            <div className="relative" onMouseEnter={() => setPlatformOpen(true)} onMouseLeave={() => setPlatformOpen(false)}>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all">
                Platform
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", platformOpen && "rotate-180")} />
              </button>
              {platformOpen && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="glass-dark rounded-2xl p-3 border border-white/8 shadow-2xl shadow-black/60">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-3 pb-2">AI Platform</div>
                    {platformLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <item.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{item.label}</div>
                          <div className="text-xs text-white/40">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <Link href="/dashboard" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all">
                        <Zap className="w-4 h-4" /> Launch Platform
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold overflow-hidden hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-400 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Zap className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Start Free Audit</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 inset-x-0 bottom-0 glass-dark border-t border-white/5 overflow-y-auto">
            <div className="p-6 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 pb-2">Platform</div>
              {platformLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-white/40">{item.desc}</div>
                  </div>
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 px-2 pb-2">Company</div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="pt-6 space-y-3">
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/30"
                >
                  <Zap className="w-4 h-4" /> Start Free Audit
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 rounded-xl border border-white/10 text-white/70 font-medium text-sm"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
