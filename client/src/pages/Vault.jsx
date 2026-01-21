import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Star, Share2 } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';


const Vault = () => {
    const navigate = useNavigate();
    const { wishlistItems, removeFromWishlist, moveToCart } = useCart();


    return (
        <div className="min-h-screen bg-royal-black pt-32 pb-20 px-4 md:px-0">
            <div className="container mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
                    </button>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-serif text-royal-gold mb-2">My Vault</h1>
                        <p className="text-gray-400 font-light">
                            {wishlistItems.length} exclusive items saved for later
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button variant="outline" className="text-xs py-2 px-4 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-black">
                            Share Vault
                        </Button>
                    </div>
                </div>

                {/* Wishlist Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {wishlistItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-6 shadow-lg hover:border-royal-gold/30 transition-all relative group"
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-48 aspect-[3/4] md:aspect-square bg-gray-900 rounded-sm overflow-hidden relative shrink-0">
                                <img
                                    src={item.image || (item.images && item.images[0])}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {!item.inStock && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-3 py-1">Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="flex-1 flex flex-col justify-between hidden md:flex">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-royal-gold uppercase tracking-wider mb-1">{item.category}</p>
                                            <h3 className="text-xl font-serif text-white mb-2">{item.name}</h3>

                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="bg-royal-gold text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                    {item.rating} <Star size={10} fill="currentColor" />
                                                </div>
                                                <span className="text-xs text-gray-500">(45 reviews)</span>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromWishlist(item.id)} className="text-gray-500 hover:text-red-500 transition-colors tooltip-trigger p-2" title="Remove from Vault">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-2xl font-bold text-white">₹{item.price.toLocaleString()}</span>
                                        {item.discount > 0 && (
                                            <>
                                                <span className="text-sm text-gray-600 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                <span className="text-sm text-emerald-500 font-medium">{item.discount}% OFF</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-4">
                                    <button
                                        disabled={!item.inStock}
                                        onClick={() => moveToCart(item)}
                                        className={`flex items-center justify-center gap-2 px-6 py-3 uppercase tracking-wider text-sm font-bold transition-all ${item.inStock
                                            ? 'bg-royal-gold text-black hover:bg-white'
                                            : 'bg-white/10 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        <ShoppingBag size={18} />
                                        {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Layout (Simplified) */}
                            <div className="flex-1 flex flex-col justify-between md:hidden">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs text-royal-gold uppercase tracking-wider mb-1">{item.category}</p>
                                            <h3 className="text-lg font-serif text-white mb-2">{item.name}</h3>
                                        </div>
                                        <button onClick={() => removeFromWishlist(item.id)} className="text-gray-500 hover:text-red-500">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-baseline gap-3 mb-4">
                                        <span className="text-xl font-bold text-white">₹{item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    disabled={!item.inStock}
                                    onClick={() => moveToCart(item)}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 uppercase tracking-wider text-xs font-bold transition-all ${item.inStock
                                        ? 'bg-royal-gold text-black'
                                        : 'bg-white/10 text-gray-500'
                                        }`}
                                >
                                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>

                        </motion.div>
                    ))}
                </div>

                {/* Empty State Suggestion */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Looking for more?</p>
                    <Button variant="outline" onClick={() => navigate('/shop')} className="border-white/20 text-white hover:bg-white hover:text-black">Continue Shopping</Button>
                </div>

            </div>
        </div>
    );
};

export default Vault;
