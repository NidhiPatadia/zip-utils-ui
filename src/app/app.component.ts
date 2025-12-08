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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly commonService = inject(CommonService);
  showNotFoundPage = false;
  showLoaderOverlay = true;

  constructor(private router: Router) {
    this.changeScreenToShowLoader();

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event) => {
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
    this.commonService.getZipText(id).subscribe({
      next: (response: any) => {
        const text = response.data?.getZipText || '';
        this.commonService.setTempText(text);
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
    this.commonService.getZipShortUrl(id).subscribe({
      next: (response) => {
        let shortUrl = response?.data?.getUrl;
        if (isPlatformBrowser(this.platformId)) {
          shortUrl = shortUrl.trim();
          // If user forgot protocol, assume protocol to be https://
          if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(shortUrl)) {
            shortUrl = 'https://' + shortUrl;
          }
          window.location.assign(shortUrl);
        }
      },
      error: (err) => {
        console.error('Error fetching URL', err);
        this.changeScreenToShowNotFoundPage();
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
