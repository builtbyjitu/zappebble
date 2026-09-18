import { JsonIndentation, JsonParseError, JsonValidationResult } from '../types/json';
import { calculateReduction } from './format';

/**
 * Computes line, column, and a context snippet from a character index in a text string.
 */
export function getLineAndColumnFromPosition(
  text: string,
  position: number
): { line: number; column: number; snippet: string } {
  const safePos = Math.max(0, Math.min(position, text.length));
  const upToPos = text.slice(0, safePos);
  const lines = upToPos.split('\n');
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;

  // Extract the line where error occurred
  const allLines = text.split('\n');
  const errorLineContent = allLines[line - 1] ?? '';
  const snippet = errorLineContent.trimEnd();

  return { line, column, snippet };
}

/**
 * Extracts line, column, and error message from native JSON.parse errors.
 */
export function parseJsonWithError(jsonString: string): {
  valid: boolean;
  data?: unknown;
  error?: JsonParseError;
} {
  const trimmed = jsonString.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: {
        message: 'JSON input is empty. Paste or type a valid JSON string.'
      }
    };
  }

  try {
    const parsed = JSON.parse(jsonString);
    return {
      valid: true,
      data: parsed
    };
  } catch (err) {
    const rawMessage = (err as Error).message || 'Invalid JSON syntax';

    // 1. Firefox style: "at line X column Y"
    const lineColMatch = rawMessage.match(/at line (\d+) column (\d+)/i);
    if (lineColMatch) {
      const line = parseInt(lineColMatch[1], 10);
      const column = parseInt(lineColMatch[2], 10);
      const allLines = jsonString.split('\n');
      const snippet = allLines[line - 1] ?? '';
      return {
        valid: false,
        error: {
          message: rawMessage,
          line,
          column,
          snippet
        }
      };
    }

    // 2. V8 / Chrome / Node style: "at position X"
    const posMatch = rawMessage.match(/at position (\d+)/i);
    if (posMatch) {
      const position = parseInt(posMatch[1], 10);
      const { line, column, snippet } = getLineAndColumnFromPosition(jsonString, position);
      return {
        valid: false,
        error: {
          message: rawMessage,
          line,
          column,
          position,
          snippet
        }
      };
    }

    // 3. Unexpected end of JSON
    if (rawMessage.toLowerCase().includes('end of json') || rawMessage.toLowerCase().includes('unexpected end')) {
      const lines = jsonString.split('\n');
      return {
        valid: false,
        error: {
          message: 'Unexpected end of JSON input (missing closing bracket, brace, or quote)',
          line: lines.length,
          column: (lines[lines.length - 1] || '').length + 1
        }
      };
    }

    return {
      valid: false,
      error: {
        message: rawMessage
      }
    };
  }
}

/**
 * Pretty-prints valid JSON string or object with configurable indentation.
 */
export function formatJson(input: string | unknown, indent: JsonIndentation = 2): string {
  if (typeof input === 'string') {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed, null, indent);
  }
  return JSON.stringify(input, null, indent);
}

/**
 * Minifies JSON by stripping unnecessary whitespaces and newlines.
 */
export function minifyJson(input: string | unknown): string {
  if (typeof input === 'string') {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  }
  return JSON.stringify(input);
}

/**
 * Validates, formats, and minifies a JSON string while calculating byte savings.
 */
export function validateAndProcessJson(
  rawJson: string,
  indent: JsonIndentation = 2
): JsonValidationResult {
  const parseResult = parseJsonWithError(rawJson);

  if (!parseResult.valid || parseResult.data === undefined) {
    return {
      valid: false,
      error: parseResult.error
    };
  }

  const formatted = JSON.stringify(parseResult.data, null, indent);
  const minified = JSON.stringify(parseResult.data);

  const encoder = new TextEncoder();
  const originalBytes = encoder.encode(rawJson).length;
  const formattedBytes = encoder.encode(formatted).length;
  const minifiedBytes = encoder.encode(minified).length;

  const reduction = calculateReduction(formattedBytes, minifiedBytes);

  return {
    valid: true,
    data: parseResult.data,
    formatted,
    minified,
    stats: {
      originalBytes,
      formattedBytes,
      minifiedBytes,
      savedBytes: reduction.savedBytes,
      reductionPercent: reduction.percent
    }
  };
}
