import { useQuery } from "@tanstack/react-query";
import { getMovies, getMovieDetails, searchMovies } from "../services/api";
import type {
  Movie,
  MovieCategory,
  MovieListResponse,
} from "../types/movie.types";

export const useMovies = (
  category: MovieCategory = "now_playing",
  page = 1
) => {
  return useQuery<MovieListResponse>({
    queryKey: ["movies", category, page],
    queryFn: () => getMovies(page, category),
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery<Movie>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
  });
};

export const useMovieSearch = (query: string, page = 1) => {
  return useQuery<MovieListResponse>({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });
};
