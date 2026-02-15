import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile'; // Replaced Auth with Profile
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Heritage from './pages/Heritage';
import RoyalShop from './pages/RoyalShop';
import Vault from './pages/Vault';
import Checkout from './pages/Checkout';

import InfoPage from './pages/InfoPage';
import ContactInfo from './pages/ContactInfo';
import AboutUs from './pages/AboutUs';
import Careers from './pages/Careers';
import Stories from './pages/Stories';
import Press from './pages/Press';
import CorporateInfo from './pages/CorporateInfo';
import Vision from './pages/Vision';
import SanityTest from './pages/SanityTest';
import StudioPage from './pages/StudioPage';
import GenericPage from './pages/GenericPage';

import ScrollToTop from './utils/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
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

          <Route path="page/:slug" element={<GenericPage />} />
          {/* Footer & Info Routes */}
          <Route path="about" element={<AboutUs />} />
          <Route path="admin" element={<InfoPage />} />
          <Route path="founder" element={<InfoPage />} />
          <Route path="vision" element={<Vision />} />
          <Route path="sanity-test" element={<SanityTest />} />
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
          <Route path="privacy" element={<InfoPage />} />
          <Route path="terms" element={<InfoPage />} />
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
        </Route>
        {/* Studio Route - Outside Layout */}
        <Route path="/sanity-studio/*" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
