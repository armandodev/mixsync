import type { ErrorResponse, SearchTracksResponse } from "../types/spotify";
import type { Result } from "../types/result";

let accessTokenCache: { token: string; expiresAt: number } | null = null;

async function fetchAccessToken(): Promise<string> {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify Client ID y Client Secret no están configurados en las variables de entorno"
    );
  }
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID as string,
      client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al obtener el token de Spotify");
  }

  const data = await response.json();
  const expiresAt = Date.now() + data.expires_in * 1000;
  accessTokenCache = { token: data.access_token, expiresAt };
  return data.access_token;
}

export async function getAccessToken(): Promise<string> {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60000) {
    return accessTokenCache.token;
  }
  return await fetchAccessToken();
}

export async function getSpotifySearchResults(q: string): Promise<Result[]> {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(q)}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data: ErrorResponse = await response.json();

    let message = data.error.message;
    if (data.error.status === 400) {
      message = "Ingresa una solicitud válida.";
    }
    if (data.error.status === 401) {
      message = "Ha ocurrido un error de autorización. Intenta nuevamente.";
    }
    if (data.error.status === 403) {
      message = "No tienes permisos para acceder a esta función.";
    }
    if (data.error.status === 429) {
      message =
        "Hay demasiados pedidos en este momento. Por favor, inténtalo de nuevo.";
    }

    throw new Error(message);
  }

  const data: SearchTracksResponse = await response.json();

  return data.tracks.items.map((track) => ({
    id: track.id,
    image: track.album.images[1]?.url || "/default.png",
    url: track.external_urls.spotify,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    origin: "spotify",
  }));
}
