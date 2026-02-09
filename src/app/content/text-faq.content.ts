import { FaqItem } from '../models/faq.model';

export const ZIP_TEXT_FAQ: FaqItem[] = [
  {
    question: 'How does online text transfer work?',
    answer:
      'Paste your text, choose an expiry time, and generate a secure link. The text is automatically deleted after expiry.',
  },
  {
    question: 'Is online text transfer secure?',
    answer:
      'Yes. ZipUtils encrypts uploaded text and removes it permanently after the selected expiry time.',
  },
  {
    question: 'How long does shared text stay available online?',
    answer:
      'Uploaded text is stored only until the expiry time you choose, after which it is permanently deleted.',
  },
  {
    question: 'Who can access my uploaded text?',
    answer:
      'Only people with the generated private link can access your uploaded text. Once expired, the link no longer works.',
  },
  {
    question: 'Can I share text online without email or messaging apps?',
    answer:
      'Yes. ZipUtils lets you paste text and generate a private link that you can share directly, without using email, WhatsApp, or any messaging app.',
  },
  {
    question: 'Can I send long text online using this tool?',
    answer:
      'Yes. ZipUtils is designed for sharing long text, notes, or instructions online by converting them into a single secure, shareable link.',
  },
  {
    question: 'Can I create a temporary text link that expires automatically?',
    answer:
      'Yes. You can choose an expiry time when generating the link. Once the expiry time is reached, the text is permanently deleted.',
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
    question:
      'Can I share text or create QR codes instead of shortening a URL?',
    answer:
      'Yes. If you need to share actual content like notes or messages, you can use the <a href="/text/">Text<a> Sharing tool to generate a private link. If you want to share links or text offline or on mobile, you can also create a <a href="/qr/">QR Code</a> for quick scanning.',
  },
];

export const ZIP_QR_FAQ: FaqItem[] = [
  {
    question: 'What is a QR code generator?',
    answer:
      'A QR code generator allows you to convert text, URLs, or other small data into a scannable QR code. Users can scan the QR code using a mobile phone or camera-enabled device to quickly access the embedded information.',
  },
  {
    question: 'What type of content can I generate a QR code for?',
    answer:
      'You can generate QR codes for website URLs, plain text, short messages, and other lightweight data. QR codes work best for compact content such as links or identifiers.',
  },
  {
    question: 'Is there a limit on how much text a QR code can store?',
    answer:
      'Yes. QR codes have a size limit. For most use cases, it is recommended to keep text under 1–2 KB. Large content or files should be shared using a link instead of embedding the data directly in a QR code.',
  },
  {
    question: 'Can I download the generated QR code?',
    answer:
      'Yes. Once your QR code is generated, you can download it as an image file and use it in documents, posters, websites, presentations, or print materials.',
  },
  {
    question: 'Can I share the QR code image directly?',
    answer:
      'Yes. You can share the generated QR code image directly using supported devices and browsers. This makes it easy to send QR codes through messaging apps, email, or social platforms.',
  },
  {
    question: 'Can I modify the content after generating a QR code?',
    answer:
      'No. Once a QR code is generated, its content cannot be changed. To update the content, you need to create a new QR code. This ensures clarity and avoids confusion when sharing.',
  },
  {
    question: 'How does the QR code scanner work?',
    answer:
      'The QR code scanner uses your device’s camera to detect and decode QR codes in real time. Simply point the camera at a QR code, and the embedded content will be displayed instantly.',
  },
  {
    question: 'Is scanning QR codes safe?',
    answer:
      'Scanning QR codes is generally safe, but you should always verify the scanned content before opening links. Avoid scanning QR codes from untrusted or suspicious sources.',
  },
  {
    question: 'Do scanned QR codes get stored anywhere?',
    answer:
      'No. Scanned QR code data is processed locally in your browser and is not stored or tracked. Your privacy is fully respected.',
  },
  {
    question: 'Can I use QR codes for offline sharing?',
    answer:
      'Yes. QR codes are ideal for offline sharing. You can print them on paper, posters, or packaging, allowing users to scan and access information without manually typing links.',
  },
  {
    question: 'When should I use a QR code instead of text or URL sharing?',
    answer:
      'QR codes are best when you want fast access on mobile devices, offline sharing, or clean presentation. For longer content, consider using <a href="/text/">Online Text Transfer</a> or a <a href="/url/">URL Shortener</a> and then generate a QR code for that link.',
  },
];
