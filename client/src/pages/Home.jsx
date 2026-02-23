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

const spotlightImg = "/images/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const royalBg = "/images/royal_dress_bg.png";

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
      <div className="bg-royal-black overflow-x-hidden">
        <SEO
          title="Murgdur | Royal Heritage & Luxury"
          description="Discover the epitome of luxury tailored for the elite. Timeless fashion, royal aesthetics, and signature collections crafted for modern royalty."
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
        title="Murgdur | Royal Heritage & Luxury"
        description="Experience the legacy of kings. Shop our exclusive collection of royal attire, bespoke accessories, and timeless artifacts."
      />

      {/* Full-Screen Cinematic Hero */}
      <div className="relative w-full h-screen overflow-hidden bg-[#2C2C2C]">
        {/* Hero Background Image */}
        <img
          src={homeData?.promoSection?.backgroundImage || royalBg}
          alt="Murgdur Royal Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Content Overlay — Positioned in Lower Third */}
        <div className="relative z-10 h-full flex flex-col items-center text-center px-6">
          {/* Main Content-Lower Middle */}
          <div className="flex-1 flex flex-col items-center justify-end pb-20">
            {/* Category Label */}
            <span className="text-white/90 text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-light">
              {homeData?.promoSection?.eyebrow || "HERITAGE"}
            </span>

            {/* Main Collection Title */}
            <h2
              className="text-white text-center max-w-5xl"
              style={{
                fontSize: "2rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
                lineHeight: "2.5rem",
                margin: "0 0 1rem",
                overflowWrap: "break-word",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              {homeData?.promoSection?.heading || "Royal Heritage Collection"}
            </h2>
          </div>

          {/* CTA Links — Bottom */}
          <div className="absolute bottom-12 left-0 right-0 flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Link
              to="/shop"
              className="text-white text-[11px] md:text-xs tracking-[0.025rem] uppercase font-light hover:text-[#D4AF37] cursor-pointer"
              style={{
                boxShadow: "0 2px 0 -1px currentColor",
                textDecoration: "none",
                transition: "color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1)",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              Explore the Royal Vault
            </Link>
            <Link
              to="/royal-collection"
              className="text-white text-[11px] md:text-xs tracking-[0.025rem] uppercase font-light hover:text-[#D4AF37] cursor-pointer"
              style={{
                boxShadow: "0 2px 0 -1px currentColor",
                textDecoration: "none",
                transition: "color 0.3s cubic-bezier(0.39, 0.575, 0.565, 1)",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
              Discover Heritage & Luxury
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
              <h2
                className="text-black"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  letterSpacing: "0.025rem",
                  lineHeight: "1.5rem",
                }}
              >
                Explore a Selection of the Women's Royal Creations
              </h2>
            </div>

            {/* Women's Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "Handbags",
                  img: "/images/women handbag/woman bag white 1.jpeg",
                  link: "/shop?type=bags",
                },
                {
                  name: "Small Leather Goods",
                  img: "/images/woens small bag.jpg",
                  link: "/shop?type=wallets",
                },
                {
                  name: "Shoes",
                  img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
                  link: "/shop?type=shoes",
                },
                {
                  name: "Perfumes",
                  img: "/images/women perfume/womens-perfume4.png",
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
              <h2
                className="text-black"
                style={{
                  fontSize: "1rem",
                  fontWeight: 400,
                  letterSpacing: "0.025rem",
                  lineHeight: "1.5rem",
                }}
              >
                Explore a Selection of the Men's Royal Creations
              </h2>
            </div>

            {/* Men's Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  name: "Men's Bags",
                  img: "/images/mensbags/mens-bag3.png",
                  link: "/shop?type=bags",
                },
                {
                  name: "Wallets & Accessories",
                  img: "/images/mens_royal_wallet_section.png",
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

      {/* Video Campaign Section */}
      <section className="relative w-full h-[80vh] overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop"
        >
          <source
            src={homeData?.videoCampaign?.videoUrl || "/videos/perfume1.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50"></div>
      </section>

      {/* Valentine's Day Gifts */}
      <section className="py-20 bg-white">
        <div className="mx-auto px-6 md:px-12" style={{ maxWidth: "1440px" }}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2
              className="text-black"
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
                lineHeight: "1.5rem",
              }}
            >
              Royal Gift Selections
            </h2>
          </div>

          {/* Product Grid-4 Column */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                name: "Key Pouch",
                price: "₹18,500.00",
                img: "/images/woens small bag.jpg",
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
                img: "/images/mens_royal_wallet_section.png",
                link: "/shop?search=Multiple Wallet",
              },
              {
                name: "Imagination",
                price: "₹25,900.00",
                img: "/images/women perfume/womens-perfume4.png",
                link: "/shop?search=Imagination",
              },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="group block mb-8">
                {/* Product Image Container-Precise 218x360 Aspect Ratio feel */}
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
              className="px-8 py-3 bg-[#19110b] text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-[#19110b] border border-[#19110b] transition-all duration-300"
            >
              For Her
            </Link>
            <Link
              to="/shop?cat=men"
              className="px-8 py-3 bg-[#19110b] text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-[#19110b] border border-[#19110b] transition-all duration-300"
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
          <div className="absolute inset-0 bg-black/10"></div>
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
                img: "/images/mensbags/mens-bag1.png",
                link: "/shop?type=bags",
              },
              {
                name: "Brocade Embroidered Kurta",
                price: "₹98,000.00",
                img: "/images/royal_tshirt.png",
                link: "/shop?type=shirts",
              },
              {
                name: "Royal Leather Sneaker",
                price: "₹1,51,000.00",
                img: "/images/men shoe/menshoe1.png",
                link: "/shop?type=shoes",
              },
              {
                name: "Signature Bag Charm",
                price: "₹1,18,000.00",
                img: "/images/micro.jpg",
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
                src="/images/royal_perfume.png"
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
              <p className="text-gray-600 mb-10 font-light leading-relaxed max-w-md text-lg">
                A sensory journey through the finest ingredients. Our fragrances
                are crafted to evoke memories, status, and the essence of
                royalty.
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
            <h2
              className="text-black uppercase"
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
              }}
            >
              Guardians of Time
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Tambour Moon",
                img: "/images/watch 2.png",
                link: "/shop?search=Tambour Moon",
              },
              {
                name: "Escale Spin Time",
                img: "/images/watch1.png",
                link: "/shop?search=Escale Spin Time",
              },
              {
                name: "Voyager Skeleton",
                img: "/images/royal_watch.png",
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
            <h2
              className="text-black uppercase"
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: "0.025rem",
              }}
            >
              Privileges of Court
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Personalization",
                desc: "Make it your own with hot stamping and painting.",
                img: "/images/per.jpg",
                link: "/personalisation",
              },
              {
                title: "The Art of Gifting",
                desc: "The perfect gift, beautifully wrapped.",
                img: "/images/gift.jpg",
                link: "/gifting",
              },
              {
                title: "Repairs & Care",
                desc: "Preserve the beauty of your Murgdur creation.",
                img: "/images/cares.jpg",
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
                img: "/images/hand bag.png",
                link: "/shop?type=bags",
              },
              {
                name: "Zari Embroidered Gown",
                price: "₹1,85,000.00",
                img: "/images/royal_gown.png",
                link: "/shop?type=clothing",
              },
              {
                name: "Patent Leather Heels",
                price: "₹95,000.00",
                img: "/images/royal_heels.png",
                link: "/shop?type=shoes",
              },
              {
                name: "Imagination Eau de Parfum",
                price: "₹32,000.00",
                img: "/images/women perfume/womens-perfume4.png",
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
