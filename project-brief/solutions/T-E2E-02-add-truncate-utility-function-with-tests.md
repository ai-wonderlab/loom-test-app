---
file_type: solutions
task_id: T-E2E-02
planner_run_id: 51d01e3f-50fc-4b31-a388-36112b2fc475
selected: suffix_aware_truncate
generated_at: 2026-05-19T10:10:58.481804+00:00
---

# T-E2E-02: Add truncate() utility function with tests — Solutions

## Approach — Suffix-aware truncate respecting maxLength budget (SELECTED)
**Variant:** optimal
**Score:** 96/100
**Complexity:** simple

**Description:**
Implement truncate(text, maxLength, suffix='...') such that the FINAL output (including suffix) never exceeds maxLength. Logic: if text.length <= maxLength return text; else return text.slice(0, Math.max(0, maxLength - suffix.length)) + suffix. Handles edge case where suffix alone exceeds maxLength by returning suffix.slice(0, maxLength). Vitest covers: passthrough, exact-length, truncation with default suffix, custom suffix, suffix longer than maxLength, empty input, and maxLength=0.

**Pros:**
- Output length contract is intuitive and predictable
- Robust edge case handling (oversized suffix, zero maxLength)
- Still zero dependencies
- Comprehensive test coverage

**Cons:**
- Slightly more logic to reason about than naive slice
- Still doesn't handle multi-byte characters perfectly

## Approach — Inline simple slice implementation
**Variant:** conservative
**Score:** 97/100
**Complexity:** simple

**Description:**
Add a straightforward truncate function to src/utils.ts using basic string slicing. If text.length <= maxLength, return as-is; otherwise return text.slice(0, maxLength) + suffix (default '...'). Write a focused vitest suite covering: short string passthrough, exact-length passthrough, long string truncation, custom suffix, empty string, and edge cases (maxLength=0).

**Pros:**
- Zero dependencies, minimal code surface
- Easy to review and maintain
- Predictable behavior matching common JS idioms
- Fast — no regex or external lib overhead

**Cons:**
- Does not account for suffix length (output may exceed maxLength)
- Naive on multi-byte/emoji characters (splits surrogate pairs)
- No word-boundary awareness

## Approach — Grapheme + word-boundary aware truncate via Intl.Segmenter
**Variant:** wild
**Score:** 73/100
**Complexity:** medium

**Description:**
Implement truncate using Intl.Segmenter to iterate user-perceived characters (graphemes) so emoji/CJK don't split mid-codepoint, and prefer truncating at the last word boundary before maxLength when possible. Falls back to grapheme cut if no word boundary exists. Suffix-aware budget like the optimal variant. Vitest covers ASCII, emoji ('👨‍👩‍👧'), CJK, word-boundary preference, and all standard edges.

**Pros:**
- Correct on Unicode/emoji — no broken surrogate pairs or ZWJ sequences
- Produces more natural-looking truncations at word boundaries
- Future-proof for i18n content

**Cons:**
- Significantly more code and conceptual complexity
- Intl.Segmenter requires Node 16+ (likely fine but adds env assumption)
- Overkill for typical truncate use cases
- Harder to test exhaustively


## Selection rationale

The optimal suffix-aware variant scored 96, just behind the conservative variant (97), but provides a materially better contract: output length is bounded by maxLength, which matches typical user expectations for a 'truncate' utility. The conservative variant is simpler but its output can exceed maxLength, which is a common bug. The wild grapheme-aware variant (73) is over-engineered for the stated task — no Unicode requirement was specified, and Intl.Segmenter adds runtime assumptions without clear payoff here.
