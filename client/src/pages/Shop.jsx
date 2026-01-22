import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Filter, ChevronDown, Search, Heart } from 'lucide-react';

// Importing images (reusing existing assets)
import { products as allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

const Shop = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // Initialize state with URL param, but allow local updates
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    // Initialize state with URL param or 'all'
    const [activeTab, setActiveTab] = useState(searchParams.get('type') || 'all');

    // Category Tabs Configuration
    const categoryTabs = [
        { label: 'ALL', value: 'all' },
        { label: 'SHOES', value: 'shoes' },
        { label: 'HAND BAGS', value: 'bags' },
        { label: 'BELTS', value: 'belts' },
        { label: 'PERFUME', value: 'perfumes' },
        { label: 'WATCHES', value: 'watches' },
        { label: 'WALLETS', value: 'wallets' },
        { label: 'T-SHIRTS', value: 't-shirts' },
        { label: 'TROUSERS', value: 'trousers' },
        { label: 'OVERCOATS', value: 'overcoats' },
        { label: 'OVERSIZED', value: 'oversized' },
        { label: 'CAPS', value: 'caps' },
        { label: 'SWEAT SHIRTS', value: 'sweat-shirts' },
        { label: 'SLIPPERS', value: 'slippers' },
        { label: 'SUNGLASSES', value: 'sunglasses' }
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortBy, setSortBy] = useState('relevance');
    const { addToWishlist, wishlistItems } = useCart();

    // Shuffle products ONCE on mount so they don't jitter on re-renders
    const [productsSource] = useState(() => {
        const shuffled = [...allProducts];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    });

    let products = productsSource.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by Active Tab (Type)
    if (activeTab !== 'all') {
        products = products.filter(p => (p.type || '').toLowerCase() === activeTab.toLowerCase());
    }

    // Filter by Category (Sidebar)
    if (selectedCategories.length > 0) {
        products = products.filter(p => selectedCategories.includes(p.category));
    }

    // Sort
    if (sortBy === 'price-low-high') {
        products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
        products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
        products.sort((a, b) => b.id - a.id);
    }

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="bg-royal-ivory min-h-screen pt-28 pb-20 px-6">
            <div className="container mx-auto">

                {/* Search & Header */}
                <div className="flex flex-col gap-8 mb-12 border-b border-royal-maroon/20 pb-6">

                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div>
                            <span className="text-royal-maroon text-xs font-bold uppercase tracking-[0.2em] mb-2 block">The Collection</span>
                            <h1 className="text-4xl md:text-5xl font-serif text-black">
                                {searchTerm ? `Search Results` : 'All Products'}
                            </h1>
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full focus-within:border-royal-maroon transition-all shadow-sm">
                                <input
                                    type="text"
                                    placeholder="Search our collection..."
                                    className="bg-transparent border-none outline-none text-sm text-black placeholder:text-gray-400 w-48 md:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="text-gray-400 hover:text-royal-maroon transition-colors">
                                    <Search size={18} />
                                </button>
                            </div>

                            {/* Search Suggestions Dropdown */}
                            {searchTerm.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-30 max-h-60 overflow-y-auto">
                                    {allProducts
                                        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .slice(0, 5)
                                        .map(p => (
                                            <button
                                                key={p.id}
                                                onClick={() => setSearchTerm(p.name)}
                                                className="w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-0"
                                            >
                                                <img src={p.image} alt="" className="w-8 h-8 object-cover rounded" />
                                                <span className="font-serif">{p.name}</span>
                                            </button>
                                        ))
                                    }
                                    {allProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                        <div className="px-4 py-3 text-sm text-gray-500 italic">No products found</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Tabs (New Feature) */}
                    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex space-x-3 min-w-max">
                            {categoryTabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`px-6 py-3 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 border ${activeTab === tab.value
                                        ? 'bg-white border-black text-black font-bold shadow-sm'
                                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <p className="text-gray-500 font-serif italic text-sm">
                            Showing {products.length} exquisite items
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setFilterOpen(!filterOpen)}
                                className={`flex items-center gap-2 px-4 py-2 border ${filterOpen ? 'bg-royal-maroon text-white border-royal-maroon' : 'bg-transparent text-black border-gray-300'} uppercase text-xs tracking-widest transition-all hover:bg-royal-maroon hover:text-white hover:border-royal-maroon`}
                            >
                                <Filter size={16} /> Filters
                            </button>

                            <div className="relative group">
                                <button className="flex items-center gap-2 px-4 py-2 bg-transparent text-black border border-gray-300 uppercase text-xs tracking-widest hover:border-royal-maroon transition-colors">
                                    Sort By <ChevronDown size={14} />
                                </button>
                                {/* Sort Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                                    <button onClick={() => setSortBy('relevance')} className="block w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-800">Relevance</button>
                                    <button onClick={() => setSortBy('price-low-high')} className="block w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-800">Price: Low to High</button>
                                    <button onClick={() => setSortBy('price-high-low')} className="block w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-800">Price: High to Low</button>
                                    <button onClick={() => setSortBy('newest')} className="block w-full text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-800">Newest Arrivals</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    {filterOpen && (
                        <div className="col-span-1 md:block hidden">
                            <div className="bg-white p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-royal-maroon font-serif mb-6 text-lg">Thinking of...</h3>
                                <div className="space-y-3 text-gray-600 text-sm">
                                    {['Men', 'Women', 'Accessories'].map(category => (
                                        <div key={category} className="flex items-center gap-3 group cursor-pointer" onClick={() => toggleCategory(category)}>
                                            <div className={`w-4 h-4 border border-gray-300 flex items-center justify-center transition-colors ${selectedCategories.includes(category) ? 'bg-royal-maroon border-royal-maroon' : 'group-hover:border-royal-maroon'}`}>
                                                {selectedCategories.includes(category) && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <span className="font-serif tracking-wide">{category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className={filterOpen ? "col-span-3" : "col-span-4"}>
                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${filterOpen ? "lg:grid-cols-3" : "lg:grid-cols-4"} gap-6`}>
                            {products.map((product) => (
                                <Link to={`/product/${product.id}`} key={product.id} className="group block">
                                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-white border border-gray-100 shadow-sm">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>

                                        {/* Quick Add Button */}
                                        <div className="absolute bottom-0 left-0 w-full">
                                            <button className="w-full bg-royal-maroon text-white font-bold py-3 text-xs tracking-[0.2em] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                VIEW DETAILS
                                            </button>
                                        </div>

                                        {/* Wishlist Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToWishlist(product);
                                            }}
                                            className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white text-royal-maroon opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                                        >
                                            <Heart
                                                size={18}
                                                className={wishlistItems.some(i => i.id === product.id) ? "fill-royal-maroon text-royal-maroon" : ""}
                                            />
                                        </button>
                                    </div>
                                    <h3 className="text-black font-serif text-lg tracking-wide group-hover:text-royal-maroon transition-colors">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1 font-sans">₹ {product.price.toLocaleString()}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Shop;
