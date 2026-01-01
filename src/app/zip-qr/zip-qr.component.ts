import { Component, inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';

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
  ],
  templateUrl: './zip-qr.component.html',
  styleUrl: './zip-qr.component.css',
})
export class ZipQrComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  loading = false;

  mode: Mode = 'generator';
  allowedFormats = [BarcodeFormat.QR_CODE];

  // Generator
  inputValue = '';
  generatedValue: string | null = null;

  // Scanner
  scannedResult: string | null = null;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: COMPONENT_TITLE.ZIP_QR,
      pageDescription: COMPONENT_DESCRIPTION.ZIP_QR,
      tabTitle: TAB_TITLE.ZIP_QR,
    });
  }

  generateQr() {
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
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `${TAB_TITLE.ZIP_QR}.png`;
    link.click();
  }

  shareQr() {
    if (!navigator.share) return;

    navigator.share({
      title: TAB_TITLE.ZIP_QR,
      text: this.generatedValue || '',
    });
  }

  onScanSuccess(result: string) {
    this.scannedResult = result;
  }
}
