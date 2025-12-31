# Hello World Test App Setup

## ✅ Setup Complete!

Your Decoupled Drupal application is now connected and working!

### What Was Created

1. **Environment Configuration** (`.env.local`)
   - Connected to your Drupal space: `g1j4fq2.decoupled.website`
   - GraphQL endpoint configured and tested

2. **Test Page** (`/app/test/page.tsx`)
   - Beautiful hello world page
   - Displays sample content from Drupal
   - Shows connection status
   - Lists all available articles

3. **Test Script** (`test-connection.js`)
   - Standalone script to verify GraphQL connection
   - Can be run independently with: `node test-connection.js`

### Sample Content Available

Your Drupal space already has 4 sample articles:

1. **API Integration & Authentication**
   - Path: `/api-integration-authentication`

2. **Getting Started with GraphQL**
   - Path: `/getting-started-with-graphql`

3. **Welcome to Decoupled Drupal**
   - Path: `/welcome-to-decoupled-drupal`

4. **Content Authoring with Paragraphs**
   - Path: `/content-authoring-with-paragraphs`

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

Then visit:
- **Test Page**: http://localhost:3000/test
- **Homepage**: http://localhost:3000
- **Articles**: http://localhost:3000/articles

### Production Build

```bash
npm run build
npm start
```

## 🧪 Testing the Connection

Run the test script to verify your connection:

```bash
node test-connection.js
```

This will:
- Test the GraphQL endpoint
- List all available articles
- Confirm the setup is working

## 📚 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Drupal (Headless CMS)
- **API**: GraphQL
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript

## 🎨 Features

- ✅ Server-side rendering with Next.js
- ✅ GraphQL queries with Apollo Client
- ✅ Responsive design with Tailwind CSS
- ✅ Dynamic routing for Drupal content
- ✅ Image optimization
- ✅ Type-safe development

## 📝 Next Steps

1. **Explore the existing pages:**
   - Homepage with hero section and features
   - Articles listing page
   - Individual article pages
   - Test page with connection details

2. **Create new content:**
   - Access Drupal admin: https://g1j4fq2.decoupled.website
   - Create new articles, pages, or homepage content
   - Content automatically appears in Next.js

3. **Customize the frontend:**
   - Modify components in `/app/components/`
   - Update queries in `/lib/queries.ts`
   - Adjust styles with Tailwind CSS

4. **Add new features:**
   - Create custom content types in Drupal
   - Add new GraphQL queries
   - Build new Next.js pages

## 🔗 Useful Links

- **Drupal Backend**: https://g1j4fq2.decoupled.website
- **GraphQL Endpoint**: https://g1j4fq2.decoupled.website/graphql
- **Dashboard**: https://dashboard.decoupled.io

## 🐛 Troubleshooting

### Connection Issues

If you encounter connection errors:

1. Check that `.env.local` has the correct URL
2. Run `node test-connection.js` to diagnose
3. Verify the Drupal site is accessible

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Missing Content

If content doesn't appear:

1. Verify content exists in Drupal
2. Check GraphQL queries in `/lib/queries.ts`
3. Ensure content is published in Drupal

## 📄 Project Structure

```
/workspace/
├── app/
│   ├── test/               # Hello World test page
│   ├── articles/           # Articles listing
│   ├── components/         # React components
│   └── api/graphql/        # GraphQL proxy
├── lib/
│   ├── apollo-client.ts    # Apollo Client setup
│   ├── queries.ts          # GraphQL queries
│   └── types.ts            # TypeScript types
├── .env.local              # Environment variables
├── test-connection.js      # Connection test script
└── TEST-SETUP.md          # This file
```

## 🎉 Success!

Your hello world test app is ready! Visit http://localhost:3000/test to see it in action.
