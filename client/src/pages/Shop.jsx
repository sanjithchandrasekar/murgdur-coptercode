import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Filter,
  ChevronDown,
  Search,
  Heart,
  X,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ShoppingBag,
} from "lucide-react";
import RoyalShop from "./RoyalShop";
import { fetchProducts } from "../utils/sanity";
import { products as staticProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

// --- CONSTANTS ---
const ITEMS_PER_PAGE = 1000;

const CATEGORY_TABS = [
  { label: "All", value: "all" },
  { label: "Shoes", value: "shoes" },
  { label: "Bags", value: "bags" },
  { label: "Travel", value: "travel" },
  { label: "Watches", value: "watches" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Apparel", value: "clothing" },
  { label: "Dresses", value: "dresses" },
  { label: "Shirts", value: "shirts" },
  { label: "Belts", value: "belts" },
  { label: "Sunglasses", value: "sunglasses" },
  { label: "Perfume", value: "perfumes" },
  { label: "Wallets", value: "wallets" },
  { label: "Accessories", value: "accessories" },
];

const PRICE_RANGES = [
  { label: "Under ₹2,000", min: 0, max: 2000, id: "low" },
  { label: "₹2,000 - ₹5,000", min: 2000, max: 5000, id: "mid-low" },
  { label: "₹5,000 - ₹10,000", min: 5000, max: 10000, id: "mid" },
  { label: "₹10,000 - ₹20,000", min: 10000, max: 20000, id: "mid-high" },
  { label: "Above ₹20,000", min: 20000, max: 1000000, id: "high" },
];

/* ─── Editorial banners — keyed by activeTab ─── */
const EDITORIAL_BANNERS_BY_TAB = {
  all: [
    { eyebrow: "New Collection", heading: "The House\nof Murgdur", subtext: "Crafted for royalty. Worn by the elite. Discover our signature pieces that define modern luxury.", cta: "Explore Collection", ctaLink: "/royal-collection", image: "/images/royal_sherwani.png", imageAlt: "Murgdur Royal Sherwani", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Women's Edit", heading: "Draped in\nGrandeur", subtext: "From bridal couture to everyday elegance — each garment a masterpiece of Indian craftsmanship.", cta: "Shop Women", ctaLink: "/shop?type=dresses", image: "/images/royal_gown.png", imageAlt: "Murgdur Royal Gown", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  shoes: [
    { eyebrow: "Footwear", heading: "Walk in\nRoyalty", subtext: "Premium hand-crafted leather shoes built for the modern gentleman and the elegant woman.", cta: "Shop Footwear", ctaLink: "/shop?type=shoes", image: "/images/royal_heels.png", imageAlt: "Murgdur Heels", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Craftsmanship", heading: "Sole of\nLuxury", subtext: "Every step a statement. Explore our curated collection of premium footwear for every occasion.", cta: "View All Shoes", ctaLink: "/shop?type=shoes", image: "/images/men shoe/menshoe6.jpeg", imageAlt: "Men's Shoe", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  bags: [
    { eyebrow: "Handbags", heading: "Carry the\nLegacy", subtext: "From structured totes to sleek clutches — each bag tells a story of uncompromised craftsmanship.", cta: "Shop Bags", ctaLink: "/shop?type=bags", image: "/images/women handbag/woman bag white 1.jpeg", imageAlt: "Murgdur Handbag", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "New Arrivals", heading: "The Art of\nthe Bag", subtext: "Refined silhouettes. Supple leathers. Colours that speak without words. Discover our latest arrivals.", cta: "Explore Bags", ctaLink: "/shop?type=bags", image: "/images/women handbag/women bag brown 2 front.jpeg", imageAlt: "Brown Handbag", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  watches: [
    { eyebrow: "Timepieces", heading: "Time is a\nLuxury", subtext: "Every second counts. Our timepieces are engineered for those who appreciate the finest horology.", cta: "Shop Watches", ctaLink: "/shop?type=watches", image: "/images/royal_watch.png", imageAlt: "Murgdur Watch", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Heritage", heading: "Precision\nRefined", subtext: "Inspired by centuries of watchmaking excellence — tested by time, worn by few.", cta: "View Collection", ctaLink: "/shop?type=watches", image: "/images/watch1.png", imageAlt: "Watch Collection", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  clothing: [
    { eyebrow: "Apparel", heading: "The House\nof Murgdur", subtext: "Regal silhouettes meet modern tailoring. Dress like royalty for every occasion.", cta: "Shop Apparel", ctaLink: "/shop?type=clothing", image: "/images/royal_sherwani.png", imageAlt: "Royal Sherwani", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Women's Couture", heading: "Draped in\nGrandeur", subtext: "From bridal lehengas to everyday elegance — each piece a masterpiece of Indian craftsmanship.", cta: "Shop Women", ctaLink: "/shop?type=dresses", image: "/images/royal_gown.png", imageAlt: "Royal Gown", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  accessories: [
    { eyebrow: "Accessories", heading: "Every Detail\nMatters", subtext: "Complete your look with our curated selection of belts, perfumes, wallets and jewellery.", cta: "Shop Accessories", ctaLink: "/shop?type=accessories", image: "/images/royal_perfume.png", imageAlt: "Murgdur Perfume", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Signature Pieces", heading: "The Finishing\nTouch", subtext: "From the boardroom to the ballroom — our accessories elevate every ensemble.", cta: "View All", ctaLink: "/shop?type=accessories", image: "/images/royal_wallet.png", imageAlt: "Royal Wallet", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  wallets: [
    { eyebrow: "Wallets", heading: "Carry Only\nthe Finest", subtext: "Hand-stitched leather wallets crafted for the discerning gentleman who values form and function.", cta: "Shop Wallets", ctaLink: "/shop?type=wallets", image: "/images/royal_wallet.png", imageAlt: "Royal Wallet", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Craftsmanship", heading: "Slim. Refined.\nIconic.", subtext: "Premium leather, precise stitching — every fold tells a story of uncompromised quality.", cta: "View All Wallets", ctaLink: "/shop?type=wallets", image: "/images/mens_royal_wallet_section.png", imageAlt: "Wallet", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  sunglasses: [
    { eyebrow: "Eyewear", heading: "See the World\nDifferently", subtext: "UV-protected lenses in frames crafted for the bold. Style meets protection in every pair.", cta: "Shop Eyewear", ctaLink: "/shop?type=sunglasses", image: "/images/royal_sunglasses.png", imageAlt: "Sunglasses", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "New Season", heading: "Frames of\nDistinction", subtext: "From round to rectangular — our eyewear collection is designed to complement every face.", cta: "View Collection", ctaLink: "/shop?type=sunglasses", image: "/images/royal_sunglasses.png", imageAlt: "Sunglasses", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  perfumes: [
    { eyebrow: "Fragrance", heading: "Wear Your\nSignature", subtext: "Our perfumes are composed by master perfumers using the rarest raw materials from around the world.", cta: "Shop Fragrances", ctaLink: "/shop?type=perfumes", image: "/images/royal_perfume.png", imageAlt: "Perfume", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Exclusive", heading: "A Scent for\nEvery Story", subtext: "From fresh citrus to deep oud — find the fragrance that speaks your language.", cta: "Explore Perfumes", ctaLink: "/shop?type=perfumes", image: "/images/royal_perfume.png", imageAlt: "Perfume", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
  dresses: [
    { eyebrow: "Women's Couture", heading: "Draped in\nGrandeur", subtext: "From bridal lehengas to cocktail dresses — each piece is a testament to India's rich textile heritage.", cta: "Shop Dresses", ctaLink: "/shop?type=dresses", image: "/images/royal_gown.png", imageAlt: "Royal Gown", imageSide: "right", bg: "#19110b", textColor: "#fff" },
    { eyebrow: "Bridal Edit", heading: "Made for Your\nMoment", subtext: "Exquisite bridal and occasion wear, handcrafted with zari and zardozi embroidery.", cta: "Explore Bridal", ctaLink: "/shop?type=dresses", image: "/images/Gemini_Generated_Image_aimaqdaimaqdaima.png", imageAlt: "Lehenga", imageSide: "left", bg: "#f0efed", textColor: "#19110b" },
  ],
};

/* ─── Per-tab category icon subcategories ─── */
const CATEGORY_ICONS_BY_TAB = {
  all: [
    { name: "Men's Collection", image: "/images/royal_sherwani.png", path: "/shop?type=clothing" },
    { name: "Women's Collection", image: "/images/royal_gown.png", path: "/shop?type=dresses" },
    { name: "Handbags", image: "/images/hand bag.png", path: "/shop?type=bags" },
    { name: "Watches", image: "/images/royal_watch.png", path: "/shop?type=watches" },
    { name: "Accessories", image: "/images/royal_perfume.png", path: "/shop?type=accessories" },
  ],
  bags: [
    { name: "Royal Initials", image: "/images/vanitycase.jpg", path: "/shop?type=bags&search=signature" },
    { name: "Crossbody Bags", image: "/images/hand bag.png", path: "/shop?type=bags&search=crossbody" },
    { name: "Shoulder Bags", image: "/images/woens small bag.jpg", path: "/shop?type=bags&search=shoulder" },
    { name: "Totes", image: "/images/women handbag/woman bag white 1.jpeg", path: "/shop?type=bags&search=tote" },
    { name: "Mini Bags", image: "/images/zippy wallet.jpg", path: "/shop?type=bags&search=mini" },
  ],
  shoes: [
    { name: "Oxford Shoes", image: "/images/men shoe/menshoe1.png", path: "/shop?type=shoes&search=oxford" },
    { name: "Monk Straps", image: "/images/men shoe/menshoe6.jpeg", path: "/shop?type=shoes&search=monk" },
    { name: "Sneakers", image: "/images/men shoe/menshoe9.jpeg", path: "/shop?type=shoes&search=sneaker" },
    { name: "Women's Heels", image: "/images/royal_heels.png", path: "/shop?type=shoes&search=heel" },
    { name: "Slippers", image: "/images/womensslipper.jpeg", path: "/shop?type=shoes&search=slipper" },
  ],
  watches: [
    { name: "Classic", image: "/images/royal_watch.png", path: "/shop?type=watches&search=classic" },
    { name: "Dress Watches", image: "/images/watch1.png", path: "/shop?type=watches&search=dress" },
    { name: "Sport", image: "/images/watch 2.png", path: "/shop?type=watches&search=sport" },
  ],
  clothing: [
    { name: "Sherwani", image: "/images/royal_sherwani.png", path: "/shop?type=clothing&search=sherwani" },
    { name: "Tuxedo", image: "/images/Gemini_Generated_Image_5pgtfq5pgtfq5pgt.png", path: "/shop?type=clothing&search=tuxedo" },
    { name: "Velvet Suit", image: "/images/Gemini_Generated_Image_iqsqcdiqsqcdiqsq.png", path: "/shop?type=clothing&search=velvet" },
    { name: "Jacket", image: "/images/Gemini_Generated_Image_j3qrpwj3qrpwj3qr.png", path: "/shop?type=clothing&search=jacket" },
  ],
  dresses: [
    { name: "Lehenga", image: "/images/Gemini_Generated_Image_aimaqdaimaqdaima.png", path: "/shop?type=dresses&search=lehenga" },
    { name: "Saree", image: "/images/royal_saree.png", path: "/shop?type=dresses&search=saree" },
    { name: "Gown", image: "/images/royal_gown.png", path: "/shop?type=dresses&search=gown" },
    { name: "Anarkali", image: "/images/Gemini_Generated_Image_2heebf2heebf2hee.png", path: "/shop?type=dresses&search=anarkali" },
  ],
  accessories: [
    { name: "Perfume", image: "/images/royal_perfume.png", path: "/shop?type=perfumes" },
    { name: "Belt", image: "/images/royal_belt.png", path: "/shop?type=belts" },
    { name: "Wallet", image: "/images/royal_wallet.png", path: "/shop?type=wallets" },
    { name: "Sunglasses", image: "/images/royal_sunglasses.png", path: "/shop?type=sunglasses" },
  ],
  wallets: [
    { name: "Bifold", image: "/images/royal_wallet.png", path: "/shop?type=wallets&search=bifold" },
    { name: "Zip-around", image: "/images/zippy wallet.jpg", path: "/shop?type=wallets&search=zip" },
    { name: "Card Holder", image: "/images/mens_royal_wallet_section.png", path: "/shop?type=wallets&search=card" },
  ],
  sunglasses: [
    { name: "Classic", image: "/images/royal_sunglasses.png", path: "/shop?type=sunglasses&search=classic" },
    { name: "Sport", image: "/images/royal_sunglasses.png", path: "/shop?type=sunglasses&search=sport" },
  ],
  perfumes: [
    { name: "Men's Fragrance", image: "/images/royal_perfume.png", path: "/shop?type=perfumes&search=men" },
    { name: "Women's Fragrance", image: "/images/women perfume/womens-perfume1.png", path: "/shop?type=perfumes&search=women" },
  ],
  shirts: [
    { name: "Formal Shirts", image: "/images/royal_shirt.png", path: "/shop?type=shirts&search=formal" },
    { name: "Casual", image: "/images/royal_tshirt.png", path: "/shop?type=shirts&search=casual" },
  ],
  belts: [
    { name: "Leather Belts", image: "/images/royal_belt.png", path: "/shop?type=belts&search=leather" },
    { name: "Signature", image: "/images/leather_belt.png", path: "/shop?type=belts&search=signature" },
  ],
  jewellery: [
    { name: "Necklace", image: "/images/royal_perfume.png", path: "/shop?type=jewellery&search=necklace" },
    { name: "Rings", image: "/images/royal_perfume.png", path: "/shop?type=jewellery&search=ring" },
    { name: "Earrings", image: "/images/royal_perfume.png", path: "/shop?type=jewellery&search=earring" },
  ],
  travel: [
    { name: "Luggage", image: "/images/hand bag.png", path: "/shop?type=travel&search=luggage" },
    { name: "Duffle Bags", image: "/images/hand bag.png", path: "/shop?type=travel&search=duffle" },
  ],
};

const EditorialBanner = ({ banner }) => {
  const navigate = useNavigate();
  return (
    /* Full-bleed cinematic banner */
    <div className="w-full my-10 md:my-16 overflow-hidden group cursor-pointer relative"
      onClick={() => navigate(banner.ctaLink)}
    >
      {/* Wide landscape image: ~21:9 desktop, 16:9 tablet, 4:3 mobile */}
      <div className="w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
        <img
          src={banner.image}
          alt={banner.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1800ms] ease-out group-hover:scale-[1.03]"
        />

        {/* Bottom-left overlay: thin gradient + small caption */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 lg:bottom-14 lg:left-14 z-10">
          <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-white/70 mb-2">
            {banner.eyebrow}
          </span>
          <h2 className="font-serif text-white text-[1.4rem] sm:text-[1.9rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.1] tracking-tight whitespace-pre-line mb-4 drop-shadow-lg">
            {banner.heading}
          </h2>
          <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-white pb-0.5 border-b border-white/70 group-hover:border-white transition-colors duration-300">
            {banner.cta}
          </span>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  // --- HOOKS ---
  const location = useLocation();
  const navigate = useNavigate();
  const { addToWishlist, wishlistItems, addToCart } = useCart();

  // --- DATA STATE ---
  const [allProducts, setAllProducts] = useState(staticProducts || []);
  const [productsSource, setProductsSource] = useState(staticProducts || []);
  const [isLoading, setIsLoading] = useState(true);

  // --- FILTER STATE (Derived from URL) ---
  const params = new URLSearchParams(location.search);

  const searchTerm = params.get("search") || "";
  const activeTab = params.get("type") || "all";
  const sortBy = params.get("sort") || "relevance";

  const selectedCategories = params.get("cat")
    ? params
      .get("cat")
      .split(",")
      .filter((c) => c.toLowerCase() !== "all")
    : [];
  const selectedPriceIds = params.get("price")
    ? params.get("price").split(",")
    : [];

  // UI State
  const [isRoyalPage, setIsRoyalPage] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(12);
  const tabsRef = useRef(null);

  const [openSections, setOpenSections] = useState({
    sort: true,
    iconic: false,
    collections: false,
    categories: false,
    materials: false,
    colours: false
  });
  const toggleSection = (sec) => setOpenSections(prev => ({ ...prev, [sec]: !prev[sec] }));

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isSidebarOpen]);

  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        if (data && data.length > 0) {
          const uniqueData = Array.from(
            new Map(data.map((item) => [item._id || item.id, item])).values(),
          );
          setAllProducts(uniqueData);

          const shuffled = [...uniqueData];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          setProductsSource(shuffled);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // Reset visible count on any URL change
  useEffect(() => {
    setVisibleCount(12);
  }, [location.search]);

  // --- SPECIAL URL HANDLING (ROYAL & LEGACY) ---
  useEffect(() => {
    const catParam = params.get("cat") || params.get("category");
    setIsRoyalPage(false);

    if (catParam) {
      const lowerCat = catParam.toLowerCase();
      if (lowerCat === "royal") {
        setIsRoyalPage(true);
      } else if (
        ["jewellery", "sunglasses", "accessories"].includes(lowerCat)
      ) {
        if (activeTab === "all") {
          updateParams({
            type: lowerCat === "jewellery" ? "accessories" : lowerCat,
            cat: null,
          });
        }
      }
    }
  }, [location.search]);

  // --- HELPER: URL UPDATER ---
  const updateParams = (newParams) => {
    const current = new URLSearchParams(location.search);
    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        current.delete(key);
      } else if (Array.isArray(value)) {
        current.set(key, value.join(","));
      } else {
        current.set(key, value);
      }
    });
    navigate({ search: current.toString() }, { replace: true });
    setCurrentPage(1);
  };

  // --- FILTER HANDLERS ---
  const handleSearch = (term) => updateParams({ search: term });
  const handleTabChange = (tab) => { updateParams({ type: tab, cat: null }); setVisibleCount(12); };
  const handleSortChange = (sort) => updateParams({ sort });

  const toggleCategory = (cat) => {
    const newCats = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    updateParams({ cat: newCats });
  };

  const togglePriceRange = (id) => {
    const newPrices = selectedPriceIds.includes(id)
      ? selectedPriceIds.filter((p) => p !== id)
      : [...selectedPriceIds, id];
    updateParams({ price: newPrices });
  };

  const clearAllFilters = () => {
    navigate({ search: "" });
  };

  const removeFilter = (type, value) => {
    if (type === "tab") handleTabChange("all");
    if (type === "cat") toggleCategory(value);
    if (type === "price") togglePriceRange(value);
    if (type === "search") handleSearch("");
  };

  // --- FILTERING LOGIC ---
  const filteredProducts = useMemo(() => {
    let result = productsSource;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(lowerTerm) ||
          (p.description || "").toLowerCase().includes(lowerTerm) ||
          (p.category || "").toLowerCase().includes(lowerTerm) ||
          (p.type || "").toLowerCase().includes(lowerTerm),
      );
    }

    if (activeTab !== "all") {
      result = result.filter((p) => {
        const type = (p.type || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        const name = (p.name || "").toLowerCase();
        const matches = (keywords) =>
          keywords.some((k) => type === k || name.includes(k));

        switch (activeTab) {
          case "accessories":
            return (
              category === "accessories" ||
              matches([
                "watch",
                "wallet",
                "belt",
                "perfume",
                "sunglass",
                "jewel",
                "ring",
                "necklace",
                "earring",
                "bangle",
                "bracelet",
              ])
            );
          case "clothing":
            return matches([
              "shirt",
              "shirts",
              "hoodie",
              "sweater",
              "tshirt",
              "tee",
              "trouser",
              "pant",
              "gown",
              "lehenga",
              "saree",
              "sherwani",
              "kurta",
              "jacket",
              "suit",
              "blazer",
              "tuxedo",
              "kurtas",
              "anarkali",
              "top",
              "tunic",
              "bandi",
              "achkan",
              "bandhgala",
            ]);
          case "shoes":
            return matches([
              "shoe",
              "sneaker",
              "slipper",
              "boot",
              "loafer",
              "sandal",
              "heel",
              "flat",
              "pump",
              "mule",
              "stiletto",
              "ballet",
              "pump",
              "moccasin",
            ]);
          case "bags":
            return matches([
              "bag",
              "clutch",
              "tote",
              "backpack",
              "travel",
              "satchel",
              "briefcase",
              "purse",
              "handbag",
              "vanity",
              "luggage",
            ]);
          case "watches":
            return matches(["watch", "timepiece", "chronograph", "dial"]);
          case "jewellery":
            return matches([
              "jewel",
              "necklace",
              "ring",
              "earring",
              "bangle",
              "bracelet",
              "pendant",
              "diamond",
              "stud",
            ]);
          case "sunglasses":
            return matches([
              "sunglass",
              "shade",
              "eyewear",
              "aviator",
              "wayfarer",
            ]);
          case "perfumes":
            return matches([
              "perfume",
              "fragrance",
              "scent",
              "parfum",
              "eau",
              "cologne",
            ]);
          case "belts":
            return matches(["belt", "buckle"]);
          case "wallets":
            return matches(["wallet", "cardholder", "billfold"]);
          case "dresses":
            return matches([
              "dress",
              "gown",
              "frock",
              "anarkali",
              "lehenga",
              "saree",
            ]);
          case "shirts":
            return matches(["shirt", "blouse", "top", "tunic"]);
          case "travel":
            return matches([
              "travel",
              "luggage",
              "duffle",
              "suitcase",
              "trolley",
            ]);
          default:
            return type === activeTab.toLowerCase();
        }
      });
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const productCat = (p.category || "").toLowerCase();
        const selectedLower = selectedCategories.map((sc) => sc.toLowerCase());
        if (selectedLower.includes(productCat)) return true;
        if (selectedLower.includes("accessories")) {
          if (
            [
              "watches",
              "wallets",
              "belts",
              "perfumes",
              "sunglasses",
              "jewellery",
            ].includes((p.type || "").toLowerCase())
          )
            return true;
        }
        return false;
      });
    }

    if (selectedPriceIds.length > 0) {
      result = result.filter((p) => {
        const price = p.price || 0;
        return selectedPriceIds.some((id) => {
          const range = PRICE_RANGES.find((r) => r.id === id);
          return range && price >= range.min && price <= range.max;
        });
      });
    }

    if (sortBy === "price-low-high") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high-low")
      result.sort((a, b) => b.price - a.price);
    else if (sortBy === "newest") result.sort((a, b) => b.id - a.id);
    else if (sortBy === "rating")
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));

    return result;
  }, [
    productsSource,
    searchTerm,
    activeTab,
    selectedCategories,
    selectedPriceIds,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Dynamic highlights — top 4 real products for active tab (by rating, then price)
  const highlightProducts = useMemo(() => {
    let pool = productsSource;
    if (activeTab !== 'all') {
      pool = filteredProducts.length > 0 ? filteredProducts : productsSource;
    }
    return [...pool]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0) || b.price - a.price)
      .slice(0, 4);
  }, [productsSource, filteredProducts, activeTab]);

  if (isRoyalPage) return <RoyalShop />;

  return (
    <div className="bg-[#fffefe] min-h-screen pt-28 pb-20 font-sans text-gray-900">
      <SEO
        title={`${activeTab === "all" ? "Shop" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} | Murgdur Collection`}
        description={`Explore our exclusive collection of ${activeTab === "all" ? "luxury items" : activeTab}. Handcrafted for the modern elite.`}
        url={`https://murugdur1.vercel.app/shop?type=${activeTab}`}
      />
      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Fixed position Back Button */}
        <div className="absolute top-0 left-4 md:left-8 z-30">
          <BackButton />
        </div>

        {/* TOP TOOLBAR */}
        <div className="flex justify-between items-center py-8 border-b border-gray-100 mb-2">
          <div className="flex items-center gap-3 cursor-pointer group">
            <span className="text-[13px] uppercase tracking-widest font-medium text-black">
              {selectedCategories.length === 1 && ['men','women'].includes(selectedCategories[0].toLowerCase())
                ? `${selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)}'s Collection`
                : activeTab === 'all' ? 'All Products' : `All ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </span>
            <ChevronDown size={14} strokeWidth={1.5} className="text-black group-hover:translate-y-0.5 transition-transform" />
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center gap-2 border border-black px-6 py-1.5 text-[11px] uppercase tracking-widest font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Filters <SlidersHorizontal size={12} strokeWidth={2} />
          </button>
        </div>

        {/* CATEGORY ICONS BAR — compact thumbnails */}
        <div className="w-full relative mb-6">
          <div className="flex overflow-x-auto gap-4 md:gap-6 py-6 items-start justify-start md:justify-center no-scrollbar px-0 scroll-smooth" ref={tabsRef}>
            {(CATEGORY_ICONS_BY_TAB[activeTab] || CATEGORY_ICONS_BY_TAB.all).map((cat, i) => (
              <Link
                key={i}
                to={cat.path}
                className="flex flex-col items-center gap-2.5 cursor-pointer min-w-[88px] max-w-[100px] group shrink-0 no-underline"
              >
                <div className="w-[76px] h-[76px] relative flex items-end justify-center overflow-hidden bg-[#f6f5f3]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105" />
                </div>
                <span className="text-[10.5px] font-sans text-center text-[#19110b] leading-tight tracking-wide max-w-[88px]">
                  {cat.name}
                </span>
              </Link>
            ))}
            {/* scroll right arrow */}
            <div className="flex items-center ml-1 shrink-0 cursor-pointer" onClick={() => scrollTabs('right')}>
              <ChevronRight size={18} strokeWidth={1.5} className="text-[#19110b]" />
            </div>
          </div>
        </div>

        {/* Single top campaign hero banner */}
        {(() => {
          const banners = EDITORIAL_BANNERS_BY_TAB[activeTab] || EDITORIAL_BANNERS_BY_TAB.all;
          return <EditorialBanner banner={banners[0]} />;
        })()}

        <h2 className="text-center text-[13px] uppercase tracking-[0.25em] font-sans mb-10 mt-2 text-[#19110b]">Highlights</h2>

        {/* Highlights grid — real product images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 mb-10">
          {highlightProducts.map((hl, i) => (
            <div
              key={hl.id || i}
              className="group cursor-pointer"
              onClick={() => navigate(`/product/${hl.id || hl._id}`)}
            >
              <div className="relative w-full aspect-[3/4] bg-[#f6f5f3] overflow-hidden mb-3">
                {hl.isNew && (
                  <span className="absolute top-2.5 left-2.5 z-10 text-[9px] uppercase tracking-[0.18em] text-[#19110b] leading-none">
                    New
                  </span>
                )}
                <img
                  src={hl.image}
                  alt={hl.name}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[12px] font-sans font-normal text-[#19110b] leading-snug uppercase tracking-wide">
                {hl.name}
              </h3>
              <p className="text-[12px] font-sans text-[#19110b] mt-0.5">
                ₹ {(hl.price || 0).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* ── Video Container ── */}
        <div className="w-full mb-20 relative overflow-hidden group">
          <video
            src="/videos/perfume1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full object-cover max-h-[70vh] md:max-h-[80vh]"
          />
          {/* Overlay caption */}
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-end pb-10 md:pb-16 pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/70 mb-2">New Season</span>
            <h2 className="font-serif text-white text-2xl md:text-4xl lg:text-5xl tracking-tight mb-4 text-center px-4">
              The Art of Luxury
            </h2>
            <span className="text-[11px] uppercase tracking-[0.28em] text-white border-b border-white/70 pb-0.5">
              Discover the Collection
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* FILTER OVERLAY */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[110] bg-white flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-6 md:px-12 lg:px-24 xl:px-32 py-8 shrink-0 border-b border-gray-100">
                  <h2 className="text-sm uppercase tracking-widest font-sans text-black font-semibold">Show filters</h2>
                  <button onClick={() => setIsSidebarOpen(false)} className="hover:opacity-70">
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 lg:px-24 xl:px-32 pt-8 pb-32 bg-[#faf9f8]">
                  <div className="max-w-7xl">
                    {/* Sort By Accordion */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('sort')} className="flex justify-between items-center w-full text-left outline-none group">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Sort by</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.sort ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.sort && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-8 overflow-hidden">
                            <div className="flex flex-col gap-5">
                              {[
                                { label: "Highest to Lowest Price", val: "price-high-low" },
                                { label: "Lowest to Highest Price", val: "price-low-high" },
                                { label: "Novelty", val: "newest" }
                              ].map(opt => (
                                <label key={opt.val} className="flex items-center gap-4 cursor-pointer select-none group w-fit">
                                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center bg-white group-hover:border-black transition-colors">
                                    {sortBy === opt.val && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                                  </div>
                                  <span className={`text-[13px] font-sans tracking-wide ${sortBy === opt.val ? 'text-black' : 'text-gray-600 group-hover:text-black transition-colors'}`}>{opt.label}</span>
                                  <input type="radio" name="sort" className="hidden" value={opt.val} checked={sortBy === opt.val} onChange={(e) => handleSortChange(e.target.value)} />
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Iconic Accordion */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('iconic')} className="flex justify-between items-center w-full text-left outline-none group">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Iconic</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.iconic ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.iconic && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 overflow-hidden">
                            <div className="flex flex-col gap-5">
                              {["Royal Sherwani", "Bridal Lehenga", "Heritage Watch", "Signature Wallet", "Leather Oxford", "Velvet Gown"].map(cat => (
                                <label key={cat} className="flex items-center gap-4 cursor-pointer select-none group w-fit">
                                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors bg-white ${selectedCategories.includes(cat) ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                    {selectedCategories.includes(cat) && <div className="w-3 h-3 bg-black" />}
                                  </div>
                                  <span className={`text-[13px] font-sans tracking-wide ${selectedCategories.includes(cat) ? 'text-black' : 'text-gray-600 group-hover:text-black transition-colors'}`}>{cat}</span>
                                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Collections Accordion */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('collections')} className="flex justify-between items-center w-full text-left outline-none group">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Collections</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.collections ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.collections && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 overflow-hidden">
                            <div className="flex flex-col gap-5">
                              {["Royal Heritage Collection", "Murgdur x Artisan Series", "Mon Signature Edit", "Summer 2026 Collection"].map(cat => (
                                <label key={cat} className="flex items-center gap-4 cursor-pointer select-none group w-fit">
                                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors bg-white ${selectedCategories.includes(cat) ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                    {selectedCategories.includes(cat) && <div className="w-3 h-3 bg-black" />}
                                  </div>
                                  <span className={`text-[13px] font-sans tracking-wide ${selectedCategories.includes(cat) ? 'text-black' : 'text-gray-600 group-hover:text-black transition-colors'}`}>{cat}</span>
                                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Categories Accordion */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('categories')} className="flex justify-between items-center w-full text-left outline-none group">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Categories</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.categories ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.categories && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 overflow-hidden">
                            <div className="flex flex-col gap-5">
                              {[
                                "Royal Initials Personalisation", "Crossbody Bags", "Shoulder Bags", "Totes",
                                "Mini Bags", "Hobo Bags", "Bucket Bags", "Bumbags", "Backpacks",
                                "Top Handles", "Trunk Bags", "Shoulder Straps"
                              ].map(cat => (
                                <label key={cat} className="flex items-center gap-4 cursor-pointer select-none group w-fit">
                                  <div className={`w-5 h-5 border flex items-center justify-center transition-colors bg-white ${selectedCategories.includes(cat) ? 'border-black' : 'border-gray-300 group-hover:border-black'}`}>
                                    {selectedCategories.includes(cat) && <div className="w-3 h-3 bg-black" />}
                                  </div>
                                  <span className={`text-[13px] font-sans tracking-wide ${selectedCategories.includes(cat) ? 'text-black' : 'text-gray-600 group-hover:text-black transition-colors'}`}>{cat}</span>
                                  <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Materials section */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('materials')} className="flex justify-between items-center w-full text-left outline-none group mb-4">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Materials</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.materials ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.materials && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">

                            {/* Fabric Group */}
                            <div className="mb-10 pt-4">
                              <span className="text-[11px] tracking-wide font-sans text-black block mb-6">Fabric</span>
                              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[
                                  { name: "Silk", color: "#e8d5c0", texture: "linear-gradient(135deg, #e8d5c0 0%, #f5ede4 40%, #d6c3ad 60%, #e8d5c0 100%)" },
                                  { name: "Velvet", color: "#3d2b4a", texture: "linear-gradient(135deg, #3d2b4a 0%, #5a3f6b 40%, #2e1f38 60%, #3d2b4a 100%)" },
                                  { name: "Cotton", color: "#f0ece6", texture: "linear-gradient(135deg, #f0ece6 0%, #faf8f5 50%, #e4dfd8 100%)" },
                                  { name: "Linen", color: "#d4c9b0", texture: "linear-gradient(135deg, #d4c9b0 0%, #e2d9c4 50%, #c6baa0 100%)" },
                                  { name: "Wool", color: "#8b7355", texture: "linear-gradient(135deg, #8b7355 0%, #a08060 50%, #705e44 100%)" },
                                  { name: "Chiffon", color: "#f7e8d8", texture: "linear-gradient(160deg, #f7e8d8 0%, #fff4ed 40%, #edd5c0 100%)" },
                                  { name: "Georgette", color: "#c9b8d4", texture: "linear-gradient(135deg, #c9b8d4 0%, #ddd0e8 50%, #b5a2c0 100%)" },
                                  { name: "Brocade", color: "#b8962e", texture: "linear-gradient(135deg, #b8962e 0%, #d4af50 40%, #8a6e1a 60%, #b8962e 100%)" },
                                ].map(mat => (
                                  <label key={mat.name} className="cursor-pointer group flex flex-col gap-2.5">
                                    <div
                                      className="w-full aspect-square border border-gray-200 overflow-hidden hover:border-black transition-colors duration-200"
                                      style={{ background: mat.texture }}
                                    />
                                    <span className="text-[10px] tracking-wide text-[#19110b] uppercase">{mat.name}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Leather & Canvas Group */}
                            <div className="mb-10">
                              <span className="text-[11px] tracking-wide font-sans text-black block mb-6">Leather & Canvas</span>
                              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[
                                  { name: "Full-Grain Leather", color: "#3b1a0a", texture: "linear-gradient(135deg, #3b1a0a 0%, #5c2c10 40%, #2a1208 100%)" },
                                  { name: "Saffiano Leather", color: "#1a1a1a", texture: "repeating-linear-gradient(45deg, #1a1a1a 0px, #1a1a1a 4px, #2c2c2c 4px, #2c2c2c 8px)" },
                                  { name: "Suede", color: "#9b7b5e", texture: "linear-gradient(135deg, #9b7b5e 0%, #b8956e 50%, #7a5e45 100%)" },
                                  { name: "Patent Leather", color: "#0a0a0a", texture: "linear-gradient(135deg, #0a0a0a 0%, #2a2a2a 30%, #050505 60%, #1a1a1a 100%)" },
                                  { name: "Vegan Leather", color: "#4a3728", texture: "linear-gradient(135deg, #4a3728 0%, #6b5040 50%, #332619 100%)" },
                                  { name: "Signature Canvas", color: "#4f311c", texture: "repeating-conic-gradient(#4f311c 0% 25%, #6b4a2e 0% 50%) 50% / 12px 12px" },
                                  { name: "Heritage Weave", color: "#2d1a0a", texture: "repeating-conic-gradient(#2d1a0a 0% 25%, #1f1105 0% 50%) 50% / 12px 12px" },
                                  { name: "Denim Canvas", color: "#365373", texture: "repeating-linear-gradient(45deg, #365373 0px, #365373 3px, #2d4560 3px, #2d4560 6px)" },
                                ].map(mat => (
                                  <label key={mat.name} className="cursor-pointer group flex flex-col gap-2.5">
                                    <div
                                      className="w-full aspect-square border border-gray-200 overflow-hidden hover:border-black transition-colors duration-200"
                                      style={{ background: mat.texture }}
                                    />
                                    <span className="text-[10px] tracking-wide text-[#19110b] uppercase">{mat.name}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Precious & Specialty */}
                            <div>
                              <span className="text-[11px] tracking-wide font-sans text-black block mb-6">Precious & Specialty</span>
                              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[
                                  { name: "Zari & Zardozi", color: "#c9a84c", texture: "linear-gradient(135deg, #c9a84c 0%, #e8c96a 30%, #a07828 60%, #c9a84c 100%)" },
                                  { name: "Embroidered", color: "#8b3a52", texture: "linear-gradient(135deg, #8b3a52 0%, #b05070 40%, #6b2a3e 100%)" },
                                  { name: "Sequin", color: "#c0c0c0", texture: "radial-gradient(circle at 2px 2px, #e8e8e8 1px, transparent 0), radial-gradient(circle at 8px 8px, #a0a0a0 1px, transparent 0)" },
                                  { name: "Gold Hardware", color: "#b8922a", texture: "linear-gradient(135deg, #b8922a 0%, #d4af50 30%, #8a6c18 60%, #c9a030 100%)" },
                                ].map(mat => (
                                  <label key={mat.name} className="cursor-pointer group flex flex-col gap-2.5">
                                    <div
                                      className="w-full aspect-square border border-gray-200 overflow-hidden hover:border-black transition-colors duration-200"
                                      style={{ background: mat.texture }}
                                    />
                                    <span className="text-[10px] tracking-wide text-[#19110b] uppercase">{mat.name}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Colours Accordion */}
                    <div className="border-b border-gray-200 pb-8 mb-8">
                      <button onClick={() => toggleSection('colours')} className="flex justify-between items-center w-full text-left outline-none group">
                        <span className="text-sm font-sans tracking-wide text-black bg-[#faf9f8]">Colours</span>
                        <ChevronDown size={14} className={`text-black transition-transform duration-300 ${openSections.colours ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openSections.colours && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pt-6 overflow-hidden">
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                              {[
                                { name: "Black", color: "linear-gradient(to bottom, #333, #000)" },
                                { name: "Maroon", color: "linear-gradient(to bottom, #602020, #300000)" },
                                { name: "Beige", color: "linear-gradient(to bottom, #f5f5dc, #e0d0b0)" },
                                { name: "Blue", color: "linear-gradient(to bottom, #2060d0, #002288)" },
                                { name: "Green", color: "linear-gradient(to bottom, #20a040, #005010)" },
                                { name: "Grey", color: "linear-gradient(to bottom, #c0c0c0, #808080)" },
                                { name: "Multicolor", color: "linear-gradient(45deg, #ffb3ba, #ffffba, #baffc9, #bae1ff)" },
                                { name: "Natural", color: "linear-gradient(to bottom, #e8d0a9, #b59b72)" },
                                { name: "Pink", color: "linear-gradient(to bottom, #ffc0cb, #d06080)" },
                                { name: "Purple", color: "linear-gradient(to bottom, #a060d0, #500080)" },
                                { name: "Rouge", color: "linear-gradient(to bottom, #e04040, #a00000)" },
                                { name: "Silver", color: "linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 100%)" },
                                { name: "Transparent", color: "repeating-conic-gradient(#eee 0% 25%, white 0% 50%) 50% / 10px 10px" },
                                { name: "White", color: "linear-gradient(to bottom, #ffffff, #eeeeee)" },
                                { name: "Yellow", color: "linear-gradient(to bottom, #ffe040, #e0a000)" }
                              ].map(col => (
                                <div key={col.name} className="cursor-pointer group flex flex-col gap-3">
                                  <div
                                    className="w-full aspect-square border border-gray-200 transition-border hover:border-black bg-white"
                                    style={{ background: col.color }}
                                  />
                                  <span className="text-[10px] tracking-wide text-black capitalize line-clamp-1">{col.name}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* Sticky Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:px-12 lg:px-24 border-t border-gray-100 bg-white/95 backdrop-blur-md shrink-0">
                  <div className="max-w-7xl mx-auto flex justify-center">
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="w-full max-w-2xl bg-black text-white text-[11px] font-bold uppercase tracking-[0.15em] py-4 hover:bg-[#19110b] transition-colors"
                    >
                      Show products
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-12">
            {/* TOOLBAR REMOVED - ALIGNED WITH NEW UI */}

            {/* ACTIVE FILTERS ROW */}
            {(activeTab !== "all" ||
              selectedCategories.length > 0 ||
              selectedPriceIds.length > 0 ||
              searchTerm) && (
                <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">
                    Active Filters:
                  </span>

                  {activeTab !== "all" && (
                    <button
                      onClick={() => removeFilter("tab", activeTab)}
                      className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-gray-600 font-medium capitalize">
                        {activeTab}
                      </span>
                      <X
                        size={12}
                        className="text-gray-400 group-hover:text-red-500"
                      />
                    </button>
                  )}

                  {selectedCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => removeFilter("cat", cat)}
                      className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-gray-600 font-medium">{cat}</span>
                      <X
                        size={12}
                        className="text-gray-400 group-hover:text-red-500"
                      />
                    </button>
                  ))}

                  {selectedPriceIds.map((id) => {
                    const label = PRICE_RANGES.find((r) => r.id === id)?.label;
                    return (
                      <button
                        key={id}
                        onClick={() => removeFilter("price", id)}
                        className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                      >
                        <span className="text-gray-600 font-medium">{label}</span>
                        <X
                          size={12}
                          className="text-gray-400 group-hover:text-red-500"
                        />
                      </button>
                    );
                  })}

                  {searchTerm && (
                    <button
                      onClick={() => removeFilter("search", searchTerm)}
                      className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-gray-600 font-medium">
                        "{searchTerm}"
                      </span>
                      <X
                        size={12}
                        className="text-gray-400 group-hover:text-red-500"
                      />
                    </button>
                  )}

                  <button
                    onClick={clearAllFilters}
                    className="text-[10px] uppercase font-bold text-red-500 hover:text-red-700 ml-2 tracking-widest underline decoration-dotted underline-offset-4"
                  >
                    Clear All
                  </button>
                </div>
              )}

            {/* GRID / LIST */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-14"
                >
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-[#ede9e4] aspect-[3/4] mb-4"></div>
                      <div className="h-2.5 bg-[#ede9e4] w-1/3 mb-2 rounded-sm"></div>
                      <div className="h-3 bg-[#ede9e4] w-3/4 mb-1.5 rounded-sm"></div>
                      <div className="h-2.5 bg-[#ede9e4] w-1/4 rounded-sm"></div>
                    </div>
                  ))}
                </motion.div>
              ) : filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-24 bg-gray-50 rounded-lg border border-gray-100 border-dashed"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={24} />
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-gray-900">
                    No Treasures Found
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We couldn't find matches for your search. Try adjusting
                    keywords or clearing some filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#19110b] transition-colors"
                  >
                    Clear All Filters
                  </button>
                </motion.div>
              ) : (
                <div key="content">
                  {viewMode === "list" ? (
                    /* ── LIST VIEW (unchanged) ── */
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {paginatedProducts.map((product, idx) => (
                        <motion.div
                          key={product.id || product._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <ProductListCard
                            product={product}
                            addToCart={addToCart}
                            addToWishlist={addToWishlist}
                            isInWishlist={wishlistItems.some((i) => i.id === product.id)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    /* ── GRID VIEW — clean grid, subcategory headers, View More ── */
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Optional subcategory section label */}
                      {paginatedProducts.length > 0 && (
                        <h3 className="text-[12px] uppercase tracking-[0.22em] font-sans text-[#19110b] mb-6 mt-2">
                          {activeTab === 'all' ? 'All Products' : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
                          <span className="ml-3 text-[#999] normal-case tracking-normal text-[11px]">{filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''}</span>
                        </h3>
                      )}

                      {/* Product grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10">
                        {paginatedProducts.slice(0, visibleCount).map((product, idx) => (
                          <motion.div
                            key={product.id || product._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: Math.min(idx, 7) * 0.05 }}
                          >
                            <ProductCard
                              product={product}
                              addToCart={addToCart}
                              addToWishlist={addToWishlist}
                              isInWishlist={wishlistItems.some((i) => i.id === product.id)}
                            />
                          </motion.div>
                        ))}
                      </div>

                      {/* View More button */}
                      {visibleCount < paginatedProducts.length && (
                        <div className="flex justify-center mt-16 mb-4">
                          <button
                            onClick={() => setVisibleCount(v => v + 12)}
                            className="border border-[#19110b] text-[#19110b] text-[11px] uppercase tracking-[0.25em] font-sans px-12 py-3.5 hover:bg-[#19110b] hover:text-white transition-all duration-300"
                          >
                            View More
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>

            {/* Pagination hidden — View More is used instead */}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---



const ProductCard = ({ product, addToCart, addToWishlist, isInWishlist }) => {
  const navigate = useNavigate();
  const hasSecondImage = product.images && product.images.length > 1;
  const isNew = product.isNew || product.badge === "New" || false;
  const colorDots = product.colors && product.colors.length > 0
    ? product.colors.slice(0, 5)
    : null;
  const totalImages = product.images ? product.images.length : 1;

  return (
    <div
      className="group relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id || product._id}`)}
    >
      {/* Image Container — portrait ratio with neutral bg */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f6f5f3] mb-3">
        {/* Primary image */}
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            hasSecondImage ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"
          }`}
          loading="lazy"
        />

        {/* Secondary image — crossfade on hover */}
        {hasSecondImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} – view 2`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* NEW badge — top left */}
        {isNew && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[#19110b] text-[9px] uppercase tracking-[0.18em] leading-none">
            New
          </span>
        )}

        {/* Sale badge — top left */}
        {product.onSale && !isNew && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[#19110b] text-[9px] uppercase tracking-[0.18em] leading-none">
            Sale
          </span>
        )}

        {/* Wishlist — top right */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
          className={`absolute top-2.5 right-2.5 z-20 transition-all duration-300 ${
            isInWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          title="Add to Wishlist"
        >
          <Heart
            size={15}
            strokeWidth={1.5}
            fill={isInWishlist ? "#19110b" : "none"}
            className="text-[#19110b]"
          />
        </button>

        {/* Image carousel dots — bottom centre */}
        {totalImages > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1 z-10">
            {Array.from({ length: Math.min(totalImages, 4) }).map((_, di) => (
              <span key={di} className={`w-1 h-1 rounded-full ${ di === 0 ? 'bg-[#19110b]' : 'bg-[#19110b]/30'}`} />
            ))}
          </div>
        )}

        {/* Quick Add strip — slides up from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/96">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
            className="w-full py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans text-[#19110b] hover:bg-[#19110b] hover:text-white transition-colors duration-300"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info — luxury typography */}
      <div className="px-0">
        {/* Product name */}
        <h3 className="text-[12px] font-sans font-normal text-[#19110b] leading-snug line-clamp-2 mb-0.5">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-sans text-[#19110b]">
            ₹ {(product.price || 0).toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] font-sans text-[#999] line-through">
              ₹ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Color swatches — shown as small circles below price */}
        {colorDots && colorDots.length > 1 && (
          <div className="flex items-center gap-1 mt-1.5">
            {colorDots.map((c, ci) => (
              <span
                key={ci}
                className="w-2.5 h-2.5 rounded-full border border-gray-200 inline-block flex-shrink-0"
                style={{ backgroundColor: c }}
              />
            ))}
            {product.colors && product.colors.length > 5 && (
              <span className="text-[9.5px] text-[#999] ml-0.5">+{product.colors.length - 5}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductListCard = ({ product, addToCart, addToWishlist, isInWishlist }) => (
  <div className="group flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 hover:border-[#D4AF37]/50 transition-all duration-300 p-4 rounded-sm hover:shadow-xl">
    <div className="relative w-full sm:w-56 aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#F5F5F0] flex-shrink-0 rounded-sm">
      <Link to={`/product/${product.id || product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      {product.onSale && (
        <div className="absolute top-3 left-3 bg-[#D4AF37] text-black text-[9px] font-bold uppercase px-3 py-1 tracking-[0.2em]">
          Sale
        </div>
      )}
    </div>

    <div className="flex-1 flex flex-col justify-center text-left py-2 pr-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] text-[#D4AF37] uppercase tracking-widest mb-2 font-bold">
            {product.category} • {product.type || "Collection"}
          </p>
          <Link to={`/product/${product.id || product._id}`}>
            <h3 className="font-serif text-2xl text-gray-900 group-hover:text-[#D4AF37] transition-colors mb-3">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-4 mb-3">
            {product.rating && (
              <div className="flex text-[#D4AF37] text-xs gap-0.5">
                {"★".repeat(Math.round(product.rating || 5))}
                <span className="text-gray-200">
                  {"★".repeat(5 - Math.round(product.rating || 5))}
                </span>
              </div>
            )}
            {product.reviews && (
              <span className="text-xs text-zinc-400 font-medium">
                {product.reviews} Reviews
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(product);
            }}
            className={`p-3 rounded-full transition-all duration-300 border ${isInWishlist
              ? "text-red-600 bg-red-50 border-red-100"
              : "text-gray-400 hover:text-red-600 hover:bg-white hover:border-gray-200 bg-gray-50 border-transparent"
              }`}
          >
            <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-3 rounded-full text-gray-400 hover:text-black hover:bg-[#D4AF37] bg-gray-50 border border-transparent hover:border-[#D4AF37] transition-all duration-300"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <p className="text-zinc-500 text-sm line-clamp-2 mb-8 font-light leading-relaxed max-w-2xl">
        {product.description ||
          "Ideally suited for those who appreciate fine craftsmanship and timeless style. This piece exemplifies the Royal standard of quality with premium materials and exquisite attention to detail."}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
        <div className="flex items-center gap-4">
          {product.originalPrice && (
            <span className="text-sm text-zinc-400 line-through decoration-zinc-300">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-2xl font-serif text-black">
            ₹{(product.price || 0).toLocaleString()}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="group/btn flex items-center gap-2 px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all rounded-sm shadow-md hover:shadow-lg"
        >
          <ShoppingBag size={14} className="mb-0.5" />
          Add to Bag
        </button>
      </div>
    </div>
  </div>
);

export default Shop;
