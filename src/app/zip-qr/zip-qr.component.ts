import { Component, inject, OnInit } from '@angular/core';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { HeaderService } from '../services/header/header.service';
import { QRCodeModule } from 'angularx-qrcode';
import { ZIP_TEXT_FAQ } from '../content/text-faq.content';
import { FaqComponent } from '../faq/faq.component';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';
import { FormsModule } from '@angular/forms';
import { BotGuardComponent } from '../bot-guard/bot-guard.component';

@Component({
  selector: 'app-zip-qr',
  standalone: true,
  imports: [
    FormsModule,
    QRCodeModule,
    LoaderOverlayComponent,
    BotGuardComponent,
    FaqComponent,
  ],
  templateUrl: './zip-qr.component.html',
  styleUrl: './zip-qr.component.css',
})
export class ZipQrComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  value = 'google.com';
  textInput = '';
  loading = false;
  faqItems = ZIP_TEXT_FAQ;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_QR,
      pageDescription: PAGE_DESCRIPTION.ZIP_QR,
    });
  }

  generateLink(botGuard: any) {}
}
