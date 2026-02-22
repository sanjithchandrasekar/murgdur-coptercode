import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  Share2,
  X,
  ShoppingBag,
  Check,
  History,
  Truck,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../utils/sanity";
import RoyalZoomGallery from "../components/common/RoyalZoomGallery";
import SEO from "../components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";

const imgLogo = "/images/logo.jpeg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCart();

  // Dialog State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "alert",
    onConfirm: null,
  });

  const showNotice = (title, message, type = "alert", onConfirm = null) => {
    setDialog({ isOpen: true, title, message, type, onConfirm });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Fetch Product
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const allProducts = await fetchProducts();
      // Loosely compare ID to support both int (static) and string (sanity) IDs
      const found = allProducts.find(
        (p) => p.id.toString() === id || p._id === id,
      );
      setProduct(found);

      if (found) {
        // Filter for similar items
        const related = allProducts
          .filter(
            (p) =>
              (p.category === found.category || p.type === found.type) &&
              p.id !== found.id,
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }

      setLoading(false);
    };
    load();
  }, [id]);

  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [pincode, setPincode] = useState("");

  // Load Pincode
  useEffect(() => {
    const sel = JSON.parse(localStorage.getItem("selectedAddress") || "null");
    if (sel && sel.pincode) {
      setPincode(sel.pincode);
    }
  }, []);

  // Update selected color when product changes
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }

      // Recently Viewed Logic
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updated = [
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        },
        ...viewed.filter((p) => p.id !== product.id),
      ].slice(0, 6);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      setRecentlyViewed(updated.filter((p) => p.id !== product.id));
    }
  }, [product]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-32 text-black text-center flex items-center justify-center">
        <div className="animate-pulse tracking-widest uppercase font-sans text-sm">
          Loading Details...
        </div>
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
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotice(
        "Link Copied",
        "The product link has been copied to your clipboard.",
      );
    }
  };

  if (!product) {
    return (
      <div className="bg-white min-h-screen pt-32 text-black flex flex-col items-center justify-center font-sans tracking-wide">
        <h2 className="text-2xl mb-2 uppercase">Product Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center text-sm">
          The item you are looking for may have been removed or is temporarily
          unavailable.
        </p>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="border-black text-black hover:bg-black hover:text-white px-8 uppercase font-bold text-xs tracking-widest py-3"
          >
            Go Back
          </Button>
          <Link to="/shop">
            <Button
              variant="primary"
              className="bg-black text-white hover:bg-gray-800 px-8 uppercase font-bold text-xs tracking-widest py-3"
            >
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item.id == product.id);

  return (
    <div className="bg-white min-h-screen pt-24 pb-24 text-gray-900 font-sans">
      <SEO
        title={`${product.name} | Murgdur`}
        description={product.description || `Buy ${product.name} at Murgdur. Premium quality and timeless design.`}
        image={product.image}
        url={`https://murugdur1.vercel.app/product/${product.id}`}
        type="product"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── BREADCRUMBS ── */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-400 mb-8">
          <Link to="/" className="hover:text-black transition-colors">Murgdur</Link>
          <span className="text-gray-300">›</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="text-gray-300">›</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category || "")}`}
            className="hover:text-black transition-colors"
          >
            {product.category}
          </Link>
          {product.type && (
            <>
              <span className="text-gray-300">›</span>
              <span className="text-black capitalize">{product.type}</span>
            </>
          )}
        </nav>

        {/* ── MAIN GRID: Gallery + Info ── */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

          {/* LEFT: Gallery */}
          <div className="lg:w-[58%] xl:w-[60%]">
            <RoyalZoomGallery
              images={product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : [imgLogo]}
              productName={product.name}
              product={product}
            />
          </div>

          {/* RIGHT: Sticky product info */}
          <div className="lg:w-[42%] xl:w-[40%] lg:sticky lg:top-28 self-start lg:pb-10">

            {/* Category badge + Wishlist */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-semibold">
                {product.subcategory || product.type || product.category}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
                }}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-500 hover:text-black transition-colors group"
              >
                <Heart
                  size={15}
                  strokeWidth={1.5}
                  fill={isWishlisted ? "black" : "none"}
                  className={`transition-all ${isWishlisted ? "text-black" : "text-gray-400 group-hover:text-black"}`}
                />
                <span className="hidden sm:inline">{isWishlisted ? "Saved" : "Save"}</span>
              </button>
            </div>

            {/* Product Name */}
            <h1 className="text-[1.6rem] leading-tight font-normal tracking-wide text-black mb-2">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill={star <= Math.round(product.rating) ? "#000" : "none"}
                      stroke="#000"
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-gray-400 tracking-wide">
                  {product.rating.toFixed(1)} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-1">
              <span className="text-[1.05rem] font-normal tracking-wide text-black">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ml-3 text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 tracking-wide mb-7">
              M.R.P. inclusive of all taxes
            </p>

            {/* ── COLOUR / MATERIAL ── */}
            {product.colors && product.colors.length > 0 && product.type !== "perfumes" && (
              <div className="mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">
                    Colour
                  </span>
                  <span className="text-[11px] text-gray-500 capitalize">
                    {selectedColor || product.colors[0]}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ${
                        selectedColor === color
                          ? "border-black scale-110 shadow-sm"
                          : "border-transparent hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── SIZE SELECTION ── */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5 pb-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">
                    Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[10px] uppercase tracking-[0.15em] text-gray-400 underline underline-offset-2 hover:text-black transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[44px] h-10 px-3 text-[11px] uppercase tracking-widest border transition-all duration-150 font-medium ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── ADD TO BAG ── */}
            <div className="flex flex-col gap-3 mb-6">
              <button
                className="w-full py-[15px] bg-[#19110b] text-white hover:bg-black active:scale-[0.99] transition-all duration-150 text-[11px] uppercase tracking-[0.25em] font-semibold"
                onClick={() => {
                  addToCart({ ...product, selectedSize, selectedColor, isGiftWrapped }, 1);
                  navigate("/checkout");
                }}
              >
                Add to Bag
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
                }}
                className="w-full py-[13px] border border-gray-300 text-black hover:border-black transition-all duration-150 text-[11px] uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
              >
                <Heart size={13} strokeWidth={1.5} fill={isWishlisted ? "black" : "none"} />
                {isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>
            </div>

            {/* ── CONCIERGE LINE ── */}
            <p className="text-[10px] text-gray-400 leading-relaxed mb-6 text-center">
              Questions about this piece?{" "}
              <span
                className="text-black underline underline-offset-2 cursor-pointer hover:opacity-60 transition-opacity"
                onClick={() => showNotice("Digital Concierge", "Our team of luxury experts is available 24/7. Call +91 0000 000000 or email concierge@murgdur.com")}
              >
                Contact our Digital Concierge
              </span>
            </p>

            {/* ── PERSONALISATION ── */}
            <button
              className="w-full text-left flex items-center justify-between py-3 mb-1 hover:opacity-70 transition-opacity border-b border-gray-100"
              onClick={() => showNotice("Royal Initials", "Personalisation services — custom initials, hand-painted motifs and signature stripes — are available exclusively in our flagship boutiques. Please contact our Digital Concierge for assistance.")}
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black block mb-0.5">Royal Initials</span>
                <span className="text-[10px] text-gray-400">Personalise with initials or patches</span>
              </div>
              <span className="text-gray-400 text-lg font-light ml-4">›</span>
            </button>

            {/* ── SHORT DESCRIPTION ── */}
            <div className="py-5 border-b border-gray-100">
              <p className="text-[13px] text-gray-600 leading-relaxed font-light">
                {product.description
                  ? product.description.length > 200
                    ? product.description.slice(0, 200) + "…"
                    : product.description
                  : getProductInsight(product)}
              </p>
            </div>

            {/* ── ACCORDION SECTIONS ── */}
            <div className="divide-y divide-gray-100">

              {/* Product Details */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Product Details</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity" />
                    <Minus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed space-y-2">
                  {product.description ? (
                    <p>{product.description}</p>
                  ) : (
                    <p>{getProductInsight(product)}</p>
                  )}
                  {product.colors && product.colors.length > 0 && (
                    <p><span className="text-black font-medium">Available colours:</span> {product.colors.length} option{product.colors.length !== 1 ? "s" : ""}</p>
                  )}
                  {product.sizes && product.sizes.length > 0 && (
                    <p><span className="text-black font-medium">Sizes:</span> {product.sizes.join(", ")}</p>
                  )}
                  {product.isNew && (
                    <p className="text-black font-medium uppercase tracking-widest text-[10px]">New Arrival</p>
                  )}
                </div>
              </details>

              {/* Materials & Care */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Materials & Care</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity" />
                    <Minus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed">
                  <p className="mb-2">{getProductMaterials(product)}</p>
                  <p>{getProductCare(product)}</p>
                </div>
              </details>

              {/* Sustainability */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Sustainability</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity" />
                    <Minus size={14} strokeWidth={1.5} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed">
                  We are committed to preserving natural resources and holding our supply chain to the highest environmental and ethical standards. All materials are responsibly sourced, and our packaging is recyclable.
                </div>
              </details>
            </div>

            {/* ── DELIVERY / GIFTING LINKS ── */}
            <div className="mt-2 border-t border-gray-100 divide-y divide-gray-100">
              {[
                { label: "Delivery & Returns", msg: "Complimentary shipping on all orders. Delivery within 3–5 business days. Easy 30-day returns on all unworn and unaltered items." },
                { label: "Gifting", msg: "Every order arrives in our signature luxury gift box, ribboned and sealed, with a personalised handwritten message card." },
                { label: "Boutique Services", msg: "Our boutiques offer complimentary cleaning, conditioning and expert repair evaluation for all authentic Murgdur pieces." },
              ].map(({ label, msg }) => (
                <button
                  key={label}
                  onClick={() => showNotice(label, msg)}
                  className="w-full flex items-center justify-between py-4 hover:opacity-60 transition-opacity group"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-black">{label}</span>
                  <span className="text-gray-400 text-lg font-light">›</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* ── YOU MAY ALSO LIKE ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 border-t border-gray-100 pt-14">
            <h2 className="text-center text-[11px] uppercase tracking-[0.3em] font-semibold text-black mb-10">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCardLite key={p.id || p._id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── RECENTLY VIEWED ── */}
        {recentlyViewed.length > 0 && (
          <section className="mt-20 border-t border-gray-100 pt-14">
            <h2 className="text-center text-[11px] uppercase tracking-[0.3em] font-semibold text-black mb-10">
              Recently Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {recentlyViewed.map((p) => (
                <ProductCardLite key={p.id} product={p} small />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── SIZE GUIDE MODAL ── */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div
            className={`bg-white border text-black p-6 md:p-10 w-full relative shadow-2xl z-10 max-h-[85vh] overflow-y-auto ${
              product.type === "shoes" ? "max-w-md" : product.type === "watches" ? "max-w-lg" : "max-w-2xl"
            }`}
          >
            <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors p-1">
              <X size={22} strokeWidth={1} />
            </button>
            <div className="text-center mb-8">
              <h3 className="text-[14px] uppercase tracking-[0.25em] font-semibold mb-1">Size Guide</h3>
              <p className="text-[11px] text-gray-400 font-light tracking-wide">
                {product.type === "watches" ? "Watch Dial Size Guide" : product.type === "shoes" || product.type === "slippers" ? "Standard Footwear Sizing (Men & Women)" : product.type === "dresses" ? "Women's Dress Chart (Inches)" : "Men's Apparel Sizing (Inches)"}
              </p>
            </div>
            <div className="overflow-x-auto text-sm font-light">
              {product.type === "watches" ? (
                <p className="text-center italic text-gray-400 text-xs">Please refer to the product dimensions listed in the details section.</p>
              ) : product.type === "shoes" || product.type === "slippers" ? (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {["US M","UK","EU","CM","US W"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{usM:7,uk:6,eu:40,cm:24.4,usW:8},{usM:8,uk:7,eu:41,cm:25.2,usW:9},{usM:9,uk:8,eu:42.5,cm:26,usW:10},{usM:10,uk:9,eu:44,cm:27,usW:11}].map((row,i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="p-3 font-medium text-sm">{row.usM}</td>
                        <td className="p-3 text-gray-500 text-sm">{row.uk}</td>
                        <td className="p-3 text-gray-500 text-sm">{row.eu}</td>
                        <td className="p-3 text-gray-500 text-sm">{row.cm}</td>
                        <td className="p-3 text-gray-500 text-sm">{row.usW}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : product.type === "dresses" ? (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {["Size","Bust","Waist","Hips"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{size:"XS",bust:32,waist:24,hips:34},{size:"S",bust:34,waist:26,hips:36},{size:"M",bust:36,waist:28,hips:38},{size:"L",bust:39,waist:31,hips:41},{size:"XL",bust:42,waist:34,hips:44}].map(row => (
                      <tr key={row.size} className="border-b border-gray-100">
                        <td className="p-3 font-medium">{row.size}</td>
                        <td className="p-3 text-gray-500">{row.bust}"</td>
                        <td className="p-3 text-gray-500">{row.waist}"</td>
                        <td className="p-3 text-gray-500">{row.hips}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      {["Size","Chest","Waist","Length"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{size:"S",chest:36,waist:30,length:28},{size:"M",chest:38,waist:32,length:29},{size:"L",chest:40,waist:34,length:30},{size:"XL",chest:42,waist:36,length:31},{size:"XXL",chest:44,waist:38,length:32}].map(row => (
                      <tr key={row.size} className="border-b border-gray-100">
                        <td className="p-3 font-medium">{row.size}</td>
                        <td className="p-3 text-gray-500">{row.chest}"</td>
                        <td className="p-3 text-gray-500">{row.waist}"</td>
                        <td className="p-3 text-gray-500">{row.length}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── GLOBAL NOTICE DIALOG ── */}
      <AnimatePresence>
        {dialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="relative bg-white p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <h3 className="text-black text-[11px] font-semibold mb-3 tracking-[0.2em] uppercase">
                {dialog.title}
              </h3>
              <p className="text-gray-500 text-[13px] leading-relaxed mb-8 font-light">
                {dialog.message}
              </p>
              <button
                onClick={closeDialog}
                className="w-full px-6 py-3 bg-black text-white text-[10px] font-semibold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── HELPER FUNCTIONS ──────────────────────────────────────────

function getProductInsight(product) {
  const t = (product.type || "").toLowerCase();
  const n = (product.name || "").toLowerCase();
  if (t === "bags" || t === "handbags" || n.includes("bag") || n.includes("tote") || n.includes("clutch"))
    return "Crafted from premium coated canvas with fine leather trim. Each piece is individually hand-finished, making it truly one of a kind.";
  if (t === "shoes" || t === "slippers" || n.includes("shoe") || n.includes("loafer") || n.includes("sneaker"))
    return "Meticulously constructed in full-grain leather with an expert-crafted sole. Comfort and elegance in every step.";
  if (t === "watches" || n.includes("watch") || n.includes("timepiece"))
    return "Swiss-inspired precision movement housed in a polished stainless steel case. Sapphire crystal glass ensures lifelong clarity.";
  if (t === "perfumes" || n.includes("perfume") || n.includes("fragrance"))
    return "An olfactory journey composed by master perfumers. Each bottle is sealed with our signature lacquered stopper and presented in a heritage gift box.";
  if (t === "dresses" || n.includes("dress") || n.includes("lehenga") || n.includes("saree"))
    return "Fluid silhouette in our finest woven fabric. Each seam is expertly finished by skilled artisans, honouring centuries of Indian textile tradition.";
  if (t === "shirts" || n.includes("shirt") || n.includes("sherwani") || n.includes("kurta"))
    return "Tailored silhouette in premium cotton or silk weave. The fit is engineered for both regal ceremony and refined elegance.";
  if (t === "wallets" || n.includes("wallet") || n.includes("cardholder"))
    return "Full-grain leather or signature canvas. A slim, structured profile that ages beautifully with every day of use.";
  if (t === "sunglasses" || n.includes("sunglass") || n.includes("shades"))
    return "Sculptural acetate frames with mineral UV-400 lenses. Lightweight construction with an unmistakably bold silhouette.";
  return `The ${product.name} unites timeless design with impeccable heritage craftsmanship. Made for those who live with discernment.`;
}

function getProductMaterials(product) {
  const t = (product.type || "").toLowerCase();
  const n = (product.name || "").toLowerCase();
  if (t === "bags" || t === "handbags" || n.includes("bag"))
    return "Exterior: Coated canvas or full-grain calf leather. Hardware: Gold-tone brass. Lining: Microfibre suede.";
  if (t === "shoes" || t === "slippers")
    return "Upper: Full-grain leather. Sole: Rubber with leather heel. Lining: Natural leather insole.";
  if (t === "watches")
    return "Case: 316L stainless steel. Crystal: Anti-reflective sapphire glass. Strap: Genuine alligator leather or stainless mesh.";
  if (t === "perfumes")
    return "Top notes: Citrus & bergamot. Heart: Floral or oud accord. Base: Musk, amber and sandalwood.";
  if (t === "dresses")
    return "Fabric: Pure silk or fine georgette. Embellishments: Hand-sewn zari or sequin work. Lining: Soft cotton.";
  if (t === "wallets")
    return "Exterior: Full-grain cowhide leather. Interior: Signature canvas with multiple card slots.";
  if (t === "sunglasses")
    return "Frame: Italian acetate. Lenses: Mineral glass with UV-400 protection. Nose pads: Adjustable hypoallergenic.";
  return "Premium-grade materials selected for longevity, comfort and aesthetic harmony.";
}

function getProductCare(product) {
  const t = (product.type || "").toLowerCase();
  const n = (product.name || "").toLowerCase();
  if (t === "bags" || t === "handbags" || n.includes("bag") || t === "wallets")
    return "Wipe gently with a dry microfibre cloth. Avoid contact with water, oils and chemical solvents. Store in the dust bag provided.";
  if (t === "shoes" || t === "slippers")
    return "Clean with a slightly damp cloth. Use leather conditioner monthly. Store with shoe trees to maintain shape.";
  if (t === "watches")
    return "Polish with a soft jeweler's cloth. Avoid exposing to strong magnets or temperature extremes. Service every 3–5 years.";
  if (t === "perfumes")
    return "Store upright in a cool, dark place. Keep away from direct sunlight and heat sources. Use within 36 months of opening.";
  if (t === "dresses" || t === "shirts")
    return "Dry clean recommended. If hand washing, use cold water and mild detergent. Iron inside-out on low heat.";
  if (t === "sunglasses")
    return "Clean lenses with the included microfibre cloth. Store in the protective case when not in use. Avoid resting face-down.";
  return "Handle with care. Avoid prolonged exposure to sunlight and humidity. Store in a cool, dry place.";
}

// ── PRODUCT CARD (used in You May Also Like & Recently Viewed) ────────────────

const ProductCardLite = ({ product, small = false }) => {
  return (
    <Link
      to={`/product/${product.id || product._id}`}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F5F3] mb-3">
        {product.isNew && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[9px] font-bold uppercase tracking-widest text-black">New</span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="text-center px-1 pt-1">
        <h3 className={`font-sans tracking-wide text-black mb-1 line-clamp-1 ${small ? "text-[11px]" : "text-[12px]"}`}>
          {product.name}
        </h3>
        <div className={`font-sans text-gray-400 ${small ? "text-[10px]" : "text-[12px]"}`}>
          ₹{(product.price || 0).toLocaleString()}
        </div>
      </div>
    </Link>
  );
};

export default ProductDetails;
