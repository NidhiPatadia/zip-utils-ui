import { Component, Input, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-share-card',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
  templateUrl: './share-card.component.html',
  styleUrls: ['./share-card.component.css'],
})
export class ShareCardComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly commonService = inject(CommonService);

  @Input() url = '';

  copied = false;
  showSnackbar = false;

  copyUrl(): void {
    if (isPlatformBrowser(this.platformId) && this.url) {
      navigator.clipboard.writeText(this.url);
      this.copied = true;
      this.showSnackbar = true;

      setTimeout(() => {
        this.copied = false;
        this.showSnackbar = false;
      }, 1800);
    }
  }

  downloadQr(): void {
    this.commonService.downloadQr('app-share-card canvas', 'qrcode');
  }
}
