import { getSpotifySearchResults } from "./spotify";
import { getYouTubeSearchResults } from "./youtube";
import type { Result } from "../types/result";

export default async function getSearchResults(
  query: string,
  server: string
): Promise<Result[]> {
  if (server === "spotify") {
    return await getSpotifySearchResults(query);
  }
  if (server === "youtube") {
    return await getYouTubeSearchResults(query);
  }
  if (server === "all") {
    const spotifyResults = await getSpotifySearchResults(query);
    const youtubeResults = await getYouTubeSearchResults(query);
    return [...spotifyResults, ...youtubeResults];
  }
  return [];
}
