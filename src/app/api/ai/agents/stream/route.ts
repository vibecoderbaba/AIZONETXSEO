import { NextRequest } from "next/server";
import { streamAIResponse } from "@/lib/ai/gemini";
import { AGENTS } from "@/lib/ai/agents";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { agentId, message } = await req.json();

    if (!agentId || !message) {
      return new Response("Missing parameters", { status: 400 });
    }

    const agent = AGENTS.find((a) => a.id === agentId);
    if (!agent) {
      return new Response("Agent not found", { status: 404 });
    }

    const systemPrompt = agent.systemPrompt;

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of streamAIResponse(message, systemPrompt)) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err) {
          console.error("Agent streaming sub-error:", err);
          controller.enqueue(encoder.encode("Connection error while streaming. Please retry."));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Agent stream route error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
