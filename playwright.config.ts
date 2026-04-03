import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3099',
    headless: true,
  },
  webServer: {
    command: 'NODE_TLS_REJECT_UNAUTHORIZED=0 npx next dev --port 3099',
    port: 3099,
    timeout: 30000,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
})
