# Functional Test Report

## Status: ❌ FAILED (per real test runner exit code)

- **Test files**: 2 (1 failed, 1 passed)
- **Tests total**: 18
- **Tests passed**: 12
- **Tests failed**: 6
- **Duration**: 1.77s

## What Ran

Vitest executed two test files:

1. `src/utils.test.ts` — new tests for `capitalize()` added by backend_builder.
2. `src/__tests__/utils.test.ts` — pre-existing test file referencing `formatDate`, `slugify`, and `clamp`.

## What Passed ✅

All 12 tests for `capitalize()` passed:
- capitalizes a lowercase word
- lowercases the rest of an all-uppercase word
- normalizes mixed case input
- returns an empty string when given an empty string
- handles a single lowercase character
- handles a single uppercase character
- preserves leading whitespace
- handles strings starting with a digit
- handles strings starting with punctuation
- handles unicode characters
- handles multi-word strings (only first character affected)
- throws TypeError when given a non-string input

The `capitalize()` implementation by **backend_builder** is functionally correct and well-covered.

## What Failed ❌

All 6 failures occur in the pre-existing file `src/__tests__/utils.test.ts`, all with `TypeError: <fn> is not a function`:

| Test | Missing Function | Owner |
|------|------------------|-------|
| formatDate > formats a date to YYYY-MM-DD | `formatDate` | backend_builder |
| slugify > lowercases and replaces spaces with dashes | `slugify` | backend_builder |
| slugify > removes special characters | `slugify` | backend_builder |
| clamp > clamps to min | `clamp` | backend_builder |
| clamp > clamps to max | `clamp` | backend_builder |
| clamp > returns value when in range | `clamp` | backend_builder |

### Root Cause Analysis

These failures are **NOT defects in the capitalize() work**. They are orphaned tests for utilities (`formatDate`, `slugify`, `clamp`) that do not exist in `src/utils.ts`. The backend_builder correctly stayed within declared `scope_files` and did not touch this test file.

**This is a task-scope / repo-hygiene issue.** Resolution options:
1. Expand scope and implement the missing utilities.
2. Remove or quarantine `src/__tests__/utils.test.ts` as stale.
3. File a follow-up task to address.

## Integration Tests Generated

- `tests/integration/capitalize.test.ts` — covers gaps flagged by backend_builder (idempotency, composition, batch behavior, runtime guard consistency).

## E2E Tests (DEFERRED)

- `tests/e2e/capitalize.spec.ts` — Playwright stub generated but **NOT executed**. Requires a running app and will run in a separate stage. Since `capitalize()` is a pure utility with no UI surface, the stub is skipped by default.

## Builder Ownership Summary

| Builder | Owned Failures | Notes |
|---------|----------------|-------|
| backend_builder | 6 | All in stale test file outside task scope_files; coordination/scope issue, not implementation defect |
