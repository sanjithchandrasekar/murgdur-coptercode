import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// 1. Run `npm install @sanity/client @sanity/image-url` in your client folder

export const client = createClient({
    projectId: 'YOUR_PROJECT_ID', // Find this in sanity.json or manage.sanity.io
    dataset: 'production', // Or your custom dataset name
    useCdn: true, // `false` if you want to ensure fresh data
    apiVersion: '2024-01-22', // Use current date
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// Helper to fetch all products
export const fetchProducts = async () => {
    const query = `*[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    price,
    originalPrice,
    description,
    category,
    type,
    "image": mainImage.asset->url,
    "images": images[].asset->url,
    sizes,
    colors,
    rating,
    reviews
  }`;
    const products = await client.fetch(query);
    return products;
};
