"use client";

import { useState } from "react";
import {
  Alert, Avatar, Badge, Button, Card, Input,
  Modal, Select, Spinner, Table, Textarea, Tooltip,
  Thead, Tbody, Tr, Th, Td, Filter, DataTable
} from "@/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import { Header, Container, Sidebar, PageLayout } from "@/components/layout";

type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "Active" | "Away" | "Offline";
  joined: string;
};

const TABLE_DATA: Employee[] = [
  { id: "1", name: "Alice Lee",    role: "Senior Engineer", department: "Engineering", status: "Active",  joined: "Jan 2024" },
  { id: "2", name: "Bob Smith",    role: "UX Designer",     department: "Design",      status: "Away",    joined: "Mar 2024" },
  { id: "3", name: "Charlie Day",  role: "Product Manager", department: "Product",     status: "Active",  joined: "Nov 2023" },
  { id: "4", name: "Diana Prince", role: "DevOps Engineer", department: "Engineering", status: "Offline", joined: "Feb 2024" },
  { id: "5", name: "Evan Wright",  role: "Frontend Dev",    department: "Engineering", status: "Active",  joined: "Apr 2024" },
  { id: "6", name: "Fiona Gallagher", role: "Marketer",     department: "Marketing",   status: "Away",    joined: "Jul 2023" },
];

const COLUMNS: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm" name={row.original.name} status={row.original.status.toLowerCase() as any} />
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "department",
    header: "Dept.",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Active" ? "success" :
            status === "Away" ? "warning" : "default"
          }
          size="sm"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => <span className="text-[var(--color-muted)]">{row.getValue("joined")}</span>,
  },
];

const NAV_ITEMS = ["Components", "Tokens", "Motion", "Docs"];

/* ---- Sidebar nav ---- */
const SECTIONS = [
  "Foundation", "Buttons", "Form Inputs", "Cards",
  "Feedback", "Data", "Media", "Overlay",
];

/* ---- Section wrapper ---- */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-[var(--space-md)] pt-[var(--space-2xl)]">
      <div className="border-b border-[var(--color-border)] pb-[var(--space-sm)]">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/* ---- Row wrapper ---- */
function Row({ children, wrap = true }: { children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className={`flex items-start gap-[var(--space-md)] ${wrap ? "flex-wrap" : ""}`}>
      {children}
    </div>
  );
}

/* ---- Label ---- */
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-medium text-[var(--color-muted)] mb-[var(--space-1)]">{children}</p>;
}

function ColorSwatch({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[var(--space-1)]">
      <div
        className="w-12 h-12 rounded-[var(--radius-md)] border border-[var(--color-border)] shadow-[var(--shadow-xs)]"
        style={{ background: `var(${token})` }}
        title={token}
      />
      <span className="text-xs text-[var(--color-muted)] text-center leading-tight max-w-[56px]">{label}</span>
    </div>
  );
}

/* ===========================================================
   MAIN PAGE
=========================================================== */

export default function ShowcasePage() {
  const [modalOpen, setModalOpen]  = useState(false);
  const [inputVal,  setInputVal]   = useState("");
  const [loading,   setLoading]    = useState(false);

  function simulateLoad() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  }

  const logo = (
    <div className="flex items-center gap-[var(--space-sm)]">
      <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center">
        <span className="text-white text-xs font-bold">S</span>
      </div>
      <span className="font-semibold text-[var(--color-text)] text-sm">sneh-ui-kit</span>
    </div>
  );

  const nav = (
    <div className="hidden md:flex gap-[var(--space-sm)]">
      {NAV_ITEMS.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition-base px-2 py-1 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface)]"
        >
          {item}
        </a>
      ))}
    </div>
  );

  const sidebarContent = (
    <nav className="space-y-[var(--space-1)]">
      <p className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider px-2 mb-[var(--space-sm)]">
        Components
      </p>
      {SECTIONS.map((s) => (
        <a
          key={s}
          href={`#${s.toLowerCase()}`}
          className="flex items-center px-2 py-1.5 rounded-[var(--radius-sm)] text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-base"
        >
          {s}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <Header logo={logo} nav={nav} />

      <PageLayout sidebarContent={sidebarContent}>
        <div className="py-[var(--space-lg)] space-y-[var(--space-xs)]">

          {/* Page header */}
          <div className="pb-[var(--space-xl)] border-b border-[var(--color-border)]">
            <Badge variant="info" size="sm">v0.1.0</Badge>
            <h1 className="mt-[var(--space-sm)] text-4xl font-bold text-[var(--color-text)] tracking-tight">
              Component Showcase
            </h1>
            <p className="mt-[var(--space-sm)] text-lg text-[var(--color-muted)] max-w-2xl">
              Every component in the kit, all variants, all states. Toggle dark mode in the top-right corner.
            </p>
          </div>

          {/* ======== TOKENS ======== */}
          <div id="tokens" className="scroll-mt-20">
            <Section id="foundation" title="Foundation — Color Tokens">
            <div className="space-y-[var(--space-md)]">
              <div>
                <Label>Brand</Label>
                <Row wrap>
                  <ColorSwatch token="--color-primary"        label="primary" />
                  <ColorSwatch token="--color-primary-hover"  label="primary-hover" />
                  <ColorSwatch token="--color-primary-subtle" label="primary-subtle" />
                </Row>
              </div>
              <div>
                <Label>Semantic</Label>
                <Row wrap>
                  <ColorSwatch token="--color-success"        label="success" />
                  <ColorSwatch token="--color-warning"        label="warning" />
                  <ColorSwatch token="--color-error"          label="error" />
                  <ColorSwatch token="--color-info"           label="info" />
                </Row>
              </div>
              <div>
                <Label>Surface</Label>
                <Row wrap>
                  <ColorSwatch token="--color-bg"             label="bg" />
                  <ColorSwatch token="--color-surface"        label="surface" />
                  <ColorSwatch token="--color-surface-hover"  label="surface-hover" />
                  <ColorSwatch token="--color-border"         label="border" />
                  <ColorSwatch token="--color-text"           label="text" />
                  <ColorSwatch token="--color-muted"          label="muted" />
                </Row>
              </div>
            </div>
          </Section>
          </div>

          {/* ======== COMPONENTS ======== */}
          <div id="components" className="scroll-mt-20">
          <Section id="buttons" title="Button">
            <div className="space-y-[var(--space-md)]">
              <div>
                <Label>Variants</Label>
                <Row>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="danger">Danger</Button>
                </Row>
              </div>
              <div>
                <Label>Sizes</Label>
                <Row>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </Row>
              </div>
              <div>
                <Label>States</Label>
                <Row>
                  <Button loading={loading} onClick={simulateLoad}>
                    {loading ? "Loading…" : "Click to load"}
                  </Button>
                  <Button disabled>Disabled</Button>
                  <Button
                    leftIcon={
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    }
                  >
                    With Icon
                  </Button>
                </Row>
              </div>
            </div>
          </Section>

          {/* ======== FORM INPUTS ======== */}
          <Section id="form inputs" title="Form Inputs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)]">
              <div className="space-y-[var(--space-md)]">
                <Input
                  label="Default Input"
                  placeholder="Type something…"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  helperText="This is helper text"
                />
                <Input
                  label="Error State"
                  defaultValue="bad@email"
                  error="Please enter a valid email address"
                />
                <Input
                  label="Disabled"
                  defaultValue="Cannot edit"
                  disabled
                />
              </div>
              <div className="space-y-[var(--space-md)]">
                <Select
                  label="Role"
                  options={[
                    { value: "eng",  label: "Engineer"  },
                    { value: "des",  label: "Designer"  },
                    { value: "mgr",  label: "Manager"   },
                    { value: "pm",   label: "Product"   },
                  ]}
                  helperText="Select your role"
                />
                <Textarea
                  label="Notes"
                  placeholder="Write something here…"
                  rows={4}
                  helperText="Max 500 characters"
                />
              </div>
            </div>
          </Section>

          {/* ======== CARDS ======== */}
          <Section id="cards" title="Card">
            <Row wrap>
              <Card className="w-64">
                <p className="font-medium text-sm mb-1">Default Card</p>
                <p className="text-xs text-[var(--color-muted)]">Standard card with default padding</p>
              </Card>
              <Card className="w-64" clickable>
                <p className="font-medium text-sm mb-1">Clickable Card</p>
                <p className="text-xs text-[var(--color-muted)]">Hover me — I lift up</p>
              </Card>
              <Card className="w-64" loading>
                Loading skeleton
              </Card>
              <Card className="w-64" padding="lg">
                <p className="font-medium text-sm mb-1">Large Padding</p>
                <p className="text-xs text-[var(--color-muted)]">padding=&quot;lg&quot;</p>
              </Card>
            </Row>
          </Section>

          {/* ======== FEEDBACK ======== */}
          <Section id="feedback" title="Feedback — Badge · Alert · Spinner">
            <div className="space-y-[var(--space-md)]">
              <div>
                <Label>Badge — all variants</Label>
                <Row>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                  <Badge variant="info">Info</Badge>
                </Row>
              </div>
              <div>
                <Label>Alert — all variants</Label>
                <div className="space-y-[var(--space-sm)] max-w-xl">
                  <Alert variant="info"    title="Info"    dismissible>Something worth knowing.</Alert>
                  <Alert variant="success" title="Success" dismissible>Your changes were saved.</Alert>
                  <Alert variant="warning" title="Warning" dismissible>Your session will expire soon.</Alert>
                  <Alert variant="error"   title="Error"   dismissible>Failed to connect to server.</Alert>
                </div>
              </div>
              <div>
                <Label>Spinner — sm / md / lg</Label>
                <Row>
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                </Row>
              </div>
            </div>
          </Section>

          {/* ======== DATA ======== */}
          <Section id="data" title="DataTable (Sorting, Grouping, Dnd Column Reorder)">
            <DataTable
              columns={COLUMNS}
              data={TABLE_DATA}
              enableSorting
              enableGrouping
              enableColumnReorder
              enableGlobalFilter
              globalFilterPlaceholder="Search employees..."
              filterOptions={[
                { label: "Engineering", value: "Engineering" },
                { label: "Design", value: "Design" },
                { label: "Product", value: "Product" },
              ]}
              onFilterChange={(val) => console.log("Filter by:", val)}
            />
          </Section>

          {/* ======== MEDIA ======== */}
          <Section id="media" title="Avatar · Tooltip">
            <div className="space-y-[var(--space-md)]">
              <div>
                <Label>Avatar — sizes + status</Label>
                <Row>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar size="sm" name="Alice" status="online"  />
                    <span className="text-xs text-[var(--color-muted)]">sm</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar size="md" name="Bob"   status="away"    />
                    <span className="text-xs text-[var(--color-muted)]">md</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar size="lg" name="Carol" status="offline" />
                    <span className="text-xs text-[var(--color-muted)]">lg</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Avatar size="xl" name="Dan"   />
                    <span className="text-xs text-[var(--color-muted)]">xl</span>
                  </div>
                </Row>
              </div>
              <div>
                <Label>Tooltip — placements</Label>
                <div className="flex items-center gap-[var(--space-xl)] pt-[var(--space-lg)]">
                  <Tooltip content="Top tooltip" placement="top">
                    <Button size="sm" variant="secondary">Hover top</Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" placement="bottom">
                    <Button size="sm" variant="secondary">Hover bottom</Button>
                  </Tooltip>
                  <Tooltip content="Right tooltip" placement="right">
                    <Button size="sm" variant="secondary">Hover right</Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Section>

          {/* ======== OVERLAY ======== */}
          <Section id="overlay" title="Modal">
            <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Example Modal"
              size="md"
            >
              <p className="text-sm text-[var(--color-text-secondary)] mb-[var(--space-lg)]">
                This modal closes on ✕, on Escape, or by clicking the backdrop. The ✕ button is positioned in the top-right corner of the card.
              </p>
              <div className="flex justify-end gap-[var(--space-sm)]">
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)}>Confirm</Button>
              </div>
            </Modal>
          </Section>
          </div>

          {/* ======== MOTION ======== */}
          <div id="motion" className="pt-[var(--space-2xl)] scroll-mt-20">
            <div className="pb-[var(--space-sm)] border-b border-[var(--color-border)]">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">Motion</h2>
            </div>
            <p className="mt-[var(--space-md)] text-[var(--color-text-secondary)]">
              Sneh UI Kit includes standard motion utilities for smooth, consistent animations. 
              Hover over the cards below to see the transitions in action, or use the predefined animation classes.
            </p>
            <div className="mt-[var(--space-lg)] grid grid-cols-2 md:grid-cols-4 gap-[var(--space-md)]">
              <Card className="flex items-center justify-center h-32 hover:-translate-y-2 transition-base cursor-pointer">
                Hover: Lift
              </Card>
              <Card className="flex items-center justify-center h-32 animate-pulse">
                Pulse
              </Card>
              <Card className="flex items-center justify-center h-32 animate-fade-in">
                Fade In
              </Card>
              <Card className="flex items-center justify-center h-32 hover:scale-105 transition-fast cursor-pointer">
                Hover: Scale
              </Card>
            </div>
          </div>

          {/* ======== DOCS ======== */}
          <div id="docs" className="pt-[var(--space-2xl)] scroll-mt-20">
            <div className="pb-[var(--space-sm)] border-b border-[var(--color-border)]">
              <h2 className="text-2xl font-bold text-[var(--color-text)]">Docs</h2>
            </div>
            <Card className="mt-[var(--space-lg)]">
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">Design System Guidelines</h3>
              <p className="text-[var(--color-text-secondary)] mb-[var(--space-md)] max-w-2xl">
                For complete guidelines on utilizing these components, styling conventions, and accessibility patterns, please refer to the documentation included in the repository.
              </p>
              <Button variant="secondary" onClick={() => alert("Docs would typically open a new page or markdown viewer.")}>
                Read the Documentation
              </Button>
            </Card>
          </div>

          {/* Footer spacer */}
          <div className="py-[var(--space-2xl)]" />
        </div>
      </PageLayout>
    </>
  );
}
