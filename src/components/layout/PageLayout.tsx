import clsx from "clsx";
import Sidebar from "./Sidebar";
import Container from "./Container";

type Props = {
  children?:        React.ReactNode;
  sidebarContent?:  React.ReactNode;
  /** Pass your own Header component here fully configured */
  className?:       string;
};

export default function PageLayout({
  children,
  sidebarContent,
  className,
}: Props) {
  return (
    <div className={clsx("flex min-h-screen bg-[var(--color-bg)]", className)}>
      {sidebarContent && <Sidebar>{sidebarContent}</Sidebar>}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto py-[var(--space-lg)]">
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}
