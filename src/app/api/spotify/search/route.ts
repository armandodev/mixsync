import { getSpotifySearchResults } from "@/utils/spotify";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (!q) {
    return Response.json({ error: "Falta el parámetro 'q'" }, { status: 400 });
  }
  try {
    const results = await getSpotifySearchResults(q);
    return Response.json({ results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    return Response.json({ error: message }, { status: 500 });
  }
}
