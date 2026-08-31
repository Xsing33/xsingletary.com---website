import { NextRequest, NextResponse } from "next/server";

type DiagnosticSubmission = {
  name: string;
  email: string;
  company: string;
  items: { text: string; system: string }[];
};

function isValid(body: unknown): body is DiagnosticSubmission {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.company === "string" &&
    Array.isArray(b.items) &&
    b.items.length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields (name, email, at least one checked item)." },
      { status: 400 }
    );
  }

  // TODO(notion): this is the seam — once the Notion integration is ready, write
  // `body` (contact fields + checked items/systems) as a page/row there instead of
  // (or in addition to) this log line. For now this is the only durable record of
  // a submission, so treat this log as the source of truth until Notion lands.
  console.log(
    "[diagnostic-submit]",
    JSON.stringify({
      receivedAt: new Date().toISOString(),
      name: body.name,
      email: body.email,
      company: body.company,
      items: body.items,
    })
  );

  return NextResponse.json({ ok: true });
}
