import axios from "axios";
import { API_CONFIG, API_KEY, BASE_URL } from "../config/api";
import type {
  MovieTrailerResponse,
  WatchProviderResponse,
} from "../types/movie.types";

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  headers: {
    Authorization: `Bearer ${API_CONFIG.accessToken}`,
    "Content-Type": "application/json",
  },
});

export const getMovies = async (
  page = 1,
  category: "now_playing" | "top_rated" = "now_playing"
) => {
  const response = await api.get(`/movie/${category}`, {
    params: {
      page,
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      language: "en-US",
      append_to_response: "videos,credits,similar",
    },
  });
  return response.data;
};

export const searchMovies = async (query: string, page = 1) => {
  const response = await api.get("/search/movie", {
    params: {
      query,
      page,
      language: "en-US",
    },
  });
  return response.data;
};

export const getImageUrl = (
  path: string,
  size: keyof typeof API_CONFIG.imageSizes.poster = "medium"
) => {
  if (!path) return "";
  return `${API_CONFIG.imageBaseUrl}/${API_CONFIG.imageSizes.poster[size]}${path}`;
};

export const getBackdropUrl = (
  path: string,
  size: keyof typeof API_CONFIG.imageSizes.backdrop = "large"
) => {
  if (!path) return "";
  return `${API_CONFIG.imageBaseUrl}/${API_CONFIG.imageSizes.backdrop[size]}${path}`;
};

export const getWatchProviders = async (
  movieId: number
): Promise<WatchProviderResponse> => {
  const response = await api.get(`/movie/${movieId}/watch/providers`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};

export const getMovieTrailer = async (
  movieId: number
): Promise<MovieTrailerResponse> => {
  const response = await api.get(`/movie/${movieId}/videos`, {
    params: {
      language: "en-US",
    },
  });
  return response.data;
};
