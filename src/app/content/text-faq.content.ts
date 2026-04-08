import { FaqItem } from '../models/faq.model';

export const ZIP_TEXT_FAQ: FaqItem[] = [
  {
    question: 'How do I upload text online and share it?',
    answer:
      'Paste your text into the text uploader, choose an expiry time, and generate a secure link. You can instantly share this link with others to access your text online.',
  },
  {
    question: 'What is text transfer online?',
    answer:
      'Text transfer online is a way to send text using a shareable link. Instead of copying and pasting messages, you can upload text and share it securely with a single URL.',
  },
  {
    question: 'Is it safe to upload text online and share it?',
    answer:
      'Yes, it is safe to upload text online when using features like PIN protection, expiry time, and one-time access. These ensure your text remains private and is not accessible indefinitely.',
  },
  {
    question: 'Can I create a temporary text link?',
    answer:
      'Yes, you can create a temporary text link by selecting an expiry time such as 10 minutes, 1 hour, or 1 day. After the selected time, the text is automatically deleted.',
  },
  {
    question: 'What is a one-time text link?',
    answer:
      'A one-time text link allows your text to be viewed only once. After the recipient opens the link, the content is permanently deleted and cannot be accessed again.',
  },
  {
    question: 'Can I protect my text with a PIN?',
    answer:
      'Yes, you can add PIN protection to your text. The recipient must enter the correct PIN before they can view the content, adding an extra layer of security.',
  },
  {
    question: 'How can I send long text online?',
    answer:
      'You can send long text online by pasting it into the text uploader and generating a shareable link. This is useful for sharing notes, instructions, or code snippets.',
  },
  {
    question: 'Do I need an account to upload text online?',
    answer:
      'No, you can upload and share text online without creating an account. The process is quick, anonymous, and does not require login.',
  },
  {
    question: 'What happens when the text link expires?',
    answer:
      'When the text link expires, the content is permanently deleted from the server and cannot be accessed again. This helps keep your shared text secure.',
  },
  {
    question: 'Can I delete a text link after creating it?',
    answer:
      'Yes, you can delete a text link at any time. Once deleted, the link becomes invalid and the text is permanently removed.',
  },
];

export const ZIP_URL_FAQ: FaqItem[] = [
  {
    question: 'What is a URL shortener?',
    answer:
      'A URL shortener converts long web links into short, easy-to-share URLs. Short links are cleaner, easier to remember, and ideal for sharing on social media, messages, and emails.',
  },
  {
    question: 'How do I shorten a URL online?',
    answer:
      'Paste your long URL into the URL shortener and click generate. The tool will instantly create a short link that redirects users to the original page.',
  },
  {
    question: 'Is there a free URL shortener?',
    answer:
      'Yes, you can use ZipUtils as a free URL shortener to create short links instantly without any registration.',
  },
  {
    question: 'Can I create a custom short link?',
    answer:
      'Yes, you can create a custom short link instead of a random one, as long as the custom name is available.',
  },
  {
    question: 'Are shortened URLs safe?',
    answer:
      'Yes, shortened URLs are safe when created from trusted sources. They simply redirect users to the original destination link.',
  },
  {
    question: 'Can I shorten any type of URL?',
    answer:
      'You can shorten most valid URLs including websites, blog posts, product pages, and social media links.',
  },
  {
    question: 'Do shortened links expire?',
    answer:
      'Shortened links do not expire by default and remain accessible unless configured otherwise.',
  },
  {
    question: 'Why should I use a URL shortener?',
    answer:
      'A URL shortener makes links easier to share, improves readability, and is especially useful for social media, messaging, and tracking links.',
  },
  {
    question: 'Can I share shortened URLs on social media?',
    answer:
      'Yes, short URLs are ideal for sharing on social media platforms, emails, and messaging apps because they are concise and user-friendly.',
  },
  {
    question: 'Can I generate a QR code for a shortened URL?',
    answer:
      'Yes, after creating a short link, you can generate and download a QR code to easily share it using mobile devices.',
  },
];

export const ZIP_QR_FAQ: FaqItem[] = [
  {
    question: 'What is a QR code generator and how does it work?',
    answer:
      'A QR code generator allows you to create a scannable QR code from text, URLs, or small data. Users can scan the QR code using a mobile camera to instantly access the embedded information.',
  },
  {
    question: 'How can I generate a QR code online?',
    answer:
      'Enter your text or URL into the QR code generator and click generate. The tool will instantly create a QR code that you can download or share.',
  },
  {
    question: 'Is there a free QR code generator?',
    answer:
      'Yes, you can use ZipUtils as a free QR code generator to create QR codes instantly without any registration.',
  },
  {
    question: 'What type of content can I create a QR code for?',
    answer:
      'You can generate QR codes for website URLs, plain text, short messages, and other lightweight data. QR codes work best for compact content.',
  },
  {
    question: 'Is there a limit on how much data a QR code can store?',
    answer:
      'Yes, QR codes have size limits. It is recommended to keep content under 1–2 KB. For larger content, use a link instead of embedding full text.',
  },
  {
    question: 'Can I download the generated QR code?',
    answer:
      'Yes, after generating your QR code, you can download it as an image and use it in documents, posters, or digital platforms.',
  },
  {
    question: 'Can I edit a QR code after creating it?',
    answer:
      'No, once a QR code is generated, its content cannot be changed. You will need to create a new QR code if you want to update the data.',
  },
  {
    question: 'Is scanning QR codes safe?',
    answer:
      'Scanning QR codes is generally safe, but you should verify the content before opening links, especially from unknown sources.',
  },
  {
    question: 'Can I use QR codes for offline sharing?',
    answer:
      'Yes, QR codes are perfect for offline sharing. You can print them on posters, packaging, or documents for easy access.',
  },
  {
    question: 'When should I use a QR code instead of a link?',
    answer:
      'QR codes are ideal for quick mobile access and offline sharing. For longer content, you can create a link using a text sharing or URL shortener tool and then generate a QR code for it.',
  },
];
