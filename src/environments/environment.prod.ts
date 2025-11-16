import { MAIN_DOMAIN } from '../app/enums/common';

export const environment = {
  production: true,
  nodeUrl: `https://api.${MAIN_DOMAIN}/graphql`,
  angularUrl: `https://${MAIN_DOMAIN}`,
  textViewerUrl: `https://t.${MAIN_DOMAIN}`,
  urlViewerUrl: `https://u.${MAIN_DOMAIN}`,
};
