import { useParams, useNavigate } from "react-router-dom";
import { useMovieDetails } from "../../hooks/useMovies";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { getImageUrl, getBackdropUrl } from "../../services/api";
import type { Genre } from "../../types/movie.types";
import "./MovieDetail.scss";
import LoadingIndicator from "../../components/common/LoadingIndicator";
import Button from "../../components/common/Button";
import VideoSection from "../../components/common/VideoSection";
import StreamingProviders from "../../components/common/StreamingProviders";
import CastSection from "../../components/common/CastSection";
import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { useMovieProviders } from "../../hooks/useMovieProviders";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { showError } = useToast();
  const { data: movie, isLoading, error } = useMovieDetails(Number(id));
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [providers, setProviders] = useState<any[]>([]);
  const { handleMouseEnter: handleTrailerEnter } = useMovieTrailer();
  const { handleMouseEnter: handleProvidersEnter } = useMovieProviders();

  useEffect(() => {
    const fetchData = async () => {
      if (movie) {
        const videoKey = await handleTrailerEnter(movie.id);
        setTrailerKey(videoKey);

        const movieProviders = await handleProvidersEnter(movie.id);
        setProviders(movieProviders || []);
      }
    };

    fetchData();
  }, [movie, handleTrailerEnter, handleProvidersEnter]);

  if (error) {
    showError("Failed to load movie details. Please try again later.");
  }

  if (isLoading) {
    return (
      <div
        className="movie-detail loading"
        style={{ backgroundColor: theme.background }}>
        <LoadingIndicator size="lg" />
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="movie-detail" style={{ backgroundColor: theme.background }}>
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(${getBackdropUrl(movie.backdrop_path ?? "")})`,
        }}>
        <div className="overlay" />
      </div>

      <div className="container">
        <Button
          size="sm"
          icon="←"
          className="back-button"
          onClick={() => navigate(-1)}>
          Back
        </Button>

        <div className="content">
          <div className="poster">
            <img
              src={getImageUrl(movie.poster_path ?? "", "large")}
              alt={movie.title}
            />
          </div>

          <div className="info">
            <h1 className="title">{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}

            <div className="meta">
              <span className="release-date">{movie.release_date}</span>
              <span className="runtime">{movie.runtime} min</span>
              <span className="rating">
                ★ {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
              </span>
            </div>

            <div className="genres">
              {movie.genres?.map((genre: Genre) => (
                <span key={genre.id} className="genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>

            {trailerKey && (
              <VideoSection videoKey={trailerKey} title={movie.title} />
            )}

            <StreamingProviders
              providers={providers}
              title={<h2 className="streaming-title">Where to Watch</h2>}
            />

            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <CastSection
                cast={movie.credits.cast}
                title={<h2 className="cast-title">Cast</h2>}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
