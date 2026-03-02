import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import HeroSlider from "../components/common/HeroSlider";
import RoyalCollectionCategories from "../components/common/RoyalCollectionCategories";
import ShopByOccasion from "../components/common/ShopByOccasion";
import Newsletter from "../components/common/Newsletter";
import Testimonials from "../components/common/Testimonials";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import LegacySection from "../components/common/LegacySection";
import { motion, AnimatePresence } from "framer-motion";
import { fetchHomePage } from "../utils/sanity";
import PageSections from "../components/sections/PageSections";

const spotlightImg = "/images/hero/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const royalBg = "/images/women/dresses/royal_dress_bg.png";

import SEO from "../components/common/SEO";

const Home = () => {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchHomePage();
      if (data) setHomeData(data);
    };
    loadData();
  }, []);

  // ---------------------------------------------------------
  // DYNAMIC PAGE BUILDER MODE
  // ---------------------------------------------------------
  if (homeData?.pageBuilder && homeData.pageBuilder.length > 0) {
    return (
      <div className="bg-white overflow-x-hidden">
        <SEO
          title="Murgdur | Luxury Royal Fashion & Heritage Clothing"
          description="Shop Murgdur — luxury royal fashion, heritage clothing & bespoke accessories for modern royalty in India. Designer menswear, womenswear & more."
        />
        <PageSections sections={homeData.pageBuilder} />

        {/* Keep Footer-like sections if they aren't part of pageBuilder yet, 
                    or assume user will add them via builder. 
                    For now, let's keep the globally used Newsletter if it's not in builder.
                    But typically Page Builder takes over full content.
                */}
        <Newsletter />
      </div>
    );
  }

  // ---------------------------------------------------------
  // LEGACY / HARDCODED FALLBACK MODE
  // ---------------------------------------------------------
  return (
    <div className="bg-white overflow-x-hidden">
      <SEO
        title="Murgdur | Luxury Royal Fashion & Heritage Clothing"
        description="Shop Murgdur \u2014 luxury royal fashion, heritage clothing & bespoke accessories for modern royalty in India. Designer menswear, womenswear & more."
      />

      {/* Full-Screen Cinematic Hero */}
      <div className="relative w-full h-screen overflow-hidden bg-[#f2f0ec]">
        {/* Hero Background Image */}
        <img
          src={homeData?.promoSection?.backgroundImage || royalBg}
          alt="Murgdur Royal Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle Light Overlay */}
        <div className="absolute inset-0 bg-white/5"></div>

        {/* Content Overlay — Bottom-anchored */}
        <div className="relative z-10 h-full flex flex-col items-center justify-end text-center px-6 pb-14 md:pb-20 lg:pb-24 xl:pb-28" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)'}}>

          {/* Category Eyebrow */}
          <span className="text-white/90 text-[11px] tracking-[0.18em] uppercase font-normal mb-4 block drop-shadow-md">
            {homeData?.promoSection?.eyebrow || "HERITAGE"}
          </span>

          {/* Main Collection Title */}
          <h1
            className="text-white text-center max-w-4xl mb-7 md:mb-9 px-4 font-serif"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 3.75rem)",
              fontWeight: 400,
              letterSpacing: "0.01em",
              lineHeight: 1.15,
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {homeData?.promoSection?.heading || "Royal Heritage Collection — Luxury Fashion for Modern Royalty"}
          </h1>

          {/* CTA Links — side-by-side with elegant underline */}
          <div className="flex flex-row items-center gap-8 md:gap-12">
            <Link
              to="/shop"
              className="text-white text-[13px] md:text-[14px] tracking-[0.04em] font-light hover:text-gray-200 transition-all duration-300 border-b border-white/60 hover:border-white pb-[3px] whitespace-nowrap drop-shadow-md"
            >
              Explore the Collection
            </Link>
            <Link
              to="/royal-collection"
              className="text-white text-[13px] md:text-[14px] tracking-[0.04em] font-light hover:text-gray-200 transition-all duration-300 border-b border-white/60 hover:border-white pb-[3px] whitespace-nowrap drop-shadow-md"
            >
              Discover Heritage
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Hub Structure */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        {/* Women's Collection */}
        <section className="bg-white pt-16">
          <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
            {/* Section Header-Women */}
            <div className="text-center mb-12">
              <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">Women</span>
              <h2
                className="text-black mb-4"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  letterSpacing: "0.025rem",
                  lineHeight: "1.5rem",
                }}
              >
                Explore a Selection of the Women's Royal Creations
              </h2>
              <p className="text-gray-500 font-light text-sm max-w-xl mx-auto">
                From hand-beaded ceremonial gowns to artisan leather handbags, every piece is a declaration of grace and heritage crafted for the modern queen.
              </p>
            </div>

            {/* Women's Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "Handbags",
                  img: "/images/women/handbags/woman bag white 1.jpeg",
                  link: "/shop?type=bags",
                },
                {
                  name: "Small Leather Goods",
                  img: "/images/women/handbags/woens small bag.jpg",
                  link: "/shop?type=wallets",
                },
                {
                  name: "Shoes",
                  img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
                  link: "/shop?type=shoes",
                },
                {
                  name: "Perfumes",
                  img: "/images/women/perfume/womens-perfume4.png",
                  link: "/shop?type=perfumes",
                },
              ].map((item, idx) => (
                <Link to={item.link} key={idx} className="group block mb-8">
                  {/* Product Image Container-Precise Portrait Aspect Ratio */}
                  <div
                    className="relative overflow-hidden bg-[#F6F6F6] mb-4 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#F2F2F2]"
                    style={{
                      aspectRatio: "218.094 / 360.609",
                      width: "100%",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Name */}
                  <h4
                    className="text-center text-black px-2 group-hover:underline underline-offset-4"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      letterSpacing: "0.025rem",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Men's Collection */}
        <section className="bg-white">
          <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
            {/* Section Header-Men */}
            <div className="text-center mb-12">
              <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">Men</span>
              <h2
                className="text-black mb-4"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  letterSpacing: "0.025rem",
                  lineHeight: "1.5rem",
                }}
              >
                Explore a Selection of the Men's Royal Creations
              </h2>
              <p className="text-gray-500 font-light text-sm max-w-xl mx-auto">
                From bespoke sherwanis and Banarasi kurtas to hand-stitched leather bags and precision timepieces — appointments for modern royalty.
              </p>
            </div>

            {/* Men's Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "Men's Bags",
                  img: "/images/men/bags/mens-bag3.png",
                  link: "/shop?type=bags",
                },
                {
                  name: "Wallets & Accessories",
                  img: "/images/men/wallets/mens_royal_wallet_section.png",
                  link: "/shop?type=wallets",
                },
                {
                  name: "Men's Shoes",
                  img: "https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?q=80&w=800&auto=format&fit=crop",
                  link: "/shop?type=shoes",
                },
                {
                  name: "Sunglasses",
                  img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop",
                  link: "/shop?type=sunglasses",
                },
              ].map((item, idx) => (
                <Link to={item.link} key={idx} className="group block mb-8">
                  {/* Product Image Container-Precise Portrait Aspect Ratio */}
                  <div
                    className="relative overflow-hidden bg-[#F6F6F6] mb-4 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#F2F2F2]"
                    style={{
                      aspectRatio: "218.094 / 360.609",
                      width: "100%",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Name */}
                  <h4
                    className="text-center text-black px-2 group-hover:underline underline-offset-4"
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      letterSpacing: "0.025rem",
                      lineHeight: "1.2",
                    }}
                  >
                    {item.name}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Campaign Section */}
      <section className="relative w-full h-[80vh] overflow-hidden bg-[#f5f3f0]">
        {homeData?.videoCampaign?.videoUrl ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-90">
            <source src={homeData.videoCampaign.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img
            src="/images/hero/Gemini_Generated_Image_6x7jv96x7jv96x7j.png"
            alt="Royal Campaign"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30"></div>
      </section>

      {/* Valentine's Day Gifts */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">Gifts</span>
            <h2
              className="text-black mb-4"
              style={{
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
                lineHeight: "1.5rem",
              }}
            >
              Royal Gift Selections
            </h2>
            <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">
              Curated for moments that deserve to be remembered. Each gift arrives in signature Murgdur packaging with a handwritten card and silk ribbon seal.
            </p>
          </div>

          {/* Product Grid-4 Column */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Key Pouch",
                price: "₹18,500.00",
                img: "/images/women/handbags/woens small bag.jpg",
                link: "/shop?search=Key Pouch",
              },
              {
                name: "Necklace",
                price: "₹32,000.00",
                img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
                link: "/shop?search=Necklace",
              },
              {
                name: "Multiple Wallet",
                price: "₹48,500.00",
                img: "/images/men/wallets/royal_wallet.png",
                link: "/shop?search=Multiple Wallet",
              },
              {
                name: "Silk Scarf",
                price: "₹12,500.00",
                img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop",
                link: "/shop?search=Silk Scarf",
              },
            ].map((item, index) => (
              <Link key={index} to={item.link} className="group block cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f3f0] mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <button className="absolute top-4 right-4 z-10 text-black/20 hover:text-black transition-colors opacity-0 group-hover:opacity-100 duration-300">
                    <Heart size={18} strokeWidth={1} />
                  </button>
                </div>

                {/* Product Name */}
                <h4
                  className="text-center text-black mb-1 px-2 group-hover:underline underline-offset-4"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    letterSpacing: "0.025rem",
                    lineHeight: "1.2",
                  }}
                >
                  {item.name}
                </h4>

                {/* Product Price */}
                <p
                  className="text-center text-gray-500"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 400,
                  }}
                >
                  {item.price}
                </p>
              </Link>
            ))}
          </div>

          {/* Filter Buttons-For Her / For Him */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <Link
              to="/shop?cat=women"
              className="px-8 py-3 bg-black text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              For Her
            </Link>
            <Link
              to="/shop?cat=men"
              className="px-8 py-3 bg-black text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              For Him
            </Link>
          </div>
        </div>
      </section>

      {/* Campaign Billboard Section-New Big Container */}
      <section className="relative w-full h-[90vh] bg-gray-100 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=2000&auto=format&fit=crop"
            alt="Royal Tailoring Campaign"
            className="w-full h-full object-cover"
            style={{
              objectPosition: "center 20%",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        </div>

        <div
          className="relative h-full flex flex-col justify-end pb-24 px-6 md:px-12"
          style={{ maxWidth: "1440px", margin: "0 auto" }}
        >
          <div className="max-w-xl">
            <span
              className="text-white uppercase tracking-[0.3em] font-medium mb-4 block"
              style={{ fontSize: "0.75rem" }}
            >
              The New Era of Sovereignty
            </span>
            <h2
              className="text-white mb-8"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Summer <br /> Tailoring
            </h2>
            <Link
              to="/shop?category=men"
              className="inline-block px-12 py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-500"
            >
              Explore the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Spring-Summer 2026 Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          <div className="text-center mb-16">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
              MEN
            </span>
            <h2 className="text-3xl md:text-4xl font-sans text-black tracking-tight font-light">
              Spring-Summer 2026
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Royal Heritage Duffle",
                price: "₹2,59,000.00",
                img: "/images/men/bags/mens-bag1.png",
                link: "/shop?type=bags",
              },
              {
                name: "Brocade Embroidered Kurta",
                price: "₹98,000.00",
                img: "/images/men/shirts/royal_tshirt.png",
                link: "/shop?type=shirts",
              },
              {
                name: "Royal Leather Sneaker",
                price: "₹1,51,000.00",
                img: "/images/men/shoes/menshoe1.png",
                link: "/shop?type=shoes",
              },
              {
                name: "Signature Bag Charm",
                price: "₹1,18,000.00",
                img: "/images/men/watches/micro.jpg",
                link: "/shop?type=accessories",
              },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group block relative">
                <div
                  className="relative overflow-hidden bg-[#F6F6F6] mb-4 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#F2F2F2]"
                  style={{
                    aspectRatio: "218.094 / 360.609",
                    width: "100%",
                  }}
                >
                  <button className="absolute top-4 right-4 z-10 text-black/20 hover:text-black transition-colors">
                    <Heart size={18} strokeWidth={1} />
                  </button>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="text-center px-1">
                  <h4 className="text-[13px] text-black font-normal mb-1 group-hover:underline underline-offset-4">
                    {item.name}
                  </h4>
                  <p className="text-[13px] text-gray-500 font-normal">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12 pb-12">
            <Link
              to="/shop?category=men"
              className="px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              See the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Perfume Experience Video */}
      <section className="relative w-full bg-black overflow-hidden">
        <div className="mx-auto" style={{ maxWidth: "1440px" }}>
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/perfume1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

            {/* Minimal Overlay Text */}
            <div className="absolute bottom-8 left-8 md:left-16 md:bottom-16">
              <span
                className="text-white/90 uppercase tracking-[0.3em] font-bold block"
                style={{ fontSize: "10px", letterSpacing: "0.3em" }}
              >
                High Perfumery
              </span>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-24 px-4 md:px-6 text-center container mx-auto bg-white"
      >
        <span className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold block mb-6">
          Welcome to Murgdur
        </span>
        <h2 className="text-2xl md:text-4xl font-sans text-black uppercase tracking-widest my-8 leading-tight max-w-4xl mx-auto font-bold">
          {homeData?.welcomeSection?.title ||
            '"The Crown Fits Only The Worthy"'}
        </h2>
        <div className="w-24 h-[1px] bg-black/10 mx-auto my-10"></div>
        <p className="text-gray-600 max-w-3xl mx-auto font-normal leading-loose text-lg tracking-wide font-sans">
          {homeData?.welcomeSection?.body ||
            "Forged in the fires of tradition, sculpted for the modern monarch. A collection that whispers power and echoes eternity."}
        </p>
      </motion.section>

      {/* High Perfumery Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-[4/5] overflow-hidden bg-gray-50">
              <img
                src="/images/men/perfume/royal_perfume.png"
                alt="Perfumery"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3
                className="text-black mb-4 uppercase"
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                }}
              >
                Essence of Majesty
              </h3>
              <h2
                className="text-black mb-8"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                Royal Olfactory
              </h2>
              <p className="text-gray-600 mb-4 font-light leading-relaxed max-w-md text-lg">
                A sensory journey through the finest raw materials from across the globe. Our fragrances are composed by master perfumers using rare oud, sandalwood, saffron, and precious florals in concentrations found only in haute perfumery.
              </p>
              <p className="text-gray-500 mb-10 font-light leading-relaxed max-w-md text-sm">
                Each bottle is hand-blown, hand-filled, and sealed with a 24-karat gold cap. More than a fragrance — an artefact of royalty.
              </p>
              <Link
                to="/shop?type=perfumes"
                className="inline-block px-10 py-4 border border-black text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300"
              >
                Explore Fragrances
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timepieces Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          <div className="text-center mb-16">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
              Timepieces
            </span>
            <h2
              className="text-black mb-4 uppercase"
              style={{
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
              }}
            >
              Guardians of Time
            </h2>
            <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">
              Each timepiece in the Murgdur collection is a mechanical poem — hand-assembled complications that honour the ancient relationship between kingship and precision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Tambour Moon",
                img: "/images/men/watches/watch 2.png",
                link: "/shop?search=Tambour Moon",
              },
              {
                name: "Escale Spin Time",
                img: "/images/men/watches/watch1.png",
                link: "/shop?search=Escale Spin Time",
              },
              {
                name: "Voyager Skeleton",
                img: "/images/men/watches/royal_watch.png",
                link: "/shop?search=Voyager Skeleton",
              },
            ].map((item, idx) => (
              <Link
                to={item.link || "/shop?type=watches"}
                key={idx}
                className="group cursor-pointer block"
              >
                <div
                  className="relative overflow-hidden bg-[#F6F6F6] mb-6 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#F2F2F2]"
                  style={{
                    aspectRatio: "218.094 / 360.609",
                    width: "100%",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h4
                  className="text-center text-black group-hover:underline underline-offset-4"
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 400,
                    letterSpacing: "0.025rem",
                  }}
                >
                  {item.name}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          <div className="text-center mb-16">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
              Services
            </span>
            <h2
              className="text-black mb-4 uppercase"
              style={{
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
              }}
            >
              Privileges of Court
            </h2>
            <p className="text-gray-500 font-light text-sm max-w-lg mx-auto">
              Because true luxury extends far beyond the garment itself. Every Murgdur service is designed to deepen your connection to the craft.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Personalization",
                desc: "Make it uniquely yours. From hand-engraved monograms to bespoke painted motifs, our artisans breathe life into your vision with meticulous hot stamping, calligraphy, and hand-painting.",
                img: "/images/site/per.jpg",
                link: "/personalisation",
              },
              {
                title: "The Art of Gifting",
                desc: "Every moment deserves a memory. Our curated gift sets arrive in signature keepsake boxes with hand-tied silk ribbons and a personal message inscribed by our in-house calligraphers.",
                img: "/images/site/gift.jpg",
                link: "/gifting",
              },
              {
                title: "Repairs & Care",
                desc: "Crafted to endure generations. Our restoration atelier uses only original materials and techniques to revive, repair, and preserve your Murgdur creations — keeping your legacy intact.",
                img: "/images/site/cares.jpg",
                link: "/repairs",
              },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group cursor-pointer block">
                <div className="aspect-[16/9] overflow-hidden mb-6 bg-gray-50">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <h4
                  className="text-black mb-3"
                  style={{ fontSize: "1.25rem", fontWeight: 400 }}
                >
                  {item.title}
                </h4>
                <p className="text-gray-500 font-light leading-relaxed mb-4 text-sm">
                  {item.desc}
                </p>
                <span className="text-[11px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors">
                  Discover
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Statement Section */}
      <section className="py-32 bg-white">
        <div
          className="mx-auto px-6 md:px-12 text-center"
          style={{ maxWidth: "1440px" }}
        >
          <span
            className="text-gray-400 uppercase tracking-[0.3em] font-bold mb-6 block"
            style={{ fontSize: "10px", letterSpacing: "0.3em" }}
          >
            Welcome to Murgdur
          </span>
          <h2
            className="text-black mb-12 uppercase tracking-tight font-normal max-w-4xl mx-auto"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            "The Crown Fits Only The Worthy"
          </h2>
          <div className="w-24 h-[1px] bg-black/10 mx-auto my-10"></div>
          <p
            className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
            style={{ fontSize: "1rem", lineHeight: "1.8" }}
          >
            Forged in the fires of tradition, sculpted for the modern monarch. A
            collection that whispers power and echoes eternity.
          </p>
        </div>
      </section>

      {/* Spring-Summer 2026 Women's Collection */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          <div className="text-center mb-16">
            <span className="text-gray-400 uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
              WOMEN
            </span>
            <h2 className="text-3xl md:text-4xl font-sans text-black tracking-tight font-light">
              Spring-Summer 2026
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                name: "Royal Structured Handbag",
                price: "₹4,25,000.00",
                img: "/images/women/handbags/hand bag.png",
                link: "/shop?type=bags",
              },
              {
                name: "Zari Embroidered Gown",
                price: "₹1,85,000.00",
                img: "/images/women/dresses/royal_gown.png",
                link: "/shop?type=clothing",
              },
              {
                name: "Patent Leather Heels",
                price: "₹95,000.00",
                img: "/images/women/shoes/royal_heels.png",
                link: "/shop?type=shoes",
              },
              {
                name: "Imagination Eau de Parfum",
                price: "₹32,000.00",
                img: "/images/women/perfume/womens-perfume1.png",
                link: "/shop?type=perfumes",
              },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group block relative">
                <div
                  className="relative overflow-hidden bg-[#F6F6F6] mb-4 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#F2F2F2]"
                  style={{
                    aspectRatio: "218.094 / 360.609",
                    width: "100%",
                  }}
                >
                  <button className="absolute top-4 right-4 z-10 text-black/20 hover:text-black transition-colors">
                    <Heart size={18} strokeWidth={1} />
                  </button>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="text-center px-1">
                  <h4 className="text-[13px] text-black font-normal mb-1 group-hover:underline underline-offset-4">
                    {item.name}
                  </h4>
                  <p className="text-[13px] text-gray-500 font-normal">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-12 pb-12">
            <Link
              to="/shop?category=women"
              className="px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-all duration-300"
            >
              See the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 5. The 'Bespoke' Atelier (Interactive) */}
      <section className="py-24 relative overflow-hidden bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-video bg-gray-50 border border-gray-200 relative overflow-hidden group rounded-lg shadow-xl">
                <img
                  src={spotlightImg}
                  alt="Bespoke Tailoring"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-gray-300"></span> The King's
                Tailor
              </h3>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight">
                Bespoke <br /> Sovereignty
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light border-l-2 border-gray-100 pl-6">
                True luxury lies in the perfect fit. Our master tailors combine
                generations of craftsmanship with your unique measurements to
                create garments that are exclusively yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pl-6">
                <Link to="/royal-collection">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white px-8"
                  >
                    Book Consultation
                  </Button>
                </Link>
                <Link
                  to="/heritage"
                  className="flex items-center text-gray-400 hover:text-black transition-colors uppercase tracking-widest text-xs font-bold gap-2"
                >
                  Read Our Story <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. New Legacy/Heritage Section */}
      <LegacySection />

      {/* 8. Client Diaries (Testimonials) */}
      <Testimonials />
    </div>
  );
};

export default Home;
