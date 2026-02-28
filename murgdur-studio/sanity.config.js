import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import {
  HomeIcon,
  TrolleyIcon,
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
  UserIcon,
  PackageIcon,
  StackCompactIcon,
  MenuIcon,
  StarIcon,
  BlockquoteIcon,
  DashboardIcon,
  InfoOutlineIcon,
} from '@sanity/icons'

// -----------------------------------------------------------------
// SINGLETONS: only ONE document of this type may exist
// -----------------------------------------------------------------
const singletonTypes = new Set([
  'siteSettings', 'homePage', 'shopPage', 'heritagePage',
  'royalCollectionPage', 'aboutPage', 'visionPage', 'careersPage',
  'pressPage', 'storiesPage', 'contactPage', 'corporatePage',
  'vaultPage', 'footer', 'testimonials', 'newsletter', 'legacySection',
  'shopByOccasion',
])

// Helper: create a singleton document list item with fixed ID + optional icon
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
          .title('Murgdur — Content Manager')
          .items([

            // ------------------------------------------
            // ??  SITE SETTINGS  (most common admin tasks)
            // ------------------------------------------
            S.listItem()
              .title('Site Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Site Settings')
                  .items([
                    S.listItem()
                      .title('Global Settings')
                      .icon(CogIcon)
                      .child(
                        S.list()
                          .title('Global Settings — brand, contacts, SEO')
                          .items([
                            singleton(S, 'siteSettings', 'Brand, Logo & Contact Info', CogIcon),
                            singleton(S, 'footer', 'Footer Links & Social Media', MenuIcon),
                          ])
                      ),
                    S.listItem()
                      .title('Navigation & Menu')
                      .icon(MenuIcon)
                      .child(
                        // Directly open siteSettings focused on the nav group
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Navigation & Mega Menu')
                      ),
                    S.listItem()
                      .title('Announcement Bar')
                      .icon(LaunchIcon)
                      .child(
                        S.document()
                          .schemaType('siteSettings')
                          .documentId('siteSettings')
                          .title('Announcement Bar')
                      ),
                  ])
              ),

            S.divider(),

            // ------------------------------------------
            // ??  PAGES  (edit each page independently)
            // ------------------------------------------
            S.listItem()
              .title('Pages')
              .icon(DocumentTextIcon)
              .child(
                S.list()
                  .title('Website Pages — click any page to edit its content')
                  .items([

                    // --- MAIN SHOPPING PAGES ---
                    S.listItem()
                      .title('Main Shopping Pages')
                      .icon(TrolleyIcon)
                      .child(
                        S.list().title('Main Shopping Pages').items([
                          singleton(S, 'homePage',            '??  Home Page',             HomeIcon),
                          singleton(S, 'shopPage',            '???  Shop Page',              TrolleyIcon),
                          singleton(S, 'royalCollectionPage', '?  Royal Collection',       SparklesIcon),
                          singleton(S, 'vaultPage',           '??  Vault / Wishlist',       HeartIcon),
                        ])
                      ),

                    S.divider(),

                    // --- BRAND STORY PAGES ---
                    S.listItem()
                      .title('Brand Story & Identity')
                      .icon(BookIcon)
                      .child(
                        S.list().title('Brand Story & Identity').items([
                          singleton(S, 'heritagePage', '???  Heritage',  BookIcon),
                          singleton(S, 'visionPage',   '??  Vision',     BulbOutlineIcon),
                          singleton(S, 'aboutPage',    '??  About Us',   InfoOutlineIcon),
                          singleton(S, 'storiesPage',  '??  Stories',    BlockquoteIcon),
                        ])
                      ),

                    S.divider(),

                    // --- COMPANY PAGES ---
                    S.listItem()
                      .title('Company Pages')
                      .icon(UsersIcon)
                      .child(
                        S.list().title('Company Pages').items([
                          singleton(S, 'careersPage',   '??  Careers',     UserIcon),
                          singleton(S, 'pressPage',     '??  Press',        LaunchIcon),
                          singleton(S, 'contactPage',   '??  Contact',      EnvelopeIcon),
                          singleton(S, 'corporatePage', '??  Corporate',    PackageIcon),
                        ])
                      ),

                    S.divider(),

                    // --- POLICY PAGES (legal, returns, etc.) ---
                    S.documentTypeListItem('policyPage')
                      .title('??  Policy & Legal Pages')
                      .icon(ThListIcon),

                    // --- FULLY CUSTOM PAGES ---
                    S.documentTypeListItem('page')
                      .title('??  Custom Pages (page builder)')
                      .icon(DocumentTextIcon),
                  ])
              ),

            S.divider(),

            // ------------------------------------------
            // ??  HOMEPAGE SECTIONS  (blocks shown on home)
            // ------------------------------------------
            S.listItem()
              .title('Homepage Sections')
              .icon(DashboardIcon)
              .child(
                S.list()
                  .title('Homepage Sections — blocks displayed on the Home page')
                  .items([
                    singleton(S, 'testimonials',   '?  Customer Reviews (Testimonials)', StarIcon),
                    singleton(S, 'newsletter',     '??  Newsletter Sign-up Section',      EnvelopeIcon),
                    singleton(S, 'shopByOccasion', '??  Shop By Occasion Grid',           ImagesIcon),
                    singleton(S, 'legacySection',  '???  Legacy / Heritage Section',       BookIcon),
                  ])
              ),

            S.divider(),

            // ------------------------------------------
            // ???  PRODUCTS & CATALOG
            // ------------------------------------------
            S.listItem()
              .title('Products & Catalog')
              .icon(TrolleyIcon)
              .child(
                S.list()
                  .title('Products & Catalog')
                  .items([
                    S.documentTypeListItem('product')
                      .title('All Products')
                      .icon(TagIcon),
                    S.documentTypeListItem('collection')
                      .title('Collections (curated groups)')
                      .icon(StackCompactIcon),
                  ])
              ),

            S.divider(),

            // ------------------------------------------
            // ??  ORDERS & CUSTOMERS
            // ------------------------------------------
            S.listItem()
              .title('Orders & Customers')
              .icon(UsersIcon)
              .child(
                S.list()
                  .title('Commerce — Orders & Customers')
                  .items([
                    S.documentTypeListItem('order')
                      .title('Orders')
                      .icon(PackageIcon),
                    S.documentTypeListItem('customer')
                      .title('Customers')
                      .icon(UserIcon),
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
