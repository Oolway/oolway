import { NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // We intentionally break it
    throw new Error(`Sentry Backend Test - Amit (Turbopack Bypass)`)
  } catch (error) {
    // We manually hand the error directly to Sentry
    Sentry.captureException(error)

    // Then return the 500 so the browser knows it failed
    return NextResponse.json(
      { error: "Backend crashed on purpose" },
      { status: 500 }
    )
  }
}
