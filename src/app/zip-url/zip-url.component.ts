import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderService } from '../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../enums/common';
import { CommonService } from '../services/common/common.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CopyUrlBoxComponent } from '../copy-url-box/copy-url-box.component';
import { LoaderOverlayComponent } from '../loader-overlay/loader-overlay.component';

@Component({
  selector: 'app-zip-url',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CopyUrlBoxComponent,
    LoaderOverlayComponent,
  ],
  templateUrl: './zip-url.component.html',
  styleUrl: './zip-url.component.css',
})
export class ZipUrlComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  readonly urlForm: FormGroup;

  loading = false;
  id: string | null = null;
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
      pageTitle: PAGE_TITLE.ZIP_URL,
      pageDescription: PAGE_DESCRIPTION.ZIP_URL,
    });
  }

  onSubmit() {
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
