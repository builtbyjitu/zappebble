/**
 * Client-Side Zero-Dependency ZIP Generator.
 * Creates standard PK-ZIP archives in browser memory with 0 external packages.
 */

// Standard CRC32 table
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

export function computeCrc32(data: Uint8Array): number {
  let crc = 0 ^ -1;
  for (let i = 0; i < data.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

export interface ZipEntryInput {
  name: string;
  blob: Blob;
}

/**
 * Deduplicates filenames by appending (1), (2), etc.
 */
export function deduplicateFilenames(files: ZipEntryInput[]): ZipEntryInput[] {
  const seenCount = new Map<string, number>();

  return files.map((file) => {
    let name = file.name;
    const dotIndex = name.lastIndexOf('.');
    const baseName = dotIndex !== -1 ? name.slice(0, dotIndex) : name;
    const ext = dotIndex !== -1 ? name.slice(dotIndex) : '';

    const count = seenCount.get(name) || 0;
    if (count > 0) {
      name = `${baseName} (${count})${ext}`;
    }
    seenCount.set(file.name, count + 1);

    return { name, blob: file.blob };
  });
}

/**
 * Generates a valid ZIP Blob from an array of files in browser memory.
 */
export async function createZipArchive(files: ZipEntryInput[]): Promise<Blob> {
  const uniqueFiles = deduplicateFilenames(files);
  const encoder = new TextEncoder();

  interface ProcessedEntry {
    nameBytes: Uint8Array;
    data: Uint8Array;
    crc32: number;
    offset: number;
  }

  const entries: ProcessedEntry[] = [];
  const localChunks: Uint8Array[] = [];
  let currentOffset = 0;

  const now = new Date();
  const time =
    ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) &
    0xffff;
  const date =
    (((now.getFullYear() - 1980) << 9) |
      ((now.getMonth() + 1) << 5) |
      now.getDate()) &
    0xffff;

  for (const file of uniqueFiles) {
    const arrayBuffer = await file.blob.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const nameBytes = encoder.encode(file.name);
    const crc32 = computeCrc32(data);

    // Local file header (30 bytes + name length)
    const header = new Uint8Array(30 + nameBytes.length);
    const view = new DataView(header.buffer);

    view.setUint32(0, 0x04034b50, true); // Local file header signature
    view.setUint16(4, 20, true); // Version needed to extract (2.0)
    view.setUint16(6, 0x0800, true); // General purpose bit flag (bit 11 = UTF-8)
    view.setUint16(8, 0, true); // Compression method: 0 = Stored
    view.setUint16(10, time, true);
    view.setUint16(12, date, true);
    view.setUint32(14, crc32, true);
    view.setUint32(18, data.length, true); // Compressed size
    view.setUint32(22, data.length, true); // Uncompressed size
    view.setUint16(26, nameBytes.length, true);
    view.setUint16(28, 0, true); // Extra field length

    header.set(nameBytes, 30);

    entries.push({
      nameBytes,
      data,
      crc32,
      offset: currentOffset
    });

    localChunks.push(header);
    localChunks.push(data);

    currentOffset += header.length + data.length;
  }

  // Build Central Directory
  const centralDirOffset = currentOffset;
  const centralChunks: Uint8Array[] = [];
  let centralDirSize = 0;

  for (const entry of entries) {
    const header = new Uint8Array(46 + entry.nameBytes.length);
    const view = new DataView(header.buffer);

    view.setUint32(0, 0x02014b50, true); // Central file header signature
    view.setUint16(4, 20, true); // Version made by
    view.setUint16(6, 20, true); // Version needed to extract
    view.setUint16(8, 0x0800, true); // Bit flag: UTF-8
    view.setUint16(10, 0, true); // Compression: Stored
    view.setUint16(12, time, true);
    view.setUint16(14, date, true);
    view.setUint32(16, entry.crc32, true);
    view.setUint32(20, entry.data.length, true);
    view.setUint32(24, entry.data.length, true);
    view.setUint16(28, entry.nameBytes.length, true);
    view.setUint16(30, 0, true); // Extra field length
    view.setUint16(32, 0, true); // File comment length
    view.setUint16(34, 0, true); // Disk number start
    view.setUint16(36, 0, true); // Internal file attributes
    view.setUint32(38, 0, true); // External file attributes
    view.setUint32(42, entry.offset, true); // Relative offset of local header

    header.set(entry.nameBytes, 46);

    centralChunks.push(header);
    centralDirSize += header.length;
  }

  // End of Central Directory Record (22 bytes)
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true); // EOCD signature
  eocdView.setUint16(4, 0, true); // Disk number
  eocdView.setUint16(6, 0, true); // Disk with central directory
  eocdView.setUint16(8, entries.length, true); // Entries on this disk
  eocdView.setUint16(10, entries.length, true); // Total entries
  eocdView.setUint32(12, centralDirSize, true); // Size of central directory
  eocdView.setUint32(16, centralDirOffset, true); // Offset of central directory
  eocdView.setUint16(20, 0, true); // Comment length

  return new Blob([...localChunks, ...centralChunks, eocd] as unknown as BlobPart[], {
    type: 'application/zip'
  });
}
