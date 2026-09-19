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
  ShieldCheck,
  AlertTriangle,
  Upload,
  CheckCircle2,
  RefreshCw,
  Cpu
} from 'lucide-react';

type CameraStatus = 'idle' | 'requesting' | 'active' | 'denied' | 'unavailable' | 'error';

export function QrScannerTool() {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);

  // Camera State
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Scan Results
  const [results, setResults] = useState<ScanResult[]>([]);
  const [noResultFound, setNoResultFound] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>('');

  // Hardware acceleration detection
  const [hasHardwareAcceleration, setHasHardwareAcceleration] = useState<boolean>(false);

  // DOM Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastScanTimeRef = useRef<number>(0);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setHasHardwareAcceleration(isBarcodeDetectorSupported());
  }, []);

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
    setCameraStatus('idle');
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
    setLiveStatus('Analyzing image for barcodes and QR codes...');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        imageElementRef.current = img;
        const detected = await scanImageSource(img, { returnMultiple: true });
        if (detected.length > 0) {
          setResults(detected);
          setNoResultFound(false);
          setLiveStatus(
            `Scan complete. Found ${detected.length} code${detected.length > 1 ? 's' : ''}: ${detected[0].format}`
          );
        } else {
          setResults([]);
          setNoResultFound(true);
          setLiveStatus('Scan complete. No recognizable QR code or barcode found in this image.');
        }
      } catch (err) {
        console.error('Scan error:', err);
        setGeneralError('Failed to analyze image for codes. Please try a different image.');
        setLiveStatus('Failed to analyze image.');
      } finally {
        setIsAnalyzingImage(false);
      }
    };

    img.onerror = () => {
      setIsAnalyzingImage(false);
      setGeneralError('Unable to load image for scanning. Please verify the file format.');
      setLiveStatus('Unable to load image.');
    };

    img.src = previewUrl;
  };

  // Camera controls
  const startCamera = async () => {
    setCameraError(null);
    setResults([]);
    setNoResultFound(false);
    setCameraStatus('requesting');
    setLiveStatus('Requesting camera access...');

    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setCameraStatus('unavailable');
      setCameraError('Camera access is not supported in this browser environment.');
      setLiveStatus('Camera access is not supported.');
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
      setCameraStatus('active');
      setLiveStatus('Camera active. Align code inside the viewfinder.');
    } catch (err: any) {
      console.error('Camera access failed:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraStatus('denied');
        setCameraError(
          'Camera permission was denied. Please allow camera access in browser settings to scan live codes.'
        );
        setLiveStatus('Camera permission denied.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraStatus('unavailable');
        setCameraError('No camera was detected on this device.');
        setLiveStatus('No camera found on this device.');
      } else {
        setCameraStatus('error');
        setCameraError('Unable to connect to camera. Please try image upload mode.');
        setLiveStatus('Unable to connect to camera.');
      }
    }
  };

  // Frame processing loop for camera
  useEffect(() => {
    if (cameraStatus !== 'active') return;

    let isScanning = true;

    const scanFrame = async () => {
      if (!isScanning) return;

      const now = Date.now();
      // Throttle scanning to every 180ms to keep CPU/battery usage low
      if (
        now - lastScanTimeRef.current > 180 &&
        videoRef.current &&
        videoRef.current.readyState >= 2
      ) {
        lastScanTimeRef.current = now;
        try {
          const detected = await scanImageSource(videoRef.current, { returnMultiple: false });
          if (detected.length > 0) {
            setResults(detected);
            stopCamera();
            setLiveStatus(
              `Scan complete. Found ${detected[0].format.replace(/_/g, ' ')}: ${detected[0].value}`
            );
            return;
          }
        } catch {
          // Ignore frame decode errors during active stream
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
  }, [cameraStatus, stopCamera]);

  const handleCopy = async (value: string, index: number) => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedIndex(index);
      setLiveStatus('Value copied to clipboard.');
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
    setLiveStatus('Scanner reset.');
  };

  const handleKeyDownTab = (e: React.KeyboardEvent, targetTab: 'upload' | 'camera') => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const nextTab = targetTab === 'upload' ? 'camera' : 'upload';
      if (nextTab === 'camera') {
        setActiveTab('camera');
      } else {
        stopCamera();
        setActiveTab('upload');
      }
      const nextEl = document.getElementById(`tab-${nextTab}`);
      nextEl?.focus();
    }
  };

  return (
    <div className="space-y-6">
      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveStatus}
      </div>

      {/* Notifications */}
      {generalError && (
        <Alert
          type="error"
          title="Scanner Notice"
          message={generalError}
          onClose={() => setGeneralError(null)}
        />
      )}

      {cameraError && (
        <Alert
          type="warning"
          title="Camera Notice"
          message={cameraError}
          onClose={() => setCameraError(null)}
        />
      )}

      {/* Mode Selector Tabs with Semantic ARIA */}
      <div className="flex items-center justify-center">
        <div
          role="tablist"
          aria-label="Scanner input mode"
          className="bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl flex items-center space-x-1 shadow-inner max-w-sm w-full border border-slate-200/90 dark:border-slate-800"
        >
          <button
            id="tab-upload"
            type="button"
            role="tab"
            aria-selected={activeTab === 'upload'}
            aria-controls="panel-upload"
            tabIndex={activeTab === 'upload' ? 0 : -1}
            onClick={() => {
              stopCamera();
              setActiveTab('upload');
            }}
            onKeyDown={(e) => handleKeyDownTab(e, 'upload')}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Upload size={14} aria-hidden="true" />
            <span>Upload Image</span>
          </button>

          <button
            id="tab-camera"
            type="button"
            role="tab"
            aria-selected={activeTab === 'camera'}
            aria-controls="panel-camera"
            tabIndex={activeTab === 'camera' ? 0 : -1}
            onClick={() => {
              setActiveTab('camera');
            }}
            onKeyDown={(e) => handleKeyDownTab(e, 'camera')}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'camera'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Camera size={14} aria-hidden="true" />
            <span>Scan with Camera</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Viewport (Upload Dropzone or Camera Stream) */}
        <div className="lg:col-span-7 space-y-4">
          {activeTab === 'upload' ? (
            <div
              id="panel-upload"
              role="tabpanel"
              aria-labelledby="tab-upload"
              tabIndex={0}
              className="outline-none"
            >
              {!imagePreviewUrl ? (
                <FileDropzone
                  onFilesSelected={handleFilesSelected}
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  multiple={false}
                  subtitle="Upload or drop any photo or screenshot containing a QR code or barcode"
                />
              ) : (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
                  <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate max-w-xs">
                      {uploadedFile?.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      leftIcon={<RotateCcw size={12} />}
                      className="text-slate-500 hover:text-red-500 text-xs"
                    >
                      Upload Another
                    </Button>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[300px] max-h-[420px] overflow-hidden">
                    <img
                      src={imagePreviewUrl}
                      alt="Uploaded barcode or QR code preview"
                      className="max-h-[360px] max-w-full object-contain rounded-lg shadow-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Camera Mode */
            <div
              id="panel-camera"
              role="tabpanel"
              aria-labelledby="tab-camera"
              tabIndex={0}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden outline-none"
            >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera size={16} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Live Camera Feed
                  </span>
                </div>

                {cameraStatus === 'active' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 animate-pulse">
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
                    cameraStatus !== 'active' ? 'hidden' : ''
                  }`}
                />

                {/* Active Viewfinder Reticle Overlay */}
                {cameraStatus === 'active' && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-56 h-56 border-2 border-blue-500/80 rounded-2xl relative shadow-lg">
                      <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-blue-400 rounded-tl" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-blue-400 rounded-tr" />
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-blue-400 rounded-bl" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-blue-400 rounded-br" />
                      {/* Animated scan line */}
                      <div className="absolute inset-x-4 top-1/2 h-0.5 bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Requesting Camera Access State */}
                {cameraStatus === 'requesting' && (
                  <div className="p-8 text-center text-slate-400 space-y-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <h4 className="text-sm font-semibold text-white">Accessing Camera...</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto">
                      Please allow camera permission in your browser prompt.
                    </p>
                  </div>
                )}

                {/* Camera Inactive (Idle) State */}
                {cameraStatus === 'idle' && (
                  <div className="p-8 text-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-300">
                      <Camera size={28} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">Camera is Inactive</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        Click below to start scanning. Camera permission is only requested upon click.
                      </p>
                    </div>
                    <Button
                      onClick={startCamera}
                      leftIcon={<Camera size={14} />}
                      className="text-xs font-bold py-2.5 px-6 shadow-md shadow-blue-500/20"
                    >
                      Start Camera
                    </Button>
                  </div>
                )}

                {/* Camera Denied / Error / Unavailable States */}
                {(cameraStatus === 'denied' ||
                  cameraStatus === 'unavailable' ||
                  cameraStatus === 'error') && (
                  <div className="p-8 text-center text-slate-400 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-amber-950/50 text-amber-400 flex items-center justify-center mx-auto border border-amber-900/50">
                      <AlertTriangle size={28} aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {cameraStatus === 'denied'
                          ? 'Camera Permission Denied'
                          : cameraStatus === 'unavailable'
                          ? 'Camera Unavailable'
                          : 'Camera Error'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                        {cameraStatus === 'denied'
                          ? 'Please enable camera permissions in your browser address bar settings, or switch to Upload Image mode.'
                          : 'Camera access is not available on this device. You can upload an image or photo directly.'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={startCamera}
                        leftIcon={<RefreshCw size={13} />}
                        className="text-xs text-slate-200 border-slate-700 hover:bg-slate-800"
                      >
                        Try Again
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          stopCamera();
                          setActiveTab('upload');
                        }}
                        leftIcon={<Upload size={13} />}
                        className="text-xs"
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {cameraStatus === 'active' && (
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Align code inside the viewfinder box
                  </span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={stopCamera}
                    leftIcon={<CameraOff size={13} />}
                    className="text-xs py-1 px-3"
                  >
                    Stop Camera
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Privacy & Safety Note */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/90 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
              <span>100% Client-Side Scan Engine • No images sent to any server</span>
            </span>
            <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
              Safe Preview Active
            </span>
          </div>
        </div>

        {/* Right Column: Detected Code Results Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <ScanBarcode size={18} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Decoded Results
                </h3>
              </div>
              {results.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  leftIcon={<RotateCcw size={12} />}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </Button>
              )}
            </div>

            {/* Analyzing Spinner */}
            {isAnalyzingImage && (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-medium text-slate-500">Scanning image for codes...</p>
              </div>
            )}

            {/* Success: Detected Results List */}
            {!isAnalyzingImage && results.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>
                    {results.length === 1 ? '1 Code Detected' : `${results.length} Codes Detected`}
                  </span>
                </div>

                {results.map((item, idx) => {
                  const isSafeUrl = item.isUrl && isValidWebUrl(item.value);
                  const formattedType = item.format.replace(/_/g, ' ');

                  return (
                    <div
                      key={idx}
                      className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300">
                          {formattedType}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Escaped safe text display with scroll if long */}
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-900 dark:text-slate-100 break-all select-all max-h-40 overflow-y-auto leading-relaxed">
                        {item.value}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(item.value, idx)}
                          leftIcon={
                            copiedIndex === idx ? (
                              <Check size={13} className="text-emerald-500" />
                            ) : (
                              <Copy size={13} />
                            )
                          }
                          className="flex-1 text-xs font-semibold flex items-center justify-center space-x-1.5"
                        >
                          {copiedIndex === idx ? (
                            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                          ) : (
                            <span>Copy Value</span>
                          )}
                        </Button>

                        {/* Strict URL Safety: only show Open Link if isValidWebUrl is strictly true */}
                        {isSafeUrl && (
                          <a
                            href={item.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            <span>Open Link</span>
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Result State */}
            {!isAnalyzingImage && noResultFound && (
              <div className="py-10 text-center space-y-3 px-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <AlertTriangle size={24} aria-hidden="true" />
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
                <ScanBarcode size={36} className="mx-auto opacity-40 text-slate-400" aria-hidden="true" />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Upload an image or start camera to scan
                </p>
              </div>
            )}
          </div>

          {/* Engine & Supported Formats Card */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                Supported Formats
              </span>
              <span className="inline-flex items-center space-x-1 text-[10px] text-slate-500 dark:text-slate-400">
                <Cpu size={12} className="text-blue-500" aria-hidden="true" />
                <span>
                  {hasHardwareAcceleration ? 'Hardware Accelerated' : 'Client Software Engine'}
                </span>
              </span>
            </div>

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
