import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, Share2, X } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../utils/sanity';
import RoyalZoomGallery from '../components/common/RoyalZoomGallery';

const imgLogo = "/images/logo.jpeg";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(null);
    // const [quantity, setQuantity] = useState(1); // Quantity controlled in cart only
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    // Fetch Product
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const allProducts = await fetchProducts();
            // Loosely compare ID to support both int (static) and string (sanity) IDs
            const found = allProducts.find(p => p.id.toString() === id || p._id === id);
            setProduct(found);

            if (found) {
                // Filter for similar items (same category, different ID)
                const related = allProducts
                    .filter(p => (p.category === found.category || p.type === found.type) && p.id !== found.id)
                    .slice(0, 4);
                setRelatedProducts(related);
            }

            setLoading(false);
        };
        load();
    }, [id]);

    // Update selected color when product changes
    useEffect(() => {
        if (product) {
            if (product.colors && product.colors.length > 0) {
                setSelectedColor(product.colors[0]);
            }
        }
    }, [product]);

    if (loading) {
        return (
            <div className="bg-royal-black min-h-screen pt-32 text-white text-center flex items-center justify-center">
                <div className="animate-pulse text-royal-gold tracking-widest uppercase">Loading Exquisite Item...</div>
            </div>
        );
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: `Check out this ${product.name} on Murgdur`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    if (!product) {
        return (
            <div className="bg-royal-black min-h-screen pt-32 text-white flex flex-col items-center justify-center">
                <Minus size={48} className="text-royal-gold mb-4 opacity-50" />
                <h2 className="text-3xl font-serif mb-2">Product Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                    The item you are looking for may have been removed or is temporarily unavailable in our archives.
                </p>
                <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)} className="border-gray-600 text-gray-300 hover:border-white hover:text-white">
                        Go Back
                    </Button>
                    <Link to="/shop">
                        <Button variant="primary" className="bg-royal-gold text-black hover:bg-white">
                            Return to Shop
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
    const isWishlisted = wishlistItems.some(item => item.id == product.id);

    return (
        <div className="bg-royal-black min-h-screen pt-32 pb-20 text-white font-sans relative">
            <div className="container mx-auto px-6 max-w-7xl">


                <div className="text-sm text-gray-500 mb-8">
                    <Link to="/" className="hover:text-royal-gold">Home</Link> /
                    <Link to="/shop" className="hover:text-royal-gold"> Shop</Link> /
                    <span className="text-gray-300"> {product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">

                    {/* LEFT: Royal Zoom Gallery */}
                    <div className="lg:w-3/5 relative">
                        <RoyalZoomGallery
                            images={product.images && product.images.length > 0 ? product.images : [imgLogo]} /* imgLogo might need import or fallback */
                            productName={product.name}
                            product={product}
                        />
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="lg:w-2/5">
                        <h1 className="text-3xl md:text-4xl font-serif mb-2">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-royal-gold text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" className={i < Math.floor(product.rating) ? "" : "opacity-30"} />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">{product.rating} ({product.reviews} Reviews)</span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                            <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="text-green-400 font-bold uppercase text-xs border border-green-500/30 px-2 py-1 rounded">28% OFF</span>
                        </div>

                        <p className="text-gray-400 leading-relaxed mb-8 font-light">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && product.type !== 'perfumes' && (
                            <div className="mb-8">
                                <span className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-3 block">Select Color</span>
                                <div className="flex gap-3">
                                    {product.colors.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-royal-gold scale-110' : 'border-transparent hover:scale-105'}`}
                                            title={color}
                                        >
                                            <span className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: color }}></span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-8">
                                <span className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-3 block">Select Size</span>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[3rem] h-12 px-2 flex items-center justify-center border ${selectedSize === size ? 'border-royal-gold bg-royal-gold/10 text-royal-gold' : 'border-gray-700 text-gray-400 hover:border-gray-500'} transition-all`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {/* Size Guide Button - Shown for Men's Apparels and Shoes, BUT EXCLUDING Bags and Perfumes */}
                                {(product.category === 'Men' || product.category === 'Women' || product.type === 'shoes' || product.type === 'watches' || product.type === 'slippers' || product.type === 'dresses') && product.type !== 'bags' && product.type !== 'perfumes' && (
                                    <button
                                        onClick={() => setIsSizeGuideOpen(true)}
                                        className="text-xs text-royal-gold underline mt-2 hover:text-white transition-colors"
                                    >
                                        Size Guide
                                    </button>
                                )}
                            </div>
                        )}



                        <div className="flex flex-col gap-4 mb-8">
                            <Button
                                variant="primary"
                                className="w-full py-4 bg-royal-gold text-black hover:bg-white font-bold tracking-widest"
                                onClick={() => addToCart({ ...product, selectedSize, selectedColor }, 1)}
                            >
                                ADD TO CART
                            </Button>
                            <Button variant="outline" className="w-full py-4" onClick={() => { addToCart({ ...product, selectedSize, selectedColor }, 1); navigate('/checkout'); }}>
                                BUY NOW
                            </Button>
                        </div>

                        <div className="border-t border-white/10 pt-6 space-y-6">
                            {/* Royal Assurance */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1 p-3 border border-white/5 bg-white/5 rounded">
                                    <ShieldCheck size={20} className="text-royal-gold mb-1" />
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">100% Authentic</span>
                                    <span className="text-gray-500 text-[10px]">Certified by Murgdur Vault</span>
                                </div>
                                <div className="flex flex-col gap-1 p-3 border border-white/5 bg-white/5 rounded">
                                    <Truck size={20} className="text-royal-gold mb-1" />
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">Royal Logistics</span>
                                    <span className="text-gray-500 text-[10px]">Insured & Tracked Delivery</span>
                                </div>
                            </div>

                            {/* Delivery Check */}
                            <div className="space-y-2">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Delivery Options</span>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        className="bg-transparent border border-white/20 px-4 py-2 text-sm focus:border-royal-gold outline-none w-40 text-white placeholder:text-gray-600"
                                    />
                                    <button className="text-royal-gold text-xs font-bold uppercase hover:text-white transition-colors">Check</button>
                                </div>
                                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                    Estimated Delivery: <span className="text-gray-300">3-5 Business Days</span>
                                </p>
                            </div>

                            {/* Seller Info */}
                            <div className="flex items-center justify-between text-xs border border-white/10 p-4 rounded bg-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-royal-gold flex items-center justify-center text-black font-serif font-bold">M</div>
                                    <div>
                                        <p className="text-white font-bold">Sold by Murgdur Heritage</p>
                                        <p className="text-gray-500 text-[10px]">Premium Seller (4.9 ★)</p>
                                    </div>
                                </div>
                                <button className="text-royal-gold border border-royal-gold/50 px-3 py-1 rounded hover:bg-royal-gold hover:text-black transition-all">
                                    View Profile
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Size Guide Modal */}
            {isSizeGuideOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)}></div>
                    <div className={`bg-royal-black border border-royal-gold p-5 md:p-6 w-full relative rounded-lg shadow-2xl z-10 animate-in fade-in zoom-in duration-300 max-h-[85vh] overflow-y-auto custom-scrollbar ${product.type === 'shoes' ? 'max-w-md' : product.type === 'watches' ? 'max-w-lg' : 'max-w-2xl'}`}>
                        <button
                            onClick={() => setIsSizeGuideOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-black/20 p-1 rounded-full z-50"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-6">
                            <h3 className="text-2xl md:text-3xl font-serif text-royal-gold mb-2">Size Guide</h3>
                            <div className="w-16 h-0.5 bg-royal-gold mx-auto"></div>
                            <p className="text-gray-400 mt-3 text-sm">
                                {product.type === 'watches' ? 'Watch Dial Size Guide' :
                                    (product.type === 'shoes' || product.type === 'slippers') ? 'Standard Footwear Sizing (Men & Women)' :
                                        product.type === 'dresses' ? "Women's Dress Chart (Inches)" :
                                            "Men's Round Neck Full Sleeve (In Inches)"}
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            {product.type === 'watches' ? (
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-gray-400 mb-8 text-center text-sm px-4">
                                        Visual comparison of standard dial diameters. <br />
                                        <span className="text-xs italic text-gray-500">(Rendered at relative scale)</span>
                                    </p>
                                    <div className="flex flex-col gap-8 pb-4">
                                        {/* Row 1: Large / Men's */}
                                        <div className="flex flex-col gap-4">
                                            <p className="text-royal-gold text-xs uppercase tracking-widest text-center border-b border-white/10 pb-2">Large / Men's Standard</p>
                                            <div className="flex flex-wrap gap-6 justify-center items-end">
                                                {[
                                                    { size: '46mm', scale: 1.21 },
                                                    { size: '42mm', scale: 1.10 },
                                                    { size: '40mm', scale: 1.05 },
                                                    { size: '38mm', scale: 1.0 }
                                                ].map((d) => (
                                                    <div key={d.size} className="flex flex-col items-center gap-2 group">
                                                        <div className="rounded-full border border-royal-gold/60 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative shadow-lg" style={{ width: `${80 * d.scale}px`, height: `${80 * d.scale}px` }}>
                                                            <div className="absolute inset-1 rounded-full border border-white/5"></div>
                                                            <div className="w-1 h-1 bg-red-500 rounded-full z-10"></div>
                                                            <div className="w-0.5 h-3 bg-white/40 absolute top-3"></div>
                                                            <div className="w-0.5 h-3 bg-white/20 absolute bottom-3"></div>
                                                            <div className="w-3 h-0.5 bg-white/20 absolute left-3"></div>
                                                            <div className="w-3 h-0.5 bg-white/20 absolute right-3"></div>
                                                        </div>
                                                        <span className="text-gray-300 font-bold text-xs">{d.size}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 2: Medium / Unisex */}
                                        <div className="flex flex-col gap-4">
                                            <p className="text-royal-gold text-xs uppercase tracking-widest text-center border-b border-white/10 pb-2">Medium / Unisex</p>
                                            <div className="flex flex-wrap gap-6 justify-center items-end">
                                                {[
                                                    { size: '36mm', scale: 0.95 },
                                                    { size: '34mm', scale: 0.90 },
                                                    { size: '32mm', scale: 0.85 },
                                                    { size: '30mm', scale: 0.80 }
                                                ].map((d) => (
                                                    <div key={d.size} className="flex flex-col items-center gap-2 group">
                                                        <div className="rounded-full border border-gray-600 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative shadow-md" style={{ width: `${80 * d.scale}px`, height: `${80 * d.scale}px` }}>
                                                            <div className="absolute inset-1 rounded-full border border-white/5"></div>
                                                            <div className="w-1 h-1 bg-white/50 rounded-full z-10"></div>
                                                            <div className="w-0.5 h-2 bg-white/30 absolute top-2"></div>
                                                            <div className="w-0.5 h-2 bg-white/10 absolute bottom-2"></div>
                                                            <div className="w-2 h-0.5 bg-white/10 absolute left-2"></div>
                                                            <div className="w-2 h-0.5 bg-white/10 absolute right-2"></div>
                                                        </div>
                                                        <span className="text-gray-400 font-bold text-xs">{d.size}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Row 3: Small / Women's */}
                                        <div className="flex flex-col gap-4">
                                            <p className="text-royal-gold text-xs uppercase tracking-widest text-center border-b border-white/10 pb-2">Small / Women's Standard</p>
                                            <div className="flex flex-wrap gap-6 justify-center items-end">
                                                {[
                                                    { size: '28mm', scale: 0.74 },
                                                    { size: '26mm', scale: 0.68 },
                                                    { size: '24mm', scale: 0.63 },
                                                    { size: '22mm', scale: 0.58 }
                                                ].map((d) => (
                                                    <div key={d.size} className="flex flex-col items-center gap-2 group">
                                                        <div className="rounded-full border border-gray-700 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative shadow-sm" style={{ width: `${80 * d.scale}px`, height: `${80 * d.scale}px` }}>
                                                            <div className="absolute inset-1 rounded-full border border-white/5"></div>
                                                            <div className="w-1 h-1 bg-white/30 rounded-full z-10"></div>
                                                            <div className="w-0.5 h-1.5 bg-white/20 absolute top-1.5"></div>
                                                            <div className="w-0.5 h-1.5 bg-white/10 absolute bottom-1.5"></div>
                                                            <div className="w-1.5 h-0.5 bg-white/10 absolute left-1.5"></div>
                                                            <div className="w-1.5 h-0.5 bg-white/10 absolute right-1.5"></div>
                                                        </div>
                                                        <span className="text-gray-500 font-bold text-[10px]">{d.size}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 border-t border-white/10 pt-4 w-full text-center">
                                        <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">How to Measure</h4>
                                        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                                            Measure your wrist width (flat). For a balanced look, the watch case (lug-to-lug) should cover about 75-85% of your wrist width.
                                        </p>
                                    </div>
                                </div>
                            ) : (product.type === 'shoes' || product.type === 'slippers') ? (
                                <table className="w-full text-center border-collapse text-gray-300 text-[10px] md:text-xs">
                                    <thead>
                                        <tr className="bg-white/10 text-royal-gold">
                                            <th className="p-2 border border-white/10">US M</th>
                                            <th className="p-2 border border-white/10">UK</th>
                                            <th className="p-2 border border-white/10">EU</th>
                                            <th className="p-2 border border-white/10">CM</th>
                                            <th className="p-2 border border-white/10">US W</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { usM: 4, uk: 3, eu: 36, cm: 21.9, usW: 5 },
                                            { usM: 5, uk: 4, eu: 37, cm: 22.7, usW: 6 },
                                            { usM: 6, uk: 5, eu: 38.5, cm: 23.5, usW: 7 },
                                            { usM: 7, uk: 6, eu: 40, cm: 24.4, usW: 8 },
                                            { usM: 8, uk: 7, eu: 41, cm: 25.2, usW: 9 },
                                            { usM: 9, uk: 8, eu: 42.5, cm: 26, usW: 10 },
                                            { usM: 10, uk: 9, eu: 44, cm: 27, usW: 11 },
                                            { usM: 11, uk: 10, eu: 45, cm: 27.7, usW: 12 },
                                            { usM: 12, uk: 11, eu: 46, cm: 28.6, usW: 13 },
                                            { usM: 13, uk: 12, eu: 47.5, cm: 29.4, usW: 14 }
                                        ].map((row, index) => (
                                            <tr key={index}>
                                                <td className="p-2 md:p-3 border border-white/10 font-bold bg-white/5">{row.usM}</td>
                                                <td className="p-2 md:p-3 border border-white/10">{row.uk}</td>
                                                <td className="p-2 md:p-3 border border-white/10">{row.eu}</td>
                                                <td className="p-2 md:p-3 border border-white/10">{row.cm}</td>
                                                <td className="p-2 md:p-3 border border-white/10">{row.usW}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : product.type === 'dresses' ? (
                                <table className="w-full text-center border-collapse text-gray-300 text-sm">
                                    <thead>
                                        <tr className="bg-white/10 text-royal-gold">
                                            <th className="p-3 border border-white/10">Size</th>
                                            <th className="p-3 border border-white/10">Bust</th>
                                            <th className="p-3 border border-white/10">Waist</th>
                                            <th className="p-3 border border-white/10">Hips</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { size: 'XS', bust: 32, waist: 24, hips: 34 },
                                            { size: 'S', bust: 34, waist: 26, hips: 36 },
                                            { size: 'M', bust: 36, waist: 28, hips: 38 },
                                            { size: 'L', bust: 39, waist: 31, hips: 41 },
                                            { size: 'XL', bust: 42, waist: 34, hips: 44 }
                                        ].map((row) => (
                                            <tr key={row.size}>
                                                <td className="p-3 border border-white/10 font-bold bg-white/5">{row.size}</td>
                                                <td className="p-3 border border-white/10">{row.bust}"</td>
                                                <td className="p-3 border border-white/10">{row.waist}"</td>
                                                <td className="p-3 border border-white/10">{row.hips}"</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="w-full text-center border-collapse text-gray-300 text-sm">
                                    <thead>
                                        <tr className="bg-white/10 text-royal-gold">
                                            <th className="p-3 border border-white/10">Size</th>
                                            <th className="p-3 border border-white/10">S</th>
                                            <th className="p-3 border border-white/10">M</th>
                                            <th className="p-3 border border-white/10">L</th>
                                            <th className="p-3 border border-white/10">XL</th>
                                            <th className="p-3 border border-white/10">XXL</th>
                                            <th className="p-3 border border-white/10">3XL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold bg-white/5">Length</td>
                                            <td className="p-3 border border-white/10">26</td>
                                            <td className="p-3 border border-white/10">27</td>
                                            <td className="p-3 border border-white/10">28</td>
                                            <td className="p-3 border border-white/10">29</td>
                                            <td className="p-3 border border-white/10">30</td>
                                            <td className="p-3 border border-white/10">31</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold bg-white/5">Chest</td>
                                            <td className="p-3 border border-white/10">38</td>
                                            <td className="p-3 border border-white/10">40</td>
                                            <td className="p-3 border border-white/10">42</td>
                                            <td className="p-3 border border-white/10">44</td>
                                            <td className="p-3 border border-white/10">46</td>
                                            <td className="p-3 border border-white/10">48</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold bg-white/5">Shoulder</td>
                                            <td className="p-3 border border-white/10">16</td>
                                            <td className="p-3 border border-white/10">17</td>
                                            <td className="p-3 border border-white/10">18</td>
                                            <td className="p-3 border border-white/10">19</td>
                                            <td className="p-3 border border-white/10">20</td>
                                            <td className="p-3 border border-white/10">21</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-white/10 font-bold bg-white/5">Sleeve</td>
                                            <td className="p-3 border border-white/10">24</td>
                                            <td className="p-3 border border-white/10">25</td>
                                            <td className="p-3 border border-white/10">26</td>
                                            <td className="p-3 border border-white/10">27</td>
                                            <td className="p-3 border border-white/10">28</td>
                                            <td className="p-3 border border-white/10">28.5</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Similar Products Section */}
            {relatedProducts.length > 0 && (
                <div className="container mx-auto px-6 max-w-7xl mt-20">
                    <h3 className="text-2xl font-serif text-white mb-8 border-b border-white/10 pb-4">Similar Masterpieces</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <Link to={`/product/${p.id}`} key={p.id} className="group block bg-white/5 border border-white/10 rounded overflow-hidden hover:bg-white/10 transition-all">
                                <div className="aspect-[3/4] overflow-hidden relative">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                    {p.isNew && (
                                        <span className="absolute top-2 left-2 bg-royal-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">New</span>
                                    )}
                                </div>
                                <div className="p-4 text-center">
                                    <h4 className="font-serif text-white text-sm truncate mb-1 group-hover:text-royal-gold transition-colors">{p.name}</h4>
                                    <p className="text-gray-400 text-xs">₹{p.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
