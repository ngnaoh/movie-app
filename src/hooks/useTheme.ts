import { useEffect } from "react";
import { useTheme as useThemeContext } from "../context/ThemeContext";
import type { ThemeMode } from "../config/theme";

export const useTheme = () => {
  const { theme, mode, setMode } = useThemeContext();

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    localStorage.setItem("theme-mode", newMode);
    setMode(newMode);
  };

  const setThemeMode = (newMode: ThemeMode) => {
    localStorage.setItem("theme-mode", newMode);
    setMode(newMode);
  };

  return {
    theme,
    mode,
    toggleTheme,
    setThemeMode,
  };
};
