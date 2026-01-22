import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, Share2, X } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(product && product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : null);
    // const [quantity, setQuantity] = useState(1); // Quantity controlled in cart only
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

    // Update selected image and color when product changes
    useEffect(() => {
        if (product) {
            setSelectedImage(product.images[0]);
            if (product.colors && product.colors.length > 0) {
                setSelectedColor(product.colors[0]);
            }
        }
    }, [product]);

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
            <div className="bg-royal-black min-h-screen pt-32 text-white text-center">
                <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
                <Link to="/shop" className="text-royal-gold underline">Return to Shop</Link>
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

                    {/* LEFT: Image Gallery */}
                    <div className="lg:w-3/5 flex gap-4">
                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="hidden md:flex flex-col gap-4">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-20 h-24 border ${selectedImage === img ? 'border-royal-gold' : 'border-transparent'} cursor-pointer overflow-hidden opacity-70 hover:opacity-100 transition-all`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Main Image */}
                        <div className="flex-1 bg-gray-900 border border-white/5 relative aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden">
                            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover" />
                            <button
                                onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist({ ...product, selectedSize, selectedColor })}
                                className="absolute top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all"
                            >
                                <Heart size={20} className={`${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'} hover:text-red-500 hover:fill-red-500`} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="absolute top-16 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all"
                            >
                                <Share2 size={20} className="text-white" />
                            </button>
                        </div>
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
                                {(product.category === 'Men' || product.type === 'shoes' || product.type === 'watches' || product.type === 'slippers') && product.type !== 'bags' && product.type !== 'perfumes' && (
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

                        <div className="border-t border-white/10 pt-6 space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Truck size={20} className="text-royal-gold" />
                                <span>Free Delivery by <span className="text-white font-bold">Fri, Jan 26</span></span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <ShieldCheck size={20} className="text-royal-gold" />
                                <span>1 Year Warranty on Fabric & Stitching</span>
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
        </div>
    );
};

export default ProductDetails;
