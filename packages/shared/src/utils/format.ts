/**
 * Formats a byte size into a human-readable string (B, KB, MB, GB).
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes <= 0 || isNaN(bytes)) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const clampedIndex = Math.min(i, sizes.length - 1);
  const value = parseFloat((bytes / Math.pow(k, clampedIndex)).toFixed(dm));

  return `${value} ${sizes[clampedIndex]}`;
}

export interface ReductionResult {
  percent: number;
  savedBytes: number;
  formattedPercent: string;
}

/**
 * Computes percentage size reduction between original and compressed byte sizes.
 */
export function calculateReduction(originalBytes: number, compressedBytes: number): ReductionResult {
  if (originalBytes <= 0) {
    return { percent: 0, savedBytes: 0, formattedPercent: '0%' };
  }

  const savedBytes = Math.max(0, originalBytes - compressedBytes);
  const percent = Math.min(100, Math.max(0, (savedBytes / originalBytes) * 100));
  const formattedPercent = `${percent.toFixed(1)}%`;

  return {
    percent,
    savedBytes,
    formattedPercent
  };
}

/**
 * Truncates string to a given max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
