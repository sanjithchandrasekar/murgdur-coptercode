import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

const PrivacyNotice = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16 px-6 lg:px-24 font-serif">
            <SEO
                title="Privacy Notice | Murgdur"
                description="Murgdur values your privacy. Learn how we collect, use, and protect your personal information."
            />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-widest uppercase mb-4 text-[#D4AF37]">
                            Confidentiality
                        </h1>
                        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500">
                            Privacy Notice
                        </p>
                        <div className="h-px w-24 bg-[#D4AF37] mx-auto mt-8 opacity-50" />
                    </div>

                    <div className="space-y-12 text-zinc-300 leading-relaxed font-sans text-sm md:text-base">
                        <p>
                            Your privacy is of the utmost importance to Murgdur. We understand that your trust is our most valuable asset ("The Royal Seal"). We are committed to protecting the information you share with us.
                        </p>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                1. Information We Collect
                            </h2>
                            <p>
                                We collect personal information that you provide to us directly, such as when you create an account, make a purchase, or sign up for our newsletter. This may include your name, email address, shipping address, and payment information. We treat this information with the discretion befitting a royal court.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                2. How We Use Your Information
                            </h2>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>To process and fulfill your orders, ensuring your treasures reach you safely.</li>
                                <li>To communicate with you about your account and orders.</li>
                                <li>To optimize your experience on our website, tailoring the royal treatment to your preferences.</li>
                                <li>To send you exclusive offers and updates, should you choose to receive them.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                3. Information Sharing
                            </h2>
                            <p>
                                We do not sell your personal information to third parties. We may share your information with trusted partners who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                4. Data Security
                            </h2>
                            <p>
                                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                5. Your Rights
                            </h2>
                            <p>
                                You have the right to access, correct, or delete your personal information at any time. You may also opt-out of receiving marketing communications from us. To exercise these rights, please contact our Royal Concierge.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-[#D4AF37] text-lg uppercase tracking-widest mb-4 font-serif">
                                6. Updates to This Policy
                            </h2>
                            <p>
                                We may update this privacy notice from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
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

export default PrivacyNotice;
