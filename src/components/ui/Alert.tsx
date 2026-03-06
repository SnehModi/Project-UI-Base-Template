"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";

type Variant = "info" | "success" | "warning" | "error";

const styles: Record<Variant, { wrapper: string; icon: string; title: string }> = {
  info: {
    wrapper: "bg-[var(--color-info-subtle)] border border-[var(--color-info)]/20",
    icon:    "text-[var(--color-info)]",
    title:   "text-[var(--color-info)]",
  },
  success: {
    wrapper: "bg-[var(--color-success-subtle)] border border-[var(--color-success)]/20",
    icon:    "text-[var(--color-success)]",
    title:   "text-[var(--color-success)]",
  },
  warning: {
    wrapper: "bg-[var(--color-warning-subtle)] border border-[var(--color-warning)]/20",
    icon:    "text-[var(--color-warning)]",
    title:   "text-[var(--color-warning)]",
  },
  error: {
    wrapper: "bg-[var(--color-error-subtle)] border border-[var(--color-error)]/20",
    icon:    "text-[var(--color-error)]",
    title:   "text-[var(--color-error)]",
  },
};

const icons: Record<Variant, ReactNode> = {
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
};

type Props = {
  variant?:    Variant;
  title?:      string;
  children?:   ReactNode;
  dismissible?: boolean;
  onDismiss?:  () => void;
  className?:  string;
};

export default function Alert({
  variant     = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const s = styles[variant];

  function handleDismiss() {
    setVisible(false);
    onDismiss?.();
  }

  return (
    <div
      role="alert"
      className={clsx(
        "flex gap-[var(--space-sm)] rounded-[var(--radius-md)] p-[var(--space-md)] animate-fade-in",
        s.wrapper,
        className
      )}
    >
      {/* Icon */}
      <span className={clsx("mt-0.5 shrink-0", s.icon)}>
        {icons[variant]}
      </span>

      {/* Body */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className={clsx("font-semibold text-sm mb-0.5", s.title)}>{title}</p>
        )}
        {children && (
          <p className="text-sm text-[var(--color-text-secondary)]">{children}</p>
        )}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          aria-label="Dismiss alert"
          className={clsx(
            "shrink-0 -mr-1 -mt-1 p-1 rounded-[var(--radius-sm)]",
            "text-[var(--color-muted)] hover:text-[var(--color-text)]",
            "hover:bg-white/20 transition-base cursor-pointer"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}
