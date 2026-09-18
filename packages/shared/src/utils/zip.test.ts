import { describe, it, expect } from 'vitest';
import { computeCrc32, deduplicateFilenames, createZipArchive } from './zip';

describe('zip utils', () => {
  it('computes accurate CRC32 for known strings', () => {
    const encoder = new TextEncoder();
    const data = encoder.encode('123456789');
    // Standard CRC32 of '123456789' is 0xcbf43926 = 3421780262
    expect(computeCrc32(data)).toBe(3421780262);
  });

  it('deduplicates identical filenames properly', () => {
    const fakeBlob = new Blob(['test']);
    const input = [
      { name: 'photo.jpg', blob: fakeBlob },
      { name: 'photo.jpg', blob: fakeBlob },
      { name: 'photo.jpg', blob: fakeBlob },
      { name: 'image.png', blob: fakeBlob }
    ];

    const result = deduplicateFilenames(input);
    expect(result[0].name).toBe('photo.jpg');
    expect(result[1].name).toBe('photo (1).jpg');
    expect(result[2].name).toBe('photo (2).jpg');
    expect(result[3].name).toBe('image.png');
  });

  it('creates a valid ZIP blob with proper PK signature', async () => {
    const fakeBlob1 = new Blob(['Hello World'], { type: 'text/plain' });
    const fakeBlob2 = new Blob(['Image Content'], { type: 'application/octet-stream' });
    
    const zipBlob = await createZipArchive([
      { name: 'hello.txt', blob: fakeBlob1 },
      { name: 'image.bin', blob: fakeBlob2 }
    ]);

    expect(zipBlob.type).toBe('application/zip');
    expect(zipBlob.size).toBeGreaterThan(50);

    const buffer = await zipBlob.arrayBuffer();
    const view = new DataView(buffer);
    // Check first 4 bytes for PK\x03\x04
    expect(view.getUint32(0, true)).toBe(0x04034b50);
  });
});
