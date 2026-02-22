import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { fetchRoyalCollectionPage, fetchProducts } from "../utils/sanity";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

// Asset Imports (Static Fallbacks)
const imgMen = "/images/boy.jpeg";
const imgWomen = "/images/girl.png";
const imgRoyalWatch = "/images/royal_watch.png";
const imgRoyalBelt = "/images/royal_belt.png";
const imgRoyalWallet = "/images/royal_wallet.png";
const imgRoyalPerfume = "/images/royal_perfume.png";
const imgRoyalSunglasses = "/images/royal_sunglasses.png";
const imgRoyalJewellery = "/images/royal_jewellery.png";
const imgRoyalSaree = "/images/royal_saree.png";
const imgRoyalSherwani = "/images/royal_sherwani.png";
const imgBag = "/images/hand bag.png";
const imgRoyalShirt = "/images/royal_shirt.png";
const imgRoyalTShirt = "/images/royal_tshirt.png";
const imgRoyalGown = "/images/royal_gown.png";

// Reusable Product Card Component
const CollectionProductCard = ({ product, badge }) => (
  <Link
    to={`/product/${product.slug || product.id}`}
    className="group block cursor-pointer"
  >
    <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-[#f6f6f6]">
      {badge && (
        <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-royal-maroon">
            {badge}
          </span>
        </div>
      )}
      <img
        src={product.image || product.img}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="text-left px-1">
      <h3 className="text-[#19110b] font-sans text-xs font-bold tracking-[0.1em] uppercase mb-1 leading-relaxed">
        {product.name}
      </h3>
      {product.price && (
        <p className="text-[#595959] text-[11px] font-medium tracking-wide">
          ₹ {product.price.toLocaleString()}
        </p>
      )}
    </div>
  </Link>
);

const RoyalCollection = () => {
  const [pageData, setPageData] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeSection, setActiveSection] = useState("men");

  useEffect(() => {
    const load = async () => {
      // 1. Try to fetch specific CMS page data
      const cmsData = await fetchRoyalCollectionPage();
      if (cmsData) setPageData(cmsData);

      // 2. Fetch ALL products for "normal product section" fallback
      const allProducts = await fetchProducts();
      if (allProducts) setProducts(allProducts);
    };
    load();
  }, []);

  // Filter products for sections
  const menProducts = products
    .filter(
      (p) =>
        p.category?.toLowerCase() === "men" ||
        p.category?.toLowerCase() === "men's" || // common variation
        (p.tags && p.tags.includes("men")),
    )
    .slice(0, 4);

  const womenProducts = products
    .filter(
      (p) =>
        p.category?.toLowerCase() === "women" ||
        p.category?.toLowerCase() === "women's" ||
        (p.tags && p.tags.includes("women")),
    )
    .slice(0, 4);

  const accessoryProducts = products
    .filter(
      (p) =>
        p.type?.toLowerCase() === "accessory" ||
        p.category?.toLowerCase() === "accessories" ||
        ["watch", "belt", "wallet", "sunglasses", "jewellery"].some((t) =>
          p.name.toLowerCase().includes(t),
        ),
    )
    .slice(0, 4);

  // Scroll Spy (Simple version)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["men", "women", "accessories", "artifacts"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop-120,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="Royal Collections | Murgdur"
        description="Explore the Royal Collections of Murgdur. From the Sovereign Men's capsule to Imperial Women's grace and Crown Jewel accessories."
        url="https://murugdur1.vercel.app/royal-collection"
      />
      {/* 1. HERO / INTRO SECTION */}
      <section className="relative h-[80vh] overflow-hidden bg-black flex items-center justify-center">
        {/* Back Button */}
        <div className="absolute top-32 left-8 z-30">
          <BackButton className="text-white hover:text-royal-gold" />
        </div>
        {/* Simplified Hero Image Background-Fixed Opacity to ensure visibility */}
        <div className="absolute inset-0 opacity-60">
          <img
            src={pageData?.menSection?.image || imgMen}
            className="w-full h-full object-cover"
            alt="Royal Collection Hero"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/80 uppercase tracking-[0.3em] text-xs font-bold block mb-6"
          >
            The Anniversary Edition
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-widest mb-8 leading-tight"
          >
            The Collections
          </motion.h1>
          <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Celebrating a legacy of sovereignty. From the archives of the
            monarchy to the forefront of modern luxury. Three exclusive capsules
            that honor our heritage.
          </p>
        </div>
      </section>

      {/* 2. STICKY FILTER MENU */}
      <div className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 transition-all shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
          <div className="flex justify-start md:justify-center min-w-max space-x-8 md:space-x-12">
            {[
              { id: "men", label: "THE ROYAL MEN" },
              { id: "women", label: "THE IMPERIAL WOMEN" },
              { id: "accessories", label: "CROWN JEWELS & OBJECTS" },
              { id: "artifacts", label: "ARTIFACTS" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors relative py-2 ${
                  activeSection === item.id
                    ? "text-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. CONTENT SECTIONS */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 bg-white">
        {/* --- SECTION 1: MEN --- */}
        <div id="men" className="mb-32 scroll-mt-40">
          <div className="flex flex-col md:flex-row gap-12 mb-16 items-center">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold block mb-4">
                Capsule I
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
                The Sovereign
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">
                Evoking the spirit of the Durban. Sharp tailoring meets heritage
                fabrics. Designed for the modern man who commands the room.
              </p>
              <Link
                to="/shop?category=men"
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                View Full Collection
              </Link>
            </div>
            <div className="w-full md:w-2/3 h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
              <img
                src={pageData?.menSection?.image || imgRoyalSherwani}
                className="w-full h-full object-cover"
                alt="Men's Capsule Story"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {/* Display Fallback Static Data OR Fetched Products */}
            {(menProducts.length > 0
              ? menProducts
              : [
                  {
                    name: "Royal Sherwani",
                    price: 45000,
                    img: imgRoyalSherwani,
                    link: "/shop?search=Sherwani",
                  },
                  {
                    name: "Velvet Bandhgala",
                    price: 28000,
                    img: imgMen,
                    link: "/shop?search=Bandhgala",
                    badge: "New Season",
                  },
                  {
                    name: "Classic Kurta",
                    price: 12000,
                    img: imgRoyalShirt,
                    link: "/shop?search=Kurta",
                  },
                  {
                    name: "Silk Stole",
                    price: 8500,
                    img: imgRoyalTShirt,
                    link: "/shop?search=Stole",
                  },
                ]
            ).map((p, i) => (
              <CollectionProductCard key={i} product={p} badge={p.badge} />
            ))}
            {menProducts.length === 0 && products.length > 0 && (
              <div className="col-span-full text-center py-10 text-gray-400 italic">
                Loading Men's Collection...
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 2: WOMEN --- */}
        <div id="women" className="mb-32 scroll-mt-40">
          <div className="flex flex-col md:flex-row-reverse gap-12 mb-16 items-center">
            <div className="w-full md:w-1/3 lg:pl-10 text-center md:text-left">
              <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold block mb-4">
                Capsule II
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
                Imperial Grace
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">
                Inspired by the queens of yore. Silk drapes that flow like
                water, embroidered with threads of real gold. A tribute to
                timeless femininity.
              </p>
              <Link
                to="/shop?category=women"
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                View Full Collection
              </Link>
            </div>
            <div className="w-full md:w-2/3 h-[300px] md:h-[400px] overflow-hidden bg-gray-100">
              <img
                src={pageData?.womenSection?.image || imgWomen}
                className="w-full h-full object-cover object-top"
                alt="Women's Capsule Story"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {(womenProducts.length > 0
              ? womenProducts
              : [
                  {
                    name: "Bridal Lehenga",
                    price: 125000,
                    img: imgRoyalSaree,
                    link: "/shop?search=Lehenga",
                    badge: "Exclusive",
                  },
                  {
                    name: "Banarasi Silk Saree",
                    price: 45000,
                    img: imgRoyalGown,
                    link: "/shop?search=Saree",
                  },
                  {
                    name: "Embroidered Gown",
                    price: 65000,
                    img: imgRoyalSaree,
                    link: "/shop?search=Gown",
                  },
                  {
                    name: "Handloom Dupatta",
                    price: 15000,
                    img: imgWomen,
                    link: "/shop?search=Dupatta",
                  },
                ]
            ).map((p, i) => (
              <CollectionProductCard key={i} product={p} badge={p.badge} />
            ))}
          </div>
        </div>

        {/* --- SECTION 3: ACCESSORIES --- */}
        <div id="accessories" className="mb-32 scroll-mt-40">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold block mb-4">
              Capsule III
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
              Crown Jewels & Objects
            </h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6 text-sm md:text-base">
              The finishing touches. From leather goods crafted by master
              artisans to timepieces that mark the finest hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Large Cards */}
            <div className="group relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img
                src={imgRoyalWatch}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Watch"
              />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-serif text-2xl">Timepieces</h3>
                <Link
                  to="/shop?cat=watches"
                  className="text-white/80 text-xs uppercase tracking-widest hover:text-white mt-2 block"
                >
                  Discover
                </Link>
              </div>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden bg-gray-100">
              <img
                src={imgRoyalBelt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Leather"
              />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white font-serif text-2xl">
                  Leather Goods
                </h3>
                <Link
                  to="/shop?cat=belts"
                  className="text-white/80 text-xs uppercase tracking-widest hover:text-white mt-2 block"
                >
                  Discover
                </Link>
              </div>
            </div>
            <div className="group relative aspect-[4/5] overflow-hidden bg-gray-100 hidden lg:block">
              <img
                src={imgRoyalPerfume}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt="Perfume"
              />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-black font-serif text-2xl">Olfactory</h3>
                <Link
                  to="/shop?cat=perfume"
                  className="text-gray-600 text-xs uppercase tracking-widest hover:text-black mt-2 block"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
            {(accessoryProducts.length > 0
              ? accessoryProducts
              : [
                  {
                    name: "Royal Chronograph",
                    price: 85000,
                    img: imgRoyalWatch,
                    link: "/shop?type=watches",
                    badge: "Limited",
                  },
                  {
                    name: "Signature Belt",
                    price: 18000,
                    img: imgRoyalBelt,
                    link: "/shop?type=belts",
                  },
                  {
                    name: "Voyager Wallet",
                    price: 12500,
                    img: imgRoyalWallet,
                    link: "/shop?type=wallets",
                  },
                  {
                    name: "Aviator Sunglasses",
                    price: 15000,
                    img: imgRoyalSunglasses,
                    link: "/shop?type=sunglasses",
                  },
                ]
            ).map((p, i) => (
              <CollectionProductCard key={i} product={p} badge={p.badge} />
            ))}
          </div>
        </div>

        {/* --- SECTION 4: ARTIFACTS (Story Only) --- */}
        <div id="artifacts" className="scroll-mt-40 bg-[#f6f6f6] p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <img
                src={imgBag}
                alt="Artifacts"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">
                Murgdur Artifacts
              </h2>
              <p className="text-gray-600 font-light leading-relaxed mb-6">
                Beyond fashion lies art. Explore our collection of travel
                trunks, bespoke furniture, and home curiosities collected from
                the royal palaces.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors"
              >
                Inquire for Catalog
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="py-20 text-center bg-white border-t border-gray-100 text-black">
        <span className="text-royal-maroon text-2xl">❖</span>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
          Est. 2019 • The Kingdom of Murgdur
        </p>
      </div>
    </div>
  );
};

export default RoyalCollection;
