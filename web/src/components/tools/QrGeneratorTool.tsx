'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useMemo } from 'react';
import {
  QRType,
  QRErrorCorrection,
  WiFiSecurityType,
  formatQrPayload,
  generateQrDataUrl,
  generateQrSvg,
  calculateContrastRatio,
  hexToRgb,
  downloadBlob,
  downloadDataUrl,
  copyToClipboard
} from '@webtools/shared';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  QrCode,
  Link as LinkIcon,
  FileText,
  Mail,
  Phone,
  Wifi,
  Download,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
  Sliders,
  Palette,
  Eye,
  ShieldCheck
} from 'lucide-react';

export function QrGeneratorTool() {
  const [type, setType] = useState<QRType>('url');
  const [urlInput, setUrlInput] = useState<string>('https://example.com');
  const [textInput, setTextInput] = useState<string>('Hello from ZapPebble!');
  const [emailInput, setEmailInput] = useState<string>('hello@example.com');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState<string>('+1 555 123 4567');

  // WiFi fields
  const [wifiSsid, setWifiSsid] = useState<string>('MyHomeWiFi');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiSecurity, setWifiSecurity] = useState<WiFiSecurityType>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);

  // Settings
  const [size, setSize] = useState<number>(256);
  const [errorCorrection, setErrorCorrection] = useState<QRErrorCorrection>('M');
  const [foregroundColor, setForegroundColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');

  // Preview state
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvgString, setQrSvgString] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Build payload
  const currentPayload = useMemo(() => {
    return formatQrPayload({
      type,
      url: urlInput,
      text: textInput,
      email: {
        email: emailInput,
        subject: emailSubject,
        body: emailBody
      },
      phone: phoneInput,
      wifi: {
        ssid: wifiSsid,
        password: wifiPassword,
        security: wifiSecurity,
        hidden: wifiHidden
      }
    });
  }, [
    type,
    urlInput,
    textInput,
    emailInput,
    emailSubject,
    emailBody,
    phoneInput,
    wifiSsid,
    wifiPassword,
    wifiSecurity,
    wifiHidden
  ]);

  // Contrast check
  const contrastRatio = useMemo(() => {
    const fgRgb = hexToRgb(foregroundColor) || { r: 0, g: 0, b: 0 };
    const bgRgb = hexToRgb(backgroundColor) || { r: 255, g: 255, b: 255 };
    return calculateContrastRatio(fgRgb, bgRgb);
  }, [foregroundColor, backgroundColor]);

  // Regenerate QR on change
  useEffect(() => {
    let isCurrent = true;
    setIsGenerating(true);
    setErrorMessage(null);

    Promise.all([
      generateQrDataUrl(currentPayload, {
        size,
        errorCorrectionLevel: errorCorrection,
        foregroundColor,
        backgroundColor,
        margin: 2
      }),
      generateQrSvg(currentPayload, {
        size,
        errorCorrectionLevel: errorCorrection,
        foregroundColor,
        backgroundColor,
        margin: 2
      })
    ])
      .then(([dataUrl, svg]) => {
        if (isCurrent) {
          setQrDataUrl(dataUrl);
          setQrSvgString(svg);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        if (isCurrent) {
          setIsGenerating(false);
          setErrorMessage((err as Error).message || 'Content is too large for a QR code.');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [currentPayload, size, errorCorrection, foregroundColor, backgroundColor]);

  const handleDownloadPng = () => {
    if (qrDataUrl) {
      downloadDataUrl(qrDataUrl, 'zappebble-qr.png');
    }
  };

  const handleDownloadSvg = () => {
    if (qrSvgString) {
      const blob = new Blob([qrSvgString], { type: 'image/svg+xml' });
      downloadBlob(blob, 'zappebble-qr.svg');
    }
  };

  const handleCopyPayload = async () => {
    const ok = await copyToClipboard(currentPayload);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setType('url');
    setUrlInput('https://example.com');
    setTextInput('Hello from ZapPebble!');
    setEmailInput('hello@example.com');
    setEmailSubject('');
    setEmailBody('');
    setPhoneInput('+1 555 123 4567');
    setWifiSsid('MyHomeWiFi');
    setWifiPassword('');
    setWifiSecurity('WPA');
    setWifiHidden(false);
    setSize(256);
    setErrorCorrection('M');
    setForegroundColor('#000000');
    setBackgroundColor('#ffffff');
    setErrorMessage(null);
  };

  return (
    <div className="space-y-8">
      {/* Type Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'url', label: 'Website URL', icon: <LinkIcon size={14} /> },
          { id: 'text', label: 'Plain Text', icon: <FileText size={14} /> },
          { id: 'email', label: 'Email', icon: <Mail size={14} /> },
          { id: 'phone', label: 'Phone', icon: <Phone size={14} /> },
          { id: 'wifi', label: 'WiFi Network', icon: <Wifi size={14} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setType(tab.id as QRType)}
            className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              type === tab.id
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Forms & Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dynamic Content Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <span>QR Content</span>
              <span className="ml-2 text-[11px] font-normal text-slate-500">
                ({type.toUpperCase()})
              </span>
            </h3>

            {/* URL Form */}
            {type === 'url' && (
              <Input
                label="Destination URL"
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://yourwebsite.com"
                leftIcon={<LinkIcon size={16} />}
                helperText="Enter a full web address or domain."
              />
            )}

            {/* Plain Text Form */}
            {type === 'text' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Text Content
                </label>
                <textarea
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter any text, Unicode characters, or notes..."
                  className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Email Form */}
            {type === 'email' && (
              <div className="space-y-3">
                <Input
                  label="Recipient Email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  leftIcon={<Mail size={16} />}
                />
                <Input
                  label="Subject (Optional)"
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject line"
                />
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Pre-filled Body (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Enter email message body..."
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Phone Form */}
            {type === 'phone' && (
              <Input
                label="Phone Number"
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+1 555 123 4567"
                leftIcon={<Phone size={16} />}
                helperText="Scanning will prompt user to dial this number."
              />
            )}

            {/* WiFi Form */}
            {type === 'wifi' && (
              <div className="space-y-3.5">
                <Input
                  label="Network Name (SSID)"
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="Home Wi-Fi"
                  leftIcon={<Wifi size={16} />}
                />

                <Input
                  label="Password"
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Wi-Fi Password"
                  helperText="Never transmitted; processed 100% locally in your browser memory."
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Security Type
                    </label>
                    <select
                      value={wifiSecurity}
                      onChange={(e) => setWifiSecurity(e.target.value as WiFiSecurityType)}
                      className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="WPA">WPA / WPA2 (Most Common)</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="inline-flex items-center cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={wifiHidden}
                        onChange={(e) => setWifiHidden(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700 dark:text-slate-300">
                        Hidden SSID Network
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Customization Settings */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
              <Sliders size={14} className="mr-1.5 text-blue-500" />
              <span>QR Customization</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Size */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Resolution Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="128">128 × 128 px (Compact)</option>
                  <option value="256">256 × 256 px (Standard)</option>
                  <option value="512">512 × 512 px (High-Res)</option>
                  <option value="1024">1024 × 1024 px (Print-Ready)</option>
                </select>
              </div>

              {/* Error Correction */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Error Correction Level
                </label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as QRErrorCorrection)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="L">Low (~7% recovery)</option>
                  <option value="M">Medium (~15% recovery, Recommended)</option>
                  <option value="Q">Quartile (~25% recovery)</option>
                  <option value="H">High (~30% recovery)</option>
                </select>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Foreground Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Background Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 cursor-pointer p-0.5 bg-white dark:bg-slate-800"
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-28 px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Contrast Warning if < 3.0:1 */}
            {contrastRatio.ratio < 3.0 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 flex items-center space-x-2">
                <AlertTriangle size={16} className="text-amber-600 shrink-0" />
                <span>
                  Low contrast ({contrastRatio.formattedRatio}). These colors may reduce QR scan reliability on older cameras.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Preview & Downloads */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-5">
            <div className="flex items-center justify-between w-full border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live QR Preview
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-red-500 flex items-center space-x-1"
                title="Reset all settings to default"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* QR Card Container */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center min-w-[220px] min-h-[220px]">
              {isGenerating ? (
                <div className="text-xs text-slate-400 animate-pulse">Generating QR...</div>
              ) : qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Generated QR Code"
                  className="max-w-[240px] max-h-[240px] object-contain rounded-md"
                />
              ) : (
                <div className="text-xs text-slate-400">No QR preview available</div>
              )}
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs flex items-center">
                <AlertTriangle size={14} className="mr-1.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Download & Copy Buttons */}
            <div className="w-full space-y-2.5">
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleDownloadPng}
                  disabled={!qrDataUrl}
                  leftIcon={<Download size={14} />}
                >
                  Download PNG
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleDownloadSvg}
                  disabled={!qrSvgString}
                  leftIcon={<Download size={14} />}
                >
                  Download SVG
                </Button>
              </div>

              <button
                type="button"
                onClick={handleCopyPayload}
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center space-x-1.5 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy QR Payload'}</span>
              </button>
            </div>

            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-medium pt-1">
              <ShieldCheck size={13} className="mr-1" />
              <span>100% Client-Side QR Generation. No network requests.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
