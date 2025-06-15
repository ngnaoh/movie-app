import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../../hooks/useMovies";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import { useView } from "../../context/ViewContext";
import type { MovieCategory } from "../../types/movie.types";
import "./Home.scss";
import MovieCard from "../../components/common/MovieCard";
import MovieSkeleton from "../../components/common/MovieSkeleton";
import Pagination from "../../components/common/Pagination";
import Button from "../../components/common/Button";
import { GridIcon, ListIcon } from "../../assets/icons";

const SKELETON_COUNT = 8;

const Home = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<MovieCategory>("now_playing");
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const { showError } = useToast();
  const { view, toggleView } = useView();
  const { data, isLoading, error } = useMovies(category, page);

  if (error) {
    showError("Failed to load movies. Please try again later.");
  }

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="home" style={{ backgroundColor: theme.background }}>
      <div className="container">
        <div className="category-tabs">
          <div className="tabs-left">
            <Button
              variant={category === "now_playing" ? "primary" : "text"}
              size="md"
              onClick={() => setCategory("now_playing")}>
              Now Playing
            </Button>
            <Button
              variant={category === "top_rated" ? "primary" : "text"}
              size="md"
              onClick={() => setCategory("top_rated")}>
              Top Rated
            </Button>
          </div>

          <div className="tabs-right">
            <Button
              variant="ghost"
              icon={view === "grid" ? <GridIcon /> : <ListIcon />}
              onClick={toggleView}
              className="view-toggle"
              title={
                view === "grid" ? "Switch to List View" : "Switch to Grid View"
              }
            />
          </div>
        </div>

        <div className={`movie-container ${view}`}>
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <MovieSkeleton key={index} view={view} />
              ))
            : data?.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                  view={view}
                />
              ))}
        </div>

        {data && data.total_pages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
