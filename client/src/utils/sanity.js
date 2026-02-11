import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { products as staticProducts } from '../data/products';

// ------------------------------------------------------------------
// CONFIGURATION
// ------------------------------------------------------------------
const PROJECT_ID = 'qbaw2yts';

// Hardcoded Token as Fallback because Environment Variable is failing
const HARDCODED_TOKEN = "skhKjccyqXjuBAOwCUYHvUXFMKSrgbVlfIIQR0pPDsUGsyTYj3UGRlaWTsn6D8RpKcZ9N4ot6VHw82CEGClEpISRlgXsYqsdHLGue9NKmhDQ3N6DySir23xyLwa7AFLUcxX1S8cGphK03p2vEpynuI0yZhkHf98AS8E8XmUHyKI6R0d9wHNL";

export const client = createClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-22',
  token: HARDCODED_TOKEN || import.meta.env.VITE_SANITY_TOKEN || '', // Use Hardcoded first
  ignoreBrowserTokenWarning: true // Suppress token warnings in browser
});
/*
if (!import.meta.env.VITE_SANITY_TOKEN) {
  console.warn("VITE_SANITY_TOKEN is not set. Sign Up and other write operations will fail/fallback to local mode.");
}
*/

// ------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return undefined;
  return builder.image(source);
};

// ------------------------------------------------------------------
// DATA FETCHING
// ------------------------------------------------------------------

export const fetchSiteSettings = async () => {
  try {
    const query = `*[_type == "siteSettings"][0]{
        title,
        "logo": logo.asset->url + "?auto=format&q=80",
        contactEmail,
        contactPhone
      }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return null;
  }
};

export const fetchHomePage = async () => {
  try {
    const query = `*[_type == "homePage"][0]{
            heroSlides[]{
                title,
                subtitle,
                videoUrl,
                "image": image.asset->url + "?auto=format&q=80",
                link
            },
            promoSection {
                eyebrow,
                hashtag,
                heading,
                ctaText,
                "backgroundImage": backgroundImage.asset->url + "?auto=format&q=80"
            },
            welcomeSection,
            videoCampaign,
            treasures[]->{
                _id,
                name,
                "slug": slug.current,
                "image": mainImage.asset->url + "?auto=format&q=80&w=600",
                price
            }
        }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch home page data:", error);
    return null;
  }
};

export const fetchHeritagePage = async () => {
  try {
    const query = `*[_type == "heritagePage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch heritage page data:", error);
    return null;
  }
};

export const fetchRoyalCollectionPage = async () => {
  try {
    const query = `*[_type == "royalCollectionPage"][0]{
            ...,
            menSection {
                ...,
                "image": image.asset->url + "?auto=format&q=80",
                featuredProducts[]->{
                     _id,
                     name,
                     "slug": slug.current,
                     "image": mainImage.asset->url + "?auto=format&q=80&w=600",
                     price
                }
            },
            womenSection {
                ...,
                "image": image.asset->url + "?auto=format&q=80",
                 featuredProducts[]->{
                     _id,
                     name,
                     "slug": slug.current,
                     "image": mainImage.asset->url + "?auto=format&q=80&w=600",
                     price
                }
            },
            conciergeSection {
                ...,
                "image": image.asset->url + "?auto=format&q=80"
            },
             occasions[]{
                ...,
                "image": image.asset->url + "?auto=format&q=80&w=600"
            }
        }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch royal collection page data:", error);
    return null;
  }
};

export const fetchFooter = async () => {
  try {
    const query = `*[_type == "footer"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return null;
  }
};

export const fetchTestimonials = async () => {
  try {
    const query = `*[_type == "testimonials"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch testimonials data:", error);
    return null;
  }
};

export const fetchLegacySection = async () => {
  try {
    const query = `*[_type == "legacySection"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch legacy section data:", error);
    return null;
  }
};

export const fetchNewsletter = async () => {
  try {
    const query = `*[_type == "newsletter"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch newsletter data:", error);
    return null;
  }
};

export const fetchShopByOccasion = async () => {
  try {
    const query = `*[_type == "shopByOccasion"][0]{
            ...,
            occasions[]{
                ...,
                "image": image.asset->url + "?auto=format&q=80&w=600"
            }
        }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch shop by occasion data:", error);
    return null;
  }
};

export const fetchAboutPage = async () => {
  try {
    const query = `*[_type == "aboutPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch about page data:", error);
    return null;
  }
};

export const fetchCareersPage = async () => {
  try {
    const query = `*[_type == "careersPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch careers page data:", error);
    return null;
  }
};

export const fetchContactPage = async () => {
  try {
    const query = `*[_type == "contactPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch contact page data:", error);
    return null;
  }
};

export const fetchCorporatePage = async () => {
  try {
    const query = `*[_type == "corporatePage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch corporate page data:", error);
    return null;
  }
};

export const fetchPressPage = async () => {
  try {
    const query = `*[_type == "pressPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch press page data:", error);
    return null;
  }
};

export const fetchStoriesPage = async () => {
  try {
    const query = `*[_type == "storiesPage"][0]{
            ...,
            stories[]{
                ...,
                "image": image.asset->url + "?auto=format&q=80"
            }
        }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch stories page data:", error);
    return null;
  }
};

export const fetchVisionPage = async () => {
  try {
    const query = `*[_type == "visionPage"][0]{
            ...,
            "bottomImage": bottomImage.asset->url + "?auto=format&q=80"
        }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch vision page data:", error);
    return null;
  }
};

export const fetchVaultPage = async () => {
  try {
    const query = `*[_type == "vaultPage"][0]`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Failed to fetch vault page data:", error);
    return null;
  }
};

export const fetchPolicyPage = async (slug) => {
  try {
    const query = `*[_type == "policyPage" && slug.current == $slug][0]`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Failed to fetch policy page data:", error);
    return null;
  }
};

/**
 * Fetches products from Sanity.
 * FALLBACK: If Sanity is not configured (no Project ID) or fails,
 * it returns the static data from your local file.
 */
export const fetchProducts = async () => {
  // If no project ID is set, or it's the default placeholder, fallback immediately
  if (!PROJECT_ID || PROJECT_ID === 'YOUR_PROJECT_ID') {
    console.warn("Sanity Project ID not set. Using static data.");
    return Promise.resolve(staticProducts);
  }

  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      "slug": slug.current,
      price,
      originalPrice,
      description,
      category,
      type,
      "image": mainImage.asset->url + "?auto=format&q=80&w=800",
      "images": images[].asset->url,
      sizes,
      colors,
      rating,
      reviews
    }`;

    const sanityProducts = await client.fetch(query);

    if (!sanityProducts || sanityProducts.length === 0) {
      console.warn("No products found in Sanity. Using static data.");
      return staticProducts;
    }

    // Map Sanity results to match your app's internal structure
    const mappedSanityProducts = sanityProducts.map(p => ({
      ...p,
      id: p._id, // Use Sanity's unique _id as the id
      // Ensure colors are strings (hex codes) if they are objects from Sanity schema
      colors: Array.isArray(p.colors)
        ? p.colors.map(c => (typeof c === 'object' && c.hex ? c.hex : c))
        : p.colors
    }));

    // Return only Sanity products to verify integration
    return mappedSanityProducts;

  } catch (error) {
    console.error("Failed to fetch from Sanity:", error);
    console.warn("Falling back to static data.");
    return staticProducts;
  }
};
