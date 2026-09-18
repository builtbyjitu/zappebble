import { SocialBenchmark, TextStatistics } from '../types/text';

export const SOCIAL_BENCHMARKS: SocialBenchmark[] = [
  {
    id: 'twitter',
    name: 'X (Twitter) Post',
    limit: 280,
    category: 'social',
    description: 'Standard post character limit on X / Twitter'
  },
  {
    id: 'meta-title',
    name: 'SEO Meta Title',
    limit: 60,
    category: 'seo',
    description: 'Common search engine title benchmark (approx. 50–60 characters)'
  },
  {
    id: 'meta-description',
    name: 'SEO Meta Description',
    limit: 160,
    category: 'seo',
    description: 'Common search engine snippet benchmark (approx. 150–160 characters)'
  }
];

/**
 * Counts words in a string with Unicode and punctuation awareness.
 */
export function countWords(text: string): number {
  if (!text || !text.trim()) return 0;

  // Unicode letter & number sequence, supporting contractions and hyphens
  const matches = text.match(/[\p{L}\p{N}\p{M}]+(?:['’_-][\p{L}\p{N}\p{M}]+)*/gu);
  return matches ? matches.length : 0;
}

/**
 * Counts characters excluding all whitespace.
 */
export function countCharactersExcludingSpaces(text: string): number {
  if (!text) return 0;
  return text.replace(/\s/g, '').length;
}

/**
 * Counts sentences based on terminal punctuation (. ! ?), avoiding duplicate punctuation.
 */
export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;

  // Split by terminal punctuation sequences followed by space or end of string
  const sentences = trimmed
    .split(/[.!?]+(?:\s+|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return sentences.length;
}

/**
 * Counts paragraphs separated by blank lines.
 */
export function countParagraphs(text: string): number {
  if (!text || !text.trim()) return 0;

  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0).length;
}

/**
 * Computes estimated reading time in minutes based on average 200 words per minute.
 */
export function calculateReadingTime(words: number, wpm = 200): number {
  if (words <= 0) return 0;
  return Math.ceil(words / wpm);
}

/**
 * Performs full textual analysis and computes comprehensive statistics.
 */
export function analyzeText(text: string, wpm = 200): TextStatistics {
  if (!text || !text.trim()) {
    return {
      words: 0,
      characters: 0,
      charactersWithoutSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      averageWordLength: 0,
      longestWord: ''
    };
  }

  const wordsList = text.match(/[\p{L}\p{N}\p{M}]+(?:['’_-][\p{L}\p{N}\p{M}]+)*/gu) || [];
  const words = wordsList.length;
  const characters = text.length;
  const charactersWithoutSpaces = countCharactersExcludingSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = text.split('\n').length;
  const readingTimeMinutes = calculateReadingTime(words, wpm);

  let longestWord = '';
  let totalWordChars = 0;

  for (const word of wordsList) {
    totalWordChars += word.length;
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  const averageWordLength =
    words > 0 ? parseFloat((totalWordChars / words).toFixed(1)) : 0;

  return {
    words,
    characters,
    charactersWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes,
    averageWordLength,
    longestWord
  };
}
