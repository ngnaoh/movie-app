import React, { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Movie } from "../../../types/movie.types";
import TrailerPreview from "../TrailerPreview";
import "./MovieCard.scss";
import { formatDate, getScoreColor } from "../../../utils/app";
import { formatPopularity } from "../../../utils/app";
import { useMovieProviders } from "../../../hooks/useMovieProviders";
import { useMovieTrailer } from "../../../hooks/useMovieTrailer";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
  view: "grid" | "list";
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, view }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const { handleMouseEnter: handleProvidersEnter } = useMovieProviders();
  const { handleMouseEnter: handleTrailerEnter } = useMovieTrailer();

  const onMouseEnter = useCallback(async () => {
    setShowTrailer(true);

    // Fetch trailer
    const videoKey = await handleTrailerEnter(movie.id);
    setTrailerKey(videoKey);
  }, [movie.id, handleProvidersEnter, handleTrailerEnter]);

  const onMouseLeave = useCallback(() => {
    setShowTrailer(false);
  }, []);

  const score = useMemo(
    () => Math.round(movie.vote_average * 10),
    [movie.vote_average]
  );

  return (
    <motion.div
      className={`movie-card ${view}`}
      onClick={() => onClick(movie.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: view === "grid" ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className="poster-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
          loading="lazy"
        />
        <div className="movie-overlay">
          <div className="rating">
            <span className="star">★</span>
            <span className="score">{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="popularity">
            <span className="icon">🔥</span>
            <span className="count">{formatPopularity(movie.popularity)}</span>
          </div>
        </div>
        <div
          className="user-score"
          style={
            {
              "--score-color": getScoreColor(movie.vote_average),
            } as React.CSSProperties
          }>
          <svg viewBox="0 0 36 36" className="score-circle">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="var(--score-color)"
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
            />
          </svg>
          <div className="score-text">
            <span className="score-value">{score}</span>
            <span className="score-percent">%</span>
          </div>
        </div>
        <AnimatePresence>
          {showTrailer && trailerKey && (
            <TrailerPreview videoKey={trailerKey} />
          )}
        </AnimatePresence>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="release-date">{formatDate(movie.release_date)}</span>
          <span className="language">
            {movie.original_language.toUpperCase()}
          </span>
        </div>
        <p className="movie-overview">{movie.overview}</p>
        <div className="movie-stats">
          <div className="stat">
            <span className="label">Votes</span>
            <span className="value">{movie.vote_count.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Popularity</span>
            <span className="value">{formatPopularity(movie.popularity)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
