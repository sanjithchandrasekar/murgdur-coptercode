const express = require('express');
const router = express.Router();
const sanityClient = require('../config/sanity');
const { default: imageUrlBuilder } = require('@sanity/image-url');

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

// Get all categories
router.get('/', async (req, res) => {
  try {
    const query = '*[_type == "category"] | order(name asc)';
    const categories = await sanityClient.fetch(query);
    
    const categoriesWithImages = categories.map(category => ({
      ...category,
      image: category.image ? urlFor(category.image).url() : null,
    }));
    
    res.json(categoriesWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const query = `*[_type == "category" && slug.current == $slug][0]`;
    const category = await sanityClient.fetch(query, { slug: req.params.slug });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const categoryWithImage = {
      ...category,
      image: category.image ? urlFor(category.image).url() : null,
    };
    
    res.json(categoryWithImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
