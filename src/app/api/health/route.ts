import { NextResponse } from 'next/server'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL
  if (dbUrl) {
    console.log(`[health] DATABASE_URL set, host: ${new URL(dbUrl).hostname}`)
  } else {
    console.log('[health] DATABASE_URL not set')
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    runtime: 'standalone',
    database: !!dbUrl,
  })
}
