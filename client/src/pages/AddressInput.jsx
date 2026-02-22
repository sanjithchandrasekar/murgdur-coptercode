import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, User, Phone, Home, Briefcase, Navigation, Save, ArrowLeft, Loader2, Crown } from "lucide-react";
import Button from "../components/common/Button";
import SEO from "../components/common/SEO";
import { updateCustomerData, client } from "../utils/sanity";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../styles/PhoneInput.css";

const AddressInput = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        pincode: "",
        flatNo: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        country: "India",
        addressType: "Home",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Load logged-in user
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            // Check for edit mode
            if (location.state?.editAddress) {
                const addr = location.state.editAddress;
                setFormData({
                    name: addr.name || "",
                    mobile: addr.mobile || "",
                    pincode: addr.pincode || "",
                    flatNo: addr.addressLine ? addr.addressLine.split(",")[0].trim() : "",
                    area: addr.addressLine ? addr.addressLine.split(",").slice(1).join(",").trim() : "",
                    landmark: "", // Landmark not always reliably parsed back, leave empty or store separately in future
                    city: addr.city || "",
                    state: addr.state || "",
                    country: addr.country || "India",
                    addressType: addr.type || "Home",
                });
            } else {
                // Pre-fill name and mobile if available and NOT editing
                setFormData(prev => ({
                    ...prev,
                    name: `${parsedUser.firstName || ''} ${parsedUser.lastName || ''}`.trim() || prev.name,
                    mobile: parsedUser.mobile || prev.mobile
                }));
            }
        } else {
            // If not logged in, redirect to auth (unless we want to allow guest addresses? for now stick to auth)
            navigate("/auth");
        }
    }, [navigate, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!formData.mobile || formData.mobile.length < 8) newErrors.mobile = "Valid Mobile Number is required";
        if (!formData.pincode.trim() || formData.pincode.length < 4) newErrors.pincode = "Valid Pincode is required";
        if (!formData.flatNo.trim()) newErrors.flatNo = "Flat / House No. is required";
        if (!formData.area.trim()) newErrors.area = "Area / Street is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Construct complete address string
            const fullAddress = `${formData.flatNo}, ${formData.area}, ${formData.landmark ? formData.landmark + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}`;

            const addressPayload = {
                id: location.state?.editAddress?.id || Date.now(),
                name: formData.name,
                mobile: formData.mobile,
                pincode: formData.pincode,
                addressLine: `${formData.flatNo}, ${formData.area}`,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                type: formData.addressType,
                address: fullAddress,
                isDefault: location.state?.editAddress?.isDefault || false
            };

            // Default logic: only make default if it is the first one, OR if we are just editing keeping it same
            if (!location.state?.editAddress) {
                addressPayload.isDefault = true; // Logic below will correct this if array not empty
            }

            // 1. Update Local Storage
            const currentAddresses = JSON.parse(localStorage.getItem("savedAddresses") || "[]");
            let updatedAddresses;

            if (location.state?.editAddress) {
                // UPDATE existing
                updatedAddresses = currentAddresses.map(a =>
                    a.id === addressPayload.id ? addressPayload : a
                );
            } else {
                // ADD new
                // If there are already addresses, this one shouldn't be default unless user explicitly sets it (feature for later)
                // For now, keep the "First address is default" logic effectively
                if (currentAddresses.length > 0) addressPayload.isDefault = false;

                updatedAddresses = [...currentAddresses, addressPayload];
            }

            localStorage.setItem("savedAddresses", JSON.stringify(updatedAddresses));

            // If we edited or added the one that was currently "selected", update that too
            const selectedAddr = JSON.parse(localStorage.getItem("selectedAddress") || "null");
            if (selectedAddr?.id === addressPayload.id || (!selectedAddr && updatedAddresses.length > 0)) {
                localStorage.setItem("selectedAddress", JSON.stringify(addressPayload));
            }

            // 2. Update Sanity Backend if user logged in
            if (user?._id) {
                // Update Sanity
                await updateCustomerData(user._id, { addresses: updatedAddresses });

                // Update MongoDB
                const apiUrl = import.meta.env.VITE_API_URL || "/api";
                try {
                    await fetch(`${apiUrl}/auth/update-addresses`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ userId: user._id, addresses: updatedAddresses }),
                    });
                } catch (mongoErr) {
                    console.error("Failed to sync with MongoDB:", mongoErr);
                }
            }

            // Success Animation & Redirect
            setTimeout(() => {
                if (location.state?.returnUrl) {
                    navigate(location.state.returnUrl);
                } else {
                    navigate("/");
                }
            }, 1000);

        } catch (error) {
            console.error("Address save error:", error);
            // Fallback to local only if server fails
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            <SEO title="Complete Your Profile | Murgdur" description="Add your delivery address." />

            {/* Decorative Background */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-3xl bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0F0F0F] via-[#1a1a1a] to-[#0F0F0F] p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20">
                                <MapPin className="text-[#D4AF37]" size={20} />
                            </div>
                            <h1 className="text-2xl font-serif text-[#D4AF37] tracking-widest uppercase">Delivery Details</h1>
                        </div>
                        <p className="text-zinc-500 text-sm">Please finalize your address for a premium delivery experience.</p>
                    </div>
                    <Crown className="text-[#D4AF37]/10 hidden md:block" size={64} />
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Section 1: Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                            <User size={14} /> Contact Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-[#050505] border ${errors.name ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700`}
                                    placeholder="Recipient Name"
                                />
                                {errors.name && <p className="text-red-500 text-[10px] ml-1">{errors.name}</p>}
                            </div>

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
                                        inputClass="!bg-[#050505] !text-white !w-full !h-12 !border-none !rounded focus:!ring-0"
                                        buttonClass="!bg-[#050505] !border-r !border-zinc-800 !rounded-l hover:!bg-zinc-900"
                                        dropdownClass="!bg-[#141414] !text-white !border !border-zinc-800 !shadow-xl"
                                        searchClass="!bg-zinc-900 !text-white !border-zinc-700 hover:!border-[#D4AF37]"
                                    />
                                </div>
                                {errors.mobile && <p className="text-red-500 text-[10px] ml-1">{errors.mobile}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[1px] bg-white/5" />

                    {/* Section 2: Address Details */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                            <Navigation size={14} /> Location Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Pincode</label>
                                <input
                                    type="number"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    maxLength={6}
                                    className={`w-full bg-[#050505] border ${errors.pincode ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700 tracking-widest`}
                                    placeholder="000000"
                                />
                                {errors.pincode && <p className="text-red-500 text-[10px] ml-1">{errors.pincode}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">City / District</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full bg-[#050505] border ${errors.city ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700`}
                                    placeholder="City Name"
                                />
                                {errors.city && <p className="text-red-500 text-[10px] ml-1">{errors.city}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className={`w-full bg-[#050505] border ${errors.state ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700`}
                                    placeholder="State Name"
                                />
                                {errors.state && <p className="text-red-500 text-[10px] ml-1">{errors.state}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Landmark (Optional)</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    className="w-full bg-[#050505] border border-zinc-800 text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700"
                                    placeholder="e.g. Near Central Park"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Flat, House no., Building, Company, Apartment</label>
                            <input
                                type="text"
                                name="flatNo"
                                value={formData.flatNo}
                                onChange={handleChange}
                                className={`w-full bg-[#050505] border ${errors.flatNo ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700`}
                                placeholder="e.g. Flat 402, Royal Residency"
                            />
                            {errors.flatNo && <p className="text-red-500 text-[10px] ml-1">{errors.flatNo}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Area, Street, Sector, Village</label>
                            <input
                                type="text"
                                name="area"
                                value={formData.area}
                                onChange={handleChange}
                                className={`w-full bg-[#050505] border ${errors.area ? 'border-red-500' : 'border-zinc-800'} text-white px-4 py-3 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all placeholder:text-zinc-700`}
                                placeholder="e.g. MG Road, Indiranagar"
                            />
                            {errors.area && <p className="text-red-500 text-[10px] ml-1">{errors.area}</p>}
                        </div>
                    </div>

                    {/* Section 3: Type */}
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase text-zinc-400 font-bold tracking-wider ml-1">Address Type</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, addressType: "Home" }))}
                                className={`flex-1 py-3 border rounded flex items-center justify-center gap-2 transition-all ${formData.addressType === "Home" ? "bg-[#D4AF37] border-[#D4AF37] text-black" : "bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600"}`}
                            >
                                <Home size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Home</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, addressType: "Work" }))}
                                className={`flex-1 py-3 border rounded flex items-center justify-center gap-2 transition-all ${formData.addressType === "Work" ? "bg-[#D4AF37] border-[#D4AF37] text-black" : "bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-600"}`}
                            >
                                <Briefcase size={16} /> <span className="text-xs font-bold uppercase tracking-widest">Work</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/")}
                            className="flex-1 py-4 border-zinc-800 text-zinc-400 hover:text-white"
                        >
                            Skip for Now
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-[2] py-4 bg-[#D4AF37] text-black font-bold tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-[#D4AF37]/20 border-none flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                            {loading ? "SAVING..." : "SAVE & CONTINUE"}
                        </Button>
                    </div>

                </form>
            </motion.div>
        </div>
    );
};

export default AddressInput;
