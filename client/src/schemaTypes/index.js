import product from './product'
import collection from './collection'
import siteSettings from './siteSettings'
import homePage from './homePage'
import shopPage from './shopPage'
import heritagePage from './heritagePage'
import royalCollectionPage from './royalCollectionPage'
import footer from './footer'
import testimonials from './testimonials'
import legacySection from './legacySection'
import newsletter from './newsletter'
import shopByOccasion from './shopByOccasion'
import aboutPage from './aboutPage'
import careersPage from './careersPage'
import contactPage from './contactPage'
import corporatePage from './corporatePage'
import pressPage from './pressPage'
import storiesPage from './storiesPage'
import visionPage from './visionPage'
import vaultPage from './vaultPage'
import policyPage from './policyPage'

import customer from './customer'
import order from './order'

// Page Builder Sections
import heroSection from './objects/heroSection'
import textWithImage from './objects/textWithImage'
import productGrid from './objects/productGrid'
import videoSection from './objects/videoSection'

// Reusable Object Types
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

import page from './page'

export const schemaTypes = [
    // --- Reusable Objects ---
    heroSection,
    textWithImage,
    productGrid,
    videoSection,
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

    // --- Core Documents ---
    page,
    product,
    collection,

    // --- Global Settings ---
    siteSettings,
    footer,
    testimonials,
    newsletter,

    // --- Page Documents ---
    homePage,
    shopPage,
    heritagePage,
    royalCollectionPage,
    aboutPage,
    visionPage,
    careersPage,
    pressPage,
    storiesPage,
    contactPage,
    corporatePage,
    vaultPage,
    policyPage,

    // --- Legacy Sections ---
    legacySection,
    shopByOccasion,

    // --- Commerce ---
    customer,
    order
]
