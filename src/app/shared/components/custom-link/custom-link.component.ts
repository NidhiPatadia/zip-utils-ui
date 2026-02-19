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
  styleUrls: ['./custom-link.component.scss'],
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
    const value = this.customLink;

    // empty → neutral
    if (!value) {
      this.available = null;
      this.availabilityChange.emit(null);
      this.slugChange.emit(null);
      return;
    }

    // invalid characters OR starts with number / '-'
    if (!this.allowedPattern.test(value)) {
      this.available = false;
      this.availabilityChange.emit(false);
      this.slugChange.emit(null);
      return;
    }

    // length validation
    if (value.length < 2 || value.length > 50) {
      this.available = false;
      this.availabilityChange.emit(false);
      this.slugChange.emit(null);
      return;
    }

    // no consecutive dashes
    if (value.includes('--')) {
      this.available = false;
      this.availabilityChange.emit(false);
      this.slugChange.emit(null);
      return;
    }

    // < 2 chars → invalid
    if (value.length < 2) {
      this.available = false;
      this.availabilityChange.emit(false);
      this.slugChange.emit(null);
      return;
    }

    this.checking = true;

    this.commonService
      .checkShortIdAvailability(value, this.mapToGraphQLType())
      .subscribe({
        next: (res) => {
          this.available = res.data.isShortIdAvailable;
          this.checking = false;
          this.availabilityChange.emit(this.available);
          this.slugChange.emit(value);
        },
        error: () => {
          this.available = null;
          this.checking = false;
          this.availabilityChange.emit(null);
        },
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
