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
];
