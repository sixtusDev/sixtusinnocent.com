# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` or `npm start` - Start Astro development server
- `npm run build` - Build the production site (runs Astro build + Jampack optimization)
- `npm run preview` - Preview the built site

### Code Quality
- `npm run format` - Format code with Prettier (includes Astro plugin)
- `npm run format:check` - Check code formatting without modifying files
- `npm run lint` - Run ESLint on the codebase

### Git Workflow
- `npm run cz` - Use commitizen for conventional commits
- Pre-commit hooks automatically run lint-staged (Prettier formatting on staged files)

### Testing
No test commands are configured. If testing is needed, add appropriate test runners.

## Architecture

This is an Astro-based personal website and blog with the following structure:

### Content Management
- **Blog posts**: Located in `src/content/blog/`
- **Book notes**: Located in `src/content/bookNotes/`
- **Course notes**: Located in `src/content/courseNotes/`
- Content uses Astro's content collections API with schema validation in `src/content/config.ts`

### Core Technologies
- **Framework**: Astro 4.x with SSG (Static Site Generation)
- **Styling**: Tailwind CSS with Typography plugin
- **Search**: Client-side search using Fuse.js
- **Interactive Components**: React for search and datetime components
- **Build Optimization**: Jampack for final optimization after Astro build
- **Deployment**: Vercel (configuration in `.vercel/`)

### Key Configuration Files
- `src/config.ts`: Site metadata, social links, and global settings
- `astro.config.ts`: Astro configuration with integrations (Tailwind, React, Sitemap, Partytown)
- Content schema supports markdown with frontmatter including: title, description, tags, publication/modification dates, featured status, and OpenGraph images

### Path Aliases
The project uses TypeScript path aliases configured in `tsconfig.json`:
- `@assets/*` → `src/assets/*`
- `@config` → `src/config.ts`
- `@components/*` → `src/components/*`
- `@content/*` → `src/content/*`
- `@layouts/*` → `src/layouts/*`
- `@pages/*` → `src/pages/*`
- `@styles/*` → `src/styles/*`
- `@utils/*` → `src/utils/*`

### Important Patterns
- OpenGraph image generation using Satori and Sharp (see `src/utils/generateOgImages.tsx`)
- RSS feed generation at `/rss.xml`
- Dynamic routing for blog posts at `/posts/[slug]`
- Tag-based filtering at `/tags/[tag]`
- Markdown plugins: Table of Contents (remark-toc) and collapsible sections (remark-collapse)