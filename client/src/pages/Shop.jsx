import SEO from '../components/common/SEO';

// ... (existing imports)

const Shop = () => {
    // ... (existing state)

    return (
        <div className="bg-[#fffefe] min-h-screen pt-28 pb-20 font-sans text-gray-900">
            <SEO
                title={`${activeTab === 'all' ? 'Shop' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} | Murgdur Collection`}
                description={`Explore our exclusive collection of ${activeTab === 'all' ? 'luxury items' : activeTab}. Handcrafted for the modern elite.`}
                url={`https://murugdur1.vercel.app/shop?type=${activeTab}`}
            />
            <div className="container mx-auto px-4 md:px-8">

                {/* HEADLINE */}
                <div className="flex flex-col items-center justify-center text-center mb-12">
                    <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-4">
                        <Link to="/" className="hover:text-black transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-black font-bold">Shop</span>
                    </nav>
                    <h1 className="text-5xl md:text-7xl font-serif text-black mb-4 tracking-tight">
                        {activeTab === 'all' ? 'The Collection' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h1>
                    <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base italic tracking-wide mb-10">
                        Explore our curated selection of {filteredProducts.length} premium items, designed for modern elegance.
                    </p>

                    {/* QUICK TABS SCROLLER (WITH ARROWS) */}
                    <div className="w-full flex justify-center border-b border-gray-100 relative group px-12">
                        <button
                            onClick={() => scrollTabs('left')}
                            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <div
                            ref={tabsRef}
                            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide mask-fade-right px-4 scroll-smooth w-full max-w-6xl justify-start md:justify-center"
                        >
                            {CATEGORY_TABS.map(tab => (
                                <button
                                    key={tab.value}
                                    onClick={() => handleTabChange(tab.value)}
                                    className={`whitespace-nowrap pb-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border-b-2 flex-shrink-0 ${activeTab === tab.value
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-400 hover:text-black hover:border-gray-200'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollTabs('right')}
                            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                    {/* SIDEBAR */}
                    <AnimatePresence initial={false}>
                        {isSidebarOpen && (
                            <motion.aside
                                key="sidebar"
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 'auto', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="lg:col-span-3 overflow-hidden"
                            >
                                <div className="sticky top-32 space-y-8 pr-2">
                                    {/* Genre Filter */}
                                    <div>
                                        <h3 className="font-serif text-lg mb-4 flex items-center justify-between">Genre</h3>
                                        <div className="space-y-3">
                                            {['Men', 'Women', 'Accessories'].map(cat => (
                                                <label key={cat} className="flex items-center gap-3 cursor-pointer group select-none">
                                                    <div className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 rounded-sm ${selectedCategories.includes(cat) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-gray-500'}`}>
                                                        {selectedCategories.includes(cat) && <div className="w-2.5 h-2.5 bg-white" />}
                                                    </div>
                                                    <span className={`text-sm tracking-wide transition-colors ${selectedCategories.includes(cat) ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>
                                                        {cat}
                                                    </span>
                                                    <input type="checkbox" className="hidden" checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} />
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div>
                                        <h3 className="font-serif text-lg mb-4">Price</h3>
                                        <div className="space-y-3">
                                            {PRICE_RANGES.map((range) => (
                                                <label key={range.id} className="flex items-center gap-3 cursor-pointer group select-none">
                                                    <div className={`w-5 h-5 border flex items-center justify-center transition-all duration-300 rounded-sm ${selectedPriceIds.includes(range.id) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-gray-500'}`}>
                                                        {selectedPriceIds.includes(range.id) && <div className="w-2.5 h-2.5 bg-white" />}
                                                    </div>
                                                    <span className={`text-sm tracking-wide transition-colors ${selectedPriceIds.includes(range.id) ? 'text-black font-semibold' : 'text-gray-500 group-hover:text-black'}`}>
                                                        {range.label}
                                                    </span>
                                                    <input type="checkbox" className="hidden" checked={selectedPriceIds.includes(range.id)} onChange={() => togglePriceRange(range.id)} />
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Active Filters Clear */}
                                    {(selectedCategories.length > 0 || selectedPriceIds.length > 0 || activeTab !== 'all' || searchTerm) && (
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
                    <div className={isSidebarOpen ? "lg:col-span-9" : "lg:col-span-12"}>

                        {/* TOOLBAR */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 py-4 bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-28 z-20">

                            {/* Left: Filters & Search */}
                            <div className="flex items-center gap-4 w-full md:w-auto flex-1">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-white hover:bg-black hover:border-black transition-all whitespace-nowrap shadow-sm hover:shadow-md"
                                >
                                    <SlidersHorizontal size={14} />
                                    <span className="hidden sm:inline">{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
                                    <span className="sm:hidden">Filters</span>
                                </button>

                                {/* Search Bar */}
                                <div className="relative flex-1 max-w-md group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search for items..."
                                        value={searchTerm}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        className="w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 border-none rounded-full py-2.5 pl-11 pr-4 text-sm focus:bg-white focus:ring-1 focus:ring-black/10 shadow-inner group-focus-within:shadow-md transition-all"
                                    />
                                </div>
                            </div>

                            {/* Right: Sort & View */}
                            <div className="flex items-center gap-6 w-full md:w-auto justify-end">
                                {/* Sort */}
                                <div className="flex items-center gap-3 group">
                                    <span className="text-gray-400 text-xs uppercase font-bold hidden sm:inline group-hover:text-gray-600 transition-colors">Sort:</span>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => handleSortChange(e.target.value)}
                                            className="bg-transparent text-xs font-bold uppercase tracking-widest text-gray-800 focus:outline-none cursor-pointer pr-6 py-1 appearance-none hover:text-black transition-colors"
                                        >
                                            <option value="relevance">Relevance</option>
                                            <option value="newest">Newest</option>
                                            <option value="rating">Top Rated</option>
                                            <option value="price-low-high">Price: Low to High</option>
                                            <option value="price-high-low">Price: High to Low</option>
                                        </select>
                                        <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-black transition-colors" />
                                    </div>
                                </div>

                                {/* View Mode */}
                                <div className="flex items-center bg-gray-100 rounded-full p-1 border border-transparent hover:border-gray-200 transition-all">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-white text-black shadow-sm transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                                        title="Grid View"
                                    >
                                        <Grid size={14} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-white text-black shadow-sm transform scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                                        title="List View"
                                    >
                                        <List size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ACTIVE FILTERS ROW */}
                        {(activeTab !== 'all' || selectedCategories.length > 0 || selectedPriceIds.length > 0 || searchTerm) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6 animate-fade-in">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2">Active Filters:</span>

                                {activeTab !== 'all' && (
                                    <button onClick={() => removeFilter('tab', activeTab)} className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors">
                                        <span className="text-gray-600 font-medium capitalize">{activeTab}</span>
                                        <X size={12} className="text-gray-400 group-hover:text-red-500" />
                                    </button>
                                )}

                                {selectedCategories.map(cat => (
                                    <button key={cat} onClick={() => removeFilter('cat', cat)} className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors">
                                        <span className="text-gray-600 font-medium">{cat}</span>
                                        <X size={12} className="text-gray-400 group-hover:text-red-500" />
                                    </button>
                                ))}

                                {selectedPriceIds.map(id => {
                                    const label = PRICE_RANGES.find(r => r.id === id)?.label;
                                    return (
                                        <button key={id} onClick={() => removeFilter('price', id)} className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors">
                                            <span className="text-gray-600 font-medium">{label}</span>
                                            <X size={12} className="text-gray-400 group-hover:text-red-500" />
                                        </button>
                                    );
                                })}

                                {searchTerm && (
                                    <button onClick={() => removeFilter('search', searchTerm)} className="group flex items-center gap-2 pl-3 pr-2 py-1 bg-gray-100 rounded-full text-xs hover:bg-gray-200 transition-colors">
                                        <span className="text-gray-600 font-medium">"{searchTerm}"</span>
                                        <X size={12} className="text-gray-400 group-hover:text-red-500" />
                                    </button>
                                )}

                                <button onClick={clearAllFilters} className="text-[10px] uppercase font-bold text-red-500 hover:text-red-700 ml-2 tracking-widest underline decoration-dotted underline-offset-4">
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* GRID / LIST */}
                        <AnimatePresence mode='wait'>
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="bg-gray-200 aspect-[3/4] mb-4 rounded-sm"></div>
                                            <div className="h-4 bg-gray-200 w-3/4 mb-2 rounded"></div>
                                            <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
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
                                    <h3 className="font-serif text-2xl mb-2 text-gray-900">No Treasures Found</h3>
                                    <p className="text-gray-500 mb-8 max-w-md mx-auto">We couldn't find matches for your search. Try adjusting keywords or clearing some filters.</p>
                                    <button onClick={clearAllFilters} className="bg-black text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300">
                                        Clear All Filters
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className={viewMode === 'grid'
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-12"
                                        : "space-y-6"
                                    }
                                >
                                    {paginatedProducts.map((product, idx) => (
                                        <motion.div
                                            key={product.id || product._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            {viewMode === 'grid'
                                                ? <ProductCard product={product} addToWishlist={addToWishlist} isInWishlist={wishlistItems.some(i => i.id === product.id)} />
                                                : <ProductListCard product={product} addToWishlist={addToWishlist} isInWishlist={wishlistItems.some(i => i.id === product.id)} />
                                            }
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* PAGINATION */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-20 gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                <span className="flex items-center px-4 font-mono text-xs text-gray-400">
                                    Page {currentPage} of {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SUBCOMPONENTS ---

const ProductCard = ({ product, addToWishlist, isInWishlist }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasSecondImage = product.images && product.images.length > 1;

    return (
        <div
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-sm">
                <Link to={`/product/${product.id || product._id}`} className="block w-full h-full">
                    {/* Primary Image */}
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${hasSecondImage && isHovered ? 'opacity-0' : 'opacity-100'}`}
                        loading="lazy"
                    />
                    {/* Secondary Image (on Hover) */}
                    {hasSecondImage && (
                        <img
                            src={product.images[1]}
                            alt={`${product.name} (View 2)`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100 scale-105' : 'opacity-0'}`}
                            loading="lazy"
                        />
                    )}
                </Link>

                {product.onSale && (
                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold uppercase px-2 py-1 tracking-widest shadow-sm">
                        Sale
                    </div>
                )}

                <button
                    onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
                    className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm z-10 ${isInWishlist
                        ? 'bg-white text-red-600 opacity-100 translate-y-0'
                        : 'bg-white/90 text-gray-400 hover:text-red-600 hover:scale-110 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0'
                        }`}
                >
                    <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                </button>

                {/* Quick Add / View Button */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/product/${product.id || product._id}`);
                        }}
                        className="w-full bg-white/95 backdrop-blur-sm text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-lg border border-gray-100"
                    >
                        View Details
                    </button>
                </div>
            </div>

            <div className="text-center px-1">
                <Link to={`/product/${product.id || product._id}`}>
                    <h3 className="font-serif text-base text-gray-900 group-hover:text-gray-600 transition-colors mb-1 line-clamp-1 decoration-gray-900">{product.name}</h3>
                </Link>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{product.category}</p>

                {/* Color Swatches */}
                {product.colors && product.colors.length > 0 && (
                    <div className="flex justify-center items-center gap-1.5 mb-2 h-4">
                        {product.colors.slice(0, 5).map((color, idx) => (
                            <div
                                key={idx}
                                className="w-2.5 h-2.5 rounded-full border border-gray-100 shadow-sm"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                        {product.colors.length > 5 && (
                            <span className="text-[9px] text-gray-400 ml-0.5">+{product.colors.length - 5}</span>
                        )}
                    </div>
                )}
                <div className="flex justify-center items-center gap-2">
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-sm font-semibold text-black">₹{(product.price || 0).toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
};

const ProductListCard = ({ product, addToWishlist, isInWishlist }) => (
    <div className="group flex flex-col sm:flex-row gap-6 bg-white border border-gray-100 hover:border-black transition-all duration-300 p-4 rounded-sm hover:shadow-lg">
        <div className="relative w-full sm:w-48 aspect-[3/4] sm:aspect-square overflow-hidden bg-gray-100 flex-shrink-0 rounded-sm">
            <Link to={`/product/${product.id || product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </Link>
            {product.onSale && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 tracking-widest">
                    Sale
                </div>
            )}
        </div>

        <div className="flex-1 flex flex-col justify-center text-left py-2">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{product.category} • {product.type || 'Standard'}</p>
                    <Link to={`/product/${product.id || product._id}`}>
                        <h3 className="font-serif text-xl text-gray-900 group-hover:text-[#D4AF37] transition-colors mb-2">{product.name}</h3>
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        {product.rating && (
                            <div className="flex text-yellow-500 text-xs">
                                {'★'.repeat(Math.round(product.rating))}
                                <span className="text-gray-300">{'★'.repeat(5 - Math.round(product.rating))}</span>
                            </div>
                        )}
                        {product.reviews && <span className="text-xs text-gray-400">({product.reviews} reviews)</span>}
                    </div>
                </div>
                <button
                    onClick={(e) => { e.preventDefault(); addToWishlist(product); }}
                    className={`p-2.5 rounded-full transition-all duration-300 ${isInWishlist ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-black hover:bg-gray-100 border border-gray-100'
                        }`}
                >
                    <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
            </div>

            <p className="text-gray-500 text-sm line-clamp-2 mb-6 font-light leading-relaxed max-w-2xl">
                {product.description || "Ideally suited for those who appreciate fine craftsmanship and timeless style. This piece exemplifies the Royal standard of quality."}
            </p>

            <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex items-center gap-3">
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-xl font-serif text-black">₹{(product.price || 0).toLocaleString()}</span>
                </div>

                <Link to={`/product/${product.id || product._id}`} className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-colors rounded-sm">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);

export default Shop;
