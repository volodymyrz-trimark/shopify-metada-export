# Shopify Metafield Updater

A Node.js script that updates Shopify metafields using the GraphQL Admin API. This tool reads metafield definitions and metadata files to bulk update product metafields.

## Prerequisites

- Node.js 18+ (ESM modules support)
- Shopify Admin API access
- Shopify store with metafield definitions

## Installation

1. Clone or download this repository
2. Install dependencies `npm ci`

## Configuration

### Environment Variables

Create a `.env` file in the root directory or set the following environment variables:

```bash
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=shpat_xxxxxxxxxxxxxxxxxxxxx
```

**Required Variables:**
- `SHOPIFY_STORE_DOMAIN` - Your Shopify store domain (e.g., `my-store.myshopify.com`)
- `SHOPIFY_ADMIN_ACCESS_TOKEN` - Shopify Admin API access token with metafield permissions

## Metadata File Format

Place your metadata JSON files in the `metadata-files/` directory. Each file should contain:

```json
{
  "data": {
    "metafieldDefinitions": {
      "nodes": [
        {}
      ]
    }
  }
}
```

## Usage

Run the script using Node.js:

```bash
npm run start
```

The script will:
1. Validate environment variables
2. Fetch metafield definitions from Shopify
3. Read all JSON files from `metadata-files/` directory
4. Process each file and update metafields via GraphQL API
5. Display success/error messages for each operation

## Error Handling

The script includes comprehensive error handling:
- **Missing environment variables** - Script exits with clear error message
- **Invalid JSON files** - Skips file and continues processing
- **API errors** - Logs error details and continues with next file
- **GraphQL errors** - Displays user errors from Shopify API

## Troubleshooting

### "Missing required environment variable"
- Ensure `.env` file exists or environment variables are set
- Check variable names match exactly: `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_ADMIN_ACCESS_TOKEN`

### "No metadata files found"
- Create `metadata-files/` directory in the root
- Add at least one `.json` file with valid metadata format

## Support

For Shopify API documentation, visit: https://shopify.dev/api/admin-graphql
