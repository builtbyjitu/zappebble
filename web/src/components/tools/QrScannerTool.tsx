'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ScanResult,
  scanImageSource,
  isValidWebUrl,
  copyToClipboard,
  revokeObjectUrl,
  isBarcodeDetectorSupported
} from '@webtools/shared';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import {
  ScanBarcode,
  Camera,
  CameraOff,
  Copy,
  ExternalLink,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Info,
  CheckCircle2
} from 'lucide-react';

export function QrScannerTool() {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);

  // Camera State
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Scan Results
  const [results, setResults] = useState<ScanResult[]>([]);
  const [noResultFound, setNoResultFound] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastScanTimeRef = useRef<number>(0);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const stopCamera = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Clean up object URLs and camera on unmount
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        revokeObjectUrl(imagePreviewUrl);
      }
      stopCamera();
    };
  }, [imagePreviewUrl, stopCamera]);

  // Handle image upload & scan
  const handleFilesSelected = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setGeneralError(null);
    setNoResultFound(false);
    setResults([]);

    if (imagePreviewUrl) {
      revokeObjectUrl(imagePreviewUrl);
    }

    const previewUrl = URL.createObjectURL(file);
    setUploadedFile(file);
    setImagePreviewUrl(previewUrl);
    setIsAnalyzingImage(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        imageElementRef.current = img;
        const detected = await scanImageSource(img, { returnMultiple: true });
        if (detected.length > 0) {
          setResults(detected);
          setNoResultFound(false);
        } else {
          setResults([]);
          setNoResultFound(true);
        }
      } catch (err) {
        console.error('Scan error:', err);
        setGeneralError('Failed to analyze image for codes.');
      } finally {
        setIsAnalyzingImage(false);
      }
    };

    img.onerror = () => {
      setIsAnalyzingImage(false);
      setGeneralError('Unable to load image for scanning. Please check the file.');
    };

    img.src = previewUrl;
  };

  // Camera controls
  const startCamera = async () => {
    setCameraError(null);
    setResults([]);
    setNoResultFound(false);

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not supported in this browser environment.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access failed:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera permission was denied. Please allow camera access in browser settings to scan live codes.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera found on this device.');
      } else {
        setCameraError('Unable to connect to camera. Please try image upload mode.');
      }
      setIsCameraActive(false);
    }
  };

  // Frame processing loop for camera
  useEffect(() => {
    if (!isCameraActive) return;

    let isScanning = true;

    const scanFrame = async () => {
      if (!isScanning) return;

      const now = Date.now();
      // Throttle scanning to every 180ms to keep CPU usage low
      if (now - lastScanTimeRef.current > 180 && videoRef.current && videoRef.current.readyState >= 2) {
        lastScanTimeRef.current = now;
        try {
          const detected = await scanImageSource(videoRef.current, { returnMultiple: false });
          if (detected.length > 0) {
            setResults(detected);
            stopCamera(); // Pause on first reliable find
            return;
          }
        } catch {
          // Ignore frame decode errors
        }
      }

      if (isScanning) {
        animationFrameRef.current = requestAnimationFrame(scanFrame);
      }
    };

    animationFrameRef.current = requestAnimationFrame(scanFrame);

    return () => {
      isScanning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraActive, stopCamera]);

  const handleCopy = async (value: string, index: number) => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleReset = () => {
    if (imagePreviewUrl) {
      revokeObjectUrl(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    setUploadedFile(null);
    setResults([]);
    setNoResultFound(false);
    setGeneralError(null);
    setCameraError(null);
    stopCamera();
  };

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {generalError && (
        <Alert type="error" title="Scanner Notice" message={generalError} onClose={() => setGeneralError(null)} />
      )}

      {cameraError && (
        <Alert type="warning" title="Camera Access" message={cameraError} onClose={() => setCameraError(null)} />
      )}

      {/* Mode Selector Tabs */}
      <div className="flex items-center justify-center">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex items-center space-x-1 shadow-inner max-w-sm w-full">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setActiveTab('upload');
            }}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Upload size={14} />
            <span>Upload Image</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('camera');
            }}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'camera'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Camera size={14} />
            <span>Camera Scanner</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Area: Viewport (Upload Dropzone or Camera Stream) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'upload' ? (
            !imagePreviewUrl ? (
              <FileDropzone
                onFilesSelected={handleFilesSelected}
                accept="image/png,image/jpeg,image/webp,image/gif"
                multiple={false}
                subtitle="Upload or drop any photo or screenshot containing a QR code or barcode"
              />
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-xs">
                    {uploadedFile?.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-slate-500 hover:text-red-500 text-xs flex items-center space-x-1"
                  >
                    <RotateCcw size={12} />
                    <span>Upload Another</span>
                  </Button>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[420px] overflow-hidden">
                  <img
                    src={imagePreviewUrl}
                    alt="Uploaded code"
                    className="max-h-[360px] max-w-full object-contain rounded-lg shadow-sm"
                  />
                </div>
              </div>
            )
          ) : (
            /* Camera Mode */
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera size={16} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Camera Feed
                  </span>
                </div>

                {isCameraActive && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 animate-pulse">
                    Scanning active
                  </span>
                )}
              </div>

              <div className="relative bg-black min-h-[320px] flex items-center justify-center overflow-hidden">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full max-h-[380px] object-contain ${
                    !isCameraActive ? 'hidden' : ''
                  }`}
                />

                {isCameraActive && (
                  /* Target Reticle Overlay */
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-56 border-2 border-blue-500/80 rounded-2xl relative shadow-lg">
                      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-blue-400 rounded-tl" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-blue-400 rounded-tr" />
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-blue-400 rounded-bl" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-blue-400 rounded-br" />
                      <div className="absolute inset-x-4 top-1/2 h-0.5 bg-blue-500/60 shadow-xs animate-pulse" />
                    </div>
                  </div>
                )}

                {!isCameraActive && (
                  <div className="p-8 text-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-300">
                      <Camera size={28} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Camera is inactive</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        Click below to begin scanning. Camera permission is only requested upon click.
                      </p>
                    </div>
                    <Button
                      onClick={startCamera}
                      className="text-xs font-bold py-2.5 px-6 shadow-md shadow-blue-500/20"
                    >
                      <Camera size={14} className="mr-1.5" />
                      <span>Start Camera</span>
                    </Button>
                  </div>
                )}
              </div>

              {isCameraActive && (
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Align code inside the viewfinder box
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={stopCamera}
                    className="text-xs py-1 px-3"
                  >
                    <CameraOff size={13} className="mr-1" />
                    <span>Stop Camera</span>
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Privacy & Safety Note */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>100% Client-Side Scan Engine • No images sent anywhere</span>
            </span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Safe Preview Active
            </span>
          </div>
        </div>

        {/* Right Area: Detected Code Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ScanBarcode size={18} className="text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Decoded Results
                </h3>
              </div>
              {results.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <RotateCcw size={12} className="mr-1" />
                  <span>Clear</span>
                </Button>
              )}
            </div>

            {/* Analyzing spinner */}
            {isAnalyzingImage && (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-medium text-slate-500">Scanning image for codes...</p>
              </div>
            )}

            {/* Success Detected Result List */}
            {!isAnalyzingImage && results.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={15} />
                  <span>
                    {results.length === 1 ? '1 Code Detected' : `${results.length} Codes Detected`}
                  </span>
                </div>

                {results.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
                        {item.format}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Escaped safe text display */}
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-slate-100 break-all select-all max-h-40 overflow-y-auto">
                      {item.value}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(item.value, idx)}
                        className="flex-1 text-xs font-semibold flex items-center justify-center space-x-1.5"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={13} className="text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Value</span>
                          </>
                        )}
                      </Button>

                      {item.isUrl && (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                        >
                          <span>Open Link</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Result State */}
            {!isAnalyzingImage && noResultFound && (
              <div className="py-10 text-center space-y-3 px-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <AlertTriangle size={24} />
                </div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  No Code Found
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  No recognizable QR code or supported barcode was detected. Try an image with higher contrast or sharper focus.
                </p>
              </div>
            )}

            {/* Initial Idle State */}
            {!isAnalyzingImage && results.length === 0 && !noResultFound && (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <ScanBarcode size={36} className="mx-auto opacity-40 text-slate-400" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload an image or start camera to scan
                </p>
              </div>
            )}
          </div>

          {/* Supported Formats Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">
              Supported Formats
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'QR Code',
                'EAN-13',
                'EAN-8',
                'UPC-A',
                'UPC-E',
                'Code 128',
                'Code 39',
                'ITF'
              ].map((fmt) => (
                <span
                  key={fmt}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
