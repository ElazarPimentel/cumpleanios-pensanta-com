# CLAUDE.md

This file provides guidance to Claude Code when working with this Next.js template project.

---

## Project Overview

**Template**: Next.js Pensanta Template
**Purpose**: Standardized starting point for new Next.js projects
**Version**: 0.1.0
**Framework**: Next.js 16.1.1 + React 19.2.3 + TypeScript 5.9

This is a template project - clone/copy for new projects, don't modify directly.

---

## Tech Stack

**Core:**
- Next.js 16.1.1 (latest with Turbopack)
- React 19.2.3
- TypeScript 5.9 (strict mode enabled)
- App Router (src/app directory)

**Styling:**
- SCSS/Sass 1.97.1 (NO Tailwind)
- globals.scss for site-wide styles

**Tooling:**
- ESLint 9.39.2
- pnpm (package manager - never use npm/yarn)
- Import alias: @/* → src/*

**Deployment:**
- Optimized for Vercel
- Static site generation (SSG) by default
- Can add ISR with revalidate

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (DO NOT use for verification)
pnpm dev

# Build for production (use this to verify code)
pnpm build

# Production server (after build)
pnpm start

# Lint
pnpm lint
```

**⚠️ CRITICAL**: NEVER run `pnpm dev` for verification. Use `pnpm build` instead.

---

## Project Structure

```
templatenextjs-pensanta-com/
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout with metadata
│       ├── page.tsx        # Home page
│       └── globals.scss    # Global styles (SCSS)
├── public/                 # Static assets
├── package.json            # Dependencies + homepage field
├── tsconfig.json           # TypeScript config (strict mode)
├── next.config.ts          # Next.js configuration
├── eslint.config.mjs       # ESLint configuration
└── CLAUDE.md               # This file
```

---

## Key Features

### TypeScript Strict Mode
- Enabled in tsconfig.json
- All type safety features enforced
- No implicit any

### SCSS Support
- Installed: sass package
- File: src/app/globals.scss
- Import in layout.tsx
- Use CSS modules: [name].module.scss

### App Router
- Modern Next.js architecture
- File-based routing in src/app/
- Server components by default
- Client components with "use client"

### Import Alias
- @/* resolves to src/*
- Example: `import { Foo } from '@/components/Foo'`

---

## Using This Template

**To create a new project:**

```bash
# Copy template
cp -r templatenextjs-pensanta-com new-project-name

# Navigate to new project
cd new-project-name

# Update package.json
# - Change "name" field
# - Change "homepage" field to actual domain

# Install dependencies
pnpm install

# Start building
pnpm build
```

**DO NOT:**
- Modify this template directly
- Use for production sites (copy first)
- Add Tailwind (use SCSS)
- Change package manager to npm/yarn

---

## Configuration

### package.json
- **name**: templatenextjs-pensanta-com
- **version**: 0.1.0
- **homepage**: https://templatenextjs.pensanta.com (update for each project)

### tsconfig.json
- **strict**: true (enforced)
- **paths**: @/* → ./src/*
- **target**: ES2017
- **jsx**: react-jsx

### ESLint
- Next.js recommended config
- TypeScript support
- Strict rules enabled

---

## Best Practices

**File Organization:**
- Components in src/components/
- Utilities in src/lib/
- Types in src/types/
- Public assets in public/

**Styling:**
- Use globals.scss for site-wide styles
- Use CSS modules for component-specific styles
- Follow mobile-first approach
- Use CSS custom properties for theming

**TypeScript:**
- Always define types/interfaces
- Use strict mode features
- Avoid `any` type
- Export types when reused

**Next.js:**
- Use server components by default
- Add "use client" only when needed
- Use App Router conventions
- Optimize images with next/image

---

## Common Tasks

### Add a New Page
```bash
# Create folder in src/app
mkdir src/app/about

# Create page.tsx
touch src/app/about/page.tsx

# Add metadata export
export const metadata = { title: "About" }
```

### Add SCSS Module
```bash
# Create module file
touch src/components/Button.module.scss

# Import in component
import styles from './Button.module.scss'
```

### Add Environment Variables
```bash
# Create .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

# Use in code
process.env.NEXT_PUBLIC_API_URL
```

---

## Version History

- v0.1.0 - Initial template (Next.js 16, React 19, TypeScript 5, SCSS)

---

## Support

This template follows Pensanta.com standards for Next.js projects.

For updates to this template, modify in templatenextjs-pensanta-com/, then redistribute to projects that need it.
