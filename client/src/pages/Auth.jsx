import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Eye, EyeOff, CheckCircle } from 'lucide-react';
const authBg = "/images/Gemini_Generated_Image_o2z9xpo2z9xpo2z9.png";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [otpSent, setOtpSent] = useState(false);

    // Toggle between Login and Signup
    const toggleAuth = () => {
        setIsLogin(!isLogin);
        setOtpSent(false);
    };

    return (
        <div className="min-h-screen bg-royal-black flex items-center justify-center py-24 px-4 bg-fixed bg-cover" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.85)), url(${authBg})` }}>
            <div className="w-full max-w-6xl bg-royal-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_0_50px_rgba(212,175,55,0.1)] relative">

                {/* Left Side: Brand Visual */}
                <div className={`hidden lg:flex w-5/12 bg-cover bg-center relative transition-all duration-700 ${isLogin ? 'order-1' : 'order-2'}`}
                    style={{ backgroundImage: `url(${authBg})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-12 flex flex-col justify-end">
                        <div className="mb-8">
                            <span className="text-royal-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Royal Standard</span>
                            <h2 className="text-4xl font-serif text-white mb-4 leading-tight">
                                {isLogin ? "Welcome Back to Luxury" : "Join the Elite Circle"}
                            </h2>
                            <p className="text-gray-300 font-light text-sm leading-relaxed mb-8">
                                {isLogin
                                    ? "Sign in to access your curated vault, track bespoke orders, and manage your royal profile."
                                    : "Create an account to unlock exclusive heritage collections, priority access, and personalized tailoring services."}
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur-md border-l-2 border-royal-gold">
                            <p className="italic text-gray-400 text-sm">"Style is a way to say who you are without having to speak."</p>
                            <p className="text-royal-gold text-xs mt-2 uppercase font-bold tracking-widest">— Murgdur Heritage</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Forms */}
                <div className={`w-full lg:w-7/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative ${isLogin ? 'order-2' : 'order-1'}`}>

                    {/* Header for Mobile */}
                    <div className="text-center mb-10 lg:hidden">
                        <h2 className="text-3xl font-serif text-royal-gold mb-2">{isLogin ? "Sign In" : "Register"}</h2>
                    </div>

                    <h2 className="hidden lg:block text-4xl font-serif text-white mb-2">
                        {isLogin ? "Sign In" : "Create Your Profile"}
                    </h2>
                    <p className="text-gray-400 mb-10 hidden lg:block font-light">
                        {isLogin ? "Enter your details to access your account" : "Enter your personal details to begin your journey"}
                    </p>

                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <LoginForm key="login" toggleAuth={toggleAuth} />
                        ) : (
                            <SignupForm key="signup" toggleAuth={toggleAuth} />
                        )}
                    </AnimatePresence>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <p className="text-gray-500 text-sm">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={toggleAuth} className="text-royal-gold ml-2 hover:underline font-bold tracking-wide">
                                {isLogin ? "REGISTER NOW" : "LOGIN HERE"}
                            </button>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Sub Components ---

const LoginForm = ({ toggleAuth }) => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Login
        alert("Logged in Successfully!");
        navigate('/');
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
            onSubmit={handleLogin}
        >
            <div className="space-y-2">
                <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Email or Username</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                    <input type="text" placeholder="Enter your email or phone" className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600" />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Password</label>
                    <a href="#" className="text-xs text-royal-gold hover:underline">Forgot Password?</a>
                </div>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                    <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600" />
                </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer pb-2">
                <input type="checkbox" id="remember" className="accent-royal-gold w-4 h-4" />
                <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">Remember me for 30 days</label>
            </div>

            <Button variant="primary" className="w-full py-4 text-black font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                SIGN IN
            </Button>
        </motion.form>
    );
};

const SignupForm = ({ toggleAuth }) => {
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    // Signup State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        setOtpSent(true);
        // Simulate API call
        setTimeout(() => alert("OTP Sent: 1234"), 1000);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Save Address to LocalStorage to mimic backend
        const userAddress = {
            id: Date.now(),
            name: `${formData.firstName} ${formData.lastName}`,
            mobile: formData.mobile,
            address: `${formData.addressLine1}, ${formData.addressLine2 ? formData.addressLine2 + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`,
            type: 'Home' // Default
        };

        // Get existing addresses or init empty
        const existingDetails = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
        existingDetails.push(userAddress);
        localStorage.setItem('savedAddresses', JSON.stringify(existingDetails));

        // Set as default selected address for checkout
        localStorage.setItem('selectedAddress', JSON.stringify(userAddress));
        localStorage.setItem('userProfile', JSON.stringify({ name: userAddress.name, email: formData.email, mobile: formData.mobile }));

        alert("Registration Complete! Redirecting...");
        navigate('/'); // Redirect to Home or Cart usually
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
            onSubmit={handleRegister}
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">First Name</label>
                    <input type="text" name="firstName" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Last Name</label>
                    <input type="text" name="lastName" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="Doe" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Mobile Number</label>
                    <div className="relative flex">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                        <input type="tel" name="mobile" required onChange={handleChange} placeholder="XXXXX XXXXX" className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-20 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" />
                        <button
                            onClick={handleSendOtp}
                            type="button"
                            className="absolute right-1 top-1 bottom-1 bg-white/10 hover:bg-royal-gold hover:text-black text-gray-300 text-[10px] px-3 transition-colors uppercase tracking-wider font-bold rounded-sm"
                        >
                            {otpSent ? "Resend" : "Send OTP"}
                        </button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Email Address</label>
                    <input type="email" name="email" required onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="john@example.com" />
                </div>
            </div>

            {otpSent && (
                <div className="space-y-2 animate-fade-in bg-royal-gold/5 p-4 border border-royal-gold/20 rounded-sm">
                    <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold flex items-center gap-2">
                        Enter OTP <span className="text-gray-500 font-normal normal-case">(Sent to Mobile)</span>
                    </label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4].map((_, i) => (
                            <input key={i} type="text" maxLength="1" className="w-12 h-12 bg-black border border-gray-600 text-white text-center text-xl focus:border-royal-gold focus:outline-none rounded-sm" />
                        ))}
                    </div>
                </div>
            )}

            <div className="pt-4 border-t border-white/10">
                <h3 className="text-white font-serif text-lg mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-royal-gold" /> Address Details
                </h3>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Address (Area and Street)</label>
                        <textarea name="addressLine1" required onChange={handleChange} rows="2" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none resize-none placeholder:text-gray-600" placeholder="Flat No, Building Name, Street..."></textarea>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 space-y-2">
                            <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Pincode</label>
                            <input type="text" name="pincode" required onChange={handleChange} placeholder="560001" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">City</label>
                            <input type="text" name="city" required onChange={handleChange} placeholder="Bengaluru" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                        </div>
                        <div className="col-span-1 space-y-2">
                            <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">State</label>
                            <input type="text" name="state" required onChange={handleChange} placeholder="Karnataka" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <Button variant="primary" className="w-full py-4 text-black font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] mt-6">
                COMPLETE REGISTRATION
            </Button>
        </motion.form>
    );

};

export default Auth;
