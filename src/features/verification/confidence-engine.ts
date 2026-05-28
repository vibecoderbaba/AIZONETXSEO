// Scientific SEO Confidence & ROI Modeling Engine
// Implements robust algorithmic priority estimators to score ranking impact logically.

export interface PriorityModel {
  title: string;
  volume: number;
  difficulty: number;
  complexity: number; // 1-5 (1: Easy, 5: Hard)
}

export interface MetricEstimation {
  confidenceScore: number;
  priorityScore: number;
  trafficLiftPercent: number;
  complexityLevel: "low" | "medium" | "high";
  timeframeWeeks: number;
}

export function computeMetricEstimation(model: PriorityModel): MetricEstimation {
  // Confidence increases with higher search volumes and lower difficulties
  const confidenceScore = Math.round(Math.min(98, Math.max(50, 100 - model.difficulty * 0.6 + (model.volume > 2000 ? 5 : 0))));

  // ROI Priority Score = (Search Volume * (100 - Difficulty)) / Complexity Factor
  const rawPriority = (model.volume * (100 - model.difficulty)) / (model.complexity * 10);
  const priorityScore = Math.round(Math.min(99, Math.max(10, rawPriority / 20)));

  // Expected Traffic Lift percentage estimation
  const trafficLiftPercent = Math.round(Math.min(45, Math.max(8, (100 - model.difficulty) * 0.4)));

  const complexityLevel = model.complexity <= 2 ? "low" : model.complexity <= 4 ? "medium" : "high";
  const timeframeWeeks = model.complexity * 2;

  return {
    confidenceScore,
    priorityScore,
    trafficLiftPercent,
    complexityLevel,
    timeframeWeeks
  };
}
