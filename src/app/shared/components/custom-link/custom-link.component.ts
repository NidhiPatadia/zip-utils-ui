import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

import { CommonService } from '../../../services/common/common.service';
import { RedirectionType, GraphQLRedirectionType } from '../../../enums/common';

@Component({
  selector: 'app-custom-link',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.css'],
})
export class CustomLinkComponent {
  customLink = '';

  readonly angularUrl = environment.angularUrl;
  private readonly allowedPattern = /^[A-Za-z][A-Za-z0-9-]*$/;
  @Output() availabilityChange = new EventEmitter<boolean | null>();
  @Output() slugChange = new EventEmitter<string | null>();

  // routing enum value: 't' | 'u'
  prefixPath: RedirectionType | '' = '';

  available: boolean | null = null;
  checking = false;

  /** When true, do not update availability UI (e.g. Generate was clicked, suppress blur result) */
  suppressAvailabilityUi = false;

  private readonly router = inject(Router);
  private readonly commonService = inject(CommonService);

  ngOnInit(): void {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/text')) {
      this.prefixPath = RedirectionType.TEXT;
    } else if (currentUrl.includes('/url')) {
      this.prefixPath = RedirectionType.URL;
    }
  }

  onBlur(): void {
    this.performAvailabilityCheck(false);
  }

  /** @param silent When true, don't update UI or emit (e.g. when triggered by Generate button) */
  checkAvailability(silent = false): Promise<boolean | null> {
    return this.performAvailabilityCheck(silent);
  }

  private performAvailabilityCheck(silent: boolean): Promise<boolean | null> {
    return new Promise((resolve) => {
      const value = this.customLink;

      // empty → neutral
      if (!value) {
        if (!silent) {
          this.available = null;
          this.availabilityChange.emit(null);
          this.slugChange.emit(null);
        }
        resolve(null);
        return;
      }

      // invalid characters OR starts with number / '-'
      if (!this.allowedPattern.test(value)) {
        if (!silent) {
          this.available = false;
          this.availabilityChange.emit(false);
          this.slugChange.emit(null);
        }
        resolve(false);
        return;
      }

      // length validation
      if (value.length < 2 || value.length > 50) {
        if (!silent) {
          this.available = false;
          this.availabilityChange.emit(false);
          this.slugChange.emit(null);
        }
        resolve(false);
        return;
      }

      // no consecutive dashes
      if (value.includes('--')) {
        if (!silent) {
          this.available = false;
          this.availabilityChange.emit(false);
          this.slugChange.emit(null);
        }
        resolve(false);
        return;
      }

      // < 2 chars → invalid
      if (value.length < 2) {
        if (!silent) {
          this.available = false;
          this.availabilityChange.emit(false);
          this.slugChange.emit(null);
        }
        resolve(false);
        return;
      }

      if (!silent) {
        this.checking = true;
      }

      this.commonService
        .checkShortIdAvailability(value, this.mapToGraphQLType())
        .subscribe({
          next: (res) => {
            const result = res.data.isShortIdAvailable;
            const shouldUpdateUi = !silent && !this.suppressAvailabilityUi;
            if (shouldUpdateUi) {
              this.available = result;
              this.checking = false;
              this.availabilityChange.emit(this.available);
              this.slugChange.emit(value);
            } else if (!silent) {
              this.checking = false;
            }
            resolve(result);
          },
          error: () => {
            const shouldUpdateUi = !silent && !this.suppressAvailabilityUi;
            if (shouldUpdateUi) {
              this.available = null;
              this.checking = false;
              this.availabilityChange.emit(null);
            } else if (!silent) {
              this.checking = false;
            }
            resolve(null);
          },
        });
    });
  }

  private mapToGraphQLType(): GraphQLRedirectionType {
    switch (this.prefixPath) {
      case RedirectionType.TEXT:
        return GraphQLRedirectionType.TEXT;

      case RedirectionType.URL:
        return GraphQLRedirectionType.URL;

      default:
        throw new Error('Invalid redirection type');
    }
  }
}
