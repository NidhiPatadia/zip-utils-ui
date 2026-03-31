import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../../enums/common';
import { ShareCardComponent } from '../../shared/components/share-card/share-card.component';

@Component({
  selector: 'app-text-viewer',
  standalone: true,
  imports: [CommonModule, ShareCardComponent],
  templateUrl: './text-viewer.component.html',
  styleUrl: './text-viewer.component.css',
})
export class ZipTextViewerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly headerService = inject(HeaderService);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);

  id: string | null = null;
  text: string = '';
  currentUrl: string = '';
  textCopied = false;
  backButtonText: string = '';
  isOneTimeView: boolean = false;
  isCreator: boolean = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const tempText = this.commonService.getTempText();
    const isOneTimeView = this.commonService.getTempIsOneTimeView();
    const fromBackend = this.commonService.getIsFromBackend();

    this.isOneTimeView = isOneTimeView;
    this.isCreator = !fromBackend;

    this.headerService.setTitleAndDescription({
      pageTitle: PAGE_TITLE.ZIP_TEXT,
      pageDescription: PAGE_DESCRIPTION.ZIP_TEXT,
    });

    if (tempText) {
      this.text = tempText;
      this.commonService.clearTempText();
      this.backButtonText = 'Back';
      this.setupUrl();
      return;
    }

    if (this.id) {
      this.backButtonText = 'Add New Text';
      this.commonService.getZipText(this.id).subscribe({
        next: (response: any) => {
          const result = response.data?.getZipText;
          let textValue = '';
          let isOneTime = false;
          
          if (typeof result === 'string') {
            textValue = result;
          } else if (result && result.text !== undefined) {
            textValue = result.text;
            isOneTime = result.isOneTimeView || false;
          }
          
          this.text = textValue;
          this.isOneTimeView = isOneTime;
          this.isCreator = false;
          this.setupUrl();
        },
        error: (err) => {
          console.error('Error fetching text', err);
          this.router.navigate(['/404']);
        },
      });
    }
  }

  setupUrl() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUrl = `${window.location.origin}/t/${this.id}`;
    } else {
      this.currentUrl = `/t/${this.id}`;
    }
  }

  copyText() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.text);
      this.textCopied = true;

      setTimeout(() => {
        this.textCopied = false;
      }, 2000);
    }
  }

  goBack() {
    this.router.navigate(['/text']);
  }
}
