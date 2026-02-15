# Technical Debt Dashboard

> Last updated: 2026-02-15

This document provides a comprehensive overview of all technical debt items in the Murojaah codebase.

---

## Summary

| Status | Count |
|--------|-------|
| 🔴 Open | 8 |
| 🟡 In Progress | 1 |
| ✅ Resolved | 0 |

---

## Technical Debt Items

| ID | Description | Status | PR | Priority | Location |
|----|-------------|--------|-----|----------|----------|
| TD-3 | Implement proper number input for ayah | 🔴 Open | - | Medium | `src/module/activity/component/Form/Input/NumberInput.tsx` |
| TD-4 | Fill total lines and ayah for surahs 1-45 | 🔴 Open | - | High | `src/shared/entity/surah.ts` |
| TD-6 | Remove page reload after data import | 🟡 Planned | - | Low | `src/shared/component/Menu.tsx` |
| TD-8 | Implement calculateByAyah() for module counter | 🔴 Open | - | Medium | `src/module/stat/service/` |
| TD-9 | Implement handler for type SurahJuz in module stat | 🔴 Open | - | Medium | `src/module/stat/service/index.ts:108` |
| TD-10 | Implement totalMarkedJuzAsDone calculation | 🔴 Open | - | Medium | `src/module/stat/service/index.ts:35,54` |
| TD-11 | Handle when version is different | 🔴 Open | - | Low | Export/Import |
| TD-12 | Handle different version export/import | 🔴 Open | - | Low | `src/module/activity/repository/indexeddb/export-import.ts` |
| TD-13 | Handle metadata with use client | 🔴 Open | - | Low | `src/app/layout.tsx` |

---

## Detailed Descriptions

### TD-3: Proper Number Input for Ayah

**Priority:** Medium

**Current State:** The `NumberInput` component uses a basic HTML number input without validation or proper UX.

**Location:** `src/module/activity/component/Form/Input/NumberInput.tsx`

**Expected Behavior:**
- Validate input range based on selected surah's total ayah count
- Provide visual feedback for invalid inputs
- Consider using a stepper or slider for better UX

---

### TD-4: Complete Surah Data

**Priority:** High

**Current State:** Surahs 1-45 have `totalLines: 0` and `totalAyah: 0`, causing inaccurate statistics.

**Location:** `src/shared/entity/surah.ts`

**Status:** PR #60 was reviewed but will be **closed** - the data does not match quran.com's Classic Madani 15-line mushaf.

**Impact:** Statistics calculations for activities involving surahs 1-45 return 0 values.

**Next Steps:**
1. Manually count surahs **1-45** from quran.com Classic Madani 15-line mushaf
2. Count methodology: surah header + basmala + text lines
3. Create new PR with verified data
4. Keep surahs 46-114 unchanged

**Methodology:** See [doc/surah/lines-methodology.md](./surah/lines-methodology.md) for counting methodology.

---

### TD-6: Remove Page Reload After Data Import

**Priority:** Low

**Status:** Planned. PR #62 will be closed.

**Current State:** After successful data import, the app does `window.location.reload()` which provides a jarring user experience. The success alert IS already implemented.

**Actual Problem (corrected):**
- ❌ Original documentation incorrectly stated "no user feedback"
- ✅ Success alert already existed: `i.showAlert(AlertColor.Green, AlertText.SuccessImportedDB)`
- ❌ The real issue is the full page reload after import

**Location:** `src/shared/component/Menu.tsx`

**Code Reference:**
```typescript
// Current implementation (problematic)
await service.importData(blob);
i.showAlert(AlertColor.Green, AlertText.SuccessImportedDB);
setTimeout(() => {
  window.location.reload(); // ← This is the actual problem
}, 2000);
```

**Expected Behavior:** Refresh data in components without full page reload, using idiomatic React patterns (e.g., Zustand store updates).

**Why PR #62 was rejected:**
- Uses global `window.dispatchEvent` instead of Zustand (non-idiomatic)
- Introduces arbitrary 500ms delay (race condition potential)
- 8 files changed vs simpler direct approach

**Recommended Solution:**
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

---

### TD-8: calculateByAyah() for Counter Module

**Priority:** Medium

**Current State:** Missing implementation for ayah-based calculations.

**Location:** `src/module/stat/service/`

**Impact:** Ayah-based activities may not contribute correctly to statistics.

---

### TD-9: SurahJuz Type Handler in Stat Module

**Priority:** Medium

**Current State:** The handler for `SurahJuz` type is not implemented.

**Location:** `src/module/stat/service/index.ts:108`

**Code Reference:**
```typescript
// TD-9 Implement handler for type SurahJuz in module stat
```

---

### TD-10: totalMarkedJuzAsDone Calculation

**Priority:** Medium

**Current State:** Always returns 0.

**Location:** `src/module/stat/service/index.ts:35,54`

**Code Reference:**
```typescript
totalMarkedJuzAsDone: 0, // TD-10 Implement totalMarkedJuzAsDone calculation in module stat
```

**Expected Behavior:** Count and return the number of juzs marked as done in activities.

---

### TD-11 & TD-12: Version Handling for Export/Import

**Priority:** Low

**Current State:** No version handling when exporting/importing data.

**Location:** `src/module/activity/repository/indexeddb/export-import.ts`

**Risk:** Future schema changes may break compatibility with exported data.

**Expected Behavior:**
- Add version number to exported data
- Handle migration when importing older versions
- Provide user feedback for incompatible versions

---

### TD-13: Metadata with use client

**Priority:** Low

**Current State:** The `metadata` export is commented out because `layout.tsx` uses `'use client'`.

**Location:** `src/app/layout.tsx`

**Code Reference:**
```typescript
// TD-13 Handle metadata with use client
// export const metadata: Metadata = {
//   title: 'Murojaah',
//   description: 'Murojaah application',
// };
```

**Potential Solutions:**
- Create a separate server component for metadata
- Use `generateMetadata` API
- Move client-side logic to a separate component

---

## Related Documentation

- `doc/pattern/pattern.md` - Coding patterns and conventions

---

_Changelog:_
- _2026-02-15: Initial creation of tech debt dashboard_
