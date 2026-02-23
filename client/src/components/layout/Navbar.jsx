import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
} from "lucide-react";

// --- LUXURY ICONS ---
const XIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m13 13 54 54M67 13 13 67" />
  </svg>
);
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { fetchSiteSettings, fetchProducts } from "../../utils/sanity";

// --- LUXURY ICONS (THIN OUTLINE) ---
const SearchIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const WishlistIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const AccountIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CartIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const defaultLogo = "/images/logo.jpeg";

const menuData = [
  {
    id: "new",
    name: "New",
    path: "/shop?sort=newest",
    image: "/images/girl.png",
    imageSubtitle: "Latest Arrivals",
    subcategories: [
      { name: "For Women", path: "/shop?cat=women&sort=newest" },
      { name: "For Men", path: "/shop?cat=men&sort=newest" },
    ],
    highlights: [
      { name: "All New In", image: "/images/girl.png", path: "/shop?sort=newest" },
      { name: "New Bags", image: "/images/hand bag.png", path: "/shop?type=bags&sort=newest" },
    ]
  },
  {
    id: "bags",
    name: "Bags and Wallets",
    path: "/shop?type=bags",
    image: "/images/hand bag.png",
    imageSubtitle: "Signature Heritage",
    subcategories: [
      { name: "Women Bags", path: "/shop?cat=women&type=bags" },
      { name: "Men Bags", path: "/shop?cat=men&type=bags" },
      { name: "Women Small Leather Goods", path: "/shop?cat=women&type=wallets" },
      { name: "Men Small Leather Goods", path: "/shop?cat=men&type=wallets" },
      { name: "Personalisation", path: "/services" },
    ],
    highlights: [
      { name: "All Handbags", image: "/images/hand bag.png", path: "/shop?type=bags" },
      { name: "New In", image: "/images/girl.png", path: "/shop?type=bags&sort=newest" },
      { name: "Heritage Icons", image: "/images/cares.jpg", path: "/shop?collection=icons" },
      { name: "Signature Collection", image: "/images/zippy wallet.jpg", path: "/shop?collection=signature" },
      { name: "Side Trunk", image: "/images/vanitycase.jpg", path: "/shop?collection=side-trunk" },
      { name: "Capucines", image: "/images/woens small bag.jpg", path: "/shop?collection=capucines" },
    ]
  },
  {
    id: "women",
    name: "Women",
    path: "/shop?cat=women",
    image: "/images/girl.png",
    imageSubtitle: "Women's Collection",
    subcategories: [
      { name: "Bags", path: "/shop?cat=women&type=bags" },
      { name: "Small Leather Goods", path: "/shop?cat=women&type=wallets" },
      { name: "Accessories", path: "/shop?cat=women&type=accessories" },
      { name: "Perfumes", path: "/shop?cat=women&type=perfumes" },
    ],
    highlights: [
      { name: "All Women's Collection", image: "/images/girl.png", path: "/shop?cat=women" },
      { name: "Women's Perfumes", image: "/images/per.jpg", path: "/shop?cat=women&type=perfumes" },
    ]
  },
  {
    id: "men",
    name: "Men",
    path: "/shop?cat=men",
    image: "/images/boy.jpeg",
    imageSubtitle: "Men's Collection",
    subcategories: [
      { name: "Bags", path: "/shop?cat=men&type=bags" },
      { name: "Small Leather Goods", path: "/shop?cat=men&type=wallets" },
      { name: "Accessories", path: "/shop?cat=men&type=accessories" },
      { name: "Perfumes", path: "/shop?cat=men&type=perfumes" },
    ],
    highlights: [
      { name: "All Men's Collection", image: "/images/boy.jpeg", path: "/shop?cat=men" },
      { name: "Men's Wallets", image: "/images/mens_royal_wallet_section.png", path: "/shop?cat=men&type=wallets" },
    ]
  },
  {
    id: "perfumes",
    name: "Perfumes",
    path: "/shop?type=perfumes",
    image: "/images/per.jpg",
    imageSubtitle: "Fragrances",
    subcategories: [
      { name: "Women's Perfumes", path: "/shop?cat=women&type=perfumes" },
      { name: "Men's Perfumes", path: "/shop?cat=men&type=perfumes" },
    ],
    highlights: [
      { name: "All Perfumes", image: "/images/per.jpg", path: "/shop?type=perfumes" },
      { name: "New Fragrances", image: "/images/royal_perfume.png", path: "/shop?type=perfumes&sort=newest" },
    ]
  },
  {
    id: "jewellery",
    name: "Jewellery",
    path: "/shop?type=jewellery",
    image: "/images/royal_jewellery.png",
    imageSubtitle: "Fine Jewellery",
    subcategories: [
      { name: "Rings", path: "/shop?type=jewellery&search=rings" },
      { name: "Necklaces", path: "/shop?type=jewellery&search=necklaces" },
      { name: "Bracelets", path: "/shop?type=jewellery&search=bracelets" },
      { name: "Earrings", path: "/shop?type=jewellery&search=earrings" },
    ],
    highlights: [
      { name: "All Jewellery", image: "/images/royal_jewellery.png", path: "/shop?type=jewellery" },
      { name: "Royal Collection", image: "/images/royal_gown.png", path: "/royal-collection" },
    ]
  },
  {
    id: "watches",
    name: "Watches",
    path: "/shop?type=watches",
    image: "/images/watch1.png",
    imageSubtitle: "Timepieces",
    subcategories: [
      { name: "Women's Watches", path: "/shop?cat=women&type=watches" },
      { name: "Men's Watches", path: "/shop?cat=men&type=watches" },
    ],
    highlights: [
      { name: "All Watches", image: "/images/watch1.png", path: "/shop?type=watches" },
      { name: "New Watches", image: "/images/watch 2.png", path: "/shop?type=watches&sort=newest" },
    ]
  },
];

const Navbar = () => {
  const [activeMenuId, setActiveMenuId] = useState("bags");
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

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
    { name: "Collections", path: "/collections-showcase" },
    { name: "Shop", path: "/shop" },
    { name: "Royal Collection", path: "/royal-collection" },
    { name: "Vault", path: "/vault" },
  ];

  const textColor = isScrolled ? "text-black" : "text-white";
  const iconColor = isScrolled ? "text-black" : "text-white";
  const barColor = isScrolled ? "bg-black" : "bg-white";

  return (
    <header
      className={`fixed w-full z-50 top-0 transition-all duration-500 ${isScrolled
        ? "bg-white shadow-[inset_0_-1px_#e1e1e1]"
        : "bg-gradient-to-b from-black/75 via-black/30 to-transparent"
        }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      {/* ── TOP BAR ── */}
      <div className="flex items-center h-[3.5rem] md:h-[4.25rem] relative px-4 md:px-8 lg:px-14 xl:px-16 w-full">

        {/* LEFT: hamburger + desktop search */}
        <div className="flex-none flex h-full items-center gap-6 lg:gap-10">
          <button
            className={`flex items-center gap-2.5 hover:opacity-70 transition-opacity ${textColor}`}
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <div className="w-[18px] flex flex-col gap-[5px]">
              <span className={`block w-full h-[1.2px] ${barColor}`}></span>
              <span className={`block w-full h-[1.2px] ${barColor}`}></span>
              <span className={`block w-full h-[1.2px] ${barColor}`}></span>
            </div>
            <span className="hidden md:block text-[9px] uppercase tracking-[0.25em] font-bold">MENU</span>
          </button>

          {/* Search Button — desktop only */}
          <button
            className={`hidden md:flex items-center gap-2 hover:opacity-70 transition-opacity ${textColor}`}
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
          >
            <SearchIcon className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold">SEARCH</span>
          </button>
        </div>

        {/* CENTER: Logo absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Link
            to="/"
            className="flex items-center justify-center hover:opacity-80 transition-opacity pointer-events-auto"
            onClick={() => window.scrollTo(0, 0)}
          >
            <span className={`text-[1.05rem] md:text-[1.35rem] tracking-[0.3em] md:tracking-[0.45em] font-sans font-bold uppercase whitespace-nowrap transition-colors duration-500 ${textColor}`}>
              {siteSettings?.title || "MURGDUR"}
            </span>
          </Link>
        </div>

        {/* RIGHT: desktop extras + cart + account */}
        <div className="flex-1 flex h-full items-center justify-end gap-4 md:gap-6 lg:gap-9">
          {/* Call Us — desktop only */}
          <Link
            to="/contact"
            className={`hidden lg:block text-[9px] uppercase tracking-[0.25em] font-bold hover:opacity-70 transition-opacity ${textColor}`}
          >
            CALL US
          </Link>

          {/* Wishlist — desktop only */}
          <Link
            to="/vault"
            className={`hidden md:flex items-center hover:opacity-70 transition-opacity ${iconColor}`}
            title="Wishlist"
          >
            <WishlistIcon className="w-[18px] h-[18px]" />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`flex items-center hover:opacity-70 transition-opacity relative ${iconColor}`}
            title="Shopping Bag"
          >
            <CartIcon className="w-[18px] h-[18px]" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-[8px] font-bold w-[13px] h-[13px] rounded-full flex items-center justify-center bg-[#c9a96e] text-black leading-none">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Account */}
          <Link
            to={user ? "/profile" : "/login"}
            className={`flex items-center hover:opacity-70 transition-opacity ${iconColor}`}
            title={user ? "My Profile" : "Sign In"}
          >
            <AccountIcon className="w-[18px] h-[18px]" />
          </Link>
        </div>
      </div>

      {/* ── MOBILE SEARCH BAR (below top bar, mobile only) ── */}
      <div className={`md:hidden transition-colors duration-500 ${
        isScrolled ? "border-t border-gray-200 bg-white" : "border-t border-white/15"
      }`}>
        <div className="px-4 py-2">
          <div className={`flex items-center gap-2.5 rounded-sm px-3 py-2 ${
            isScrolled ? "border border-gray-300" : "border border-white/30"
          }`}>
            <SearchIcon className={`w-4 h-4 flex-shrink-0 ${
              isScrolled ? "text-gray-400" : "text-white/60"
            }`} />
            <input
              type="text"
              placeholder='Search for "New Arrivals"'
              className={`bg-transparent border-none outline-none text-[13px] w-full font-sans tracking-wide ${
                isScrolled ? "text-black placeholder-gray-400" : "text-white placeholder-white/60"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={`flex-shrink-0 ${
                  isScrolled ? "text-gray-400" : "text-white/60"
                }`}
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH DROPDOWN OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden border-t border-black/5 z-40"
          >
            <div className="relative flex flex-col items-center justify-center w-full px-6 md:px-12 py-6">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-6 top-6 text-black hover:opacity-70 transition-opacity"
              >
                <XIcon className="w-6 h-6" />
              </button>
              <div className="w-full max-w-[45rem] mt-6 md:mt-2">
                <div className="border-b border-black text-black flex items-center pb-2">
                  <SearchIcon className="w-5 h-5 mr-4 opacity-50" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-base md:text-lg w-full font-sans tracking-wide placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    autoFocus
                  />
                </div>
                {/* Search Results Preview */}
                {searchResults.length > 0 && (
                  <div className="mt-6 max-h-[50vh] overflow-y-auto custom-scrollbar flex flex-col">
                    {searchResults.slice(0, 5).map(product => (
                      <Link
                        key={product._id}
                        to={`/product/${product.slug?.current || product._id}`}
                        className="flex items-center gap-6 px-4 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                      >
                        <div className="w-16 h-16 bg-gray-50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={product.mainImage || product.images?.[0] || "/images/placeholder.png"}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                            onError={(e) => e.target.src = "/images/placeholder.png"}
                          />
                        </div>
                        <div>
                          <h4 className="text-sm tracking-widest uppercase font-medium text-black">{product.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MEGA MENU DRAWER */}
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

            {/* Mega Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
              className="relative w-full md:w-[85vw] lg:w-[75vw] xl:w-[70vw] h-[100dvh] bg-white flex flex-col md:flex-row z-[101] overflow-y-auto md:overflow-hidden text-black shadow-2xl"
            >
              {/* --- COLUMN 1: Main Categories (Left) --- */}
              <div className="w-full md:w-[320px] lg:w-[380px] flex-shrink-0 flex flex-col h-full md:border-r border-gray-100 bg-white z-10 relative">
                {/* Header (Close) */}
                <div className="flex items-center justify-between p-6 px-8 shrink-0">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity group"
                  >
                    <XIcon className="w-5 h-5" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium mt-[2px]">Close</span>
                  </button>
                </div>

                {/* Main Links */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-4 flex flex-col gap-6">
                  {menuData.map((item) => (
                    <div key={item.id} className="group">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onMouseEnter={() => {
                          if (window.innerWidth >= 768) {
                            setActiveMenuId(item.id);
                          }
                        }}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            setActiveMenuId(activeMenuId === item.id ? null : item.id);
                          }
                        }}
                      >
                        <Link
                          to={item.path}
                          className={`text-lg font-sans tracking-wide transition-colors ${activeMenuId === item.id ? "font-medium" : "text-gray-900 group-hover:text-gray-500"}`}
                          onClick={(e) => {
                            if (window.innerWidth < 768 && item.subcategories?.length) {
                              e.preventDefault();
                            }
                          }}
                        >
                          {item.name}
                        </Link>
                        {/* Mobile Expand Icon */}
                        <div className="md:hidden text-gray-400">
                          {item.subcategories?.length > 0 && (
                            <span className="text-xl leading-none font-light">{activeMenuId === item.id ? '-' : '+'}</span>
                          )}
                        </div>
                        {/* Desktop Expand Icon */}
                        <div className="hidden md:block text-gray-400">
                          {item.subcategories?.length > 0 && <span className={`text-lg transition-opacity font-light leading-none opacity-0 ${activeMenuId === item.id ? "opacity-100" : "group-hover:opacity-100"} -mt-1`}>›</span>}
                        </div>
                      </div>

                      {/* Mobile Accordion Submenu */}
                      <AnimatePresence>
                        {activeMenuId === item.id && item.subcategories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden md:!hidden mt-4 pl-4 flex flex-col gap-4 border-l border-gray-200"
                          >
                            {item.subcategories.map((sub, idx) => (
                              <Link
                                key={idx}
                                to={sub.path}
                                className="text-sm font-sans tracking-wide text-gray-500 hover:text-black transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <div className="border-t border-gray-100 my-2" />

                  {/* Standard Links */}
                  {["Trunks, Travel and Home", "Services", "The Maison Murgdur"].map((name) => {
                    const linkMap = {
                      "Trunks, Travel and Home": "/shop?type=travel",
                      "Services": "/services",
                      "The Maison Murgdur": "/heritage",
                    };
                    return (
                    <Link
                      key={name}
                      to={linkMap[name]}
                      className="text-base font-sans text-gray-600 tracking-wide hover:text-black transition-colors block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {name}
                    </Link>
                    );
                  })}

                  <div className="pt-8 mt-2 md:hidden">
                    <Link to="/profile" className="text-sm text-gray-600 font-sans tracking-wide hover:text-black transition-colors flex items-center mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                      <AccountIcon className="w-4 h-4 mr-3" /> My Profile
                    </Link>
                    <Link to="/vault" className="text-sm text-gray-600 font-sans tracking-wide hover:text-black transition-colors flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                      <WishlistIcon className="w-4 h-4 mr-3" /> Wishlist
                    </Link>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="px-8 py-8 mt-auto border-t border-gray-100 shrink-0 bg-gray-50/50">
                  <div className="mb-6">
                    <p className="text-[11px] text-gray-500 font-sans tracking-[0.1em] uppercase mb-2">Can we help you?</p>
                    <a href="tel:+9118001039988" className="text-sm tracking-wider text-black font-sans hover:underline block">+91 1800 103 9988</a>
                  </div>
                  <div className="space-y-4">
                    <Link to="/sustainability" className="block text-xs uppercase tracking-widest font-sans text-gray-600 hover:text-black transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Sustainability</Link>
                    <Link to="/stores" className="block text-xs uppercase tracking-widest font-sans text-gray-600 hover:text-black transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Find a Store</Link>
                    <div className="pt-2 flex items-center gap-2 text-black">
                      <span className="text-xs uppercase tracking-widest font-medium font-sans">Country: India</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- DESKTOP REMAINDER: Subcategories & Highlights --- */}
              <div className="hidden md:flex flex-1 h-full bg-[#f8f8f8] relative">
                <AnimatePresence mode="wait">
                  {menuData.map((item) => (
                    activeMenuId === item.id && (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 flex w-full h-full"
                      >
                        {/* COLUMN 2: Subcategories (Middle) */}
                        <div className="w-[35%] min-w-[280px] bg-white border-r border-gray-100 flex flex-col h-full z-0 relative">
                          {/* Image Highlight */}
                          <div className="w-full aspect-[4/3] relative flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden group" onClick={() => { navigate(item.path); setIsMobileMenuOpen(false); }}>
                            <img src={item.image} alt={item.imageSubtitle} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            {/* Inner tint for text legibility */}
                            <div className="absolute inset-0 bg-black/5 transition-opacity group-hover:bg-black/10" />
                          </div>
                          <div className="border-b border-gray-100 py-4 px-8 bg-white z-10 shrink-0">
                            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-center text-black">{item.imageSubtitle}</p>
                          </div>

                          {/* Sub Links */}
                          <div className="px-10 py-8 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
                            {item.subcategories?.map((sub, idx) => (
                              <Link
                                key={idx}
                                to={sub.path}
                                className="text-[13px] uppercase tracking-[0.1em] font-sans text-gray-600 hover:text-black flex justify-between items-center group/sub transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                                <span className="opacity-0 group-hover/sub:opacity-100 transition-opacity text-lg leading-none -mt-1 font-light">›</span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* COLUMN 3: Featured / Highlights (Right) */}
                        <div className="flex-1 bg-white p-8 overflow-y-auto custom-scrollbar relative z-0">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-10 max-w-4xl mx-auto">
                            {item.highlights?.map((hl, idx) => (
                              <Link
                                key={idx}
                                to={hl.path}
                                className="flex flex-col items-center group cursor-pointer"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div className="w-full aspect-square bg-[#f0efed] mb-4 overflow-hidden relative">
                                  <img src={hl.image} alt={hl.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    onError={(e) => { e.target.style.opacity = '0'; }}
                                  />
                                </div>
                                <span className="text-xs uppercase tracking-[0.15em] font-medium text-black text-center transition-opacity group-hover:opacity-70">{hl.name}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;