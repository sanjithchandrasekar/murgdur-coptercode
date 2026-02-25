import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/PhoneInput.css"; // Royal Theme Overrides
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  Facebook,
  Github,

  Loader2,
  AlertCircle,
  CheckCircle2,
  Crown,
} from "lucide-react";
import Button from "../components/common/Button";
import SEO from "../components/common/SEO";
import { client } from "../utils/sanity";

// --- Premium Assets ---
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2500&auto=format&fit=crop", // Dark Luxury Texture
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop", // Gentleman Style
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop", // Boutique Interior
];

const TESTIMONIALS = [
  {
    text: "Elegance is the only beauty that never fades.",
    author: "Audrey Hepburn",
  },
  {
    text: "Style is a way to say who you are without having to speak.",
    author: "Rachel Zoe",
  },
  {
    text: "Fashion is the armor to survive the reality of everyday life.",
    author: "Bill Cunningham",
  },
];

const Auth = ({ returnUrl }) => {
  const navigate = useNavigate();
  const [view, setView] = useState("login"); // 'login', 'signup', 'forgot'
  const [loading, setLoading] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);

  // Dialog State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "alert",
    onConfirm: null,
  });

  const showRoyalNotice = (title, message, type = "alert", onConfirm = null) => {
    setDialog({ isOpen: true, title, message, type, onConfirm });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  // Carousel Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Form States
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  // Validation States
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));

    // Clear specific error
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));

    // Password Strength Logic
    if (name === "password") {
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
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (view === "signup") {
      if (!formData.firstName || formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName || formData.lastName.trim().length < 1) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.mobile || formData.mobile.length < 8) {
        newErrors.mobile = "Invalid mobile number";
      }
      if (formData.password.length < 8) newErrors.password = "Min 8 chars";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeTerms) newErrors.agreeTerms = "Must agree to terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (view === "login") {
        // Authenticate via MongoDB Backend
        const apiUrl = import.meta.env.VITE_API_URL || "/api";
        const response = await fetch(`${apiUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const userProfile = {
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ")[1] || "",
            email: data.email,
            mobile: data.mobile || "", // Use backend data if available
            isMember: data.isMember !== undefined ? data.isMember : true,
            tier: data.tier || "Silver",
            role: data.role || "user",
            _id: data._id,
            token: data.token,
          };
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          showRoyalNotice("Welcome Back", "You have successfully signed in.", "success", () => navigate(returnUrl || "/"));
        } else {
          setErrors({ auth: "Invalid email or password" });
        }
      } else if (view === "signup") {
        const apiUrl = import.meta.env.VITE_API_URL || "/api";

        // Register User
        const response = await fetch(`${apiUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password,
            mobile: formData.mobile,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const userProfile = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: data.email,
            mobile: data.mobile || formData.mobile,
            isMember: data.isMember !== undefined ? data.isMember : true,
            tier: data.tier || "Member",
            role: data.role || "user",
            _id: data._id,
            token: data.token,
          };
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          showRoyalNotice("Registration Complete", "Your account has been successfully created.", "success", () => navigate("/complete-profile", { state: { returnUrl: returnUrl || "/" } }));
        } else {
          setErrors({
            email: data.message || "Registration failed",
          });
        }
      } else if (view === "forgot") {
        showRoyalNotice("Royal Decree", "Pray, check your inbox. We have dispatched instructions to restore your access to " + formData.email);
        setView("login");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({
        auth: "Connection failed. Please check your network.",
      });
    } finally {
      setLoading(false);
    }
  };



  const getSEOMeta = () => {
    switch (view) {
      case "signup":
        return {
          title: "Join the Royal Circle | Murgdur",
          description:
            "Create your Murgdur account to access exclusive collections and personalized services.",
        };
      case "forgot":
        return {
          title: "Reset Password | Murgdur",
          description:
            "Reset your password to regain access to your Murgdur account.",
        };
      default:
        return {
          title: "Sign In | Murgdur",
          description:
            "Sign in to your Murgdur account to view your orders and profile.",
        };
    }
  };

  const seoData = getSEOMeta();

  return (
    <div className="min-h-screen bg-white flex text-gray-900 font-sans overflow-hidden">
      <SEO
        title={seoData.title}
        description={seoData.description}
        url={`https://murugdur1.vercel.app/auth?view=${view}`}
      />

      {/* --- LEFT: VIDEO BACKGROUND PANEL --- */}
      <div className="hidden lg:flex w-5/12 relative flex-col justify-end p-16 overflow-hidden bg-black">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/perfume1.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Content Overlay */}
        <div className="relative z-10">
          {/* Logo Mark Container */}
          <div className="w-20 h-20 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black/40 backdrop-blur-xl mb-12 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
            <img src="/images/branding/logo.jpeg" alt="M" className="w-12 h-12 object-cover rounded-full opacity-90 shadow-2xl" />
          </div>

          <div className="space-y-4 mb-16">
            <h2 className="text-white text-5xl font-bold tracking-[0.25em] uppercase font-serif">
              Murgdur
            </h2>
            <p className="text-[#D4AF37] text-xs tracking-[0.6em] uppercase font-bold ml-1">
              The Royal Heritage
            </p>
          </div>

          {/* Quote Separator */}
          <div className="w-24 h-[2px] bg-[#D4AF37] mb-12 opacity-80" />

          {/* Quote - Matching Styling from reference image */}
          {/* Quote - Dynamic Cycling */}
          <div className="h-48 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={bgIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <blockquote className="font-serif text-4xl lg:text-5xl text-white leading-[1.15] mb-8 font-medium">
                  "{TESTIMONIALS[bgIndex % TESTIMONIALS.length].text}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-[#D4AF37]/50" />
                  <cite className="text-[#D4AF37] text-xs font-bold tracking-[0.4em] uppercase not-italic">
                    {TESTIMONIALS[bgIndex % TESTIMONIALS.length].author}
                  </cite>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* --- RIGHT: INTERACTIVE FORM --- */}
      <div className="relative flex w-full flex-col bg-white lg:w-7/12">
        {/* Decorative Light Glow */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />

        {/* Top Navigation */}
        <div className="z-40 flex w-full items-center justify-between p-6 md:p-10">
          <div className="flex items-center gap-3">
            {/* Logo Mark */}
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#D4AF37]/20 lg:hidden">
              <img
                src="/images/branding/logo.jpeg"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Nav Links */}
            <div className="flex flex-col">
              <h1 className="font-serif text-lg font-bold tracking-[0.2em] uppercase text-gray-900 lg:hidden">
                Murgdur
              </h1>
              <button
                onClick={() => navigate("/")}
                className="group flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-500 transition-colors hover:text-[#D4AF37]"
              >
                <ArrowRight
                  className="rotate-180 transition-transform group-hover:-translate-x-1"
                  size={12}
                />
                Back to Home
              </button>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-1.5 text-[9px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
          >
            Guest Access <ArrowRight size={10} />
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center px-8 pb-20 lg:px-24">
          <div className="w-full max-w-md">
            {/* Form Header */}
            <div className="mb-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/10 overflow-hidden lg:hidden">
                    <img src="/images/branding/logo.jpeg" alt="Murgdur Logo" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="font-serif text-4xl text-gray-900 md:text-5xl">
                    {view === "login" && "Welcome Back"}
                    {view === "signup" && "Create Account"}
                    {view === "forgot" && "Reset Password"}
                  </h2>
                  <div className="mt-4 h-1 w-12 bg-[#D4AF37]" />
                  <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                    {view === "login" &&
                      "Sign in to access your profile and collections."}
                    {view === "signup" &&
                      "Sign up to start your journey with us."}
                    {view === "forgot" &&
                      "Enter your email to receive a password reset link."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* AUTH FORMS */}
            {errors.auth && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-500 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={18} />
                {errors.auth}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {/* LOGIN FIELDS - BOXED LAYOUT */}
                {view === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 rounded border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400`}
                          placeholder="name@example.com"
                        />
                        {formData.email.includes('@') && (
                          <CheckCircle2 size={16} className="absolute right-4 top-3.5 text-green-500" />
                        )}
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400"
                          placeholder="Enter your password"
                        />
                        <div className="flex justify-end mt-2">
                          <button
                            type="button"
                            onClick={() => setView("forgot")}
                            className="text-[10px] text-zinc-500 hover:text-[#D4AF37] transition-colors font-medium tracking-wide"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SIGNUP FIELDS - PREMIUM & UNIQUE */}
                {view === "signup" && (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8 mt-4"
                  >
                    {/* First Name & Last Name */}
                    <div className="flex gap-4">
                      {/* First Name */}
                      <div className="space-y-1 w-1/2">
                        <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">First Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 rounded border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400`}
                            placeholder="First Name"
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-[10px] ml-1">{errors.firstName}</p>}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1 w-1/2">
                        <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Last Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full bg-white border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 rounded border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400`}
                            placeholder="Last Name"
                          />
                        </div>
                        {errors.lastName && <p className="text-red-500 text-[10px] ml-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 rounded border-gray-300 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400`}
                          placeholder="name@example.com"
                        />
                        {formData.email.includes('@') && (
                          <CheckCircle2 size={16} className="absolute right-4 top-3.5 text-green-500" />
                        )}
                      </div>
                      {errors.email && <p className="text-red-500 text-[10px] ml-1">{errors.email}</p>}
                    </div>

                    {/* Mobile - International */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Mobile Number</label>
                      <div className={`relative rounded transition-all duration-300 ${errors.mobile ? 'border border-red-500' : 'border border-zinc-800 focus-within:border-[#D4AF37] focus-within:ring-1 focus-within:ring-[#D4AF37]'}`}>
                        <PhoneInput
                          country={"in"}
                          value={formData.mobile}
                          onChange={(phone) => setFormData(prev => ({ ...prev, mobile: phone }))}
                          countryCodeEditable={false}
                          enableSearch={true}
                          disableSearchIcon={true}
                          inputClass="!bg-white !text-gray-900 !w-full !h-12 !border-none !rounded focus:!ring-0"
                          buttonClass="!bg-white !border-r !border-gray-300 !rounded-l hover:!bg-gray-50"
                          dropdownClass="!bg-white !text-gray-900 !border !border-gray-300 !shadow-xl"
                          searchClass="!bg-white !text-gray-900 !border-gray-300 hover:!border-[#D4AF37]"
                        />
                      </div>
                      {errors.mobile && <p className="text-red-500 text-[10px] ml-1">{errors.mobile}</p>}
                    </div>



                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400`}
                          placeholder="At least 8 characters"
                        />
                        <div className="absolute right-4 top-3.5 flex gap-1">
                          {passwordStrength > 0 && <div className={`w-2 h-2 rounded-full ${passwordStrength > 25 ? 'bg-yellow-500' : 'bg-red-500'}`} />}
                          {passwordStrength > 50 && <div className="w-2 h-2 rounded-full bg-green-500" />}
                        </div>
                      </div>
                      <p className="text-[9px] text-zinc-600 ml-1">Must contain at least 1 number and 1 special character.</p>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400"
                        placeholder="Re-enter password"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Terms */}
                    <div className="p-4 bg-zinc-900/50 rounded border border-zinc-800 mt-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 accent-[#D4AF37] cursor-pointer"
                        />
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          By continuing, you agree to Murgdur's <a href="/conditions-of-use" className="text-[#D4AF37] cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">Conditions of Use</a> and <a href="/privacy-notice" className="text-[#D4AF37] cursor-pointer hover:underline" target="_blank" rel="noopener noreferrer">Privacy Notice</a>.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* FORGOT FIELDS - BOXED LAYOUT */}
                {view === "forgot" && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded mb-2 text-[#D4AF37] text-xs flex gap-2 items-center">
                      <AlertCircle size={16} />
                      <span>Enter your registered email to receive a secure reset link.</span>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Registered Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-gray-400"
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>
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
                {view === "login"
                  ? "SIGN IN"
                  : view === "signup"
                    ? "SIGN UP"
                    : "SEND RESET LINK"}
              </Button>
            </form>



            {/* View Toggle */}
            {/* Simple & Unique View Toggle */}
            {(view === "login" || view === "signup") && (
              <div className="mt-12 flex flex-col items-center justify-center gap-4">
                <div className="relative w-full text-center mb-6">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-3 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      {view === "login" ? "New here?" : "Been here before?"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setView(view === "login" ? "signup" : "login")}
                  className="group relative px-8 py-3 overflow-hidden rounded-sm border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-500"
                >
                  <div className="absolute inset-0 w-0 bg-[#D4AF37] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                  <span className="relative z-10 text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                    {view === "login" ? "Create Account" : "Sign In"}
                  </span>
                </button>
              </div>
            )}
            {view === "forgot" && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setView("login")}
                  className="text-zinc-500 text-[10px] hover:text-[#D4AF37] uppercase tracking-widest transition-colors font-bold"
                >
                  Return to Vault Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Royal Dialog */}
      <AnimatePresence>
        {dialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDialog}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white border border-[#D4AF37]/30 p-8 rounded-lg max-w-sm w-full shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

              <div className="mb-6">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto border border-[#D4AF37]/20">
                  <Crown className="text-[#D4AF37]" size={28} />
                </div>
              </div>

              <h3 className="text-[#D4AF37] font-serif text-xl mb-3 tracking-widest uppercase">
                {dialog.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                {dialog.message}
              </p>

              <div className="flex gap-4">
                {dialog.type === "confirm" ? (
                  <>
                    <button
                      onClick={closeDialog}
                      className="flex-1 px-6 py-3 border border-gray-200 text-zinc-600 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        dialog.onConfirm?.();
                        closeDialog();
                      }}
                      className="flex-1 px-6 py-3 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
                    >
                      Confirm
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      if (dialog.onConfirm) dialog.onConfirm();
                      closeDialog();
                    }}
                    className="w-full px-6 py-3 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
                  >
                    Okay
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Sub Components ---

const Input = ({
  label,
  icon: Icon,
  type = "text",
  name,
  value,
  onChange,
  error,
  isPassword,
  placeholder,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputType = isPassword ? (showPass ? "text" : "password") : type;

  return (
    <div className="group space-y-2">
      <div className="flex justify-between items-end px-1">
        <label
          htmlFor={name}
          className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37]/60 group-focus-within:text-[#D4AF37] transition-colors"
        >
          {label}
        </label>
        {error && (
          <p className="text-[9px] font-bold text-red-500 uppercase tracking-widest">
            {error}
          </p>
        )}
      </div>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? "text-[#D4AF37]" : "text-zinc-700"
              }`}
            size={16}
          />
        )}
        <input
          id={name}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-transparent border-b ${error
            ? "border-red-500/50"
            : isFocused
              ? "border-[#D4AF37]"
              : "border-white/10"
            } text-white ${Icon ? "pl-8" : "pl-1"} pr-10 py-3 focus:outline-none transition-all placeholder:text-zinc-800 text-sm`}
          placeholder={placeholder}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-white transition-colors"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

const SocialButton = ({ icon: Icon, label, onClick, loading }) => (
  <button
    onClick={onClick}
    disabled={loading}
    className="relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] py-4 transition-all hover:border-[#D4AF37]/50 hover:bg-white/[0.08] group"
  >
    {loading ? (
      <Loader2 size={20} className="animate-spin text-[#D4AF37]" />
    ) : (
      <>
        <Icon
          size={20}
          className="text-[#D4AF37] transition-transform group-hover:scale-110"
        />
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-white">
          {label}
        </span>
      </>
    )}
    {/* Subtle sweep animation */}
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
  </button>
);

export default Auth;

