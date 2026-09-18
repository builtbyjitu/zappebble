import { describe, it, expect } from 'vitest';
import {
  escapeWifiString,
  formatQrPayload,
  generateQrDataUrl,
  generateQrSvg
} from './qr';

describe('qr utils', () => {
  it('formats URL payload properly, adding https if omitted', () => {
    expect(formatQrPayload({ type: 'url', url: 'https://example.com' })).toBe('https://example.com');
    expect(formatQrPayload({ type: 'url', url: 'example.com' })).toBe('https://example.com');
  });

  it('formats plain text with unicode', () => {
    const text = 'Hello world! नमस्ते 🚀';
    expect(formatQrPayload({ type: 'text', text })).toBe(text);
  });

  it('formats email payload with mailto scheme and query encoding', () => {
    const payload = formatQrPayload({
      type: 'email',
      email: {
        email: 'user@example.com',
        subject: 'Hello World & Friends',
        body: 'This is a test message.'
      }
    });

    expect(payload).toContain('mailto:user@example.com');
    expect(payload).toContain('subject=Hello%20World%20%26%20Friends');
    expect(payload).toContain('body=This%20is%20a%20test%20message.');
  });

  it('formats phone payload with tel scheme', () => {
    expect(formatQrPayload({ type: 'phone', phone: '+1 (555) 123-4567' })).toBe('tel:+15551234567');
  });

  it('escapes WiFi strings according to MeCard standards', () => {
    expect(escapeWifiString('My;SSID:Name"')).toBe('My\\;SSID\\:Name\\"');
  });

  it('formats WiFi payload with security, ssid, and password', () => {
    const wifi = formatQrPayload({
      type: 'wifi',
      wifi: {
        ssid: 'HomeNet',
        password: 'Pass;123',
        security: 'WPA',
        hidden: false
      }
    });

    expect(wifi).toBe('WIFI:T:WPA;S:HomeNet;P:Pass\\;123;H:false;;');
  });

  it('generates a valid PNG DataURL for a QR payload', async () => {
    const dataUrl = await generateQrDataUrl('https://example.com', { size: 256 });
    expect(dataUrl.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('generates a valid vector SVG string for a QR payload', async () => {
    const svg = await generateQrSvg('https://example.com', { size: 256 });
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
    expect(svg).toContain('viewBox');
  });
});
