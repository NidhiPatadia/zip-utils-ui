import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { GraphQL } from '../../graphql/zip-utils.graphql';
import { GraphQLRedirectionType } from '../../enums/common';
import {
  IHealthCheckResponse,
  IGenerateZipTextUrlResponse,
  IGetZipTextUrlResponse,
  IGetZipShortUrlResponse,
  IGenerateZipShortUrlResponse,
  ICheckShortIdAvailabilityResponse,
} from '../../models/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly apollo = inject(Apollo);
  private readonly platformId = inject(PLATFORM_ID);
  private tempText: string = '';
  private tempIsOneTimeView: boolean = false;
  private isFromBackend: boolean = false;

  setTempText(text: string) {
    this.tempText = text;
  }

  getTempText(): string {
    return this.tempText;
  }

  setTempIsOneTimeView(isOneTimeView: boolean) {
    this.tempIsOneTimeView = isOneTimeView;
  }

  getTempIsOneTimeView(): boolean {
    return this.tempIsOneTimeView;
  }

  setIsFromBackend(value: boolean) {
    this.isFromBackend = value;
  }

  getIsFromBackend(): boolean {
    return this.isFromBackend;
  }

  clearTempText() {
    this.tempText = '';
    this.tempIsOneTimeView = false;
    this.isFromBackend = false;
  }

  healthCheck() {
    return this.apollo.query<IHealthCheckResponse>({
      query: GraphQL.HealthCheck,
      fetchPolicy: 'no-cache',
    });
  }

  getZipText(id: String) {
    return this.apollo.query<IGetZipTextUrlResponse>({
      query: GraphQL.getZipText,
      variables: { url: id },
      fetchPolicy: 'no-cache',
    });
  }

  generateZipTextUrl(
    text: string,
    expiryInMinutes: number | null,
    customSlug?: string | null,
    isIpRestricted?: boolean,
    isOneTimeView?: boolean,
  ) {
    const MUTATION = GraphQL.generateZipTextUrl;

    return this.apollo.mutate<IGenerateZipTextUrlResponse>({
      mutation: MUTATION,
      variables: {
        text,
        expiryInMinutes,
        customSlug,
        isIpRestricted,
        isOneTimeView,
      },
    });
  }

  generateZipShortUrl(
    url: string,
    expiryInMinutes: number | null,
    customSlug?: string | null,
  ) {
    return this.apollo.mutate<IGenerateZipShortUrlResponse>({
      mutation: GraphQL.generateZipShortUrl,
      variables: { url, expiryInMinutes, customSlug },
    });
  }

  getZipShortUrl(id: String) {
    return this.apollo.query<IGetZipShortUrlResponse>({
      query: GraphQL.getZipShortUrl,
      variables: { url: id },
      fetchPolicy: 'no-cache',
    });
  }

  /**
   * 🔍 Check if custom short ID is available
   */
  checkShortIdAvailability(id: string, type: GraphQLRedirectionType) {
    return this.apollo.query<ICheckShortIdAvailabilityResponse>({
      query: GraphQL.isShortIdAvailable,
      variables: { id, type },
      fetchPolicy: 'no-cache',
    });
  }

  downloadQr(canvasSelector: string, filename: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${filename}.png`;
    link.click();
  }
}
