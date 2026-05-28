import { NextRequest, NextResponse } from "next/server";
import { syncTaskToThirdParty } from "@/lib/integration/task-sync";
import { publishToCMS } from "@/lib/integration/cms";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { action, platform, title, body, priority, metaDescription } = await req.json();

    if (!action || !platform || !title) {
      return NextResponse.json({ error: "Action, platform, and title parameters are required" }, { status: 400 });
    }

    let result;

    if (action === "task") {
      result = await syncTaskToThirdParty({
        platform: platform.toLowerCase(),
        title,
        description: body || "AI SEO Task description",
        priority: priority || "medium"
      });
    } else if (action === "cms") {
      result = await publishToCMS({
        platform: platform.toLowerCase(),
        title,
        body: body || "AI SEO Generated Article Content",
        metaDescription: metaDescription || "AI SEO metadata",
        status: "draft"
      });
    } else {
      return NextResponse.json({ error: "Invalid action type" }, { status: 400 });
    }

    // Persist execution log in database if workspace exists to log operational history
    try {
      const workspace = await db.workspace.findFirst();
      if (workspace) {
        await db.creditLedger.create({
          data: {
            workspaceId: workspace.id,
            amount: 0, // execution itself doesn't deduct starting credits
            description: `One-Click Sync Execution: ${platform.toUpperCase()} [${title.slice(0, 30)}...]`
          }
        });
      }
    } catch (dbError) {
      console.warn("Could not log execution sync into database ledger:", dbError);
    }

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error: any) {
    console.error("Integration Sync API error:", error);
    return NextResponse.json({ error: error.message || "Failed to execute sync operation" }, { status: 500 });
  }
}
