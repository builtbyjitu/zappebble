import { describe, it, expect } from 'vitest';
import { formatBytes, calculateReduction, truncate } from './format';

describe('format utils', () => {
  it('formats byte numbers into human-readable strings', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1024 * 1024)).toBe('1 MB');
    expect(formatBytes(4.2 * 1024 * 1024, 1)).toBe('4.2 MB');
  });

  it('calculates size reduction accurately', () => {
    const original = 4.2 * 1024 * 1024;
    const compressed = 1.1 * 1024 * 1024;
    const result = calculateReduction(original, compressed);
    expect(result.percent).toBeCloseTo(73.8, 1);
    expect(result.formattedPercent).toBe('73.8%');
  });

  it('handles zero or negative sizes safely', () => {
    expect(calculateReduction(0, 0).percent).toBe(0);
    expect(calculateReduction(-10, 0).percent).toBe(0);
  });

  it('truncates text properly', () => {
    expect(truncate('Hello World', 5)).toBe('Hello...');
    expect(truncate('Short', 10)).toBe('Short');
  });
});
