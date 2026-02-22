import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

const ConditionsOfUse = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6 lg:px-24 font-serif">
            <SEO
                title="Conditions of Use | Murgdur"
                description="Review the conditions of use for Murgdur's royal services and products."
            />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-4 text-[#D4AF37]">
                            Royal Decree
                        </h1>
                        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500">
                            Conditions of Use
                        </p>
                        <div className="h-px w-24 bg-[#D4AF37] mx-auto mt-8 opacity-50" />
                    </div>

                    <div className="space-y-12 text-zinc-300 leading-relaxed font-sans text-sm md:text-base">
                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using the Murgdur website ("the Royal Treasury"), you agree to be bound by these Conditions of Use. If you do not agree to these terms, you may not access our services. Just as a guest in a palace adheres to court protocol, we expect our patrons to respect these guidelines.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                2. Privacy & Personal Data
                            </h2>
                            <p>
                                Your privacy is paramount. Please review our Privacy Notice, which also governs your visit to Murgdur, to understand our practices. We treat your personal information with the same discretion as state secrets.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                3. Electronic Communications
                            </h2>
                            <p>
                                When you visit Murgdur or send e-mails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices on this site. You agree that all agreements, notices, disclosures and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                4. Copyright & Intellectual Property
                            </h2>
                            <p>
                                All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Murgdur or its content suppliers and protected by international copyright laws. The compilation of all content on this site is the exclusive property of Murgdur.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                5. Your Account
                            </h2>
                            <p>
                                If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. Murgdur reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in their sole discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                6. Product Descriptions
                            </h2>
                            <p>
                                Murgdur attempts to be as accurate as possible. However, Murgdur does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free. If a product offered by Murgdur itself is not as described, your sole remedy is to return it in unused condition.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                7. Pricing
                            </h2>
                            <p>
                                Except where noted otherwise, the List Price displayed for products on our website represents the full retail price listed on the product itself. With respect to items sold by Murgdur, we cannot confirm the price of an item until you order.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                8. Governing Law
                            </h2>
                            <p>
                                By visiting Murgdur, you agree that the laws of the land, without regard to principles of conflict of laws, will govern these Conditions of Use and any dispute of any sort that might arise between you and Murgdur.
                            </p>
                        </section>

                        <div className="pt-12 border-t border-white/10 text-center">
                            <p className="text-xs text-zinc-500 uppercase tracking-widest">
                                Last Updated: February 2026
                            </p>
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ConditionsOfUse;
