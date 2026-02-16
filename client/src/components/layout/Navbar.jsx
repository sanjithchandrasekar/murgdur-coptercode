import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { fetchSiteSettings, fetchProducts } from "../../utils/sanity";

const defaultLogo = "/images/logo.jpeg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount, wishlistItems } = useCart();
  const [user, setUser] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);

  // Fetch Site Settings
  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchSiteSettings();
      if (data) setSiteSettings(data);
    };
    loadSettings();
  }, []);

  // Check for user login on mount and route change
  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const [allProducts, setAllProducts] = useState([]);

  // Fetch Products for Search functionality
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      if (products) setAllProducts(products);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setIsSearchOpen(false);
      setSearchQuery("");
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userProfile");
    localStorage.removeItem("selectedAddress");
    setUser(null); // Clear local state
    navigate("/");
  };

  // Logic: Dark text IF NOT Home page OR IF Scrolled
  const isHome = location.pathname === "/";
  const isDarkText = !isHome || isScrolled;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Heritage", path: "/heritage" },
    { name: "Shop", path: "/shop" },
    { name: "Royal Collection", path: "/royal-collection" },
    { name: "Vault", path: "/vault" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-4"} ${isScrolled ? "text-black" : "text-white"}`}
    >
      <div className="container mx-auto px-6 md:px-12 h-12 flex justify-between items-center relative">
        {/* LEFT: Menu & Search */}
        <div className="flex items-center gap-6 md:gap-8">
          {/* Menu Trigger */}
          <button
            className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={16} strokeWidth={1.5} />
            {!isSearchOpen && (
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:block">
                Menu
              </span>
            )}
          </button>

          {/* Search Trigger */}
          <button
            className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open Search"
          >
            <Search size={16} strokeWidth={1.5} />
            {!isSearchOpen && (
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:block">
                Search
              </span>
            )}
          </button>

          {/* Search Overlay & Results */}
          <AnimatePresence>
            {isSearchOpen && (
              <div className="absolute left-28 md:left-36 top-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className={`bg-transparent border-b flex items-center pb-1 ${isScrolled ? "border-black" : "border-white"}`}
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`bg-transparent border-none outline-none text-sm w-full font-sans tracking-wide placeholder-gray-400 ${isScrolled ? "text-black" : "text-white"}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    autoFocus
                  />
                  <X
                    size={14}
                    className={`cursor-pointer hover:opacity-70 ml-2 ${isScrolled ? "text-black" : "text-white"}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                  />
                </motion.div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-4 w-72 bg-white shadow-2xl rounded-sm overflow-hidden py-2 z-[60] border border-gray-100"
                    >
                      <div className="max-h-80 overflow-y-auto custom-scrollbar">
                        {searchResults.slice(0, 6).map((product) => (
                          <Link
                            key={product._id}
                            to={`/product/${product.slug?.current || product._id}`}
                            className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="w-12 h-12 bg-gray-50 rounded flex-shrink-0 overflow-hidden border border-gray-100">
                              <img
                                src={
                                  product.mainImage ||
                                  product.images?.[0] ||
                                  "/images/placeholder.png"
                                }
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/images/placeholder.png";
                                }}
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[12px] font-medium text-black truncate lowercase first-letter:uppercase">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-gray-500 mt-0.5">
                                {product.price}
                              </span>
                            </div>
                          </Link>
                        ))}
                        {searchResults.length > 6 && (
                          <button
                            onClick={() => {
                              navigate(`/shop?search=${searchQuery}`);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="w-full py-3 text-[10px] text-gray-400 uppercase tracking-widest hover:text-black transition-colors bg-gray-50/50"
                          >
                            View all results ({searchResults.length})
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Logo */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center group"
          onClick={() => window.scrollTo(0, 0)}
        >
          {/* Using text logo to match LV style text */}
          <span className="text-xl md:text-2xl font-bold tracking-[0.25em] uppercase hover:opacity-80 transition-opacity font-sans">
            {siteSettings?.title || "MURGDUR"}
          </span>
        </Link>

        {/* RIGHT: User Actions */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            to="/contact"
            className="hidden lg:block text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-opacity"
            aria-label="Contact Us"
          >
            Call Us
          </Link>

          {/* Wishlist */}
          <Link
            to="/vault"
            className="hover:opacity-70 transition-opacity relative"
            aria-label={`Wishlist ${wishlistItems?.length > 0 ? `(${wishlistItems.length} items)` : ""}`}
            title="Wishlist"
          >
            <Heart size={16} strokeWidth={1.5} />
            {wishlistItems && wishlistItems.length > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ${isScrolled ? "bg-black text-white" : "bg-white text-black"}`}
              >
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Cart - Added for E-commerce flow */}
          <Link
            to="/cart"
            className="hover:opacity-70 transition-opacity relative"
            aria-label={`Cart ${getCartCount() > 0 ? `(${getCartCount()} items)` : ""}`}
            title="Shopping Bag"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
            {getCartCount() > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ${isScrolled ? "bg-[#D4AF37] text-black" : "bg-[#D4AF37] text-black"}`}
              >
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* User Profile */}
          <Link
            to={user ? "/profile" : "/login"}
            className="hover:opacity-70 transition-opacity"
            aria-label="User Profile"
          >
            <User size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Universal Menu Drawer (Mobile & Desktop) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Drawer Content-LV Style (Dark Theme) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-sm bg-royal-black h-screen shadow-2xl flex flex-col z-[101] overflow-y-auto"
            >
              {/* 1. Header: Close Button */}
              <div className="flex items-center justify-between p-6 px-8 mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-white hover:text-royal-gold transition-colors group"
                >
                  <X size={20} strokeWidth={1} />
                  <span className="text-xs uppercase tracking-widest font-medium">
                    Close
                  </span>
                </button>
              </div>

              {/* 2. Main Navigation List */}
              <div className="flex-1 px-8 pb-12 flex flex-col gap-6">
                {[
                  { name: "New", path: "/shop?sort=newest" },
                  { name: "Men", path: "/shop?cat=men" },
                  { name: "Women", path: "/shop?cat=women" },
                  { name: "Bags and Wallets", path: "/shop?type=bags" },
                  { name: "Perfumes", path: "/shop?type=perfumes" },
                  { name: "Jewellery", path: "/shop?type=accessories" },
                  { name: "Royal Collection", path: "/royal-collection" },
                  { name: "Services", path: "/services" },
                  { name: "The Maison Murugdur", path: "/about" },
                ].map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg text-white font-sans font-medium tracking-wide hover:text-royal-gold transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 mt-2 border-t border-white/10">
                  <Link
                    to="/profile"
                    className="text-sm text-gray-300 font-sans tracking-wide hover:text-white transition-colors block mb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={14} className="inline mr-2" /> My Profile
                  </Link>
                  <Link
                    to="/vault"
                    className="text-sm text-gray-300 font-sans tracking-wide hover:text-white transition-colors block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart size={14} className="inline mr-2" /> Wishlist
                  </Link>
                </div>
              </div>

              {/* 3. Footer Section (Help & Info) */}
              <div className="px-8 py-10 mt-auto border-t border-white/10 bg-white/5">
                <div className="mb-8">
                  <p className="text-xs text-white uppercase tracking-widest mb-3">
                    Murgdur Client Service
                  </p>
                  <a
                    href="tel:+914445614700"
                    className="text-lg text-white font-sans hover:text-royal-gold block mb-1"
                  >
                    +91 44 4561 4700
                  </a>
                </div>

                <div className="space-y-4">
                  <Link
                    to="/sustainability"
                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Our Commitment
                  </Link>
                  <Link
                    to="/stores"
                    className="block text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Boutique Locator
                  </Link>
                  <div className="pt-4 flex items-center gap-2 text-white">
                    <span>🇮🇳</span>
                    <span className="text-sm border-b border-white pb-1 pointer-events-none">
                      Murgdur India
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
