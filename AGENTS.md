# Sneh UI Kit — Universal Agent Rules

> This file is read by OpenAI Codex, Gemini CLI, and any agent IDE that supports `AGENTS.md`.
> For Cursor: see `.cursor/rules/sneh-ui-kit.mdc`
> For Claude Code: see `CLAUDE.md`

---

## What This Project Is

`sneh-ui-kit` is a **reusable design system** — the base template for all new projects.
Built with **Next.js 16 (App Router) · Tailwind CSS v4 · TypeScript · clsx**.
UI consistency is the primary goal. Follow every rule in this file precisely.

---

## Project Structure

```
src/
  app/
    globals.css          ← @theme block syncs CSS tokens → Tailwind (do NOT edit @theme)
    layout.tsx           ← Root layout — ThemeProvider wraps <html>
    page.tsx             ← Component showcase / demo page
  components/
    ui/                  ← Primitive UI components
      index.ts           ← Barrel export — ALWAYS import from here
    layout/              ← Page-level layout shells
      index.ts           ← Barrel export — ALWAYS import from here
  design-system/
    tokens.css           ← Single source of truth for ALL design values
    themes.css           ← Dark mode token overrides ([data-theme="dark"])
    motion.css           ← Animation keyframes and utility classes
  providers/
    ThemeProvider.tsx    ← Theme context + useTheme() hook
ai/
  component-contracts.md ← Full prop API for every component
```

---

## Available Components

**Always check these before creating new ones.**

### UI — `import { X } from "@/components/ui"`

| Component  | Key Props |
|------------|-----------|
| `Button`   | variant: primary\|secondary\|ghost\|outline\|danger; size: sm\|md\|lg; loading; leftIcon; rightIcon |
| `Input`    | label; error; helperText; disabled |
| `Select`   | options[]; label; error; helperText; disabled |
| `Textarea` | label; error; helperText; disabled; resize; rows |
| `Card`     | padding: none\|sm\|md\|lg; clickable; loading |
| `Modal`    | isOpen; onClose; title; size: sm\|md\|lg\|xl |
| `Table`    | striped; hoverable + sub-components: Thead, Tbody, Tr, Th, Td |
| `Badge`    | variant: default\|success\|warning\|error\|info; size: sm\|md |
| `Alert`    | variant: info\|success\|warning\|error; title; dismissible; onDismiss |
| `Spinner`  | size: sm\|md\|lg; color (CSS value) |
| `Avatar`   | src; name (initials fallback); size: sm\|md\|lg\|xl; status: online\|offline\|away\|none |
| `Tooltip`  | content; placement: top\|bottom\|left\|right |

### Layout — `import { X } from "@/components/layout"`

| Component    | Key Props |
|-------------|-----------|
| `Header`    | logo; nav; actions — dark mode toggle is built-in |
| `Sidebar`   | children; className |
| `Container` | size: sm\|md\|lg\|xl\|full |
| `PageLayout`| sidebarContent; headerContent; children |

---

## Design Token Rules (CRITICAL)

**NEVER hardcode hex colors, pixel values, or magic numbers.**
Always reference CSS custom properties from `tokens.css`.

### Color Tokens
```
--color-primary            --color-primary-hover       --color-primary-subtle
--color-success            --color-success-subtle
--color-warning            --color-warning-subtle
--color-error              --color-error-subtle
--color-info               --color-info-subtle
--color-bg                 --color-surface             --color-surface-hover
--color-text               --color-text-secondary      --color-muted
--color-border             --color-border-strong
```

### Spacing Tokens (4px base scale)
```
--space-xs  (4px)   --space-sm  (8px)   --space-md  (16px)
--space-lg  (24px)  --space-xl  (32px)  --space-2xl (48px)  --space-3xl (64px)
```
Intermediate steps also available: `--space-3` (12px), `--space-5` (20px)

### Other Tokens
```
Radius:   --radius-sm  --radius-md  --radius-lg  --radius-xl  --radius-full
Shadow:   --shadow-xs  --shadow-sm  --shadow-md  --shadow-lg  --shadow-xl
Z-index:  --z-dropdown --z-sticky  --z-overlay  --z-modal    --z-toast
Duration: --duration-fast  --duration-normal  --duration-slow
Easing:   --ease-standard  --ease-spring  --ease-decelerate  --ease-accelerate
```

### Usage Pattern
```tsx
// ✅ Correct
className="bg-[var(--color-primary)] text-[var(--color-text)] p-[var(--space-md)]"
className="rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]"

// ❌ Wrong — never do this
className="bg-blue-500 text-gray-900 p-4"
style={{ color: "#2563eb" }}
```

---

## Dark Mode

- Controlled by `ThemeProvider` (sets `data-theme="dark"` on `<html>`)
- All color tokens flip automatically via `themes.css`
- **Never use `dark:` Tailwind prefix** — colors flip via CSS vars only
- `useTheme()` exposes `{ theme, toggleTheme, setTheme }`

---

## Component Contract (required for every new component)

```tsx
import clsx from "clsx"

type Props = {
  children?:  React.ReactNode
  className?: string
  variant?:   "primary" | "secondary"
  size?:      "sm" | "md" | "lg"
  disabled?:  boolean
}

export default function MyComponent({
  variant   = "primary",
  size      = "md",
  disabled  = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        // 1. Base styles
        "inline-flex items-center font-medium rounded-[var(--radius-md)]",
        // 2. Variant
        variant === "primary"   && "bg-[var(--color-primary)] text-white",
        variant === "secondary" && "bg-[var(--color-surface)] text-[var(--color-text)]",
        // 3. Size — use space tokens, not raw Tailwind
        size === "sm" && "px-[var(--space-3)] py-[var(--space-1)] text-xs",
        size === "md" && "px-[var(--space-md)] py-[var(--space-sm)] text-sm",
        size === "lg" && "px-[var(--space-5)] py-[var(--space-3)] text-base",
        // 4. State
        disabled && "opacity-50 cursor-not-allowed",
        // 5. className always last
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

After creating: add the export to `src/components/ui/index.ts`.

---

## Animation Classes (from motion.css)

```css
animate-fade-in     animate-fade-out    animate-slide-up
animate-slide-down  animate-slide-in-right  animate-slide-in-left
animate-scale-in    animate-scale-out   animate-spin
animate-pulse       animate-shimmer
transition-base     transition-fast
```

---

## Rules Summary

### ✅ DO
- Import components from barrel files (`@/components/ui`, `@/components/layout`)
- Use design tokens for ALL colors, spacing, radius, and shadows
- Accept `className` prop and spread it last via `clsx`
- Spread `...props` for HTML attribute pass-through
- Use `useTheme()` for theme access
- Add new components to `index.ts` + `ai/component-contracts.md`

### ❌ DON'T
- Hardcode colors (`bg-blue-500`, `#2563eb`, `style={{ color: "..." }}`)
- Use raw Tailwind spacing (`p-4`, `gap-2`) — use token equivalents
- Use `dark:` Tailwind prefix — dark mode uses CSS vars only
- Create new CSS files — extend `motion.css` or `tokens.css`
- Install UI libraries (Radix, MUI, Shadcn, Headless UI)
- Create a new component if an existing one covers the need

### When to Create a New Component
Only if:
1. The UI pattern doesn't exist in `src/components/ui/`
2. The pattern is reused in 2+ places
3. It cannot be achieved by composing existing components
