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
      $isIpRestricted: Boolean
      $isOneTimeView: Boolean
    ) {
      generateZipTextUrl(
        text: $text
        expiryInMinutes: $expiryInMinutes
        customSlug: $customSlug
        isIpRestricted: $isIpRestricted
        isOneTimeView: $isOneTimeView
      )
    }
  `,

  getZipText: gql`
    query GetZipText($url: String!) {
      getZipText(url: $url) {
        text
        isOneTimeView
      }
    }
  `,

  deleteZipText: gql`
    mutation DeleteZipText($id: String!) {
      deleteZipText(id: $id)
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
