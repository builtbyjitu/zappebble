import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPNG(width, height) {
  // Simple PNG encoder for a blue square with rounded borders/center pattern
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      
      // Check distance from center for subtle circle/rounded effect
      const cx = width / 2;
      const cy = height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const distSq = dx * dx + dy * dy;

      if (distSq > 0.95) {
        // Transparent corner
        rawData[pixelOffset] = 0;
        rawData[pixelOffset + 1] = 0;
        rawData[pixelOffset + 2] = 0;
        rawData[pixelOffset + 3] = 0;
      } else {
        // Brand blue gradient #2563eb to #1d4ed8
        const ratio = (y / height);
        const r = Math.round(37 - ratio * 8);
        const g = Math.round(99 - ratio * 21);
        const b = Math.round(235 - ratio * 19);
        
        // Draw a white 'W' shape
        const nx = x / width;
        const ny = y / height;
        let isWhite = false;
        
        // Simple 'W' approximation
        if (ny >= 0.35 && ny <= 0.75) {
          const wProg = (ny - 0.35) / 0.4;
          const leftThick = 0.08;
          // Left down
          if (Math.abs(nx - (0.22 + wProg * 0.15)) < leftThick) isWhite = true;
          // Mid up
          if (Math.abs(nx - (0.37 + (1 - wProg) * 0.13)) < leftThick) isWhite = true;
          // Mid down
          if (Math.abs(nx - (0.50 + wProg * 0.13)) < leftThick) isWhite = true;
          // Right up
          if (Math.abs(nx - (0.63 + (1 - wProg) * 0.15)) < leftThick) isWhite = true;
        }

        if (isWhite) {
          rawData[pixelOffset] = 255;
          rawData[pixelOffset + 1] = 255;
          rawData[pixelOffset + 2] = 255;
          rawData[pixelOffset + 3] = 255;
        } else {
          rawData[pixelOffset] = r;
          rawData[pixelOffset + 1] = g;
          rawData[pixelOffset + 2] = b;
          rawData[pixelOffset + 3] = 255;
        }
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);

    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);

    // Calculate CRC32
    let crc = 0 ^ (-1);
    const combined = Buffer.concat([typeBuf, data]);
    for (let i = 0; i < combined.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ combined[i]) & 0xff];
    }
    crc = (crc ^ (-1)) >>> 0;
    crcBuf.writeUInt32BE(crc, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 6; // Color type: RGBA (6)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC table
const crcTable = new Int32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

const targetDir = path.resolve(process.cwd(), 'extension/public/icons');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

[16, 32, 48, 128].forEach((size) => {
  const png = createPNG(size, size);
  const filePath = path.join(targetDir, `icon${size}.png`);
  fs.writeFileSync(filePath, png);
  console.log(`Generated ${filePath}`);
});
