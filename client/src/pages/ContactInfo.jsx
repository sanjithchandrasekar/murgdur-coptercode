import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Button from '../components/common/Button';

const ContactInfo = () => {
    return (
        <div className="min-h-screen bg-royal-black text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-royal-gold uppercase tracking-[0.2em] text-sm font-bold block mb-4">Contact Us</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Get in Touch</h1>
                    <div className="w-24 h-0.5 bg-royal-gold mx-auto"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">

                    {/* Contact Details */}
                    <div className="w-full lg:w-5/12 space-y-12">
                        <div>
                            <h3 className="text-2xl font-serif text-white mb-6 border-l-2 border-royal-gold pl-4">Contact Information</h3>
                            <p className="text-gray-400 font-light mb-8 leading-relaxed">
                                We're here to help with any questions about your order, products, or our services.
                            </p>

                            <div className="space-y-6">
                                <a href="tel:+910000000000" className="flex items-start gap-4 group cursor-pointer hover:bg-white/5 p-2 -ml-2 rounded-lg transition-all">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1 group-hover:text-royal-gold transition-colors">Phone</h4>
                                        <p className="text-gray-400 font-serif">+91 000 000 0000</p>
                                    </div>
                                </a>

                                <a href="mailto:support@murgdur.com" className="flex items-start gap-4 group cursor-pointer hover:bg-white/5 p-2 -ml-2 rounded-lg transition-all">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1 group-hover:text-royal-gold transition-colors">Email</h4>
                                        <p className="text-gray-400 font-serif">support@murgdur.com</p>
                                    </div>
                                </a>

                                <div className="flex items-start gap-4 group p-2 -ml-2">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Working Hours</h4>
                                        <p className="text-gray-400 font-serif">Mon - Sat: 10:00 AM - 8:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-serif text-white mb-6 border-l-2 border-royal-gold pl-4">Our Store</h3>
                            <div className="flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-black transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-1">Address</h4>
                                    <p className="text-gray-400 font-serif leading-relaxed">
                                        123, Heritage Boulevard,<br />
                                        Palace Road, Bengaluru,<br />
                                        Karnataka - 560001
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-7/12 bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-lg relative">

                        <h3 className="text-2xl font-serif text-white mb-8">Send a message</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-600" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-600" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email Address</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors placeholder:text-gray-600" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Subject</label>
                                <select className="w-full bg-white/5 border border-white/10 text-gray-300 px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none transition-colors">
                                    <option className="bg-gray-900">General Inquiry</option>
                                    <option className="bg-gray-900">Support</option>
                                    <option className="bg-gray-900">Feedback</option>
                                    <option className="bg-gray-900">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Message</label>
                                <textarea rows="5" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-md focus:border-royal-gold focus:outline-none resize-none transition-colors placeholder:text-gray-600"></textarea>
                            </div>

                            <button className="w-full bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                Send Message <Send size={16} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
