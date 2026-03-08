import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

/* ---- Spinner (inline, no extra dep) ---- */
function ButtonSpinner() {
  return (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size    = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-glow)] active:shadow-[var(--shadow-inset)]",
  secondary:
    "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] shadow-[var(--shadow-xs)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]",
  outline:
    "bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-primary-muted)]",
  danger:
    "bg-[var(--color-error)] text-white hover:bg-[var(--color-error-hover)] shadow-[var(--shadow-sm)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5 h-8 rounded-[var(--radius-sm)]",
  md: "px-4 py-2  text-sm gap-2   h-10 rounded-[var(--radius-md)]",
  lg: "px-5 py-3  text-base gap-2 h-12 rounded-[var(--radius-lg)]",
};

export default function Button({
  variant  = "primary",
  size     = "md",
  loading  = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  children,
  ...props
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      aria-busy={loading}
      className={clsx(
        /* Base */
        "inline-flex items-center justify-center font-medium",
        "transition-base cursor-pointer select-none",
        "active:scale-[0.97] hover:-translate-y-[1px]", /* The premium spring bounce effect */
        "focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[var(--color-bg)]",

        /* Variant */
        variantStyles[variant],

        /* Size */
        sizeStyles[size],

        /* Disabled / Loading */
        isDisabled && "opacity-50 cursor-not-allowed pointer-events-none",

        className
      )}
      {...props}
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}

      <span>{children}</span>

      {!loading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </button>
  );
}
