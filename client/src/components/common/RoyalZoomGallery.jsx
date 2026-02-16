import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  ZoomIn,
  ZoomOut,
  Scan,
  Grid,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
} from "lucide-react";
import { useCart } from "../../context/CartContext"; // Assuming context usage

// Flipkart-style Zoom Gallery for that "Retail Standard" feel but with Royal aesthetics
const RoyalZoomGallery = ({
  images,
  productName,
  product,
  portalId = "zoom-portal",
}) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [zoomState, setZoomState] = useState({ show: false, x: 0, y: 0 }); // Mouse position relative to image %
  const imgRef = useRef(null);
  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCart();

  // Safety check for images
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);

  // Drag/Pan State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const safeImages =
    images && images.length > 0 ? images : ["/images/logo.jpeg"];

  useEffect(() => {
    if (safeImages.length > 0) setSelectedImage(safeImages[0]);
  }, [images]);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    const x = e.clientX-left;
    const y = e.clientY-top;

    // Check bounds
    if (x < 0 || y < 0 || x > width || y > height) {
      setZoomState({ ...zoomState, show: false });
      return;
    }

    // Calculate percentage (0-100)
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setZoomState({ show: true, x: xPercent, y: yPercent });
  };

  // Reset pan when zoom is reset or modal closed
  useEffect(() => {
    if (!isModalOpen || modalZoom === 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [isModalOpen, modalZoom]);

  // Pan Handlers
  const onMouseDown = (e) => {
    if (modalZoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX-pan.x, y: e.clientY-pan.y });
    }
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setPan({
        x: e.clientX-dragStart.x,
        y: e.clientY-dragStart.y,
      });
    }
  };

  const onMouseUp = () => setIsDragging(false);

  const isWishlisted = wishlistItems.some((item) => item.id == product?.id);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full relative">
      {/* Thumbnails Strip (Vertical on Desktop) */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:h-[600px] scrollbar-hide py-2 md:py-0 w-full md:w-20 shrink-0">
        {safeImages.map((img, idx) => (
          <button
            key={idx}
            onMouseEnter={() => setSelectedImage(img)}
            onClick={() => setSelectedImage(img)}
            className={`border-2 rounded transition-all w-16 h-20 md:w-full md:h-24 shrink-0 overflow-hidden ${selectedImage === img ? "border-royal-gold opacity-100 ring-2 ring-royal-gold/20" : "border-gray-700 opacity-60 hover:opacity-100"}`}
          >
            <img
              src={img}
              alt={`View ${idx}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Stage */}
      <div className="relative flex-1 bg-white/5 border border-white/10 rounded-lg overflow-hidden md:h-[600px] flex items-center justify-center group z-10">
        {/* Image Container with Zoom Logic */}
        <div
          className="w-full h-full flex items-center justify-center relative bg-white cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomState({ ...zoomState, show: false })}
          onClick={() => {
            setIsModalOpen(true);
            setModalZoom(1);
          }}
          ref={imgRef}
        >
          <img
            src={selectedImage}
            alt={productName}
            className="max-w-full max-h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Overlays / Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-all transform hover:scale-110"
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart
              size={20}
              fill={isWishlisted ? "currentColor" : "none"}
              className={isWishlisted ? "text-red-500" : ""}
            />
          </button>
          <button
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition-all transform hover:scale-110"
            title="Share"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
              setModalZoom(1);
            }}
            className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 text-gray-400 hover:text-royal-gold transition-all transform hover:scale-110 group/scan"
            title="Inspect Masterpiece"
          >
            <Scan
              size={20}
              className="group-hover/scan:rotate-90 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* THE PORTAL ZOOM PANE (Side-by-Side Hover) */}
      {zoomState.show && !isModalOpen && (
        <div
          className="hidden lg:block absolute left-[102%] top-0 w-[800px] h-[600px] bg-white border border-gray-200 shadow-2xl z-50 rounded-lg overflow-hidden pointer-events-none"
          style={{
            backgroundImage: `url('${selectedImage}')`,
            backgroundPosition: `${zoomState.x}% ${zoomState.y}%`,
            backgroundSize: "250%", // 2.5x Zoom
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 border-4 border-royal-gold/20 pointer-events-none"></div>
          <div className="absolute bottom-4 right-4 bg-royal-gold text-black text-xs font-bold px-3 py-1 uppercase tracking-widest bg-opacity-80">
            Royal Inspection
          </div>
        </div>
      )}

      {/* FULL SCREEN MODAL WITH MANUAL ZOOM CONTROLS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-in fade-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-white/10 z-50">
            <h3 className="text-white font-serif text-lg tracking-wide">
              {productName}
            </h3>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Canvas */}
          <div
            className={`flex-1 relative flex items-center justify-center overflow-hidden select-none p-10 ${modalZoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${modalZoom})`,
              }}
              onWheel={(e) =>
                setModalZoom((prev) =>
                  Math.min(Math.max(1, prev + e.deltaY * -0.001), 4),
                )
              }
            >
              <img
                src={selectedImage}
                alt="Full View"
                className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl"
                draggable="false"
              />
            </div>
          </div>

          {/* Footer / Controls */}
          <div className="h-20 bg-black border-t border-white/10 flex items-center justify-center gap-6 z-50">
            <button
              onClick={() => setModalZoom((prev) => Math.max(1, prev-0.5))}
              className="p-3 rounded-full bg-white/10 hover:bg-royal-gold hover:text-black text-white transition-all disabled:opacity-50"
              disabled={modalZoom <= 1}
            >
              <ZoomOut size={24} />
            </button>

            <span className="text-royal-gold font-mono w-16 text-center">
              {Math.round(modalZoom * 100)}%
            </span>

            <button
              onClick={() => setModalZoom((prev) => Math.min(4, prev + 0.5))}
              className="p-3 rounded-full bg-white/10 hover:bg-royal-gold hover:text-black text-white transition-all disabled:opacity-50"
              disabled={modalZoom >= 4}
            >
              <ZoomIn size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoyalZoomGallery;
