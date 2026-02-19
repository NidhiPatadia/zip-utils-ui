import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeoSchemaService {
  private readonly FAQ_SCHEMA_ID = 'faq-schema';

  /**
   * Inject FAQPage schema into <head>
   */
  setFaqSchema(faqs: { question: string; answer: string }[] | undefined): void {
    if (!faqs || !faqs.length) return;

    // Remove existing FAQ schema (SPA safety)
    this.removeFaqSchema();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: this.stripHtml(faq.answer),
        },
      })),
    };

    const script = document.createElement('script');
    script.id = this.FAQ_SCHEMA_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    document.head.appendChild(script);
  }

  /**
   * Remove FAQ schema (on route change / destroy)
   */
  removeFaqSchema(): void {
    document.getElementById(this.FAQ_SCHEMA_ID)?.remove();
  }

  /**
   * Safety: schema text must be plain text
   */
  private stripHtml(value: string): string {
    return value.replace(/<[^>]*>/g, '').trim();
  }
}
