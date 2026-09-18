import { describe, it, expect } from 'vitest';
import {
  parseJsonWithError,
  formatJson,
  minifyJson,
  validateAndProcessJson,
  getLineAndColumnFromPosition
} from './json';

describe('json utils', () => {
  it('parses valid JSON objects and arrays', () => {
    const validObj = '{"name":"Jitendra","age":25,"active":true}';
    const result = parseJsonWithError(validObj);
    expect(result.valid).toBe(true);
    expect(result.data).toEqual({ name: 'Jitendra', age: 25, active: true });
    expect(result.error).toBeUndefined();
  });

  it('handles strings containing braces correctly', () => {
    const input = '{"text":"hello { world }","nested":{"key":"value}"}}';
    const result = parseJsonWithError(input);
    expect(result.valid).toBe(true);
    expect((result.data as { text: string }).text).toBe('hello { world }');
  });

  it('handles escaped quotes and characters', () => {
    const input = '{"message":"He said \\"hello\\"","path":"C:\\\\Program Files"}';
    const result = parseJsonWithError(input);
    expect(result.valid).toBe(true);
    expect((result.data as { message: string }).message).toBe('He said "hello"');
  });

  it('handles Unicode characters in JSON', () => {
    const input = '{"greeting":"こんにちは","emoji":"🚀","hebrew":"שלום"}';
    const result = parseJsonWithError(input);
    expect(result.valid).toBe(true);
    expect((result.data as { emoji: string }).emoji).toBe('🚀');
  });

  it('detects syntax errors with line and column information', () => {
    // Missing comma after name
    const invalid = '{\n  "name": "Jitendra"\n  "age": 25\n}';
    const result = parseJsonWithError(invalid);
    expect(result.valid).toBe(false);
    expect(result.error).toBeDefined();
    expect(result.error?.line).toBeDefined();
    expect(result.error?.column).toBeDefined();
  });

  it('detects unexpected end of JSON', () => {
    const incomplete = '{"name": "Jitendra", "skills": [';
    const result = parseJsonWithError(incomplete);
    expect(result.valid).toBe(false);
    expect(result.error?.message.toLowerCase()).toContain('end of json');
  });

  it('returns useful message on empty input', () => {
    expect(parseJsonWithError('').valid).toBe(false);
    expect(parseJsonWithError('   ').valid).toBe(false);
  });

  it('formats JSON with 2 spaces by default and 4 spaces when specified', () => {
    const input = '{"a":1,"b":[2,3]}';
    const formatted2 = formatJson(input, 2);
    expect(formatted2).toBe('{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}');

    const formatted4 = formatJson(input, 4);
    expect(formatted4).toBe('{\n    "a": 1,\n    "b": [\n        2,\n        3\n    ]\n}');

    const formattedTabs = formatJson(input, '\t');
    expect(formattedTabs).toBe('{\n\t"a": 1,\n\t"b": [\n\t\t2,\n\t\t3\n\t]\n}');
  });

  it('minifies JSON properly', () => {
    const pretty = '{\n  "name": "Jitendra",\n  "age": 25\n}';
    expect(minifyJson(pretty)).toBe('{"name":"Jitendra","age":25}');
  });

  it('computes byte statistics on validation and processing', () => {
    const pretty = '{\n  "name": "Jitendra",\n  "age": 25\n}';
    const result = validateAndProcessJson(pretty, 2);
    expect(result.valid).toBe(true);
    expect(result.minified).toBe('{"name":"Jitendra","age":25}');
    expect(result.stats?.minifiedBytes).toBeLessThan(result.stats!.formattedBytes);
    expect(result.stats?.savedBytes).toBeGreaterThan(0);
    expect(result.stats?.reductionPercent).toBeGreaterThan(0);
  });

  it('calculates line and column from position offset', () => {
    const text = 'line 1\nline 2 with error\nline 3';
    // Position 9 is right at "with" in line 2
    const loc = getLineAndColumnFromPosition(text, 9);
    expect(loc.line).toBe(2);
    expect(loc.column).toBe(3);
    expect(loc.snippet).toBe('line 2 with error');
  });
});
