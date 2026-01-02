import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  COMPONENT_DESCRIPTION,
  COMPONENT_TITLE,
  TAB_TITLE,
} from '../enums/common';
import { HeaderService } from '../services/header/header.service';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';
import { ZIP_QR_FAQ } from '../content/text-faq.content';
import { FaqComponent } from '../faq/faq.component';

type Mode = 'generator' | 'scanner';

@Component({
  selector: 'app-zip-qr',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    QRCodeModule,
    ZXingScannerModule,
    LoaderOverlayComponent,
    FaqComponent,
  ],
  templateUrl: './zip-qr.component.html',
  styleUrl: './zip-qr.component.css',
})
export class ZipQrComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly headerService = inject(HeaderService);
  faqItems = ZIP_QR_FAQ;
  loading = false;

  mode: Mode = 'generator';
  allowedFormats = [BarcodeFormat.QR_CODE];

  // Generator
  inputValue = '';
  generatedValue: string | null = null;

  // Scanner
  scannedResult: string | null = null;
  textCopied = false;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: COMPONENT_TITLE.ZIP_QR,
      pageDescription: COMPONENT_DESCRIPTION.ZIP_QR,
      tabTitle: TAB_TITLE.ZIP_QR,
    });
  }

  generateQr() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.loading = true;
    if (!this.inputValue.trim()) return;

    setTimeout(() => {
      this.generatedValue = this.inputValue.trim();
      this.loading = false;
    }, 300);
  }

  clearQr() {
    this.generatedValue = null;
  }

  downloadQr() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `${TAB_TITLE.ZIP_QR}.png`;
    link.click();
  }

  async shareQr() {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.querySelector('canvas');
    if (!canvas || !navigator.canShare) return;

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve),
    );

    if (!blob) return;

    const file = new File([blob], 'qr-code.png', { type: 'image/png' });

    if (!navigator.canShare({ files: [file] })) {
      alert('Sharing images is not supported on this device.');
      return;
    }

    await navigator.share({
      title: 'QR Code',
      files: [file],
    });
  }

  onScanSuccess(result: string) {
    this.scannedResult = result;
  }

  copyText() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.scannedResult) {
      navigator.clipboard.writeText(this.scannedResult as string);
      this.textCopied = true;

      setTimeout(() => {
        this.textCopied = false;
      }, 2000);
    }
  }
}
