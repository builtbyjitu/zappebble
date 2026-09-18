export type QRType = 'url' | 'text' | 'email' | 'phone' | 'wifi';

export type QRErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export type WiFiSecurityType = 'WPA' | 'WEP' | 'nopass';

export interface WiFiPayloadOptions {
  ssid: string;
  password?: string;
  security: WiFiSecurityType;
  hidden?: boolean;
}

export interface EmailPayloadOptions {
  email: string;
  subject?: string;
  body?: string;
}

export interface QRGeneratorOptions {
  type: QRType;
  size: number;
  errorCorrection: QRErrorCorrection;
  foregroundColor: string;
  backgroundColor: string;
}
