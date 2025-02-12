// src/types/youtube.ts

export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface YouTubeThumbnails {
  default: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeSearchResultId {
  kind: string;
  videoId?: string;
  channelId?: string;
  playlistId?: string;
}

export interface YouTubeSearchResultSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YouTubeSearchResultItem {
  kind: string;
  etag: string;
  id: YouTubeSearchResultId;
  snippet: YouTubeSearchResultSnippet;
}

export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchResultItem[];
}
