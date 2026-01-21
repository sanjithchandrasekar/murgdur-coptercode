import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, Heart, Minus, Plus, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, addToWishlist, wishlistItems } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(product && product.colors && product.colors.length > 0 ? product.colors[0] : null);
    const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : null);
    const [quantity, setQuantity] = useState(1);
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

                {/* Breadcrumbs & Back */}
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm uppercase tracking-widest group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                    </button>
                </div>
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
                                onClick={() => addToWishlist({ ...product, selectedSize, selectedColor })}
                                className="absolute top-4 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all"
                            >
                                <Heart size={20} className={`${isWishlisted ? 'text-red-500 fill-red-500' : 'text-white'} hover:text-red-500 hover:fill-red-500`} />
                            </button>
                            <button className="absolute top-16 right-4 p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm transition-all">
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
                        {product.colors && product.colors.length > 0 && (
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
                                <div className="flex gap-3">
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
                                {product.category === 'Men' && (
                                    <button
                                        onClick={() => setIsSizeGuideOpen(true)}
                                        className="text-xs text-royal-gold underline mt-2 hover:text-white transition-colors"
                                    >
                                        Size Guide
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="mb-8">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold tracking-widest uppercase text-gray-500">Quantity</span>
                                <div className="flex items-center gap-3 border border-gray-700 px-3 py-1 rounded-sm">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-white"><Minus size={16} /></button>
                                    <span className="w-8 text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-white"><Plus size={16} /></button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mb-8">
                            <Button
                                variant="primary"
                                className="w-full py-4 bg-royal-gold text-black hover:bg-white font-bold tracking-widest"
                                onClick={() => addToCart({ ...product, selectedSize, selectedColor }, quantity)}
                            >
                                ADD TO BAG
                            </Button>
                            <Button variant="outline" className="w-full py-4" onClick={() => { addToCart({ ...product, selectedSize, selectedColor }, quantity); navigate('/checkout'); }}>
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
                    <div className="bg-royal-black border border-royal-gold p-8 max-w-2xl w-full relative rounded-lg shadow-2xl z-10 animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setIsSizeGuideOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-serif text-royal-gold mb-2">Size Guide</h3>
                            <div className="w-24 h-0.5 bg-royal-gold mx-auto"></div>
                            <p className="text-gray-400 mt-4 text-sm">Men's Round Neck Full Sleeve (In Inches)</p>
                        </div>

                        <div className="overflow-x-auto">
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
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
