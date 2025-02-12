// src/types/spotify.ts

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  width: number;
  url: string;
}

export interface Artist {
  id: string;
  name: string;
  href: string;
  uri: string;
  external_urls: ExternalUrls;
}

export interface Album {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  href: string;
  uri: string;
  images: Image[];
  artists: Artist[];
  available_markets: string[];
  is_playable?: boolean;
  external_urls: ExternalUrls;
}

export interface ExternalIds {
  isrc: string;
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  track_number: number;
  disc_number: number;
  is_playable: boolean;
  is_local: boolean;
  preview_url: string | null;
  href: string;
  uri: string;
  external_urls: ExternalUrls;
  external_ids: ExternalIds;
  album: Album;
  artists: Artist[];
  available_markets: string[];
}

export interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SearchTracksResponse {
  tracks: PagingObject<Track>;
}

export interface ErrorResponse {
  error: {
    status: number;
    message: string;
  };
}
