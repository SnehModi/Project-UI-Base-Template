"use client";

import { useId, ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import clsx from "clsx";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?:      string;
  error?:      string;
  helperText?: string;
  options:     Option[];
  placeholder?: string;
  value?:      string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?:    boolean;
  className?:   string;
  id?:          string;
};

export default function Select({
  label,
  error,
  helperText,
  options,
  placeholder = "Select an option...",
  value,
  onValueChange,
  defaultValue,
  disabled,
  className,
  id: externalId,
}: Props) {
  const autoId = useId();
  const id     = externalId ?? autoId;

  return (
    <div className={clsx("flex flex-col gap-[var(--space-1)]", className)}>
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

      <SelectPrimitive.Root
        value={value}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          id={id}
          className={clsx(
            "w-full flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-sm",
            "bg-[var(--color-surface)] text-[var(--color-text)]",
            "border transition-base cursor-pointer focus:outline-none focus:ring-2",
            "data-[placeholder]:text-[var(--color-muted)]",
            
            !error && "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-subtle)]",
            error  && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error-subtle)]",
            
            disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-hover)]"
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon className="text-[var(--color-muted)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={clsx(
              "z-[var(--z-dropdown)] overflow-hidden rounded-[var(--radius-md)]",
              "bg-[var(--color-surface)]/95 border border-[var(--color-border)]",
              "shadow-[var(--shadow-lg)] backdrop-blur-xl animate-in fade-in-0 zoom-in-95",
              "w-[var(--radix-select-trigger-width)] min-w-[8rem]"
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    className={clsx(
                      "relative flex w-full cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-2 pl-8 pr-2 text-sm outline-none transition-colors",
                      "text-[var(--color-text)] focus:bg-[var(--color-surface-hover)] focus:text-[var(--color-text)]",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    )}
                  >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

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
