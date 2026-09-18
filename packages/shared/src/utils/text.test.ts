import { describe, it, expect } from 'vitest';
import {
  countWords,
  countCharactersExcludingSpaces,
  countSentences,
  countParagraphs,
  calculateReadingTime,
  analyzeText
} from './text';

describe('text utils', () => {
  it('handles empty input gracefully', () => {
    const stats = analyzeText('');
    expect(stats.words).toBe(0);
    expect(stats.characters).toBe(0);
    expect(stats.charactersWithoutSpaces).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.paragraphs).toBe(0);
    expect(stats.readingTimeMinutes).toBe(0);
  });

  it('counts words with multiple spaces, tabs, and newlines accurately', () => {
    const text = '  Hello \t\t world!\n\nThis   is   a\ttest. ';
    expect(countWords(text)).toBe(6);
  });

  it('handles contractions and hyphenated words', () => {
    const text = "Don't worry, this is a state-of-the-art tool.";
    // Don't, worry, this, is, a, state-of-the-art, tool
    expect(countWords(text)).toBe(7);
  });

  it('supports Unicode and international text', () => {
    const text = 'Bonjour le monde! こんにちは 世界. नमस्ते भारत!';
    // Bonjour, le, monde, こんにちは, 世界, नमस्ते, भारत
    expect(countWords(text)).toBeGreaterThanOrEqual(6);
  });

  it('counts characters with and without whitespace correctly', () => {
    const text = 'A B C';
    expect(text.length).toBe(5);
    expect(countCharactersExcludingSpaces(text)).toBe(3);
  });

  it('counts sentences respecting multiple punctuation marks', () => {
    const text = 'Hello world! How are you doing? I am fine... Really fine!!';
    // 4 sentences: "Hello world", "How are you doing", "I am fine", "Really fine"
    expect(countSentences(text)).toBe(4);
  });

  it('counts paragraphs separated by blank lines', () => {
    const text = 'Paragraph 1.\n\nParagraph 2 with more lines.\nStill paragraph 2.\n\nParagraph 3.';
    expect(countParagraphs(text)).toBe(3);
  });

  it('calculates reading time estimates accurately', () => {
    // 200 words per minute
    expect(calculateReadingTime(100)).toBe(1);
    expect(calculateReadingTime(200)).toBe(1);
    expect(calculateReadingTime(245)).toBe(2);
    expect(calculateReadingTime(450)).toBe(3);
  });

  it('computes full statistics correctly on sample passage', () => {
    const text = `Hello world!\nThis is a test.`;
    const stats = analyzeText(text);

    expect(stats.words).toBe(6);
    expect(stats.sentences).toBe(2);
    expect(stats.lines).toBe(2);
    expect(stats.paragraphs).toBe(1);
    expect(stats.characters).toBe(text.length);
    expect(stats.longestWord).toBe('Hello');
  });
});
