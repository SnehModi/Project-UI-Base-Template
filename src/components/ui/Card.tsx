"use client";

import { ReactNode, MouseEvent, useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type Padding = "none" | "sm" | "md" | "lg";

const paddingMap: Record<Padding, string> = {
  none: "p-0",
  sm:   "p-[var(--space-sm)]",
  md:   "p-[var(--space-md)]",
  lg:   "p-[var(--space-lg)]",
};

// Use intersection to support motion div props
type Props = Omit<HTMLMotionProps<"div">, "children"> & {
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
  onMouseMove,
  ...props
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    
    // Call original onMouseMove if passed
    if (onMouseMove) onMouseMove(e);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }} // smooth ease out
      whileHover={clickable ? { y: -4, scale: 1.01 } : undefined}
      whileTap={clickable ? { scale: 0.98 } : undefined}
      className={clsx(
        "relative overflow-hidden", // needed for the absolute glow
        "bg-[var(--color-bg)] border border-[var(--color-border)]",
        /* Glassmorphism backing, distinct in dark mode */
        "backdrop-blur-xl bg-opacity-80 dark:bg-opacity-40",
        "rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)]",
        "transition-shadow duration-[var(--duration-normal)]",
        paddingMap[padding],

        /* Faint inner highlight for premium 3D feel */
        "shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",

        /* Clickable variant */
        clickable && [
          "cursor-pointer",
          "hover:shadow-[var(--shadow-lg)] dark:hover:shadow-[var(--shadow-glow)]",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:outline-none",
        ],

        className
      )}
      {...props}
    >
      {/* The Glow Layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mouse-glow mix-blend-soft-light"
      />
      {/* Content Layer */}
      <div className="relative z-10">
        {loading ? <CardSkeleton /> : children}
      </div>
    </motion.div>
  );
}
