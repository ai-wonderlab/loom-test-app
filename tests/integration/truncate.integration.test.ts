import { describe, it, expect } from 'vitest';
import { truncate } from '../../src/utils';

/**
 * Integration tests for truncate() — covers scenarios flagged by backend_builder
 * as out-of-scope for unit tests (property-style and boundary fuzz).
 */
describe('truncate() integration coverage', () => {
  describe('property: result length never exceeds maxLength when maxLength >= 0', () => {
    it('holds for random-ish inputs across a range of lengths', () => {
      const sample = 'The quick brown fox jumps over the lazy dog. '.repeat(20);
      for (let max = 0; max <= 50; max++) {
        const out = truncate(sample, max);
        expect(out.length).toBeLessThanOrEqual(max);
      }
    });

    it('holds for varying custom suffixes', () => {
      const sample = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const suffixes = ['', '.', '...', '---', '<<>>', '[end]'];
      for (const suf of suffixes) {
        for (let max = 0; max <= 40; max++) {
          const out = truncate(sample, max, suf);
          expect(out.length).toBeLessThanOrEqual(max);
        }
      }
    });
  });

  describe('property: short strings are returned unchanged', () => {
    it('returns identity when text.length <= maxLength', () => {
      const inputs = ['', 'a', 'hello', 'hello world'];
      for (const text of inputs) {
        expect(truncate(text, text.length)).toBe(text);
        expect(truncate(text, text.length + 10)).toBe(text);
      }
    });
  });

  describe('unicode / code-unit behavior (documented limitation)', () => {
    it('operates on UTF-16 code units (documented in coverage.md as follow-up)', () => {
      // Emoji like 😀 is a surrogate pair (2 code units). Current impl is code-unit based.
      const text = '😀😀😀😀';
      const out = truncate(text, 3);
      // Whatever the result is, length contract still holds.
      expect(out.length).toBeLessThanOrEqual(3);
    });
  });

  describe('performance smoke test', () => {
    it('handles large inputs quickly', () => {
      const huge = 'x'.repeat(1_000_000);
      const start = Date.now();
      const out = truncate(huge, 100);
      const elapsed = Date.now() - start;
      expect(out.length).toBeLessThanOrEqual(100);
      expect(elapsed).toBeLessThan(500);
    });
  });
});
