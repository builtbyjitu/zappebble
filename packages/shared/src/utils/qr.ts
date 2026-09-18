import QRCode from 'qrcode';
import {
  EmailPayloadOptions,
  QRErrorCorrection,
  QRType,
  WiFiPayloadOptions
} from '../types/qr';

/**
 * Escapes reserved characters in WiFi QR strings according to the MeCard standard.
 * Reserved: \, ;, ,, :, "
 */
export function escapeWifiString(str: string): string {
  if (!str) return '';
  return str.replace(/([\\;,:"'])/g, '\\$1');
}

export interface QRPayloadInput {
  type: QRType;
  url?: string;
  text?: string;
  email?: EmailPayloadOptions;
  phone?: string;
  wifi?: WiFiPayloadOptions;
}

/**
 * Builds the appropriate QR payload string based on type.
 */
export function formatQrPayload(input: QRPayloadInput): string {
  switch (input.type) {
    case 'url': {
      let raw = (input.url || '').trim();
      if (raw && !/^https?:\/\//i.test(raw) && !/^mailto:/i.test(raw)) {
        raw = `https://${raw}`;
      }
      return raw || 'https://example.com';
    }

    case 'email': {
      const email = (input.email?.email || '').trim();
      const subject = input.email?.subject ? encodeURIComponent(input.email.subject) : '';
      const body = input.email?.body ? encodeURIComponent(input.email.body) : '';

      const queryParts: string[] = [];
      if (subject) queryParts.push(`subject=${subject}`);
      if (body) queryParts.push(`body=${body}`);

      const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
      return `mailto:${email}${queryString}`;
    }

    case 'phone': {
      const phone = (input.phone || '').trim().replace(/[^\d+*#]/g, '');
      return `tel:${phone}`;
    }

    case 'wifi': {
      const ssid = input.wifi?.ssid || '';
      const password = input.wifi?.password || '';
      const security = input.wifi?.security || 'WPA';
      const hidden = input.wifi?.hidden ? 'true' : 'false';

      return `WIFI:T:${security};S:${escapeWifiString(ssid)};P:${escapeWifiString(password)};H:${hidden};;`;
    }

    case 'text':
    default:
      return input.text || '';
  }
}

export interface QRExportOptions {
  size?: number;
  margin?: number;
  errorCorrectionLevel?: QRErrorCorrection;
  foregroundColor?: string;
  backgroundColor?: string;
}

/**
 * Generates a PNG DataURL for a QR payload.
 */
export async function generateQrDataUrl(
  text: string,
  options: QRExportOptions = {}
): Promise<string> {
  const payload = text.trim() || ' ';
  return QRCode.toDataURL(payload, {
    width: options.size || 256,
    margin: options.margin !== undefined ? options.margin : 2,
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
    color: {
      dark: options.foregroundColor || '#000000',
      light: options.backgroundColor || '#ffffff'
    }
  });
}

/**
 * Generates a scalable vector SVG string for a QR payload.
 */
export async function generateQrSvg(
  text: string,
  options: QRExportOptions = {}
): Promise<string> {
  const payload = text.trim() || ' ';
  return QRCode.toString(payload, {
    type: 'svg',
    width: options.size || 256,
    margin: options.margin !== undefined ? options.margin : 2,
    errorCorrectionLevel: options.errorCorrectionLevel || 'M',
    color: {
      dark: options.foregroundColor || '#000000',
      light: options.backgroundColor || '#ffffff'
    }
  });
}
