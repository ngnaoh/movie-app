export interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  adult: boolean;
  video: boolean;
  genres?: Genre[];
  runtime?: number;
  status?: string;
  tagline?: string;
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  similar?: {
    results: Movie[];
  };
  streaming_providers?: StreamingProvider[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory = "now_playing" | "top_rated";

export interface SearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface WatchProviderResponse {
  id: number;
  results: {
    [key: string]: {
      link: string;
      flatrate?: Array<{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
      }>;
      rent?: Array<{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
      }>;
      buy?: Array<{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
      }>;
    };
  };
}

export interface MovieTrailerResponse {
  results: Video[];
}
