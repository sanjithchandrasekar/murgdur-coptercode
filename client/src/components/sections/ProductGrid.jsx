import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

/* ──────────────────────────────────────────────
   Luxury product card
   ────────────────────────────────────────────── */
const LVCard = ({ item }) => {
  const hasSecondImage = item.images && item.images.length > 1;
  const isNew = item.isNew || false;

  return (
    <Link
      to={`/product/${item._id || item.id}`}
      className="group block"
    >
      {/* ── Image ── */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f0efed] mb-4">
        {/* Primary */}
        <img
          src={item.image}
          alt={item.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            hasSecondImage ? "group-hover:opacity-0" : "group-hover:scale-105"
          }`}
          loading="lazy"
        />

        {/* Secondary crossfade */}
        {hasSecondImage && (
          <img
            src={item.images[1]}
            alt={`${item.name} – view 2`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* NEW badge */}
        {isNew && (
          <span className="absolute top-3 left-3 z-10 bg-white text-black text-[9px] font-bold uppercase tracking-[0.18em] px-2 py-1 leading-none">
            New
          </span>
        )}

        {/* Wishlist heart */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 z-20 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-black hover:text-[#c9a96e]"
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>

        {/* Quick-add strip slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/95">
          <div className="w-full py-3 text-center text-[10px] uppercase tracking-[0.25em] font-bold text-black">
            Quick View
          </div>
        </div>
      </div>

      {/* ── Info (left-aligned) ── */}
      <div className="space-y-0.5">
        {item.category && (
          <p className="text-[10px] text-[#999] uppercase tracking-[0.12em]">
            {item.category}
          </p>
        )}
        <h3 className="text-[12.5px] font-sans font-normal tracking-[0.03em] text-[#19110b] leading-snug line-clamp-2">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[12.5px] font-sans text-[#19110b]">
            ₹ {(item.price || 0).toLocaleString()}
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-[11px] font-sans text-[#999] line-through">
              ₹ {item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

/* ──────────────────────────────────────────────
   Section
   ────────────────────────────────────────────── */
const ProductGrid = ({ heading, eyebrow, products, viewAllLink }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="px-[6.4vw] md:px-[3.125vw] lg:px-[4.6875vw] xl:px-[8.333vw]">

        {/* ── Section header ── */}
        <div className="mb-10 md:mb-14">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#999] mb-3">
              {eyebrow}
            </p>
          )}
          <div className="flex items-end justify-between">
            <h2 className="text-[1.75rem] md:text-[2rem] font-serif font-normal text-[#19110b] leading-tight tracking-tight">
              {heading || "Featured Collection"}
            </h2>
            {viewAllLink && (
              <Link
                to={viewAllLink}
                className="text-[11px] uppercase tracking-[0.2em] text-[#19110b] border-b border-[#19110b] pb-px hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors duration-300 hidden md:block"
              >
                See All
              </Link>
            )}
          </div>
          {/* thin rule below heading */}
          <div className="mt-6 border-t border-[#e1e1e1]" />
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-14">
          {products.map((item, idx) => (
            <LVCard key={item._id || item.id || idx} item={item} />
          ))}
        </div>

        {/* ── Mobile "See All" link ── */}
        {viewAllLink && (
          <div className="mt-12 flex justify-center md:hidden">
            <Link
              to={viewAllLink}
              className="text-[11px] uppercase tracking-[0.2em] text-[#19110b] border-b border-[#19110b] pb-px"
            >
              See All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
