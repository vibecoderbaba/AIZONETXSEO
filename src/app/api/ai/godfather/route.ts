import { NextRequest, NextResponse } from "next/server";
import { executeGodfatherAgentsLoop } from "@/features/collaboration/multi-agent";
import { compilePredictiveForecast, generateVolatilityForecast } from "@/features/predictive/forecaster";
import { computeSelfImprovingHeuristics, getOptimizationHistory } from "@/features/learning/reinforcement";
import { recordSpan, computeTelemetrySummary } from "@/lib/observability/tracer";
import { getWhiteLabelConfig, updateWhiteLabelConfig, getUsageLogs } from "@/features/billing/metering";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const { action, url, keyword, volume, difficulty, cpc, whiteLabel } = body;

    // 1. White-label Configuration save action
    if (action === "save_whitelabel") {
      const config = updateWhiteLabelConfig(whiteLabel);
      recordSpan("WhiteLabel:UpdateConfig", Date.now() - startTime, 200, { isEnabled: config.isEnabled });
      return NextResponse.json({ success: true, config });
    }

    // 2. Trigger Godfather multi-agent collaborative loop
    if (action === "execute_agents") {
      if (!url) {
        return NextResponse.json({ error: "URL parameter required" }, { status: 400 });
      }
      
      const agentState = executeGodfatherAgentsLoop(url);
      const latency = Date.now() - startTime;
      recordSpan("MultiAgent:ExecuteGodfatherLoop", latency, 200, { url, totalSteps: agentState.totalAgentSteps });
      
      return NextResponse.json({
        success: true,
        agentState,
        heuristics: computeSelfImprovingHeuristics()
      });
    }

    // 3. Compile Forecasting Predictions
    if (action === "compile_forecast") {
      if (!keyword) {
        return NextResponse.json({ error: "Keyword parameter required" }, { status: 400 });
      }

      const kwVolume = Number(volume) || 1200;
      const kwDiff = Number(difficulty) || 45;
      const kwCpc = Number(cpc) || 1.8;

      const forecast = compilePredictiveForecast(keyword, kwVolume, kwDiff, kwCpc);
      const volatility = generateVolatilityForecast();
      
      const latency = Date.now() - startTime;
      recordSpan("PredictiveSEO:CompileForecast", latency, 200, { keyword, volume: kwVolume });

      return NextResponse.json({
        success: true,
        forecast,
        volatility
      });
    }

    return NextResponse.json({ error: "Invalid action specified" }, { status: 400 });
  } catch (err: any) {
    const latency = Date.now() - startTime;
    recordSpan("GodfatherApi:Error", latency, 500, { error: err.message });
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  const startTime = Date.now();
  try {
    const heuristics = computeSelfImprovingHeuristics();
    const history = getOptimizationHistory();
    const telemetry = computeTelemetrySummary();
    const whiteLabel = getWhiteLabelConfig();
    const usageLogs = getUsageLogs();

    recordSpan("GodfatherApi:GetTelemetrySummary", Date.now() - startTime, 200, {});

    return NextResponse.json({
      heuristics,
      history,
      telemetry,
      whiteLabel,
      usageLogs
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
