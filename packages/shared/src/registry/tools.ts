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
    tagline: 'Convert JPG, PNG, and WebP images directly in your browser without uploading your files.',
    description: 'Convert single or multiple images between JPG, PNG, and WebP locally. Customize output quality, dimensions, and download instantly.',
    category: 'image',
    categoryLabel: 'Image Tools',
    iconName: 'RefreshCw',
    path: '/tools/image-converter',
    popular: true,
    extensionSupported: true,
    websiteSupported: true,
    seo: {
      title: 'Image Converter Online – Convert JPG, PNG & WebP | ZapPebble',
      description: 'Convert JPG, PNG, and WebP images directly in your browser. Change image formats, adjust quality, resize dimensions, and download locally with zero server uploads.',
      canonicalPath: '/tools/image-converter',
      keywords: [
        'image converter',
        'convert jpg to png',
        'convert png to jpg',
        'convert webp to png',
        'convert jpg to webp',
        'free image converter online',
        'browser image converter'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Select Input Images',
        description: 'Drag and drop or select one or more JPG, PNG, or WebP files up to 50MB from your computer.'
      },
      {
        step: 2,
        title: 'Choose Output Format & Settings',
        description: 'Select your target format (WebP, PNG, or JPG). Adjust quality for JPG/WebP, or optionally enable resizing to scale pixel dimensions.'
      },
      {
        step: 3,
        title: 'Convert & Download Locally',
        description: 'Inspect converted previews and download files individually or save all converted images together in a ZIP archive.'
      }
    ],
    faq: [
      {
        question: 'What image formats can I convert?',
        answer: 'ZapPebble currently supports bi-directional conversion between JPG/JPEG, PNG, and WebP formats. You can upload any combination of these formats and convert them to your chosen target format.'
      },
      {
        question: 'Does converting an image reduce its file size?',
        answer: 'Not necessarily. Format conversion changes the underlying file container and encoding standard. For example, converting a compressed JPG into a lossless PNG often increases the file size, while converting a PNG to WebP or JPG often reduces it. If your primary goal is shrinking file size, use our Image Compressor.'
      },
      {
        question: 'Does JPG support transparent backgrounds?',
        answer: 'No. The JPEG specification does not support an alpha transparency channel. If you convert a transparent PNG or WebP into a JPG, ZapPebble automatically fills the transparent areas with a clean white background to prevent dark or corrupted rendering artifacts.'
      },
      {
        question: 'Will converting a JPG to PNG restore its original quality?',
        answer: 'No. While PNG is a lossless format, converting a JPG to PNG only saves the current visual data without further loss. It cannot recreate fine details or undo compression artifacts that were already discarded when the original JPG was compressed.'
      },
      {
        question: 'Why is my converted image file larger than the original?',
        answer: 'This commonly occurs when converting lossy files (such as JPG) into PNG. PNG uses lossless compression designed for sharp edges and graphics, which requires more data to store continuous photographic gradients. Selecting WebP as your target format typically provides a much smaller file while maintaining high visual quality.'
      },
      {
        question: 'Are my images uploaded to a server?',
        answer: 'Never. All image decoding, canvas rendering, format re-encoding, and file packaging run 100% locally inside your browser memory. Your images never leave your computer and are never uploaded to any remote server or cloud service.'
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
      title: 'Free Screenshot to PDF Converter Online – Fast & Private | ZapPebble',
      description: 'Convert screenshots, PNG, JPG, and WebP images to PDF online for free. Choose ISO A4, US Letter, or original image size with portrait/landscape orientation and 100% private in-browser processing.',
      canonicalPath: '/tools/screenshot-to-pdf',
      keywords: [
        'screenshot to pdf',
        'convert screenshot to pdf',
        'image to pdf',
        'png to pdf',
        'jpg to pdf',
        'save screenshot as pdf',
        'screenshot to pdf converter online',
        'free pdf maker'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Upload or Drop Screenshot',
        description: 'Upload any PNG, JPG, or WebP screenshot or image directly from your computer.'
      },
      {
        step: 2,
        title: 'Configure Page Layout & Margins',
        description: 'Select ISO A4, US Letter, or Original Image Size with customized orientation, fit mode, and margin spacing.'
      },
      {
        step: 3,
        title: 'Generate & Download PDF',
        description: 'Generate and download your high-resolution PDF document instantly with 100% client-side privacy.'
      }
    ],
    faq: [
      {
        question: 'How do I convert a screenshot to a PDF document?',
        answer: 'Simply drag and drop or upload any PNG, JPG, or WebP screenshot file, customize your preferred page size (A4, US Letter, or Original Image Size), orientation, fit mode, and margins, then click "Generate & Download PDF". The document compiles instantly in your browser.'
      },
      {
        question: 'What page size should I choose: A4, US Letter, or Original Image Size?',
        answer: 'Choose ISO A4 if you are located in or sending documents to Europe, Asia, Latin America, or international organizations. Choose US Letter for the United States, Canada, and Mexico. Choose Original Image Size if your PDF is intended for digital viewing, developer bug tracking, or UI archives, as it matches your screenshot\'s exact pixel dimensions with zero white borders.'
      },
      {
        question: 'What is the difference between Fit to Page, Fill Page, and Original 1:1?',
        answer: 'Fit to Page scales the image proportionally to fit completely inside the printable area without cropping or distorting aspect ratio. Fill Page forces the image to fill the entire printable area edge-to-edge, which may stretch proportions if the aspect ratios differ. Original 1:1 renders each image pixel as one PDF point centered on the page without scaling.'
      },
      {
        question: 'Why does my screenshot PDF have white bars or margins around the image?',
        answer: 'White bars (letterboxing) appear when using Fit to Page if your screenshot\'s aspect ratio (e.g. 16:9 widescreen) does not match the paper\'s aspect ratio (such as A4 or Letter). To eliminate white bars, select Landscape orientation to better match wide screens, or select Original Image Size with None (0 pt) margins.'
      },
      {
        question: 'Does converting a screenshot to PDF reduce image quality or resolution?',
        answer: 'No. ZapPebble embeds your screenshot as a high-quality JPEG stream (0.95 quality rating) directly into the PDF-1.4 binary structure. Small text, user interface icons, and code snippets remain sharp, crisp, and fully legible.'
      },
      {
        question: 'Are my screenshots uploaded to a remote server or cloud service?',
        answer: 'Never. All image decoding, canvas rendering, and PDF-1.4 binary document synthesis happen 100% locally inside your browser memory using client-side JavaScript. Your files and captures are never transmitted over the internet or stored on any server.'
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
      title: 'Free QR Code Generator Online – Create PNG & SVG QR Codes | ZapPebble',
      description: 'Create free static QR codes for website URLs, plain text, WiFi networks, email, and phone numbers directly in your browser. Customize colors, error correction, and download PNG or SVG.',
      canonicalPath: '/tools/qr-generator',
      keywords: [
        'qr code generator',
        'free qr generator',
        'create qr code',
        'generate qr code',
        'wifi qr code',
        'svg qr code generator',
        'qr code png',
        'custom qr code',
        'private qr code generator'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Choose QR Content Type',
        description: 'Select what your QR code will store: Website URL, Plain Text, WiFi credentials, Email message, or Phone number.'
      },
      {
        step: 2,
        title: 'Enter Details & Customize',
        description: 'Type in your content, choose error correction level (L, M, Q, H), select resolution, and customize foreground/background colors.'
      },
      {
        step: 3,
        title: 'Download PNG or SVG',
        description: 'Download crisp raster PNG images, export infinite-resolution vector SVG files, or copy the encoded raw payload to your clipboard.'
      }
    ],
    faq: [
      {
        question: 'What types of QR codes can I create with ZapPebble?',
        answer: 'You can generate static QR codes for website URLs, plain text notes, email drafts (with optional pre-filled subject and body), telephone dialer numbers, and WiFi network credentials (supporting WPA/WPA2, WEP, open networks, and hidden SSIDs).'
      },
      {
        question: 'Is this a static or dynamic QR code generator?',
        answer: 'ZapPebble generates 100% static QR codes. The encoded data is embedded directly into the matrix pattern itself. There are no intermediate redirect servers, no scan limits, no user accounts, and no expiration dates. Once generated, your QR code will work permanently.'
      },
      {
        question: 'What QR error correction level should I choose?',
        answer: 'We recommend Level M (Medium, ~15% recovery) for most use cases, as it provides an optimal balance between scan resilience and module density. Level L (~7%) is best for clean digital screens with low density, while Level Q (~25%) and Level H (~30%) are recommended for printed materials subjected to outdoor weather, heavy handling, or physical wear.'
      },
      {
        question: 'What resolution or size should my QR code be?',
        answer: 'For digital sharing, website embeds, and email footers, 256×256 px or 512×512 px PNG is ideal. For physical printing, packaging, and posters, we recommend downloading the resolution-independent SVG vector format or the 1024×1024 px PNG preset.'
      },
      {
        question: 'Can I create a WiFi QR code, and is it secure?',
        answer: 'Yes. You can encode your wireless network name (SSID), password, and security type into a standard MeCard format that allows smartphones to connect with a single scan. However, keep in mind that the WiFi password is stored as plain text inside the QR code; treat printed WiFi QR codes like a written password.'
      },
      {
        question: 'Should I download my QR code as PNG or SVG?',
        answer: 'Download PNG for digital use on web pages, social media, slides, and office documents. Download SVG for professional commercial printing, merchandise, signage, and graphic design software (such as Adobe Illustrator or Figma), as vector SVG scales infinitely without pixelation.'
      },
      {
        question: 'Why isn\'t my QR code scanning on mobile cameras?',
        answer: 'The most common cause is insufficient color contrast between the foreground and background. Always ensure the foreground is significantly darker than the background (ZapPebble warns you if contrast is below 3.0:1). Other frequent causes include dense payloads with tiny modules, inverted colors, or cropping away the surrounding quiet zone margin.'
      },
      {
        question: 'Is my QR data or WiFi password uploaded to any server?',
        answer: 'Never. All QR matrix computation, color styling, and PNG/SVG export occur 100% locally inside your browser memory using client-side JavaScript. Your text, URLs, and network credentials never leave your device and are never transmitted to any external server.'
      }
    ],
    relatedToolSlugs: ['qr-scanner', 'color-picker'],
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
      title: 'Free JSON Formatter & Validator Online – Pretty Print & Minify | ZapPebble',
      description: 'Format, validate, minify, and inspect JSON in your browser. Real-time syntax error checking with exact line and column locations, interactive tree view, and 100% private in-browser processing.',
      canonicalPath: '/tools/json-formatter',
      keywords: [
        'json formatter',
        'json validator',
        'format json online',
        'json pretty print',
        'minify json',
        'json parser online',
        'json syntax checker',
        'json tree viewer',
        'private json formatter'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Paste or Enter JSON',
        description: 'Paste your raw JSON string directly into the code editor. Real-time line numbering and syntax validation activate immediately.'
      },
      {
        step: 2,
        title: 'Format, Minify, or Debug',
        description: 'Click Format JSON (2 spaces, 4 spaces, or tabs) to pretty-print, or Minify JSON to strip whitespace. If errors exist, inspect the exact line and column indicator.'
      },
      {
        step: 3,
        title: 'Copy or Download',
        description: 'Copy the formatted output to your clipboard with one click, or download the clean JSON file directly to your device.'
      }
    ],
    faq: [
      {
        question: 'What does a JSON formatter do?',
        answer: 'A JSON formatter (also called a pretty-printer or beautifier) takes compacted or unformatted JSON text and adds standard indentation, line breaks, and whitespace. This makes the data structure easy for humans to read, review, and debug without altering the underlying data values.'
      },
      {
        question: 'What is the difference between formatting and minifying JSON?',
        answer: 'Formatting adds indentation and line breaks to maximize human readability during development. Minifying removes all non-essential whitespace and newlines to produce the smallest possible plain-text payload, reducing bandwidth and storage consumption when transmitting data over networks.'
      },
      {
        question: 'Why does my JSON show an "Unexpected token" error?',
        answer: 'An "Unexpected token" error occurs when the parser encounters a character that violates RFC 8259 syntax rules. Frequent causes include trailing commas after the last item in an array or object, using single quotes instead of double quotes, missing colons between keys and values, or unquoted property names.'
      },
      {
        question: 'How do line and column numbers help fix invalid JSON?',
        answer: 'ZapPebble extracts the exact character offset from parser exceptions and maps it to line and column coordinates, displaying a snippet of the broken line. Because parsers report where they detected the failure, check the reported column as well as the characters or lines immediately preceding it.'
      },
      {
        question: 'Does this tool validate JSON Schema?',
        answer: 'No. ZapPebble validates JSON syntax against the official RFC 8259 specification (checking for valid brackets, quotes, and punctuation). It does not evaluate external JSON Schema contracts (such as verifying data types, required fields, or regex formats).'
      },
      {
        question: 'Can I search inside large JSON documents?',
        answer: 'Yes. Use the integrated search bar above the editor to search for any key, string value, or number. ZapPebble highlights matching text in the editor and provides up/down navigation buttons to jump between matches.'
      },
      {
        question: 'How does the JSON Tree View work?',
        answer: 'The Tree View parses valid JSON into an interactive, collapsible visual hierarchy. Objects and arrays can be expanded or collapsed node-by-node, and values are tagged with color-coded type badges (string, number, boolean, null) for rapid inspection.'
      },
      {
        question: 'Is my JSON data uploaded to any external server?',
        answer: 'Never. All JSON parsing, syntax validation, formatting, minification, and tree generation run 100% locally inside your browser memory using client-side JavaScript. Your data, API payloads, and tokens never leave your computer.'
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
      description: 'Count words, characters (with and without spaces), sentences, paragraphs, lines, and reading time in your browser. Check practical social and SEO character benchmarks without uploading your text.',
      canonicalPath: '/tools/word-counter',
      keywords: [
        'word counter',
        'character counter',
        'word counter online',
        'character counter online',
        'count words',
        'sentence counter',
        'paragraph counter',
        'reading time calculator',
        'seo character counter',
        'private word counter'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Paste or Type Your Text',
        description: 'Paste or type your draft into the text editor. Real-time statistics begin calculating immediately.'
      },
      {
        step: 2,
        title: 'Review Live Writing Metrics',
        description: 'Inspect instant counts for words, characters, characters without spaces, sentences, paragraphs, lines, and reading time.'
      },
      {
        step: 3,
        title: 'Check Limits & Copy',
        description: 'Select an active character benchmark (X Post, SEO Title, or Meta Description) to verify limits, then copy your draft with one click.'
      }
    ],
    faq: [
      {
        question: 'What does this word counter calculate?',
        answer: 'ZapPebble calculates 9 live text metrics simultaneously: words, total characters, characters excluding spaces, sentences, paragraphs, lines, estimated reading time, average word length, and the longest word in your text.'
      },
      {
        question: 'How does ZapPebble count words in text?',
        answer: 'ZapPebble uses a Unicode-aware regular expression that detects sequences of letters, numbers, and combining marks. Contractions (such as "don\'t") and hyphenated compounds (such as "state-of-the-art") are counted as single words, and non-English alphabets are fully supported.'
      },
      {
        question: 'What is the difference between characters and characters without spaces?',
        answer: 'Total characters count every letter, number, punctuation mark, symbol, and whitespace character. Characters without spaces strip out all spaces, tabs, and line breaks, which is a common measurement standard in academic abstracts, translation billing, and publishing.'
      },
      {
        question: 'How is the estimated reading time calculated?',
        answer: 'Reading time is estimated using the standard adult silent reading benchmark of 200 words per minute (WPM), rounded up to the nearest whole minute. Actual reading speeds vary depending on text complexity and reader familiarity.'
      },
      {
        question: 'Are the 60-character title and 160-character description limits exact SEO rules?',
        answer: 'No. Search engines measure title and description snippet display boundaries in pixels rather than fixed character counts. Furthermore, search engines dynamically generate snippets based on user queries. The 60 and 160 character limits are practical drafting benchmarks to help avoid ellipsis truncation.'
      },
      {
        question: 'Does the word counter support non-English languages and Unicode?',
        answer: 'Yes. The word counting engine matches Unicode letter and mark categories (\\p{L}, \\p{N}, \\p{M}), supporting accented Latin, Cyrillic, Greek, Arabic, Devanagari, and other international writing systems.'
      },
      {
        question: 'Can I check character limits for X (Twitter) posts?',
        answer: 'Yes. ZapPebble includes a dedicated 280-character benchmark for standard X (Twitter) posts, featuring a live visual progress bar that turns amber when approaching the limit and red when exceeding it.'
      },
      {
        question: 'Is my text uploaded to a server or saved anywhere?',
        answer: 'Never. All text analysis runs 100% locally inside your browser memory using client-side JavaScript. Your drafts, essays, personal notes, and confidential writings are never transmitted across the network or stored on any server.'
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
      title: 'Free Color Picker Online – HEX, RGB, HSL & WCAG Contrast Checker | ZapPebble',
      description: 'Pick colors, inspect live HEX, RGB, and HSL values, sample screen pixels with the EyeDropper, and test WCAG 2.1 AA/AAA contrast ratios with 100% private in-browser processing.',
      canonicalPath: '/tools/color-picker',
      keywords: [
        'color picker',
        'color picker online',
        'hex color picker',
        'rgb color picker',
        'hsl color picker',
        'color contrast checker',
        'wcag contrast checker',
        'eyedropper color picker',
        'pick color from screen',
        'hex to rgb'
      ]
    },
    howItWorks: [
      {
        step: 1,
        title: 'Choose or Sample a Color',
        description: 'Click the color swatch, type or paste a HEX code, adjust RGB sliders, or use the screen EyeDropper to sample any visible pixel.'
      },
      {
        step: 2,
        title: 'Inspect Formats & Check Contrast',
        description: 'Review synchronized HEX, RGB, and HSL values while verifying real-time WCAG 2.1 AA and AAA contrast ratings against white and black.'
      },
      {
        step: 3,
        title: 'Copy Codes & Save History',
        description: 'Click any code card to copy formatted CSS values to your clipboard. Your last 16 unique color selections are automatically saved in local browser storage.'
      }
    ],
    faq: [
      {
        question: 'What is a color picker and why are multiple color formats needed?',
        answer: 'A color picker allows designers and developers to select, inspect, and adjust visual colors and retrieve precise numerical representations. Different environments require different formats: HEX is standard in HTML and CSS stylesheets, RGB aligns with screen subpixel rendering and digital graphics applications, and HSL provides an intuitive model for adjusting shade, tint, and saturation programmatically.'
      },
      {
        question: 'What is the difference between HEX, RGB, and HSL color models?',
        answer: 'HEX (#RRGGBB) represents red, green, and blue intensities using base-16 hexadecimal notation (00 to FF). RGB (rgb(r, g, b)) uses base-10 integers from 0 to 255 for the same color channels. HSL (hsl(h, s%, l%)) describes color in cylindrical coordinates: Hue in degrees (0° to 360°), Saturation as a percentage (0% grayscale to 100% full color), and Lightness as a percentage (0% black, 50% normal color, 100% white).'
      },
      {
        question: 'How does the EyeDropper tool pick colors from the screen?',
        answer: 'ZapPebble uses the native browser EyeDropper API (window.EyeDropper). When clicked, the browser provides an OS-level magnifying loupe that allows you to sample any visible pixel on your screen (inside or outside the browser window). The API returns the sampled pixel as an sRGB hexadecimal string directly into memory.'
      },
      {
        question: 'Why is the EyeDropper button disabled or unsupported on some browsers?',
        answer: 'The EyeDropper API is currently supported on Chromium-based desktop browsers (Google Chrome, Microsoft Edge, Brave, Opera, and Vivaldi). Safari and Firefox do not currently support the EyeDropper API. On unsupported browsers, the button is disabled with an explanatory note, but the interactive color swatch, HEX input, and RGB sliders remain fully accessible.'
      },
      {
        question: 'What does the contrast ratio number mean?',
        answer: 'The contrast ratio measures the relative luminance difference between two colors on a scale from 1:1 (identical colors with zero contrast) to 21:1 (pure black on pure white). Higher contrast numbers indicate greater legibility, making text readable for individuals with moderate to severe low vision or color vision deficiencies.'
      },
      {
        question: 'What is the difference between WCAG AA and AAA accessibility levels?',
        answer: 'Under WCAG 2.1, Level AA requires a contrast ratio of at least 4.5:1 for standard body text (under 18pt or 14pt bold) and 3.0:1 for large text (18pt+ regular or 14pt+ bold). Level AAA is a higher enhancement standard requiring 7.0:1 for standard text and 4.5:1 for large text. Level AA is the benchmark legally mandated by accessibility regulations such as Section 508 and the European Accessibility Act.'
      },
      {
        question: 'How does ZapPebble store my recent color history?',
        answer: 'ZapPebble stores your last 16 unique color selections directly in your browser localStorage under the key zappebble_color_history. Your history persists between page reloads and browser restarts. You can click any saved swatch to reactivate it or clear the list anytime with one click.'
      },
      {
        question: 'Are my colors or screen captures uploaded to any server?',
        answer: 'Never. All color conversions, mathematical contrast calculations, and EyeDropper sampling run 100% locally inside your browser client memory. No pixels, screenshots, or color values are transmitted across the network, logged on servers, or stored externally.'
      }
    ],
    relatedToolSlugs: ['qr-generator', 'image-converter'],
    privacyNote: 'Color choices and screen sampling remain 100% in your local browser session. Nothing is ever uploaded.'
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
