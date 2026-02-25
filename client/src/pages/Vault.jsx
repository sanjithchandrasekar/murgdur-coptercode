import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Star } from "lucide-react";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { fetchVaultPage } from "../utils/sanity";

import SEO from "../components/common/SEO";
import BackButton from "../components/common/BackButton";

const Vault = () => {
  const navigate = useNavigate();
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();

  // Connect to Sanity for page text labels
  const [data, setData] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const load = async () => {
      const result = await fetchVaultPage();
      if (result) setData(result);
    };
    load();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-0">
      <SEO
        title={`${data?.heading || "My Vault"} | Murgdur`}
        description="Your personal collection of Murgdur's finest. View and manage your saved items."
        url="https://murugdur1.vercel.app/vault"
      />
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6">
          <BackButton className="text-gray-400 hover:text-gray-900" />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-royal-gold mb-2">
              {data?.heading || "My Vault"}
            </h1>
            <p className="text-gray-400 font-light">
              {wishlistItems.length} exclusive items saved for later
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant="outline"
              className="text-xs py-2 px-4 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-black w-[130px] flex justify-center items-center"
              onClick={handleShare}
            >
              {isCopied ? "Link Copied!" : "Share Vault"}
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
              className="bg-white border border-gray-200 rounded-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:border-royal-gold/40 transition-all relative group hover:shadow-md"
            >
              {/* Image Section */}
              <div className="w-full md:w-48 aspect-[3/4] md:aspect-square bg-gray-100 rounded-sm overflow-hidden relative shrink-0">
                <img
                  src={item.image || (item.images && item.images[0])}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Details Section */}
              <div className="flex-1 flex flex-col justify-between hidden md:flex">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-royal-gold uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-xl font-serif text-gray-900 mb-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-royal-gold text-black text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                          {item.rating} <Star size={10} fill="currentColor" />
                        </div>
                        <span className="text-xs text-gray-500">
                          (45 reviews)
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors tooltip-trigger p-2"
                      title="Remove from Vault"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.discount > 0 && (
                      <>
                        <span className="text-sm text-gray-600 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-emerald-500 font-medium">
                          {item.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => moveToCart(item)}
                    className="flex items-center justify-center gap-2 px-6 py-3 uppercase tracking-wider text-sm font-bold transition-all bg-black text-white hover:bg-gray-800"
                  >
                    <ShoppingBag size={18} />
                    Add To Cart
                  </button>
                </div>
              </div>

              {/* Mobile Layout (Simplified) */}
              <div className="flex-1 flex flex-col justify-between md:hidden">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-royal-gold uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-lg font-serif text-gray-900 mb-2">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => moveToCart(item)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 uppercase tracking-wider text-xs font-bold transition-all bg-black text-white"
                >
                  Add To Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State Suggestion */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 mb-4">
            {data?.emptyStateText || "Looking for more?"}
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate("/shop")}
            className="border-black text-black hover:bg-black hover:text-white"
          >
            {data?.emptyStateButton || "Continue Shopping"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Vault;
