import { ReactNode } from "react";
import clsx from "clsx";

type Placement = "top" | "bottom" | "left" | "right";

const placementStyles: Record<Placement, { tooltip: string; arrow: string }> = {
  top: {
    tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    arrow:   "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent border-t-[var(--color-text)]",
  },
  bottom: {
    tooltip: "top-full left-1/2 -translate-x-1/2 mt-2",
    arrow:   "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent border-b-[var(--color-text)]",
  },
  left: {
    tooltip: "right-full top-1/2 -translate-y-1/2 mr-2",
    arrow:   "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent border-l-[var(--color-text)]",
  },
  right: {
    tooltip: "left-full top-1/2 -translate-y-1/2 ml-2",
    arrow:   "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent border-r-[var(--color-text)]",
  },
};

type Props = {
  content:    string;
  placement?: Placement;
  children:   ReactNode;
  className?: string;
};

export default function Tooltip({
  content,
  placement = "top",
  children,
  className,
}: Props) {
  const { tooltip, arrow } = placementStyles[placement];

  return (
    <div className={clsx("relative inline-flex group", className)}>
      {children}

      {/* Tooltip bubble */}
      <div
        role="tooltip"
        className={clsx(
          /* Position */
          "absolute z-[var(--z-dropdown)] pointer-events-none",
          tooltip,

          /* Visibility — shown on group-hover */
          "opacity-0 group-hover:opacity-100",
          "scale-95 group-hover:scale-100",
          "transition-base",

          /* Visual */
          "px-2.5 py-1.5 rounded-[var(--radius-sm)]",
          "bg-[var(--color-text)] text-[var(--color-bg)]",
          "text-xs font-medium whitespace-nowrap shadow-[var(--shadow-md)]"
        )}
      >
        {content}

        {/* Arrow */}
        <span
          className={clsx(
            "absolute w-0 h-0 border-4",
            arrow
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
