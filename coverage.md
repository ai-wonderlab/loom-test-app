# Coverage report: truncate()

## Covered scenarios

### Happy paths
- Returns the original string when `text.length === maxLength`.
- Returns the original string when `text.length < maxLength`.
- Returns an empty input string unchanged.

### Truncation with default suffix ("...")
- Truncates a long string and appends the default suffix.
- Result length equals `maxLength` exactly.
- Truncation when string is exactly one character longer than `maxLength`.

### Truncation with custom suffix
- Custom multi-char suffix.
- Empty suffix (acts as a hard cut at `maxLength`).
- Single-character suffix.
- Other custom suffix variants.

### Edge cases for `maxLength`
- `maxLength === 0` returns empty string.
- Negative `maxLength` returns empty string.
- `maxLength < suffix.length` returns the suffix truncated to fit.
- `maxLength === suffix.length` returns the full suffix only.
- Same behaviors verified for custom suffix.

### Input validation (runtime type guards)
- `text` not a string -> TypeError.
- `suffix` not a string -> TypeError.
- `maxLength` not a number -> TypeError.
- `maxLength === NaN` -> TypeError.
- `maxLength === Infinity` -> TypeError.

All branches in `src/utils.ts#truncate` are exercised:
- TypeError guards (3 branches)
- `maxLength <= 0` branch
- `text.length <= maxLength` branch
- `suffix.length >= maxLength` branch
- Standard truncation branch (body + suffix)

Estimated line/branch coverage of introduced code: 100%.

## Out of scope for me (hand-off to Tester)
- Unicode/grapheme-cluster correctness: `truncate` uses `String.prototype.slice`, which operates on UTF-16 code units. Strings containing surrogate pairs (e.g., emoji, some CJK extension chars) or combining marks may be split mid-grapheme. If the product requires grapheme-aware truncation, the Tester should add cases and a follow-up task should swap to a grapheme segmenter (e.g., `Intl.Segmenter`).
- Performance/large-input benchmarking (e.g., multi-MB strings) is not covered.
- Property-based / fuzz tests (e.g., via fast-check) asserting invariants like `result.length <= maxLength` for arbitrary inputs.
- Locale-specific behavior — `truncate` is locale-agnostic by design; no tests for locale-sensitive trimming.
- Integration with any consuming UI component (out of backend scope; UI builder/Tester responsibility).
