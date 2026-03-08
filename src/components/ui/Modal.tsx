"use client";

import { ReactNode, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type Size = "sm" | "md" | "lg" | "xl";

const sizeMap: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

type Props = {
  isOpen:     boolean;
  onClose:    () => void;
  title?:     string;
  size?:      Size;
  children?:  ReactNode;
  className?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size     = "md",
  children,
  className,
}: Props) {
  const titleId = useId();

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-[var(--space-md)]"
          role="presentation"
        >
          {/* Click-outside overlay (Backdrop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            className={clsx(
              /* Layout — relative fixes the absolute close button */
              "relative z-10 w-full",
              sizeMap[size],

              /* Visual */
              "bg-[var(--color-bg)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)]",
              "p-[var(--space-lg)]",
              className
            )}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={clsx(
                "absolute top-4 right-4",
                "w-8 h-8 flex items-center justify-center rounded-[var(--radius-md)]",
                "text-[var(--color-muted)] hover:text-[var(--color-text)]",
                "hover:bg-[var(--color-surface)] transition-base cursor-pointer"
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Title */}
            {title && (
              <div className="mb-[var(--space-md)] pr-8">
                <h2
                  id={titleId}
                  className="text-lg font-semibold text-[var(--color-text)]"
                >
                  {title}
                </h2>
              </div>
            )}

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
