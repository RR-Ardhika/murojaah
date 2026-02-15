# Murojaah - Coding Patterns & Conventions

This document outlines coding patterns and conventions for the Murojaah codebase. Follow these guidelines to maintain consistency and avoid common pitfalls.

---

## Table of Contents

1. [React Hooks](#react-hooks)
2. [TypeScript](#typescript)
3. [Component Patterns](#component-patterns)
4. [State Management](#state-management)
5. [Performance Optimization](#performance-optimization)
6. [File Organization](#file-organization)

---

## React Hooks

### useMemo Rules

#### ✅ DO: Use useMemo for expensive computations

```tsx
// Good: Memoizing derived data from dependencies
const filteredItems = useMemo(() => {
  return items.filter((item) => item.isActive);
}, [items]);

// Good: Memoizing static data that doesn't change
const staticOptions = useMemo(() => generateOptions(), []);
```

#### ❌ DON'T: Put side effects inside useMemo

```tsx
// BAD: Mutation inside useMemo
const renderedData = useMemo(() => {
  let currentJuz: number;
  return data.map((item) => {
    currentJuz = item.juz; // ❌ Side effect!
    return <Card item={item} />;
  });
}, [data]);
```

**Why?** `useMemo` is for derived data only. Side effects can cause:

- Stale renders
- Inconsistent state
- Hard-to-debug issues

> ⚠️ **Note**: Moving an existing mutation into `useMemo` makes it WORSE. If you have render-time mutations, fix them first before adding `useMemo`.

**Solution**: Use `useRef` for mutable values that don't trigger re-renders:

```tsx
// Good: Use useRef for tracking mutable state
const currentJuzRef = useRef<number | null>(null);

const renderedData = useMemo(() => {
  return data.map((item) => {
    const isNewJuz = currentJuzRef.current !== item.juz;
    if (isNewJuz) {
      currentJuzRef.current = item.juz; // ✅ Safe - useRef mutation is allowed
    }
    return <Card key={item.id} item={item} showHeader={isNewJuz} />;
  });
}, [data]);
```

#### ❌ DON'T: Wrap everything in useMemo

```tsx
// BAD: Over-memoization with many dependencies
const sharedProps = useMemo(
  () => ({
    value1,
    value2,
    value3,
    setter1,
    setter2,
    setter3,
  }),
  [value1, value2, value3, setter1, setter2, setter3]
);
// This provides no benefit - any dep change creates new object
```

**Why?** If most dependencies change frequently, the memoization overhead exceeds any benefit.

**Solution**: Only memoize when there's a clear performance gain:

```tsx
// Good: Simple object, no memoization needed
const sharedProps = {
  value1,
  value2,
  setter1,
  setter2,
};
```

### Dependency Arrays

#### ✅ DO: Keep dependencies minimal

```tsx
// Good: Only include values that affect the computation
const filteredData = useMemo(() => {
  return data.filter((item) => item.status === filter);
}, [data, filter]);
```

#### ✅ DO: Know which values are stable

Zustand setters and dispatch functions are stable references:

```tsx
// Good: Zustand setters are stable, don't include in deps
const { setData, fetchData } = useStore();

useEffect(() => {
  fetchData();
}, [fetchData]); // fetchData is stable, but including it is fine

// Even better if fetchData never changes:
useEffect(() => {
  fetchData();
}, []); // Only if fetchData is guaranteed stable
```

### useCallback Rules

#### ✅ DO: Use useCallback when passing functions to optimized children

```tsx
// Good: Stable function reference for child memoization
const handleSubmit = useCallback(
  (data: FormData) => {
    submitForm(data);
  },
  [submitForm]
);

return <Form onSubmit={handleSubmit} />;
```

#### ❌ DON'T: Wrap every function in useCallback

```tsx
// Unnecessary: Simple handler in non-memoized component
const handleClick = useCallback(() => {
  setIsOpen(true);
}, [setIsOpen]);
// No benefit if parent isn't memoized
```

---

## TypeScript

### Type Annotations

#### ✅ DO: Let TypeScript infer types when obvious

```tsx
// Good: TypeScript infers the return type
const options = useMemo(() => juzOptions(), []);

// Good: Explicit when inference might be wrong
const [value, setValue] = useState<string | null>(null);
```

#### ❌ DON'T: Add redundant type annotations

```tsx
// Unnecessary: TypeScript can infer Option[]
const juzOpts: Option[] = useMemo(() => juzOptions(), []);

// Better: Let TypeScript infer
const juzOpts = useMemo(() => juzOptions(), []);
```

#### ❌ DON'T: Use @ts-expect-error to silence real issues

```tsx
// BAD: Hiding a real type problem
const i: InternalProps = {
  // ...
  // @ts-expect-error expected assigned
  currentJuz, // This is actually undefined!
};
```

**Solution**: Fix the underlying type issue instead:

```tsx
// Good: Proper typing
const i: InternalProps = {
  // ...
  currentJuz: 0, // Or use optional: currentJuz?
};
```

### @ts-expect-error Guidelines

`@ts-expect-error` should be used sparingly and only when there's no better alternative.

#### ✅ DO: Use for third-party library type issues

When a library has incomplete or incorrect type definitions:

```tsx
// Acceptable: react-select has complex generic types that are hard to satisfy
<Select
  // @ts-expect-error react-select props mismatch with our Option type
  onChange={handleChange}
  options={options}
/>

// Acceptable: Library returns 'any' but we know the type
const result = externalLib.method();
// @ts-expect-error library types incomplete
const typedResult: KnownType = result.someProperty;
```

#### ✅ DO: Add a comment explaining why

Always explain why the suppress is necessary:

```tsx
// @ts-expect-error: Dexie db.open() types don't include our custom database
await db.open();
```

#### ❌ DON'T: Use to hide real type bugs

```tsx
// BAD: This is hiding a bug - currentJuz is undefined at this point!
const i: InternalProps = {
  // @ts-expect-error expected assigned
  currentJuz,
};

// GOOD: Fix the actual issue
const i: InternalProps = {
  currentJuz: 0, // Initialize properly
};
```

#### ❌ DON'T: Use for type assertions that could be fixed

```tsx
// BAD: Lazy type assertion
// @ts-expect-error
const value: string = someNumber;

// GOOD: Proper conversion
const value: string = String(someNumber);
```

### @ts-expect-error Audit Checklist

When reviewing code with `@ts-expect-error`:

- [ ] Is this a third-party library type issue?
- [ ] Is there a comment explaining why it's needed?
- [ ] Could the type be fixed properly instead?
- [ ] Is this hiding a potential runtime bug?

---

## Component Patterns

### Props

#### ✅ DO: Define explicit prop interfaces

```tsx
// Good: Clear prop definition
interface CardProps {
  item: Activity;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}

export const Card = ({ item, onSelect, isSelected = false }: CardProps) => {
  // ...
};
```

#### ✅ DO: Use shared prop types for related components

```tsx
// Good: Shared props for form components
export interface SharedProps {
  fetchData: () => Promise<void>;
  selectedJuz: Option | undefined;
  setSelectedJuz: Dispatch<SetStateAction<Option | undefined>>;
  // ...
}
```

### Component Organization

Follow the modular structure:

```
module/
├── component/     # UI components
├── entity/        # Types and interfaces
├── repository/    # Data access (IndexedDB)
├── service/       # Business logic
└── store/         # Zustand stores
```

---

## State Management

### Zustand Best Practices

#### ✅ DO: Use selectors for specific data

```tsx
// Good: Only subscribe to needed values
const { data, fetchData } = useListSurahDataStore();
const isFormVisible = useFormStore((state) => state.isFormVisible);
```

#### ✅ DO: Setters are stable references

```tsx
// Good: Zustand setters don't need to be in dependency arrays
const { setIsFormVisible } = useFormStore();

const handleClick = useCallback(() => {
  setIsFormVisible(true);
}, [setIsFormVisible]); // Including is fine but optional
```

---

## Performance Optimization

### When to Optimize

1. **Measure first**: Use React DevTools Profiler to identify bottlenecks
2. **Optimize wisely**: Only optimize what's proven slow
3. **Avoid premature optimization**: Clear code > micro-optimizations

### Checklist Before Adding useMemo

- [ ] Is the computation expensive? (O(n) iterations, complex calculations)
- [ ] Are dependencies relatively stable?
- [ ] Will this prevent re-renders of memoized children?
- [ ] Is the memoization benefit greater than its overhead?
- [ ] **Does the code contain any mutations or side effects?** → Fix FIRST before wrapping in useMemo

If you answer "no" to most of these, skip the memoization.

> ⚠️ **Refactoring Tip**: When adding `useMemo` to existing code, check for render-time mutations FIRST. Wrapping a mutation in `useMemo` doesn't fix it—it makes it worse by violating hook purity.

### Common Optimization Patterns

#### Static Data

```tsx
// Good: Static options generated once
const options = useMemo(() => generateOptions(), []);
```

#### Derived State

```tsx
// Good: Expensive filtering/sorting
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

#### List Rendering

```tsx
// Good: Memoize rendered list items
const renderedItems = useMemo(() => {
  return items.map((item) => <ItemCard key={item.id} item={item} />);
}, [items]);
```

---

## File Organization

### Import Order

```tsx
// 1. React and framework imports
import { useState, useMemo } from 'react';
import { Transition, Dialog } from '@headlessui/react';

// 2. External libraries
import { clsx } from 'clsx';
import { DateTime } from 'luxon';

// 3. Internal shared components/utilities
import { Base } from '@/shared/component/Base';
import { Option } from '@/shared/entity';

// 4. Module-specific imports
import { ActivityType } from '../../entity';
import { useFormStore } from '../../store';
```

### File Naming

- **Components**: PascalCase (e.g., `ListSurahCard.tsx`)
- **Utilities**: camelCase (e.g., `datetime.ts`)
- **Stores**: camelCase with `Store` suffix (e.g., `formStore.ts`)
- **Types**: `index.ts` for entity exports

---

## Common Anti-Patterns to Avoid

### 1. Mutable State in Render

```tsx
// ❌ BAD
let currentJuz: number;
data.map((item) => {
  currentJuz = item.juz; // Mutation in render!
});

// ✅ GOOD
const currentJuzRef = useRef<number>(0);
```

### 2. Stale Closures in Effects

```tsx
// ❌ BAD: Missing dependency
useEffect(() => {
  fetchData(filter);
}, []); // filter is missing!

// ✅ GOOD
useEffect(() => {
  fetchData(filter);
}, [fetchData, filter]);
```

### 3. Over-Engineering Props

```tsx
// ❌ BAD: Excessive prop drilling
<Child a={a} b={b} c={c} d={d} e={e} f={f} />

// ✅ GOOD: Group related props
<Child config={config} handlers={handlers} />
// Or use context/store for deeply nested data
```

---

## Quick Reference

| Pattern         | Use When                           | Avoid When                       |
| --------------- | ---------------------------------- | -------------------------------- |
| `useMemo`       | Expensive computation, stable deps | Cheap ops, frequent dep changes  |
| `useCallback`   | Passing to memoized children       | Simple handlers, no memoization  |
| `useRef`        | Mutable value without re-render    | State that should trigger render |
| Type annotation | Ambiguous types, complex unions    | Obvious inference, simple types  |

---

_Last updated: 2026-02-15 02:49 AM
