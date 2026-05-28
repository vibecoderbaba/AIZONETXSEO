// Predictive SEO Forecasting and Competitor Trend Modeling System
// Calculates detailed potential traffic gains, CPC margins, volatility levels, and organic conversions.

export interface ForecastingMetrics {
  targetKeyword: string;
  volume: number;
  difficulty: number;
  currentTraffic: number;
  projectedTraffic90d: number;
  trafficGrowthPercent: number;
  projectedConversions90d: number;
  currentValueUsd: number;
  projectedValueUsd: number;
  valueGrowthUsd: number;
  volatilityIndex: "low" | "medium" | "high";
  competitorShiftProbabilityPercent: number;
}

export function compilePredictiveForecast(
  keyword: string,
  volume: number,
  difficulty: number,
  cpc: number
): ForecastingMetrics {
  // Current baseline assumption is a modest click share at lower ranks
  const currentTraffic = Math.round(volume * 0.02);
  const currentValueUsd = parseFloat((currentTraffic * cpc).toFixed(2));

  // If optimized properly: higher visibility targets. Less difficulty means faster gains.
  const trafficGrowthMultiplier = difficulty < 30 ? 1.45 : difficulty < 60 ? 1.28 : 1.15;
  const projectedTraffic90d = Math.round(currentTraffic * (1 + trafficGrowthMultiplier));
  const trafficGrowthPercent = Math.round(((projectedTraffic90d - currentTraffic) / currentTraffic) * 100);

  // Conversion modeling assumed at standard B2B conversion limits of 2.2%
  const projectedConversions90d = Math.round(projectedTraffic90d * 0.022);
  const projectedValueUsd = parseFloat((projectedTraffic90d * cpc).toFixed(2));
  const valueGrowthUsd = parseFloat((projectedValueUsd - currentValueUsd).toFixed(2));

  const volatilityIndex = difficulty > 75 ? "high" : difficulty > 45 ? "medium" : "low";
  
  // High difficulty means higher competitor battle shifting probability
  const competitorShiftProbabilityPercent = Math.round(Math.min(95, difficulty * 1.1));

  return {
    targetKeyword: keyword,
    volume,
    difficulty,
    currentTraffic,
    projectedTraffic90d,
    trafficGrowthPercent,
    projectedConversions90d,
    currentValueUsd,
    projectedValueUsd,
    valueGrowthUsd,
    volatilityIndex,
    competitorShiftProbabilityPercent
  };
}

export interface VolatilityTick {
  date: string;
  volatilityScore: number; // 0-100
}

export function generateVolatilityForecast(days = 6): VolatilityTick[] {
  const dates = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const baseline = [32, 28, 45, 52, 38, 41];
  
  return dates.map((date, idx) => ({
    date,
    volatilityScore: Math.round(baseline[idx] + (Math.random() * 8 - 4))
  }));
}
