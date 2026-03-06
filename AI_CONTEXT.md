# Sneh UI Kit — AI Context

You are working inside `sneh-ui-kit`, a personal design system.
Read `CLAUDE.md` or `.cursor/rules/sneh-ui-kit.mdc` for the full rules.

## Stack
- Next.js 16 (App Router) · Tailwind CSS v4 · TypeScript · clsx

## Golden Rules
1. Import UI components from `@/components/ui` (never deep paths)
2. Import layout components from `@/components/layout`
3. NEVER hardcode colors — use `--color-*` tokens from `tokens.css`
4. NEVER use `dark:` Tailwind prefix — dark mode works via `[data-theme="dark"]`
5. All new components must: accept `className`, spread `...props`, use design tokens
6. Do not install UI libraries

## Component Quick Reference

**UI:** Alert · Avatar · Badge · Button · Card · Input · Modal · Select · Spinner · Table (+ Thead/Tbody/Tr/Th/Td) · Textarea · Tooltip

**Layout:** Container · Header (has built-in dark toggle) · PageLayout · Sidebar

## Key File Locations

| Purpose | File |
|---------|------|
| Design tokens | `src/design-system/tokens.css` |
| Dark theme | `src/design-system/themes.css` |
| Animations | `src/design-system/motion.css` |
| Tailwind config | `src/app/globals.css` (`@theme` block) |
| Theme hook | `src/providers/ThemeProvider.tsx` |
| Agent rules | `.cursor/rules/sneh-ui-kit.mdc` and `CLAUDE.md` |
| Full contracts | `ai/component-contracts.md` |
