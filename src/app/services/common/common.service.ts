import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GraphQL } from '../../graphql/zip-utils.graphql';
import {
  IHealthCheckResponse,
  IGenerateZipTextUrlResponse,
  IGetZipTextUrlResponse,
  IGetZipShortUrlResponse,
  IGenerateZipShortUrlResponse,
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

  generateZipTextUrl(text: string, expiryInMinutes: number | null) {
    const MUTATION = GraphQL.generateZipTextUrl;

    return this.apollo.mutate<IGenerateZipTextUrlResponse>({
      mutation: MUTATION,
      variables: {
        text,
        expiryInMinutes,
      },
    });
  }

  generateZipShortUrl(url: string) {
    return this.apollo.mutate<IGenerateZipShortUrlResponse>({
      mutation: GraphQL.generateZipShortUrl,
      variables: { url },
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
}
