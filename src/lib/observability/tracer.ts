// Distributed Agentic Tracing & SLA Observability System
// Measures execution latency metrics, audits SLA response benchmarks, and tracks agent span lifecycles.

export interface Span {
  spanId: string;
  name: string;
  parentSpanId?: string;
  durationMs: number;
  statusCode: number;
  metadata: Record<string, any>;
  timestamp: string;
}

const traceSpansDb: Span[] = [];

// Seed baseline metrics to populate dashboard immediately
const seedSpans: Span[] = [
  {
    spanId: "span_1",
    name: "CrawlEngine:InitDiagnostics",
    durationMs: 340,
    statusCode: 200,
    metadata: { targetUrl: "https://aizonet.in" },
    timestamp: new Date(Date.now() - 600000).toISOString()
  },
  {
    spanId: "span_2",
    name: "MultiAgent:ExecutePlanner",
    durationMs: 820,
    statusCode: 200,
    metadata: { activeAgentsCount: 5 },
    timestamp: new Date(Date.now() - 500000).toISOString()
  },
  {
    spanId: "span_3",
    name: "PredictiveSEO:ForecastCalculations",
    durationMs: 120,
    statusCode: 200,
    metadata: { keywordTarget: "AI marketing" },
    timestamp: new Date(Date.now() - 400000).toISOString()
  }
];

seedSpans.forEach(span => traceSpansDb.push(span));

export function recordSpan(
  name: string,
  durationMs: number,
  statusCode = 200,
  metadata: Record<string, any> = {},
  parentSpanId?: string
): Span {
  const spanId = `span_${Math.random().toString(36).substr(2, 9)}`;
  const span: Span = {
    spanId,
    name,
    parentSpanId,
    durationMs,
    statusCode,
    metadata,
    timestamp: new Date().toISOString()
  };
  traceSpansDb.push(span);
  
  // Cap history to 50 items to optimize memory footprint
  if (traceSpansDb.length > 50) {
    traceSpansDb.shift();
  }
  
  return span;
}

export function getTelemetrySpans(): Span[] {
  return [...traceSpansDb].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export interface TelemetrySummary {
  averageLatencyMs: number;
  slaPassRatePercent: number;
  totalSpansCount: number;
  errorRatio: number;
}

export function computeTelemetrySummary(slaThresholdMs = 1500): TelemetrySummary {
  if (traceSpansDb.length === 0) {
    return {
      averageLatencyMs: 0,
      slaPassRatePercent: 100,
      totalSpansCount: 0,
      errorRatio: 0
    };
  }

  let totalDuration = 0;
  let slaPassed = 0;
  let errorsCount = 0;

  traceSpansDb.forEach(span => {
    totalDuration += span.durationMs;
    if (span.durationMs <= slaThresholdMs) {
      slaPassed++;
    }
    if (span.statusCode >= 400) {
      errorsCount++;
    }
  });

  return {
    averageLatencyMs: Math.round(totalDuration / traceSpansDb.length),
    slaPassRatePercent: Math.round((slaPassed / traceSpansDb.length) * 100),
    totalSpansCount: traceSpansDb.length,
    errorRatio: parseFloat((errorsCount / traceSpansDb.length).toFixed(3))
  };
}
