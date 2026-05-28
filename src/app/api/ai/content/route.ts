import { NextRequest, NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { type, topic, keywords, tone = "professional" } = await req.json();

    const prompts: Record<string, string> = {
      blog: `Write a detailed SEO-optimized blog post outline about "${topic}". Include: H1 title, 6-8 H2 sections with bullet points, meta description (160 chars), target keyword strategy, and estimated word count. Format as structured markdown.`,
      meta: `Generate 3 compelling meta descriptions (150-160 characters each) for a page about "${topic}". Each should include: target keyword "${keywords}", clear value proposition, and call-to-action. Tone: ${tone}.`,
      title: `Generate 5 SEO-optimized title tags (50-60 chars each) for "${topic}". Include power words, numbers where appropriate, and keyword "${keywords}". Format as a numbered list.`,
      faq: `Create 8 FAQ items (question + 50-75 word answer) for "${topic}". Format for FAQ schema markup. Questions should cover informational, commercial, and navigational intent.`,
      schema: `Generate JSON-LD schema markup for a "${topic}" page. Include: Organization, WebPage, FAQPage schemas. Add realistic placeholder values. Return only valid JSON.`,
      keywords: `Perform keyword research for "${topic}". Generate a table with 15 keywords including: keyword, estimated monthly searches (realistic numbers), difficulty (1-100), intent type, and opportunity score. Format as markdown table.`,
    };

    const prompt = prompts[type] || prompts.blog;
    const result = await generateAIResponse(prompt);

    return NextResponse.json({
      success: true,
      content: result.text,
      type,
      topic,
      isAI: result.isReal,
    });
  } catch (error) {
    console.error("Content generation error:", error);
    return NextResponse.json({ error: "Content generation failed" }, { status: 500 });
  }
}
