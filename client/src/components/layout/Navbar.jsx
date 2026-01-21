import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowLeft, Package, Star, Gift, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const logo = "/images/logo.jpeg";

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

    // Check for user login on mount and route change
    useEffect(() => {
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [location]);

    // Mock data for search suggestions (Shared with Shop)
    const mockSearchData = [
        { id: 1, name: "Royal Silk Sherwani", category: "Men" },
        { id: 2, name: "Velvet Bandhgala", category: "Men" },
        { id: 3, name: "Crimson Bridal Lehenga", category: "Women" },
        { id: 4, name: "Signature Leather Bag", category: "Accessories" },
        { id: 5, name: "Midnight Blue Suit", category: "Men" },
        { id: 6, name: "Gold Zari Saree", category: "Women" },
    ];

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filtered = mockSearchData.filter(item =>
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
            className={`fixed w-full z-50 transition-all duration-300 ${isDarkText ? 'bg-royal-black/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent py-4'}`}
        >
            <div className="container mx-auto px-6 h-16 flex justify-between items-center relative">

                {/* LEFT: Logo, Menu & Search */}
                <div className="flex items-center gap-4 md:gap-8">


                    {/* Back Button (Visible on non-home pages) */}
                    {!isHome && (
                        <button
                            className="flex items-center gap-2 text-white hover:text-royal-gold transition-colors group mr-2"
                            onClick={() => navigate(-1)}
                            title="Go Back"
                        >
                            <ArrowLeft size={20} strokeWidth={1.5} />
                            {/* Optional Label (Hidden on small screens) */}
                            {/* <span className="hidden md:block text-xs uppercase tracking-widest font-medium">Back</span> */}
                        </button>
                    )}

                    {/* Menu Trigger */}
                    <button
                        className="flex items-center gap-2 text-white hover:text-royal-gold transition-colors group"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={20} strokeWidth={1.5} />
                        <span className="hidden md:block text-xs uppercase tracking-widest font-medium group-hover:underline underline-offset-4 decoration-royal-gold/50">Menu</span>
                    </button>

                    {/* Search Section */}
                    <div className="flex items-center">
                        <AnimatePresence mode="wait">
                            {isSearchOpen ? (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 220, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="flex items-center bg-white/10 rounded-full px-3 py-1.5 border border-white/20 relative"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-gray-400 font-sans tracking-wide"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleSearch}
                                        autoFocus
                                    />
                                    <X size={14} className="text-gray-400 cursor-pointer hover:text-white shrink-0 ml-2" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} />

                                    {/* Inline Results Dropdown */}
                                    {searchQuery.length > 0 && (
                                        <div className="absolute top-full left-0 mt-4 w-64 bg-royal-black border border-white/10 rounded shadow-xl overflow-hidden z-[60]">
                                            {searchResults.length > 0 ? (
                                                searchResults.map(result => (
                                                    <div
                                                        key={result.id}
                                                        onClick={() => {
                                                            navigate(`/shop?search=${result.name}`);
                                                            setIsSearchOpen(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="px-4 py-3 hover:bg-white/10 cursor-pointer border-b border-white/5 last:border-0"
                                                    >
                                                        <span className="text-white text-xs font-medium block">{result.name}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-4 py-3 text-gray-500 text-xs italic">No results found</div>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <button
                                    className="flex items-center gap-2 text-white hover:text-royal-gold transition-colors group"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <Search size={20} strokeWidth={1.5} />
                                    <span className="hidden md:block text-xs uppercase tracking-widest font-medium group-hover:underline underline-offset-4 decoration-royal-gold/50">Search</span>
                                </button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* CENTER: Logo */}
                <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group" onClick={() => window.scrollTo(0, 0)}>
                    <style>
                        {`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&display=swap');`}
                    </style>
                    <span className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-white uppercase group-hover:text-royal-gold transition-colors" style={{ fontFamily: '"Jost", sans-serif' }}>
                        MURGDUR
                    </span>
                </Link>

                {/* RIGHT: User Actions */}
                <div className="flex items-center gap-4 md:gap-8">
                    <Link to="/contact" className="hidden md:block text-xs uppercase tracking-widest font-medium text-white hover:text-royal-gold transition-colors">
                        Contact Us
                    </Link>

                    <Link to="/vault" className="text-white hover:text-royal-gold transition-colors relative group">
                        <Heart size={20} strokeWidth={1.5} />
                        {wishlistItems && wishlistItems.length > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-royal-gold text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <Link to="/profile" className="text-white hover:text-royal-gold transition-colors block">
                                <User size={20} strokeWidth={1.5} />
                            </Link>
                            {/* Simple Hover Menu for User */}
                            <div className="absolute top-full right-0 mt-2 w-40 bg-royal-black border border-white/10 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="px-4 py-3 border-b border-white/5 text-xs text-gray-400">
                                    Hello, <br />
                                    <span className="text-white font-bold text-sm truncate block">{user.name || 'User'}</span>
                                </div>
                                <Link to="/profile" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5">My Profile</Link>
                                <Link to="/orders" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5">Orders</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 border-t border-white/5">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/profile" className="text-white hover:text-royal-gold transition-colors block" title="Sign In">
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                    )}

                    <Link to="/cart" className="text-white hover:text-royal-gold transition-colors relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-royal-gold text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                </div>
            </div>

            {/* Universal Menu Drawer (Mobile & Desktop) */}
            < AnimatePresence >
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] flex"
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)}></div>

                        {/* Drawer Content */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.4 }}
                            className="relative w-full max-w-sm bg-black h-screen border-r border-white/10 shadow-2xl p-8 flex flex-col z-[101]"
                            style={{ backgroundColor: 'black' }}
                        >
                            <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
                                <span className="text-xl font-serif text-white tracking-widest uppercase flex items-center gap-4">
                                    <div className="relative h-20 w-16 bg-[#0F0F0F] rounded-b-md flex items-center justify-center shadow-md border-x border-b border-white/10">
                                        <img src={logo} alt="Logo" className="h-12 w-auto object-contain opacity-100" />
                                    </div>
                                    Menu
                                </span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/60 hover:text-royal-gold transition-colors">
                                    <X size={24} strokeWidth={1} />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className={`text-2xl font-serif flex items-center justify-between group ${isActive ? 'text-royal-gold' : 'text-white hover:text-royal-gold'} transition-colors py-2`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                            <span className={`transition-opacity text-base ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>→</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            <div className="mt-auto pt-8 border-t border-white/10">
                                <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">Contact</p>
                                <p className="text-white font-serif mb-2">care@murgdur.com</p>
                                <p className="text-white font-serif">+91 98765 43210</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence >
        </nav >
    );
};

export default Navbar;
