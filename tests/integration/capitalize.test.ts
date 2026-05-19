import { describe, it, expect } from 'vitest';
import { capitalize } from '../../src/utils';

describe('capitalize() — integration', () => {
  it('is exported as a named function from src/utils', () => {
    expect(typeof capitalize).toBe('function');
  });

  it('produces stable results across repeated calls (idempotent on already-capitalized input)', () => {
    const once = capitalize('hello');
    const twice = capitalize(once);
    expect(once).toBe('Hello');
    expect(twice).toBe('Hello');
  });

  it('composes correctly when chained with other string operations', () => {
    const input = '  hello world  ';
    const result = capitalize(input.trim());
    expect(result).toBe('Hello world');
  });

  it('handles a batch of inputs deterministically', () => {
    const inputs = ['foo', 'BAR', 'bAz', ''];
    const expected = ['Foo', 'Bar', 'Baz', ''];
    expect(inputs.map(capitalize)).toEqual(expected);
  });

  it('throws TypeError consistently for invalid inputs', () => {
    // @ts-expect-error testing runtime guard
    expect(() => capitalize(null)).toThrow(TypeError);
    // @ts-expect-error testing runtime guard
    expect(() => capitalize(undefined)).toThrow(TypeError);
    // @ts-expect-error testing runtime guard
    expect(() => capitalize(123)).toThrow(TypeError);
  });
});
