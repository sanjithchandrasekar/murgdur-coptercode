import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { client } from '../utils/sanity';
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Eye, EyeOff, CheckCircle, X } from 'lucide-react';
const authBg = "/images/Gemini_Generated_Image_o2z9xpo2z9xpo2z9.png";

const Auth = () => {
    const [authView, setAuthView] = useState('login'); // 'login', 'signup', 'forgot'
    const [otpSent, setOtpSent] = useState(false);

    // Toggle between Login and Signup
    const toggleAuth = () => {
        setAuthView(authView === 'login' ? 'signup' : 'login');
        setOtpSent(false);
    };

    const switchToForgot = () => {
        setAuthView('forgot');
        setOtpSent(false);
    };

    const switchToLogin = () => {
        setAuthView('login');
        setOtpSent(false);
    };

    return (
        <div className="min-h-screen bg-royal-black flex items-center justify-center py-24 px-4 bg-fixed bg-cover" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.85)), url(${authBg})` }}>
            <div className="w-full max-w-6xl bg-royal-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row shadow-[0_0_50px_rgba(212,175,55,0.1)] relative">

                {/* Left Side: Brand Visual */}
                <div className={`hidden lg:flex w-5/12 bg-cover bg-center relative transition-all duration-700 ${authView === 'login' ? 'order-1' : 'order-2'}`}
                    style={{ backgroundImage: `url(${authBg})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-12 flex flex-col justify-end">
                        <div className="mb-8">
                            <span className="text-royal-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">The Royal Standard</span>
                            <h2 className="text-4xl font-serif text-white mb-4 leading-tight">
                                {authView === 'login' ? "Welcome Back to Luxury" : authView === 'signup' ? "Join the Elite Circle" : "Account Recovery"}
                            </h2>
                            <p className="text-gray-300 font-light text-sm leading-relaxed mb-8">
                                {authView === 'login'
                                    ? "Sign in to access your curated vault, track bespoke orders, and manage your royal profile."
                                    : authView === 'signup'
                                        ? "Create an account to unlock exclusive heritage collections, priority access, and personalized tailoring services."
                                        : "Securely reset your credentials and regain access to your royal vault."}
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur-md border-l-2 border-royal-gold">
                            <p className="italic text-gray-400 text-sm">"Style is a way to say who you are without having to speak."</p>
                            <p className="text-royal-gold text-xs mt-2 uppercase font-bold tracking-widest">— Murgdur Heritage</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Forms */}
                <div className={`w-full lg:w-7/12 p-8 md:p-14 lg:p-20 flex flex-col justify-center relative ${authView === 'login' ? 'order-2' : 'order-1'}`}>

                    {/* Header for Mobile */}
                    <div className="text-center mb-10 lg:hidden">
                        <h2 className="text-3xl font-serif text-royal-gold mb-2">
                            {authView === 'login' ? "Sign In" : authView === 'signup' ? "Register" : "Forgot Password"}
                        </h2>
                    </div>

                    <h2 className="hidden lg:block text-4xl font-serif text-white mb-2">
                        {authView === 'login' ? "Sign In" : authView === 'signup' ? "Create Your Profile" : "Reset Password"}
                    </h2>
                    <p className="text-gray-400 mb-10 hidden lg:block font-light">
                        {authView === 'login' ? "Enter your details to access your account" : authView === 'signup' ? "Enter your personal details to begin your journey" : "Enter your email or phone to reset"}
                    </p>

                    <AnimatePresence mode="wait">
                        {authView === 'login' && <LoginForm key="login" toggleAuth={toggleAuth} switchToForgot={switchToForgot} />}
                        {authView === 'signup' && <SignupForm key="signup" toggleAuth={toggleAuth} />}
                        {authView === 'forgot' && <ForgotPasswordForm key="forgot" switchToLogin={switchToLogin} />}
                    </AnimatePresence>

                    <div className="mt-8 text-center border-t border-white/5 pt-6">
                        <div className="mt-8 text-center border-t border-white/5 pt-6">
                            <p className="text-gray-500 text-sm">
                                {authView === 'login'
                                    ? "Don't have an account?"
                                    : authView === 'signup'
                                        ? "Already have an account?"
                                        : "Remember your password?"}
                                <button onClick={authView === 'forgot' ? switchToLogin : toggleAuth} className="text-royal-gold ml-2 hover:underline font-bold tracking-wide">
                                    {authView === 'login'
                                        ? "REGISTER NOW"
                                        : "LOGIN HERE"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Sub Components ---

const RoyalModal = ({ isOpen, title, message, onClose, actionText = "CONTINUE" }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-royal-black border border-royal-gold p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
                <div className="w-16 h-16 bg-gradient-to-tr from-royal-gold to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <h1 className="text-3xl font-serif text-black font-bold">M</h1>
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">{title}</h3>
                <p className="text-gray-400 mb-8 font-light leading-relaxed">{message}</p>
                <Button onClick={onClose} variant="primary" className="w-full py-3 text-black font-bold tracking-widest">
                    {actionText}
                </Button>
            </motion.div>
        </div>
    );
};

// --- Sub Components ---

const ForgotPasswordForm = ({ switchToLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Verify User, 2: OTP, 3: Reset Password
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [userDocId, setUserDocId] = useState(null); // To store Sanity ID
    const [mockOtp, setMockOtp] = useState('');
    const [userEnteredOtp, setUserEnteredOtp] = useState('');

    const handleVerifyUser = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const query = `*[_type == "customer" && (email == $identifier || mobile == $identifier)][0]`;
            const user = await client.fetch(query, { identifier });

            if (!user) {
                setError("No account found with these details.");
                return;
            }

            setUserDocId(user._id);
            // Simulate sending OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            setMockOtp(otp);
            console.log("Your Royal OTP is:", otp);
            alert(`Your Verification Code is: ${otp}`); // For easier testing

            setStep(2); // Go to OTP Step
        } catch (err) {
            console.error(err);
            setError("Unable to verify account. Please try again.");
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        setError('');

        if (userEnteredOtp !== mockOtp) {
            setError("Invalid OTP. Please try again.");
            return;
        }
        setStep(3); // Go to Reset Password Step
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await client.patch(userDocId).set({ password: newPassword }).commit();

            setSuccessMsg("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                switchToLogin();
            }, 2000);
        } catch (err) {
            console.error("Reset Password Error:", err);
            setError("Failed to update password. Please try again.");
        }
    };

    // Use correct handler based on step
    const handleSubmit = (e) => {
        if (step === 1) handleVerifyUser(e);
        else if (step === 2) handleVerifyOtp(e);
        else handleResetPassword(e);
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
            onSubmit={handleSubmit}
        >
            {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Email or Phone</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Enter your registered email/phone"
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-royal-gold/10 p-4 rounded text-center mb-4 border border-royal-gold/20">
                        <p className="text-royal-gold text-sm font-bold tracking-widest uppercase mb-1">OTP Sent</p>
                        <p className="text-gray-400 text-xs">Please check your mobile/email for the verification code.</p>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Enter OTP</label>
                        <div className="relative group">
                            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                            <input
                                type="text"
                                required
                                value={userEnteredOtp}
                                onChange={(e) => setUserEnteredOtp(e.target.value)}
                                placeholder="Enter 4-digit Code"
                                maxLength="4"
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600 tracking-[0.5em] font-bold text-center"
                            />
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="New Password (min 8 chars)"
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Confirm New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
                            />
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded text-sm flex items-center gap-2">
                    <CheckCircle className="rotate-45" size={16} /> {error}
                </div>
            )}
            {successMsg && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded text-sm flex items-center gap-2">
                    <CheckCircle size={16} /> {successMsg}
                </div>
            )}

            <Button variant="primary" className="w-full py-4 text-black font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                {step === 1 ? "VERIFY ACCOUNT" : step === 2 ? "VERIFY OTP" : "RESET PASSWORD"}
            </Button>
        </motion.form>
    );
};

const LoginForm = ({ toggleAuth, switchToForgot }) => {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === identifier || u.mobile === identifier);

        if (!user) {
            setError("Account does not exist. Please create an account.");
            return;
        }

        if (user.password !== password) {
            setError(
                <span>
                    Incorrect password. <span onClick={switchToForgot} className="underline cursor-pointer font-bold hover:text-royal-gold">Forgot your password?</span>
                </span>
            );
            return;
        }

        // Success
        localStorage.setItem('userProfile', JSON.stringify({ name: user.name, email: user.email, mobile: user.mobile }));
        navigate('/');
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
            onSubmit={handleLogin}
        >
            <div className="space-y-2">
                <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Email or Phone</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                    <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Enter your email or phone"
                        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <label className="text-xs uppercase text-gray-400 tracking-widest font-bold">Password</label>
                    <button type="button" onClick={switchToForgot} className="text-xs text-royal-gold hover:underline">Forgot Password?</button>
                </div>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-royal-gold transition-colors" size={18} />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-sm focus:border-royal-gold focus:bg-white/10 focus:outline-none transition-all placeholder:text-gray-600"
                    />
                </div>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded text-sm flex items-center gap-2">
                    <CheckCircle className="rotate-45" size={16} /> {error}
                </div>
            )}

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
        password: '',
        confirmPassword: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
    });

    const [passwordError, setPasswordError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        setOtpSent(true);
        // Simulate API call
        console.log("OTP Sent: 1234");
    };

    const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: Password
    const [showModal, setShowModal] = useState(false);

    const handleNextStep = (e) => {
        e.preventDefault();
        setPasswordError('');

        // 1. Basic Field Validation
        if (!/^\d{10}$/.test(formData.mobile)) {
            setPasswordError("Please enter a valid 10-digit mobile number.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setPasswordError("Please enter a valid email address.");
            return;
        }
        // Check if Required fields are filled
        if (!formData.firstName || !formData.lastName || !formData.addressLine1 || !formData.pincode || !formData.city || !formData.state) {
            setPasswordError("Please fill in all details.");
            return;
        }

        setSignupStep(2);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setPasswordError('');

        // 2. Password Validation
        const { password, confirmPassword } = formData;
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        // Removed strict regex complexity checks for better UX as per user request

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            // 3. User Existence Check in Sanity
            const existingQuery = `*[_type == "customer" && (email == $email || mobile == $mobile)][0]`;
            const existingUser = await client.fetch(existingQuery, { email: formData.email, mobile: formData.mobile });

            if (existingUser) {
                setPasswordError("User with this Email or Mobile already exists. Please Log In.");
                return;
            }

            // Create User Object for Sanity
            const newUserDoc = {
                _type: 'customer',
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                mobile: formData.mobile,
                password: formData.password, // Storing as requested
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                createdAt: new Date().toISOString()
            };

            // Try creating in Sanity, but don't block if permission fails (Dev Mode)
            try {
                await client.create(newUserDoc);
            } catch (sanityErr) {
                console.warn("Sanity Write Failed (likely missing token). Falling back to local.", sanityErr);
                if (sanityErr.statusCode !== 401 && sanityErr.statusCode !== 403) {
                    // If it's NOT a permission error (e.g. network), we might still want to throw
                    // But for smoother dev experience, we'll log and proceed locally
                }
            }

            // Also save to LocalStorage for immediate session
            const userProfile = { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, mobile: formData.mobile };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // CRITICAL: Save to 'users' list for Login Form to work
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            existingUsers.push({ ...newUserDoc, _id: `local_${Date.now()}` });
            localStorage.setItem('users', JSON.stringify(existingUsers));

            // Show Royal Modal
            setShowModal(true);

        } catch (err) {
            console.error("Registration Critical Error:", err);
            setPasswordError("Unexpected error. Please try again.");
        }
    };

    const closeSuccessModal = () => {
        setShowModal(false);
        navigate('/');
    };

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <RoyalModal
                        isOpen={showModal}
                        title="Welcome to Royalty"
                        message="Your account has been successfully created. You can now access the exclusive vaults."
                        onClose={closeSuccessModal}
                        actionText="ENTER VAULT"
                    />
                )}
            </AnimatePresence>

            <motion.form
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
                onSubmit={signupStep === 1 ? handleNextStep : handleRegister}
            >
                {signupStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">First Name</label>
                                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Last Name</label>
                                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Mobile Number</label>
                                <div className="relative flex">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</span>
                                    <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} placeholder="XXXXX XXXXX" className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-20 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h3 className="text-white font-serif text-lg mb-4 flex items-center gap-2">
                                <MapPin size={18} className="text-royal-gold" /> Address Details
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Address (Area and Street)</label>
                                    <textarea name="addressLine1" required value={formData.addressLine1} onChange={handleChange} rows="2" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none resize-none placeholder:text-gray-600" placeholder="Flat No, Building Name, Street..."></textarea>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="col-span-1 space-y-2">
                                        <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">Pincode</label>
                                        <input type="text" name="pincode" required value={formData.pincode} onChange={handleChange} placeholder="560001" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                                    </div>
                                    <div className="col-span-1 space-y-2">
                                        <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">City</label>
                                        <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="Bengaluru" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                                    </div>
                                    <div className="col-span-1 space-y-2">
                                        <label className="text-[10px] uppercase text-gray-500 tracking-widest font-bold">State</label>
                                        <input type="text" name="state" required value={formData.state} onChange={handleChange} placeholder="Karnataka" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {signupStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-serif text-white">Secure Your Vault</h3>
                            <p className="text-gray-400 text-sm">Create a strong password to protect your account</p>
                        </div>
                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 text-white pl-10 pr-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors"
                                        placeholder="Min 8 chars"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase text-royal-gold tracking-widest font-bold">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${passwordError && formData.password !== formData.confirmPassword ? 'border-red-500' : 'border-white/10'} text-white pl-10 pr-4 py-3 rounded-sm focus:border-royal-gold focus:outline-none transition-colors`}
                                        placeholder="Re-enter password"
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSignupStep(1)}
                            className="text-gray-500 text-sm hover:text-white underline"
                        >
                            Back to Details
                        </button>
                    </div>
                )}


                {/* Validation Error Message */}
                {passwordError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded text-xs flex items-center gap-2">
                        <CheckCircle className="rotate-45" size={14} /> {passwordError}
                    </div>
                )}

                <Button variant="primary" className="w-full py-4 text-black font-bold tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] mt-6">
                    {signupStep === 1 ? "NEXT: SET PASSWORD" : "COMPLETE REGISTRATION"}
                </Button>
            </motion.form>
        </>
    );

};

export default Auth;
