import { gql } from 'apollo-angular';

export const GraphQL = {
  HealthCheck: gql`
    query HealthCheck {
      healthCheck
    }
  `,
};
