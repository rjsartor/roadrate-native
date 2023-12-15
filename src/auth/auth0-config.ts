import { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_REDIRECT_URI } from '@env';

const authConfig = {
  domain: REACT_APP_AUTH0_DOMAIN,
  clientId: REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: REACT_APP_AUTH0_REDIRECT_URI,
};

export default authConfig;