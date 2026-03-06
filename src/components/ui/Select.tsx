import { SelectHTMLAttributes, useId } from "react";
import clsx from "clsx";

type Option = {
  value: string;
  label: string;
};

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?:      string;
  error?:      string;
  helperText?: string;
  options:     Option[];
};

export default function Select({
  label,
  error,
  helperText,
  options,
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

      <div className="relative">
        <select
          id={id}
          disabled={disabled}
          className={clsx(
            "w-full appearance-none px-3 py-2 pr-9 rounded-[var(--radius-md)] text-sm",
            "bg-[var(--color-surface)] text-[var(--color-text)]",
            "border transition-base cursor-pointer",
            "focus:outline-none focus:ring-2",

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
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </div>

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
