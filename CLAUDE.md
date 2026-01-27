# CLAUDE.md - End-to-End Content Type Development Guide

This document provides Claude Code with comprehensive instructions for building complete content type implementations from frontend to backend in this Drupal-Next.js project.

## Project Overview

**Architecture**: Headless Drupal backend with Next.js frontend
**Backend**: Drupal 11 with GraphQL Compose and DC Import API
**Frontend**: Next.js 15 with TypeScript, Tailwind CSS, and Apollo GraphQL
**Environment**: DDEV local development

## Environment Configuration

**Environment Variables (`.env.local`):**
- `NEXT_PUBLIC_DRUPAL_BASE_URL` - Drupal backend URL
- `DRUPAL_CLIENT_ID` - OAuth client ID for API authentication
- `DRUPAL_CLIENT_SECRET` - OAuth client secret for API authentication
- `DRUPAL_REVALIDATE_SECRET` - Secret for on-demand revalidation
- `NODE_TLS_REJECT_UNAUTHORIZED=0` - Allow self-signed certificates (development)

## DC CLI Setup

**First-time CLI setup:**
```bash
# 1. Install decoupled-cli locally (if not already present in package.json)
npm install --save-dev decoupled-cli

# 2. Configure authentication - you have two options:

# Option A: Use OAuth with your existing Drupal credentials (recommended for local development)
npx decoupled-cli auth oauth

# Option B: Use personal access token (for production/remote deployments)
npx decoupled-cli auth login

# 3. Set your default space for content imports (optional but recommended)
npx decoupled-cli spaces use <space_id>

# 4. Verify authentication and space setup
npx decoupled-cli spaces current
```

## Space Management

**Creating a new space:**
```bash
# Create a space with default type (starter)
npx decoupled-cli spaces create "My New Space"

# Create a space with specific type
npx decoupled-cli spaces create "Production Site" --type pro
npx decoupled-cli spaces create "Enterprise App" --type premium

# Available types: starter, pro, premium

# Create with description
npx decoupled-cli spaces create "E-commerce Platform" \
  --type premium \
  --description "Main production e-commerce site"
```

**Quick Start with AI (One-Shot Workflow) ⚡:**

The fastest way to get started! Create a space with AI-generated content types and sample data from a single prompt:

```bash
# One command to create space + content
npx decoupled-cli spaces quick-start "blog about coffee"

# Preview AI-generated content first
npx decoupled-cli spaces quick-start "e-commerce store" --preview

# Custom configuration
npx decoupled-cli spaces quick-start "portfolio site" \
  --name "my-portfolio" \
  --type premium

# Add to existing space
npx decoupled-cli spaces quick-start "add products" --space-id 123
```

**What it does:**
1. 🤖 AI generates content type schema + sample data from your prompt
2. 🚀 Creates space (or uses `--space-id`)
3. ⏳ Waits for space to be ready
4. 📥 Imports generated content automatically
5. 🎉 Displays GraphQL endpoint and next steps

**Benefits:**
- ✅ No JSON writing - just describe what you want
- ✅ Instant prototypes for demos and POCs
- ✅ Learns from examples/content-import-sample.json patterns
- ✅ Uses centrally-managed AI (no API keys needed)
- ✅ Works with PAT authentication only

**Example use cases:**
- `"blog with posts about travel"` → Creates post content type with sample travel articles
- `"e-commerce with products"` → Creates product content type with pricing, images, inventory
- `"events calendar"` → Creates event content type with dates, locations, speakers
- `"team directory"` → Creates team_member content type with bios, photos, roles

**Listing and managing spaces:**
```bash
# List all spaces
npx decoupled-cli spaces list

# List with detailed information
npx decoupled-cli spaces list --detailed

# Get space details by ID or name
npx decoupled-cli spaces get 123
npx decoupled-cli spaces get my-space-name

# Check space status
npx decoupled-cli spaces status 123

# Set default space for operations
npx decoupled-cli spaces use 123
npx decoupled-cli spaces current
```

**Other space operations:**
```bash
# Clone an existing space
npx decoupled-cli spaces clone 123 --name "Development Copy"

# Update space name or type
npx decoupled-cli spaces update 123 --name "Updated Name"
npx decoupled-cli spaces update 123 --type premium

# Get Drupal admin login link
npx decoupled-cli spaces login 123

# Archive/unarchive spaces
npx decoupled-cli spaces archive 123
npx decoupled-cli spaces unarchive 123

# Delete space (with confirmation)
npx decoupled-cli spaces delete 123
```

**OAuth Prerequisites (for `decoupled-cli auth oauth`):**
Your `.env.local` must contain:
- `NEXT_PUBLIC_DRUPAL_BASE_URL=https://your-space.decoupled.io`
- `DRUPAL_CLIENT_ID=your_oauth_client_id`
- `DRUPAL_CLIENT_SECRET=your_oauth_client_secret`

**Obtaining OAuth Credentials:**

**Option 1: Using MCP Tool (Recommended)**
```
get_oauth_credentials({ spaceId: YOUR_SPACE_ID })
```
This returns the complete `.env.local` configuration including `DRUPAL_CLIENT_ID`, `DRUPAL_CLIENT_SECRET`, and `DRUPAL_REVALIDATE_SECRET`.

**Option 2: Manual from Drupal Admin**
1. Log into your Drupal space (use `npx decoupled-cli spaces login <space_id>` for a one-time login link)
2. Navigate to Configuration → Simple OAuth → Clients
3. Create a new OAuth client or copy existing credentials

**Authentication Method Differences:**
- **Personal Access Token (PAT)** → Works with Decoupled Drupal platform API (spaces, users, organizations, **content import via platform proxy**)
- **OAuth** → Direct Drupal site API access (alternative method for content import, local development)

**If CLI is not available locally:**
- For projects with decoupled-cli in package.json: Run `npm install` then use `npx decoupled-cli`
- For development: `cd cli && npm install && npm run build && npm link` then use `decoupled-cli`
- Always prefer using `npx decoupled-cli` for consistency and local package management

## End-to-End Development Workflow

When asked to create a new content type (e.g., "create a product page"), follow these steps:

**Recommended Workflow (PAT + Platform Proxy - Contentful-like simplicity):**
Use a single PAT token for all operations including content import via the platform proxy.

### 1. Content Analysis & Planning

**Analyze the request and determine:**
- Content type name and machine name
- Required fields and their types
- Frontend components needed
- URL structure and routing
- Display requirements (listing, detail pages, etc.)

**Create a todo list for tracking progress:**
```markdown
1. Verify DC CLI authentication (npx decoupled-cli auth status)
2. Create DC Import JSON for [content_type]
3. Import content type and sample content via platform (npx decoupled-cli spaces content-import <space_id> --file import.json)
4. **CRITICAL**: Run schema generation (`npm run generate-schema`) to update GraphQL schema
5. Create TypeScript types and GraphQL queries
6. Build frontend components ([ContentCard], [ContentRenderer])
7. Create listing and detail pages
8. Test build process and fix errors
9. Validate end-to-end functionality
```

**Alternative Workflow (OAuth + Direct Drupal API):**
```markdown
1. Set up OAuth authentication (npx decoupled-cli auth oauth)
2. Create DC Import JSON for [content_type]
3. Import content type and sample content to Drupal directly (npx decoupled-cli content import --file import.json)
4. **CRITICAL**: Run schema generation (`npm run generate-schema`) to update GraphQL schema
5. Create TypeScript types and GraphQL queries
6. Build frontend components ([ContentCard], [ContentRenderer])
7. Create listing and detail pages
8. Test build process and fix errors
9. Validate end-to-end functionality
```

### 0. CLI Authentication Check

**ALWAYS start by verifying CLI setup:**
```bash
# Check if CLI is authenticated
npx decoupled-cli auth status

# If not authenticated, choose authentication method:
# For local development with Drupal OAuth:
npx decoupled-cli auth oauth

# For production with personal access token:
npx decoupled-cli auth login

# List available spaces and set default
npx decoupled-cli spaces list
npx decoupled-cli spaces use <space_id>
```

**If CLI authentication fails:**
- For OAuth: Verify `.env.local` contains `NEXT_PUBLIC_DRUPAL_BASE_URL`, `DRUPAL_CLIENT_ID`, `DRUPAL_CLIENT_SECRET`
- For personal tokens: Check that DC platform is accessible
- Ensure user has proper permissions for the operations you're trying to perform

**Important: Command Availability by Authentication Method**
- **OAuth commands**: `content import`, `content status`, `auth status`
- **PAT-only commands**: `spaces list`, `spaces use`, `usage`, `org info`
- **Universal commands**: `auth login`, `auth oauth`, `auth test`

### 2. DC Import JSON Creation

**Get example format with CLI:**
```bash
npx decoupled-cli spaces content-import --example > my-content-type.json
```

**Use this JSON structure:**

```json
{
  "model": [
    {
      "bundle": "content_type_name",
      "description": "Description of the content type",
      "label": "Content Type Label",
      "body": true,
      "fields": [
        {
          "id": "field_name",
          "label": "Field Label",
          "type": "text|string|image|datetime|bool|text[]"
        }
      ]
    }
  ],
  "content": [
    {
      "id": "item1",
      "type": "node.content_type_name",
      "path": "/content-type/item-slug",
      "values": {
        "title": "Item Title",
        "body": "<p>Body content</p>",
        "field_name": "field_value"
      }
    }
  ]
}
```

**Field Type Reference:**
- `text` - Long text with formatting
- `string` - Short plain text (max 255 chars)
- `image` - Image upload
- `datetime` - Date and time
- `bool` - Boolean true/false
- `text[]` - Multiple text values
- `string[]` - Multiple string values

**Important Notes:**
- Field IDs become `field_[id]` in Drupal (e.g., `"id": "price"` → `field_price`)
- **CRITICAL**: In content values, use the field ID directly without "field_" prefix (e.g., `"price": "$299.99"` NOT `"field_price": "$299.99"`)
- Use `"body": true` to include standard body field
- Always include sample content for testing
- Path aliases should follow `/content-type/slug` pattern
- **For image fields**: Use full URLs with the Drupal domain from `.env.local`, not relative paths:
  ```json
  "featured_image": {
    "uri": "${DRUPAL_BASE_URL}/modules/custom/dc_import/resources/placeholder.png",
    "alt": "Description of the image",
    "title": "Image title"
  }
  ```
  Always read the `NEXT_PUBLIC_DRUPAL_BASE_URL` from `.env.local` and use that as the base for image URIs to ensure images load correctly from the Drupal backend.

### 3. Import via DC CLI

**Import Content Type (Recommended - PAT Only):**
```bash
# Import via platform proxy using PAT token (Contentful-like simplicity)
# No OAuth credentials needed - just your PAT token!
npx decoupled-cli spaces content-import <space_id> --file content-type-import.json

# Or let the CLI use your default space
npx decoupled-cli spaces content-import --file content-type-import.json
```

**Alternative: Direct Drupal Import (OAuth Required):**
```bash
# Import directly to your Drupal site (requires OAuth authentication)
npx decoupled-cli content import --file content-type-import.json

# Or preview first to see what will be imported
npx decoupled-cli content import --file content-type-import.json --preview
```

**Generate example import file:**
```bash
# Get example import JSON structure (works with both methods)
npx decoupled-cli content import --example > content-type-import.json
# Then edit the generated file with your content type definition
```

**Always check the response for success and note:**
- Content type machine name (may differ from input)
- Field machine names (auto-generated)
- Node IDs created
- GraphQL schema updates
- **Important**: GraphQL field names may differ from DC field IDs (check actual schema)

**CRITICAL: Immediately Update GraphQL Schema After Import:**
```bash
# Generate updated GraphQL schema to include new content type
npm run generate-schema
```

**Verify the schema includes your content type:**
```bash
# Check that your content type appears in the generated schema
grep -i [your_content_type] schema/schema.graphql

# Example for products:
grep -i product schema/schema.graphql
```

**Test that content was imported successfully:**
```bash
# Check that new content type appears in generated schema
npm run generate-schema
grep -i [your_content_type] schema/schema.graphql
```

### 4. Frontend Implementation

**File Structure:**
```
app/
├── components/
│   ├── [ContentType]Card.tsx      # List view component
│   ├── [ContentType]Renderer.tsx  # Detail view component
│   └── DynamicIcon.tsx            # Icon component (if needed)
├── [content-type]/
│   └── page.tsx                   # Listing page
├── [...slug]/
│   └── page.tsx                   # Dynamic routing (update)
lib/
├── queries.ts                     # GraphQL queries (update)
└── types.ts                       # TypeScript types (update)
```

#### GraphQL Queries

**Add to `lib/queries.ts`:**
```typescript
export const GET_CONTENT_TYPES = gql`
  query GetContentTypes($first: Int = 10) {
    node[ContentType]s(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created { timestamp }
        changed { timestamp }
        ... on Node[ContentType] {
          body { processed }
          field[FieldName] { processed }
          // Add all fields
        }
      }
    }
  }
`
```

**Update `GET_NODE_BY_PATH` to include new content type:**
```typescript
... on Node[ContentType] {
  id
  title
  body { processed }
  field[FieldName] { processed }
  // Add all fields
}
```

#### TypeScript Types

**Add to `lib/types.ts`:**
```typescript
export interface Drupal[ContentType] extends DrupalNode {
  body?: { processed: string }
  field[FieldName]?: { processed: string }
  // Add all fields with proper types
}

export interface [ContentType]Data {
  node[ContentType]s: {
    nodes: Drupal[ContentType][]
  }
}
```

#### Component Templates

**Card Component (`[ContentType]Card.tsx`):**
```typescript
import Link from 'next/link'
import { Drupal[ContentType] } from '@/lib/types'

interface [ContentType]CardProps {
  [contentType]: Drupal[ContentType]
}

export default function [ContentType]Card({ [contentType] }: [ContentType]CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {[contentType].title}
        </h3>

        {/* Add field displays */}
        {/* For text[] fields with HTML content, use dangerouslySetInnerHTML */}
        {/* Example: <span dangerouslySetInnerHTML={{ __html: field.processed }} /> */}

        <Link
          href={[contentType].path || `/[content-type]/${[contentType].id}`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}
```

**Renderer Component (`[ContentType]Renderer.tsx`):**
```typescript
import Header from './Header'
import { Drupal[ContentType] } from '@/lib/types'

interface [ContentType]RendererProps {
  [contentType]: Drupal[ContentType]
}

export default function [ContentType]Renderer({ [contentType] }: [ContentType]RendererProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {[contentType].title}
            </h1>

            {/* Add field displays */}
            {/* For text[] fields with HTML content, use dangerouslySetInnerHTML */}
            {/* Example: <span dangerouslySetInnerHTML={{ __html: field.processed }} /> */}

            {[contentType].body?.processed && (
              <div
                className="prose prose-lg max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: [contentType].body.processed }}
              />
            )}
          </div>
        </article>
      </main>
    </div>
  )
}
```

#### Listing Page

**Create `app/[content-type]/page.tsx`:**
```typescript
import Header from '../components/Header'
import [ContentType]Card from '../components/[ContentType]Card'
import { GET_CONTENT_TYPES } from '@/lib/queries'
import { getServerApolloClient } from '@/lib/apollo-client'
import { [ContentType]Data } from '@/lib/types'

export const revalidate = 300

export default async function [ContentType]sPage() {
  const apollo = getServerApolloClient(await headers())

  try {
    const { data } = await apollo.query<[ContentType]Data>({
      query: GET_CONTENT_TYPES,
      variables: { first: 20 },
      fetchPolicy: 'no-cache'
    })

    const [contentType]s = data?.node[ContentType]s?.nodes || []

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              [Content Types]
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Description of content type listing
            </p>
          </div>

          {[contentType]s.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[contentType]s.map(([contentType]) => (
                <[ContentType]Card key={[contentType].id} [contentType]={[contentType]} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">No [content types] available.</p>
            </div>
          )}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error loading [content types]:', error)
    // Return error state
  }
}
```

#### Update Dynamic Routing

**Add to `app/[...slug]/page.tsx`:**
```typescript
// In generateMetadata and page functions, add:
... on Node[ContentType] {
  id
  title
  // Add fields needed for display
}

// In the page component return:
if (node.__typename === 'Node[ContentType]') {
  return <[ContentType]Renderer [contentType]={node as Drupal[ContentType]} />
}
```

#### Update Navigation

**Add to `app/components/Header.tsx`:**
```typescript
// Add navigation link
<Link
  href="/[content-type]"
  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    pathname === '/[content-type]' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
  }`}
>
  [Content Types]
</Link>
```

### 5. Build and Test Process

**Always run these commands in sequence:**

1. **Build the application:**
```bash
npm run build
```

2. **Fix any TypeScript/build errors** that appear

3. **Start development server (IMPORTANT - follow these steps):**

```bash
# CRITICAL: Kill any existing dev server first to avoid stale cache issues
pkill -f "next dev" 2>/dev/null || true

# Clear Next.js cache (do this when switching spaces or after major changes)
rm -rf .next

# Start the dev server
npm run dev
```

4. **Wait for server to be ready** - Look for the "Ready" message in terminal output before testing in browser. Next.js takes a few seconds to compile.

5. **Test endpoints:**
   - Listing page: `http://localhost:3000/[content-type]`
   - Detail pages: `http://localhost:3000/[content-type]/[slug]`

**Common Issue: Changes not appearing in browser**
If your code changes aren't showing up:
1. Kill the existing dev server: `pkill -f "next dev"`
2. Clear the cache: `rm -rf .next`
3. Restart: `npm run dev`
4. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)

### 6. Testing Checklist

**Verify each step:**
- [ ] DC import successful with no errors
- [ ] GraphQL schema includes new content type
- [ ] TypeScript types are properly defined
- [ ] Build process completes without errors
- [ ] Listing page displays content
- [ ] Detail pages render correctly
- [ ] Navigation links work
- [ ] Responsive design functions
- [ ] Error states handled gracefully

## Common Content Type Patterns

### E-commerce Product
```json
{
  "id": "price",
  "label": "Price",
  "type": "string"
},
{
  "id": "product_images",
  "label": "Product Images",
  "type": "image[]"
},
{
  "id": "in_stock",
  "label": "In Stock",
  "type": "bool"
},
{
  "id": "features",
  "label": "Key Features",
  "type": "string[]"
}
```

**Sample content with image URI:**
```json
"product_images": [
  {
    "uri": "${DRUPAL_BASE_URL}/modules/custom/dc_import/resources/placeholder.png",
    "alt": "Product showcase image",
    "title": "Product Image"
  }
]
```

### Event/Conference
```json
{
  "id": "event_date",
  "label": "Event Date",
  "type": "datetime"
},
{
  "id": "location",
  "label": "Location",
  "type": "string"
},
{
  "id": "speakers",
  "label": "Speakers",
  "type": "string[]"
}
```

### Team Member
```json
{
  "id": "position",
  "label": "Position",
  "type": "string"
},
{
  "id": "profile_image",
  "label": "Profile Image",
  "type": "image"
},
{
  "id": "bio",
  "label": "Biography",
  "type": "text"
}
```

**Sample content with image URI:**
```json
"profile_image": {
  "uri": "${DRUPAL_BASE_URL}/modules/custom/dc_import/resources/placeholder.png",
  "alt": "Team member headshot",
  "title": "Profile Photo"
}
```

### Portfolio/Case Study
```json
{
  "id": "project_url",
  "label": "Project URL",
  "type": "string"
},
{
  "id": "technologies",
  "label": "Technologies Used",
  "type": "string[]"
},
{
  "id": "project_images",
  "label": "Project Images",
  "type": "image[]"
}
```

**Sample content with image URIs:**
```json
"project_images": [
  {
    "uri": "${DRUPAL_BASE_URL}/modules/custom/dc_import/resources/placeholder.png",
    "alt": "Project screenshot showing main interface",
    "title": "Project Interface"
  }
]
```

## Troubleshooting

### Common Issues

**1. DC Import Fails**
- Check OAuth token expiration
- Verify JSON structure matches `schema/sample.json` format
- Ensure field IDs don't start with `field_`
- **Critical**: In content values, use field ID without "field_" prefix (e.g., `"price": "$299.99"` not `"field_price": "$299.99"`)

**2. GraphQL Errors**
- Check if content type was created successfully in Drupal
- Verify GraphQL Compose configuration
- Clear GraphQL cache in Drupal admin

**3. Build Errors**
- Check TypeScript type definitions
- Ensure all imports are correct
- Verify GraphQL query syntax

**4. Content Not Displaying**
- Check GraphQL query field names match Drupal fields (may not match DC field IDs)
- Verify content was created and published
- Check query variables and pagination
- For HTML content showing raw tags, use `dangerouslySetInnerHTML={{ __html: field.processed }}`

**5. GraphQL Schema Not Updated After DC Import**
- **Critical Issue**: DC imports create content types successfully but GraphQL schema may not update immediately
- Content exists in Drupal but `nodeProducts` query returns "field not found" errors
- This is the most common issue with DC imports

**Solution Process**:
1. Clear Drupal caches (if you have admin access)
2. **Always run schema generation script**: `npm run generate-schema`
3. This regenerates the GraphQL schema files and validates the schema is updated
4. Test queries again after schema regeneration

### Essential Schema Generation Workflow

**CRITICAL**: Always run schema generation after DC imports to ensure GraphQL integration works properly.

```bash
# Generate updated GraphQL schema after content type imports
npm run generate-schema
```

This command runs `scripts/generate-schema.ts` which:
- Authenticates with Drupal using OAuth credentials from `.env.local`
- Performs GraphQL introspection to get the current schema
- Generates `schema/schema.graphql` (SDL format for reference)
- Generates `schema/introspection.json` (raw introspection result)
- Generates `schema/types.ts` (TypeScript types)
- Validates that new content types are available in GraphQL

**Why Use This Script:**
The generated schema files provide:
1. **Accurate field names** - Drupal may transform field IDs (e.g., `in_stock` → `inStock`)
2. **Correct type structures** - Know exactly what GraphQL returns
3. **Discovery of all fields** - See every available field including system fields
4. **IDE autocompletion** - TypeScript types enable better developer experience

**OAuth Credentials Required:**
The script requires valid OAuth credentials in `.env.local`:
- `DRUPAL_CLIENT_ID` - OAuth client ID
- `DRUPAL_CLIENT_SECRET` - OAuth client secret

> **Tip**: Use `get_oauth_credentials({ spaceId: YOUR_SPACE_ID })` MCP tool to retrieve these credentials automatically.

**Add this to your workflow**:
1. Import content type via DC API
2. **Immediately run**: `npm run generate-schema`
3. Check generated schema includes your new content type
4. Test GraphQL queries
5. Proceed with frontend implementation

### Debug Commands

```bash
# Check CLI authentication status
npx decoupled-cli auth status

# OAUTH/DRUPAL COMMANDS:
# Check content import API status
npx decoupled-cli content status

# Preview content import without applying changes
npx decoupled-cli content import --file your-import.json --preview

# Import content to Drupal
npx decoupled-cli content import --file your-import.json

# Generate fresh schema (most important after any import)
npm run generate-schema

# PAT/PLATFORM COMMANDS (require npx decoupled-cli auth login):
# List available spaces
npx decoupled-cli spaces list

# Check current default space
npx decoupled-cli spaces current

# Get health status of DC platform
npx decoupled-cli health check

# Check organization info
npx decoupled-cli org info

# Legacy platform content import
npx decoupled-cli spaces content-import --file your-import.json --preview
npx decoupled-cli spaces content-import --file your-import.json --json
```

## Content Import Command Reference

### OAuth + Drupal API Commands

**Check content import API status:**
```bash
npx decoupled-cli content status
```

**Generate example import JSON:**
```bash
npx decoupled-cli content import --example > my-content-type.json
```

**Preview import (dry run):**
```bash
npx decoupled-cli content import --file my-content-type.json --preview
```

**Import content to Drupal:**
```bash
npx decoupled-cli content import --file my-content-type.json
```

### Authentication Setup for Content Import

**Quick OAuth Setup (recommended for local development):**
```bash
# 1. Ensure .env.local has OAuth credentials
# 2. Set up OAuth profile
npx decoupled-cli auth oauth

# 3. Verify it's working
npx decoupled-cli content status

# 4. Import content
npx decoupled-cli content import --file your-content.json
```

**When to use PAT vs OAuth:**
- **PAT (Recommended)**: All operations including content import, space management, production deployments - **just like Contentful's CMA token**
- **OAuth**: Alternative method for direct Drupal API access, local development with existing Drupal credentials

## Best Practices

1. **Always create sample content** during import for immediate testing
2. **Use descriptive field names** that are clear and consistent
3. **Follow existing naming conventions** in the codebase
4. **Test responsive design** on different screen sizes
5. **Handle empty/missing data gracefully** in components
6. **Use semantic HTML** for accessibility
7. **Include proper TypeScript types** for all data structures
8. **Test the full user journey** from listing to detail pages
9. **Use `dangerouslySetInnerHTML`** for processed HTML content from Drupal to avoid raw tag display
10. **Verify GraphQL field names** match actual schema, not DC field IDs

## Success Criteria

A successful end-to-end implementation should:
- [ ] Build without errors
- [ ] Display content correctly on listing and detail pages
- [ ] Handle navigation between pages
- [ ] Render responsively on all device sizes
- [ ] Show appropriate fallbacks for missing data
- [ ] Follow the established design patterns
- [ ] Include proper metadata and SEO elements
- [ ] Work with the existing authentication and routing system

## Key Learnings and Common Mistakes

Based on successful product catalog implementation, here are critical learnings to avoid common pitfalls:

### DC Import Format Issues

**Problem**: Field values incorrectly formatted with "field_" prefix
```json
// WRONG - This causes import failures
"values": {
  "field_price": "$299.99",
  "field_in_stock": true
}

// CORRECT - Use field ID directly
"values": {
  "price": "$299.99",
  "in_stock": true
}
```

**Solution**: Always use the field `id` value directly in content values, never add "field_" prefix.

### GraphQL Field Name Mapping

**Problem**: Assuming GraphQL field names match DC field IDs
```typescript
// WRONG - Field names may be transformed
price: string           // DC field ID
fieldPrice: string      // What you might expect in GraphQL

// CORRECT - Check actual schema
price: string          // Actual GraphQL field name (can match DC ID)
inStock: boolean       // camelCase transformation
productImages: object  // snake_case to camelCase
```

**Solution**: Always verify GraphQL field names by checking the actual schema or API response before writing queries.

### GraphQL Field Value Structure Discovery

**Critical Learning**: GraphQL field values from DC imports return as simple types, not objects:

```typescript
// WRONG - Assuming field values are objects with .processed
fieldPrice?: {
  processed: string
}
fieldFeatures?: Array<{
  processed: string
}>

// CORRECT - DC imports create simple value fields
price?: string
features?: string[]
```

**Discovery Process**: Check GraphQL schema to understand actual field structure:
```bash
# Generate fresh schema and check field structure
npm run generate-schema
grep -i nodeProducts schema/schema.graphql
# Check the actual schema files for field names and types
```

**Solution**: Always check the generated GraphQL schema first to understand the actual field structure before writing TypeScript types and components.

### HTML Content Rendering

**Problem**: Drupal processed HTML showing as raw tags in frontend
```jsx
// WRONG - Shows: "Key Features <p>Fast Wireless Charging</p> <p>Qi-Compatible</p>"
<span>{feature.processed}</span>

// CORRECT - Renders HTML properly
<span dangerouslySetInnerHTML={{ __html: feature.processed }} />
```

**Better Solution**: Use `string[]` instead of `text[]` for simple lists to avoid HTML altogether:
```jsx
// BEST - Clean, simple, no HTML rendering needed
<span>{feature}</span>  // Just plain text: "Fast Wireless Charging"
```

**Solution**: Use `dangerouslySetInnerHTML` only when necessary for rich `text[]` fields. Prefer `string[]` for simple bullet lists.

### Field Type Selection

**Best Practice**: Choose field types based on content structure:
- `string[]` for bullet points, features, specifications, tags, categories (clean plain text, no HTML rendering issues)
- `text[]` only when you need rich formatting within each item (rare - avoid unless necessary)
- `text` for rich content descriptions that need HTML formatting
- `string` for simple values like price, SKU, names (plain text, max 255 chars)

**Recommendation**: For repeated items like product features, use `string[]` instead of `text[]` to avoid HTML rendering complexity and security concerns.

### Navigation Menu Integration Pattern

**Essential Step**: Always update the main navigation when creating new content types:

```typescript
// Update navigationItems array in app/components/Header.tsx
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },  // Add new content type
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/about' }
]

// Update active tab detection to include content type routes
const getActiveTab = () => {
  if (pathname === '/') return 'Home'
  if (pathname === '/products' || pathname.startsWith('/products/')) return 'Products'
  if (pathname === '/articles' || pathname.startsWith('/articles/')) return 'Articles'
  if (pathname === '/about') return 'About'
  return null
}
```

**Pattern**: Use `.startsWith()` for active state detection to highlight navigation for both listing and detail pages.

### Component Architecture Best Practices

**Proven Pattern**: Create two components per content type:
1. **`[ContentType]Card.tsx`** - For listing views with preview information
2. **`[ContentType]Renderer.tsx`** - For detail pages with complete information

**Component Features**:
- **Cards**: Preview data, stock/status indicators, truncated feature lists, call-to-action links
- **Renderers**: Full data display, sticky sidebars, responsive grids, structured information hierarchy

**File Organization**:
```
app/
├── components/
│   ├── ProductCard.tsx      # Reusable card for listings
│   ├── ProductRenderer.tsx  # Full page renderer for details
│   └── Header.tsx          # Updated with new navigation
├── products/
│   └── page.tsx            # Listing page using ProductCard
└── [...slug]/
    └── page.tsx            # Updated to handle new content type routing
```

### Build Process Validation

**Critical**: Always run build process after major changes to catch TypeScript and import errors:

```bash
npm run build  # Must complete without errors
npm run dev    # Test in development mode
```

**Testing Checklist**:
- [ ] Build completes successfully
- [ ] Listing page loads and displays content
- [ ] Detail pages render via dynamic routing
- [ ] Navigation highlights correctly
- [ ] Mobile responsive design works
- [ ] Error states display appropriately

### GraphQL Schema Generation Workflow (CRITICAL LEARNING)

The most important learning from the product catalog implementation is the **mandatory schema generation step**:

**Problem**: DC imports successfully create content types and content, but GraphQL schema doesn't update automatically.
**Symptoms**:
- `nodeProducts` query returns "field not found" errors
- Content exists in Drupal but not accessible via GraphQL
- Route queries work but content type queries fail

**Solution**: **ALWAYS run schema generation immediately after DC imports**:

```bash
# After any DC import, immediately run:
npm run generate-schema

# This step is MANDATORY for GraphQL integration to work
```

**Why this is critical**:
- DC API creates Drupal content types but doesn't trigger GraphQL schema rebuilds
- The `generate-schema` script performs fresh introspection and updates local schema files
- Without this step, frontend development will fail with "type not found" errors
- This step bridges the gap between Drupal content type creation and Next.js GraphQL integration

**Workflow Integration**:
1. Import via DC API ✅
2. **Run `npm run generate-schema`** ✅ ← CRITICAL STEP
3. Verify schema includes new content type ✅
4. Proceed with frontend development ✅

This learning transforms the development workflow from "sometimes works" to "reliably works every time."

### GraphQL Schema Field Name Discovery

**Critical Process**: Always verify actual GraphQL field names after DC import - they may differ from field IDs used in import JSON.

**Discovery Method**:
```bash
# Check generated schema to understand actual field structure
npm run generate-schema
grep -A 10 -B 5 nodeProducts schema/schema.graphql
# This shows the actual field names and types available
```

**Key Learning**: DC field IDs may transform in GraphQL schema:
- `in_stock` becomes `inStock` (camelCase)
- `product_images` becomes `productImages` (camelCase)
- Simple field types work reliably (string, boolean, string[])

### Component Architecture Patterns

**Proven Two-Component Pattern**:
1. **`[ContentType]Card.tsx`** - Listing view component
   - Preview information only
   - Truncated content (features.slice(0, 3))
   - Call-to-action buttons
   - Stock/status indicators

2. **`[ContentType]Renderer.tsx`** - Detail page component
   - Complete data display
   - Full feature/specification lists
   - Image galleries
   - Action buttons and forms

**Navigation Integration Pattern**:
```typescript
// Always update navigationItems array
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },  // Add new content type
  // ...
]

// Use .startsWith() for active state detection
const getActiveTab = () => {
  if (pathname === '/products' || pathname.startsWith('/products/')) return 'Products'
  // ...
}
```

### Field Type Best Practices (Revised)

Based on successful product catalog implementation:

**Reliable Field Types**:
- `string` - Simple text values (price, SKU, category)
- `string[]` - Multiple simple values (features, specifications)
- `bool` - Boolean flags (in_stock, featured)
- `text` - Rich HTML content (body, descriptions)
- `image[]` - Multiple image uploads
- `image` - Single image upload

**Recommendation**: Use `string[]` for lists (features, specifications) instead of `text[]` to avoid HTML rendering complexity.

### Build Process Integration

**Essential Commands Sequence**:
```bash
# After DC import, always run:
npm run generate-schema  # Updates GraphQL schema
npm run build           # Validates TypeScript and builds
npm run dev            # Test in development
```

**Success Criteria**:
- ✅ Build completes without TypeScript errors
- ✅ Listing page loads with HTTP 200
- ✅ Detail pages load with proper titles
- ✅ Navigation highlighting works correctly

### Deployment Field Mapping Reference

**DC Import → GraphQL Schema Mapping**:
```json
// DC import format:
{
  "in_stock": true,           // → GraphQL: inStock
  "product_images": [...],    // → GraphQL: productImages
  "features": ["A", "B"],     // → GraphQL: features
  "specifications": ["X"]     // → GraphQL: specifications
}
```

**Always verify field names in generated schema before writing TypeScript types.**

## Summary

This comprehensive guide enables "one-shot" prompts like "create a product catalog" to result in complete, working implementations from backend to frontend, with known limitations documented for efficient troubleshooting.
