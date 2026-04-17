import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { filter } from 'rxjs/operators';
import { LoaderOverlayComponent } from './loader-overlay/loader-overlay.component';
import { RedirectionType } from './enums/common';
import { CommonService } from './services/common/common.service';
import { HeaderService } from './services/header/header.service';
import { PinModalComponent } from './shared/components/pin-modal/pin-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    CommonModule,
    LoaderOverlayComponent,
    PinModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly commonService = inject(CommonService);
  private readonly headerService = inject(HeaderService);
  showNotFoundPage = false;
  showLoaderOverlay = true;
  showUrlPinModal = false;
  showRedirectLoader = false;
  urlPinError = '';
  private currentUrlId: string | null = null;
  private enteredPin = '';

  constructor(private router: Router) {
    this.changeScreenToShowLoader();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        const canonicalPath = e.urlAfterRedirects.split('?')[0];
        this.headerService.setCanonical(canonicalPath);
        const currentRoute = this.router.routerState.snapshot.root.firstChild;
        const path = currentRoute?.routeConfig?.path;
        if (path === '**') {
          this.changeScreenToShowNotFoundPage();
        } else {
          const id = currentRoute?.params['id'];
          if (path?.startsWith(`${RedirectionType.TEXT}/`)) {
            this.handleTextViewerRedirection(id);
          } else if (path?.startsWith(`${RedirectionType.URL}/`)) {
            this.handleUrlShortnerRedirection(id);
          } else {
            this.changeScreenToShowApp();
          }
        }
      });
  }

  // handle redirection for text-viewer
  private handleTextViewerRedirection(id: string) {
    if (!id) {
      this.changeScreenToShowNotFoundPage();
      return;
    }

    // If temp text is already set (from zip-text component), skip API call
    const tempText = this.commonService.getTempText();
    if (tempText) {
      // Temp text exists, just show the app (text-viewer component will use it)
      this.changeScreenToShowApp();
      return;
    }

    // No temp text, fetch from API (user navigated directly to /t/:id)
    this.commonService.getZipText(id).subscribe({
      next: (response: any) => {
        const result = response.data?.getZipText;
        let text = '';
        let isOneTimeView = false;
        let hasPin = false;
        let isIpRestricted = false;
        let expiryTime = null;

        if (typeof result === 'string') {
          text = result;
        } else if (result && result.text !== undefined) {
          text = result.text;
          isOneTimeView = result.isOneTimeView || false;
          hasPin = result.hasPin || false;
          isIpRestricted = result.isIpRestricted || false;
          expiryTime = result.expiryTime || null;
        }

        this.commonService.setTempText(text);
        this.commonService.setTempIsOneTimeView(isOneTimeView);
        this.commonService.setTempHasPin(hasPin);
        this.commonService.setTempIsIpRestricted(isIpRestricted);
        this.commonService.setTempExpiryInMinutes(null);
        this.commonService.setTempExpiryTime(expiryTime);
        this.commonService.setIsFromBackend(true);
        setTimeout(() => this.changeScreenToShowApp(), 500);
        this.router.navigate(['/t', id]);
      },
      error: (err) => {
        console.error('Error fetching text', err);
        this.changeScreenToShowNotFoundPage();
      },
    });
  }

  // handle redirection for url-shortner
  private handleUrlShortnerRedirection(id: string) {
    if (!id) {
      this.changeScreenToShowNotFoundPage();
      return;
    }

    this.currentUrlId = id;
    this.commonService.setIsUrlRedirect(true);
    this.commonService.getZipShortUrl(id).subscribe({
      next: (response) => {
        const result = response?.data?.getUrl;
        if (!result) {
          this.changeScreenToShowNotFoundPage();
          return;
        }

        if (result.hasPin && !this.enteredPin) {
          this.showUrlPinModal = true;
          this.changeScreenToShowApp();
          return;
        }

        if (result.url) {
          this.redirectToUrl(result.url);
        } else {
          this.changeScreenToShowNotFoundPage();
        }
      },
      error: () => {
        this.changeScreenToShowNotFoundPage();
      },
    });
  }

  private redirectToUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      url = url.trim();
      if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url)) {
        url = 'https://' + url;
      }
      window.location.href = url;
    }
  }

  onUrlPinSubmit(pin: string): void {
    this.enteredPin = pin;
    this.showUrlPinModal = false;
    this.redirectToUrlWithPin();
  }

  onUrlPinClose(): void {
    this.showUrlPinModal = false;
    this.currentUrlId = null;
    this.enteredPin = '';
  }

  private redirectToUrlWithPin(): void {
    if (!this.currentUrlId) return;

    this.showRedirectLoader = true;
    this.showUrlPinModal = false;

    this.commonService
      .getZipShortUrl(this.currentUrlId, this.enteredPin)
      .subscribe({
        next: (response) => {
          const result = response?.data?.getUrl;
          if (result?.url) {
            const url = result.url.trim();
            const finalUrl = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url)
              ? url
              : 'https://' + url;
            window.location.href = finalUrl;
          } else {
            this.changeScreenToShowNotFoundPage();
          }
        },
        error: (err) => {
          if (err?.graphQLErrors?.[0]?.message?.includes('Incorrect PIN')) {
            this.urlPinError = 'Incorrect PIN';
            this.showRedirectLoader = false;
            this.showUrlPinModal = true;
          } else {
            this.changeScreenToShowNotFoundPage();
          }
        },
      });
  }

  private changeScreenToShowLoader() {
    this.showNotFoundPage = false;
    this.showLoaderOverlay = true;
  }

  private changeScreenToShowNotFoundPage() {
    this.showNotFoundPage = true;
    this.showLoaderOverlay = false;
  }

  private changeScreenToShowApp() {
    this.showNotFoundPage = false;
    this.showLoaderOverlay = false;
  }
}
