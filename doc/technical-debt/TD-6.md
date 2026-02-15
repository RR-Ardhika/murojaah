# TD-6: Remove Page Reload After Data Import

**Status:** 🟡 Planned
**Priority:** Low
**Location:** `src/shared/component/Menu.tsx`

---

## Current State

After successful data import, the app does `window.location.reload()` which provides a jarring user experience. The success alert IS already implemented.

## Actual Problem (corrected)

- ❌ Original documentation incorrectly stated "no user feedback"
- ✅ Success alert already existed: `i.showAlert(AlertColor.Green, AlertText.SuccessImportedDB)`
- ❌ The real issue is the full page reload after import

## Code Reference

```typescript
// Current implementation (problematic)
await service.importData(blob);
i.showAlert(AlertColor.Green, AlertText.SuccessImportedDB);
setTimeout(() => {
  window.location.reload(); // ← This is the actual problem
}, 2000);
```

## Expected Behavior

Refresh data in components without full page reload, using idiomatic React patterns (e.g., Zustand store updates).

## History

PR #62 attempt to fix.

## What's in PR #62

- Uses global `window.dispatchEvent` instead of Zustand (non-idiomatic)
- Introduces arbitrary 500ms delay (race condition potential)
- 8 files changed vs simpler direct approach

## Recommended Solution

```typescript
// Direct Zustand refresh (idiomatic, no delays)
import { useDataStore, useCompactDateDataStore, useListSurahDataStore } from '@/module/activity/store';

await service.importData(blob);
i.showAlert(AlertColor.Green, AlertText.SuccessImportedDB);

// Refresh all stores - reactive, no timing needed
useDataStore.getState().fetchData();
useCompactDateDataStore.getState().fetchData();
useListSurahDataStore.getState().fetchData();
```
