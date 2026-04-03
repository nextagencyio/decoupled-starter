import { test, expect } from '@playwright/test'

test.describe('decoupled-starter (non-demo mode)', () => {
  test('homepage loads with CMS content', async ({ page }) => {
    await page.goto('/')
    // Verify hero section from Drupal homepage node
    await expect(page.locator('body')).toContainText('Build Modern Web Experiences')
    await expect(page.locator('body')).toContainText('Powered by Drupal + Next.js')
  })

  test('homepage features section renders paragraphs', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Why Decoupled?')
    await expect(page.locator('body')).toContainText('Powerful CMS')
    await expect(page.locator('body')).toContainText('Lightning Fast')
  })

  test('homepage CTA section renders', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('body')).toContainText('Ready to Get Started?')
    await expect(page.locator('body')).toContainText('View Articles')
  })

  test('articles listing page loads', async ({ page }) => {
    await page.goto('/articles')
    await expect(page).toHaveTitle(/Articles/)
    await expect(page.locator('body')).toContainText('Welcome to Decoupled Drupal')
  })

  test('article detail page loads via path alias', async ({ page }) => {
    await page.goto('/welcome-decoupled-drupal')
    await expect(page.locator('body')).toContainText('Welcome to Decoupled Drupal')
  })

  test('about page loads via path alias', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('body')).toContainText('About Us')
  })

  test('navigation header is present', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
  })
})
