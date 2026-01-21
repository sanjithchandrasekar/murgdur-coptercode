// Image Imports (Mapping broadly to categories)
const imgSherwani = "/images/Gemini_Generated_Image_hge4lhge4lhge4lh.png";
const imgLehenga = "/images/Gemini_Generated_Image_aimaqdaimaqdaima.png";
const imgBag = "/images/hand bag.png";
const imgBandhgala = "/images/Gemini_Generated_Image_iqsqcdiqsqcdiqsq.png";
const imgSaree = "/images/Gemini_Generated_Image_120fuv120fuv120f.png";
const imgWallet = "/images/Gemini_Generated_Image_rxv1alrxv1alrxv1 (1).png";
const imgAchkan = "/images/boy.jpeg";
const imgGown = "/images/girl.png";
const imgClutch = "/images/Gemini_Generated_Image_r281slr281slr281.png";
const imgJacket = "/images/Gemini_Generated_Image_j3qrpwj3qrpwj3qr.png";
const imgSaree2 = "/images/Gemini_Generated_Image_yunch4yunch4yunc.png";
const imgAnarkali = "/images/Gemini_Generated_Image_2heebf2heebf2hee.png";
const imgTuxedo = "/images/Gemini_Generated_Image_5pgtfq5pgtfq5pgt.png";
const imgBandi = "/images/Gemini_Generated_Image_687ijq687ijq687i.png";
const imgRoseLehenga = "/images/Gemini_Generated_Image_6x7jv96x7jv96x7j.png";
const imgGenericMen = "/images/Gemini_Generated_Image_96hr3v96hr3v96hr.png";
const imgGenericAcc = "/images/Gemini_Generated_Image_sx86uosx86uosx86.png";


// Exact Product List
export const products = [
    {
        id: 1,
        name: "Royal Navy Sherwani",
        price: 24999,
        originalPrice: 29999,
        image: imgSherwani,
        category: "Men",
        description: "A majestic Royal Navy Sherwani featuring intricate gold embroidery.",
        images: [imgSherwani, imgGenericMen],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#1a237e", "#000000", "#fffdd0", "#800000", "#4a4a4a"],
        rating: 4.9,
        reviews: 120
    },
    {
        id: 2,
        name: "Crimson Bridal Lehenga",
        price: 45100,
        originalPrice: 55000,
        image: imgLehenga,
        category: "Women",
        description: "A stunning Crimson Bridal Lehenga with heavy zardozi work.",
        images: [imgLehenga, imgRoseLehenga],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#dc143c", "#ffd700", "#004d40", "#4a148c", "#b71c1c"],
        rating: 5.0,
        reviews: 85
    },
    {
        id: 3,
        name: "Signature 'M' Leather Bag",
        price: 8700,
        originalPrice: 10500,
        image: imgBag,
        category: "Accessories",
        description: "Premium leather bag with signature Murgdur branding.",
        images: [imgBag, imgClutch],
        sizes: [],
        colors: ["#3e2723", "#000000", "#8b4513", "#d2691e", "#5d4037"],
        rating: 4.7,
        reviews: 42
    },
    {
        id: 4,
        name: "Midnight Velvet Bandhgala",
        price: 18000,
        originalPrice: 22000,
        image: imgBandhgala,
        category: "Men",
        description: "Luxurious velvet bandhgala suit in deep midnight blue.",
        images: [imgBandhgala, imgSherwani],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#1a237e", "#000000", "#303f9f", "#2c3e50", "#455a64"],
        rating: 4.8,
        reviews: 65
    },
    {
        id: 5,
        name: "Gold Zari Silk Saree",
        price: 12199,
        originalPrice: 15000,
        image: imgSaree,
        category: "Women",
        description: "Traditional silk saree woven with real gold zari threads.",
        images: [imgSaree, imgSaree2],
        sizes: ["Free Size"],
        colors: ["#ffd700", "#d4af37", "#b8860b", "#ffecb3", "#fbc02d"],
        rating: 4.6,
        reviews: 90
    },
    {
        id: 6,
        name: "Obsidian Chain Wallet",
        price: 5000,
        originalPrice: 6500,
        image: imgGenericAcc, // Placeholder for wallet
        category: "Accessories",
        description: "Sleek obsidian black wallet with a detachable chain.",
        images: [imgGenericAcc, imgBag],
        sizes: [],
        colors: ["#000000", "#1c1c1c", "#333333", "#424242", "#212121"],
        rating: 4.5,
        reviews: 30
    },
    {
        id: 7,
        name: "Ivory Wedding Achkan",
        price: 32500,
        originalPrice: 40000,
        image: imgAchkan,
        category: "Men",
        description: "Elegant Ivory Achkan perfect for day weddings.",
        images: [imgAchkan, imgBandhgala],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#fffff0", "#f5f5dc", "#fff8e1", "#ffecb3", "#dce775"],
        rating: 4.9,
        reviews: 110
    },
    {
        id: 8,
        name: "Ruby Velvet Gown",
        price: 28700,
        originalPrice: 35000,
        image: imgGown,
        category: "Women",
        description: "Floor-length ruby velvet gown for evening receptions.",
        images: [imgGown, imgLehenga],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#9b111e", "#800020", "#b71c1c", "#880e4f", "#c2185b"],
        rating: 4.8,
        reviews: 75
    },
    {
        id: 9,
        name: "Classic Gold Clutch",
        price: 7500,
        originalPrice: 9000,
        image: imgClutch,
        category: "Accessories",
        description: "Handcrafted gold clutch to complement ethnic wear.",
        images: [imgClutch, imgBag],
        sizes: [],
        colors: ["#ffd700", "#ffb300", "#fbc02d", "#fff176", "#fdd835"],
        rating: 4.7,
        reviews: 50
    },
    {
        id: 10,
        name: "Heritage Brocade Jacket",
        price: 15900,
        originalPrice: 19000,
        image: imgJacket,
        category: "Men",
        description: "Statement brocade jacket inspired by royal heritage.",
        images: [imgJacket, imgBandhgala],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#4a4a4a", "#b8860b", "#5d4037", "#3e2723", "#6d4c41"],
        rating: 4.6,
        reviews: 40
    },
    {
        id: 11,
        name: "Sapphire Silk Saree II",
        price: 22000,
        originalPrice: 28000,
        image: imgSaree2,
        category: "Women",
        description: "Rich sapphire blue silk saree with intricate borders.",
        images: [imgSaree2, imgSaree],
        sizes: ["Free Size"],
        colors: ["#0f52ba", "#000080", "#1a237e", "#283593", "#303f9f"],
        rating: 4.9,
        reviews: 95
    },
    {
        id: 12,
        name: "Emerald Green Anarkali 12",
        price: 19500,
        originalPrice: 24000,
        image: imgAnarkali,
        category: "Women",
        description: "Flowy emerald green Anarkali suit with net dupatta.",
        images: [imgAnarkali, imgGown],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#50c878", "#013220", "#1b5e20", "#2e7d32", "#388e3c"],
        rating: 4.7,
        reviews: 60
    },
    {
        id: 13,
        name: "Classic Black Tuxedo 13",
        price: 36200,
        originalPrice: 45000,
        image: imgTuxedo,
        category: "Men",
        description: "Timeless black tuxedo tailored for a sharp fit.",
        images: [imgTuxedo, imgBandhgala],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#000000", "#2c3e50", "#212121", "#37474f", "#263238"],
        rating: 5.0,
        reviews: 150
    },
    {
        id: 14,
        name: "Ivory Raw Silk Bandi 14",
        price: 13500,
        originalPrice: 16000,
        image: imgBandi,
        category: "Men",
        description: "Contemporary raw silk bandi jacket in ivory.",
        images: [imgBandi, imgAchkan],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#fffff0", "#c0c0c0", "#e0e0e0", "#bdbdbd", "#9e9e9e"],
        rating: 4.5,
        reviews: 35
    },
    {
        id: 15,
        name: "Rose Gold Zardozi Lehenga 15",
        price: 56400,
        originalPrice: 65000,
        image: imgRoseLehenga,
        category: "Women",
        description: "Exquisite rose gold lehenga with detailed zardozi work.",
        images: [imgRoseLehenga, imgLehenga],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#b76e79", "#ffb7c5", "#f48fb1", "#f06292", "#ec407a"],
        rating: 4.9,
        reviews: 100
    },
    {
        id: 16,
        name: "Royal Navy Sherwani 16",
        price: 26499,
        originalPrice: 32000,
        image: imgSherwani,
        category: "Men",
        description: "Another variant of our classic Royal Navy Sherwani.",
        images: [imgSherwani, imgGenericMen],
        sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
        colors: ["#1a237e", "#1565c0", "#0d47a1", "#0277bd", "#01579b"],
        rating: 4.8,
        reviews: 80
    },
    // Shoes
    {
        id: 17,
        name: "Women's Elegant Heels",
        price: 12999,
        originalPrice: 16000,
        image: "/images/womensslipper.jpeg",
        category: "Accessories",
        type: "shoes",
        description: "Sophisticated heels perfect for evening occasions.",
        images: ["/images/womensslipper.jpeg"],
        sizes: ["5", "6", "7", "8", "9", "10"],
        colors: ["#000000", "#c71585", "#8b4513"],
        rating: 4.7,
        reviews: 45
    },
    {
        id: 18,
        name: "Royal Sneaker Collection",
        price: 8999,
        originalPrice: 11000,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
        category: "Accessories",
        type: "shoes",
        description: "Comfortable and stylish sneakers for everyday wear.",
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"],
        sizes: ["5", "6", "7", "8", "9", "10"],
        colors: ["#ffffff", "#000000", "#ffd700"],
        rating: 4.6,
        reviews: 60
    },
    {
        id: 19,
        name: "Premium Dress Shoes",
        price: 15999,
        originalPrice: 19000,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
        category: "Accessories",
        type: "shoes",
        description: "Classic dress shoes for formal occasions.",
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"],
        sizes: ["5", "6", "7", "8", "9", "10"],
        colors: ["#8b4513", "#000000", "#d2691e"],
        rating: 4.8,
        reviews: 35
    },
    // Watches
    {
        id: 20,
        name: "Tambour Moon Luxury Watch",
        price: 149999,
        originalPrice: 185000,
        image: "/images/watch%202.png",
        category: "Accessories",
        type: "watches",
        description: "Exquisite luxury timepiece with precision craftsmanship.",
        images: ["/images/watch%202.png"],
        sizes: ["One Size"],
        colors: ["#c0c0c0", "#ffd700"],
        rating: 5.0,
        reviews: 28
    },
    {
        id: 21,
        name: "Escale Spin Time Classic",
        price: 125000,
        originalPrice: 155000,
        image: "/images/watch1.png",
        category: "Accessories",
        type: "watches",
        description: "Elegant timepiece blending tradition with modern design.",
        images: ["/images/watch1.png"],
        sizes: ["One Size"],
        colors: ["#c0c0c0", "#8b4513"],
        rating: 4.9,
        reviews: 32
    },
    {
        id: 22,
        name: "Voyager Skeleton Premium",
        price: 135000,
        originalPrice: 165000,
        image: "/images/royal_watch.png",
        category: "Accessories",
        type: "watches",
        description: "Premium skeleton watch showcasing fine craftsmanship.",
        images: ["/images/royal_watch.png"],
        sizes: ["One Size"],
        colors: ["#c0c0c0", "#ffd700"],
        rating: 4.95,
        reviews: 25
    },
    // Bags
    {
        id: 23,
        name: "Monogram Speedy Bag",
        price: 89999,
        originalPrice: 110000,
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
        category: "Accessories",
        type: "bags",
        description: "Classic monogram tote bag with timeless design.",
        images: ["https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop"],
        sizes: ["One Size"],
        colors: ["#8b4513", "#000000", "#ffd700"],
        rating: 4.8,
        reviews: 120
    },
    {
        id: 24,
        name: "Women's Handbag Premium",
        price: 75000,
        originalPrice: 92000,
        image: "/images/women bag/woman bag white 1.jpeg",
        category: "Accessories",
        type: "bags",
        description: "Elegant leather handbag for everyday use.",
        images: ["/images/women bag/woman bag white 1.jpeg"],
        sizes: ["One Size"],
        colors: ["#f5f5f5", "#000000", "#8b4513"],
        rating: 4.9,
        reviews: 95
    },
    // Perfume (single product)
    {
        id: 27,
        name: "Éclat Signature Perfume",
        price: 12500,
        originalPrice: 15000,
        image: "/images/women perfume/womens-perfume4.png",
        category: "Accessories",
        type: "perfumes",
        description: "A refined fragrance crafted to evoke royal elegance.",
        images: ["/images/women perfume/womens-perfume4.png"],
        sizes: ["100ml"],
        colors: ["#f3d1d6", "#ffffff"],
        rating: 4.9,
        reviews: 210
    },
    {
        id: 25,
        name: "Nano Multi-Color Bag",
        price: 65000,
        originalPrice: 80000,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        category: "Accessories",
        type: "bags",
        description: "Vibrant multi-color mini bag for sophisticated style.",
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"],
        sizes: ["One Size"],
        colors: ["#ff69b4", "#ffd700", "#00bfff"],
        rating: 4.7,
        reviews: 75
    },
    {
        id: 26,
        name: "Vanity Case Clutch",
        price: 55000,
        originalPrice: 68000,
        image: "/images/vanitycase.jpg",
        category: "Accessories",
        type: "bags",
        description: "Compact vanity case perfect for travel and events.",
        images: ["/images/vanitycase.jpg"],
        sizes: ["One Size"],
        colors: ["#daa520", "#c0c0c0", "#8b4513"],
        rating: 4.6,
        reviews: 60
    }
];