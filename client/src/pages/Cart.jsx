import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShieldCheck, Truck, Gift, ShoppingBag } from "lucide-react";
import Button from "../components/common/Button";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import BackButton from "../components/common/BackButton";
import { fetchSiteSettings } from "../utils/sanity";

// Images handled by context now, or fallback

const DEFAULT_WHATSAPP = "919003337582";

const Cart = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP);

  // Fetch WhatsApp config from Sanity
  useEffect(() => {
    fetchSiteSettings().then((settings) => {
      if (settings?.whatsapp) setWhatsappNumber(settings.whatsapp);
    }).catch(() => {});
  }, []);

  // Load selected address from storage
  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("selectedAddress") || "null");
    if (!saved) {
      const allAddresses = JSON.parse(
        localStorage.getItem("savedAddresses") || "[]",
      );
      if (allAddresses.length > 0) {
        saved = allAddresses[0];
        localStorage.setItem("selectedAddress", JSON.stringify(saved));
      }
    }
    setSelectedAddress(saved);
  }, []);

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    saveForLater,
  } = useCart();
  // Local mock data removed, using context 'cartItems' directly

  // Price Calculations
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0,
  );
  const totalDiscount = cartItems.reduce(
    (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
    0,
  );
  const platformFee = 20; // Nominal fee like Flipkart
  const totalSellingPrice = totalMRP - totalDiscount;
  const deliveryCharges = totalSellingPrice > 5000 ? 0 : 500;
  const totalGiftWrapFee = cartItems.reduce(
    (acc, item) => acc + (item.giftWrapFee || 0),
    0,
  );
  const totalAmount =
    totalMRP - totalDiscount + platformFee + deliveryCharges + totalGiftWrapFee;
  const totalSavings = totalDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-20 flex flex-col items-center flex-start px-4 md:px-12 relative w-full">
        <div className="container mx-auto max-w-7xl relative w-full flex flex-col h-full">
          <div className="w-full flex justify-start mb-6 lg:mb-12 cursor-pointer">
            <BackButton className="text-gray-500 hover:text-gray-900" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center -mt-10">
            <div className="bg-gray-100 p-8 rounded-full mb-6 text-black opacity-30">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-2xl font-serif text-gray-900 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md text-center">
              Looks like you haven't added anything to your cart yet. Explore our
              royal collection today.
            </p>
            <Button variant="primary" onClick={() => navigate("/shop")}>
              Explore Collection
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-12 font-sans text-gray-900">
      <div className="container mx-auto max-w-7xl relative">
        <div className="mb-8">
          <BackButton className="text-gray-500 hover:text-gray-900" />
        </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT SIDE: Cart Items */}
          <div className="lg:w-2/3 space-y-4">


            {/* Cart List */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 p-4 md:p-6 rounded-sm flex flex-col md:flex-row gap-6 relative"
              >
                {/* Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-200 rounded-sm overflow-hidden">
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-1">
                        Size: {item.size}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Seller: {item.seller}{" "}
                        <span className="bg-royal-blue/20 text-blue-400 px-1 rounded ml-1 text-[10px]">
                          Assured
                        </span>
                      </p>

                      <div className="flex items-baseline gap-3 mb-4">
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-xl font-bold text-gray-900">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-green-400 font-bold">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                          </span>
                        )}
                      </div>
                      {item.isGiftWrapped && (
                        <div className="flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-wider mb-2 bg-royal-gold/10 px-2 py-1 w-fit rounded border border-royal-gold/20">
                          <Gift size={12} /> Royal Gift Packaging Included
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-700 hidden md:block">
                      Delivery by {item.deliveryDate || "Mon, Mar 2"}
                      {deliveryCharges === 0 && (
                        <> | <span className="text-green-400">Free</span></>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                    {/* Qty Control */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-gray-900 font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 disabled:opacity-30"
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-700 font-medium text-sm hover:text-red-500 uppercase"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => saveForLater(item)}
                      className="text-gray-700 font-medium text-sm hover:text-royal-gold uppercase"
                    >
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            ))}


          </div>

          {/* RIGHT SIDE: Price Details */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 sticky top-28 h-fit">
              <h3 className="text-gray-600 uppercase font-bold text-sm tracking-widest border-b border-gray-200 pb-4 mb-4">
                Price Details
              </h3>

              <div className="space-y-4 text-sm mb-6">
                <div className="flex justify-between text-gray-900">
                  <span>Price ({cartItems.length} items)</span>
                  <span>₹{totalSellingPrice.toLocaleString()}</span>
                </div>
                {totalGiftWrapFee > 0 && (
                  <div className="flex justify-between text-royal-gold">
                    <span>Gift Wrapping</span>
                    <span>₹{totalGiftWrapFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-900">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-gray-900">
                  <span>Delivery Charges</span>
                  <span>
                    {deliveryCharges === 0 ? (
                      <>
                        <span className="line-through text-gray-500 mr-2">₹500</span>
                        <span className="text-green-400">Free</span>
                      </>
                    ) : (
                      <span>₹{deliveryCharges}</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-300 border-dashed pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-900/50 p-3 rounded mb-6">
                <p className="text-green-400 text-xs font-medium">
                  You will save ₹{totalSavings.toLocaleString()} on this order
                </p>
              </div>

              <div className="flex gap-2 mb-6 text-xs text-gray-500">
                <ShieldCheck size={16} className="text-gray-500" />
                <p>
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </p>
              </div>

              <Button
                onClick={() => {
                  const itemParts = cartItems.map(item => {
                    const pid = item.productId || `MURG-${String(item.id).padStart(4, "0")}`;
                    return `${pid} ${item.name} (Qty: ${item.quantity})`;
                  });
                  const itemText = itemParts.length === 1
                    ? itemParts[0]
                    : itemParts.slice(0, -1).join(", ") + " and " + itemParts[itemParts.length - 1];
                  const text = `Hello Murgdur, I would love to know about the ${itemText}. Could you connect me to your Royal Concierge?`;
                  const url = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`;
                  window.open(url, "_blank");
                }}
                variant="gold"
                className="w-full py-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                CONNECT WITH ROYAL CONCIERGE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
