import { gql } from 'apollo-angular';

export const GraphQL = {
  HealthCheck: gql`
    query HealthCheck {
      healthCheck
    }
  `,

  generateZipTextUrl: gql`
    mutation GenerateZipTextUrl(
      $text: String!
      $expiryInMinutes: Int
      $customSlug: String
    ) {
      generateZipTextUrl(
        text: $text
        expiryInMinutes: $expiryInMinutes
        customSlug: $customSlug
      )
    }
  `,

  getZipText: gql`
    query GetZipText($id: String!) {
      getZipText(url: $id)
    }
  `,

  generateZipShortUrl: gql`
    mutation GenerateZipShortUrl(
      $url: String!
      $expiryInMinutes: Int
      $customSlug: String
    ) {
      generateUrl(
        url: $url
        expiryInMinutes: $expiryInMinutes
        customSlug: $customSlug
      )
    }
  `,

  getZipShortUrl: gql`
    query GetZipShortUrl($url: String!) {
      getUrl(url: $url)
    }
  `,

  isShortIdAvailable: gql`
    query IsShortIdAvailable($id: String!, $type: RedirectionType!) {
      isShortIdAvailable(id: $id, type: $type)
    }
  `,
};
