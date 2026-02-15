import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Check, X,
    Facebook, Github, Chrome, Loader2, AlertCircle, CheckCircle2,
    Globe, Smartphone, ShieldCheck, Crown, Star
} from 'lucide-react';
import Button from '../components/common/Button';

// --- Premium Assets ---
const CAROUSEL_IMAGES = [
    "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2500&auto=format&fit=crop", // Dark Luxury Texture
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop", // Gentleman Style
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop"  // Boutique Interior
];

const TESTIMONIALS = [
    { text: "Elegance is the only beauty that never fades.", author: "Audrey Hepburn" },
    { text: "Style is a way to say who you are without having to speak.", author: "Rachel Zoe" },
    { text: "Fashion is the armor to survive the reality of everyday life.", author: "Bill Cunningham" }
];

const Auth = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('login'); // 'login', 'signup', 'forgot'
    const [loading, setLoading] = useState(false);
    const [bgIndex, setBgIndex] = useState(0);

    // Carousel Effect
    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Form States
    const [formData, setFormData] = useState({
        email: '', password: '', firstName: '', lastName: '', mobile: '',
        confirmPassword: '', agreeTerms: false
    });

    // Validation States
    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Handlers
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));

        // Clear specific error
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));

        // Password Strength Logic
        if (name === 'password') {
            let strength = 0;
            if (val.length > 5) strength += 25; // Length
            if (/[A-Z]/.test(val)) strength += 25; // Uppercase
            if (/[0-9]/.test(val)) strength += 25; // Number
            if (/[^A-Za-z0-9]/.test(val)) strength += 25; // Special Char
            setPasswordStrength(strength);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
        if (view === 'signup') {
            if (!formData.firstName) newErrors.firstName = "Required";
            if (!formData.lastName) newErrors.lastName = "Required";
            if (formData.password.length < 8) newErrors.password = "Min 8 chars";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
            if (!formData.agreeTerms) newErrors.agreeTerms = "Must agree to terms";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(() => {
            const userProfile = {
                name: view === 'signup' ? `${formData.firstName} ${formData.lastName}` : "Royal Patron",
                email: formData.email,
                isMember: true,
                tier: view === 'signup' ? "Member" : "Silver"
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
            setLoading(false);
            navigate('/');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans overflow-hidden">

            {/* --- LEFT: IMMERSIVE EXPERIENCE --- */}
            <div className="hidden lg:flex w-5/12 relative flex-col justify-between p-12 overflow-hidden transition-all duration-1000">
                {/* Background Carousel */}
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={bgIndex}
                        src={CAROUSEL_IMAGES[bgIndex]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10"></div>

                {/* Content Layer */}
                <div className="relative z-20 h-full flex flex-col justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                            <Crown size={24} className="text-black" />
                        </div>
                        <div>
                            <h1 className="text-xl font-serif font-bold tracking-widest uppercase text-white">Murgdur</h1>
                            <p className="text-[10px] text-[#D4AF37] tracking-[0.3em] uppercase">Royal Heritage</p>
                        </div>
                    </div>

                    {/* Dynamic Quote */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={bgIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/10 backdrop-blur-md border-l-4 border-[#D4AF37] p-6 rounded-r-lg max-w-md"
                        >
                            <p className="text-xl font-serif italic leading-relaxed mb-4">"{TESTIMONIALS[bgIndex].text}"</p>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">— {TESTIMONIALS[bgIndex].author}</p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Stats / Trust */}
                    <div className="flex gap-8">
                        <div>
                            <p className="text-2xl font-serif font-bold text-white">50k+</p>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Royal Members</p>
                        </div>
                        <div>
                            <p className="text-2xl font-serif font-bold text-white">100%</p>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Authentic</p>
                        </div>
                        <div>
                            <p className="text-2xl font-serif font-bold text-white">24/7</p>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Concierge</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT: INTERACTIVE FORM --- */}
            <div className="w-full lg:w-7/12 bg-[#0a0a0a] flex flex-col relative overflow-y-auto">

                {/* Top Bar */}
                <div className="absolute top-0 right-0 w-full p-6 flex justify-between items-center z-30">
                    <button onClick={() => navigate('/')} className="lg:hidden flex items-center gap-2 text-zinc-500">
                        <ArrowRight className="rotate-180" size={16} /> Back
                    </button>
                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-zinc-500 text-xs hidden sm:inline">Not ready to join?</span>
                        <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1">
                            Guest Access <ArrowRight size={12} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
                    <div className="w-full max-w-lg">

                        {/* Header Transistions */}
                        <div className="mb-8 text-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={view}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Crown size={32} className="text-[#D4AF37] mx-auto mb-4 lg:hidden" />
                                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                                        {view === 'login' && "Welcome Back"}
                                        {view === 'signup' && "Create Account"}
                                        {view === 'forgot' && "Reset Password"}
                                    </h2>
                                    <p className="text-zinc-500 text-sm">
                                        {view === 'login' && "Enter your credentials to access your vault."}
                                        {view === 'signup' && "Join the elite circle of connoisseurs."}
                                        {view === 'forgot' && "We'll help you get back on track."}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* AUTH FORMS */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence mode="wait">

                                {/* LOGIN FIELDS */}
                                {view === 'login' && (
                                    <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                        <div className="space-y-4">
                                            <Input
                                                label="Email Address" icon={Mail} type="email" name="email"
                                                value={formData.email} onChange={handleChange} error={errors.email} placeholder="name@example.com"
                                            />
                                            <div className="space-y-1">
                                                <Input
                                                    label="Password" icon={Lock} type="password" name="password"
                                                    value={formData.password} onChange={handleChange} isPassword
                                                />
                                                <div className="flex justify-end">
                                                    <button type="button" onClick={() => setView('forgot')} className="text-[10px] text-zinc-500 hover:text-[#D4AF37] transition-colors">Forgot Password?</button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* SIGNUP FIELDS */}
                                {view === 'signup' && (
                                    <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="John" />
                                            <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="Doe" />
                                        </div>

                                        <Input label="Email Address" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="name@example.com" />

                                        <div className="relative group">
                                            <label className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest ml-1 mb-1 block">Mobile Number</label>
                                            <div className="flex">
                                                <div className="bg-[#141414] border border-white/10 border-r-0 rounded-l-sm px-3 flex items-center text-zinc-400 text-sm gap-1">
                                                    <Globe size={14} /> +91
                                                </div>
                                                <input
                                                    type="tel" name="mobile" value={formData.mobile} onChange={handleChange}
                                                    className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3.5 rounded-r-sm focus:border-[#D4AF37] focus:outline-none text-sm transition-all"
                                                    placeholder="98765 43210"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Input label="Create Password" icon={Lock} type="password" name="password" value={formData.password} onChange={handleChange} error={errors.password} isPassword placeholder="Min 8 chars" />
                                            {/* Strength Meter */}
                                            {formData.password && (
                                                <div className="flex gap-1 h-1 mt-1">
                                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength > 0 ? 'bg-red-500' : 'bg-white/10'}`}></div>
                                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength > 25 ? 'bg-yellow-500' : 'bg-white/10'}`}></div>
                                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength > 50 ? 'bg-blue-500' : 'bg-white/10'}`}></div>
                                                    <div className={`flex-1 rounded-full transition-colors ${passwordStrength > 75 ? 'bg-green-500' : 'bg-white/10'}`}></div>
                                                </div>
                                            )}
                                        </div>

                                        <Input label="Confirm Password" icon={ShieldCheck} type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} isPassword placeholder="Re-enter password" />

                                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
                                            <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} className="mt-1 accent-[#D4AF37]" id="terms" />
                                            <label htmlFor="terms" className="text-xs text-zinc-400 cursor-pointer">
                                                I agree to Murgdur's <span className="text-white hover:underline">Terms of Service</span> and <span className="text-white hover:underline">Privacy Policy</span>.
                                            </label>
                                        </div>
                                        {errors.agreeTerms && <p className="text-red-500 text-[10px]">{errors.agreeTerms}</p>}
                                    </motion.div>
                                )}

                                {/* FORGOT FIELDS */}
                                {view === 'forgot' && (
                                    <motion.div key="forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                        <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded mb-4 text-[#D4AF37] text-xs flex gap-2">
                                            <AlertCircle size={16} /> Enter your registered email to receive a secure reset link.
                                        </div>
                                        <Input label="Registered Email" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" />
                                    </motion.div>
                                )}

                            </AnimatePresence>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full py-4 bg-[#D4AF37] text-black font-bold tracking-[0.2em] hover:bg-white hover:scale-[1.01] transition-all duration-300 shadow-[0_5px_20px_rgba(212,175,55,0.15)] mt-6 border-none flex items-center justify-center gap-2 text-sm"
                                disabled={loading}
                            >
                                {loading && <Loader2 size={18} className="animate-spin" />}
                                {view === 'login' ? "SECURE SIGN IN" : view === 'signup' ? "COMPLETE REGISTRATION" : "SEND INSTRUCTIONS"}
                            </Button>
                        </form>

                        {/* Social Login */}
                        {view !== 'forgot' && (
                            <div className="mt-8">
                                <div className="relative mb-6 text-center">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                                    <span className="relative bg-[#0a0a0a] px-4 text-[10px] uppercase tracking-widest text-zinc-600">Or connect with</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <SocialButton icon={Chrome} label="Google" />
                                    <SocialButton icon={Facebook} label="Facebook" />
                                </div>
                            </div>
                        )}

                        {/* View Toggle */}
                        {view !== 'forgot' && (
                            <div className="mt-8 text-center">
                                <p className="text-zinc-500 text-xs">
                                    {view === 'login' ? "Looking to join?" : "Already a member?"}
                                    <button
                                        onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                                        className="text-[#D4AF37] ml-2 font-bold uppercase tracking-wider hover:underline transition-all"
                                    >
                                        {view === 'login' ? "Apply for Membership" : "Sign In"}
                                    </button>
                                </p>
                            </div>
                        )}
                        {view === 'forgot' && (
                            <div className="mt-6 text-center">
                                <button onClick={() => setView('login')} className="text-zinc-500 text-xs hover:text-white uppercase tracking-wider">Back to Login</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub Components ---

const Input = ({ label, icon: Icon, type = 'text', name, value, onChange, error, isPassword, placeholder }) => {
    const [showPass, setShowPass] = useState(false);
    const inputType = isPassword ? (showPass ? "text" : "password") : type;

    return (
        <div className="space-y-1">
            <label className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest ml-1">{label}</label>
            <div className="relative group">
                {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#D4AF37] transition-colors" size={16} />}
                <input
                    type={inputType} name={name} value={value} onChange={onChange}
                    className={`w-full bg-[#141414] border ${error ? 'border-red-500/50' : 'border-white/10'} text-white ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-zinc-800 text-sm`}
                    placeholder={placeholder}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
                {error && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={16} />}
            </div>
            {error && <p className="text-red-500 text-[10px] ml-1">{error}</p>}
        </div>
    );
};

const SocialButton = ({ icon: Icon, label }) => (
    <button className="flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all rounded-sm group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        <Icon size={18} className="text-zinc-400 group-hover:text-white transition-colors" />
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 group-hover:text-white">{label}</span>
    </button>
);

export default Auth;
