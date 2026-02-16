import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  Facebook,
  Github,
  Chrome,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Globe,
  Smartphone,
  ShieldCheck,
  Crown,
  Star,
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

const Auth = () => {
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
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
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
          showRoyalNotice("Welcome Back", "You have successfully signed in.", "success", () => navigate("/"));
        } else {
          setErrors({ auth: "Invalid email or password" });
        }
      } else if (view === "signup") {
        // Register via MongoDB Backend
        const apiUrl = import.meta.env.VITE_API_URL || "/api";
        const response = await fetch(`${apiUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
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
          showRoyalNotice("Registration Complete", "Your account has been successfully created.", "success", () => navigate("/"));
        } else {
          setErrors({
            email: "User with this email already exists",
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

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "/api";
        const res = await fetch(`${apiUrl}/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await res.json();

        if (res.ok) {
          const userProfile = {
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ")[1] || "",
            email: data.email,
            mobile: data.mobile || "",
            isMember: data.isMember !== undefined ? data.isMember : true,
            tier: data.tier || "Silver",
            role: data.role || "user",
            _id: data._id,
            token: data.token,
            source: "google",
          };
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          showRoyalNotice("Welcome Back", "You have successfully signed in with Google.", "success", () => navigate("/"));
        } else {
          setErrors({ auth: "Google Sign-In failed. Please try again." });
        }
      } catch (error) {
        console.error("Google Auth Error:", error);
        setErrors({ auth: "Connection failed during Google Sign-In." });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setLoading(false);
      setErrors({ auth: "Google Sign-In was cancelled or failed." });
    },
  });

  const handleSocialLogin = (platform) => {
    if (platform === "Google") {
      setLoading(true);
      googleLoginHandler();
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
    <div className="min-h-screen bg-[#050505] flex text-white font-sans overflow-hidden">
      <SEO
        title={seoData.title}
        description={seoData.description}
        url={`https://murugdur1.vercel.app/auth?view=${view}`}
      />

      {/* --- LEFT: IMMERSIVE EXPERIENCE --- */}
      <div className="hidden lg:flex w-5/12 relative flex-col justify-between p-16 overflow-hidden transition-all duration-1000">
        {/* Background Carousel */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "circOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={CAROUSEL_IMAGES[bgIndex]}
              className="w-full h-full object-cover brightness-[0.4]"
              alt="Luxury Backdrop"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          </motion.div>
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-20 h-full flex flex-col justify-between">
          {/* Brand Logo-Top Left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-5"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-black/40 shadow-[0_0_30px_rgba(212,175,55,0.2)] backdrop-blur-md overflow-hidden">
              <img src="/images/logo.jpeg" alt="Murgdur Logo" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-1">
              <h1 className="font-serif text-3xl font-bold tracking-[0.2em] uppercase text-white">
                Murgdur
              </h1>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
                The Royal Heritage
              </p>
            </div>
          </motion.div>

          {/* Dynamic Quote-Center Area */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={bgIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-md space-y-8"
              >
                <div className="h-0.5 w-16 bg-[#D4AF37]" />
                <p className="font-serif text-4xl leading-[1.2] italic text-white lg:text-5xl">
                  "{TESTIMONIALS[bgIndex].text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[#D4AF37]/50" />
                  <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37]">
                    {TESTIMONIALS[bgIndex].author}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stats / Trust-Bottom Area */}
          <div className="flex items-center gap-12 border-t border-white/10 pt-10">
            {[
              { label: "Members", val: "50k+" },
              { label: "Authentic", val: "100%" },
              { label: "Concierge", val: "24/7" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="space-y-1"
              >
                <p className="font-serif text-2xl font-bold text-white">
                  {stat.val}
                </p>
                <p className="text-[10px] tracking-widest uppercase text-zinc-500">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT: INTERACTIVE FORM --- */}
      <div className="relative flex w-full flex-col bg-[#050505] lg:w-7/12">
        {/* Decorative Light Glow */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px]" />

        {/* Top Navigation */}
        <div className="z-40 flex w-full items-center justify-between p-6 md:p-10">
          <div className="flex items-center gap-3">
            {/* Logo Mark */}
            <div className="h-10 w-10 overflow-hidden rounded-full border border-[#D4AF37]/20 lg:hidden">
              <img
                src="/images/logo.jpeg"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Nav Links */}
            <div className="flex flex-col">
              <h1 className="font-serif text-lg font-bold tracking-[0.2em] uppercase text-white lg:hidden">
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
                    <img src="/images/logo.jpeg" alt="Murgdur Logo" className="w-full h-full object-cover" />
                  </div>
                  <h2 className="font-serif text-4xl text-white md:text-5xl">
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
                {/* LOGIN FIELDS */}
                {view === "login" && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-4">
                      <Input
                        label="Email Address"
                        icon={Mail}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        placeholder="name@example.com"
                      />
                      <div className="space-y-1">
                        <Input
                          label="Password"
                          icon={Lock}
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          isPassword
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setView("forgot")}
                            className="text-[10px] text-zinc-500 hover:text-[#D4AF37] transition-colors"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SIGNUP FIELDS */}
                {view === "signup" && (
                  <motion.div
                    key="signup"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        placeholder="John"
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        placeholder="Doe"
                      />
                    </div>

                    <Input
                      label="Email Address"
                      icon={Mail}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      placeholder="name@example.com"
                    />

                    <div className="relative group">
                      <label
                        htmlFor="mobile"
                        className="text-[10px] uppercase text-[#D4AF37] font-bold tracking-widest ml-1 mb-1 block"
                      >
                        Mobile Number
                      </label>
                      <div className="flex">
                        <div className="bg-[#141414] border border-white/10 border-r-0 rounded-l-sm px-3 flex items-center text-zinc-400 text-sm gap-1">
                          <Globe size={14} /> +91
                        </div>
                        <input
                          id="mobile"
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className="w-full bg-[#141414] border border-white/10 text-white px-4 py-3.5 rounded-r-sm focus:border-[#D4AF37] focus:outline-none text-sm transition-all"
                          placeholder="98765 43210"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Input
                        label="Create Password"
                        icon={Lock}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        isPassword
                        placeholder="Min 8 chars"
                      />
                      {/* Strength Meter */}
                      {formData.password && (
                        <div className="flex gap-1 h-1 mt-1">
                          <div
                            className={`flex-1 rounded-full transition-colors ${passwordStrength > 0 ? "bg-red-500" : "bg-white/10"}`}
                          ></div>
                          <div
                            className={`flex-1 rounded-full transition-colors ${passwordStrength > 25 ? "bg-yellow-500" : "bg-white/10"}`}
                          ></div>
                          <div
                            className={`flex-1 rounded-full transition-colors ${passwordStrength > 50 ? "bg-blue-500" : "bg-white/10"}`}
                          ></div>
                          <div
                            className={`flex-1 rounded-full transition-colors ${passwordStrength > 75 ? "bg-green-500" : "bg-white/10"}`}
                          ></div>
                        </div>
                      )}
                    </div>

                    <Input
                      label="Confirm Password"
                      icon={ShieldCheck}
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      isPassword
                      placeholder="Re-enter password"
                    />

                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded border border-white/5">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-1 accent-[#D4AF37]"
                        id="terms"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-zinc-400 cursor-pointer"
                      >
                        I agree to Murgdur's{" "}
                        <span className="text-white hover:underline">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-white hover:underline">
                          Privacy Policy
                        </span>
                        .
                      </label>
                    </div>
                    {errors.agreeTerms && (
                      <p className="text-red-500 text-[10px]">
                        {errors.agreeTerms}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* FORGOT FIELDS */}
                {view === "forgot" && (
                  <motion.div
                    key="forgot"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded mb-4 text-[#D4AF37] text-xs flex gap-2">
                      <AlertCircle size={16} /> Enter your registered email to
                      receive a secure reset link.
                    </div>
                    <Input
                      label="Registered Email"
                      icon={Mail}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                    />
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

            {/* Social Login */}
            {view !== "forgot" && (
              <div className="mt-8">
                <div className="relative mb-8 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <span className="relative bg-[#050505] px-4 text-[10px] uppercase tracking-[0.3em] font-medium text-zinc-600">
                    Or continue with
                  </span>
                </div>
                <div className="flex justify-center">
                  <SocialButton
                    icon={Chrome}
                    label="Continue with Google"
                    onClick={() => handleSocialLogin("Google")}
                    loading={loading}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* View Toggle */}
            {view === "login" && (
              <div className="mt-10 text-center space-y-4">
                <button
                  onClick={() => setView("signup")}
                  className="text-white text-xs hover:text-[#D4AF37] uppercase tracking-widest transition-colors font-bold border-b border-transparent hover:border-[#D4AF37] pb-1"
                >
                  New to Murgdur? Create Account
                </button>
                <p className="text-zinc-600 text-[11px] uppercase tracking-widest">
                  Restricted Access • Sovereignty Collection
                </p>
              </div>
            )}

            {view === "signup" && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setView("login")}
                  className="text-zinc-500 text-[10px] hover:text-[#D4AF37] uppercase tracking-widest transition-colors font-bold"
                >
                  Already have an account? Sign In
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
              className="relative bg-[#141414] border border-[#D4AF37]/30 p-8 rounded-lg max-w-sm w-full shadow-2xl text-center overflow-hidden"
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
                      className="flex-1 px-6 py-3 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors rounded-sm"
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
