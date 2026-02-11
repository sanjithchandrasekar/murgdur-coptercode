import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Auth from './Auth';
import { client } from '../utils/sanity';
import Button from '../components/common/Button';
import { User, Package, MapPin, LogOut, Heart, Shield, Crown, ChevronRight } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sanityData, setSanityData] = useState(null);
    const [activeTab, setActiveTab] = useState('overview'); // overview, orders, addresses, wishlist

    useEffect(() => {
        const storedUser = localStorage.getItem('userProfile');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Only attempt to fetch additional data if we have an email/mobile
            if (parsedUser.email || parsedUser.mobile) {
                fetchSanityData(parsedUser.email, parsedUser.mobile);
            } else {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    const fetchSanityData = async (email, mobile) => {
        try {
            const query = `*[_type == "customer" && (email == $email || mobile == $mobile)][0]`;
            const data = await client.fetch(query, { email, mobile });
            setSanityData(data);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('selectedAddress');
        window.location.reload(); // Reload to clear state globally or navigate
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-royal-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal-gold"></div>
            </div>
        );
    }

    if (!user) {
        return <Auth />;
    }

    const userData = sanityData || user;
    const fullName = userData.firstName ? `${userData.firstName} ${userData.lastName}` : userData.name;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-6">
                    {/* User Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-royal-black border border-white/10 p-6 rounded-sm text-center shadow-[0_0_30px_rgba(212,175,55,0.05)]"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-royal-gold to-yellow-600 rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg border-2 border-black">
                            <span className="text-3xl font-serif font-bold text-black">{fullName?.charAt(0)}</span>
                        </div>
                        <h2 className="text-xl font-serif text-white mb-1">{fullName}</h2>
                        <p className="text-gray-400 text-xs tracking-wider uppercase">{userData.email}</p>

                        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-2">
                            <div className="text-center">
                                <span className="block text-royal-gold font-bold text-lg">0</span>
                                <span className="text-[10px] uppercase text-gray-500">Orders</span>
                            </div>
                            <div className="text-center border-l border-white/5 border-r">
                                <span className="block text-royal-gold font-bold text-lg">0</span>
                                <span className="text-[10px] uppercase text-gray-500">Vault</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-royal-gold font-bold text-lg">Classic</span>
                                <span className="text-[10px] uppercase text-gray-500">Tier</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="bg-royal-black border border-white/10 rounded-sm overflow-hidden">
                        {[
                            { id: 'overview', label: 'Overview', icon: User },
                            { id: 'orders', label: 'My Orders', icon: Package },
                            { id: 'addresses', label: 'Addresses', icon: MapPin },
                            { id: 'wishlist', label: 'My Vault', icon: Heart },
                            // { id: 'settings', label: 'Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center justify-between px-6 py-4 text-sm font-medium transition-all ${activeTab === item.id ? 'bg-royal-gold text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white border-b border-white/5 last:border-0'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </div>
                                {activeTab === item.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors border-t border-white/10"
                        >
                            <LogOut size={18} />
                            <span>Log Out</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                        className="bg-royal-black border border-white/10 p-8 rounded-sm min-h-[500px]"
                    >
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                    <div>
                                        <h3 className="text-2xl font-serif text-white mb-2">Welcome Back, {userData.firstName || fullName}</h3>
                                        <p className="text-gray-400 text-sm font-light">Here is an overview of your royal account activities.</p>
                                    </div>
                                    <Crown size={32} className="text-royal-gold opacity-50" />
                                </div>

                                {/* Quick Stats / Recent */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded border border-white/5 group hover:border-royal-gold/30 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-royal-gold/10 rounded-full text-royal-gold">
                                                <Package size={24} />
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-gray-500">All Time</span>
                                        </div>
                                        <h4 className="text-3xl text-white font-serif mb-1">0</h4>
                                        <p className="text-gray-400 text-sm">Total Orders Placed</p>
                                    </div>

                                    <div className="bg-white/5 p-6 rounded border border-white/5 group hover:border-royal-gold/30 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-royal-gold/10 rounded-full text-royal-gold">
                                                <Shield size={24} />
                                            </div>
                                            <span className="text-xs uppercase tracking-widest text-green-500">Active</span>
                                        </div>
                                        <h4 className="text-lg text-white font-serif mb-1">Standard Member</h4>
                                        <p className="text-gray-400 text-sm">Membership Status</p>
                                    </div>
                                </div>

                                {/* Address Preview */}
                                <div>
                                    <h4 className="text-lg font-serif text-white mb-4 border-l-4 border-royal-gold pl-4">Primary Address</h4>
                                    <div className="bg-white/5 p-6 rounded border border-white/5">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="text-gray-500 mt-1" size={20} />
                                            <div>
                                                <p className="text-white font-medium mb-1">{fullName}</p>
                                                {userData.addressLine1 ? (
                                                    <p className="text-gray-400 text-sm leading-relaxed">
                                                        {userData.addressLine1} <br />
                                                        {userData.addressLine2 && <>{userData.addressLine2}<br /></>}
                                                        {userData.city}, {userData.state} - {userData.pincode}
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-500 text-sm italic">No address saved. Please update your profile.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="text-center py-20">
                                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package size={32} className="text-gray-600" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-2">No Orders Yet</h3>
                                <p className="text-gray-400 text-sm mb-8">You haven't placed any orders yet. Explore our collection.</p>
                                <Button variant="primary" onClick={() => navigate('/shop')}>BROWSE COLLECTION</Button>
                            </div>
                        )}

                        {activeTab === 'addresses' && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-serif text-white">Your Addresses</h3>
                                    {/* <button className="text-royal-gold text-sm font-bold uppercase tracking-widest hover:underline">+ Add New</button> */}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-royal-gold/50 bg-royal-gold/5 p-6 rounded relative">
                                        <span className="absolute top-4 right-4 text-[10px] bg-royal-gold text-black px-2 py-1 font-bold uppercase rounded-sm">Default</span>
                                        <p className="text-white font-serif text-lg mb-2">{fullName}</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {userData.addressLine1} <br />
                                            {userData.city}, {userData.state} - {userData.pincode}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-2">Mobile: <span className="text-white">{userData.mobile}</span></p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="text-center py-20">
                                <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart size={32} className="text-gray-600" />
                                </div>
                                <h3 className="text-xl font-serif text-white mb-2">Your Vault is Empty</h3>
                                <p className="text-gray-400 text-sm mb-8">Save items you love here for quick access later.</p>
                                <Button variant="primary" onClick={() => navigate('/vault')}>OPEN VAULT</Button>
                            </div>
                        )}


                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
