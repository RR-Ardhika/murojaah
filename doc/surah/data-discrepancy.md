# Surah Data Discrepancy Analysis

> Last updated: 2026-02-15
> Related: TD-4

## ⚠️ PR #60 Data (Surahs 1-45) Does Not Match quran.com

After manual verification against **quran.com Classic Madani 15-line mushaf**, the newly added data for surahs 1-45 has discrepancies:

| Surah | quran.com (Manual) | PR #60 | mushaf-layout |
|-------|--------------------|--------|---------------|
| 1 (Al-Fatihah) | **8** | 7 | 8 |
| 44 (Ad-Dukhan) | **44** | 38 | 46 |

**Note**: Surahs 46-114 were **unchanged** by PR #60 (same as main branch).

**Decision**: PR #60 will be closed. Surahs 1-45 must be manually recounted from quran.com.

---

This document provides a comparison of surah data across three sources for reference:

1. **Main Branch (Original)** - Data before PR #60
2. **PR #60 (New Data)** - Data from PR #60 (to be closed)
3. **Internet Reference** - 15-line mushaf from [mushaf-layout](https://github.com/zonetecde/mushaf-layout)

---

## Summary

### Totals Comparison

| Metric | Main (Original) | PR #60 (New) | Internet Ref | Notes |
|--------|-----------------|--------------|--------------|-------|
| **Total Lines** | 1,494 (surahs 46-114 only) | 7,892 | **9,040** | -1,148 from internet |
| **Total Ayah** | 1,665 (surahs 46-114 only) | 6,236 | 6,236 | ✅ Exact match |
| **Surahs with Data** | 68 (46-114) | 114 | 114 | PR fills 1-45 |

### Key Changes in PR #60

| Change Type | Surahs Affected | Details |
|-------------|-----------------|---------|
| **New Data** | 1-45 | Lines & ayah were 0, now filled |
| **Juz Fix** | 4 (An-Nisa) | `[4, 6]` → `[4, 5, 6]` |
| **Unchanged** | 46-114 | Same as main branch |

---

## Complete Surah Comparison Table

### Legend

- **Main**: Original data from `main` branch
- **PR**: New data from PR #60
- **Internet**: Standard 15-line mushaf from [mushaf-layout](https://github.com/zonetecde/mushaf-layout)
- **Diff (PR-Main)**: PR - Main (for lines)
- **Diff (PR-Net)**: PR - Internet (for lines)

### Surahs 1-45 (Newly Filled in PR)

| ID | Surah | Main | PR | Internet | Diff (PR-Main) | Diff (PR-Net) |
|----|-------|------|-----|----------|----------------|---------------|
| 1 | Al-Fatihah | 0 | 7 | 8 | +7 | -1 |
| 2 | Al-Baqarah | 0 | 486 | 713 | +486 | -227 |
| 3 | Ali Imran | 0 | 334 | 406 | +334 | -72 |
| 4 | An-Nisa | 0 | 294 | 439 | +294 | -145 |
| 5 | Al-Maidah | 0 | 240 | 325 | +240 | -85 |
| 6 | Al-An'am | 0 | 244 | 345 | +244 | -101 |
| 7 | Al-A'raf | 0 | 332 | 390 | +332 | -58 |
| 8 | Al-Anfal | 0 | 120 | 150 | +120 | -30 |
| 9 | At-Taubah | 0 | 206 | 316 | +206 | -110 |
| 10 | Yunus | 0 | 174 | 200 | +174 | -26 |
| 11 | Hud | 0 | 195 | 212 | +195 | -17 |
| 12 | Yusuf | 0 | 177 | 202 | +177 | -25 |
| 13 | Ar-Ra'd | 0 | 72 | 92 | +72 | -20 |
| 14 | Ibrahim | 0 | 78 | 103 | +78 | -25 |
| 15 | Al-Hijr | 0 | 62 | 81 | +62 | -19 |
| 16 | An-Nahl | 0 | 206 | 219 | +206 | -13 |
| 17 | Al-Isra | 0 | 175 | 174 | +175 | +1 |
| 18 | Al-Kahf | 0 | 178 | 171 | +178 | +7 |
| 19 | Maryam | 0 | 118 | 109 | +118 | +9 |
| 20 | Taha | 0 | 190 | 146 | +190 | +44 |
| 21 | Al-Anbiya | 0 | 175 | 151 | +175 | +24 |
| 22 | Al-Hajj | 0 | 118 | 150 | +118 | -32 |
| 23 | Al-Mu'minun | 0 | 184 | 120 | +184 | +64 |
| 24 | An-Nur | 0 | 102 | 144 | +102 | -42 |
| 25 | Al-Furqan | 0 | 114 | 111 | +114 | +3 |
| 26 | Asy-Syu'ara | 0 | 160 | 150 | +160 | +10 |
| 27 | An-Naml | 0 | 116 | 126 | +116 | -10 |
| 28 | Al-Qasas | 0 | 136 | 165 | +136 | -29 |
| 29 | Al-Ankabut | 0 | 106 | 122 | +106 | -16 |
| 30 | Ar-Rum | 0 | 80 | 96 | +80 | -16 |
| 31 | Luqman | 0 | 50 | 61 | +50 | -11 |
| 32 | As-Sajdah | 0 | 44 | 45 | +44 | -1 |
| 33 | Al-Ahzab | 0 | 114 | 149 | +114 | -35 |
| 34 | Saba' | 0 | 86 | 97 | +86 | -11 |
| 35 | Fatir | 0 | 72 | 86 | +72 | -14 |
| 36 | Ya-Sin | 0 | 72 | 88 | +72 | -16 |
| 37 | As-Saffat | 0 | 116 | 105 | +116 | +11 |
| 38 | Sad | 0 | 69 | 77 | +69 | -8 |
| 39 | Az-Zumar | 0 | 114 | 134 | +114 | -20 |
| 40 | Gafir | 0 | 128 | 148 | +128 | -20 |
| 41 | Fussilat | 0 | 82 | 90 | +82 | -8 |
| 42 | Asy-Syura | 0 | 80 | 94 | +80 | -14 |
| 43 | Az-Zukhruf | 0 | 100 | 101 | +100 | -1 |
| 44 | Ad-Dukhan | 0 | 38 | 46 | +38 | -8 |
| 45 | Al-Jasiyah | 0 | 54 | 50 | +54 | +4 |
| **Subtotal** | | **0** | **6,398** | **7,056** | **+6,398** | **-658** |

### Surahs 46-114 (Already Filled - Unchanged in PR)

| ID | Surah | Main | PR | Internet | Diff (PR-Main) | Diff (PR-Net) |
|----|-------|------|-----|----------|----------------|---------------|
| 46 | Al-Ahqaf | 68 | 68 | 70 | 0 | -2 |
| 47 | Muhammad | 61 | 61 | 59 | 0 | +2 |
| 48 | Al-Fath | 66 | 66 | 66 | 0 | 0 |
| 49 | Al-Hujurat | 39 | 39 | 39 | 0 | 0 |
| 50 | Qaf | 41 | 41 | 41 | 0 | 0 |
| 51 | Adz-Dzariyat | 41 | 41 | 41 | 0 | 0 |
| 52 | At-Tur | 37 | 37 | 39 | 0 | -2 |
| 53 | An-Najm | 39 | 39 | 37 | 0 | +2 |
| 54 | Al-Qamar | 41 | 41 | 41 | 0 | 0 |
| 55 | Ar-Rahman | 47 | 47 | 47 | 0 | 0 |
| 56 | Al-Waqi'ah | 49 | 49 | 49 | 0 | 0 |
| 57 | Al-Hadid | 65 | 65 | 65 | 0 | 0 |
| 58 | Al-Mujadalah | 51 | 51 | 51 | 0 | 0 |
| 59 | Al-Hasyr | 53 | 53 | 55 | 0 | -2 |
| 60 | Al-Mumtahanah | 37 | 37 | 35 | 0 | +2 |
| 61 | As-Saff | 24 | 24 | 24 | 0 | 0 |
| 62 | Al-Jumu'ah | 21 | 21 | 21 | 0 | 0 |
| 63 | Al-Munafiqun | 23 | 23 | 25 | 0 | -2 |
| 64 | At-Tagabun | 30 | 30 | 30 | 0 | 0 |
| 65 | At-Talaq | 31 | 31 | 29 | 0 | +2 |
| 66 | At-Tahrim | 30 | 30 | 30 | 0 | 0 |
| 67 | Al-Mulk | 35 | 35 | 35 | 0 | 0 |
| 68 | Al-Qalam | 33 | 33 | 33 | 0 | 0 |
| 69 | Al-Haqqah | 30 | 30 | 30 | 0 | 0 |
| 70 | Al-Ma'arij | 26 | 26 | 26 | 0 | 0 |
| 71 | Nuh | 26 | 26 | 26 | 0 | 0 |
| 72 | Al-Jinn | 30 | 30 | 30 | 0 | 0 |
| 73 | Al-Muzzammil | 22 | 22 | 22 | 0 | 0 |
| 74 | Al-Muddassir | 28 | 28 | 28 | 0 | 0 |
| 75 | Al-Qiyamah | 18 | 18 | 18 | 0 | 0 |
| 76 | Al-Insan | 28 | 28 | 28 | 0 | 0 |
| 77 | Al-Mursalat | 24 | 24 | 24 | 0 | 0 |
| 78 | An-Naba' | 22 | 22 | 22 | 0 | 0 |
| 79 | An-Nazi'at | 22 | 22 | 24 | 0 | -2 |
| 80 | Abasa | 16 | 16 | 14 | 0 | +2 |
| 81 | At-Takwir | 14 | 14 | 13 | 0 | +1 |
| 82 | Al-Infitar | 11 | 11 | 9 | 0 | +2 |
| 83 | Al-Mutaffifin | 21 | 21 | 21 | 0 | 0 |
| 84 | Al-Insyiqaq | 14 | 14 | 14 | 0 | 0 |
| 85 | Al-Buruj | 14 | 14 | 13 | 0 | +1 |
| 86 | At-Tariq | 8 | 8 | 6 | 0 | +2 |
| 87 | Al-A'la | 10 | 10 | 10 | 0 | 0 |
| 88 | Al-Gasiyah | 13 | 13 | 13 | 0 | 0 |
| 89 | Al-Fajr | 18 | 18 | 18 | 0 | 0 |
| 90 | Al-Balad | 11 | 11 | 13 | 0 | -2 |
| 91 | Asy-Syams | 9 | 9 | 7 | 0 | +2 |
| 92 | Al-Lail | 9 | 9 | 10 | 0 | -1 |
| 93 | Ad-Duha | 5 | 5 | 7 | 0 | -2 |
| 94 | Asy-Syarh | 3 | 3 | 5 | 0 | -2 |
| 95 | At-Tin | 4 | 4 | 6 | 0 | -2 |
| 96 | Al-'Alaq | 7 | 7 | 9 | 0 | -2 |
| 97 | Al-Qadar | 3 | 3 | 5 | 0 | -2 |
| 98 | Al-Bayyinah | 10 | 10 | 12 | 0 | -2 |
| 99 | Az-Zalzalah | 5 | 5 | 7 | 0 | -2 |
| 100 | Al-'Adiyat | 5 | 5 | 7 | 0 | -2 |
| 101 | Al-Qari'ah | 6 | 6 | 8 | 0 | -2 |
| 102 | At-Takasur | 4 | 4 | 6 | 0 | -2 |
| 103 | Al-Asr | 2 | 2 | 4 | 0 | -2 |
| 104 | Al-Humazah | 4 | 4 | 6 | 0 | -2 |
| 105 | Al-Fil | 3 | 3 | 5 | 0 | -2 |
| 106 | Quraisy | 3 | 3 | 5 | 0 | -2 |
| 107 | Al-Ma'un | 4 | 4 | 6 | 0 | -2 |
| 108 | Al-Kausar | 2 | 2 | 4 | 0 | -2 |
| 109 | Al-Kafirun | 3 | 3 | 5 | 0 | -2 |
| 110 | An-Nasr | 3 | 3 | 5 | 0 | -2 |
| 111 | Al-Lahab | 3 | 3 | 5 | 0 | -2 |
| 112 | Al-Ikhlas | 2 | 2 | 4 | 0 | -2 |
| 113 | Al-Falaq | 3 | 3 | 5 | 0 | -2 |
| 114 | An-Nas | 4 | 4 | 6 | 0 | -2 |
| **Subtotal** | | **1,494** | **1,494** | **1,984** | **0** | **-490** |

---

## Grand Totals

| Metric | Main (Original) | PR #60 | Internet | Diff (PR-Main) | Diff (PR-Net) |
|--------|-----------------|--------|----------|----------------|---------------|
| **Total Lines** | 1,494 | 7,892 | 9,040 | +6,398 | **-1,148** |
| **Total Ayah** | 1,665 | 6,236 | 6,236 | +4,571 | 0 |

---

## Internet Reference Source

### mushaf-layout Dataset

**Source**: https://github.com/zonetecde/mushaf-layout

This GitHub repository contains JSON data for all **604 pages** of the standard 15-line Madani Mushaf (Hafs 'an 'Asim). Each page file includes:

- **Line-by-line breakdown** with types:
  - `surah-header`: Surah name/title line
  - `basmala`: Bismillah line (except At-Taubah)
  - `text`: Quran text lines

### Total Lines Comparison

| Source | Total Lines | Notes |
|--------|-------------|-------|
| **PR #60** | 7,892 | Text lines only (no headers/basmala) |
| **mushaf-layout** | 9,040 | All lines (headers + basmala + text) |
| **Difference** | -1,148 | ~12.7% less |

---

## Methodology Difference Analysis

### Root Cause: Counting Methodology

The PR #60 data uses a **different counting methodology** than the standard 15-line mushaf:

| Aspect | PR #60 | Standard Mushaf (mushaf-layout) |
|--------|--------|--------------------------------|
| Surah header | ❌ Not counted | ✅ Counted |
| Bismillah | ❌ Not counted | ✅ Counted |
| Text lines | ✅ Counted | ✅ Counted |
| **Result** | Lower counts | Higher counts |

### Juz 30 Pattern (Surahs 93-114)

**24 out of 31 surahs** in Juz 30 have **exactly -2 difference**:

| Surah | PR | Internet | Diff | Pattern |
|-------|-----|----------|------|---------|
| 93-114 (24 surahs) | varies | varies | **-2 each** | header + basmala excluded |

This confirms the PR author counted **text lines only**, excluding:
- 1 line for surah header (e.g., "سورة الفاتحة")
- 1 line for bismillah

### Surahs 1-45 (Newly Added)

For longer surahs (1-45), the difference varies significantly (-227 to +64), suggesting:
- Different mushaf editions may have different line breaks
- The PR data may come from a different 15-line mushaf variant
- Inconsistent counting methodology

---

## Surahs with Matching Line Counts

The following **30 surahs** have exact matches between PR #60 and mushaf-layout:

48, 49, 50, 51, 54, 55, 56, 57, 58, 61, 62, 64, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 83, 84, 87, 88, 89

---

## Juz Array Fix

### An-Nisa (Surah 4)

| Attribute | Main (Original) | PR #60 | Correct |
|-----------|-----------------|--------|---------|
| **Juz Array** | `[4, 6]` | `[4, 5, 6]` | ✅ `[4, 5, 6]` |

**Issue**: The original data was missing Juz 5, which is incorrect. An-Nisa spans juzs 4, 5, and 6.

**Fix**: PR #60 corrected this to `[4, 5, 6]`.

---

## Verification Checklist

### Ayah Counts (Verified ✅)

All 114 surah ayah counts in PR #60 match standard Qur'anic references:

| Verification | Result |
|--------------|--------|
| Total ayahs = 6,236 | ✅ |
| Al-Fatihah = 7 | ✅ |
| Al-Baqarah = 286 | ✅ |
| Ali Imran = 200 | ✅ |
| An-Nas = 6 | ✅ |

### Line Counts (Methodology-Specific)

Line counts differ due to counting methodology:

| Verification | PR #60 | Internet | Notes |
|--------------|--------|----------|-------|
| Total lines | 7,892 | 9,040 | -1,148 difference |
| Surahs matching | 30/114 | - | 30 exact matches |

---

## Recommendation

### Option C: Manual Recount from quran.com (CHOSEN)

Neither PR #60 nor mushaf-layout matches quran.com's Classic Madani 15-line mushaf.

**Action Required**:
1. Close PR #60
2. Manually count all 114 surahs from quran.com
3. Count methodology: surah header + basmala + text lines
4. Create new PR with verified data

### ~~Option A: Keep PR Methodology~~ (REJECTED)
- Data does not match quran.com

### ~~Option B: Align with mushaf-layout~~ (REJECTED)
- Data does not match quran.com

---

## Related Documentation

| Document | Purpose |
|----------|---------|
| [lines-internet.md](./lines-internet.md) | Full internet reference data |
| [lines-methodology.md](./lines-methodology.md) | Line counting methodology |
| [TD-4.md](../technical-debt/TD-4.md) | TD-4 tracking |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-02-15 | Initial creation with complete 114-surah comparison |
| 2026-02-15 | Added internet reference data from mushaf-layout GitHub repo |
| 2026-02-15 | Identified methodology difference: PR counts text-only, standard counts all lines |
| 2026-02-15 | Documented -2 pattern in Juz 30 (header + basmala excluded) |
| 2026-02-15 | **Updated**: Neither PR #60 nor mushaf-layout matches quran.com; PR will be closed |

---

_This document serves as a reference record. A new PR with manually verified data will be created._
