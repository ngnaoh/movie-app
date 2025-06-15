export const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";

export const API_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "1e130dfe09562808071b821e0c71c318",
  accessToken:
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTEzMGRmZTA5NTYyODA4MDcxYjgyMWUwYzcxYzMxOCIsIm5iZiI6MTc0OTg5ODQwNC42Miwic3ViIjoiNjg0ZDU0YTQzYTRhNjQzZDdlM2RmNjRlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.l8TDasOyCYcXqSFmZMpUbg2kw9opHWve3bSCU8353vc",
  imageBaseUrl: "https://image.tmdb.org/t/p",
  imageSizes: {
    poster: {
      small: "w185",
      medium: "w342",
      large: "w500",
      original: "original",
    },
    backdrop: {
      small: "w300",
      medium: "w780",
      large: "w1280",
      original: "original",
    },
  },
} as const;
