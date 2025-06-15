import React from "react";
import "./MovieSkeleton.scss";

interface MovieSkeletonProps {
  view: "grid" | "list";
}

const MovieSkeleton: React.FC<MovieSkeletonProps> = ({ view }) => {
  return (
    <div className={`movie-skeleton ${view}`}>
      <div className="poster-skeleton" />
      <div className="content-skeleton">
        <div className="title-skeleton" />
        <div className="info-skeleton">
          <div className="year-skeleton" />
          <div className="rating-skeleton" />
        </div>
        {view === "list" && <div className="overview-skeleton" />}
      </div>
    </div>
  );
};

export default MovieSkeleton;
