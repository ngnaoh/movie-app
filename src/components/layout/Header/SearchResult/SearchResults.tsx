import React from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../../../types/movie.types";
import "./SearchResults.scss";
import LoadingIndicator from "../../../common/LoadingIndicator";

interface SearchResultsProps {
  results: Movie[];
  isLoading: boolean;
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  onClose,
}) => {
  if (isLoading) {
    return (
      <div className="search-results">
        <LoadingIndicator />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">No movies found</div>
      </div>
    );
  }

  return (
    <div className="search-results">
      {results.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          className="movie-item"
          onClick={onClose}>
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
          )}
          <div className="movie-info">
            <h4 className="title">{movie.title}</h4>
            {movie.release_date && (
              <span className="year">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
