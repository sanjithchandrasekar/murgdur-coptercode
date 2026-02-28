// ─── Page Builder Section Objects ──────────────────────────────────────────
import heroSection from './objects/heroSection'
import textWithImage from './objects/textWithImage'
import productGrid from './objects/productGrid'
import videoSection from './objects/videoSection'

// ─── Reusable Sub-Object Types ──────────────────────────────────────────────
import statCard from './objects/statCard'
import coreValue from './objects/coreValue'
import timelineEntry from './objects/timelineEntry'
import teamMember from './objects/teamMember'
import pressRelease from './objects/pressRelease'
import jobPosting from './objects/jobPosting'
import storyItem from './objects/storyItem'
import testimonialItem from './objects/testimonialItem'
import partnerItem from './objects/partnerItem'
import awardItem from './objects/awardItem'

// ─── Catalog (Core Commerce Documents) ─────────────────────────────────────
import product from './product'
import collection from './collection'

// ─── Global Site Settings ───────────────────────────────────────────────────
import siteSettings from './siteSettings'
import footer from './footer'

// ─── Global Reusable Content Sections ──────────────────────────────────────
import testimonials from './testimonials'
import newsletter from './newsletter'
import shopByOccasion from './shopByOccasion'
import legacySection from './legacySection'

// ─── Main Page Documents (Singletons) ──────────────────────────────────────
import homePage from './homePage'
import shopPage from './shopPage'
import heritagePage from './heritagePage'
import royalCollectionPage from './royalCollectionPage'
import vaultPage from './vaultPage'

// ─── Company Page Documents (Singletons) ────────────────────────────────────
import aboutPage from './aboutPage'
import visionPage from './visionPage'
import careersPage from './careersPage'
import pressPage from './pressPage'
import storiesPage from './storiesPage'
import contactPage from './contactPage'
import corporatePage from './corporatePage'

// ─── Multi-Instance Page Documents ─────────────────────────────────────────
import policyPage from './policyPage'
import page from './page'

// ─── Commerce (Orders & Customers) ─────────────────────────────────────────
import customer from './customer'
import order from './order'

export const schemaTypes = [
    // ── Page Builder Section Objects (registered so pageBuilder arrays work) ──
    heroSection,
    textWithImage,
    productGrid,
    videoSection,

    // ── Reusable Sub-Object Types ────────────────────────────────────────────
    statCard,
    coreValue,
    timelineEntry,
    teamMember,
    pressRelease,
    jobPosting,
    storyItem,
    testimonialItem,
    partnerItem,
    awardItem,

    // ── Catalog ──────────────────────────────────────────────────────────────
    product,
    collection,

    // ── Global Settings ──────────────────────────────────────────────────────
    siteSettings,
    footer,

    // ── Global Content Sections ──────────────────────────────────────────────
    testimonials,
    newsletter,
    shopByOccasion,
    legacySection,

    // ── Main Pages (Singletons) ──────────────────────────────────────────────
    homePage,
    shopPage,
    heritagePage,
    royalCollectionPage,
    vaultPage,

    // ── Company Pages (Singletons) ───────────────────────────────────────────
    aboutPage,
    visionPage,
    careersPage,
    pressPage,
    storiesPage,
    contactPage,
    corporatePage,

    // ── Multi-Instance Pages ─────────────────────────────────────────────────
    policyPage,
    page,

    // ── Commerce ─────────────────────────────────────────────────────────────
    customer,
    order,
]
