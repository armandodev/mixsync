"use server";

import type {
  ErrorResponse,
  SearchTracksResponse,
  Track,
} from "@/types/spotify";
import type { Result } from "@/types/result";

let accessTokenCache: { token: string; expiresAt: number } | null = null;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const API_TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE_URL = "https://api.spotify.com/v1";

async function fetchAccessToken(): Promise<string> {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Ha ocurrido un error al configurar la autenticación con Spotify, por favor intenta nuevamente más tarde."
    );
  }
  const response = await fetch(API_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Error al autenticar con Spotify, por favor intenta nuevamente más tarde."
    );
  }

  const data = await response.json();
  const expiresAt = Date.now() + data.expires_in * 1000;
  accessTokenCache = { token: data.access_token, expiresAt };
  return data.access_token;
}

async function getAccessToken(): Promise<string> {
  if (accessTokenCache && accessTokenCache.expiresAt > Date.now() + 60000) {
    return accessTokenCache.token;
  }
  return await fetchAccessToken();
}

function validateErrorResponse(data: ErrorResponse) {
  let message = data.error.message;
  if (data.error.status === 400) {
    message = "Ingresa una solicitud válida.";
  }
  if (data.error.status === 401) {
    message =
      "Ha ocurrido un error de autorización, por favor intenta nuevamente más tarde.";
  }
  if (data.error.status === 403) {
    message =
      "No tienes permisos para acceder a esta función, por favor intenta nuevamente más tarde.";
  }
  if (data.error.status === 429) {
    message =
      "Hay demasiados pedidos en este momento, por favor intenta nuevamente más tarde.";
  }

  throw new Error(message);
}

export async function getTracks(q: string): Promise<Result[]> {
  const token = await getAccessToken();
  const response = await fetch(
    `${API_BASE_URL}/search?q=${encodeURIComponent(q)}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data: ErrorResponse = await response.json();
    validateErrorResponse(data);
  }

  const data: SearchTracksResponse = await response.json();

  return data.tracks.items.map((track) => ({
    id: track.id,
    image: track.album.images[1]?.url || "/default.png",
    url: track.external_urls.spotify,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
  }));
}

export async function getTrackById(id: string): Promise<Result> {
  const token = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const data: ErrorResponse = await response.json();
    validateErrorResponse(data);
  }
  const track: Track = await response.json();
  return {
    id: track.id,
    image: track.album.images[1]?.url || "/default.png",
    url: track.external_urls.spotify,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
  };
}
