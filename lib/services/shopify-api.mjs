import { getApiUrl, getAccessToken } from '../config/environment.mjs';
import { CREATE_METAFIELD_DEFINITION_MUTATION } from '../graphql/create-metafield-definition-mutation.mjs';

/**
 * Creates a metafield definition via Shopify GraphQL API
 * @param {Object} variables - The GraphQL variables containing the definition
 * @returns {Promise<Object>} The API response data
 * @throws {Error} If the API request fails or returns errors
 */
export async function createMetafieldDefinition(variables) {
  const url = getApiUrl();
  const accessToken = getAccessToken();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    body: JSON.stringify({
      query: CREATE_METAFIELD_DEFINITION_MUTATION,
      variables,
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(
      `GraphQL error: ${JSON.stringify(data.errors)} for ${variables.definition.name}`
    );
  }

  const userErrors =
    data.data?.metafieldDefinitionCreate?.userErrors || [];
  if (userErrors.length > 0) {
    console.error(
      `User errors for ${variables.definition.name}:`,
      JSON.stringify(userErrors)
    );
  }

  return data;
}
