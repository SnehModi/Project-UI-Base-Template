import React, { ReactNode, TdHTMLAttributes, ThHTMLAttributes, HTMLAttributes } from "react";
import clsx from "clsx";

/* ---- Sub-components ---- */

export function Thead({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={clsx(
        "bg-[var(--color-surface)] text-[var(--color-muted)]",
        "text-xs font-medium uppercase tracking-wider",
        "border-b border-[var(--color-border)]",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function Tbody({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={clsx("divide-y divide-[var(--color-border)]", className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

export function Tr({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={clsx("transition-all duration-200 ease-in-out", className)} {...props}>
      {children}
    </tr>
  );
}

export const Th = React.forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(({ children, className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={clsx(
        "px-[var(--space-lg)] py-[var(--space-md)]",
        "text-left text-xs font-medium text-[var(--color-muted)]",
        "whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
});

Th.displayName = "Th";

export function Td({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={clsx(
        "px-[var(--space-lg)] py-[var(--space-md)]",
        "text-sm text-[var(--color-text-secondary)] font-normal",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/* ---- Root Table ---- */

type TableProps = {
  children?:  ReactNode;
  className?: string;
  striped?:   boolean;
  hoverable?: boolean;
};

export function Table({
  children,
  className,
  striped   = false,
  hoverable = false,
}: TableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-sm bg-[var(--color-bg)]">
      <table
        className={clsx(
          "w-full border-collapse text-sm",

          /* Striped — every even tbody <tr> gets a tinted bg */
          striped && "[&_tbody>tr:nth-child(even)]:bg-[var(--color-surface)]/50",

          /* Hoverable — all tbody <tr> highlight on hover */
          hoverable && "[&_tbody>tr:hover]:bg-[var(--color-surface-hover)] [&_tbody>tr:hover_td]:text-[var(--color-text)]",

          className
        )}
      >
        {children}
      </table>
    </div>
  );
}

/* ---- Convenience default export for simple usage ---- */
export default Table;
