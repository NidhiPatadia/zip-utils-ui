import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-text-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-viewer.component.html',
  styleUrl: './text-viewer.component.css',
})
export class ZipTextViewerComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly commonService = inject(CommonService);
  private readonly router = inject(Router);

  id: string | null = null;
  text: string = '';
  currentUrl: string = '';
  copied = false;
  textCopied = false;
  showSnackbar = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const tempText = this.commonService.getTempText();

    if (tempText) {
      this.text = tempText;
      this.commonService.clearTempText();
    } else if (this.id) {
      this.commonService.getZipText(this.id).subscribe({
        next: (response: any) => {
          this.text = response.data?.getZipText || '';
        },
        error: (err) => {
          console.error('Error fetching text', err);
          this.router.navigate(['/404']);
        },
      });
    }

    if (isPlatformBrowser(this.platformId)) {
      this.currentUrl = `${window.location.origin}/t/${this.id}`;
    } else {
      this.currentUrl = `/t/${this.id}`;
    }
  }

  copyUrl() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.currentUrl);
      this.copied = true;
      this.showSnackbar = true;

      setTimeout(() => {
        this.copied = false;
        this.showSnackbar = false;
      }, 2000);
    }
  }

  copyText() {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(this.text);
      this.textCopied = true;
      this.showSnackbar = true;

      setTimeout(() => {
        this.textCopied = false;
        this.showSnackbar = false;
      }, 2000);
    }
  }
}
