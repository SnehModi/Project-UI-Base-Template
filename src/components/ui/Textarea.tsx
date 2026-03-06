import { TextareaHTMLAttributes, useId } from "react";
import clsx from "clsx";

type Resize = "none" | "vertical" | "horizontal" | "both";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?:      string;
  error?:      string;
  helperText?: string;
  resize?:     Resize;
};

const resizeMap: Record<Resize, string> = {
  none:       "resize-none",
  vertical:   "resize-y",
  horizontal: "resize-x",
  both:       "resize",
};

export default function Textarea({
  label,
  error,
  helperText,
  resize   = "vertical",
  rows     = 4,
  className,
  disabled,
  id: externalId,
  ...props
}: Props) {
  const autoId = useId();
  const id     = externalId ?? autoId;

  return (
    <div className="flex flex-col gap-[var(--space-1)]">

      {label && (
        <label
          htmlFor={id}
          className={clsx(
            "text-sm font-medium text-[var(--color-text-secondary)]",
            disabled && "opacity-50"
          )}
        >
          {label}
        </label>
      )}

      <textarea
        id={id}
        rows={rows}
        disabled={disabled}
        className={clsx(
          "w-full px-3 py-2 rounded-[var(--radius-md)] text-sm",
          "bg-[var(--color-surface)] text-[var(--color-text)]",
          "border transition-base",
          "placeholder:text-[var(--color-muted)]",
          "focus:outline-none focus:ring-2",
          resizeMap[resize],

          !error && "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-subtle)]",
          error  && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-subtle)]",
          disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]",

          className
        )}
        aria-invalid={!!error}
        aria-describedby={
          error      ? `${id}-error`  :
          helperText ? `${id}-helper` :
          undefined
        }
        {...props}
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-[var(--color-error)]">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-helper`} className="text-xs text-[var(--color-muted)]">
          {helperText}
        </p>
      )}

    </div>
  );
}
