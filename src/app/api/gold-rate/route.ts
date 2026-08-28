import { NextResponse } from "next/server";
import { goldRateConfig } from "@/config/goldRate";
import { goldRateService } from "@/lib/goldRate/goldRateService";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await goldRateService.getRates();

  return NextResponse.json(result, {
    status: result.status === "unavailable" ? 503 : 200,
    headers: {
      // Client-side polling controls freshness; avoid intermediary caches
      // serving a stale response past the service's own TTL.
      "Cache-Control": `private, max-age=0, s-maxage=${goldRateConfig.cacheSeconds}`,
    },
  });
}
