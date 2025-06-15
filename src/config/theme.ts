export const theme = {
  light: {
    primary: "#032541",
    secondary: "#01b4e4",
    background: "#ffffff",
    surface: "#f5f5f5",
    text: "#000000",
    textSecondary: "#666666",
    border: "#e0e0e0",
    error: "#d32f2f",
    success: "#2e7d32",
    warning: "#ed6c02",
    info: "#0288d1",
  },
  dark: {
    primary: "#01b4e4",
    secondary: "#032541",
    background: "#121212",
    surface: "#1e1e1e",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    border: "#333333",
    error: "#ef5350",
    success: "#66bb6a",
    warning: "#ffa726",
    info: "#29b6f6",
  },
} as const;

export type ThemeType = typeof theme.light;
export type ThemeMode = "light" | "dark" | "system";
