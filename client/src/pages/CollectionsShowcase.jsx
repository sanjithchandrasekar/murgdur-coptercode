import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { categories } from "../data/productsCollection";

const CollectionsShowcase = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-black">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Our Collections | Luxuria Royal - Premium Luxury Collections</title>
        <meta
          name="description"
          content="Browse our exclusive luxury collections featuring women's handbags, dresses, men's shoes, watches, fragrances, and more at Luxuria Royal."
        />
        <meta
          name="keywords"
          content="luxury collections, designer bags, luxury dresses, premium shoes, exclusive accessories"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Collections | Luxuria Royal" />
        <meta
          property="og:description"
          content="Discover our curated luxury collections with authentic premium products."
        />
      </Helmet>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-b from-gray-900 to-black border-b border-royal-gold/20">
        <div className="absolute inset-0 opacity-40">
          <img
            src="/images/women dress/womendress1.png"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif text-royal-gold mb-4">
              Our Collections
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our curated selection of luxury products crafted for the discerning taste
            </p>
          </div>
        </div>
      </div>

      {/* Main Collections Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Featured Collection (Large) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link
            to="/collections?cat=women"
            className="group block relative overflow-hidden rounded-lg border border-royal-gold/20 hover:border-royal-gold/60 transition-all duration-300"
          >
            <div className="relative h-96 overflow-hidden bg-gray-900">
              <img
                src="/images/women dress/womendress1.png"
                alt="Women's Collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-4xl font-serif text-white mb-2">
                  Women's Collection
                </h2>
                <p className="text-gray-300 mb-4">
                  Elegant dresses, premium handbags, and luxury accessories
                </p>
                <div className="flex items-center gap-2 text-royal-gold group-hover:gap-4 transition-all">
                  <span>Explore Collection</span>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={`/collections?cat=${category.name.toLowerCase().replace(/['&\s]/g, "")}`}
                className="group block relative overflow-hidden rounded-lg border border-royal-gold/20 hover:border-royal-gold/60 transition-all duration-300 h-64"
              >
                {/* Image */}
                <div className="relative h-full overflow-hidden bg-gray-900">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-2xl font-serif text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {category.count} {category.count === 1 ? "item" : "items"}
                  </p>
                  <div className="flex items-center gap-2 text-royal-gold transform group-hover:translate-x-2 transition-all">
                    <span className="text-sm">Shop Now</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-b border-royal-gold/20"
        >
          <div className="text-center space-y-3">
            <div className="text-4xl text-royal-gold">✓</div>
            <h3 className="font-serif text-white text-lg">Premium Quality</h3>
            <p className="text-gray-400 text-sm">
              Carefully curated luxury items from the finest craftsmen
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl text-royal-gold">✓</div>
            <h3 className="font-serif text-white text-lg">Authentic Products</h3>
            <p className="text-gray-400 text-sm">
              100% genuine items with complete authenticity guarantee
            </p>
          </div>
          <div className="text-center space-y-3">
            <div className="text-4xl text-royal-gold">✓</div>
            <h3 className="font-serif text-white text-lg">Exclusive Selection</h3>
            <p className="text-gray-400 text-sm">
              Limited edition pieces available only at Luxuria Royal
            </p>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 bg-gradient-to-r from-gray-950 via-black to-gray-950 border-t border-royal-gold/20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white">
            Ready to Explore Luxury?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse our complete collection and discover the perfect luxury items to elevate your lifestyle
          </p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 px-8 py-3 bg-royal-gold text-black font-semibold rounded hover:bg-white transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionsShowcase;
