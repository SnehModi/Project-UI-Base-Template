# Sneh UI Kit — Design Principles & Guidelines

This document explains the **why** behind design decisions in this system.
For implementation rules, see `CLAUDE.md` or `.cursor/rules/sneh-ui-kit.mdc`.

---

## 1. Token-First Design

Every visual value must come from a token in `tokens.css`. This is the single source of truth.

**Why:** Tokens ensure that light ↔ dark mode, rebranding, and spacing changes propagate
everywhere automatically. Hardcoded values create drift that is nearly impossible to refactor.

| Category | Token prefix | Example |
|---|---|---|
| Color | `--color-*` | `--color-primary`, `--color-surface` |
| Spacing | `--space-*` | `--space-md`, `--space-lg` |
| Radius | `--radius-*` | `--radius-md`, `--radius-full` |
| Shadow | `--shadow-*` | `--shadow-sm`, `--shadow-lg` |
| Motion | `--duration-*`, `--ease-*` | `--duration-normal`, `--ease-spring` |
| Z-index | `--z-*` | `--z-modal`, `--z-toast` |

---

## 2. Spacing System

**Base: 4px scale** — tokens go `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px`.

**Convention:**
- **Component internals** (padding, icon gaps): fine steps — `--space-xs`, `--space-sm`, `--space-3`
- **Section / layout spacing** (margins, gaps between sections): even multiples — `--space-md` through `--space-3xl`

This gives precision at the small end without introducing arbitrary values.

**Never use raw Tailwind spacing** (`p-4`, `gap-2`, `mt-6`).
Always use `p-[var(--space-md)]`, `gap-[var(--space-sm)]`, etc.

---

## 3. Color Palette Intent

### Brand Colors
- `--color-primary` — interactive elements: buttons, links, focus rings
- `--color-primary-hover` — hover/active state of primary
- `--color-primary-subtle` — tinted backgrounds, selected row highlights

### Semantic Colors
Each semantic color (`success`, `warning`, `error`, `info`) has three variants:
- **Base** — icon, text, or solid background
- **`-hover`** — interactive state
- **`-subtle`** — tinted background (chip, alert background)

### Surface Hierarchy
```
--color-bg           Page background (outermost)
--color-surface      Card / panel background (one level up)
--color-surface-hover Card hover state
```
This three-level hierarchy creates visual depth without heavy shadows.

### Text Hierarchy
```
--color-text           Primary content
--color-text-secondary Supporting labels, captions
--color-muted          Placeholder text, disabled states, timestamps
```

---

## 4. Dark Mode Architecture

Dark mode is **not a Tailwind thing** — it is handled entirely through CSS custom properties.

- `ThemeProvider` sets `data-theme="dark"` on `<html>`
- `themes.css` overrides every color token under `[data-theme="dark"]`
- All components automatically respond — zero component-level code needed

**Rule:** Never write `dark:` Tailwind prefix. If you find yourself reaching for it,
add the dark override to `themes.css` instead.

---

## 5. Typography Scale

Sizes are in `rem` and map to clean pixel values at the default 16px root:

| Token | rem | px | Use for |
|---|---|---|---|
| `--font-size-xs` | 0.75 | 12 | Captions, labels, badges |
| `--font-size-sm` | 0.875 | 14 | Body text, button labels |
| `--font-size-md` | 1.0 | 16 | Default body |
| `--font-size-lg` | 1.125 | 18 | Subheadings, emphasized text |
| `--font-size-xl` | 1.25 | 20 | Section subheadings |
| `--font-size-2xl` | 1.5 | 24 | Section headings |
| `--font-size-3xl` | 1.875 | 30 | Page titles |
| `--font-size-4xl` | 2.25 | 36 | Hero headings |

**Hierarchy rule:**
```
h1  → page title      → font-size-3xl / font-weight-bold
h2  → section title   → font-size-2xl / font-weight-semibold
h3  → subsection      → font-size-xl  / font-weight-semibold
h4  → card title      → font-size-lg  / font-weight-medium
p   → body copy       → font-size-md  / font-weight-normal
```

---

## 6. Component Design Principles

### Every component must:
- Accept `className` and spread it last (allows one-off overrides)
- Spread `...props` to the root element (allows aria attrs, data attrs, event handlers)
- Use `clsx` for conditional class composition — no string interpolation
- Support `disabled`, with `opacity-50 cursor-not-allowed` as the standard pattern
- Have a visible focus ring: `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`

### Form inputs must also:
- Accept `label` (renders `<label>` linked via `useId()`)
- Accept `error` string (red ring + error message below)
- Accept `helperText` string (muted text below when no error)

### Loading / skeleton states:
- Use `animate-shimmer` class from `motion.css`
- Do not use third-party skeleton libraries

---

## 7. Motion & Animation

Animations come from `motion.css`. Use the named classes:

| Class | Use case |
|---|---|
| `animate-fade-in` | Mounting overlays, page transitions |
| `animate-slide-up` | Modals, drawers, toasts appearing from bottom |
| `animate-slide-in-right` | Sidebars, panels |
| `animate-scale-in` | Dropdowns, tooltips, popovers |
| `animate-shimmer` | Loading skeleton backgrounds |
| `transition-base` | Standard hover/focus transitions |
| `transition-fast` | Tight UI feedback (toggles, checkboxes) |

**Speed guidelines:**
- `--duration-fast` (120ms) — micro-feedback (hover color change)
- `--duration-normal` (200ms) — standard UI transitions
- `--duration-slow` (350ms) — larger motion (modals, page slides)

**Never** use raw `transition-all` or fixed millisecond values. Use the tokens.

---

## 8. Layout System

### Container sizes

| Token | Value | Use for |
|---|---|---|
| `--container-sm` | 640px | Narrow reading column, auth pages |
| `--container-md` | 768px | Blog posts, forms |
| `--container-lg` | 1024px | Standard content pages |
| `--container-xl` | 1280px | Dashboard layouts |
| `--container-2xl` | 1536px | Wide/full-bleed layouts |

### Page structure
Use `PageLayout` from `@/components/layout` as the root shell.
It handles sidebar + header composition and responsive collapse.

---

## 9. Accessibility Non-Negotiables

Every component must have:
- `aria-*` attributes on interactive elements without native semantics
- `role` on non-semantic elements acting as widgets (combobox, dialog, etc.)
- `htmlFor` + `useId()` on all labels
- `onKeyDown` handlers for any custom interactive element
- `aria-live` regions for dynamic content (alerts, toasts, validation)
- Visible focus ring on all focusable elements

Accessibility is **not** optional and is **not** done last. Build it in from the start.

---

## 10. What Not to Do

| ❌ Don't | ✅ Do instead |
|---|---|
| `bg-blue-500` | `bg-[var(--color-primary)]` |
| `p-4` or `gap-2` | `p-[var(--space-md)]` or `gap-[var(--space-sm)]` |
| `style={{ color: "..." }}` | Use a token class |
| `dark:text-white` | Token handles it via `themes.css` |
| New CSS files | Add to `motion.css` or `tokens.css` |
| `tailwind.config.ts` | Tailwind v4 uses `@theme` in `globals.css` |
| Install Radix, Shadcn, MUI | Components are bespoke — reuse what's here |
| Deep component imports | Always import from barrel (`@/components/ui`) |
