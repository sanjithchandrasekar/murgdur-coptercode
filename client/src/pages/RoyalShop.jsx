import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Filter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

// Asset Imports (Reusing available assets)
const imgHero = "/images/royal_sherwani.png"; // Placeholder for Hero
const imgClassic1 = "/images/men shoe/men formal shoe/men casual shoe1.png";
const imgClassic2 = "/images/women dress/womendress1.png";
const imgClassic3 = "/images/men watch/watch1.png";
const imgSignature1 = "/images/royal_belt.png";
const imgSignature2 = "/images/royal_wallet.png";
const imgHeritage1 = "/images/royal_saree.png";
const imgHeritage2 = "/images/royal_gown.png";
const imgLimited1 = "/images/royal_watch.png";

// Mock Data for Sub-collections
const royalClassic = [
  { id: 1, name: "Royal Oxford Loafer", price: 18500, image: imgClassic1 },
  { id: 2, name: "Emerald Evening Gown", price: 18500, image: imgClassic2 },
  { id: 3, name: "Classic Chronograph", price: 55000, image: imgClassic3 },
];

const royalSignature = [
  { id: 4, name: "Signature Leather Belt", price: 18000, image: imgSignature1 },
  { id: 5, name: "Royal Crest Wallet", price: 12500, image: imgSignature2 },
];

const royalHeritage = [
  { id: 6, name: "Banarasi Silk Saree", price: 45000, image: imgHeritage1 },
  { id: 7, name: "Embroidered Gown", price: 65000, image: imgHeritage2 },
];

const royalLimited = [
  {
    id: 8,
    name: "Limited Edition Timepiece",
    price: 85000,
    image: imgLimited1,
    badge: "Limited Edition",
  },
];

const RoyalShop = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Filter Logic (Simple implementation for demo)
  const handleFilter = (filter) => {
    setActiveFilter(filter);
    // In a real app, this would filter the grids below
  };

  return (
    <div className="bg-[#fcfbf9] text-[#19110b] font-sans selection:bg-[#D4AF37] selection:text-white min-h-screen">
      <SEO
        title="Royal Collection | Murgdur"
        description="A celebration of timeless elegance and superior craftsmanship. Explore the Royal Collection-the pinnacle of regal style."
        url="https://murugdur1.vercel.app/royal-collection"
      />

      {/* 1. PAGE TITLE & INTRO */}
      <section className="pt-32 pb-12 text-center px-4 relative max-w-[1600px] mx-auto">
        {/* Back Button */}
        <div className="absolute top-32 left-4 md:left-8 z-30">
          <BackButton className="text-[#19110b] hover:text-[#D4AF37]" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-7xl font-serif uppercase tracking-widest mb-6"
        >
          Royal Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl font-light leading-relaxed"
        >
          A celebration of timeless elegance, superior craftsmanship, and
          exclusive design. The Royal Collection embodies the pinnacle of regal
          style, curated for those who command the room.
        </motion.p>
      </section>

      {/* 2. FILTER / SORT BAR */}
      <div className="sticky top-[70px] z-30 bg-[#fcfbf9]/95 backdrop-blur-sm border-y border-[#e5e5e5]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              "All",
              "Royal Classic",
              "Royal Signature",
              "Royal Heritage",
              "Royal Limited",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilter(filter)}
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors ${activeFilter === filter
                    ? "text-black border-b border-black"
                    : "text-gray-400 hover:text-black"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] hover:text-gray-600"
            >
              Sort By <ChevronDown size={14} />
            </button>
            {isSortOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-40">
                {[
                  "Newest",
                  "Best Selling",
                  "Price: Low-High",
                  "Price: High-Low",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortOption(opt);
                      setIsSortOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. HERO VISUAL OR FEATURE STORY */}
      {/* <!-- Hero --> */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden my-8 mx-4 md:mx-8">
        <img
          src={imgHero}
          alt="Royal Collection Hero"
          className="w-full h-full object-cover object-top filter brightness-[0.8]"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-black/60 to-transparent">
          <div className="max-w-xl text-white">
            <span className="uppercase tracking-[0.2em] text-xs font-bold mb-4 block text-[#D4AF37]">
              The Inspiration
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Forged in Tradition,
              <br />
              Defined by Luxury.
            </h2>
            <div className="space-y-4 text-gray-200 font-light text-sm md:text-base leading-relaxed">
              <p>
                Drawing inspiration from the archives of the monarchy, the Royal
                Collection is a testament to the enduring power of classic
                design. Each piece tells a story of heritage and prestige.
              </p>
              <p>
                Crafted with the finest materials—pure silks, Italian leathers,
                and precious metals—every item is a masterpiece of artisanal
                skill, designed to stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT GRID & 5. SUB-COLLECTION SECTIONS */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12 space-y-24">
        {/* <!-- Royal Classic --> */}
        {(activeFilter === "All" || activeFilter === "Royal Classic") && (
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <div className="max-w-md">
                <h3 className="text-3xl font-serif mb-3">Royal Classic</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Timeless pieces that form the foundation of a regal wardrobe.
                  Understated elegance for every occasion.
                </p>
              </div>
              <Link
                to="#"
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors mt-4 md:mt-0"
              >
                View All Classics <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {royalClassic.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* <!-- Royal Signature --> */}
        {(activeFilter === "All" || activeFilter === "Royal Signature") && (
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <div className="max-w-md">
                <h3 className="text-3xl font-serif mb-3">Royal Signature</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Distinguished by our iconic motifs and uncompromising quality.
                  The definitive statement of the brand.
                </p>
              </div>
              <Link
                to="#"
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors mt-4 md:mt-0"
              >
                View All Signature <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {royalSignature.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {/* Validating layout with a placeholder if fewer items */}
              <div className="bg-gray-100 flex items-center justify-center aspect-[3/4]">
                <span className="text-gray-400 italic font-serif">
                  More Arriving Soon
                </span>
              </div>
            </div>
          </section>
        )}

        {/* <!-- Royal Heritage --> */}
        {(activeFilter === "All" || activeFilter === "Royal Heritage") && (
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <div className="max-w-md">
                <h3 className="text-3xl font-serif mb-3">Royal Heritage</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Deeply rooted in tradition, these garments pay homage to the
                  ceremonial attire of the royal courts.
                </p>
              </div>
              <Link
                to="#"
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors mt-4 md:mt-0"
              >
                View All Heritage <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {royalHeritage.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* <!-- Royal Limited --> */}
        {(activeFilter === "All" || activeFilter === "Royal Limited") && (
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
              <div className="max-w-md">
                <h3 className="text-3xl font-serif mb-3 flex items-center gap-3">
                  Royal Limited{" "}
                  <span className="text-[10px] bg-black text-white px-2 py-1 uppercase tracking-widest rounded-sm">
                    Rare
                  </span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Exclusivity defined. Small-batch productions featuring rare
                  materials and bespoke detailing. Once gone, they are gone
                  forever.
                </p>
              </div>
              <Link
                to="#"
                className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors mt-4 md:mt-0"
              >
                View All Limited <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
              {royalLimited.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 6. CALL-TO-ACTION SECTION */}
      <section className="py-24 bg-[#19110b] text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Curate Your Legacy
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Discover the pinnacle of elegance with pieces that transcend time.
            Join the select few who wear the crown.
          </p>
          <Link
            to="/shop"
            className="inline-block border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
          >
            Explore All Royal Pieces
          </Link>
        </div>
      </section>
    </div>
  );
};

// Internal Product Card
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const hasSecondImage = product.images && product.images.length > 1;

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id || product._id}`)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F5F3] mb-3">
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {product.badge}
            </span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${hasSecondImage && isHovered ? "opacity-0" : "opacity-100"}`}
          loading="lazy"
        />
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} (View 2)`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
          />
        )}
      </div>

      <div className="text-center px-2">
        <h3 className="text-[13px] font-sans tracking-wide text-black mb-1 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex justify-center items-center gap-2">
          {product.originalPrice && (
            <span className="text-[13px] font-sans text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-[13px] font-sans text-gray-500">
            ₹{(product.price || 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RoyalShop;
