# Sneh UI Kit — AI Quick Reference

> Cheat sheet for AI agents. Full rules: `.cursor/rules/sneh-ui-kit.mdc` (Cursor) or `CLAUDE.md` (Claude Code).

---

## Imports

```ts
import { Button, Card, Input, Modal, Badge, Alert, Avatar, Spinner, Select, Textarea, Table, Tooltip } from "@/components/ui"
import { Header, Sidebar, Container, PageLayout } from "@/components/layout"
import { useTheme } from "@/providers/ThemeProvider"
```

---

## Token Quick Reference

```css
/* Colors */
--color-primary   --color-primary-hover   --color-primary-subtle
--color-success   --color-warning         --color-error      --color-info
--color-bg        --color-surface         --color-surface-hover
--color-text      --color-text-secondary  --color-muted
--color-border    --color-border-strong

/* Spacing */
--space-xs (4px)  --space-sm (8px)   --space-3 (12px)
--space-md (16px) --space-5 (20px)   --space-lg (24px)
--space-xl (32px) --space-2xl (48px) --space-3xl (64px)

/* Radius */
--radius-sm  --radius-md  --radius-lg  --radius-xl  --radius-full

/* Shadow */
--shadow-xs  --shadow-sm  --shadow-md  --shadow-lg  --shadow-xl

/* Motion */
--duration-fast (120ms)  --duration-normal (200ms)  --duration-slow (350ms)
--ease-standard  --ease-spring  --ease-decelerate  --ease-accelerate

/* Z-index */
--z-dropdown  --z-sticky  --z-overlay  --z-modal  --z-toast
```

---

## Animation Classes (motion.css)

```
animate-fade-in    animate-fade-out   animate-slide-up     animate-slide-down
animate-slide-in-right  animate-slide-in-left
animate-scale-in   animate-scale-out  animate-spin  animate-pulse  animate-shimmer
transition-base    transition-fast
```

---

## Component Prop Conventions

| Prop | Values |
|---|---|
| `variant` | `"primary" \| "secondary" \| "ghost" \| "outline" \| "danger"` |
| `size` | `"sm" \| "md" \| "lg"` (default: `"md"`) |
| `loading` | `boolean` — shows spinner or shimmer skeleton |
| `disabled` | `boolean` — `opacity-50 cursor-not-allowed` |
| `className` | Always accepted, spread last via `clsx` |
| `...props` | Always spread to root element |

---

## New Component Checklist

- [ ] File in `src/components/ui/MyComponent.tsx`
- [ ] Default export
- [ ] Accepts `className` (spread last via `clsx`)
- [ ] Spreads `...props` to root
- [ ] Uses only design tokens — no hardcoded colors or px values
- [ ] Has loading, disabled, and hover states
- [ ] Has `aria-*` and keyboard support
- [ ] Exported from `src/components/ui/index.ts`
- [ ] Added to component table in `.cursor/rules/sneh-ui-kit.mdc`, `CLAUDE.md`, `AGENTS.md`
- [ ] Documented in `ai/component-contracts.md`

---

## The 5 Rules You Must Never Break

1. **No hardcoded colors** — `bg-blue-500` ❌ → `bg-[var(--color-primary)]` ✅
2. **No raw Tailwind spacing** — `p-4` ❌ → `p-[var(--space-md)]` ✅
3. **No `dark:` prefix** — dark mode works through `[data-theme="dark"]` CSS vars only
4. **No UI library installs** — Radix, MUI, Shadcn, Headless UI are all banned
5. **No new CSS files** — extend `tokens.css` or `motion.css` only
