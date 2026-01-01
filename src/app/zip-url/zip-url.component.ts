import { Component, inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../services/header/header.service';
import {
  TAB_TITLE,
  COMPONENT_TITLE,
  COMPONENT_DESCRIPTION,
} from '../enums/common';
import { CommonService } from '../services/common/common.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { environment } from '../../environments/environment';
import { CopyUrlBoxComponent } from '../copy-url-box/copy-url-box.component';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';
import { BotGuardComponent } from '../bot-guard/bot-guard.component';
import { ZIP_URL_FAQ } from '../content/text-faq.content';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-zip-url',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CopyUrlBoxComponent,
    LoaderOverlayComponent,
    BotGuardComponent,
    FaqComponent,
  ],
  templateUrl: './zip-url.component.html',
  styleUrl: './zip-url.component.css',
})
export class ZipUrlComponent implements OnInit {
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  readonly urlForm: FormGroup;

  loading = false;
  id: string | null = null;
  faqItems = ZIP_URL_FAQ;
  shortUrl = '';

  constructor(private fb: FormBuilder) {
    const URL_REGEX =
      /^(?:(?:https?:\/\/)?(?:localhost|(?:\d{1,3}\.){3}\d{1,3}|(?:[A-Za-z0-9-]+\.)+[A-Za-z]{1,}))(?::\d{1,5})?(?:[\/?#][^\s]*)?$/i;

    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern(URL_REGEX)]],
    });
  }

  ngOnInit(): void {
    this.headerService.setTitleAndDescription({
      pageTitle: COMPONENT_TITLE.ZIP_URL,
      pageDescription: COMPONENT_DESCRIPTION.ZIP_URL,
      tabTitle: TAB_TITLE.ZIP_URL,
    });
  }

  onSubmit(botGuard: any) {
    const guardResult = botGuard.validate();
    if (!guardResult.valid) {
      console.warn('Blocked by bot guard:', guardResult.reason);
      return;
    }
    if (this.urlForm.valid) {
      const url = this.urlForm.value.url;
      console.log('URL to shorten:', url);
      this.generateShortUrl(url);
    }
  }

  generateShortUrl(url: string) {
    this.loading = true;
    this.commonService
      .generateZipShortUrl(url)
      .pipe(
        finalize(() =>
          setTimeout(() => {
            this.loading = false;
          }, 300),
        ),
      )
      .subscribe({
        next: (response) => {
          const shortUrl = response?.data?.generateUrl;
          if (!shortUrl) {
            throw new Error();
          }
          this.shortUrl = `${environment.angularUrl}/u/${shortUrl}`;
          this.urlForm.reset();
        },
        error: (err) => {
          const errMsg = `Error generating link, ${err}`;
          console.error(errMsg);
          alert(errMsg);
        },
      });
  }
}
