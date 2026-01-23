import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Youtube, Instagram, Briefcase, Star, Gift, HelpCircle } from 'lucide-react';
import { fetchFooter } from '../../utils/sanity';

const Footer = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const load = async () => {
            const result = await fetchFooter();
            if (result) setData(result);
        };
        load();
    }, []);

    const aboutLinks = data?.aboutLinks?.length ? data.aboutLinks : [
        { title: "Contact Us", url: "/contact" },
        { title: "About Us", url: "/about" },
        { title: "Careers", url: "/careers" },
        { title: "Murgdur Stories", url: "/stories" },
        { title: "Press", url: "/press" },
        { title: "Corporate Information", url: "/corporate" }
    ];

    const helpLinks = data?.helpLinks?.length ? data.helpLinks : [
        { title: "Payments", url: "/payments" },
        { title: "Shipping", url: "/shipping" },
        { title: "Cancellation & Returns", url: "/cancellation" },
        { title: "FAQ", url: "/faq" },
        { title: "Report Infringement", url: "/report" }
    ];

    const policyLinks = data?.policyLinks?.length ? data.policyLinks : [
        { title: "Cancellation & Returns", url: "/cancellation" },
        { title: "Terms Of Use", url: "/terms" },
        { title: "Security", url: "/security" },
        { title: "Privacy", url: "/privacy" },
        { title: "Sitemap", url: "/sitemap" },
        { title: "Grievance Redressal", url: "/grievance" },
        { title: "EPR Compliance", url: "/epr" }
    ];

    const defaultMailAddress = `Murgdur Private Limited,
Buildings Alyssa, Begonia &
Clove Embassy Tech Village,
Outer Ring Road, Devarabeesanahalli Village,
Bengaluru, 560103,
Karnataka, India`;

    const defaultOfficeAddress = `Murgdur Private Limited,
Buildings Alyssa, Begonia &
Clove Embassy Tech Village,
Outer Ring Road, Devarabeesanahalli Village,
Bengaluru, 560103,
Karnataka, India
CIN : U51109KA2012PTC066107
Telephone: 044-45614700 / 044-67415800`;

    return (
        <footer className="bg-royal-black text-gray-400 font-sans text-[12px] leading-relaxed border-t border-white/5">

            {/* Top Footer Section */}
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-8">

                    {/* Left: Links Columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

                        {/* Column 1: ABOUT */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">About</h3>
                            <ul className="space-y-2">
                                {aboutLinks.map((link, idx) => (
                                    <li key={idx}><Link to={link.url} className="hover:text-white block transition-colors">{link.title}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: HELP */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Help</h3>
                            <ul className="space-y-2">
                                {helpLinks.map((link, idx) => (
                                    <li key={idx}><Link to={link.url} className="hover:text-white block transition-colors">{link.title}</Link></li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: CONSUMER POLICY */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Consumer Policy</h3>
                            <ul className="space-y-2">
                                {policyLinks.map((link, idx) => (
                                    <li key={idx}><Link to={link.url} className="hover:text-white block transition-colors">{link.title}</Link></li>
                                ))}
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
                            <div className="text-gray-400 space-y-1 whitespace-pre-line">
                                {data?.mailAddress || defaultMailAddress}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-royal-gold uppercase mb-2 text-[10px] tracking-widest font-bold">Social:</h3>
                                <div className="flex gap-4">
                                    <a href={data?.socialLinks?.facebook || "#!"} className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
                                    <a href={data?.socialLinks?.twitter || "#!"} className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
                                    <a href={data?.socialLinks?.youtube || "#!"} className="hover:text-red-500 transition-colors"><Youtube size={20} /></a>
                                    <a href={data?.socialLinks?.instagram || "#!"} className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Registered Office Address */}
                        <div>
                            <h3 className="text-royal-gold uppercase mb-4 text-[10px] tracking-widest font-bold">Registered Office Address:</h3>
                            <div className="text-gray-400 space-y-1 whitespace-pre-line">
                                {data?.officeAddress || defaultOfficeAddress}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Footer Section */}
            <div className="border-t border-white/10 py-6 bg-black/20">
                <div className="container mx-auto px-4 md:px-6">
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
