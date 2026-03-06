import { ReactNode, TdHTMLAttributes, ThHTMLAttributes, HTMLAttributes } from "react";
import clsx from "clsx";

/* ---- Sub-components ---- */

export function Thead({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={clsx(
        "bg-[var(--color-surface)] text-[var(--color-muted)]",
        "text-xs font-semibold uppercase tracking-wide",
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
    <tr className={clsx("transition-base", className)} {...props}>
      {children}
    </tr>
  );
}

export function Th({
  children,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={clsx(
        "px-[var(--space-md)] py-[var(--space-sm)]",
        "text-left text-xs font-semibold text-[var(--color-muted)]",
        "whitespace-nowrap",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={clsx(
        "px-[var(--space-md)] py-[var(--space-sm)]",
        "text-sm text-[var(--color-text)]",
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
    <div className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)]">
      <table
        className={clsx(
          "w-full border-collapse text-sm",

          /* Striped — every even tbody <tr> gets a tinted bg */
          striped && "[&_tbody>tr:nth-child(even)]:bg-[var(--color-surface)]",

          /* Hoverable — all tbody <tr> highlight on hover */
          hoverable && "[&_tbody>tr:hover]:bg-[var(--color-surface-hover)]",

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
