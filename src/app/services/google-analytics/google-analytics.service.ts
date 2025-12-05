import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  private measurementId = environment.gaMeasurementId;
  private initialized = false;

  init(): void {
    if (!environment.production || !this.measurementId || this.initialized) {
      return;
    }

    this.initialized = true;

    // Load GA script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    document.head.appendChild(script);

    // Setup dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag('js', new Date());

    // Disable auto page_view → SPA mode
    window.gtag('config', this.measurementId, {
      send_page_view: false,
    });
  }

  trackPageView(url: string): void {
    if (!environment.production || !this.measurementId || !this.initialized) {
      return;
    }

    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}
