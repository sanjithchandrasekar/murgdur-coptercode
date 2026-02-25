import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { getWhiteBgImageArray } from "../../utils/whiteBgImages";

/**
 * Luxury product image gallery
 * Desktop: Stacked large images (Louis Vuitton style)
 * Mobile: Swipeable single image with dot indicators
 * Automatically uses white-background versions when available
 */
const RoyalZoomGallery = ({ images, productName }) => {
  // Convert images to white-bg versions (auto fallback if not available)
  const displayImages = images && images.length > 0 
    ? getWhiteBgImageArray(images)
    : ["/images/branding/logo.jpeg"];
  const safeImages = displayImages;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalZoom, setModalZoom] = useState(1);

  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const touchStartX = useRef(null);

  // Reset pan when modal closes
  useEffect(() => {
    if (!isModalOpen) { setModalZoom(1); setPan({ x: 0, y: 0 }); }
  }, [isModalOpen]);

  const prev = () => setActiveIdx((i) => Math.max(i - 1, 0));
  const next = () => setActiveIdx((i) => Math.min(i + 1, safeImages.length - 1));

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) { if (delta > 0) next(); else prev(); }
    touchStartX.current = null;
  };

  const onMouseDown = (e) => {
    if (modalZoom > 1) { setIsDragging(true); setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y }); }
  };
  const onMouseMove = (e) => {
    if (isDragging) { e.preventDefault(); setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); }
  };
  const onMouseUp = () => setIsDragging(false);

  const openFullscreen = (idx) => {
    setActiveIdx(idx);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ── DESKTOP: STACKED LARGE IMAGES ── */}
      <div className="hidden md:flex flex-col gap-[2px] w-full">
        {safeImages.map((img, idx) => (
          <div
            key={idx}
            className="w-full relative bg-[#F6F5F3] overflow-hidden cursor-zoom-in group"
            onClick={() => openFullscreen(idx)}
          >
            <img
              src={img}
              alt={`${productName} - view ${idx + 1}`}
              className="w-full h-auto object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
            />

            {/* Zoom hint */}
            <div className="absolute bottom-6 right-6 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ZoomIn size={12} strokeWidth={1.5} />
              <span className="text-[9px] uppercase tracking-[0.2em] font-semibold">Zoom</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE: swipeable image + dot indicators ── */}
      <div className="md:hidden w-full relative">
        <div
          className="w-full bg-[#F6F5F3] overflow-hidden cursor-zoom-in"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => openFullscreen(activeIdx)}
        >
          <img src={safeImages[activeIdx]} alt={productName} className="w-full h-auto object-cover" />
        </div>

        {safeImages.length > 1 && (
          <>
            <button
              onClick={prev} disabled={activeIdx === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-0 transition-opacity"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={next} disabled={activeIdx === safeImages.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 flex items-center justify-center disabled:opacity-0 transition-opacity"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
            <div className="flex justify-center gap-1.5 mt-4">
              {safeImages.map((_, idx) => (
                <button
                  key={idx} onClick={() => setActiveIdx(idx)}
                  className={`rounded-full transition-all duration-200 ${activeIdx === idx ? "w-5 h-1.5 bg-black" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── FULLSCREEN MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
            <span className="text-[10px] uppercase tracking-[0.22em] text-gray-400 font-medium">
              {productName}
            </span>
            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 transition-colors" aria-label="Close">
              <X size={18} strokeWidth={1} />
            </button>
          </div>

          {/* Zoom image area */}
          <div
            className={`flex-1 flex items-center justify-center bg-[#F6F5F3] overflow-hidden select-none p-8 ${modalZoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${modalZoom})`, transition: isDragging ? "none" : "transform 0.15s ease-out" }}
              onWheel={(e) => setModalZoom((p) => Math.min(Math.max(1, p + e.deltaY * -0.001), 4))}
            >
              <img src={safeImages[activeIdx]} alt={productName} className="max-h-[80vh] max-w-[90vw] object-contain" draggable="false" />
            </div>
          </div>

          {/* Thumbnails in modal */}
          {safeImages.length > 1 && (
            <div className="bg-white border-t border-gray-100 py-3 px-4 flex items-center justify-center gap-2 overflow-x-auto flex-shrink-0">
              {safeImages.map((img, idx) => (
                <button
                  key={idx} onClick={() => setActiveIdx(idx)}
                  className={`w-12 h-14 flex-shrink-0 overflow-hidden border-b-2 transition-all ${activeIdx === idx ? "border-b-black opacity-100" : "border-b-transparent opacity-50 hover:opacity-80"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Zoom controls */}
          <div className="h-14 bg-white border-t border-gray-100 flex items-center justify-center gap-8 flex-shrink-0">
            <button onClick={() => setModalZoom((p) => Math.max(1, p - 0.5))} disabled={modalZoom <= 1} className="p-2 hover:bg-gray-50 disabled:opacity-20 transition-colors">
              <ZoomOut size={16} strokeWidth={1.5} />
            </button>
            <span className="text-[11px] text-gray-400 tracking-wider w-12 text-center">{Math.round(modalZoom * 100)}%</span>
            <button onClick={() => setModalZoom((p) => Math.min(4, p + 0.5))} disabled={modalZoom >= 4} className="p-2 hover:bg-gray-50 disabled:opacity-20 transition-colors">
              <ZoomIn size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoyalZoomGallery;
