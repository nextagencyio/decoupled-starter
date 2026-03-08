# Decoupled Drupal App

A Next.js application integrated with Decoupled Drupal, built with modern web technologies.

![Decoupled Starter Screenshot](docs/screenshot.png)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextagencyio/decoupled-starter&project-name=my-app)

## Features

- ⚡ Next.js 15 with App Router
- 🍃 Drupal integration ready
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- 🔧 TypeScript support
- 🧹 ESLint configuration

## Quick Start

### 1. Clone the template

```bash
npx degit nextagencyio/decoupled-starter my-app
cd my-app
npm install
```

### 2. Run interactive setup

```bash
npm run setup
```

This interactive script will:
- Authenticate with Decoupled.io (opens browser)
- Create a new Drupal space
- Wait for provisioning (~90 seconds)
- Configure your `.env.local` file
- Import sample content

### 3. Start development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Manual Setup

If you prefer to run each step manually:

<details>
<summary>Click to expand manual setup steps</summary>

### Authenticate with Decoupled.io

```bash
npx decoupled-cli@latest auth login
```

### Create a Drupal space

```bash
npx decoupled-cli@latest spaces create "My App"
```

Note the space ID returned (e.g., `Space ID: 1234`). Wait ~90 seconds for provisioning.

### Configure environment

```bash
npx decoupled-cli@latest spaces env 1234 --write .env.local
```

### Import content

```bash
npm run setup-content
```

</details>

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run setup` - Interactive setup wizard
- `npm run setup-content` - Import starter content to Drupal
- `npm run generate-schema` - Generate GraphQL schema from Drupal backend

## GraphQL Schema Generation

After importing content types to Drupal, regenerate the GraphQL schema:

```bash
npm run generate-schema
```

This fetches the current schema from Drupal and generates TypeScript types.

## Customization

### Colors & Branding
Edit `tailwind.config.js` to customize colors, fonts, and spacing.

### Content Structure
Modify `data/starter-content.json` to add or change content types and sample content.

### Components
React components are in `app/components/`. Update them to match your design needs.

## Demo Mode

Demo mode allows you to showcase the application without connecting to a Drupal backend. It displays mock content for the homepage, articles, and other pages.

### Enable Demo Mode

Set the environment variable:

```bash
NEXT_PUBLIC_DEMO_MODE=true
```

Or add to `.env.local`:
```
NEXT_PUBLIC_DEMO_MODE=true
```

### What Demo Mode Does

- Shows a "Demo Mode" banner at the top of the page
- Returns mock data for all GraphQL queries
- Displays sample articles, homepage content, and about page
- No Drupal backend required

### Removing Demo Mode

To convert to a production app with real data:

1. Delete `lib/demo-mode.ts`
2. Delete `data/mock/` directory
3. Delete `app/components/DemoModeBanner.tsx`
4. Remove `DemoModeBanner` from `app/layout.tsx`
5. Remove demo mode checks from `app/api/graphql/route.ts`

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nextagencyio/decoupled-starter)

Set `NEXT_PUBLIC_DEMO_MODE=true` in Vercel environment variables for a demo deployment.

### Cloudflare Pages

This starter is compatible with Cloudflare Pages via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare).

```bash
# Build for Cloudflare
npm run build:cloudflare
```

Deploy the generated `.open-next/` worker with Wrangler. Configuration is in `wrangler.jsonc` and `open-next.config.ts`.

Set environment variables in the Cloudflare dashboard or `wrangler.jsonc`:
- `NEXT_PUBLIC_DRUPAL_BASE_URL` - Your Drupal backend URL
- `DRUPAL_CLIENT_ID` - OAuth client ID
- `DRUPAL_CLIENT_SECRET` - OAuth client secret
- `NEXT_PUBLIC_DEMO_MODE` - Set to `true` for a demo deployment

### Other Platforms
Works with any Node.js hosting platform that supports Next.js.

## Documentation

- [Decoupled.io Docs](https://www.decoupled.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drupal GraphQL](https://www.decoupled.io/docs/graphql)

## License

MIT
