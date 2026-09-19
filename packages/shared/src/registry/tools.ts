import { ToolDefinition } from '../types/tools';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    tagline: 'Compress JPG, PNG, and WebP images directly in your browser without uploading your files.',
    description: 'Compress JPG, PNG, and WebP images locally with customizable quality, optional resizing, instant preview, batch processing, and zero server uploads.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'Minimize2',
    path: '/tools/image-compressor',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Image Compressor Online – Compress JPG, PNG & WebP | ZapPebble',
      description: 'Compress JPG, PNG, and WebP images locally in your browser. Adjust quality, resize dimensions, and reduce file sizes without uploading your files.',
      canonicalPath: '/tools/image-compressor',
      keywords: [
        'image compressor',
        'compress jpg',
        'compress png',
        'compress webp',
        'reduce image size',
        'free image compressor online',
        'browser image compression'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload Your Images',
        description: 'Drag and drop or browse JPG, PNG, or WebP files up to 50MB. Single images and batch files are supported.'
      },
      {
        step: 2,
        title: 'Adjust Compression Settings',
        description: 'Set your preferred quality level (1–100%). Optionally enable resizing to scale pixel dimensions, or select a different output format.'
      },
      {
        step: 3,
        title: 'Download Compressed Files',
        description: 'Inspect before-and-after file size savings. Download images individually or save all compressed files together in a ZIP archive.'
      }
    ],
    faq: [
      {
        question: 'How does browser-based image compression work?',
        answer: 'ZapPebble uses your browser native HTML5 Canvas API and JavaScript engine to decode, resize, and re-encode images directly in your device memory. When you adjust the quality slider, the canvas toBlob function re-compresses the image data locally. Because all operations happen on your machine, your files are never uploaded to any remote server.'
      },
      {
        question: 'What quality setting should I use for my images?',
        answer: 'A quality setting between 75% and 85% is a practical starting point for most web images, offering a strong balance between noticeable file size savings and visual clarity. For email attachments or web forms with strict file size limits, 65% to 75% works well. If you are preparing images for archival or high-resolution printing, keep the quality at 85% to 95%.'
      },
      {
        question: "Why didn't my PNG image get much smaller?",
        answer: "PNG is inherently a lossless format. In standard browser Canvas implementations, adjusting the quality slider on a PNG output does not apply lossy compression. To significantly reduce a PNG file size, toggle the 'Optional Resize' feature to scale down its pixel dimensions, or change the 'Output Format' to WebP or JPG, both of which support lossy compression."
      },
      {
        question: 'Does compressing a PNG remove its transparent background?',
        answer: "No. As long as you keep the output format set to 'Keep original format', 'PNG', or 'WebP', transparent backgrounds are fully preserved. However, if you choose 'JPG' as the output format, transparent areas will automatically be filled with a solid white background because the JPEG standard does not support alpha transparency."
      },
      {
        question: 'Can I compress multiple images simultaneously?',
        answer: "Yes. You can drag and drop or select multiple JPG, PNG, and WebP files at once. Each image is processed locally in sequence to keep your browser responsive. Once complete, you can download images individually or click 'Download All as ZIP' to download them all in a single compressed archive."
      },
      {
        question: 'Are my images uploaded or stored on any server?',
        answer: 'Never. ZapPebble operates with a 100% client-side architecture. Your image files are loaded into your browser temporary memory, processed on your device, and downloaded directly from local memory blobs. No images, metadata, or personal data are ever transmitted across the internet.'
      }
    ],
    relatedToolSlugs: ['image-converter', 'screenshot-to-pdf', 'color-picker'],
    privacyNote: 'Your images are processed directly in your browser memory and never sent over the network.'
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    name: 'Image Converter',
    tagline: 'Convert images between JPG, PNG, and WebP formats in seconds with local processing.',
    description: 'Convert single or multiple images between JPG, PNG, and WebP locally. Customize output quality, dimensions, and download instantly.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'RefreshCw',
    path: '/tools/image-converter',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Image Converter Online – Convert JPG, PNG, WebP | ZapPebble',
      description: 'Convert images between JPG, PNG, and WebP formats online for free. Fast local conversion with custom quality and resize settings.',
      canonicalPath: '/tools/image-converter',
      keywords: ['image converter', 'convert jpg to png', 'convert png to webp', 'convert webp to jpg', 'free image converter online']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Select Input Files',
        description: 'Drag and drop or select one or more image files from your computer.'
      },
      {
        step: 2,
        title: 'Choose Output Settings',
        description: 'Select desired target format (JPG, PNG, WebP), quality level, and optional resize dimensions.'
      },
      {
        step: 3,
        title: 'Convert & Save',
        description: 'Inspect converted previews and download files individually or as a batch bundle.'
      }
    ],
    faq: [
      {
        question: 'Can I convert multiple images simultaneously?',
        answer: 'Yes, batch conversion is fully supported. Select multiple files and convert them all to your chosen format.'
      },
      {
        question: 'Does converting WebP to PNG preserve transparency?',
        answer: 'Yes, converting transparent WebP images to PNG preserves full alpha transparency.'
      }
    ],
    relatedToolSlugs: ['image-compressor', 'color-picker', 'screenshot-to-pdf'],
    privacyNote: 'Image conversion runs entirely client-side using browser canvas rendering.'
  },
  {
    id: 'screenshot-to-pdf',
    slug: 'screenshot-to-pdf',
    name: 'Screenshot to PDF',
    tagline: 'Capture tabs or upload screenshots and convert them to high-resolution PDF documents.',
    description: 'Convert webpage captures or image screenshots into beautifully formatted PDF documents with customizable page size, orientation, and quality.',
    category: 'pdf',
    categoryLabel: 'PDF Tools',
    iconName: 'FileText',
    path: '/tools/screenshot-to-pdf',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Screenshot to PDF Converter Online | ZapPebble',
      description: 'Convert screenshots and images to PDF documents online for free. Customize A4 or Letter sizes, portrait or landscape orientation, with 100% private processing.',
      canonicalPath: '/tools/screenshot-to-pdf',
      keywords: ['screenshot to pdf', 'image to pdf', 'convert screenshot to pdf', 'webpage capture to pdf', 'pdf maker']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Capture or Upload',
        description: 'Use the extension capture button or upload an existing screenshot from your device.'
      },
      {
        step: 2,
        title: 'Configure Page Layout',
        description: 'Select page format (A4 or Letter), orientation (Portrait or Landscape), and image margin.'
      },
      {
        step: 3,
        title: 'Generate PDF',
        description: 'Generate and download the compiled PDF document instantly without server processing.'
      }
    ],
    faq: [
      {
        question: 'How do I convert a screenshot to PDF?',
        answer: 'Simply upload any PNG, JPG, or WebP screenshot file, choose your page layout preferences (size, orientation, fit, margin), and click "Generate & Download PDF".'
      },
      {
        question: 'Can I convert PNG, JPG, or WebP to PDF?',
        answer: 'Yes. ZapPebble accepts all standard raster image formats including PNG, JPG, JPEG, and WebP, converting them directly to standard PDF documents.'
      },
      {
        question: 'Are my images uploaded to a server?',
        answer: 'Never. All PDF document assembly and image decoding happens 100% locally in your browser memory. Your files never leave your device.'
      },
      {
        question: 'Can I choose A4, Letter, or Original Image Size?',
        answer: 'Yes. You can select standard ISO A4, US Letter, or Original Image Size, with Portrait, Landscape, or Auto-fit orientation.'
      },
      {
        question: 'Can I use this tool without installing software?',
        answer: 'Yes! ZapPebble runs instantly in any modern web browser or as a lightweight Chrome extension with zero installation or plugins required.'
      }
    ],
    relatedToolSlugs: ['image-compressor', 'image-converter'],
    privacyNote: 'PDF rendering occurs entirely within browser JavaScript. Your captures remain on your machine.'
  },
  {
    id: 'qr-generator',
    slug: 'qr-generator',
    name: 'QR Code Generator',
    tagline: 'Generate custom QR codes for URLs, plain text, WiFi, email, and phone numbers.',
    description: 'Instant QR code creation supporting links, text, WiFi credentials, emails, and phone contacts. Download in high-res PNG or vector SVG format.',
    category: 'scanner-generator',
    categoryLabel: 'Generators',
    iconName: 'QrCode',
    path: '/tools/qr-generator',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free QR Code Generator Online – PNG & SVG Download | ZapPebble',
      description: 'Create customized QR codes instantly for URLs, WiFi networks, emails, text, and phone numbers. Download high-resolution PNG or SVG vector files for free.',
      canonicalPath: '/tools/qr-generator',
      keywords: ['qr code generator', 'free qr generator', 'create qr code', 'wifi qr code', 'svg qr code generator']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Choose Data Type',
        description: 'Select your content type: Website URL, Plain Text, WiFi credentials, Email, or Phone number.'
      },
      {
        step: 2,
        title: 'Enter Information',
        description: 'Type in the required details and choose size and error correction levels.'
      },
      {
        step: 3,
        title: 'Download QR Code',
        description: 'Copy the QR image or download crisp PNG or scalable vector SVG files immediately.'
      }
    ],
    faq: [
      {
        question: 'Do the generated QR codes ever expire?',
        answer: 'No. These are standard static QR codes encoding your raw data directly. They work forever without third-party redirection or expiration.'
      },
      {
        question: 'Can I download vector SVG for printing?',
        answer: 'Yes, SVG format is available for crisp printing at any resolution.'
      }
    ],
    relatedToolSlugs: ['qr-scanner', 'json-formatter'],
    privacyNote: 'QR codes are generated client-side; no data is ever sent to any remote API.'
  },
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    tagline: 'Validate, format, minify, and inspect JSON with line and column error indicators.',
    description: 'A developer-friendly JSON tool to pretty-print, validate, minify, search, and parse JSON data with exact syntax error locations.',
    category: 'developer',
    categoryLabel: 'Developer Tools',
    iconName: 'Code',
    path: '/tools/json-formatter',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free JSON Formatter & Validator Online | ZapPebble',
      description: 'Format, validate, prettify, and minify JSON data online for free. Clear syntax highlighting and exact error line/column tracking.',
      canonicalPath: '/tools/json-formatter',
      keywords: ['json formatter', 'json validator', 'format json online', 'json pretty print', 'minify json', 'json parser']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Paste or Upload JSON',
        description: 'Paste your raw JSON string or upload a .json file directly into the editor.'
      },
      {
        step: 2,
        title: 'Format or Minify',
        description: 'Click Format (2 or 4 spaces) or Minify. Validation runs live and reports exact error positions.'
      },
      {
        step: 3,
        title: 'Copy or Download',
        description: 'Copy formatted output to clipboard with one click or download as a .json file.'
      }
    ],
    faq: [
      {
        question: 'Is it safe to format sensitive JSON data here?',
        answer: 'Yes. Processing runs completely in your local browser window. ZapPebble does not transmit your JSON payload to any server.'
      },
      {
        question: 'Does it pinpoint syntax errors?',
        answer: 'Yes, the parser catches syntax anomalies and provides clear line and column guidance to quickly fix broken JSON.'
      }
    ],
    relatedToolSlugs: ['word-counter', 'qr-generator'],
    privacyNote: 'Your JSON code stays 100% inside your browser session.'
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word & Character Counter',
    tagline: 'Count words, characters, sentences, paragraphs, and reading time in real-time.',
    description: 'Instant word, character, sentence, and paragraph counter with estimated reading time and social media length limit checks (Twitter/X, Meta titles, descriptions).',
    category: 'text',
    categoryLabel: 'Text Tools',
    iconName: 'FileSearch',
    path: '/tools/word-counter',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Word Counter & Character Counter Online | ZapPebble',
      description: 'Count words, characters (with and without spaces), sentences, and reading time online in real time. Check SEO meta title and social post character limits.',
      canonicalPath: '/tools/word-counter',
      keywords: ['word counter', 'character counter', 'word count online', 'reading time calculator', 'sentence counter', 'letter count']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Enter or Paste Text',
        description: 'Type or paste your text into the real-time writing analysis area.'
      },
      {
        step: 2,
        title: 'Review Live Statistics',
        description: 'View real-time counters for words, characters, sentences, paragraphs, and reading duration.'
      },
      {
        step: 3,
        title: 'Inspect Platform Limits',
        description: 'Check character counts against common benchmarks like SEO title tags, meta descriptions, and social posts.'
      }
    ],
    faq: [
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time is computed using the average adult reading speed benchmark of 200 words per minute.'
      },
      {
        question: 'Does this count characters without spaces?',
        answer: 'Yes, both total characters and characters excluding whitespaces are calculated simultaneously.'
      }
    ],
    relatedToolSlugs: ['json-formatter', 'qr-generator'],
    privacyNote: 'Your text is never sent across the internet. Everything is calculated in memory.'
  },
  {
    id: 'color-picker',
    slug: 'color-picker',
    name: 'Color Picker & Palette',
    tagline: 'Pick colors from screens or color wheels with instant HEX, RGB, and HSL conversions.',
    description: 'Inspect screen colors using browser EyeDropper API or palette picker. Instant conversions between HEX, RGB, and HSL with recent color history.',
    category: 'color',
    categoryLabel: 'Color Tools',
    iconName: 'Pipette',
    path: '/tools/color-picker',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Color Picker & HEX, RGB, HSL Converter | ZapPebble',
      description: 'Pick colors easily with eyedropper support, generate color codes in HEX, RGB, HSL, and manage color palettes online for free.',
      canonicalPath: '/tools/color-picker',
      keywords: ['color picker', 'eyedropper tool', 'hex to rgb', 'rgb to hsl', 'color converter', 'online color palette']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Pick a Color',
        description: 'Use the screen EyeDropper button or select any color from the interactive color spectrum.'
      },
      {
        step: 2,
        title: 'View Formats',
        description: 'See live values in HEX, RGB, and HSL formats with contrast suggestions.'
      },
      {
        step: 3,
        title: 'Copy & Save History',
        description: 'Click any format to copy to clipboard and preserve recent picks in your local session history.'
      }
    ],
    faq: [
      {
        question: 'Does the EyeDropper work across tabs?',
        answer: 'On supported Chromium browsers, the EyeDropper API allows sampling any pixel visible on your screen.'
      },
      {
        question: 'Can I copy values in different formats?',
        answer: 'Yes, copy buttons are available for HEX (#RRGGBB), RGB (rgb(r,g,b)), and HSL (hsl(h,s%,l%)).'
      }
    ],
    relatedToolSlugs: ['image-compressor', 'image-converter'],
    privacyNote: 'Color choices remain in local browser storage and are never uploaded.'
  },
  {
    id: 'qr-scanner',
    slug: 'qr-scanner',
    name: 'QR & Barcode Scanner',
    tagline: 'Scan QR codes and barcodes securely via camera or file upload with safe previews.',
    description: 'Scan QR codes, EAN, UPC, and Code 128 barcodes from image files or camera video. Inspect detected content securely before opening.',
    category: 'scanner-generator',
    categoryLabel: 'Generators & Scanners',
    iconName: 'ScanBarcode',
    path: '/tools/qr-scanner',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free QR & Barcode Scanner Online – Safe Client-Side Scan | ZapPebble',
      description: 'Scan QR codes and barcodes online securely via webcam or image upload. Preview URLs safely before visiting with no server uploads.',
      canonicalPath: '/tools/qr-scanner',
      keywords: ['qr scanner', 'barcode scanner', 'scan qr code online', 'scan barcode from image', 'safe qr code reader']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload or Open Camera',
        description: 'Upload an image containing a code or grant camera access to scan in real-time.'
      },
      {
        step: 2,
        title: 'Safe Decode Preview',
        description: 'The decoded value is displayed safely as plain text to prevent malicious auto-navigation.'
      },
      {
        step: 3,
        title: 'Copy or Open',
        description: 'Copy the result to clipboard or manually choose to visit detected web URLs.'
      }
    ],
    faq: [
      {
        question: 'Can I scan a QR code from an image?',
        answer: 'Yes! You can drag and drop or browse any screenshot or photo containing a QR code or barcode to decode it immediately.'
      },
      {
        question: 'Which barcodes are supported?',
        answer: 'ZapPebble supports standard 2D and 1D barcode standards including QR Code, EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39, and ITF.'
      },
      {
        question: 'Does the scanner upload my image or camera data?',
        answer: 'No. All frame analysis and decoding is performed 100% locally in your browser memory. Nothing is ever sent to a remote server.'
      },
      {
        question: 'Can I scan using my camera or webcam?',
        answer: 'Yes. On devices with a camera, you can start live camera scanning with a single click. When stopped, camera hardware is immediately released.'
      },
      {
        question: 'Does the scanner automatically redirect to scanned URLs?',
        answer: 'Never. Scanned content is displayed safely as plain text first. Only if the result is a valid web link will an "Open Link" button appear for explicit navigation.'
      }
    ],
    relatedToolSlugs: ['qr-generator', 'json-formatter'],
    privacyNote: 'Camera feed and images are processed frame-by-frame locally. No video or pictures are stored.'
  }
];

export const TOOL_CATEGORIES = [
  { id: 'image', name: 'Image Tools', description: 'Compress, convert, and edit images locally in your browser.' },
  { id: 'developer', name: 'Developer Tools', description: 'Format, validate, and inspect code and data structures.' },
  { id: 'text', name: 'Text Tools', description: 'Analyze, count, and format text for web and social platforms.' },
  { id: 'pdf', name: 'PDF Tools', description: 'Create and convert documents client-side.' },
  { id: 'scanner-generator', name: 'Generators & Scanners', description: 'Generate and scan QR codes and barcodes securely.' },
  { id: 'color', name: 'Color Tools', description: 'Pick, sample, and convert color codes with palette history.' }
] as const;

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.popular);
}
