# TD-4: Complete Surah Data

**Status:** 🔴 Open
**Priority:** High
**Location:** `src/shared/entity/surah.ts`

---

## Current State

Surahs 1-45 have `totalLines: 0` and `totalAyah: 0`, causing inaccurate statistics.

## Impact

Statistics calculations for activities involving surahs 1-45 return 0 values.

## History

PR #60 was reviewed but the data does not match quran.com's Classic Madani 15-line mushaf.

## Next Steps

1. Manually count surahs **1-45** from quran.com Classic Madani 15-line mushaf
2. Count methodology: surah header + basmala + text lines
3. Create new PR with verified data
4. Keep surahs 46-114 unchanged

## Methodology

See [doc/surah/lines-methodology.md](../surah/lines-methodology.md) for counting methodology.
