import React from "react";
import "./LoadingIndicator.scss";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "md",
  color,
  className = "",
}) => {
  return (
    <div
      className={`loading-indicator ${size} ${className}`}
      style={{ borderColor: color }}>
      <div className="spinner" style={{ borderColor: color }}></div>
    </div>
  );
};

export default LoadingIndicator;
