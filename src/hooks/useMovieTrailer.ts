import { useCallback, useRef } from "react";
import { getMovieTrailer } from "../services/api";

export const useMovieTrailer = () => {
  const trailerMap = useRef<Map<number, string>>(new Map());

  const getTrailer = useCallback((movieId: number) => {
    return trailerMap.current.get(movieId);
  }, []);

  const setTrailer = useCallback((movieId: number, videoKey: string) => {
    trailerMap.current.set(movieId, videoKey);
  }, []);

  const handleMouseEnter = useCallback(
    async (movieId: number) => {
      const cachedTrailer = getTrailer(movieId);
      if (!cachedTrailer) {
        try {
          const response = await getMovieTrailer(movieId);
          const trailer = response.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (trailer) {
            setTrailer(movieId, trailer.key);
            return trailer.key;
          }
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
        }
        return null;
      }
      return cachedTrailer;
    },
    [getTrailer, setTrailer]
  );

  return {
    getTrailer,
    handleMouseEnter,
  };
};
