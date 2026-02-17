# Technical Debt Dashboard

> Last updated: 2026-02-17

This document provides a comprehensive overview of all technical debt items in the Murojaah codebase.

---

## Summary

| Status | Count |
|--------|-------|
| 🔴 Open | 6 |
| 🟡 In Progress | 0 |
| ✅ Resolved | 2 |

---

## Technical Debt Items

| ID | Description | Status | PR | Priority |
|----|-------------|--------|-----|----------|
| [TD-3](./TD-3.md) | Implement proper number input for ayah | ✅ Resolved | #68 | Medium |
| [TD-4](./TD-4.md) | Fill total lines and ayah for surahs 1-45 | 🔴 Open | - | High |
| [TD-6](./TD-6.md) | Remove page reload after data import | ✅ Resolved | #70 | Low |
| [TD-8](./TD-8.md) | Implement calculateByAyah() for module counter | 🔴 Open | - | Medium |
| [TD-9](./TD-9.md) | Implement handler for type SurahJuz in module stat | 🔴 Open | - | Medium |
| [TD-10](./TD-10.md) | Implement totalMarkedJuzAsDone calculation | 🔴 Open | - | Medium |
| [TD-11](./TD-11.md) | Handle when version is different | 🔴 Open | - | Low |
| [TD-12](./TD-12.md) | Handle different version export/import | 🔴 Open | - | Low |
| [TD-13](./TD-13.md) | Handle metadata with use client | 🔴 Open | - | Low |

---

## Related Documentation

- `doc/pattern/pattern.md` - Coding patterns and conventions

---

_Changelog:_
- _2026-02-17: TD-6 resolved (PR #70)_
- _2026-02-16: TD-3 resolved (PR #68)_
- _2026-02-16: Split detailed descriptions into individual files_
- _2026-02-15: Initial creation of tech debt dashboard_
