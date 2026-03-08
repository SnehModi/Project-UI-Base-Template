import { ReactNode } from "react";
import clsx from "clsx";

type Padding = "none" | "sm" | "md" | "lg";

const paddingMap: Record<Padding, string> = {
  none: "p-0",
  sm:   "p-[var(--space-sm)]",
  md:   "p-[var(--space-md)]",
  lg:   "p-[var(--space-lg)]",
};

type Props = {
  children?:  ReactNode;
  className?: string;
  padding?:   Padding;
  clickable?: boolean;
  loading?:   boolean;
};

function CardSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading...">
      <div className="h-4 rounded-[var(--radius-sm)] animate-shimmer" />
      <div className="h-4 rounded-[var(--radius-sm)] animate-shimmer w-4/5" />
      <div className="h-4 rounded-[var(--radius-sm)] animate-shimmer w-3/5" />
    </div>
  );
}

export default function Card({
  children,
  className,
  padding   = "md",
  clickable = false,
  loading   = false,
}: Props) {
  return (
    <div
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      className={clsx(
        "bg-[var(--color-bg)] border border-[var(--color-border)]",
        /* Glassmorphism backing, distinct in dark mode */
        "backdrop-blur-xl bg-opacity-80 dark:bg-opacity-40",
        "rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)]",
        "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]", /* Ensure we use the spring physics */
        paddingMap[padding],

        /* Faint inner highlight for premium 3D feel */
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",

        /* Clickable variant */
        clickable && [
          "cursor-pointer",
          "hover:shadow-[var(--shadow-lg)] dark:hover:shadow-[var(--shadow-glow)]",
          "hover:-translate-y-1 hover:scale-[1.01]",
          "active:scale-[0.98]",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none",
        ],

        className
      )}
    >
      {loading ? <CardSkeleton /> : children}
    </div>
  );
}
