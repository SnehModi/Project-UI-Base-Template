All UI components must follow these rules:

## Required Props (every component)
- `className?: string` — always accept and spread via clsx
- `...props` — spread HTML attributes to the root element
- Default export — the component itself

## Variant Naming Convention
Use string literals, not enums. Standard variant names:

```ts
variant?: "primary" | "secondary" | "ghost" | "outline" | "danger"
size?:    "sm" | "md" | "lg"    // md is always default
```

## Standard Component Template

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
  variant  = "primary",
  size     = "md",
  disabled = false,
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        // 1. Base — layout and structure
        "inline-flex items-center font-medium rounded-[var(--radius-md)]",
        // 2. Variant
        variant === "primary"   && "bg-[var(--color-primary)] text-white",
        variant === "secondary" && "bg-[var(--color-surface)] text-[var(--color-text)]",
        // 3. Size — use space tokens, NOT raw Tailwind (p-4 etc. bypass the token system)
        size === "sm" && "px-[var(--space-3)] py-[var(--space-1)] text-xs",
        size === "md" && "px-[var(--space-md)] py-[var(--space-sm)] text-sm",
        size === "lg" && "px-[var(--space-5)] py-[var(--space-3)] text-base",
        // 4. State
        disabled && "opacity-50 cursor-not-allowed",
        // 5. className override always last
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

## All Current Components & Their Prop Signatures

### Button
```ts
variant?:  "primary" | "secondary" | "ghost" | "outline" | "danger"
size?:     "sm" | "md" | "lg"
loading?:  boolean
disabled?: boolean
leftIcon?: ReactNode
rightIcon?: ReactNode
```

### Input / Select / Textarea (form inputs — all share this pattern)
```ts
label?:      string       // renders <label> linked via useId()
error?:      string       // red ring + error message
helperText?: string       // muted helper text below
disabled?:   boolean
```
Select also requires `options: { value: string; label: string }[]`
Textarea also accepts `rows?: number` and `resize?: "none"|"vertical"|"horizontal"|"both"`

### Card
```ts
padding?:  "none" | "sm" | "md" | "lg"
clickable?: boolean  // hover lift effect
loading?:  boolean   // renders shimmer skeleton
```

### Modal
```ts
isOpen:     boolean    // required
onClose:    () => void // required
title?:     string     // optional header
size?:      "sm" | "md" | "lg" | "xl"
```

### Badge
```ts
variant?: "default" | "success" | "warning" | "error" | "info"
size?:    "sm" | "md"
```

### Alert
```ts
variant?:     "info" | "success" | "warning" | "error"
title?:       string
dismissible?: boolean
onDismiss?:   () => void
```

### Spinner
```ts
size?:  "sm" | "md" | "lg"
color?: string   // CSS value, defaults to --color-primary
label?: string   // aria-label for accessibility
```

### Avatar
```ts
src?:    string  // image URL
name?:   string  // used for initials fallback and alt text
size?:   "sm" | "md" | "lg" | "xl"
status?: "online" | "offline" | "away" | "none"
```

### Tooltip
```ts
content:    string    // required — tooltip text
placement?: "top" | "bottom" | "left" | "right"
```

### Table Sub-components
Use `Thead`, `Tbody`, `Tr`, `Th`, `Td` for composable tables.
`Table` accepts `striped?: boolean` and `hoverable?: boolean`.

### Container
```ts
size?: "sm" | "md" | "lg" | "xl" | "full"
```

### Header
```ts
logo?:    ReactNode  // left slot
nav?:     ReactNode  // center slot
actions?: ReactNode  // right slot (dark toggle is always appended)
```
