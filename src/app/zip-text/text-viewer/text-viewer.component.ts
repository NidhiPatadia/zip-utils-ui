import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../services/common/common.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '../../services/header/header.service';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '../../enums/common';
import { ShareCardComponent } from '../../shared/components/share-card/share-card.component';
import { PinModalComponent } from '../../shared/components/pin-modal/pin-modal.component';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-text-viewer',
  standalone: true,
  imports: [CommonModule, ShareCardComponent, PinModalComponent, DeleteModalComponent],
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
  showDeleteModal: boolean = false;
  hasPin: boolean = false;
  showPinModal: boolean = false;
  enteredPin: string = '';
  pinError: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const tempText = this.commonService.getTempText();
    const isOneTimeView = this.commonService.getTempIsOneTimeView();
    const hasPin = this.commonService.getTempHasPin();
    const fromBackend = this.commonService.getIsFromBackend();

    this.isOneTimeView = isOneTimeView;
    this.hasPin = hasPin;
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
          let hasPin = false;

          if (result && typeof result === 'object') {
            textValue = result.text || '';
            isOneTime = result.isOneTimeView || false;
            hasPin = result.hasPin || false;
          }

          if (hasPin && !textValue) {
            this.hasPin = true;
            this.showPinModal = true;
            this.setupUrl();
            return;
          }

          this.text = textValue;
          this.isOneTimeView = isOneTime;
          this.isCreator = false;
          this.setupUrl();
        },
        error: (err) => {
          console.error('Full error:', err);
          let errorMsg = '';
          
          if (err?.graphQLErrors?.length) {
            errorMsg = err.graphQLErrors[0].message;
          } else if (err?.message) {
            errorMsg = err.message;
          }
          
          console.error('Error message:', errorMsg);
          
          if (errorMsg.includes('PIN')) {
            this.hasPin = true;
            this.showPinModal = true;
            this.setupUrl();
            return;
          }
          
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

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.commonService.deleteZipText(this.id!).subscribe({
      next: () => {
        this.showDeleteModal = false;
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('textDeleted', 'true');
        }
        this.router.navigate(['/text']);
      },
      error: (err) => {
        console.error('Error deleting text', err);
        this.showDeleteModal = false;
        this.router.navigate(['/text']);
      },
    });
  }

  onPinModalClose() {
    this.showPinModal = false;
    this.router.navigate(['/text']);
  }

  onPinSubmit(pin: string) {
    if (!pin.trim()) {
      this.pinError = 'Please enter a PIN';
      return;
    }
    
    this.pinError = '';
    this.commonService.getZipText(this.id!, pin).subscribe({
      next: (response: any) => {
        const result = response.data?.getZipText;
        if (result && result.text !== undefined) {
          this.showPinModal = false;
          this.text = result.text;
          this.isOneTimeView = result.isOneTimeView || false;
          this.isCreator = false;
        }
      },
      error: (err) => {
        console.error('Error verifying PIN', err);
        this.pinError = 'Invalid PIN';
      },
    });
  }
}
