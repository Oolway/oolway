import { NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"

export const dynamic = "force-dynamic"

export async function GET() {
  // 1. Grab the DSN directly from the current execution context
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  try {
    throw new Error("Sentry Backend Test - Amit (Nuclear Option)")
  } catch (error) {
    // 2. FORCE initialize Sentry right here, right now, completely bypassing instrumentation.ts
    if (dsn) {
      Sentry.init({
        dsn: dsn,
        tracesSampleRate: 1.0,
      })
    }

    Sentry.captureException(error)
    await Sentry.flush(2000)

    // 3. Return the exact diagnostic data to your browser
    return NextResponse.json(
      {
        error: "Backend crashed on purpose",
        diagnostics: {
          dsn_found_in_runtime: !!dsn,
          dsn_preview: dsn
            ? `${dsn.substring(0, 15)}...`
            : "COMPLETELY MISSING",
          node_env: process.env.NODE_ENV,
          vercel_env: process.env.VERCEL_ENV,
        },
      },
      { status: 500 }
    )
  }
}
