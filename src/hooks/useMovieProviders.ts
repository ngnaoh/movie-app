import { useCallback, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWatchProviders } from "../services/api";
import type { StreamingProvider } from "../types/movie.types";

export const useMovieProviders = () => {
  const providersMap = useRef<Map<number, StreamingProvider[]>>(new Map());

  const getProviders = useCallback((movieId: number) => {
    return providersMap.current.get(movieId);
  }, []);

  const setProviders = useCallback(
    (movieId: number, providers: StreamingProvider[]) => {
      providersMap.current.set(movieId, providers);
    },
    []
  );

  const { refetch: fetchProviders } = useQuery({
    queryKey: ["watchProviders", 0], // Initial movieId
    queryFn: async () => {
      const movieId = 0; // This will be overridden in handleMouseEnter
      const response = await getWatchProviders(movieId);
      const { flatrate = [], rent = [], buy = [] } = response.results.US || {};

      const providers = [...flatrate, ...rent, ...buy].map((provider) => ({
        provider_id: provider.provider_id,
        provider_name: provider.provider_name,
        logo_path: provider.logo_path,
      }));

      setProviders(movieId, providers);
      return providers;
    },
    enabled: false,
  });

  const handleMouseEnter = useCallback(
    async (movieId: number) => {
      const cachedProviders = getProviders(movieId);
      if (!cachedProviders) {
        const response = await getWatchProviders(movieId);
        const {
          flatrate = [],
          rent = [],
          buy = [],
        } = response.results.US || {};

        const providers = [...flatrate, ...rent, ...buy].map((provider) => ({
          provider_id: provider.provider_id,
          provider_name: provider.provider_name,
          logo_path: provider.logo_path,
        }));

        setProviders(movieId, providers);
        return providers;
      }
      return cachedProviders;
    },
    [getProviders]
  );

  return {
    getProviders,
    handleMouseEnter,
  };
};
