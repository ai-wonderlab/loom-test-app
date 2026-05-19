---
file_type: solutions
task_id: T-MEMO-01
planner_run_id: ce9840a7-dbe2-4283-b6a5-a0564bb495a0
selected: guarded_helper_with_typed_edge_cases
generated_at: 2026-05-19T10:34:20.103177+00:00
---

# T-MEMO-01: Add capitalize() utility function — Solutions

## Approach — Guarded helper with explicit edge-case handling (SELECTED)
**Variant:** optimal
**Score:** 98/100
**Complexity:** simple

**Description:**
Same native implementation as conservative, but wrapped in a defensive helper: explicit null/undefined guard (returns ''), early return for empty string, and uses Array.from to handle the first code point correctly for basic unicode (e.g., emoji). Ships with a thorough vitest table-driven test suite (it.each) covering ASCII, unicode code points, empty, whitespace-leading, and idempotency property.

**Pros:**
- Still zero dependencies
- Correct for unicode code points (emoji, astral chars)
- Table-driven tests scale better as cases grow
- Defensive against accidental non-string inputs in loose TS callers

**Cons:**
- Slightly more code than strict spec requires
- Array.from has minor perf cost vs charAt

## Approach — Inline native String implementation in src/utils.ts
**Variant:** conservative
**Score:** 99/100
**Complexity:** simple

**Description:**
Implement capitalize() directly in src/utils.ts using native JavaScript string methods: `text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()`. Handle empty string edge case by returning '' early. Add a vitest spec file (src/utils.test.ts) covering: empty string, single char, all-caps input, mixed case, already capitalized, and unicode/whitespace edge cases.

**Pros:**
- Zero new dependencies
- Trivial to read, review, and maintain
- Uses well-established native String API
- Matches the minimal scope of the task brief verbatim

**Cons:**
- Naive unicode handling (e.g. surrogate pairs, combining marks)
- No locale-awareness for Turkish 'i' / German ß edge cases

## Approach — Wrap lodash.capitalize with locale-aware variant
**Variant:** wild
**Score:** 67/100
**Complexity:** medium

**Description:**
Add lodash.capitalize as a dependency (or lodash-es for tree-shaking) and re-export it as capitalize from src/utils.ts. Additionally expose a `capitalizeLocale(text, locale)` variant using Intl-aware toLocaleUpperCase/toLocaleLowerCase for future i18n. Vitest tests cover the wrapped behavior plus locale cases (e.g., 'tr-TR' for Turkish dotless i).

**Pros:**
- Battle-tested implementation maintained by lodash
- Opens door to locale-aware capitalization for i18n
- Free additional utilities if more lodash later

**Cons:**
- Adds a runtime dependency for a 3-line function
- Increases bundle size and supply-chain surface
- Overkill for the stated brief; YAGNI violation
- lodash.capitalize lowercases the rest — same as native, so wrapping adds no behavioral value


## Selection rationale

The optimal variant scores 98 — essentially tied with conservative (99) — but adds meaningful unicode correctness and table-driven tests for negligible extra effort, while still respecting the brief's 'add a util + vitest tests' scope with zero dependencies. Conservative was a close runner-up and would be acceptable. The wild lodash variant was deprioritized because it adds a runtime dependency for a 3-line native operation, violating implicit YAGNI for an explicitly minimal task brief.
