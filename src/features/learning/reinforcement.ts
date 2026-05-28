// Self-Improving Reinforcement Learning & Optimization Outcome Ledger
// Tracks previous optimizations and calculates success statistics to refine scoring engines dynamically.

export interface OptimizationOutcome {
  id: string;
  url: string;
  optimizationType: "metadata" | "schema" | "headings" | "performance";
  details: string;
  crawledRankBefore: number;
  crawledRankAfter: number;
  conversionLift: number; // percentage
  status: "success" | "failed" | "pending";
  trackedAt: string;
}

// In-Memory Simulation Database of continuous improvements
const optimizationDb: Map<string, OptimizationOutcome> = new Map();

// Seed data to give a realistic look on launch
const seedOutcomes: OptimizationOutcome[] = [
  {
    id: "opt_1",
    url: "https://aizonet.in/services/ai-seo-raipur",
    optimizationType: "metadata",
    details: "Adjusted title keyword density and meta tags",
    crawledRankBefore: 12,
    crawledRankAfter: 4,
    conversionLift: 18.5,
    status: "success",
    trackedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "opt_2",
    url: "https://aizonet.in/locations/raipur",
    optimizationType: "schema",
    details: "Deployed local LocalBusiness structured JSON-LD schema",
    crawledRankBefore: 7,
    crawledRankAfter: 2,
    conversionLift: 24.2,
    status: "success",
    trackedAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "opt_3",
    url: "https://aizonet.in/blog/ai-seo-tools",
    optimizationType: "performance",
    details: "Compressed hero image and removed rendering-blocking scripts",
    crawledRankBefore: 9,
    crawledRankAfter: 3,
    conversionLift: 15.0,
    status: "success",
    trackedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

seedOutcomes.forEach(item => optimizationDb.set(item.id, item));

export function logOptimization(
  url: string,
  type: OptimizationOutcome["optimizationType"],
  details: string,
  rankBefore: number
): OptimizationOutcome {
  const id = `opt_${Math.random().toString(36).substr(2, 9)}`;
  const outcome: OptimizationOutcome = {
    id,
    url,
    optimizationType: type,
    details,
    crawledRankBefore: rankBefore,
    crawledRankAfter: rankBefore, // pending tracking updates
    conversionLift: 0,
    status: "pending",
    trackedAt: new Date().toISOString()
  };
  optimizationDb.set(id, outcome);
  return outcome;
}

export function updateOutcome(id: string, rankAfter: number, lift: number): OptimizationOutcome | null {
  const existing = optimizationDb.get(id);
  if (!existing) return null;

  existing.crawledRankAfter = rankAfter;
  existing.conversionLift = lift;
  existing.status = rankAfter < existing.crawledRankBefore ? "success" : "failed";
  optimizationDb.set(id, existing);
  return existing;
}

export function getOptimizationHistory(): OptimizationOutcome[] {
  return Array.from(optimizationDb.values()).sort((a, b) => 
    new Date(b.trackedAt).getTime() - new Date(a.trackedAt).getTime()
  );
}

// Dynamically adjusts global learning factors based on success history
export interface SelfImprovingHeuristics {
  totalTracked: number;
  successRatePercent: number;
  averageRankLift: number;
  averageConversionLift: number;
  confidenceAdjustmentMultiplier: number;
}

export function computeSelfImprovingHeuristics(): SelfImprovingHeuristics {
  const outcomes = Array.from(optimizationDb.values());
  const completed = outcomes.filter(o => o.status !== "pending");
  if (completed.length === 0) {
    return {
      totalTracked: 0,
      successRatePercent: 0,
      averageRankLift: 0,
      averageConversionLift: 0,
      confidenceAdjustmentMultiplier: 1.0
    };
  }

  const success = completed.filter(o => o.status === "success");
  const successRatePercent = Math.round((success.length / completed.length) * 100);
  
  let totalRankLift = 0;
  let totalConversionLift = 0;
  completed.forEach(o => {
    totalRankLift += Math.max(0, o.crawledRankBefore - o.crawledRankAfter);
    totalConversionLift += o.conversionLift;
  });

  const averageRankLift = parseFloat((totalRankLift / completed.length).toFixed(1));
  const averageConversionLift = parseFloat((totalConversionLift / completed.length).toFixed(1));

  // The strategic model dynamically adapts itself. High success rates slightly improve
  // confidence scores, whereas failures lower priority multipliers to prevent risk.
  const confidenceAdjustmentMultiplier = parseFloat(
    Math.min(1.15, Math.max(0.85, 0.9 + (successRatePercent / 100) * 0.25)).toFixed(2)
  );

  return {
    totalTracked: outcomes.length,
    successRatePercent,
    averageRankLift,
    averageConversionLift,
    confidenceAdjustmentMultiplier
  };
}
