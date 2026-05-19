import { describe, it, expect } from "vitest";
import { capitalize } from "./utils";

describe("capitalize", () => {
  it("returns an empty string when given an empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("uppercases a single lowercase letter", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("leaves a single uppercase letter unchanged", () => {
    expect(capitalize("A")).toBe("A");
  });

  it("capitalizes first letter and lowercases the rest of an all-lowercase word", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("lowercases trailing letters when input is all uppercase", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });

  it("normalizes mixed case input", () => {
    expect(capitalize("hELLo")).toBe("Hello");
  });

  it("handles multi-word strings (only first char is uppercased)", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("handles strings starting with a non-letter character", () => {
    expect(capitalize("123abc")).toBe("123abc");
  });

  it("handles strings starting with whitespace", () => {
    expect(capitalize(" hello")).toBe(" hello");
  });

  it("handles unicode characters", () => {
    expect(capitalize("école")).toBe("École");
  });

  it("throws TypeError for non-string input", () => {
    // @ts-expect-error - intentional invalid input
    expect(() => capitalize(123)).toThrow(TypeError);
    // @ts-expect-error - intentional invalid input
    expect(() => capitalize(null)).toThrow(TypeError);
    // @ts-expect-error - intentional invalid input
    expect(() => capitalize(undefined)).toThrow(TypeError);
  });
});
