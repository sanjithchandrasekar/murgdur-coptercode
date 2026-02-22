import React, { useState, useMemo, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  Grid,
  List,
  Filter,
  X,
  ChevronDown,
  Heart,
  ShoppingBag,
  ChevronRight,
  SlidersHorizontal,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet-async";

// Import product data
import { products } from "../data/productsCollection";

const ProductCollection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const navigate = useNavigate();

  // View mode state
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    price: true,
    color: true,
  });

  // Get active filters from URL
  const getTabs = () => {
    const categories = searchParams.get("cat")
      ? searchParams.get("cat").split(",")
      : [];
    return categories.length > 0 ? categories : ["all"];
  };

  const activeTab = searchParams.get("cat") || "all";

  const getPriceRange = () => {
    const price = searchParams.get("price");
    return price ? { min: parseInt(price.split("-")[0]), max: parseInt(price.split("-")[1]), value: price } : null;
  };

  const getSelectedColors = () => {
    const colors = searchParams.get("colors");
    return colors ? colors.split(",") : [];
  };

  const getSortBy = () => searchParams.get("sort") || "relevance";
  const getSearch = () => searchParams.get("search") || "";

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    const tabs = getTabs();
    const priceRange = getPriceRange();
    const colors = getSelectedColors();
    const search = getSearch().toLowerCase();

    // Category filter
    if (!tabs.includes("all")) {
      filtered = filtered.filter((p) =>
        tabs.some((tab) => p.category?.toLowerCase().includes(tab.toLowerCase()))
      );
    }

    // Price filter
    if (priceRange) {
      filtered = filtered.filter(
        (p) => p.price >= priceRange.min && p.price <= priceRange.max
      );
    }

    // Color filter
    if (colors.length > 0) {
      filtered = filtered.filter((p) =>
        colors.some((color) => p.colors?.includes(color))
      );
    }

    // Search filter
    if (search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search) ||
        p.description?.toLowerCase().includes(search)
      );
    }

    // Sorting
    const sortBy = getSortBy();
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      case "relevance":
      default:
        break;
    }

    return filtered;
  }, [searchParams]);

  const updateFilter = useCallback(
    (key, value) => {
      const newParams = new URLSearchParams(searchParams);
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const toggleCategory = (category) => {
    const tabs = getTabs();
    let newTabs;
    if (category === "all") {
      newTabs = ["all"];
    } else if (tabs.includes(category)) {
      newTabs = tabs.filter((t) => t !== category);
      if (newTabs.length === 0) newTabs = ["all"];
    } else {
      newTabs = tabs.includes("all") ? [category] : [...tabs, category];
    }
    updateFilter("cat", newTabs.includes("all") ? null : newTabs.join(","));
  };

  const toggleColor = (color) => {
    const colors = getSelectedColors();
    let newColors;
    if (colors.includes(color)) {
      newColors = colors.filter((c) => c !== color);
    } else {
      newColors = [...colors, color];
    }
    updateFilter("colors", newColors.length > 0 ? newColors.join(",") : null);
  };

  const handleSearch = (val) => {
    updateFilter("search", val);
  };

  // Unique colors and price ranges
  const uniqueColors = useMemo(() => {
    const colorSet = new Set();
    products.forEach((p) => {
      if (p.colors) p.colors.forEach((c) => colorSet.add(c));
    });
    return Array.from(colorSet);
  }, []);

  const priceRanges = [
    { label: "Under ₹5,000", value: "0-5000" },
    { label: "₹5,000 - ₹15,000", value: "5000-15000" },
    { label: "₹15,000 - ₹30,000", value: "15000-30000" },
    { label: "₹30,000 - ₹50,000", value: "30000-50000" },
    { label: "Above ₹50,000", value: "50000-1000000" },
  ];

  const categories = [
    { label: "All Items", value: "all", id: "all" },
    { label: "Men", value: "men", id: "men" },
    { label: "Women", value: "women", id: "women" },
    { label: "Accessories", value: "accessories", id: "accessories" },
  ];

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="bg-[#fffefe] min-h-screen pt-28 pb-20 font-sans text-gray-900">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Collections | Murgdur</title>
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* HEADLINE */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <nav className="flex items-center gap-2 text-[11px] text-gray-500 font-sans tracking-wide mb-3">
            <Link to="/" className="hover:text-black transition-colors">
              Murgdur
            </Link>
            <span>›</span>
            <span className="text-black">Collections</span>
            {activeTab !== "all" && (
              <>
                <span>›</span>
                <span className="text-black">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </span>
              </>
            )}
          </nav>
          <h1 className="text-3xl md:text-4xl font-sans text-black mb-4 uppercase tracking-widest">
            {activeTab === "all" || getTabs().includes("all")
              ? "All Collections"
              : getTabs().length === 1
                ? getTabs()[0].charAt(0).toUpperCase() + getTabs()[0].slice(1)
                : "Collections"}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          {/* SIDEBAR */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.aside
                key="sidebar"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-3 overflow-hidden"
              >
                <div className="sticky top-32 space-y-8 pr-2">
                  {/* Category Filter */}
                  <div>
                    <h3 className="font-serif text-lg mb-4 flex items-center justify-between">
                      Category
                    </h3>
                    <div className="space-y-3">
                      {categories.map((cat) => (
                        <label
                          key={cat.id}
                          className="flex items-center gap-3 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 rounded-sm ${getTabs().includes(cat.value) ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-500"}`}
                          >
                            {getTabs().includes(cat.value) && (
                              <div className="w-2.5 h-2.5 bg-white" />
                            )}
                          </div>
                          <span
                            className={`text-sm tracking-wide transition-colors ${getTabs().includes(cat.value) ? "text-black font-semibold" : "text-gray-500 group-hover:text-black"}`}
                          >
                            {cat.label}
                          </span>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={getTabs().includes(cat.value)}
                            onChange={() => toggleCategory(cat.value)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h3 className="font-serif text-lg mb-4">Price</h3>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <label
                          key={range.value}
                          className="flex items-center gap-3 cursor-pointer group select-none"
                        >
                          <div
                            className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 rounded-sm ${getPriceRange()?.value === range.value ? "bg-black border-black" : "border-gray-300 group-hover:border-gray-500"}`}
                          >
                            {getPriceRange()?.value === range.value && (
                              <div className="w-2.5 h-2.5 bg-white" />
                            )}
                          </div>
                          <span
                            className={`text-sm tracking-wide transition-colors ${getPriceRange()?.value === range.value ? "text-black font-semibold" : "text-gray-500 group-hover:text-black"}`}
                          >
                            {range.label}
                          </span>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={getPriceRange()?.value === range.value}
                            onChange={() => updateFilter("price", getPriceRange()?.value === range.value ? null : range.value)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Active Filters Clear */}
                  {(getTabs().length > 0 && !getTabs().includes("all") ||
                    getPriceRange() ||
                    getSearch()) && (
                      <button
                        onClick={clearAllFilters}
                        className="w-full py-3 border border-dashed border-gray-300 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-red-600 hover:border-red-300 transition-all flex items-center justify-center gap-2"
                      >
                        <X size={14} /> Clear All Filters
                      </button>
                    )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* MAIN CONTENT */}
          <div className={showFilters ? "lg:col-span-9" : "lg:col-span-12"}>
            {/* TOOLBAR */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 py-4 bg-white sticky top-28 z-20">
              {/* Left: Filters & Search */}
              <div className="flex items-center gap-6 w-full md:w-auto flex-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 text-sm font-sans tracking-wide text-black hover:opacity-70 transition-opacity"
                >
                  <SlidersHorizontal size={16} strokeWidth={1.5} />
                  <span>Filters</span>
                </button>

                {/* Search Bar Minimal */}
                <div className="relative flex-1 max-w-[200px] group hidden sm:block">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={getSearch()}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 border-b border-gray-200 py-1 pl-1 pr-6 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                  <Search
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />
                </div>
              </div>

              {/* Right: Sort & View */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-end mt-4 md:mt-0">
                {/* Sort */}
                <div className="flex items-center gap-2 group">
                  <div className="relative">
                    <select
                      value={getSortBy()}
                      onChange={(e) => updateFilter("sort", e.target.value)}
                      className="bg-transparent text-sm font-sans tracking-wide text-black focus:outline-none cursor-pointer pr-5 py-1 appearance-none hover:opacity-70 transition-opacity"
                    >
                      <option value="relevance">Sort by</option>
                      <option value="newest">Newest</option>
                      <option value="rating">Top Rated</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                    </select>
                    <ChevronDown
                      size={14} strokeWidth={1.5}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-black pointer-events-none group-hover:opacity-70 transition-opacity"
                    />
                  </div>
                </div>

                {/* View Mode */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`transition-opacity duration-300 ${viewMode === "grid" ? "text-black opacity-100" : "text-black opacity-50 hover:opacity-100"}`}
                    title="Grid View"
                  >
                    <Grid size={18} strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`transition-opacity duration-300 ${viewMode === "list" ? "text-black opacity-100" : "text-black opacity-50 hover:opacity-100"}`}
                    title="List View"
                  >
                    <List size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID / LIST */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <p className="text-gray-500 text-lg mb-6">
                    No products found matching your criteria.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
                      : "space-y-6"
                  }
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id || product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {viewMode === "grid" ? (
                        <ProductCard
                          product={product}
                          addToWishlist={addToWishlist}
                          isInWishlist={wishlistItems.some(
                            (i) => i.id === product.id,
                          )}
                        />
                      ) : (
                        <ProductListCard
                          product={product}
                          addToWishlist={addToWishlist}
                          isInWishlist={wishlistItems.some(
                            (i) => i.id === product.id,
                          )}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Product Card
const ProductCard = ({ product, addToWishlist, isInWishlist }) => {
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

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(product);
          }}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-300 z-20 ${isInWishlist
            ? "opacity-100 text-red-500"
            : "opacity-0 group-hover:opacity-100 text-black hover:text-red-500"
            }`}
          title="Add to Wishlist"
        >
          <Heart size={18} strokeWidth={1.5} fill={isInWishlist ? "currentColor" : "none"} />
        </button>
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

const ProductListCard = ({ product, addToWishlist, isInWishlist }) => {
  const navigate = useNavigate();

  return (
    <div className="group flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 hover:border-black/10 transition-all duration-300 p-4 rounded-sm hover:-translate-y-1">
      <div
        className="relative w-full sm:w-56 aspect-[4/5] overflow-hidden bg-[#F6F5F3] flex-shrink-0 cursor-pointer"
        onClick={() => navigate(`/product/${product.id || product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center text-left py-2 pr-4">
        <div className="flex justify-between items-start mb-4">
          <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id || product._id}`)}>
            <h3 className="text-xl font-sans tracking-wide text-black transition-colors mb-3">
              {product.name}
            </h3>
            <div className="flex items-center gap-4 mb-3">
              {product.rating && (
                <div className="flex text-yellow-500 text-xs gap-0.5">
                  {"★".repeat(Math.round(product.rating || 5))}
                  <span className="text-gray-200">
                    {"★".repeat(5 - Math.round(product.rating || 5))}
                  </span>
                </div>
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
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
                }`}
            >
              <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-8 font-light leading-relaxed max-w-2xl cursor-pointer" onClick={() => navigate(`/product/${product.id || product._id}`)}>
          {product.description || "Premium quality product."}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <div className="flex items-center gap-4">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-xl font-sans text-black">
              ₹{(product.price || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
