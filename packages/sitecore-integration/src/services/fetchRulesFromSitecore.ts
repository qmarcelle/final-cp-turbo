import fetch from 'node-fetch'; // Or your preferred fetch polyfill/library
import gql from 'graphql-tag';

// Make sure this query aligns with your Sitecore GraphQL schema
const GET_VISIBILITY_RULES_QUERY = gql`
  query GetVisibilityRules {
    visibilityRules {
      # This field should return the visibility rules YAML/JSON as a string
      # Example field name, adjust to your actual schema
      rulesContent # or yamlConfig, jsonConfig, etc.
    }
  }
`;

export async function fetchRulesFromSitecore(): Promise<string> {
  const endpoint = process.env.SITECORE_GRAPHQL_ENDPOINT;
  const apiKey = process.env.SITECORE_API_KEY; // Using SITECORE_API_KEY as a common convention

  if (!endpoint) {
    throw new Error('Sitecore GraphQL endpoint (SITECORE_GRAPHQL_ENDPOINT) is not configured.');
  }
  // API key might be optional depending on your Sitecore setup
  // if (!apiKey) {
  //   throw new Error('Sitecore API key (SITECORE_API_KEY) is not configured.');
  // }

  console.log(`Fetching visibility rules from Sitecore endpoint: ${endpoint}`);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization header if required by your Sitecore instance
        // e.g., SC_API_KEY for JSS, or a Bearer token
        ...(apiKey && { 'X-Scitemwebapi-Key': apiKey }), // Common for Sitecore Headless Services
        // Or if using a different auth mechanism like a bearer token:
        // 'Authorization': `Bearer ${process.env.SITECORE_BEARER_TOKEN}`
      },
      body: JSON.stringify({ 
        query: GET_VISIBILITY_RULES_QUERY.loc?.source.body 
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Failed to fetch rules from Sitecore: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const jsonResponse = await response.json() as any; // Add type assertion or proper typing for the response

    if (jsonResponse.errors && jsonResponse.errors.length > 0) {
      console.error('Sitecore GraphQL Errors:', jsonResponse.errors);
      throw new Error(jsonResponse.errors.map((e: any) => e.message).join('; '));
    }

    // Adjust the path to the rules content based on your actual GraphQL response structure
    const rulesContent = jsonResponse.data?.visibilityRules?.rulesContent;
    if (typeof rulesContent !== 'string') {
      console.error('Invalid or missing rulesContent in Sitecore GraphQL response:', jsonResponse.data);
      throw new Error('Rules content not found or not a string in Sitecore response.');
    }

    console.log("Successfully fetched rules from Sitecore.");
    return rulesContent;

  } catch (error) {
    console.error('Error during fetchRulesFromSitecore:', error);
    // Fallback or rethrow depending on desired error handling
    // For example, you might want to load local rules as a fallback here too,
    // or let the PolicyEngine handle that.
    throw error; // Rethrow the error to be handled by the caller (e.g., PolicyEngine)
  }
} 