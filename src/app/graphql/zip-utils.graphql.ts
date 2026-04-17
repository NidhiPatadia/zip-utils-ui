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
      $pin: String
    ) {
      generateZipTextUrl(
        text: $text
        expiryInMinutes: $expiryInMinutes
        customSlug: $customSlug
        isIpRestricted: $isIpRestricted
        isOneTimeView: $isOneTimeView
        pin: $pin
      )
    }
  `,

  getZipText: gql`
    query GetZipText($url: String!, $pin: String) {
      getZipText(url: $url, pin: $pin) {
        text
        isOneTimeView
        hasPin
        isIpRestricted
        expiryTime
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
      $isOneTimeView: Boolean
      $pin: String
    ) {
      generateUrl(
        url: $url
        expiryInMinutes: $expiryInMinutes
        customSlug: $customSlug
        isOneTimeView: $isOneTimeView
        pin: $pin
      )
    }
  `,

  getZipShortUrl: gql`
    query GetZipShortUrl($url: String!, $pin: String) {
      getUrl(url: $url, pin: $pin) {
        url
        hasPin
        isOneTimeView
        expiryTime
      }
    }
  `,

  deleteZipShortUrl: gql`
    mutation DeleteZipShortUrl($id: String!) {
      deleteUrl(id: $id)
    }
  `,

  isShortIdAvailable: gql`
    query IsShortIdAvailable($id: String!, $type: RedirectionType!) {
      isShortIdAvailable(id: $id, type: $type)
    }
  `,
};
