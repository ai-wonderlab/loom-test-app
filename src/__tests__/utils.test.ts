import { describe, it, expect } from 'vitest';
import { formatDate, slugify, clamp } from '../utils';

describe('formatDate', () => {
  it('formats a date to YYYY-MM-DD', () => {
    expect(formatDate(new Date('2026-05-19T12:00:00Z'))).toBe('2026-05-19');
  });
});

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });
  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});

describe('clamp', () => {
  it('clamps to min', () => expect(clamp(0, 1, 10)).toBe(1));
  it('clamps to max', () => expect(clamp(20, 1, 10)).toBe(10));
  it('returns value when in range', () => expect(clamp(5, 1, 10)).toBe(5));
});
