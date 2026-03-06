"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useTheme } from "@/providers/ThemeProvider";

/* Sun icon */
function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

/* Moon icon */
function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

type Props = {
  /** Brand / logo area on the left */
  logo?: ReactNode;
  /** Center navigation slot */
  nav?: ReactNode;
  /** Right-aligned action slot (e.g. user avatar, buttons) */
  actions?: ReactNode;
  className?: string;
};

export default function Header({ logo, nav, actions, className }: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={clsx(
        "h-16 border-b border-[var(--color-border)] bg-[var(--color-bg)]",
        "flex items-center justify-between px-[var(--space-lg)]",
        "sticky top-0 z-[var(--z-sticky)]",
        className
      )}
    >
      {/* Left slot */}
      <div className="flex items-center gap-[var(--space-md)]">
        {logo}
      </div>

      {/* Center slot */}
      {nav && (
        <nav className="flex items-center gap-[var(--space-sm)]">
          {nav}
        </nav>
      )}

      {/* Right slot */}
      <div className="flex items-center gap-[var(--space-sm)]">
        {actions}

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className={clsx(
            "w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)]",
            "text-[var(--color-muted)] hover:text-[var(--color-text)]",
            "hover:bg-[var(--color-surface)] transition-base cursor-pointer",
            "border border-transparent hover:border-[var(--color-border)]"
          )}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
