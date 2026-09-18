import { ToolDefinition } from '../types/tools';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'image-compressor',
    slug: 'image-compressor',
    name: 'Image Compressor',
    tagline: 'Compress JPG, PNG, and WebP images directly in your browser without quality loss.',
    description: 'Compress JPG, PNG and WebP images locally with customizable quality, instant preview, batch processing, and zero server uploads.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'Minimize2',
    path: '/tools/image-compressor',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Image Compressor Online – JPG, PNG & WebP | WebTools',
      description: 'Compress JPG, PNG and WebP images online for free with fast, private browser-based processing. Reduce file sizes without losing visual quality.',
      canonicalPath: '/tools/image-compressor',
      keywords: ['image compressor', 'compress jpg', 'compress png', 'compress webp', 'free image optimizer', 'browser image compression']
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload Images',
        description: 'Drag and drop your JPG, PNG, or WebP files or choose them via file picker.'
      },
      {
        step: 2,
        title: 'Adjust Quality',
        description: 'Set your preferred compression quality slider and preview live file size savings.'
      },
      {
        step: 3,
        title: 'Download Locally',
        description: 'Download individual optimized files or download all files at once instantly.'
      }
    ],
    faq: [
      {
        question: 'Are my images uploaded to any server?',
        answer: 'No. All compression happens 100% locally inside your browser using HTML5 Canvas and modern browser APIs. Your files never leave your device.'
      },
      {
        question: 'Which formats are supported?',
        answer: 'WebTools Image Compressor supports JPG/JPEG, PNG, and WebP formats.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Since processing is local, the limit depends on your device memory. Most standard images up to 50MB process smoothly.'
      }
    ],
    relatedToolSlugs: ['image-converter', 'screenshot-to-pdf', 'color-picker'],
    privacyNote: 'Your images are processed directly in your browser memory and never sent over the network.'
  },
  {
    id: 'image-converter',
    slug: 'image-converter',
    name: 'Image Converter',
    tagline: 'Convert images between JPG, PNG, and WebP formats with optional resizing.',
    description: 'Convert between JPG, PNG, and WebP formats effortlessly. Batch convert multiple images locally with custom resolution and quality options.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'RefreshCw',
    path: '/tools/image-converter',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Free Image Converter Online – Convert JPG, PNG, WebP | WebTools',
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
      title: 'Free Screenshot to PDF Converter Online | WebTools',
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
        question: 'How does screenshot capture work in the Chrome Extension?',
        answer: 'The extension uses Chrome’s native tab capture API to capture the visible tab area safely with zero external server transmission.'
      },
      {
        question: 'What page sizes are supported?',
        answer: 'Standard A4 and US Letter sizes in both Portrait and Landscape orientations.'
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
      title: 'Free QR Code Generator Online – PNG & SVG Download | WebTools',
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
      title: 'Free JSON Formatter & Validator Online | WebTools',
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
        answer: 'Yes. Processing runs completely in your local browser window. WebTools does not transmit your JSON payload to any server.'
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
      title: 'Free Word Counter & Character Counter Online | WebTools',
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
      title: 'Free Color Picker & HEX, RGB, HSL Converter | WebTools',
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
      title: 'Free QR & Barcode Scanner Online – Safe Client-Side Scan | WebTools',
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
        question: 'Does the scanner automatically redirect to scanned URLs?',
        answer: 'Never. For your security, WebTools displays the decoded text and URL first, allowing you to review it before clicking to open.'
      },
      {
        question: 'What barcode standards are supported?',
        answer: 'Common formats including QR Code, EAN-13, EAN-8, UPC-A, UPC-E, and Code 128.'
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
