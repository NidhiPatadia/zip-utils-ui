export interface IPageTitleAndDescription {
  pageTitle: string;
  pageDescription: string;
  tabTitle?: string;
}

export interface IHealthCheckResponse {
  healthCheck: boolean;
}

export interface IGenerateZipTextUrlResponse {
  generateZipTextUrl: string;
}

export interface IGetZipTextUrlResponse {
  getZipText: string;
}

export interface IGenerateZipShortUrlResponse {
  generateUrl: string;
}

export interface IGetZipShortUrlResponse {
  getUrl: string;
}

export interface ICheckShortIdAvailabilityResponse {
  isShortIdAvailable: boolean;
}
