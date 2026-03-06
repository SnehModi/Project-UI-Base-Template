import { ReactNode } from "react";
import clsx from "clsx";

type Variant = "default" | "success" | "warning" | "error" | "info";
type Size    = "sm" | "md";

const variantStyles: Record<Variant, string> = {
  default: "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)]",
  success: "bg-[var(--color-success-subtle)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-subtle)] text-[var(--color-warning)]",
  error:   "bg-[var(--color-error-subtle)]   text-[var(--color-error)]",
  info:    "bg-[var(--color-info-subtle)]     text-[var(--color-info)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

type Props = {
  children:   ReactNode;
  variant?:   Variant;
  size?:      Size;
  className?: string;
};

export default function Badge({
  children,
  variant   = "default",
  size      = "md",
  className,
}: Props) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-medium rounded-[var(--radius-full)]",
        "whitespace-nowrap leading-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
