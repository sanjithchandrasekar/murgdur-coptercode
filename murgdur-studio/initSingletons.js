/**
 * initSingletons.js
 * Creates all singleton documents with their fixed IDs so the
 * "Cannot create a published document" Releases banner never appears.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token> node initSingletons.js
 *   -- or set the token directly below --
 */

import { createClient } from '@sanity/client'

const TOKEN = process.env.SANITY_API_TOKEN || ''

const client = createClient({
  projectId: 'qbaw2yts',
  dataset: 'production',
  useCdn: false,
  token: TOKEN,
  apiVersion: '2024-01-22',
})

// Every singleton: { _id matches documentId in sanity.config.js, _type = schemaType }
const singletons = [
  { _id: 'homePage',            _type: 'homePage',            title: 'Home Page' },
  { _id: 'shopPage',            _type: 'shopPage',            title: 'Shop Page' },
  { _id: 'heritagePage',        _type: 'heritagePage',        title: 'Heritage Page' },
  { _id: 'royalCollectionPage', _type: 'royalCollectionPage', title: 'Royal Collection Page' },
  { _id: 'aboutPage',           _type: 'aboutPage',           title: 'About Page' },
  { _id: 'visionPage',          _type: 'visionPage',          title: 'Vision Page' },
  { _id: 'careersPage',         _type: 'careersPage',         title: 'Careers Page' },
  { _id: 'pressPage',           _type: 'pressPage',           title: 'Press Page' },
  { _id: 'storiesPage',         _type: 'storiesPage',         title: 'Stories Page' },
  { _id: 'contactPage',         _type: 'contactPage',         title: 'Contact Page' },
  { _id: 'corporatePage',       _type: 'corporatePage',       title: 'Corporate Page' },
  { _id: 'vaultPage',           _type: 'vaultPage',           title: 'Vault Page' },
  { _id: 'siteSettings',        _type: 'siteSettings',        title: 'Site Settings' },
  { _id: 'footer',              _type: 'footer',              title: 'Footer' },
  { _id: 'testimonials',        _type: 'testimonials',        title: 'Testimonials' },
  { _id: 'newsletter',          _type: 'newsletter',          title: 'Newsletter Section' },
  { _id: 'shopByOccasion',      _type: 'shopByOccasion',      title: 'Shop By Occasion' },
  { _id: 'legacySection',       _type: 'legacySection',       title: 'Legacy Section' },
]

async function initSingletons() {
  if (!TOKEN) {
    console.error('ERROR: No SANITY_API_TOKEN set.')
    console.error('Run: $env:SANITY_API_TOKEN="<your-token>" && node initSingletons.js')
    console.error('Get a token from: https://sanity.io/manage → project → API → Tokens')
    process.exit(1)
  }

  console.log('Initializing singleton documents...\n')
  let created = 0, skipped = 0, failed = 0

  for (const doc of singletons) {
    try {
      // createIfNotExists: only creates if the document doesn't already exist
      const result = await client.createIfNotExists(doc)
      if (result._id === doc._id) {
        console.log(`✔ Created: ${doc.title} (${doc._id})`)
        created++
      }
    } catch (err) {
      // 409 = already exists (race condition) — treat as success
      if (err.statusCode === 409) {
        console.log(`○ Exists:  ${doc.title} (${doc._id})`)
        skipped++
      } else {
        console.error(`✖ Failed:  ${doc.title} — ${err.message}`)
        failed++
      }
    }
  }

  // Check which already existed by querying for them
  const existingIds = await client.fetch(
    `*[_id in $ids]._id`,
    { ids: singletons.map(s => s._id) }
  )
  const alreadyExisted = existingIds.filter(id => !singletons.slice(0, created).map(s => s._id).includes(id))
  skipped = alreadyExisted.length

  console.log(`\n✔ Done: ${created} created, ${skipped} already existed, ${failed} failed`)
  if (failed === 0) {
    console.log('\nAll singleton documents are ready. Reload Sanity Studio.')
  }
}

initSingletons().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
