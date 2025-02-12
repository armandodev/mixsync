import type { Result } from "../types/result";
import type {
  YouTubeSearchResponse,
  YouTubeSearchResultItem,
} from "../types/youtube";

export async function getYouTubeSearchResults(
  query: string
): Promise<Result[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error(
      "YouTube API Key no está configurada en las variables de entorno"
    );
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${apiKey}&type=video&maxResults=20`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error al obtener los resultados de búsqueda de YouTube");
  }

  const data: YouTubeSearchResponse = await response.json();
  if (!data.items) {
    return [];
  }

  const results: Result[] = data.items.map((item: YouTubeSearchResultItem) => {
    const videoId = item.id.videoId;
    const snippet = item.snippet;
    return {
      id: videoId as string,
      title: snippet.title,
      artist: snippet.channelTitle,
      image:
        snippet.thumbnails.high?.url || snippet.thumbnails.default?.url || "",
      url: `https://www.youtube.com/watch?v=${videoId}`,
      origin: "youtube",
    };
  });

  return results;
}
