#!/usr/bin/env node

/**
 * Simple test script to verify Drupal GraphQL connection.
 */

const DRUPAL_URL = 'https://g1j4fq2.decoupled.website'

async function testConnection() {
  console.log('🧪 Testing connection to Drupal GraphQL endpoint...')
  console.log(`📡 URL: ${DRUPAL_URL}/graphql\n`)

  try {
    const response = await fetch(`${DRUPAL_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            nodeArticles(first: 5) {
              nodes {
                id
                title
                path
              }
            }
          }
        `,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('❌ GraphQL Errors:', data.errors)
      return
    }

    console.log('✅ Connection successful!\n')
    console.log(`📚 Found ${data.data.nodeArticles.nodes.length} articles:\n`)
    
    data.data.nodeArticles.nodes.forEach((article, index) => {
      console.log(`  ${index + 1}. ${article.title}`)
      console.log(`     ID: ${article.id}`)
      console.log(`     Path: ${article.path}\n`)
    })

    console.log('🎉 Your Decoupled Drupal setup is working!\n')
    console.log('Next steps:')
    console.log('  1. Run: npm run dev')
    console.log('  2. Visit: http://localhost:3000/test')
    console.log('  3. Explore the sample content\n')

  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
