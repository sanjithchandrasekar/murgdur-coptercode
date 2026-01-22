const express = require('express');
const router = express.Router();
const sanityClient = require('../config/sanity');
const { default: imageUrlBuilder } = require('@sanity/image-url');

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

// Get all products
router.get('/', async (req, res) => {
  try {
    const query = '*[_type == "product"] | order(_createdAt desc)';
    const products = await sanityClient.fetch(query);
    
    const productsWithImages = products.map(product => ({
      ...product,
      images: product.images?.map(img => urlFor(img).url()) || [],
      image: product.images?.[0] ? urlFor(product.images[0]).url() : null,
    }));
    
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by slug
router.get('/:slug', async (req, res) => {
  try {
    const query = `*[_type == "product" && slug.current == $slug][0]`;
    const product = await sanityClient.fetch(query, { slug: req.params.slug });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const productWithImages = {
      ...product,
      images: product.images?.map(img => urlFor(img).url()) || [],
      image: product.images?.[0] ? urlFor(product.images[0]).url() : null,
    };
    
    res.json(productWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const query = `*[_type == "product" && category == $category] | order(_createdAt desc)`;
    const products = await sanityClient.fetch(query, { category: req.params.category });
    
    const productsWithImages = products.map(product => ({
      ...product,
      images: product.images?.map(img => urlFor(img).url()) || [],
      image: product.images?.[0] ? urlFor(product.images[0]).url() : null,
    }));
    
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products by type
router.get('/type/:type', async (req, res) => {
  try {
    const query = `*[_type == "product" && type == $type] | order(_createdAt desc)`;
    const products = await sanityClient.fetch(query, { type: req.params.type });
    
    const productsWithImages = products.map(product => ({
      ...product,
      images: product.images?.map(img => urlFor(img).url()) || [],
      image: product.images?.[0] ? urlFor(product.images[0]).url() : null,
    }));
    
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured products
router.get('/featured/all', async (req, res) => {
  try {
    const query = `*[_type == "product" && featured == true] | order(_createdAt desc)`;
    const products = await sanityClient.fetch(query);
    
    const productsWithImages = products.map(product => ({
      ...product,
      images: product.images?.map(img => urlFor(img).url()) || [],
      image: product.images?.[0] ? urlFor(product.images[0]).url() : null,
    }));
    
    res.json(productsWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
