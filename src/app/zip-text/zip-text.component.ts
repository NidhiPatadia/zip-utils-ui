import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { FormsModule } from '@angular/forms';
import { HeaderService } from '../services/header/header.service';
import {
  TAB_TITLE,
  COMPONENT_TITLE,
  COMPONENT_DESCRIPTION,
} from '../enums/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';
import { BotGuardComponent } from '../bot-guard/bot-guard.component';
import { ZIP_TEXT_FAQ } from '../content/text-faq.content';
import { FaqComponent } from '../faq/faq.component';
import { SeoSchemaService } from '../services/seo/seo-schema.service';
import { CustomLinkComponent } from '../shared/components/custom-link/custom-link.component';

@Component({
  selector: 'app-zip-text',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoaderOverlayComponent,
    BotGuardComponent,
    FaqComponent,
    CustomLinkComponent,
  ],
  templateUrl: './zip-text.component.html',
  styleUrl: './zip-text.component.css',
})
export class ZipTextComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);
  private readonly seoSchemaService = inject(SeoSchemaService);
  readonly expiryTimes = [
    { text: '10 min', value: 10 },
    { text: '30 min', value: 30 },
    { text: '1 hour', value: 60 },
    { text: '6 hours', value: 360 },
    { text: '1 day', value: 1440 },
    { text: 'No Expiry', value: null },
  ];

  textInput = '';
  expiryInMinutes = 10;
  loading = false;
  faqItems = ZIP_TEXT_FAQ;
  isSlugAvailable: boolean | null = null;
  customSlug: string | null = null;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: COMPONENT_TITLE.ZIP_TEXT,
      pageDescription: COMPONENT_DESCRIPTION.ZIP_TEXT,
      tabTitle: TAB_TITLE.ZIP_TEXT,
    });
    this.seoSchemaService.setFaqSchema(this.faqItems);
  }

  generateLink(botGuard: any) {
    const guardResult = botGuard.validate();
    if (!guardResult.valid) {
      console.warn('Blocked by bot guard:', guardResult.reason);
      return;
    }
    if (!this.textInput.trim()) return;

    this.loading = true;
    this.commonService.setTempText(this.textInput);
    const expiry = this.expiryInMinutes
      ? parseInt(this.expiryInMinutes.toString(), 10)
      : null;
    this.commonService
      .generateZipTextUrl(this.textInput, expiry, this.customSlug)
      .subscribe({
        next: (response) => {
          const id = response.data?.generateZipTextUrl;
          if (id) {
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/t', id]);
            }, 300);
          } else {
            this.loading = false;
          }
        },
        error: (err) => console.error('Error generating link', err),
      });
  }

  onSlugAvailabilityChange(value: boolean | null): void {
    this.isSlugAvailable = value;
  }

  onSlugChange(slug: string | null): void {
    this.customSlug = slug;
  }
}
