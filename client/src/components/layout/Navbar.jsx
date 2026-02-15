import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { fetchSiteSettings, fetchProducts } from '../../utils/sanity';

const defaultLogo = "/images/logo.jpeg";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
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
        const storedUser = localStorage.getItem('userProfile');
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
            const filtered = allProducts.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filtered);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setIsSearchOpen(false);
            setSearchQuery('');
            navigate(`/shop?search=${searchQuery}`);
        }
    };

    const handleLogout = () => {
        // Clear user data
        localStorage.removeItem('userProfile');
        localStorage.removeItem('selectedAddress');
        setUser(null); // Clear local state
        navigate('/');
    };

    // Logic: Dark text IF NOT Home page OR IF Scrolled
    const isHome = location.pathname === '/';
    const isDarkText = !isHome || isScrolled;

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Heritage', path: '/heritage' },
        { name: 'Shop', path: '/shop' },
        { name: 'Royal Collection', path: '/royal-collection' },
        { name: 'Vault', path: '/vault' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isDarkText ? 'bg-white shadow-md py-2 border-b border-gray-100' : 'bg-transparent py-4 text-white'}`}
        >
            <div className={`container mx-auto px-8 md:px-12 h-14 flex justify-between items-center relative ${isDarkText ? 'text-black' : 'text-white'}`}>

                {/* LEFT: Menu & Search */}
                <div className="flex items-center gap-6 md:gap-8">
                    {/* Menu Trigger */}
                    <button
                        className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={16} strokeWidth={1.5} />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:block">Menu</span>
                    </button>

                    {/* Search Trigger */}
                    <button
                        className="flex items-center gap-3 hover:opacity-70 transition-opacity group"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={16} strokeWidth={1.5} />
                        <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:block">Search</span>
                    </button>

                    {/* Search Overlay */}
                    <AnimatePresence>
                        {isSearchOpen && (
                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 240, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                className={`absolute left-32 md:left-48 top-1/2 -translate-y-1/2 bg-transparent border-b flex items-center pb-1 ${isDarkText ? 'border-black' : 'border-white'}`}
                            >
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={`bg-transparent border-none outline-none text-sm w-full font-sans tracking-wide ${isDarkText ? 'text-black placeholder-gray-600' : 'text-white placeholder-gray-400'}`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={handleSearch}
                                    autoFocus
                                />
                                <X size={14} className={`cursor-pointer hover:opacity-70 ml-2 ${isDarkText ? 'text-black' : 'text-white'}`} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CENTER: Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group" onClick={() => window.scrollTo(0, 0)}>
                    {/* Using text logo to match LV style text */}
                    <span className="text-xl md:text-2xl font-bold tracking-[0.25em] uppercase hover:opacity-80 transition-opacity font-sans">
                        {siteSettings?.title || "MURGDUR"}
                    </span>
                </Link>

                {/* RIGHT: User Actions */}
                <div className="flex items-center gap-6 md:gap-8">
                    <Link to="/contact" className="hidden lg:block text-[11px] uppercase tracking-[0.2em] font-medium hover:opacity-70 transition-opacity">
                        Concierge
                    </Link>

                    {/* Wishlist */}
                    <Link to="/vault" className="hover:opacity-70 transition-opacity relative">
                        <Heart size={16} strokeWidth={1.5} />
                        {wishlistItems && wishlistItems.length > 0 && (
                            <span className={`absolute -top-1.5 -right-1.5 text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ${isDarkText ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>

                    {/* User Profile */}
                    <Link to={user ? "/profile" : "/login"} className="hover:opacity-70 transition-opacity">
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
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                        {/* Drawer Content - LV Style (Dark Theme) */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.4, ease: "easeOut" }}
                            className="relative w-full max-w-sm bg-royal-black h-screen shadow-2xl flex flex-col z-[101] overflow-y-auto"
                        >
                            {/* 1. Header: Close Button */}
                            <div className="flex items-center justify-between p-6 px-8 mb-4">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-white hover:text-royal-gold transition-colors group"
                                >
                                    <X size={20} strokeWidth={1} />
                                    <span className="text-xs uppercase tracking-widest font-medium">Close</span>
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
                                    <Link to="/profile" className="text-sm text-gray-300 font-sans tracking-wide hover:text-white transition-colors block mb-4" onClick={() => setIsMobileMenuOpen(false)}>
                                        <User size={14} className="inline mr-2" /> My Profile
                                    </Link>
                                    <Link to="/vault" className="text-sm text-gray-300 font-sans tracking-wide hover:text-white transition-colors block" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Heart size={14} className="inline mr-2" /> Wishlist
                                    </Link>
                                </div>
                            </div>

                            {/* 3. Footer Section (Help & Info) */}
                            <div className="px-8 py-10 mt-auto border-t border-white/10 bg-white/5">
                                <div className="mb-8">
                                    <p className="text-xs text-white uppercase tracking-widest mb-3">Can we help you?</p>
                                    <a href="tel:+9118001039988" className="text-lg text-white font-sans hover:text-royal-gold block mb-1">
                                        +91 1800 103 9988
                                    </a>
                                </div>

                                <div className="space-y-4">
                                    <Link to="/sustainability" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        Sustainability
                                    </Link>
                                    <Link to="/stores" className="block text-sm text-gray-400 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                        Find a Store
                                    </Link>
                                    <div className="pt-4 flex items-center gap-2 text-white">
                                        <span>🇮🇳</span>
                                        <span className="text-sm underline decoration-1 underline-offset-4 pointer-events-none">India</span>
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
