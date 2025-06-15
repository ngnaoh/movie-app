import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { theme as themConfig } from "../../../config/theme";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../../services/api";
import "./Header.scss";
import Button from "../../common/Button";
import SearchResults from "./SearchResult";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch search results
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or handle search
      console.log("Search query:", searchQuery);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery("");
    }
  };

  const handleThemeToggle = () => {
    setIsThemeChanging(true);
    toggleTheme();
    setTimeout(() => {
      setIsThemeChanging(false);
    }, 300);
  };

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest(".action-buttons") &&
      !target.closest(".search-container")
    ) {
      setIsSearchActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <span className="icon">🎬</span>
          <span className="text">Movie App</span>
        </Link>

        <div className="header-actions">
          <div
            className={`search-container ${isSearchActive ? "active" : ""} ${
              searchQuery.length ? "searching" : ""
            }`}>
            <form
              className="search-form"
              autoComplete="off"
              onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
              {isSearchActive && (
                <button
                  type="button"
                  className="close-search"
                  onClick={handleSearchToggle}>
                  ✕
                </button>
              )}
            </form>
            {searchQuery.length >= 2 && (
              <SearchResults
                results={searchResults?.results || []}
                isLoading={isLoading}
                onClose={() => setSearchQuery("")}
              />
            )}
          </div>

          <div className="action-buttons">
            <Button
              variant="ghost"
              className="action-button search-toggle"
              onClick={handleSearchToggle}
              title="Search">
              🔍
            </Button>

            <Button
              variant="ghost"
              className={`action-button ${
                isThemeChanging ? "theme-changing" : ""
              }`}
              onClick={handleThemeToggle}
              title={`Switch to ${
                theme === themConfig.dark ? "Light" : "Dark"
              } Mode`}>
              <span className="theme-icon">
                {theme === themConfig.dark ? "☀️" : "🌙"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
