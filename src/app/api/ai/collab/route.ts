import { NextRequest, NextResponse } from "next/server";
import { runMultiAgentCollaboration } from "@/lib/ai/engine";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Enterprise SaaS Credit & Plan enforcement
    // Retrieve default mock/first workspace from database (create if missing to keep database robust)
    let workspace = await db.workspace.findFirst();
    if (!workspace) {
      workspace = await db.workspace.create({
        data: {
          name: "Default Workspace",
          plan: "ENTERPRISE",
          credits: 100,
        }
      });
    }

    if (workspace.credits <= 0) {
      return NextResponse.json({ error: "Insufficient research credits! Please upgrade your plan." }, { status: 403 });
    }

    // Run the multi-agent collaboration state machine
    const result = await runMultiAgentCollaboration(parsedUrl.href);

    // Dynamic Credit Deduction & Ledger update inside a transaction
    await db.$transaction([
      db.workspace.update({
        where: { id: workspace.id },
        data: { credits: { decrement: 1 } }
      }),
      db.creditLedger.create({
        data: {
          workspaceId: workspace.id,
          amount: -1,
          description: `Autonomous Multi-Agent Collaboration Run: ${parsedUrl.hostname}`
        }
      }),
      db.report.create({
        data: {
          workspaceId: workspace.id,
          name: `Multi-Agent Audit - ${parsedUrl.hostname}`,
          url: parsedUrl.href,
          type: "audit",
          size: `${(JSON.stringify(result).length / 1024).toFixed(1)} KB`,
          score: result.overallHealthScore,
          pages: 5,
          data: result as any
        }
      })
    ]);

    // Create database entries for all 5 completed agent tasks dynamically
    const agentsList = Object.entries(result.agents);
    for (const [agentId, moduleResult] of agentsList) {
      await db.agentTask.create({
        data: {
          workspaceId: workspace.id,
          agentId,
          status: "COMPLETED",
          input: parsedUrl.href,
          output: JSON.stringify(moduleResult)
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
      remainingCredits: workspace.credits - 1
    });

  } catch (error: any) {
    console.error("Multi-Agent Collaboration API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to execute multi-agent collaboration" }, { status: 500 });
  }
}
