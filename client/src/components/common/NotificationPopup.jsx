import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Check, X, ShoppingBag, ArrowRight, Info } from 'lucide-react';

const NotificationPopup = () => {
    const { notification, dismissNotification } = useCart();

    return (
        <AnimatePresence>
            {notification && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={dismissNotification}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative bg-[#0F0F0F] border border-royal-gold w-full max-w-md shadow-2xl p-6 md:p-8"
                    >
                        {/* Close Button */}
                        <button
                            onClick={dismissNotification}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            {/* Status Icon */}
                            <div className={`w-12 h-12 rounded-full border flex items-center justify-center mb-4 ${notification.status === 'info' ? 'border-blue-400 bg-blue-900/20' : 'border-royal-gold bg-royal-gold/10'}`}>
                                {notification.status === 'info' ? (
                                    <Info size={24} className="text-blue-400" />
                                ) : (
                                    <Check size={24} className="text-royal-gold" />
                                )}
                            </div>

                            <h3 className="text-xl font-serif text-white tracking-wide mb-1">
                                {notification.status === 'info' ? 'Already in Cart' : 'Added to Cart'}
                            </h3>
                            <div className={`w-16 h-px mb-6 ${notification.status === 'info' ? 'bg-blue-400/50' : 'bg-royal-gold/50'}`}></div>

                            {/* Product Details */}
                            <div className="flex gap-4 w-full bg-white/5 p-4 rounded-sm border border-white/10 text-left mb-6">
                                <div className="w-20 h-24 bg-gray-900 shrink-0 border border-white/5">
                                    <img
                                        src={notification.image}
                                        alt={notification.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-lg leading-tight mb-1">{notification.name}</h4>
                                    <p className="text-royal-gold font-bold text-sm mb-1">₹{notification.price.toLocaleString()}</p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Quantity: {notification.quantity}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 w-full">
                                <Link
                                    to="/cart"
                                    onClick={dismissNotification}
                                    className="w-full py-3 bg-royal-gold text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={16} /> View Cart
                                </Link>
                                <button
                                    onClick={dismissNotification}
                                    className="w-full py-3 border border-white/30 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NotificationPopup;
