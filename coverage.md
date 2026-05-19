# Coverage: capitalize() utility

## Covered scenarios

- Empty string input returns empty string.
- Single lowercase character is uppercased.
- Single uppercase character is preserved.
- All-lowercase word: first letter uppercased.
- All-uppercase word: tail lowercased.
- Mixed-case word is normalized.
- Multi-word string: only first character changes.
- String starting with a digit/non-letter is returned unchanged.
- String starting with whitespace preserves leading whitespace.
- Unicode letter (e.g., 'é' / 'É') is capitalized correctly.
- Non-string inputs (number, null, undefined) throw TypeError.

## Branches / code paths

- `typeof text !== "string"` guard → covered by TypeError tests.
- `text.length === 0` early return → covered by empty string test.
- Main return path → covered by all remaining tests.

Estimated path coverage: 100% of introduced lines/branches.

## out_of_scope_for_me (for Tester)

- Integration with any consumer modules that import `capitalize` — none exist yet in scope.
- Performance/benchmark tests on very large strings.
- Locale-aware capitalization (e.g., Turkish dotless 'i'); current implementation uses default `toUpperCase`/`toLowerCase`. If locale support is required, spec should be clarified.
- Property-based / fuzz testing.
- Cross-runtime verification (Node vs. browser vs. edge); only vitest unit tests provided.
