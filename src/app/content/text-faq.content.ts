import { FaqItem } from '../models/faq.model';

export const ZIP_TEXT_FAQ: FaqItem[] = [
  {
    question: 'How does text uploading work?',
    answer:
      'Paste your text, choose an expiry time, and generate a secure link. The text is automatically deleted after expiry.',
  },
  {
    question: 'Is uploaded text secure?',
    answer:
      'Yes. ZipUtils encrypts uploaded text and removes it permanently after the selected expiry time.',
  },
  {
    question: 'How long is uploaded text stored?',
    answer:
      'Uploaded text is stored only until the expiry time you choose, after which it is permanently deleted.',
  },
  {
    question: 'Who can access my uploaded text?',
    answer:
      'Only people with the generated private link can access your uploaded text. Once expired, the link no longer works.',
  },
  {
    question: 'Can I share links or create QR codes instead of sharing text?',
    answer:
      'Yes. If you only need to share a website link, you can use the <a href="/url/">URL Shortener</a> to create a clean, shareable link. You can also generate a <a href="/qr/">QR Code</a> for your text or links to make sharing easier on mobile or offline.',
  },
];

export const ZIP_URL_FAQ: FaqItem[] = [
  {
    question: 'What is a URL shortener?',
    answer:
      'A URL shortener converts long, complex web links into short, easy-to-share URLs. This makes links cleaner, easier to remember, and more convenient to share across messages, emails, and social media.',
  },
  {
    question: 'Why should I use ZipUtils URL Shortener?',
    answer:
      'ZipUtils provides a fast and simple way to shorten links without unnecessary steps. Our URL shortener focuses on speed, reliability, and ease of use, helping you create clean links instantly.',
  },
  {
    question: 'Are shortened URLs safe to use?',
    answer:
      'Yes. Shortened URLs created using ZipUtils simply redirect users to the original destination. Always ensure the original URL is trustworthy before sharing it publicly.',
  },
  {
    question: 'Can I shorten any type of URL?',
    answer:
      'You can shorten most valid URLs, including website links, blog posts, product pages, and social media links, as long as they follow a standard web URL format.',
  },
  {
    question: 'Do shortened links expire?',
    answer:
      'Shortened links created with ZipUtils do not expire unless explicitly configured in the future. They remain accessible as long as the service is active.',
  },
  {
    question: 'Is the URL shortener free to use?',
    answer:
      'Yes. ZipUtils URL Shortener is free to use and does not require account registration for basic link shortening.',
  },
  {
    question: 'Can I share shortened URLs on social media?',
    answer:
      'Absolutely. Shortened URLs are ideal for sharing on social media platforms, messaging apps, emails, and anywhere character limits or clean presentation matter.',
  },
  {
    question: 'Can I share text or create QR codes instead of shortening a URL?',
    answer:
      'Yes. If you need to share actual content like notes or messages, you can use the <a href="/text/">Text<a> Sharing tool to generate a private link. If you want to share links or text offline or on mobile, you can also create a <a href="/qr/">QR Code</a> for quick scanning.',
  },
];
