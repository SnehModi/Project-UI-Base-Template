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
        "rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)]",
        "transition-base",
        paddingMap[padding],

        /* Clickable variant */
        clickable && [
          "cursor-pointer",
          "hover:shadow-[var(--shadow-md)]",
          "hover:-translate-y-0.5",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
        ],

        className
      )}
    >
      {loading ? <CardSkeleton /> : children}
    </div>
  );
}
