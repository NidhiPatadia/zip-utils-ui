import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GraphQL } from '../../graphql/zip-utils.graphql';
import { IHealthCheckResponse } from '../../models/common';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly apollo = inject(Apollo);

  constructor() {}

  healthCheck() {
    return this.apollo.query<IHealthCheckResponse>({
      query: GraphQL.HealthCheck,
      fetchPolicy: 'no-cache',
    });
  }
}
