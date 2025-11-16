import { MAIN_DOMAIN } from '../app/enums/common';

export const environment = {
  production: false,
  nodeUrl: `https://dev-api.${MAIN_DOMAIN}/graphql`,
  angularUrl: `https://dev.${MAIN_DOMAIN}`,
  textViewerUrl: `https://dev-t.${MAIN_DOMAIN}`,
  urlViewerUrl: `https://dev-u.${MAIN_DOMAIN}`,
};
