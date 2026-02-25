import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import {
  HomeIcon,
  ShoppingCartIcon,
  ImagesIcon,
  CogIcon,
  UsersIcon,
  DocumentTextIcon,
  TagIcon,
  SparklesIcon,
  HeartIcon,
  EnvelopeIcon,
  BookIcon,
  LaunchIcon,
  BulbOutlineIcon,
  ThListIcon,
  TrolleyIcon,
  UserIcon,
  PackageIcon,
  StackCompactIcon,
  MenuIcon,
  StarIcon,
  BlockquoteIcon,
  DashboardIcon,
  InfoOutlineIcon,
} from '@sanity/icons'

// Singletons: only one document of this type may exist
const singletonTypes = new Set([
  'siteSettings', 'homePage', 'shopPage', 'heritagePage',
  'royalCollectionPage', 'aboutPage', 'visionPage', 'careersPage',
  'pressPage', 'storiesPage', 'contactPage', 'corporatePage',
  'vaultPage', 'footer', 'testimonials', 'newsletter', 'legacySection',
  'shopByOccasion',
])

// Helper: create singleton list item with fixed documentId + optional icon
const singleton = (S, schemaType, title, icon) => {
  const item = S.listItem()
    .title(title)
    .schemaType(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))
  return icon ? item.icon(icon) : item
}

export default defineConfig({
  name: 'default',
  title: 'Murgdur Studio',
  projectId: 'qbaw2yts',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Murgdur CMS')
          .items([

            // PAGES
            S.listItem()
              .title('Pages')
              .icon(DocumentTextIcon)
              .child(
                S.list()
                  .title('Website Pages')
                  .items([
                    S.listItem()
                      .title('Main Pages')
                      .icon(DashboardIcon)
                      .child(
                        S.list().title('Main Pages').items([
                          singleton(S, 'homePage',            'Home',             HomeIcon),
                          singleton(S, 'shopPage',            'Shop',             ShoppingCartIcon),
                          singleton(S, 'heritagePage',        'Heritage',         BookIcon),
                          singleton(S, 'royalCollectionPage', 'Royal Collection', SparklesIcon),
                          singleton(S, 'vaultPage',           'Vault / Wishlist', HeartIcon),
                        ])
                      ),
                    S.listItem()
                      .title('Company Pages')
                      .icon(UsersIcon)
                      .child(
                        S.list().title('Company Pages').items([
                          singleton(S, 'aboutPage',     'About Us',      InfoOutlineIcon),
                          singleton(S, 'visionPage',    'Vision',        BulbOutlineIcon),
                          singleton(S, 'careersPage',   'Careers',       UserIcon),
                          singleton(S, 'pressPage',     'Press',         LaunchIcon),
                          singleton(S, 'storiesPage',   'Stories',       BlockquoteIcon),
                          singleton(S, 'contactPage',   'Contact',       EnvelopeIcon),
                          singleton(S, 'corporatePage', 'Corporate',     PackageIcon),
                        ])
                      ),
                    S.divider(),
                    S.documentTypeListItem('policyPage')
                      .title('Policy & Info Pages')
                      .icon(ThListIcon),
                  ])
              ),

            S.divider(),

            // PRODUCTS & CATALOG
            S.listItem()
              .title('Products & Catalog')
              .icon(TrolleyIcon)
              .child(
                S.list().title('Products & Catalog').items([
                  S.documentTypeListItem('product').title('All Products').icon(TagIcon),
                  S.documentTypeListItem('collection').title('Collections').icon(StackCompactIcon),
                ])
              ),

            S.divider(),

            // GLOBAL CONTENT
            S.listItem()
              .title('Global Content')
              .icon(ImagesIcon)
              .child(
                S.list().title('Global Content — shown across all pages').items([
                  singleton(S, 'testimonials',   'Testimonials',          StarIcon),
                  singleton(S, 'newsletter',     'Newsletter Section',    EnvelopeIcon),
                  singleton(S, 'shopByOccasion', 'Shop By Occasion',      ImagesIcon),
                  singleton(S, 'legacySection',  'Legacy Section (Home)', BookIcon),
                ])
              ),

            S.divider(),

            // SITE SETTINGS
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.list().title('Site Settings').items([
                  singleton(S, 'siteSettings', 'Global Settings', CogIcon),
                  singleton(S, 'footer',        'Footer',          MenuIcon),
                ])
              ),

            S.divider(),

            // ORDERS & CUSTOMERS
            S.listItem()
              .title('Orders & Customers')
              .icon(UsersIcon)
              .child(
                S.list().title('Commerce').items([
                  S.documentTypeListItem('order').title('Orders').icon(PackageIcon),
                  S.documentTypeListItem('customer').title('Customers').icon(UserIcon),
                ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((t) => !singletonTypes.has(t.schemaType))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) =>
          !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return prev
    },
  },
})
