import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../services/common/common.service';
import { FormsModule } from '@angular/forms';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';
import { BotGuardComponent } from '../bot-guard/bot-guard.component';

@Component({
  selector: 'app-zip-text',
  standalone: true,
  imports: [FormsModule, CommonModule, LoaderOverlayComponent, BotGuardComponent],
  templateUrl: './zip-text.component.html',
  styleUrl: './zip-text.component.css',
})
export class ZipTextComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);
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

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_TEXT,
      pageDescription: PAGE_DESCRIPTION.ZIP_TEXT,
    });
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
    this.commonService.generateZipTextUrl(this.textInput, expiry).subscribe({
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
}
