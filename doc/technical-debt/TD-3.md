# TD-3: Proper Number Input for Ayah

**Status:** ✅ Resolved (PR #68)
**Priority:** Medium
**Location:** `src/module/activity/component/Form/Input/NumberInput.tsx`

---

## Resolution

- Added `id`, `min`, `max`, `onError` props to `NumberInput` component
- Validation on blur with visual feedback (red border + error message)
- Validates ayah range against selected surah's `totalAyah`
- Validates start ≤ end ayah relationship with contextual error messages
- Save button disabled when validation fails
- Accessibility: labels properly associated with inputs via `htmlFor`/`id`
- TD-4 handled: validation skipped when `totalAyah === 0`

---

## History

**Note:** Previous attempt (PR #61) has incomplete wiring.
