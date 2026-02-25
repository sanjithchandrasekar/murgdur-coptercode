import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

import NotificationPopup from "../common/NotificationPopup";

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    ["/login", "/signup", "/register", "/profile"].includes(
      location.pathname,
    ) && !localStorage.getItem("userProfile");

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased overflow-x-hidden">
      {!isAuthPage && <Navbar />}
      <NotificationPopup />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
