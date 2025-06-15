import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { getImageUrl } from "../../../services/api";
import type { Cast } from "../../../types/movie.types";
import "./CastSection.scss";
import LoadingIndicator from "../LoadingIndicator";

interface CastSectionProps {
  cast: Cast[];
  title?: string | React.ReactNode;
}

const DEFAULT_AVATAR =
  "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

const CastSection: React.FC<CastSectionProps> = ({ cast, title }) => {
  const [displayedCast, setDisplayedCast] = useState<Cast[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const imageCache = useRef<Map<number, string>>(new Map());
  const ITEMS_PER_PAGE = 10;

  const handleImageLoad = (actor: Cast) => {
    const imageUrl = getImageUrl(actor.profile_path, "small");
    imageCache.current.set(actor.id, imageUrl);
    return imageUrl ? true : false;
  };

  const loadMoreCast = useCallback(async () => {
    setIsLoadingMore(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const nextPage = page + 1;
    const start = 0;
    const end = nextPage * ITEMS_PER_PAGE;
    const newCast = cast.slice(start, end);

    setDisplayedCast(newCast);
    setPage(nextPage);
    setHasMore(end < cast.length);
    setIsLoadingMore(false);
  }, [cast, page]);

  useEffect(() => {
    // Initially show only first page
    const initialCast = cast.slice(0, ITEMS_PER_PAGE);
    setDisplayedCast(initialCast);
    setHasMore(cast.length > ITEMS_PER_PAGE);
  }, [cast]);

  const startInfiniteLoading = () => {
    setIsInfiniteLoading(true);
    loadMoreCast();
  };

  const lastCastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (!isInfiniteLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoadingMore) {
          loadMoreCast();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMoreCast, isInfiniteLoading, isLoadingMore]
  );

  if (!cast || cast.length === 0) {
    return (
      <div className="cast-section">
        {title || <h2>Cast</h2>}
        <p className="no-cast">No cast information available</p>
      </div>
    );
  }

  return (
    <div className="cast-section">
      {title || <h2>Cast</h2>}
      <div className="cast-grid">
        {displayedCast.map((actor, index) => (
          <motion.div
            key={actor.id + index}
            className="actor-card"
            ref={index === displayedCast.length - 1 ? lastCastElementRef : null}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}>
            <div className="actor-image">
              {handleImageLoad(actor) ? (
                <img
                  src={imageCache.current.get(actor.id)}
                  alt={actor.name}
                  loading="lazy"
                />
              ) : (
                <img src={DEFAULT_AVATAR} alt={actor.name} />
              )}
            </div>
            <div className="actor-info">
              <h3 className="name">{actor.name}</h3>
              <p className="character">{actor.character}</p>
            </div>
          </motion.div>
        ))}
        {isLoadingMore && (
          <div className="loading-more">
            <LoadingIndicator />
          </div>
        )}
      </div>
      {hasMore && !isInfiniteLoading && (
        <div className="show-more">
          <button className="show-more-button" onClick={startInfiniteLoading}>
            Show More
          </button>
        </div>
      )}
      {hasMore && isInfiniteLoading && !isLoadingMore && (
        <div className="loading-more">
          <div className="loading-spinner" />
        </div>
      )}
    </div>
  );
};

export default CastSection;
