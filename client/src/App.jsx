import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./utils/ScrollToTop";
import { HelmetProvider } from "react-helmet-async";

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductCollection = lazy(() => import("./pages/ProductCollection"));
const CollectionsShowcase = lazy(() => import("./pages/CollectionsShowcase"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Heritage = lazy(() => import("./pages/Heritage"));
const RoyalShop = lazy(() => import("./pages/RoyalShop"));
const Vault = lazy(() => import("./pages/Vault")); // Wishlist
const Profile = lazy(() => import("./pages/Profile")); // Auth & Profile
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const ContactInfo = lazy(() => import("./pages/ContactInfo"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Careers = lazy(() => import("./pages/Careers"));
const Stories = lazy(() => import("./pages/Stories"));
const Press = lazy(() => import("./pages/Press"));
const CorporateInfo = lazy(() => import("./pages/CorporateInfo"));
const Vision = lazy(() => import("./pages/Vision"));
const StudioPage = lazy(() => import("./pages/StudioPage"));
const SanityTest = lazy(() => import("./pages/SanityTest"));
const GenericPage = lazy(() => import("./pages/GenericPage"));
const InfoPage = lazy(() => import("./pages/InfoPage"));
const ConditionsOfUse = lazy(() => import("./pages/ConditionsOfUse"));
const PrivacyNotice = lazy(() => import("./pages/PrivacyNotice"));
const AddressInput = lazy(() => import("./pages/AddressInput"));

// Simple Loading Component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-black text-[#D4AF37]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-current"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="collections-showcase" element={<CollectionsShowcase />} />
              <Route path="collections" element={<ProductCollection />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="heritage" element={<Heritage />} />
              <Route path="royal-collection" element={<RoyalShop />} />
              <Route path="vault" element={<Vault />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Profile />} />
              <Route path="signup" element={<Profile />} />
              <Route path="register" element={<Profile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="complete-profile" element={<AddressInput />} />

              <Route path="page/:slug" element={<GenericPage />} />
              {/* Footer & Info Routes */}
              <Route path="about" element={<AboutUs />} />
              <Route path="admin" element={<InfoPage />} />
              <Route path="founder" element={<InfoPage />} />
              <Route path="vision" element={<Vision />} />
              <Route path="innovation" element={<InfoPage />} />
              <Route path="awards" element={<InfoPage />} />
              <Route path="sustainability" element={<InfoPage />} />
              <Route path="locations" element={<InfoPage />} />
              <Route path="news" element={<InfoPage />} />
              <Route path="press" element={<Press />} />
              <Route path="blogs" element={<InfoPage />} />
              <Route path="events" element={<InfoPage />} />
              <Route path="careers" element={<Careers />} />
              <Route path="partner" element={<InfoPage />} />
              <Route path="contact" element={<ContactInfo />} />
              <Route path="internship" element={<InfoPage />} />
              <Route path="internship" element={<InfoPage />} />
              <Route path="privacy-notice" element={<PrivacyNotice />} />
              <Route path="conditions-of-use" element={<ConditionsOfUse />} />
              <Route path="terms" element={<ConditionsOfUse />} /> {/* Alias for terms */}
              <Route path="privacy" element={<PrivacyNotice />} /> {/* Alias for privacy */}
              <Route path="stories" element={<Stories />} />
              <Route path="corporate" element={<CorporateInfo />} />
              <Route path="payments" element={<InfoPage />} />
              <Route path="shipping" element={<InfoPage />} />
              <Route path="cancellation" element={<InfoPage />} />
              <Route path="faq" element={<InfoPage />} />
              <Route path="report" element={<InfoPage />} />
              <Route path="security" element={<InfoPage />} />
              <Route path="sitemap" element={<InfoPage />} />
              <Route path="grievance" element={<InfoPage />} />
              <Route path="epr" element={<InfoPage />} />
              <Route path="track-order" element={<InfoPage />} />
              <Route path="advertise" element={<InfoPage />} />
              <Route path="giftcards" element={<InfoPage />} />
              <Route path="services" element={<InfoPage />} />
              <Route path="stores" element={<InfoPage />} />
              <Route path="foundation" element={<InfoPage />} />
              <Route path="repairs" element={<InfoPage />} />
              <Route path="personalisation" element={<InfoPage />} />
              <Route path="gifting" element={<InfoPage />} />
              <Route path="apps" element={<InfoPage />} />
              <Route path="legal-privacy" element={<InfoPage />} />
              <Route path="cookies" element={<InfoPage />} />
              <Route path="help" element={<InfoPage />} />
              <Route path="diagnostics" element={<SanityTest />} />
            </Route>
            {/* Studio Route-Outside Layout */}
            <Route path="/sanity-studio/*" element={<StudioPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
