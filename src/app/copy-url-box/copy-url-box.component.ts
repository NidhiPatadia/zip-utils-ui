import { Component, Input, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-copy-url-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy-url-box.component.html',
  styleUrls: ['./copy-url-box.component.css'],
})
export class CopyUrlBoxComponent {
  private readonly platformId = inject(PLATFORM_ID);

  @Input() shortUrl = '';

  copied = false;
  showSnackbar = false;

  copyUrl(): void {
    if (isPlatformBrowser(this.platformId) && this.shortUrl) {
      navigator.clipboard.writeText(this.shortUrl);
      this.copied = true;
      this.showSnackbar = true;

      setTimeout(() => {
        this.copied = false;
        this.showSnackbar = false;
      }, 2000);
    }
  }
}
