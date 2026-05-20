import { describe, it, expect } from "vitest";
import { truncate } from "../utils";

describe("truncate", () => {
  describe("no truncation needed", () => {
    it("returns the original string when length equals maxLength", () => {
      expect(truncate("hello", 5)).toBe("hello");
    });

    it("returns the original string when length is less than maxLength", () => {
      expect(truncate("hi", 10)).toBe("hi");
    });

    it("returns an empty string unchanged when maxLength is positive", () => {
      expect(truncate("", 5)).toBe("");
    });
  });

  describe("truncation with default suffix", () => {
    it("truncates a long string and appends '...'", () => {
      expect(truncate("hello world", 8)).toBe("hello...");
    });

    it("produces a result whose length equals maxLength", () => {
      const result = truncate("abcdefghijklmnop", 10);
      expect(result.length).toBe(10);
      expect(result).toBe("abcdefg...");
    });

    it("truncates when string is exactly one char longer than maxLength", () => {
      expect(truncate("abcdef", 5)).toBe("ab...");
    });
  });

  describe("truncation with custom suffix", () => {
    it("appends a custom suffix", () => {
      expect(truncate("hello world", 8, "--")).toBe("hello --");
    });

    it("works with an empty suffix (hard cut)", () => {
      expect(truncate("hello world", 5, "")).toBe("hello");
    });

    it("works with a single-character suffix", () => {
      expect(truncate("abcdef", 4, "!")).toBe("abc!");
    });

    it("works with a multi-character unicode-ish suffix", () => {
      expect(truncate("abcdefghij", 7, "~~~")).toBe("abcd~~~");
    });
  });

  describe("edge cases for maxLength", () => {
    it("returns empty string when maxLength is 0", () => {
      expect(truncate("hello", 0)).toBe("");
    });

    it("returns empty string when maxLength is negative", () => {
      expect(truncate("hello", -3)).toBe("");
    });

    it("truncates the suffix itself when maxLength is less than suffix length", () => {
      expect(truncate("hello world", 2)).toBe("..");
    });

    it("truncates the suffix itself when maxLength equals suffix length", () => {
      expect(truncate("hello world", 3)).toBe("...");
    });

    it("truncates a custom suffix when maxLength is smaller than it", () => {
      expect(truncate("hello world", 2, "WXYZ")).toBe("WX");
    });
  });

  describe("input validation", () => {
    it("throws TypeError when text is not a string", () => {
      // @ts-expect-error testing runtime guard
      expect(() => truncate(123, 5)).toThrow(TypeError);
    });

    it("throws TypeError when suffix is not a string", () => {
      // @ts-expect-error testing runtime guard
      expect(() => truncate("hello", 5, 99)).toThrow(TypeError);
    });

    it("throws TypeError when maxLength is not a number", () => {
      // @ts-expect-error testing runtime guard
      expect(() => truncate("hello", "5")).toThrow(TypeError);
    });

    it("throws TypeError when maxLength is NaN", () => {
      expect(() => truncate("hello", Number.NaN)).toThrow(TypeError);
    });

    it("throws TypeError when maxLength is Infinity", () => {
      expect(() => truncate("hello", Number.POSITIVE_INFINITY)).toThrow(
        TypeError
      );
    });
  });
});
