/**
 * Validates required environment variables
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnvironmentVariables() {
  const required = ['STORE_DOMAIN', 'API_VERSION', 'SESSION_ACCESS_TOKEN'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Gets the Shopify GraphQL API URL
 * @returns {string} The GraphQL API URL
 */
export function getApiUrl() {
  validateEnvironmentVariables();

  const storeDomain = process.env.STORE_DOMAIN;
  const apiVersion = process.env.API_VERSION;

  return `https://${storeDomain}/admin/api/${apiVersion}/graphql.json`;
}

/**
 * Gets the Shopify access token
 * @returns {string} The access token
 */
export function getAccessToken() {
  return process.env.SESSION_ACCESS_TOKEN;
}
