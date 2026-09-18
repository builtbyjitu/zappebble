export type JsonIndentation = 2 | 4 | '\t';

export interface JsonParseError {
  message: string;
  line?: number;
  column?: number;
  position?: number;
  snippet?: string;
}

export interface JsonValidationResult {
  valid: boolean;
  data?: unknown;
  formatted?: string;
  minified?: string;
  error?: JsonParseError;
  stats?: {
    originalBytes: number;
    formattedBytes: number;
    minifiedBytes: number;
    savedBytes: number;
    reductionPercent: number;
  };
}
