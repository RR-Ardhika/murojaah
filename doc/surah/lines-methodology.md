# Surah Line Count Methodology

> Last updated: 2026-02-15
> Related: TD-4

This document explains the methodology for counting `totalLines` in the surah data (`src/shared/entity/surah.ts`).

---

## ⚠️ Status: Surahs 1-45 Require Recount

**Data for surahs 1-45 is unreliable and needs to be manually verified.**

After spot-check verification against quran.com's **Classic Madani 15-line mushaf**, discrepancies were found in the PR #60 data for surahs 1-45:

| Surah | Manual Count | PR #60 | mushaf-layout |
|-------|--------------|--------|---------------|
| 1 (Al-Fatihah) | **8** | 7 | 8 |
| 44 (Ad-Dukhan) | **44** | 38 | 46 |

**Note**: Surahs 46-114 already have data in main branch and were **unchanged** by PR #60.

**Conclusion**: Surahs 1-45 must be manually recounted from quran.com.

---

## Authoritative Source

| Attribute | Value |
|-----------|-------|
| **Mushaf** | Classic Madani Mushaf |
| **Source** | quran.com mobile app / website |
| **Format** | 15 lines per page |
| **Script** | Standard Arabic (Indo-Pak style) |

---

## Counting Methodology

```
totalLines = surah header + basmala + text lines
```

### Rules

1. **Surah Header**: Count 1 line (e.g., "سورة الفاتحة")
2. **Basmala**: Count 1 line (except Surah At-Taubah - no basmala)
3. **Text Lines**: Count all Quran text lines
4. **Page Breaks**: Ignore - only count lines within the surah

### Example: Al-Fatihah (Surah 1)

| Component | Lines |
|-----------|-------|
| Surah header | 1 |
| Basmala | 1 |
| Text (7 ayahs) | 6 |
| **Total** | **8** |

### Example: Ad-Dukhan (Surah 44)

| Component | Lines |
|-----------|-------|
| Surah header | 1 |
| Basmala | 1 |
| Text (59 ayahs) | 42 |
| **Total** | **44** |

---

## Action Required

To resolve TD-4, the following steps are needed:

1. **Manual Recount**: Count surahs **1-45** from quran.com Classic Madani 15-line mushaf
2. **Create Tracking Sheet**: Use a spreadsheet or markdown table to record counts
3. **Verify Totals**:
   - Total ayahs = 6,236 (already correct in current data)
   - Total lines for surahs 1-45 = TBD (after recount)
4. **Update `surah.ts`**: Replace `totalLines` for surahs 1-45 with verified counts
5. **Preserve**: Keep existing data for surahs 46-114 unchanged

---

## Data Validation Checklist

After recount, verify:

```typescript
// All 114 surahs should have non-zero values
surah.every(s => s.totalLines > 0 && s.totalAyah > 0) // true

// Total ayahs should equal 6,236
surah.reduce((sum, s) => sum + s.totalAyah, 0) // 6236

// Total lines should equal [TBD after recount]
surah.reduce((sum, s) => sum + s.totalLines, 0) // TBD
```

---

## Related Files

| File | Purpose |
|------|---------|
| `src/shared/entity/surah.ts` | Surah data with line counts |
| `src/module/stat/service/index.ts` | Uses `totalLines` for calculations |
| `doc/technical-debt/TD-4.md` | TD-4 tracking |
| `data-discrepancy.md` | Comparison of sources (for reference) |
| `lines-internet.md` | mushaf-layout data (unreliable - for reference only) |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-15 | Initial documentation created during PR #60 review |
| 2026-02-15 | Clarified: surahs 93-114 exclude header+basmala intentionally |
| 2026-02-15 | **Updated**: Neither PR #60 nor mushaf-layout is reliable; manual recount required |

---

_This document will be updated after the manual recount is completed._
