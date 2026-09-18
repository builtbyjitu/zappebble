export interface TextStatistics {
  words: number;
  characters: number;
  charactersWithoutSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  averageWordLength: number;
  longestWord: string;
}

export interface SocialBenchmark {
  id: string;
  name: string;
  limit: number;
  category: 'social' | 'seo';
  description: string;
}
