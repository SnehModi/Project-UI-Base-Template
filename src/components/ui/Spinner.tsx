import { ReactNode } from "react";
import clsx from "clsx";

export type Spinner_Size = "sm" | "md" | "lg";

const sizeMap: Record<Spinner_Size, { outer: string; strokeWidth: number }> = {
  sm: { outer: "w-4 h-4",  strokeWidth: 3 },
  md: { outer: "w-6 h-6",  strokeWidth: 3 },
  lg: { outer: "w-10 h-10", strokeWidth: 2.5 },
};

type Props = {
  size?:      Spinner_Size;
  color?:     string;
  label?:     string;
  className?: string;
};

export default function Spinner({
  size      = "md",
  color     = "var(--color-primary)",
  label     = "Loading…",
  className,
}: Props) {
  const { outer, strokeWidth } = sizeMap[size];

  return (
    <span role="status" aria-label={label} className={clsx("inline-block", outer, className)}>
      <svg
        className="animate-spin w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12" cy="12" r="10"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity="0.2"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
