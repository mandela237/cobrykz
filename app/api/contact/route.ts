import { NextResponse } from "next/server";
import { validateContactInquiry } from "@/lib/contact/validation";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MIN_COMPLETION_MS = 2500;
const attempts = new Map<string, number[]>();

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );

function isRateLimited(identifier: string) {
  const now = Date.now();
  const recent = (attempts.get(identifier) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );
  recent.push(now);
  attempts.set(identifier, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { message: "Submit the form using the contact page." },
      { status: 415 },
    );
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const identifier =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      { message: "Too many attempts. Please wait before trying again." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "The inquiry could not be read. Please review and try again." },
      { status: 400 },
    );
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ delivered: true });
  }

  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_COMPLETION_MS) {
    return NextResponse.json(
      { message: "Please take a moment to review your inquiry and try again." },
      { status: 400 },
    );
  }

  const result = validateContactInquiry(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Review the highlighted fields.", errors: result.errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? "info@cobrykz.com";
  if (!apiKey || !from) {
    return NextResponse.json(
      {
        message:
          "Online delivery is temporarily unavailable. Please email info@cobrykz.com.",
      },
      { status: 503 },
    );
  }

  const inquiry = result.data;
  const rows = [
    ["Name", inquiry.name],
    ["Work email", inquiry.email],
    ["Company", inquiry.company],
    ["Relevant solution", inquiry.solution],
    ["Timing", inquiry.timing],
    ["Preferred contact method", inquiry.contactMethod],
    ["Business challenge", inquiry.challenge],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: inquiry.email,
        subject: `Business inquiry from ${inquiry.company}`,
        html: rows
          .map(
            ([label, value]) =>
              `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
          )
          .join(""),
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Your inquiry was not delivered. Please try again or email info@cobrykz.com.",
        },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      {
        message:
          "Your inquiry was not delivered. Please try again or email info@cobrykz.com.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ delivered: true });
}
