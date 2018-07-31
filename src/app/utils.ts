
import { createHmac } from 'crypto';
import * as constants from './constants';
import * as secrets from '../secrets'
import * as request from 'request-promise';

/**
 * Given the fb app secret and a user's access token, signs the access token with the private key
 * @param {string} appSecret 
 * @param {string} accessToken 
 *
 * @returns {string} - The signed appProof
 */
function _createAppProof(appSecret: string, accessToken: string): string {
  const hMac = createHmac('sha256', appSecret);
  hMac.update(accessToken);
  return hMac.digest('hex');
}

/**
 * Returns the app proof of the currently configured app secret and access
 * token
 * @returns {string} - The app proof
 */
export function getAppProof(): string {
  return _createAppProof(secrets.APP_SECRET, secrets.ACCESS_TOKEN);
}

/**
 * Given a user access token, generates a long-lived access token
 * https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing/#generate-long-lived-token
 * 
 * Long lived access tokens for users can last up to 60 days, whereas short lived tokens can live
 * for only a couple hours.
 * @param {string} userAccessToken - The user access token to extend
 * @returns {Promise<string>} - The extended token
 */
export async function extendUserAccessToken(userAccessToken: string): Promise<string> {
  const response = await request.get(`${constants.FB_BASE_API_URL}/oauth/access_token`, {
    qs: {
      grant_type: 'fb_exchange_token',
      client_id: constants.FB_APP_ID,
      client_secret: secrets.APP_SECRET,
      fb_exchange_token: userAccessToken,
    },
    json: true,
  });
  
  return response.access_token;
}
