export type BarcodeFormat =
  | 'QR_CODE'
  | 'EAN_13'
  | 'EAN_8'
  | 'UPC_A'
  | 'UPC_E'
  | 'CODE_128'
  | 'CODE_39'
  | 'ITF'
  | 'DATA_MATRIX'
  | 'AZTEC'
  | 'PDF_417'
  | 'UNKNOWN';

export interface ScanResult {
  format: BarcodeFormat | string;
  value: string;
  isUrl: boolean;
  timestamp: number;
}

export interface ScannerOptions {
  returnMultiple?: boolean;
  formats?: (BarcodeFormat | string)[];
}
