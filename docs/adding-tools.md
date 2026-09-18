# Guide: Adding a New Tool to ZapPebble

ZapPebble is architected so adding future utilities (e.g. Base64 Encoder, Markdown Previewer, UUID Generator) takes only three simple steps without modifying core layout or routing infrastructure:

## Step 1: Register Tool Metadata in `@webtools/shared`

Open `packages/shared/src/registry/tools.ts` and append your tool definition:

```typescript
{
  id: 'base64-encoder',
  slug: 'base64-encoder',
  name: 'Base64 Encoder & Decoder',
  tagline: 'Encode and decode text and binary files to Base64 format locally.',
  description: 'Convert strings or files to Base64 format and decode Base64 strings back to plain text or binary.',
  category: 'developer',
  categoryLabel: 'Developer Tools',
  iconName: 'Binary',
  path: '/tools/base64-encoder',
  extensionSupported: true,
  websiteSupported: true,
  seo: {
    title: 'Free Base64 Encoder & Decoder Online | ZapPebble',
    description: 'Encode and decode Base64 strings and files online with zero server uploads.',
    canonicalPath: '/tools/base64-encoder',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 converter']
  },
  howItWorks: [ ... ],
  faq: [ ... ],
  relatedToolSlugs: ['json-formatter'],
  privacyNote: 'Base64 transformations run 100% client-side.'
}
```

## Step 2: Implement the Client-Side Engine in `@webtools/shared`

Create `packages/shared/src/tools/base64/index.ts` with pure TypeScript functions that run in both browser and extension environments.

## Step 3: Implement Tool Component & Plug Into Web and Extension

Create the UI component using the design system (`Button`, `Card`, `Input`, `CopyButton`, `DownloadButton`).

The Next.js website will automatically:
- Create the route at `/tools/base64-encoder`
- Generate unique SEO tags and sitemap entries
- Display the tool in `/tools` directory and category lists
- Provide the standard `ToolLayout`, benefits, how-to, and FAQ!
