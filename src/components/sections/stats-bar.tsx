"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12847, label: "Websites Audited", suffix: "+" },
  { value: 247, label: "Avg Traffic Boost", suffix: "%" },
  { value: 5, label: "AI Agents", suffix: "" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
];

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-8 py-6 relative group">
      <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-4xl font-black font-heading text-gradient tabular-nums">
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-sm text-white/40 font-medium">{stat.label}</div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="relative bg-[#050510] border-y border-white/5 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
