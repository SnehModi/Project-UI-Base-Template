# Sneh UI Kit — Claude Code Project Rules

> This file is automatically read by Claude Code when working in this repository.
> Keep it up to date as new components are added.

## What This Project Is

`sneh-ui-kit` is a **reusable design system** built with:
- **Next.js 16** (App Router)
- **Tailwind CSS v4** (`@theme` for token sync)
- **TypeScript 5**
- **clsx** for conditional class composition

It is the base template for all new projects. UI consistency is the primary goal.

---

## Project Structure (Quick Reference)

```
src/
  app/
    globals.css          ← @theme block syncs CSS tokens to Tailwind
    layout.tsx           ← ThemeProvider wraps everything here
    page.tsx             ← Component showcase / demo
  components/
    ui/index.ts          ← Import ALL ui components from here
    layout/index.ts      ← Import ALL layout components from here
  design-system/
    tokens.css           ← The source of truth for all design values
    themes.css           ← [data-theme="dark"] overrides
    motion.css           ← Animation keyframes and utility classes
  providers/
    ThemeProvider.tsx    ← useTheme() hook, data-theme on <html>
```

---

## Component Inventory

### UI: `import { X } from "@/components/ui"`

| Component  | Critical Props |
|------------|----------------|
| `Alert`    | variant: info\|success\|warning\|error; title; dismissible |
| `Avatar`   | src; name; size: sm\|md\|lg\|xl; status: online\|offline\|away |
| `Badge`    | variant: default\|success\|warning\|error\|info; size: sm\|md |
| `Button`   | variant: primary\|secondary\|ghost\|outline\|danger; size: sm\|md\|lg; loading; leftIcon; rightIcon |
| `Card`     | padding: none\|sm\|md\|lg; clickable; loading |
| `Input`    | label; error; helperText; disabled |
| `Modal`    | isOpen; onClose; title; size: sm\|md\|lg\|xl |
| `Select`   | options[]; label; error; helperText; disabled |
| `Spinner`  | size: sm\|md\|lg |
| `Table`    | striped; hoverable; sub-components: Thead, Tbody, Tr, Th, Td |
| `Textarea` | label; error; helperText; disabled; resize; rows |
| `Tooltip`  | content; placement: top\|bottom\|left\|right |

### Layout: `import { X } from "@/components/layout"`

| Component    | Key Props |
|-------------|-----------|
| `Container`  | size: sm\|md\|lg\|xl\|full |
| `Header`     | logo; nav; actions (dark toggle is automatic) |
| `PageLayout` | sidebarContent; headerContent; children |
| `Sidebar`    | children; className |

---

## Critical Rules

### Colors (MOST IMPORTANT)
```
✅ bg-[var(--color-primary)]     bg-[var(--color-surface)]
✅ text-[var(--color-text)]      border-[var(--color-border)]
❌ bg-blue-500  ❌ text-gray-900  ❌ #2563eb  ❌ style={{ color: "..." }}
```

### Spacing
```
✅ p-[var(--space-md)]  gap-[var(--space-sm)]  mt-[var(--space-lg)]
❌ p-4  ❌ gap-2  ❌ mt-6  (raw Tailwind spacing bypasses the token system)
```

### Key Token Names
**Colors:** `--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-error`, `--color-success`, `--color-warning`, `--color-info` (each has `-hover` and `-subtle` variants)

**Spacing:** `--space-xs/sm/md/lg/xl/2xl/3xl`

**Radius:** `--radius-sm/md/lg/xl/full`

**Shadow:** `--shadow-xs/sm/md/lg/xl`

**Z-index:** `--z-dropdown/sticky/overlay/modal/toast`

**Motion:** `--duration-fast/normal/slow`, `--ease-standard/spring`

---

## Dark Mode

- Controlled by `ThemeProvider` (sets `data-theme="dark"` on `<html>`)
- All color tokens flip automatically via `themes.css`
- **Do NOT use `dark:` Tailwind prefix** — theme switching works through CSS vars only
- `useTheme()` exposes `{ theme, toggleTheme, setTheme }`

---

## Component Contract (required for every new component)

```tsx
import clsx from "clsx"

type Props = {
  children?:  React.ReactNode
  className?: string
  variant?:   "primary" | "secondary"
  disabled?:  boolean
  // add other props as needed
}

export default function MyComponent({
  variant   = "primary",
  className,
  disabled,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        "base-styles using-tokens",
        variant === "primary" && "primary-styles",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

After creating, add the export to `src/components/ui/index.ts`.

---

## Accessibility Checklist

Every component must have:
- [ ] `aria-*` attributes where applicable
- [ ] `role` on non-semantic elements acting as interactive widgets
- [ ] `htmlFor` on labels, linked via `useId()`
- [ ] Keyboard operability (`onKeyDown` for custom interactive elements)
- [ ] Visible focus ring (the base `focus-visible:ring-2` pattern)

---

## What NOT To Do

- Don't install Radix UI, Shadcn, MUI, Headless UI, or similar — components are bespoke
- Don't create new CSS files — add keyframes/animations to `motion.css`, design values to `tokens.css`
- Don't add `tailwind.config.ts` — Tailwind v4 uses `@theme` in `globals.css`
- Don't use `next/image` `layout="fill"` (deprecated) — use `fill` prop directly
