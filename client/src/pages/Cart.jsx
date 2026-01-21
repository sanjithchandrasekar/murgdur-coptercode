import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShieldCheck, Truck, Gift } from 'lucide-react';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Images handled by context now, or fallback


const Cart = () => {
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Load selected address from storage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('selectedAddress') || 'null');
        setSelectedAddress(saved);
    }, []);

    const { cartItems, updateQuantity, removeFromCart, getCartTotal, saveForLater } = useCart();
    // Local mock data removed, using context 'cartItems' directly

    // Price Calculations
    const totalMRP = cartItems.reduce((acc, item) => acc + (item.originalPrice * item.quantity), 0);
    const totalDiscount = cartItems.reduce((acc, item) => acc + ((item.originalPrice - item.price) * item.quantity), 0);
    const platformFee = 20; // Nominal fee like Flipkart
    const deliveryCharges = totalMRP > 5000 ? 0 : 500;
    const totalAmount = totalMRP - totalDiscount + platformFee + deliveryCharges;
    const totalSavings = totalDiscount;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-royal-black pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="bg-white/5 p-8 rounded-full mb-6">
                    <Truck size={48} className="text-royal-gold opacity-50" />
                </div>
                <h2 className="text-2xl font-serif text-white mb-2">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our royal collection today.</p>
                <Button variant="primary" onClick={() => navigate('/shop')}>Explore Collection</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-royal-black pt-28 pb-20 px-4 md:px-0 font-sans">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-6">
                    <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Continue Shopping
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* LEFT SIDE: Cart Items */}
                    <div className="lg:w-2/3 space-y-4">

                        {/* Address Bar */}
                        <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex justify-between items-center">
                            <div className="text-sm text-gray-300">
                                Deliver to: <span className="font-bold text-white">
                                    {selectedAddress ? `${selectedAddress.name}, ${selectedAddress.pincode || ''}` : "Select Delivery Address"}
                                </span>
                                {selectedAddress && (
                                    <div className="text-xs text-gray-500 truncate max-w-xs mt-1">
                                        {selectedAddress.address}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="text-royal-gold text-xs font-bold uppercase border border-royal-gold/30 px-3 py-1 hover:bg-royal-gold hover:text-black transition-colors"
                            >
                                Change
                            </button>
                        </div>

                        {/* Cart List */}
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-sm flex flex-col md:flex-row gap-6 relative">

                                {/* Image */}
                                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-800 rounded-sm overflow-hidden">
                                    <img src={item.image || (item.images && item.images[0])} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-medium text-white mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-400 mb-1">Size: {item.size}</p>
                                            <p className="text-xs text-gray-500 mb-3">Seller: {item.seller} <span className="bg-royal-blue/20 text-blue-400 px-1 rounded ml-1 text-[10px]">Assured</span></p>

                                            <div className="flex items-baseline gap-3 mb-4">
                                                <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                                <span className="text-xl font-bold text-white">₹{item.price.toLocaleString()}</span>
                                                <span className="text-sm text-green-400 font-bold">{item.discount}% Off</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-white hidden md:block">
                                            Delivery by {item.deliveryDate} | <span className="text-green-400">Free</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 mt-2">
                                        {/* Qty Control */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-white hover:text-white disabled:opacity-30"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:border-white hover:text-white disabled:opacity-30"
                                                disabled={item.quantity >= item.stock}
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button onClick={() => removeFromCart(item.id)} className="text-white font-medium text-sm hover:text-red-500 uppercase">Remove</button>
                                        <button onClick={() => saveForLater(item)} className="text-white font-medium text-sm hover:text-royal-gold uppercase">Save for Later</button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="bg-white/5 border border-white/10 p-4 rounded-sm flex items-center justify-between shadow-lg">
                            <div className="flex items-center gap-3 text-white">
                                <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded">NEW</span>
                                <span className="text-sm">Add custom embroidery for ₹999?</span>
                            </div>
                            <button className="text-royal-gold text-sm font-bold uppercase">Add</button>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Price Details */}
                    <div className="lg:w-1/3">
                        <div className="bg-white/5 border border-white/10 rounded-sm p-6 sticky top-28 h-fit">
                            <h3 className="text-gray-400 uppercase font-bold text-sm tracking-widest border-b border-white/10 pb-4 mb-4">Price Details</h3>

                            <div className="space-y-4 text-sm mb-6">
                                <div className="flex justify-between text-white">
                                    <span>Price ({cartItems.length} items)</span>
                                    <span>₹{totalMRP.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span>− ₹{totalDiscount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-white">
                                    <span>Platform Fee</span>
                                    <span>₹{platformFee}</span>
                                </div>
                                <div className="flex justify-between text-white">
                                    <span>Delivery Charges</span>
                                    <span>
                                        <span className="line-through text-gray-500 mr-2">₹500</span>
                                        <span className="text-green-400">Free</span>
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 border-dashed pt-4 mb-6">
                                <div className="flex justify-between items-center text-lg font-bold text-white">
                                    <span>Total Amount</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="bg-green-900/20 border border-green-900/50 p-3 rounded mb-6">
                                <p className="text-green-400 text-xs font-medium">You will save ₹{totalSavings.toLocaleString()} on this order</p>
                            </div>

                            <div className="flex gap-2 mb-6 text-xs text-gray-400">
                                <ShieldCheck size={16} className="text-gray-500" />
                                <p>Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                            </div>

                            <Button onClick={() => navigate('/checkout')} variant="primary" className="w-full py-4 text-sm font-bold tracking-widest bg-royal-gold text-black hover:bg-white shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                                PLACE ORDER
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
