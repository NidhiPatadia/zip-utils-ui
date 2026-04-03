import { FaqItem } from '../models/faq.model';

export const ZIP_TEXT_FAQ: FaqItem[] = [
  {
    question: 'How does online text transfer work?',
    answer:
      'Paste your text, choose an expiry time, and generate a secure shareable link. Anyone with the link can access the text until it expires.',
  },
  {
    question: 'Is online text transfer secure?',
    answer:
      'Yes. ZipUtils encrypts uploaded text and automatically deletes it after the selected expiry time, ensuring that your shared text remains private.',
  },
  {
    question: 'How long does shared text stay available online?',
    answer:
      'Uploaded text is stored only until the expiry time you choose. After the expiry time is reached, the text is permanently deleted.',
  },
  {
    question: 'Who can access my uploaded text?',
    answer:
      'Only people with the generated private link can access your uploaded text. Once the link expires, the text can no longer be viewed.',
  },
  {
    question: 'Can I share text online without email or messaging apps?',
    answer:
      'Yes. ZipUtils allows you to paste text and generate a private link that can be shared directly without using email, WhatsApp, or other messaging apps.',
  },
  {
    question: 'Can I send long text online using this tool?',
    answer:
      'Yes. This tool allows you to upload long text, notes, instructions, or code snippets and share them easily using a single secure link.',
  },
  {
    question: 'What is a one-time text link?',
    answer:
      'A one-time text link can only be viewed once. After the recipient opens the link, the text is permanently deleted from the server and the link becomes invalid.',
  },
  {
    question: 'How does one-time view work?',
    answer:
      'When you create a one-time text link, the text is stored and can be accessed only once. As soon as someone opens the link, the text is deleted and cannot be retrieved again.',
  },
  {
    question: 'Can I recover text after it is deleted from a one-time link?',
    answer:
      'No. Once a one-time link is opened and the text is deleted, it cannot be recovered. The link becomes invalid and the text is permanently removed from the server.',
  },
  {
    question: 'When should I use one-time text links?',
    answer:
      'One-time text links are ideal for sharing sensitive information like passwords, OTPs, private keys, or any content that should only be viewed once for security reasons.',
  },
  {
    question: 'Can I create a temporary text link that expires automatically?',
    answer:
      'Yes. You can select an expiry time when generating the link. Once the expiry time passes, the text is automatically removed from the server.',
  },
  {
    question: 'Can I create a custom link for my shared text?',
    answer:
      'Yes. ZipUtils allows you to create a custom link for your uploaded text instead of a random one, as long as the custom name is available.',
  },
  {
    question: 'Is there a free text uploader online?',
    answer:
      'Yes. ZipUtils provides a free online text uploader that lets you paste text and instantly generate a secure shareable link.',
  },
  {
    question: 'How can I upload text and share it with a link?',
    answer:
      'Paste your text into the text uploader, choose the expiry time, and click generate link. A unique URL will be created that you can share with others.',
  },
  {
    question: 'Can I share links or create QR codes instead of sharing text?',
    answer:
      'Yes. If you want to share a website link, you can use the <a href="/url/">URL Shortener</a>. You can also generate a <a href="/qr/">QR Code</a> to easily share links or text using mobile devices.',
  },
  {
    question: 'How do I copy the generated text link?',
    answer:
      'After generating your text link, simply click the "Copy link" button. The link will be copied to your clipboard instantly, and you can share it anywhere.',
  },
  {
    question: 'Can I download a QR code for my shared text?',
    answer:
      'Yes. Once your text link is generated, you can click "Download QR" to get a QR code image. This QR code can be printed or shared to let others scan and access your text.',
  },
  {
    question: 'What is PIN protection for text links?',
    answer:
      'PIN protection adds an extra layer of security to your shared text. When enabled, the recipient must enter a PIN code to view the text content.',
  },
  {
    question: 'How does PIN protection work?',
    answer:
      'When you create a text link with PIN protection, the recipient will be prompted to enter a PIN before they can view the text. Without the correct PIN, the text remains hidden.',
  },
  {
    question: 'How do I share the PIN with the recipient?',
    answer:
      'You need to share the PIN separately with your recipient through a different channel (e.g., phone call, message, email). The link and PIN should not be sent together for better security.',
  },
  {
    question: 'Can I combine PIN protection with other features?',
    answer:
      'Yes. PIN protection can be combined with one-time view and IP restriction features for enhanced security. You can enable multiple protection options when creating a link.',
  },
  {
    question: 'Can I delete a text link after creating it?',
    answer:
      'Yes. As the creator of the text link, you can delete it at any time from the viewer page. Once deleted, the link becomes invalid and the text cannot be accessed.',
  },
  {
    question: 'What happens when I delete a text link?',
    answer:
      'When you delete a text link, the text is permanently removed from the server and the link becomes invalid. Neither you nor anyone else will be able to access it again.',
  },
  {
    question: 'Where can I find the delete option for my text link?',
    answer:
      'The delete option appears on the text viewer page immediately after you create the link. Look for the "Changed your mind?" section below the share card.',
  },
];

export const ZIP_URL_FAQ: FaqItem[] = [
  {
    question: 'What is a URL shortener?',
    answer:
      'A URL shortener converts long web links into short, easy-to-share URLs. Short links are cleaner, easier to remember, and ideal for sharing across social media, messages, and emails.',
  },
  {
    question: 'How do I shorten a URL?',
    answer:
      'Paste the long URL into the ZipUtils URL Shortener and click generate. The tool will create a short link that redirects users to the original destination.',
  },
  {
    question: 'Can I create a custom short link for my URL?',
    answer:
      'Yes. ZipUtils allows you to create a custom short link instead of a randomly generated one. Simply enter a custom link name if it is available.',
  },
  {
    question: 'Why should I use ZipUtils URL Shortener?',
    answer:
      'ZipUtils provides a fast and simple way to shorten URLs without unnecessary steps. Our link shortener focuses on speed, reliability, and ease of use.',
  },
  {
    question: 'Are shortened URLs safe to use?',
    answer:
      'Yes. Shortened URLs created using ZipUtils simply redirect users to the original destination. Always ensure the original link is trustworthy before sharing.',
  },
  {
    question: 'Can I shorten any type of URL?',
    answer:
      'You can shorten most valid URLs including website links, blog posts, product pages, and social media links.',
  },
  {
    question: 'Do shortened links expire?',
    answer:
      'Shortened links created with ZipUtils do not expire unless configured otherwise. They remain accessible as long as the service is active.',
  },
  {
    question: 'Is the URL shortener free to use?',
    answer:
      'Yes. ZipUtils URL Shortener is completely free and does not require account registration.',
  },
  {
    question: 'Can I share shortened URLs on social media?',
    answer:
      'Yes. Short URLs are ideal for sharing on social media platforms, messaging apps, and emails because they are shorter and easier to read.',
  },
  {
    question:
      'Can I share text or create QR codes instead of shortening a URL?',
    answer:
      'Yes. If you need to share notes or messages, you can use the <a href="/text/">Text Sharing</a> tool. You can also generate a <a href="/qr/">QR Code</a> to easily share links on mobile devices.',
  },
  {
    question: 'Can I restrict text sharing to the same Wi-Fi or network?',
    answer:
      'Yes. You can enable the same network restriction while generating the link. This ensures the text can only be accessed from the same Wi-Fi or internet connection where the link was created.',
  },
  {
    question: 'What happens if I open the link from a different network?',
    answer:
      'If the link is opened from a different network such as mobile data or another Wi-Fi, the text will not be accessible and will behave like an invalid or expired link.',
  },
  {
    question: 'How do I copy the shortened URL?',
    answer:
      'After shortening your URL, simply click the "Copy link" button. The shortened URL will be copied to your clipboard instantly, and you can share it anywhere.',
  },
  {
    question: 'Can I download a QR code for my shortened URL?',
    answer:
      'Yes. Once your URL is shortened, you can click "Download QR" to get a QR code image. This QR code can be printed or shared to let others scan and access your shortened link.',
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
