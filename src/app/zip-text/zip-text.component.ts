import { Component, inject, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild(CustomLinkComponent) customLinkComponent!: CustomLinkComponent;
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
  checkingSlug = false;

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: COMPONENT_TITLE.ZIP_TEXT,
      pageDescription: COMPONENT_DESCRIPTION.ZIP_TEXT,
      tabTitle: TAB_TITLE.ZIP_TEXT,
    });
    this.seoSchemaService.setFaqSchema(this.faqItems);
  }

  async generateLink(botGuard: any) {
    const guardResult = botGuard.validate();
    if (!guardResult.valid) {
      console.warn('Blocked by bot guard:', guardResult.reason);
      return;
    }
    if (!this.textInput.trim()) return;

    // If slug exists but hasn't been checked yet, check it first (silent = no availability message flash)
    if (
      this.customSlug &&
      this.isSlugAvailable === null &&
      !this.checkingSlug
    ) {
      this.customLinkComponent.suppressAvailabilityUi = true; // hide "Available" from blur-triggered check
      this.checkingSlug = true;
      const availability =
        await this.customLinkComponent.checkAvailability(true);
      this.checkingSlug = false;

      // After check completes, block if not available
      if (availability === false) {
        this.customLinkComponent.suppressAvailabilityUi = false;
        return;
      }
      // Re-enable availability UI after a short delay (blur response may still be in flight)
      setTimeout(
        () => (this.customLinkComponent.suppressAvailabilityUi = false),
        800,
      );
    }
    if (this.customSlug && this.isSlugAvailable === false) {
      return;
    }

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
        error: (err) => {
          const msg =
            err?.graphQLErrors?.[0]?.message || 'Unable to generate link';
          alert(msg);
        },
        complete: () => {
          this.loading = false; // ✅ ALWAYS runs
        },
      });
  }

  onSlugAvailabilityChange(value: boolean | null): void {
    this.isSlugAvailable = value;
  }

  onSlugChange(slug: string | null): void {
    // Only reset availability if slug actually changed
    // This prevents resetting when blur validation completes and emits the same slug
    const slugChanged = slug !== this.customSlug;
    this.customSlug = slug;

    if (slugChanged) {
      // Reset availability when slug changes (user typed something new)
      this.isSlugAvailable = null;
    }
    // If slug didn't change, keep current availability status (don't reset)
  }
}
