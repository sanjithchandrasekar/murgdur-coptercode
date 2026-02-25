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
  ArrowLeft,
} from "lucide-react";
import Button from "../components/common/Button";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../utils/sanity";
import RoyalZoomGallery from "../components/common/RoyalZoomGallery";
import SEO from "../components/common/SEO";
import ProductImage from "../components/common/ProductImage";
import { motion, AnimatePresence } from "framer-motion";

const imgLogo = "/images/branding/logo.jpeg";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems, cartItems } =
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
  const [isDescExpanded, setIsDescExpanded] = useState(false);

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
  const isInCart = cartItems.some((item) => item.id == product.id);

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

        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-500 hover:text-black transition-colors mb-6 group"
        >
          <ArrowLeft size={14} strokeWidth={1.5} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

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

            {/* Header Info: Product ID and Wishlist */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-400 tracking-[0.15em] uppercase font-medium">
                  Product ID
                </span>
                <span className="text-[13px] text-black tracking-[0.08em] uppercase font-semibold">
                  {product.productId || product.sku || "MURG-0000"}
                </span>
                {product.sku && product.sku !== product.productId && (
                  <span className="text-[10px] text-gray-400 tracking-[0.05em] uppercase">
                    SKU: {product.sku}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
                }}
                className="flex items-center text-black transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={18}
                  strokeWidth={1.5}
                  fill={isWishlisted ? "black" : "none"}
                  className="transition-all text-black hover:scale-110"
                />
              </button>
            </div>

            {/* Commercial Tag & Title */}
            <div className="mb-4">
              <div className="text-[12px] text-gray-500 mb-1">Pre-order Now</div>
              <h1 className="text-[1.8rem] leading-tight font-normal text-black tracking-wide">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-[1.1rem] font-normal text-black block mb-1">
                ₹{Number(product.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <p className="text-[11px] text-gray-500 tracking-wide">
                (M.R.P. incl. of all taxes)
              </p>
            </div>

            {/* Concierge Button */}
            <div className="mb-6">
              <button
                className="w-full py-[15px] bg-black text-white hover:bg-[#1a1a1a] transition-all rounded-full text-[13px] font-medium flex items-center justify-center"
                onClick={() => {
                  if (isInCart) {
                    navigate("/cart");
                    return;
                  }
                  const loggedIn = !!localStorage.getItem("userProfile");
                  addToCart({ ...product, selectedSize, selectedColor, isGiftWrapped }, 1);
                  if (!loggedIn) {
                    navigate("/profile", { state: { returnUrl: `/product/${product.id}` } });
                  } else {
                    navigate("/cart");
                  }
                }}
              >
                {isInCart ? "View in Cart" : "Add To Cart"}
              </button>
            </div>



            {/* Short Description */}
            <div className="py-2 mb-4">
              <div
                className={`text-[13px] text-gray-600 leading-relaxed font-light ${!isDescExpanded ? 'line-clamp-[4]' : ''}`}
                dangerouslySetInnerHTML={{ __html: getProductFullDescription(product) }}
              />
              <button
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="text-[12px] font-semibold underline underline-offset-4 mt-3 hover:text-gray-600 transition-colors inline-block"
              >
                {isDescExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200 mt-6">

              {/* Sustainability */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[12px] font-normal tracking-wide">Sustainability</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={16} strokeWidth={1} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity text-gray-400" />
                    <Minus size={16} strokeWidth={1} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity text-gray-400" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed">
                  We are committed to preserving natural resources and holding our supply chain to the highest environmental and ethical standards. All materials are responsibly sourced, and our packaging is recyclable.
                </div>
              </details>

              {/* Product Care */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[12px] font-normal tracking-wide">Product Care</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={16} strokeWidth={1} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity text-gray-400" />
                    <Minus size={16} strokeWidth={1} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity text-gray-400" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed">
                  <p className="mb-2">{getProductMaterials(product)}</p>
                  <p>{getProductCare(product)}</p>
                </div>
              </details>

              {/* In-Store Services */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-black hover:opacity-70 transition-opacity">
                  <span className="text-[12px] font-normal tracking-wide">In-Store Services</span>
                  <span className="relative h-4 w-4 flex-shrink-0">
                    <Plus size={16} strokeWidth={1} className="absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity text-gray-400" />
                    <Minus size={16} strokeWidth={1} className="absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity text-gray-400" />
                  </span>
                </summary>
                <div className="pb-5 text-[12px] text-gray-500 font-light leading-relaxed">
                  Discover this item in store with an advisor. <span className="underline cursor-pointer text-black">Check availability in store</span>
                </div>
              </details>

            </div>

            {/* Links Sections: Delivery & Returns, Gifting */}
            <div className="divide-y divide-gray-200 border-b border-gray-200 mb-8">
              {[
                { label: "Delivery & Returns", msg: "Complimentary shipping on all orders. Delivery within 3–5 business days. Easy 30-day returns on all unworn and unaltered items." },
                { label: "Gifting", msg: "Every order arrives in our signature luxury gift box, ribboned and sealed, with a personalised handwritten message card." }
              ].map(({ label, msg }) => (
                <button
                  key={label}
                  onClick={() => showNotice(label, msg)}
                  className="w-full flex items-center justify-between py-4 hover:opacity-60 transition-opacity group"
                >
                  <span className="text-[12px] font-normal tracking-wide text-black">{label}</span>
                  <span className="text-gray-400 text-lg font-light">›</span>
                </button>
              ))}
            </div>

          </div>
        </div>



      </div>

      {/* ── SIZE GUIDE MODAL ── */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div
            className={`bg-white border text-black p-6 md:p-10 w-full relative shadow-2xl z-10 max-h-[85vh] overflow-y-auto ${product.type === "shoes" ? "max-w-md" : product.type === "watches" ? "max-w-lg" : "max-w-2xl"
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
                      {["US M", "UK", "EU", "CM", "US W"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{ usM: 7, uk: 6, eu: 40, cm: 24.4, usW: 8 }, { usM: 8, uk: 7, eu: 41, cm: 25.2, usW: 9 }, { usM: 9, uk: 8, eu: 42.5, cm: 26, usW: 10 }, { usM: 10, uk: 9, eu: 44, cm: 27, usW: 11 }].map((row, i) => (
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
                      {["Size", "Bust", "Waist", "Hips"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{ size: "XS", bust: 32, waist: 24, hips: 34 }, { size: "S", bust: 34, waist: 26, hips: 36 }, { size: "M", bust: 36, waist: 28, hips: 38 }, { size: "L", bust: 39, waist: 31, hips: 41 }, { size: "XL", bust: 42, waist: 34, hips: 44 }].map(row => (
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
                      {["Size", "Chest", "Waist", "Length"].map(h => <th key={h} className="p-3 font-semibold text-[11px] tracking-wider text-gray-600">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[{ size: "S", chest: 36, waist: 30, length: 28 }, { size: "M", chest: 38, waist: 32, length: 29 }, { size: "L", chest: 40, waist: 34, length: 30 }, { size: "XL", chest: 42, waist: 36, length: 31 }, { size: "XXL", chest: 44, waist: 38, length: 32 }].map(row => (
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

function getProductFullDescription(product) {
  let desc = product.description || getProductInsight(product);

  if (desc.includes("This reference is either Made in")) {
    return desc.replace(/\n/g, "<br/>");
  }

  let specs = [];

  // Dimensions
  if (product.type === "bags" || product.type === "handbags" || (product.name || "").toLowerCase().includes("bag")) {
    specs.push("23 x 12 x 4 cm<br/>(Length x Height x Width)");
  } else if (product.type === "wallets" || (product.name || "").toLowerCase().includes("wallet")) {
    specs.push("11 x 8.5 x 2 cm<br/>(Length x Height x Width)");
  } else if (product.type === "watches" || (product.name || "").toLowerCase().includes("watch")) {
    specs.push("Case Diameter: 40 mm<br/>(Diameter x Thickness)");
  }

  // Materials / Hardware
  const t = (product.type || "").toLowerCase();
  const n = (product.name || "").toLowerCase();
  if (t === "bags" || t === "handbags" || n.includes("bag")) {
    specs.push("Calfskin<br/>Calfskin trim<br/>Cotton lining<br/>Gold-toned hardware<br/>Zipper closure with S-lock<br/>Strap: Removable, adjustable<br/>Strap Drop: 53.0 cm<br/>Strap Drop Max: 58.0 cm<br/>Chain: Removable<br/>Chain Drop: 17.0 cm");
  } else if (t === "shoes" || t === "slippers" || n.includes("shoe")) {
    specs.push("Full-grain leather<br/>Leather lining<br/>Rubber sole with leather heel<br/>Signature embossed logo<br/>Classic slip-on or laced fastening");
  } else if (t === "watches" || n.includes("watch")) {
    specs.push("316L stainless steel<br/>Sapphire crystal glass<br/>Anti-reflective coating<br/>Water-resistant to 50m<br/>Strap: Adjustable<br/>Swiss-inspired precision movement");
  } else if (t === "perfumes" || n.includes("perfume")) {
    specs.push("Signature glass flacon<br/>Lacquered stopper<br/>Travel-friendly design<br/>Concentration: Eau de Parfum");
  } else if (t === "dresses" || t === "shirts" || n.includes("dress") || n.includes("shirt") || t === "clothing") {
    specs.push("Premium woven fabric<br/>Hand-finished seams<br/>Comfortable cotton lining<br/>Signature aesthetic details<br/>Relaxed yet tailored fit");
  } else if (t === "wallets" || n.includes("wallet")) {
    specs.push("Full-grain leather<br/>Multiple card slots<br/>Bill compartment<br/>Zip coin pocket<br/>Gold-toned hardware");
  } else if (t === "sunglasses" || n.includes("sunglass")) {
    specs.push("Italian acetate frame<br/>Mineral glass lenses<br/>UV-400 protection<br/>Adjustable nose pads");
  } else {
    specs.push("Premium materials<br/>Signature detailing<br/>Expert craftsmanship");
  }

  specs.push("<br/>This reference is either Made in France, Spain, Italy or in the US.");

  return `<p>${desc}</p><br/>` + specs.join("<br/>");
}

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
        <ProductImage
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          loading="lazy"
          useWhiteBg={true}
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
