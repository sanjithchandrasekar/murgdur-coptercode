import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { products as staticProducts } from "../data/products";

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
const PROJECT_ID = "qbaw2yts";
const HARDCODED_TOKEN =
  "skhKjccyqXjuBAOwCUYHvUXFMKSrgbVlfIIQR0pPDsUGsyTYj3UGRlaWTsn6D8RpKcZ9N4ot6VHw82CEGClEpISRlgXsYqsdHLGue9NKmhDQ3N6DySir23xyLwa7AFLUcxX1S8cGphK03p2vEpynuI0yZhkHf98AS8E8XmUHyKI6R0d9wHNL";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: "production",
  useCdn: false, // disabled to avoid stale cache after publish/unpublish
  apiVersion: "2024-01-22",
  token: HARDCODED_TOKEN || import.meta.env.VITE_SANITY_TOKEN || "",
  ignoreBrowserTokenWarning: true,
});

// ------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return undefined;
  return builder.image(source);
};

const imgUrl = (ref, w = 800) =>
  ref ? `${builder.image(ref).width(w).auto("format").quality(80).url()}` : null;

// ------------------------------------------------------------------
// SITE SETTINGS & GLOBAL
// ------------------------------------------------------------------
export const fetchSiteSettings = async () => {
  try {
    const query = `*[_type == "siteSettings"][0]{
      title, tagline, logoText,
      "logo": logo.asset->url + "?auto=format&q=80",
      "favicon": favicon.asset->url,
      contactEmail, contactPhone, whatsapp, whatsappOrderMessage, address,
      social{ instagram, facebook, twitter, youtube, pinterest, linkedin },
      metaTitle, metaDescription,
      "ogImage": ogImage.asset->url,
      announcementEnabled, announcementText, announcementLink,
      announcementBgColor, announcementTextColor,
      navLinks[]{ label, href, isExternal, dropdown[]{ label, href } },
      navMenu[]{
        id, name, path,
        "image": image.asset->url + "?auto=format&q=80&w=600",
        imageSubtitle,
        subcategories[]{ name, path },
        highlights[]{ name, "image": image.asset->url + "?auto=format&q=80&w=400", path }
      },
      navSimpleLinks[]{ name, path }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchSiteSettings error:", error);
    return null;
  }
};

export const fetchFooter = async () => {
  try {
    const query = `*[_type == "footer"][0]{
      tagline, mailAddress, officeAddress,
      socialLinks{ instagram, facebook, twitter, youtube, pinterest },
      aboutLinks[]{ title, url },
      helpLinks[]{ title, url },
      shopLinks[]{ title, url },
      policyLinks[]{ title, url },
      newsletterHeading, newsletterSubtext, newsletterPlaceholder, newsletterButtonText,
      copyrightText, gstNumber, cinNumber
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchFooter error:", error);
    return null;
  }
};

export const fetchTestimonials = async () => {
  try {
    const query = `*[_type == "testimonials"][0]{
      sectionLabel, heading, subheading,
      reviews[]{
        quote, author, role, location, rating,
        "avatar": avatar.asset->url + "?auto=format&q=80&w=150"
      }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchTestimonials error:", error);
    return null;
  }
};

export const fetchNewsletter = async () => {
  try {
    const query = `*[_type == "newsletter"][0]{
      heading, subHeading, placeholder, buttonText, features, privacyText,
      "bgImage": bgImage.asset->url + "?auto=format&q=80"
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchNewsletter error:", error);
    return null;
  }
};

export const fetchLegacySection = async () => {
  try {
    const query = `*[_type == "legacySection"][0]{
      heading, subHeading, body, additionalBody,
      memoryTitle, memoryBody,
      stats[]{ number, label },
      founderQuoteBody, founderQuoteCite
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchLegacySection error:", error);
    return null;
  }
};

export const fetchShopByOccasion = async () => {
  try {
    const query = `*[_type == "shopByOccasion"][0]{
      heading, eyebrow,
      occasions[]{ name, link, "image": image.asset->url + "?auto=format&q=80&w=600" }
    }`;  
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchShopByOccasion error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// PAGE BUILDER HELPER
// ------------------------------------------------------------------
const PAGE_BUILDER_PROJECTION = `pageBuilder[]{
  _type, _key,
  _type == 'section.hero' => {
    slides[]{ title, subtitle, videoUrl, "image": image.asset->url + "?auto=format&q=80", link, ctaText }
  },
  _type == 'section.textWithImage' => {
    eyebrow, heading, hashtag, body, ctaText, ctaLink, layout,
    "image": image.asset->url + "?auto=format&q=80"
  },
  _type == 'section.productGrid' => {
    eyebrow, heading, layout,
    products[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=600", price, category }
  },
  _type == 'section.video' => { heading, videoUrl, ctaText, ctaLink }
}`;

export const fetchPage = async (slug) => {
  try {
    const query = `*[_type == "page" && slug.current == $slug][0]{ title, ${PAGE_BUILDER_PROJECTION} }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("fetchPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// HOME PAGE
// ------------------------------------------------------------------
export const fetchHomePage = async () => {
  try {
    const query = `*[_type == "homePage"][0]{
      ${PAGE_BUILDER_PROJECTION},
      heroSlides[]{ title, subtitle, videoUrl, "image": image.asset->url + "?auto=format&q=80", link, ctaText, secondaryLink, secondaryCtaText },
      promoSection{ eyebrow, hashtag, heading, ctaText, "backgroundImage": backgroundImage.asset->url + "?auto=format&q=80" },
      welcomeSection,
      videoCampaign,
      treasures[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=600", price }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchHomePage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// SHOP PAGE
// ------------------------------------------------------------------
export const fetchShopPage = async () => {
  try {
    const query = `*[_type == "shopPage"][0]{
      heroHeading, heroSubheading, heroEyebrow, heroCtaText, heroCtaLink,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      editorialBanners[]{ category, eyebrow, heading, subtext, ctaText, ctaLink, imageSide, bgColor, textColor, "image": image.asset->url + "?auto=format&q=80" },
      categoryConfig[]{ label, value, isActive },
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchShopPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// PRODUCTS
// ------------------------------------------------------------------
export const fetchProducts = async () => {
  if (!PROJECT_ID || PROJECT_ID === "YOUR_PROJECT_ID") {
    return Promise.resolve(staticProducts);
  }
  try {
    const query = `*[_type == "product" && !(_id in path("drafts.**"))] | order(_createdAt desc){
      _id, name, "slug": slug.current,
      price, originalPrice, description,
      category, type, tags, featured,
      "image": mainImage.asset->url + "?auto=format&q=80&w=800",
      "images": images[].asset->url,
      sizes,
      colors[]{ name, hex },
      rating, reviews, stock, sku, productId,
      isNew, onSale, fabric, care,
      details,
      relatedProducts[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=400", price }
    }`;
    const sanityProducts = await client.fetch(query);

    if (!sanityProducts || sanityProducts.length === 0) {
      console.warn("No products in Sanity. Using static fallback.");
      return staticProducts.map((p, idx) => ({
        ...p,
        productId: p.productId || `MURG-${String(p.id || idx + 1).padStart(4, "0")}`,
      }));
    }

    const seen = new Set();
    return sanityProducts
      .map((p, idx) => ({
        ...p,
        id: p._id,
        productId: p.productId || `MURG-${String(idx + 1).padStart(4, "0")}`,
        colors: Array.isArray(p.colors)
          ? p.colors.map((c) => (typeof c === "object" && c.hex ? c.hex : c))
          : p.colors,
      }))
      .filter((p) => {
        const key = `${(p.name || "").toLowerCase().trim()}|${p.price}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  } catch (error) {
    console.error("fetchProducts error â†’ fallback:", error);
    return staticProducts;
  }
};

export const fetchProductBySlugOrId = async (slugOrId) => {
  try {
    const query = `*[_type == "product" && !(_id in path("drafts.**")) && (slug.current == $id || _id == $id)][0]{
      _id, name, "slug": slug.current,
      price, originalPrice, description,
      category, type, tags, featured,
      "image": mainImage.asset->url + "?auto=format&q=80&w=1200",
      "images": images[].asset->url,
      sizes, colors[]{ name, hex },
      rating, reviews, stock, sku, productId,
      isNew, onSale, fabric, care, details,
      relatedProducts[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=400", price, category }
    }`;
    return await client.fetch(query, { id: slugOrId });
  } catch (error) {
    console.error("fetchProductBySlugOrId error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// COLLECTIONS
// ------------------------------------------------------------------
export const fetchCollections = async () => {
  try {
    const query = `*[_type == "collection"] | order(order asc){
      _id, title, "slug": slug.current,
      description, category, isFeatured, order,
      "coverImage": coverImage.asset->url + "?auto=format&q=80&w=800",
      "productCount": count(products)
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchCollections error:", error);
    return [];
  }
};

export const fetchCollectionBySlug = async (slug) => {
  try {
    const query = `*[_type == "collection" && slug.current == $slug][0]{
      _id, title, "slug": slug.current, description, category,
      "coverImage": coverImage.asset->url + "?auto=format&q=80",
      products[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=600", price, originalPrice, category, type, rating }
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("fetchCollectionBySlug error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// HERITAGE PAGE
// ------------------------------------------------------------------
export const fetchHeritagePage = async () => {
  try {
    const query = `*[_type == "heritagePage"][0]{
      heroHeading, heroSubheading, heroEyebrow,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      contentHeading,
      contentBody,
      "contentImage": contentImage.asset->url + "?auto=format&q=80",
      founderHeading, founderName, founderTitle, founderBio, founderBio2, founderBio3, founderQuote,
      "founderImage": founderImage.asset->url + "?auto=format&q=80&w=600",
      timelineHeading,
      timeline[]{ year, title, description, "image": image.asset->url + "?auto=format&q=80&w=600" },
      craftHeading, craftSubtext,
      craftFeatures[]{ icon, title, description },
      galleryHeading,
      "galleryImages": galleryImages[].asset->url,
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchHeritagePage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// ROYAL COLLECTION PAGE
// ------------------------------------------------------------------
export const fetchRoyalCollectionPage = async () => {
  try {
    const query = `*[_type == "royalCollectionPage"][0]{
      ...,
      menSection{ ..., "image": image.asset->url + "?auto=format&q=80",
        featuredProducts[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=600", price }
      },
      womenSection{ ..., "image": image.asset->url + "?auto=format&q=80",
        featuredProducts[]->{ _id, name, "slug": slug.current, "image": mainImage.asset->url + "?auto=format&q=80&w=600", price }
      },
      conciergeSection{ ..., "image": image.asset->url + "?auto=format&q=80" },
      occasions[]{ ..., "image": image.asset->url + "?auto=format&q=80&w=600" }
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchRoyalCollectionPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// ABOUT PAGE
// ------------------------------------------------------------------
export const fetchAboutPage = async () => {
  try {
    const query = `*[_type == "aboutPage"][0]{
      heroHeading, heroSubheading, heroEyebrow,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",

      impactStatsHeading,
      impactStats[]{ number, label, description },

      shapingFutureSection{
        eyebrow, heading, body, ctaText, ctaLink,
        "image": image.asset->url + "?auto=format&q=80"
      },
      aboutPurpose{
        heading, body,
        "image": image.asset->url + "?auto=format&q=80"
      },

      coreValuesHeading, coreValuesSubheading,
      coreValues[]{ icon, title, description },

      journeyHeading, journeySubheading,
      journeyMilestones[]{ year, title, description, "image": image.asset->url + "?auto=format&q=80&w=600" },

      industriesHeading,
      industries[]{ icon, title, description },

      scrollingBannerText,
      videoSection{ heading, videoUrl, "poster": poster.asset->url + "?auto=format&q=80" },
      "galleryImages": galleryImages[].asset->url,

      partnersHeading,
      partners[]{ name, website, "logo": logo.asset->url + "?auto=format&q=80&w=200" },
      awardsHeading,
      awards[]{ year, title, description, issuedBy, "badge": badge.asset->url + "?auto=format&q=80&w=200" },

      leadershipHeading,
      leadershipTeam[]{ name, role, bio, linkedin, "photo": photo.asset->url + "?auto=format&q=80&w=400" },
      boardHeading,
      boardMembers[]{ name, role, bio, linkedin, "photo": photo.asset->url + "?auto=format&q=80&w=400" },

      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchAboutPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// VISION PAGE
// ------------------------------------------------------------------
export const fetchVisionPage = async () => {
  try {
    const query = `*[_type == "visionPage"][0]{
      eyebrow, heading,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      statement, statementSubtext,
      pillarsHeading,
      pillars[]{ icon, title, description },
      futureHeading, futureBody,
      futureRoadmap[]{ year, milestone },
      "bottomImage": bottomImage.asset->url + "?auto=format&q=80",
      bottomCaption,
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchVisionPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// CAREERS PAGE
// ------------------------------------------------------------------
export const fetchCareersPage = async () => {
  try {
    const query = `*[_type == "careersPage"][0]{
      heroEyebrow, heading, intro,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      cultureHeading,
      cultureValues[]{ icon, title, description },
      openingsHeading,
      positions[]{ role, location, type, description, applyLink, isActive },
      contactText, contactEmail,
      perksHeading, perks[],
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchCareersPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// PRESS PAGE
// ------------------------------------------------------------------
export const fetchPressPage = async () => {
  try {
    const query = `*[_type == "pressPage"][0]{
      heading, eyebrow, intro,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      featuredInHeading, featuredInOutlets[],
      releasesHeading,
      releases[]{ date, title, summary, pdfUrl, "image": image.asset->url + "?auto=format&q=80&w=400" },
      mediaKitHeading, mediaKitText, mediaContactEmail, mediaContactPhone,
      downloadableAssets[]{ label, fileUrl },
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchPressPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// STORIES PAGE
// ------------------------------------------------------------------
export const fetchStoriesPage = async () => {
  try {
    const query = `*[_type == "storiesPage"][0]{
      heading, eyebrow, intro, subheading,
      featuredStory{ category, title, description, readMoreLink, "image": image.asset->url + "?auto=format&q=80" },
      stories[]{ category, title, description, readMoreLink, "image": image.asset->url + "?auto=format&q=80&w=800" },
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchStoriesPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// CONTACT PAGE
// ------------------------------------------------------------------
export const fetchContactPage = async () => {
  try {
    const query = `*[_type == "contactPage"][0]{
      eyebrow, heading, intro,
      "heroBgImage": heroBgImage.asset->url + "?auto=format&q=80",
      phone, email, hours, address, mapEmbedUrl,
      socialLinks{ instagram, facebook, twitter, youtube, whatsapp },
      formHeading, formSubtext, formRecipientEmail,
      stores[]{ name, address, phone, hours, mapUrl },
      seoTitle, seoDescription
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchContactPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// CORPORATE PAGE
// ------------------------------------------------------------------
export const fetchCorporatePage = async () => {
  try {
    const query = `*[_type == "corporatePage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchCorporatePage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// VAULT PAGE
// ------------------------------------------------------------------
export const fetchVaultPage = async () => {
  try {
    const query = `*[_type == "vaultPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("fetchVaultPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// POLICY PAGE (by slug)
// ------------------------------------------------------------------
export const fetchPolicyPage = async (slug) => {
  try {
    const query = `*[_type == "policyPage" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("fetchPolicyPage error:", error);
    return null;
  }
};

// ------------------------------------------------------------------
// ORDERS & CUSTOMERS
// ------------------------------------------------------------------
export const createOrder = async (orderData) => {
  try {
    return await client.create({ _type: "order", ...orderData });
  } catch (error) {
    console.error("createOrder error:", error);
    return null;
  }
};

export const fetchCustomerOrders = async (customerEmail) => {
  try {
    const query = `*[_type == "order" && customer->email == $email] | order(createdAt desc){
      _id, orderNumber, items[], totalAmount, status, shippingAddress, paymentMethod, createdAt
    }`;
    return await client.fetch(query, { email: customerEmail });
  } catch (error) {
    console.error("fetchCustomerOrders error:", error);
    return [];
  }
};

export const updateCustomerData = async (customerId, data) => {
  try {
    return await client.patch(customerId).set(data).commit();
  } catch (error) {
    console.error("updateCustomerData error:", error);
    return null;
  }
};
