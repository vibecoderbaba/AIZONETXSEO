// Simulated AI SEO Anomaly & Daily Alerts Scheduler
// Feeds the alert center with real-world context alerts to establish daily stickiness

export interface AnomalyAlert {
  id: string;
  type: "warning" | "success" | "info" | "critical";
  title: string;
  description: string;
  impact: string;
  createdAt: string;
  fixed: boolean;
}

export function getActiveAnomalyAlerts(seedKeyword = "make money online"): AnomalyAlert[] {
  const seedBrand = seedKeyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return [
    {
      id: "alert_1",
      type: "critical",
      title: "Sudden Core Web Vitals (LCP) Increase",
      description: "Page load latency spiked by 1800ms over the last 24 hours due to massive static asset sizes.",
      impact: "-5% conversion probability",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      fixed: false
    },
    {
      id: "alert_2",
      type: "warning",
      title: "Competitor Rank Surged for Core Keyword",
      description: `A rival domain published a 2500-word topic silo matching "${seedBrand} Strategies", outranking your spoke page.`,
      impact: "-15% search traffic share",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      fixed: false
    },
    {
      id: "alert_3",
      type: "success",
      title: "Google Crawl Verification Successful",
      description: "Verified canonical tags and Schema JSON-LD blocks indexed cleanly on your index sitemap.",
      impact: "Captured Rich SERP snippet features",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      fixed: true
    }
  ];
}
