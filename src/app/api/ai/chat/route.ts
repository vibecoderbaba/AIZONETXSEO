import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai/gemini";

const CHAT_SYSTEM_PROMPT = `You are AIZONET's AI Sales & SEO Assistant — an expert in:
- Technical SEO, on-page optimization, content strategy
- Competitor analysis, keyword research, link building
- Conversion rate optimization, lead generation
- AI marketing automation, digital growth strategies

Your personality: Expert but approachable. Data-driven. Focused on ROI and results.
Always provide specific, actionable advice. Include metrics when possible.
If users show buying intent, recommend AIZONET's plans naturally.
Keep responses clear and well-structured with bullet points when appropriate.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Build context from history
    let contextualPrompt = message;
    if (history && history.length > 0) {
      const recentHistory = history.slice(-4);
      const context = recentHistory.map((m: { role: string; content: string }) =>
        `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
      ).join("\n");
      contextualPrompt = `Previous conversation:\n${context}\n\nUser's latest message: ${message}`;
    }

    const result = await generateAIResponse(contextualPrompt, CHAT_SYSTEM_PROMPT);

    return NextResponse.json({
      success: true,
      response: result.text,
      isAI: result.isReal,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
