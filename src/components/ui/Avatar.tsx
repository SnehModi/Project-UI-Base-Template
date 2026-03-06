import Image from "next/image";
import clsx from "clsx";

type Size   = "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "away" | "none";

const sizeMap: Record<Size, { outer: string; text: string; dot: string }> = {
  sm: { outer: "w-8  h-8",  text: "text-xs",  dot: "w-2.5 h-2.5 border" },
  md: { outer: "w-10 h-10", text: "text-sm",  dot: "w-3   h-3   border-2" },
  lg: { outer: "w-14 h-14", text: "text-lg",  dot: "w-3.5 h-3.5 border-2" },
  xl: { outer: "w-20 h-20", text: "text-2xl", dot: "w-4   h-4   border-2" },
};

const statusColors: Record<Exclude<Status, "none">, string> = {
  online:  "bg-[var(--color-success)]",
  offline: "bg-[var(--color-muted)]",
  away:    "bg-[var(--color-warning)]",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

type Props = {
  src?:       string;
  name?:      string;
  size?:      Size;
  status?:    Status;
  className?: string;
  alt?:       string;
};

export default function Avatar({
  src,
  name        = "User",
  size        = "md",
  status      = "none",
  className,
  alt,
}: Props) {
  const { outer, text, dot } = sizeMap[size];

  return (
    <div className={clsx("relative inline-flex shrink-0", outer, className)}>

      {src ? (
        <Image
          src={src}
          alt={alt ?? name}
          fill
          className="rounded-[var(--radius-full)] object-cover"
          sizes={outer}
        />
      ) : (
        /* Initials fallback */
        <div
          aria-label={name}
          className={clsx(
            "w-full h-full rounded-[var(--radius-full)]",
            "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]",
            "flex items-center justify-center font-semibold select-none",
            text
          )}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Status dot */}
      {status !== "none" && (
        <span
          aria-label={`Status: ${status}`}
          className={clsx(
            "absolute bottom-0 right-0 rounded-[var(--radius-full)]",
            "border-[var(--color-bg)]",
            dot,
            statusColors[status]
          )}
        />
      )}

    </div>
  );
}
