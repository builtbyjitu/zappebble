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
  downloadDataUrl,
  downloadBlob,
  copyToClipboard
} from '@webtools/shared';
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  FileText,
  Wifi,
  Mail,
  Phone,
  AlertTriangle,
  Compass
} from 'lucide-react';

interface Props {
  onBack: () => void;
  onOpenWeb: () => void;
}

export const QrGeneratorView: React.FC<Props> = ({ onBack, onOpenWeb }) => {
  const [qrType, setQrType] = useState<QRType>('url');
  const [url, setUrl] = useState<string>('https://example.com');
  const [text, setText] = useState<string>('Hello from WebTools Extension!');
  const [wifiSsid, setWifiSsid] = useState<string>('');
  const [wifiPassword, setWifiPassword] = useState<string>('');
  const [wifiSecurity, setWifiSecurity] = useState<WiFiSecurityType>('WPA');
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);
  const [emailTo, setEmailTo] = useState<string>('');
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [errorCorrection, setErrorCorrection] = useState<QRErrorCorrection>('M');
  const [qrSize] = useState<number>(256);

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvg, setQrSvg] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [, setCopied] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);

  // Read active tab URL if available
  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]?.url && tabs[0].url.startsWith('http')) {
          setUrl(tabs[0].url);
        }
      });
    }
  }, []);

  const payload = useMemo(() => {
    return formatQrPayload({
      type: qrType,
      url,
      text,
      wifi: {
        ssid: wifiSsid,
        password: wifiPassword,
        security: wifiSecurity,
        hidden: wifiHidden
      },
      email: {
        email: emailTo,
        subject: emailSubject
      },
      phone: phoneNumber
    });
  }, [qrType, url, text, wifiSsid, wifiPassword, wifiSecurity, wifiHidden, emailTo, emailSubject, phoneNumber]);

  // Contrast check
  const contrastRatio = useMemo(() => {
    const fg = hexToRgb(fgColor) || { r: 0, g: 0, b: 0 };
    const bg = hexToRgb(bgColor) || { r: 255, g: 255, b: 255 };
    return calculateContrastRatio(fg, bg);
  }, [fgColor, bgColor]);

  // Generate QR code
  useEffect(() => {
    if (!payload.trim()) {
      setQrDataUrl('');
      setQrSvg('');
      return;
    }

    let isMounted = true;
    setIsGenerating(true);

    const generate = async () => {
      try {
        const [dataUrl, svg] = await Promise.all([
          generateQrDataUrl(payload, {
            errorCorrectionLevel: errorCorrection,
            margin: 2,
            size: qrSize,
            foregroundColor: fgColor,
            backgroundColor: bgColor
          }),
          generateQrSvg(payload, {
            errorCorrectionLevel: errorCorrection,
            margin: 2,
            size: qrSize,
            foregroundColor: fgColor,
            backgroundColor: bgColor
          })
        ]);

        if (isMounted) {
          setQrDataUrl(dataUrl);
          setQrSvg(svg);
        }
      } catch (err) {
        console.error('Extension QR Generation failed:', err);
      } finally {
        if (isMounted) {
          setIsGenerating(false);
        }
      }
    };

    const timeout = setTimeout(generate, 60);
    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, [payload, errorCorrection, qrSize, fgColor, bgColor]);

  const handleUseCurrentTab = () => {
    if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]?.url) {
          setQrType('url');
          setUrl(tabs[0].url);
        }
      });
    }
  };

  const handleCopyPayload = async () => {
    const ok = await copyToClipboard(payload);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyImage = async () => {
    if (!qrDataUrl) return;
    try {
      if (typeof window !== 'undefined' && 'ClipboardItem' in window && navigator.clipboard?.write) {
        const res = await fetch(qrDataUrl);
        const blob = await res.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2000);
        return;
      }
    } catch {
      // Fallback to copy payload
    }
    await handleCopyPayload();
  };

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    downloadDataUrl(qrDataUrl, `webtools-qrcode-${Date.now()}.png`);
  };

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `webtools-qrcode-${Date.now()}.svg`);
  };

  const handleReset = () => {
    setQrType('url');
    setUrl('https://example.com');
    setText('');
    setWifiSsid('');
    setWifiPassword('');
    setWifiSecurity('WPA');
    setWifiHidden(false);
    setEmailTo('');
    setEmailSubject('');
    setPhoneNumber('');
    setFgColor('#000000');
    setBgColor('#ffffff');
    setErrorCorrection('M');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="flex items-center space-x-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>

        <h2 className="text-xs font-bold text-slate-800 dark:text-white">
          QR Code Generator
        </h2>

        <button
          onClick={onOpenWeb}
          className="text-slate-400 hover:text-blue-600 p-1"
          title="Open in Web App"
        >
          <ExternalLink size={14} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
        {/* Type Selector Pills */}
        <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
          {[
            { id: 'url', label: 'URL', icon: LinkIcon },
            { id: 'text', label: 'Text', icon: FileText },
            { id: 'wifi', label: 'WiFi', icon: Wifi },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'phone', label: 'Phone', icon: Phone }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = qrType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setQrType(item.id as QRType)}
                className={`py-1 flex flex-col items-center justify-center rounded text-[10px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon size={12} className="mb-0.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Input Form based on Type */}
        <div className="space-y-2 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs">
          {qrType === 'url' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Website URL
                </label>
                <button
                  onClick={handleUseCurrentTab}
                  className="flex items-center space-x-1 text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  <Compass size={11} />
                  <span>Use Active Tab</span>
                </button>
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          {qrType === 'text' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Plain Text Message
              </label>
              <textarea
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste any text..."
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          )}

          {qrType === 'wifi' && (
            <div className="space-y-1.5">
              <div>
                <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                  Network SSID
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  placeholder="MyHomeWiFi"
                  className="w-full px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                  Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2 pt-0.5">
                <select
                  value={wifiSecurity}
                  onChange={(e) => setWifiSecurity(e.target.value as WiFiSecurityType)}
                  className="px-2 py-1 text-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (No Pass)</option>
                </select>
                <label className="flex items-center space-x-1 text-[10px] text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wifiHidden}
                    onChange={(e) => setWifiHidden(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Hidden</span>
                </label>
              </div>
            </div>
          )}

          {qrType === 'email' && (
            <div className="space-y-1.5">
              <div>
                <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                  Recipient Email
                </label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-slate-600 dark:text-slate-400 block mb-0.5">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {qrType === 'phone' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* QR Preview Display */}
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center">
          <div
            className="w-44 h-44 rounded-lg flex items-center justify-center p-2 border border-slate-200 dark:border-slate-800 shadow-inner"
            style={{ backgroundColor: bgColor }}
          >
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR Code Preview"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="text-center text-xs text-slate-400">
                Enter payload to render
              </div>
            )}
          </div>

          {contrastRatio.ratio < 3 && (
            <div className="mt-2 flex items-center space-x-1.5 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded">
              <AlertTriangle size={12} className="shrink-0" />
              <span>Low contrast ({contrastRatio.formattedRatio}) may fail scanning</span>
            </div>
          )}
        </div>

        {/* Customization Controls: Colors & ECC */}
        <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
          <div>
            <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
              Foreground
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300">
                {fgColor}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
              Background
            </label>
            <div className="flex items-center space-x-1.5">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300">
                {bgColor}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[10px] text-slate-500 dark:text-slate-400 block mb-1">
              Error Level
            </label>
            <select
              value={errorCorrection}
              onChange={(e) => setErrorCorrection(e.target.value as QRErrorCorrection)}
              className="w-full px-1.5 py-1 text-[10px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-200"
            >
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadPng}
            disabled={!qrDataUrl || isGenerating}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Download size={13} />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            disabled={!qrSvg || isGenerating}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Download size={13} />
            <span>Download SVG</span>
          </button>

          <button
            onClick={handleCopyImage}
            disabled={!qrDataUrl || isGenerating}
            className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium transition-colors"
          >
            {copiedImage ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            <span>{copiedImage ? 'Image Copied!' : 'Copy Image'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center justify-center space-x-1.5 py-1.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-medium transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 shrink-0">
        <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <Sparkles size={11} />
          <span>100% Client-Side QR Engine</span>
        </span>
        <button
          onClick={onOpenWeb}
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-0.5"
        >
          <span>Advanced Web Studio</span>
          <ExternalLink size={9} />
        </button>
      </div>
    </div>
  );
};
