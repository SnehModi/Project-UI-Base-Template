import clsx from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function Sidebar({ children, className, ...props }: Props) {
  return (
    <aside
      className={clsx(
        "w-64 h-screen border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col p-[var(--space-md)]",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
