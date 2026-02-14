# Murojaah - Project Context

## Overview

Murojaah is a web application for tracking Qur'an memorization and review activities (murojaah/muraja'ah). It allows users to log their recitation activities by Juz, Surah, or Ayah, track their progress with statistics, and export/import their data.

**Live URL**: https://rr-murojaah.vercel.app

## Tech Stack

| Category         | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | Next.js 15 (App Router)          |
| UI Library       | React 19                         |
| Language         | TypeScript                       |
| Styling          | Tailwind CSS                     |
| UI Components    | Headless UI, Heroicons           |
| State Management | Zustand                          |
| Local Database   | JSStore (IndexedDB wrapper)      |
| Date Handling    | Luxon                            |
| Form Inputs      | React Select                     |
| Package Manager  | pnpm                             |
| Deployment       | Vercel (static) / Docker + Nginx |

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page (Activity page)
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── activities/page.tsx       # Activities view page
│   └── stats/page.tsx            # Statistics page
│
├── database/
│   └── indexeddb/
│       ├── schema.ts             # JSStore database schema
│       └── connection.ts         # Database connection
│
├── module/                       # Feature modules
│   ├── activity/                 # Activity logging module
│   │   ├── component/
│   │   │   ├── Card/             # Activity card components
│   │   │   ├── Form/             # Activity form components
│   │   │   ├── Page/             # Page view components
│   │   │   └── View/             # View mode components
│   │   ├── entity/               # Activity types and interfaces
│   │   ├── repository/           # Data access layer (IndexedDB)
│   │   ├── service/              # Business logic
│   │   └── store/                # Zustand state stores
│   │
│   ├── approach/                 # Recitation approach types
│   │   ├── entity/               # Approach enum
│   │   └── service/
│   │
│   └── stat/                     # Statistics module
│       ├── component/
│       ├── entity/
│       ├── service/
│       └── store/
│
└── shared/                       # Shared utilities and components
    ├── component/                # Navbar, Header, Alert, Menu, Base
    ├── const/                    # Application constants (links)
    ├── entity/                   # Shared types (Surah, Juz, Option, Alert)
    ├── service/                  # Shared services (surah, juz, options)
    ├── store/                    # Global stores (alert-store)
    └── util/                     # Utilities (datetime, validator)
```

## Architecture Pattern

The project follows a **modular architecture** with clear separation of concerns:

- **Entity**: Type definitions and data models
- **Repository**: Data persistence layer (IndexedDB operations)
- **Service**: Business logic and data transformations
- **Store**: Client state management (Zustand)
- **Component**: UI components organized by feature

## Data Models

### Activity

```typescript
type Activity = {
  id: string; // UUID v4
  activityType: ActivityType; // Juz=0 | Surah=1 | Ayah=2
  juz?: number; // Optional: Juz number (1-30)
  surah?: number; // Optional: Surah number (1-114)
  startAyah?: number; // Optional: Start ayah for Ayah type
  endAyah?: number; // Optional: End ayah for Ayah type
  markSurahDone?: boolean; // Optional: Mark surah as completed
  markJuzDone?: boolean; // Optional: Mark juz as completed
  approachId: number; // Recitation approach
  repeat: number; // Number of repetitions
  occuredAt: Date; // When activity occurred
};
```

### ActivityType Enum

```typescript
enum ActivityType {
  Uninitialized = -1,
  Juz = 0, // Recite by Juz
  Surah = 1, // Recite by Surah
  Ayah = 2, // Recite by Ayah range
}
```

### Approach Enum

```typescript
enum Approach {
  JahrMemory = 'jahr with memory', // Loud recitation from memory
  JahrReading = 'jahr with reading', // Loud recitation reading
  SirrMemory = 'sirr with memory', // Silent recitation from memory
  SirrReading = 'sirr with reading', // Silent recitation reading
  Memorizing = 'memorizing in progress',
}
```

### Surah Data

Located in `src/shared/entity/surah.ts`. Contains 114 surahs with:

- `id`: Surah number
- `name`: Surah name
- `juz`: Array of juz numbers the surah spans
- `juzDetail`: Optional detailed juz/ayah mapping
- `totalLines`: Lines in the mushaf
- `totalAyah`: Total ayah count

## Views

The application supports multiple view modes:

1. **Compact Date View** (`?view=compact-date`): Activities grouped by date with statistics
2. **List Surah View** (`?view=list-surah`): Surahs with last read tracking

## Development Commands

```bash
# Install dependencies
make dep

# Run development server
make run  # or make dev

# Build for production (static)
make build

# Run with Docker + Nginx
make prod  # build + start

# Linting
make lint
make lint-fix

# Formatting
make format
make format-check
```

## Key Files to Reference

| Purpose         | File                                  |
| --------------- | ------------------------------------- |
| Database Schema | `src/database/indexeddb/schema.ts`    |
| Activity Entity | `src/module/activity/entity/index.ts` |
| Surah Reference | `src/shared/entity/surah.ts`          |
| Juz Reference   | `src/shared/entity/juz.ts`            |
| App Constants   | `src/shared/const/index.ts`           |
| Global Styles   | `src/app/globals.css`                 |
| ERD Diagram     | `doc/diagram/erd.mmd`                 |

## Technical Debt

See `techdebt.txt` for pending items:

- TD-3: Implement proper number input for ayah
- TD-4: Fill the rest total lines and ayah for surahs
- TD-6: Implement proper success import notification
- TD-8: Implement calculateByAyah() for module counter
- TD-9: Implement handler for type SurahJuz in module stat
- TD-10: Implement totalMarkedJuzAsDone calculation in module stat
- TD-11/12: Handle version differences in export/import
- TD-13: Handle metadata with use client

## Coding Conventions

> See `doc/pattern/pattern.md` for detailed patterns and best practices.

1. **File Naming**: PascalCase for components, camelCase for utilities
2. **Imports**: Use `@/` alias for absolute imports from `src/`
3. **Components**: Functional components with TypeScript
4. **State**: Zustand stores per module for client state
5. **Styling**: Tailwind CSS classes, clsx for conditional classes
6. **Database**: JSStore for IndexedDB operations

## Notes

- The app is fully client-side with IndexedDB storage
- Data can be exported/imported via JSON files
- Uses `'use client'` directive for client components
- Static export for Vercel deployment (no server-side features)
