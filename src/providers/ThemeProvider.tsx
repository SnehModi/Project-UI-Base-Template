"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  /* Read saved preference or system preference on mount */
  useEffect(() => {
    const saved = localStorage.getItem("sneh-theme") as Theme | null;
    if (saved) {
      apply(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      apply("dark");
    }
  }, []);

  function apply(t: Theme) {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("sneh-theme", t);
  }

  const toggleTheme = useCallback(() => {
    apply(theme === "light" ? "dark" : "light");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    apply(t);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}
