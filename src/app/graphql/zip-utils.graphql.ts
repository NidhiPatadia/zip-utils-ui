import { gql } from 'apollo-angular';

export const GraphQL = {
  HealthCheck: gql`
    query HealthCheck {
      healthCheck
    }
  `,

  generateZipTextUrl: gql`
    mutation GenerateZipTextUrl($text: String!, $expiryInMinutes: Int!) {
      generateZipTextUrl(text: $text, expiryInMinutes: $expiryInMinutes)
    }
  `,

  getZipText: gql`
    query GetZipText($id: String!) {
      getZipText(url: $id)
    }
  `,
};
