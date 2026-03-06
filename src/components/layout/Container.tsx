import clsx from "clsx";
import { ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<Size, string> = {
  sm:   "max-w-[var(--container-sm)]",
  md:   "max-w-[var(--container-md)]",
  lg:   "max-w-[var(--container-lg)]",
  xl:   "max-w-[var(--container-xl)]",
  full: "max-w-full",
};

type Props = {
  children: ReactNode;
  size?: Size;
  className?: string;
};

export default function Container({
  children,
  size = "xl",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-[var(--space-lg)]",
        sizeMap[size],
        className
      )}
    >
      {children}
    </div>
  );
}
