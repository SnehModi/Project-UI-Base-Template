import { InputHTMLAttributes, useId } from "react";
import clsx from "clsx";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?:      string;
  error?:      string;
  helperText?: string;
};

export default function Input({
  label,
  error,
  helperText,
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

      <input
        id={id}
        disabled={disabled}
        className={clsx(
          /* Base */
          "w-full px-3 py-2 rounded-[var(--radius-md)] text-sm",
          "bg-[var(--color-surface)] text-[var(--color-text)]",
          "border transition-base",
          "placeholder:text-[var(--color-muted)]",

          /* Focus */
          "focus:outline-none focus:ring-2",

          /* State: normal */
          !error && "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-subtle)]",

          /* State: error */
          error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-subtle)]",

          /* State: disabled */
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
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-[var(--color-error)] flex items-center gap-1"
        >
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
