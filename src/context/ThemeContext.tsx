import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeMode } from "../config/theme";
import { theme } from "../config/theme";

type ThemeType = typeof theme.light | typeof theme.dark;

interface ThemeContextType {
  theme: ThemeType;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("theme-mode");
    return (savedMode as ThemeMode) || "system";
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeType>(theme.light);

  useEffect(() => {
    const updateTheme = () => {
      if (mode === "system") {
        const systemDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setCurrentTheme(systemDark ? theme.dark : theme.light);
      } else {
        setCurrentTheme(mode === "dark" ? theme.dark : theme.light);
      }
    };

    updateTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (mode === "system") {
        updateTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const value = {
    theme: currentTheme,
    mode,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
