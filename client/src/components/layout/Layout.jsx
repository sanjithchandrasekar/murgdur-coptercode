import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

import NotificationPopup from '../common/NotificationPopup';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-royal-black text-royal-ivory font-sans antialiased overflow-x-hidden">
            <Navbar />
            <NotificationPopup />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
