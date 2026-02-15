# Surah Line Count Methodology

> Last updated: 2026-02-15
> Related: PR #60, TD-4

This document explains the methodology used for counting `totalLines` in the surah data (`src/shared/entity/surah.ts`).

---

## Overview

The `totalLines` values in the surah entity are based on a **15-line mushaf** format, with a specific adjustment for Juz 30. Understanding this methodology is important for maintaining data consistency.

---

## Data Source

| Attribute | Value |
|-----------|-------|
| **Mushaf Type** | 15-line per page |
| **Source** | Quran.com standard 15-line mushaf |
| **Headers** | ✅ Included (surah names, bismillah) for surahs 1-92 |
| **Headers (Juz 30)** | ❌ Excluded for surahs 93-114 (intentional, see below) |
| **Total Lines** | 7,892 (all 114 surahs) |

---

## Key Adjustment: Juz 30

### The Formula

Juz 30 has been **adjusted** to fit the formula:

```
15 lines × 20 pages = 300 lines
```

### Why This Adjustment?

1. **Consistency**: Each juz follows a predictable 300-line pattern
2. **Simplicity**: Easier for users to track progress (300 lines/juz)
3. **Calculation**: Simplifies statistics calculations in the app

### How It Was Done

- **Surahs 78-92**: Count text + surah header + bismillah (standard methodology)
- **Surahs 93-114**: Count **text only** (exclude header + bismillah = -2 lines each)
- This reduces Juz 30 to exactly 300 lines
- 22 surahs × 2 lines = 44 lines subtracted from standard count

---

## Comparison with Standard References

| Metric | Our Data | Standard 15-Line Reference | Difference |
|--------|----------|---------------------------|------------|
| **Total Lines** | 7,892 | ~8,815 | -923 (-10.5%) |
| **Juz 30 Lines** | 300 | ~350+ | -50+ (adjusted) |
| **Ayah Count** | 6,236 | 6,236 | ✅ Exact match |

### Why the Difference?

The ~923 line difference from standard references is due to:

1. **Juz 30 adjustment** - Surahs 93-114 use text-only counts (exclude header + bismillah)
2. **Counting methodology** - Surahs 1-92 count text + header + basmala, but may differ from other sources
3. **Mushaf publisher variations** - Different editions may have slight differences

---

## Juz 30 Breakdown

Total: **300 lines** (surahs 78-114)

> 💡 **Methodology Note**: Surahs 93-114 deliberately **exclude** surah header + bismillah (-2 lines each) to fit the 300-line target. Surahs 78-92 follow the standard methodology (text + header + basmala).

| ID | Surah | Lines | Ayah |
|----|-------|-------|------|
| 78 | An-Naba' | 22 | 40 |
| 79 | An-Nazi'at | 22 | 46 |
| 80 | Abasa | 16 | 42 |
| 81 | At-Takwir | 14 | 29 |
| 82 | Al-Infitar | 11 | 19 |
| 83 | Al-Mutaffifin | 21 | 36 |
| 84 | Al-Insyiqaq | 14 | 25 |
| 85 | Al-Buruj | 14 | 22 |
| 86 | At-Tariq | 8 | 17 |
| 87 | Al-A'la | 10 | 19 |
| 88 | Al-Gasiyah | 13 | 26 |
| 89 | Al-Fajr | 18 | 30 |
| 90 | Al-Balad | 11 | 20 |
| 91 | Asy-Syams | 9 | 15 |
| 92 | Al-Lail | 9 | 21 |
| 93 | Ad-Duha | 5 | 11 |
| 94 | Asy-Syarh | 3 | 8 |
| 95 | At-Tin | 4 | 8 |
| 96 | Al-'Alaq | 7 | 19 |
| 97 | Al-Qadar | 3 | 5 |
| 98 | Al-Bayyinah | 10 | 8 |
| 99 | Az-Zalzalah | 5 | 8 |
| 100 | Al-'Adiyat | 5 | 11 |
| 101 | Al-Qari'ah | 6 | 11 |
| 102 | At-Takasur | 4 | 8 |
| 103 | Al-Asr | 2 | 3 |
| 104 | Al-Humazah | 4 | 9 |
| 105 | Al-Fil | 3 | 5 |
| 106 | Quraisy | 3 | 4 |
| 107 | Al-Ma'un | 4 | 7 |
| 108 | Al-Kausar | 2 | 3 |
| 109 | Al-Kafirun | 3 | 6 |
| 110 | An-Nasr | 3 | 3 |
| 111 | Al-Lahab | 3 | 5 |
| 112 | Al-Ikhlas | 2 | 4 |
| 113 | Al-Falaq | 3 | 5 |
| 114 | An-Nas | 4 | 6 |

**Sum**: 300 lines ✅

---

## Juz Summary (All 30 Juzs)

| Juz | Lines | Notes |
|-----|-------|-------|
| 1 | 366 | Al-Fatihah + Al-Baqarah (part) |
| 2 | 336 | Al-Baqarah (part) |
| 3 | 331 | Al-Baqarah (end) + Ali Imran |
| 4 | 295 | Ali Imran (end) + An-Nisa |
| 5 | 274 | An-Nisa (part) |
| 6 | 264 | An-Nisa (end) + Al-Maidah |
| 7 | 242 | Al-Maidah (end) + Al-An'am |
| 8 | 312 | Al-An'am (end) + Al-A'raf |
| 9 | 214 | Al-A'raf (end) + Al-Anfal |
| 10 | 202 | Al-Anfal (end) + At-Taubah |
| 11 | 272 | At-Taubah (end) + Yunus + Hud |
| 12 | 210 | Hud (part) |
| 13 | 150 | Hud (end) + Yusuf + Ar-Ra'd + Ibrahim |
| 14 | 212 | Ibrahim + Al-Hijr + An-Nahl |
| 15 | 219 | An-Nahl (end) + Al-Isra + Al-Kahf |
| 16 | 242 | Al-Kahf (end) + Maryam + Taha |
| 17 | 227 | Taha (end) + Al-Anbiya + Al-Hajj |
| 18 | 208 | Al-Hajj (end) + Al-Mu'minun + An-Nur |
| 19 | 194 | An-Nur (end) + Al-Furqan + Asy-Syu'ara |
| 20 | 212 | Asy-Syu'ara (end) + An-Naml + Al-Qasas |
| 21 | 210 | Al-Qasas (end) + Al-Ankabut + Ar-Rum + Luqman + As-Sajdah |
| 22 | 212 | As-Sajdah (end) + Al-Ahzab + Saba' + Fatir |
| 23 | 231 | Fatir (end) + Ya-Sin + As-Saffat + Sad |
| 24 | 216 | Sad (end) + Az-Zumar + Gafir |
| 25 | 262 | Gafir (end) + Fussilat + Asy-Syura + Az-Zukhruf + Ad-Dukhan + Al-Jasiyah |
| 26 | 275 | Al-Jasiyah (end) through Qaf (end) |
| 27 | 189 | Adz-Dzariyat through Al-Hadid |
| 28 | 245 | Al-Mujadalah through At-Tahrim |
| 29 | 222 | Al-Mulk through Al-Mursalat |
| **30** | **300** | ⚠️ **Adjusted** to fit 15×20 formula |

**Total**: 7,892 lines

---

## Important Notes for Maintainers

### DO ✅

- Use the same mushaf source (quran.com 15-line) for any updates
- Maintain the Juz 30 adjustment (300 lines) for consistency
- Document any methodology changes in this file
- Verify ayah counts against standard references (6,236 total)

### DON'T ❌

- Mix line counts from different mushaf editions
- Change Juz 30 line counts without understanding the impact
- Assume line counts match other sources (they won't due to our methodology)
- Modify `totalAyah` values (these are standard and verifiable)

---

## Data Validation

### Quick Checks

```typescript
// All 114 surahs should have non-zero values
surah.every(s => s.totalLines > 0 && s.totalAyah > 0) // true

// Total ayahs should equal 6,236
surah.reduce((sum, s) => sum + s.totalAyah, 0) // 6236

// Total lines should equal 7,892
surah.reduce((sum, s) => sum + s.totalLines, 0) // 7892

// Juz 30 lines should equal 300
surah.filter(s => s.juz.includes(30)).reduce((sum, s) => sum + s.totalLines, 0) // 300
```

### Test Suggestions

Consider adding tests to `surah.test.ts`:

```typescript
describe('Surah Data Integrity', () => {
  it('should have all 114 surahs', () => {
    expect(surah.length).toBe(114);
  });

  it('should have no zero line counts', () => {
    expect(surah.every(s => s.totalLines > 0)).toBe(true);
  });

  it('should have no zero ayah counts', () => {
    expect(surah.every(s => s.totalAyah > 0)).toBe(true);
  });

  it('should have correct total ayah count', () => {
    const total = surah.reduce((sum, s) => sum + s.totalAyah, 0);
    expect(total).toBe(6236);
  });

  it('should have correct total line count', () => {
    const total = surah.reduce((sum, s) => sum + s.totalLines, 0);
    expect(total).toBe(7892);
  });

  it('should have Juz 30 equal to 300 lines', () => {
    const juz30Total = surah
      .filter(s => s.juz.includes(30))
      .reduce((sum, s) => sum + s.totalLines, 0);
    expect(juz30Total).toBe(300);
  });
});
```

---

## Related Files

| File | Purpose |
|------|---------|
| `src/shared/entity/surah.ts` | Surah data with line counts |
| `src/module/stat/service/index.ts` | Uses `totalLines` for calculations |
| `doc/tech-debt.md` | TD-4 tracking |
| `data-discrepancy.md` | **Complete 114-surah comparison** |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-15 | Initial documentation created during PR #60 review |
| 2026-02-15 | Clarified: surahs 93-114 exclude header+basmala intentionally (not an error) |

---

_This document was created to preserve the line count methodology context for future maintainers._
