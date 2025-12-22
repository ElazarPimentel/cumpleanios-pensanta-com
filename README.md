# Next.js Pensanta Template

Standardized Next.js template for Pensanta projects with TypeScript, SCSS, and ESLint.

## Stack

- **Next.js 16.1.1** (Turbopack)
- **React 19.2.3**
- **TypeScript 5.9** (strict mode)
- **SCSS/Sass** (NO Tailwind)
- **ESLint**
- **pnpm** (package manager)

## Quick Start

```bash
# Copy this template
cp -r templatenextjs-pensanta-com your-project-name

# Navigate
cd your-project-name

# Install
pnpm install

# Build
pnpm build

# Start production
pnpm start
```

## Configuration

After copying, update:
1. `package.json` → "name" and "homepage" fields
2. `src/app/layout.tsx` → metadata (title, description)
3. `src/app/globals.scss` → styles as needed

## Commands

```bash
pnpm dev       # Development server
pnpm build     # Production build
pnpm start     # Production server
pnpm lint      # Run ESLint
```

## Features

✅ App Router with src/ directory
✅ TypeScript strict mode
✅ SCSS support
✅ ESLint configured
✅ Import alias (@/*)
✅ Optimized for Vercel

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed documentation.

---

**Template by:** [Pensanta.com](https://pensanta.com)
