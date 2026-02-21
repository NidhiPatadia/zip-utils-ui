import { inject, Injectable } from '@angular/core';
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
  private tempText: string = '';

  constructor() {}

  healthCheck() {
    return this.apollo.query<IHealthCheckResponse>({
      query: GraphQL.HealthCheck,
      fetchPolicy: 'no-cache',
    });
  }

  getZipText(id: String) {
    return this.apollo.query<IGetZipTextUrlResponse>({
      query: GraphQL.getZipText,
      variables: { id },
      fetchPolicy: 'no-cache',
    });
  }

  generateZipTextUrl(
    text: string,
    expiryInMinutes: number | null,
    customSlug?: string | null,
  ) {
    const MUTATION = GraphQL.generateZipTextUrl;

    return this.apollo.mutate<IGenerateZipTextUrlResponse>({
      mutation: MUTATION,
      variables: {
        text,
        expiryInMinutes,
        customSlug,
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

  setTempText(text: string) {
    this.tempText = text;
  }

  getTempText(): string {
    return this.tempText;
  }

  clearTempText() {
    this.tempText = '';
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
}
