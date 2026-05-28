import { NextRequest, NextResponse } from "next/server";
import { runSEOAudit } from "@/lib/audit/seo-analyzer";
import { generateAIResponse } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    // Run the SEO audit
    const auditResult = await runSEOAudit(parsedUrl.href);

    // Get AI recommendations
    const aiPrompt = `You are a Senior Technical SEO Strategist and SaaS Growth Advisor. Analyze the following actual crawl diagnostic payload for ${parsedUrl.hostname} and formulate 3 immediate action priorities.

==================================================
CRAWLED DIAGNOSTICS & METRICS
==================================================
URL audited: ${auditResult.url}
Overall SEO Score: ${auditResult.overallScore}/100
- Technical SEO Category: ${auditResult.categories.technical.score}/100
- Content Metadata Category: ${auditResult.categories.content.score}/100
- User Experience Category: ${auditResult.categories.ux.score}/100
- Performance TTFB Latency Category: ${auditResult.categories.performance.score}/100
- E-E-A-T Authority Category: ${auditResult.categories.eeat.score}/100

Audited Issues Found (${auditResult.issues.length} total):
${auditResult.issues.slice(0, 5).map((issue, idx) => `${idx + 1}. [${issue.severity.toUpperCase()}] ${issue.title} - ${issue.description}`).join("\n")}

==================================================
STRICT DIRECTIVES — ZERO HALLUCINATIONS
==================================================
1. Base all recommendations exclusively on the real diagnostic findings listed above.
2. DO NOT invent or assume ranking numbers, traffic metrics, page weight bytes, backlinks count, loading durations, or brand authority indexes that are not explicitly defined in the data payload.
3. If an issue is absent from the crawl list above, do not mention it or propose fixes for it.
4. Keep priorities brief, highly strategic, and grounded entirely in evidence.

Formulate 3 strategic recommendations:`;

    const aiInsight = await generateAIResponse(aiPrompt);

    // If we have AI generated recommendations, parse them and embed them in the audit result
    if (aiInsight.text) {
      const parsedLines = aiInsight.text
        .split("\n")
        .map((line) => line.replace(/^[-*•\d\.\s]+/, "").trim()) // strip bullet or numbered lists
        .filter((line) => line.length > 10 && !line.toLowerCase().startsWith("recommendation") && !line.toLowerCase().startsWith("here are") && !line.includes("==="));

      if (parsedLines.length > 0) {
        auditResult.aiRecommendations = parsedLines.slice(0, 3);
      }
    }

    return NextResponse.json({
      success: true,
      data: auditResult,
      aiInsight: aiInsight.text,
      isAI: aiInsight.isReal,
    });
  } catch (error) {
    console.error("Audit error:", error);
    return NextResponse.json({ error: "Audit failed. Please try again." }, { status: 500 });
  }
}
