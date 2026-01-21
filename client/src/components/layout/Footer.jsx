import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Briefcase, Star, Gift, HelpCircle } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-royal-black text-gray-400 font-sans text-[12px] leading-relaxed border-t border-white/5">

            {/* Top Footer Section */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8">

                    {/* Left: Links Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

                        {/* Column 1: ABOUT */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">About</h3>
                            <ul className="space-y-2">
                                <li><Link to="/contact" className="hover:text-white block transition-colors">Contact Us</Link></li>
                                <li><Link to="/about" className="hover:text-white block transition-colors">About Us</Link></li>
                                <li><Link to="/careers" className="hover:text-white block transition-colors">Careers</Link></li>
                                <li><Link to="/stories" className="hover:text-white block transition-colors">Murgdur Stories</Link></li>
                                <li><Link to="/press" className="hover:text-white block transition-colors">Press</Link></li>
                                <li><Link to="/corporate" className="hover:text-white block transition-colors">Corporate Information</Link></li>
                            </ul>
                        </div>

                        {/* Column 3: HELP */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Help</h3>
                            <ul className="space-y-2">
                                <li><Link to="/payments" className="hover:text-white block transition-colors">Payments</Link></li>
                                <li><Link to="/shipping" className="hover:text-white block transition-colors">Shipping</Link></li>
                                <li><Link to="/cancellation" className="hover:text-white block transition-colors">Cancellation & Returns</Link></li>
                                <li><Link to="/faq" className="hover:text-white block transition-colors">FAQ</Link></li>
                                <li><Link to="/report" className="hover:text-white block transition-colors">Report Infringement</Link></li>
                            </ul>
                        </div>

                        {/* Column 4: CONSUMER POLICY */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Consumer Policy</h3>
                            <ul className="space-y-2">
                                <li><Link to="/cancellation" className="hover:text-white block transition-colors">Cancellation & Returns</Link></li>
                                <li><Link to="/terms" className="hover:text-white block transition-colors">Terms Of Use</Link></li>
                                <li><Link to="/security" className="hover:text-white block transition-colors">Security</Link></li>
                                <li><Link to="/privacy" className="hover:text-white block transition-colors">Privacy</Link></li>
                                <li><Link to="/sitemap" className="hover:text-white block transition-colors">Sitemap</Link></li>
                                <li><Link to="/grievance" className="hover:text-white block transition-colors">Grievance Redressal</Link></li>
                                <li><Link to="/epr" className="hover:text-white block transition-colors">EPR Compliance</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-[1px] bg-white/10"></div>

                    {/* Right: Address Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Mail Us */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Mail Us:</h3>
                            <div className="text-gray-400 space-y-1">
                                <p>Murgdur Private Limited,</p>
                                <p>Buildings Alyssa, Begonia &</p>
                                <p>Clove Embassy Tech Village,</p>
                                <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                                <p>Bengaluru, 560103,</p>
                                <p>Karnataka, India</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-royal-gold uppercase mb-2 text-[10px] tracking-widest font-bold">Social:</h3>
                                <div className="flex gap-4">
                                    <a href="#!" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
                                    <a href="#!" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                                    <a href="#!" className="hover:text-red-500 transition-colors"><Youtube size={20} /></a>
                                    <a href="#!" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Registered Office Address */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Registered Office Address:</h3>
                            <div className="text-gray-400 space-y-1">
                                <p>Murgdur Private Limited,</p>
                                <p>Buildings Alyssa, Begonia &</p>
                                <p>Clove Embassy Tech Village,</p>
                                <p>Outer Ring Road, Devarabeesanahalli Village,</p>
                                <p>Bengaluru, 560103,</p>
                                <p>Karnataka, India</p>
                                <p>CIN : U51109KA2012PTC066107</p>
                                <p>Telephone: <span className="text-royal-gold">044-45614700</span> / <span className="text-royal-gold">044-67415800</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="border-t border-white/10 py-6 bg-black/20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[13px]">

                        {/* Links with Icons */}
                        <div className="flex flex-wrap gap-6 items-center">
                            <Link to="/track-order" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Briefcase size={14} className="text-royal-gold" />
                                <span>Track Order</span>
                            </Link>
                            <Link to="/advertise" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Star size={14} className="text-royal-gold" />
                                <span>Advertise</span>
                            </Link>
                            <Link to="/giftcards" className="flex items-center gap-2 hover:text-white transition-colors">
                                <Gift size={14} className="text-royal-gold" />
                                <span>Gift Cards</span>
                            </Link>
                            <Link to="/help" className="flex items-center gap-2 hover:text-white transition-colors">
                                <HelpCircle size={14} className="text-royal-gold" />
                                <span>Help Center</span>
                            </Link>
                        </div>

                        {/* Copyright */}
                        <div className="text-gray-500">
                            &copy; 2007-{new Date().getFullYear()} Murgdur.com
                        </div>

                        {/* Payment Support (Using SVG placeholders or text for now) */}
                        <div className="flex gap-2">
                            {/* Placeholder visual blocks for payment icons to match style */}
                            <div className="w-10 h-6 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] text-gray-300 font-bold">VISA</div>
                            <div className="w-10 h-6 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] text-gray-300 font-bold">MC</div>
                            <div className="w-10 h-6 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] text-gray-300 font-bold">RUPAY</div>
                            <div className="w-10 h-6 bg-white/10 border border-white/20 rounded flex items-center justify-center text-[8px] text-gray-300 font-bold">COD</div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
