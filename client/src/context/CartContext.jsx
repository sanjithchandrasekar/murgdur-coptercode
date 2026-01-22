import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Load initial cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlistItems');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Notification State
    const [notification, setNotification] = useState(null);

    // clear notification timer ref to handle rapid clicks
    const timerRef = React.useRef(null);

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    // --- Cart Functions ---

    const addToCart = (product, quantity = 1) => {
        console.log("Adding to cart:", product.name);

        const alreadyInCart = cartItems.find(item => item.id === product.id);

        if (alreadyInCart) {
            // Item already exists - Show Info Notification
            if (timerRef.current) clearTimeout(timerRef.current);
            setNotification({
                image: product.image || (product.images && product.images[0]),
                name: product.name,
                price: product.price,
                quantity: alreadyInCart.quantity,
                status: 'info'
            });
            timerRef.current = setTimeout(() => setNotification(null), 4000);
            return; // Stop here
        }

        // Add new item
        setCartItems(prev => {
            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || product.price * 1.2,
                image: product.image || (product.images && product.images[0]),
                quantity: quantity,
                size: product.selectedSize || 'Standard',
                seller: product.seller || 'Murgdur Heritage',
                stock: product.stock || 10,
                deliveryDate: "Fri, Jan 26",
                discount: product.discount || 0
            };
            return [...prev, newItem];
        });

        // Show Success Notification
        if (timerRef.current) clearTimeout(timerRef.current);
        setNotification({
            image: product.image || (product.images && product.images[0]),
            name: product.name,
            price: product.price,
            quantity: quantity,
            status: 'success'
        });
        timerRef.current = setTimeout(() => setNotification(null), 4000);
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, change) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + change;
                if (newQty >= 1 && newQty <= (item.stock || 10)) {
                    return { ...item, quantity: newQty };
                }
            }
            return item;
        }));
    };

    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // --- Wishlist Functions ---

    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            if (!prev.find(item => item.id === product.id)) {
                return [...prev, { ...product, image: product.image || (product.images && product.images[0]) }];
            }
            return prev;
        });
    };

    const removeFromWishlist = (id) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    const moveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const saveForLater = (product) => {
        addToWishlist(product);
        removeFromCart(product.id);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            wishlistItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartCount,
            getCartTotal,
            addToWishlist,
            removeFromWishlist,
            moveToCart,
            saveForLater,
            notification, // Expose notification state
            dismissNotification: () => setNotification(null) // Expose dismiss function
        }}>
            {children}
        </CartContext.Provider>
    );
};
