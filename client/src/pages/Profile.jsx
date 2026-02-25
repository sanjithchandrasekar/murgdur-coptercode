import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Auth from "./Auth";
import { fetchHeritagePage, client, fetchCustomerOrders, updateCustomerData } from "../utils/sanity";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import { useCart } from "../context/CartContext";
import {
  User,
  Package,
  MapPin,
  LogOut,
  Heart,
  Shield,
  Crown,
  ChevronRight,
  Plus,
  Trash2,
  Edit2,
  X,
  Save,
  ShoppingBag,
  CreditCard,
  Settings,
  HelpCircle,
  Bell,
  Lock,
  ChevronLeft,
  Star,
  FileText,
  Truck,
  MessageSquare,
  Send,
  Check,
  AlertCircle,
  ChevronDown,
  Smartphone,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems, moveToCart, removeFromWishlist } = useCart();

  // User State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sanityData, setSanityData] = useState(null);

  // Dialog State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "alert", // 'alert' or 'confirm'
    onConfirm: null,
  });

  const showRoyalNotice = (title, message, type = "alert", onConfirm = null) => {
    setDialog({ isOpen: true, title, message, type, onConfirm });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }));
  };

  // UI State
  const [activeTab, setActiveTab] = useState("overview");

  // Modals State
  const [activeModal, setActiveModal] = useState(null); // 'editProfile', 'addAddress', 'addCard', 'changePassword', 'trackOrder', 'chat', 'invoice'
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Data State
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Feature States
  const [settings, setSettings] = useState({
    twoFactor: false,
    emailNotifs: true,
    smsNotifs: false,
  });
  const [activeFaq, setActiveFaq] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "agent",
      text: "Welcome to Royal Concierge. How may I assist you today?",
    },
  ]);

  // Forms
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });
  const [newAddress, setNewAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    type: "Home",
  });
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    // Load User
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setEditForm({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        email: parsedUser.email || "",
        mobile: parsedUser.mobile || "",
      });

      if (parsedUser.email || parsedUser.mobile) {
        fetchSanityData(parsedUser.email, parsedUser.mobile);
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    setAddresses(JSON.parse(localStorage.getItem("savedAddresses") || "[]"));
    setOrders(JSON.parse(localStorage.getItem("orderHistory") || "[]"));
    setCards(JSON.parse(localStorage.getItem("savedCards") || "[]"));

    const sel = JSON.parse(localStorage.getItem("selectedAddress") || "null");
    if (sel) setSelectedAddressId(sel.id);

    // Handle redirected actions
    if (location.state?.action === "addAddress") {
      navigate("/complete-profile", { state: { returnUrl: "/profile" } });
    }
    // Handle activeTab from navigation state (e.g. after order placement)
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const fetchSanityData = async (email, mobile) => {
    try {
      const query = `* [_type == "customer" && (email == $email || mobile == $mobile)][0]`;
      const data = await client.fetch(query, { email, mobile });
      if (data) {
        setSanityData(data);
        // Also update user state to match Sanity
        const mergedUser = {
          ...user,
          _id: data._id,
          firstName: data.firstName || user?.firstName,
          lastName: data.lastName || user?.lastName,
          email: data.email || user?.email,
          mobile: data.mobile || user?.mobile,
        };
        setUser(mergedUser);
        localStorage.setItem("userProfile", JSON.stringify(mergedUser));

        // Populate edit form
        setEditForm({
          firstName: mergedUser.firstName || "",
          lastName: mergedUser.lastName || "",
          email: mergedUser.email || "",
          mobile: mergedUser.mobile || "",
        });

        // Sync Addresses
        if (data.addresses && data.addresses.length > 0) {
          setAddresses(data.addresses);
          localStorage.setItem("savedAddresses", JSON.stringify(data.addresses));
        }

        // Sync Cards
        if (data.savedCards && data.savedCards.length > 0) {
          setCards(data.savedCards);
          localStorage.setItem("savedCards", JSON.stringify(data.savedCards));
        }

        // Fetch Orders
        const orderHistory = await fetchCustomerOrders(mergedUser.email);
        setOrders(orderHistory || []);
      }
    } catch (error) {
      console.error("Failed to fetch profile from Sanity:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    showRoyalNotice(
      "Sign Out",
      "Are you sure you want to sign out?",
      "confirm",
      () => {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("selectedAddress");
        setUser(null);
        window.location.reload();
      }
    );
  };

  // --- Actions ---

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updatedUser = { ...user, ...editForm };
      setUser(updatedUser);
      localStorage.setItem("userProfile", JSON.stringify(updatedUser));

      // If we have a Sanity ID, update it there too
      if (user?._id) {
        await client
          .patch(user._id)
          .set({
            firstName: editForm.firstName,
            lastName: editForm.lastName,
            email: editForm.email,
            mobile: editForm.mobile,
          })
          .commit();
        console.log("Sanity profile synced successfully.");
      }

      setActiveModal(null);
      showRoyalNotice("Success", "Your profile has been updated.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      showRoyalNotice("Notice", "Profile updated locally, but syncing failed.");
    } finally {
      setLoading(false);
    }
  };



  const handleSetDefaultAddress = (addr) => {
    localStorage.setItem("selectedAddress", JSON.stringify(addr));
    setSelectedAddressId(addr.id);
  };

  const handleDeleteAddress = (id) => {
    showRoyalNotice(
      "Remove Address",
      "Are you sure you want to remove this address?",
      "confirm",
      () => {
        const updated = addresses.filter((a) => a.id !== id);
        setAddresses(updated);
        localStorage.setItem("savedAddresses", JSON.stringify(updated));

        // Sync with Sanity
        if (user?._id) {
          updateCustomerData(user._id, { addresses: updated });
        }

        // If deleted was selected, clear selected
        if (selectedAddressId === id) {
          localStorage.removeItem("selectedAddress");
          setSelectedAddressId(null);
          // If there are other addresses, select the first one
          if (updated.length > 0) {
            handleSetDefaultAddress(updated[0]);
          }
        }
      }
    );
  };

  const handleAddCard = () => {
    if (!newCard.number || !newCard.expiry)
      return showRoyalNotice("Invalid Detail", "Please provide valid card information.");
    const cardObj = {
      id: Date.now(),
      last4: newCard.number.slice(-4),
      name: newCard.name,
      expiry: newCard.expiry,
      type: "Visa",
    };
    const updated = [...cards, cardObj];
    setCards(updated);
    localStorage.setItem("savedCards", JSON.stringify(updated));

    // Sync with Sanity
    if (user?._id) {
      updateCustomerData(user._id, { savedCards: updated });
    }

    setActiveModal(null);
    setNewCard({ number: "", name: "", expiry: "", cvv: "" });
  };

  const handleDeleteCard = (id) => {
    showRoyalNotice(
      "Remove Card",
      "Are you sure you want to remove this payment method?",
      "confirm",
      () => {
        const updated = cards.filter((c) => c.id !== id);
        setCards(updated);
        localStorage.setItem("savedCards", JSON.stringify(updated));

        // Sync with Sanity
        if (user?._id) {
          updateCustomerData(user._id, { savedCards: updated });
        }
      }
    );
  };

  const handleChangePassword = () => {
    if (passwordForm.new !== passwordForm.confirm)
      return showRoyalNotice("Mismatch", "New passwords do not match.");
    if (passwordForm.new.length < 6)
      return showRoyalNotice("Security Notice", "Password must be at least 6 characters.");
    showRoyalNotice("Success", "Your password has been updated.");
    setActiveModal(null);
    setPasswordForm({ current: "", new: "", confirm: "" });
  };

  const handleChatSend = () => {
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "user", text: chatMessage }]);

    // Mock Reply
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: "agent",
          text: "Thank you. A specialist is reviewing your request.",
        },
      ]);
    }, 1000);

    setChatMessage("");
  };

  const openTrackOrder = (order) => {
    setSelectedOrder(order);
    setActiveModal("trackOrder");
  };

  const openInvoice = (order) => {
    setSelectedOrder(order);
    setActiveModal("invoice");
  };

  const userData = sanityData || user;
  const fullName = userData?.firstName
    ? `${userData.firstName} ${userData.lastName} `
    : userData?.name || "Guest";
  const userInitials = fullName
    ? fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
    : "U";

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  if (!user) return <Auth returnUrl={location.state?.returnUrl} />;

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Help & Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-24 px-6 md:px-12 selection:bg-[#D4AF37] selection:text-black font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <div className="mb-6">
          <BackButton className="text-zinc-500 hover:text-black" />
        </div>

        {/* ── MOBILE: compact user card + horizontal tab navigation (hidden on desktop) ── */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex items-center gap-4 bg-gray-50 rounded-lg border border-gray-100 p-4">
            <div
              className="w-12 h-12 rounded-full bg-gray-100 border-2 border-[#D4AF37]/30 flex items-center justify-center shrink-0 cursor-pointer"
              onClick={() => setActiveModal("editProfile")}
            >
              <span className="text-base font-serif text-[#D4AF37]">{userInitials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-gray-900 font-medium text-sm truncate">{fullName}</p>
              <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest">Silver Member</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 shrink-0 p-1"
              title="Sign Out"
            >
              <LogOut size={18} />
            </button>
          </div>
          <div className="flex overflow-x-auto gap-2 scrollbar-hide pb-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-[10px] uppercase tracking-wider font-bold rounded-full border transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                    : "bg-transparent text-zinc-400 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                <item.icon size={12} />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar — desktop only */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
            <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden sticky top-32">
              <div className="h-24 bg-gradient-to-r from-[#D4AF37]/20 via-[#0F0F0F] to-[#0F0F0F] relative">
                <div className="absolute -bottom-10 left-6">
                  <div
                    className="w-20 h-20 rounded-full bg-gray-100 border-4 border-white flex items-center justify-center shadow-2xl relative group cursor-pointer"
                    onClick={() => setActiveModal("editProfile")}
                  >
                    <span className="text-2xl font-serif text-[#D4AF37] tracking-widest">
                      {userInitials}
                    </span>
                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Edit2 size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <h2 className="text-lg font-medium text-gray-900 tracking-wide truncate">
                  {fullName}
                </h2>
                <div className="space-y-1.5 mt-2">
                  {userData.email && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-gray-50 rounded border border-gray-100">
                      <FileText size={10} className="text-zinc-500" />
                      <p className="text-zinc-400 text-[9px] uppercase tracking-wider truncate flex-1">
                        {userData.email}
                      </p>
                    </div>
                  )}
                  {userData.mobile && (
                    <div className="flex items-center gap-2 px-2 py-1 bg-[#D4AF37]/5 rounded border border-[#D4AF37]/10">
                      <Smartphone size={10} className="text-[#D4AF37]" />
                      <p className="text-[#D4AF37] text-[9px] uppercase tracking-wider truncate flex-1">
                        {userData.mobile}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-100 flex items-center gap-3">
                  <Crown className="text-[#D4AF37]" size={20} />
                  <div className="w-full">
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                        Silver Member
                      </p>
                      <p className="text-zinc-500 text-[10px]">2,500 pts</p>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4AF37] w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              <nav className="p-2 border-t border-gray-100">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-5 py-4 text-sm transition-all rounded-md group mb-2 ${activeTab === item.id
                      ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium border-l-2 border-[#D4AF37]"
                      : "text-zinc-400 hover:bg-gray-50 hover:text-gray-900 border-l-2 border-transparent"
                      } `}
                  >
                    <div className="flex items-center gap-6">
                      <item.icon
                        size={20}
                        className={
                          activeTab === item.id
                            ? "text-[#D4AF37]"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }
                      />
                      <span className="tracking-wide">{item.label}</span>
                    </div>
                    {activeTab === item.id && (
                      <ChevronRight size={14} className="text-[#D4AF37]" />
                    )}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-6 px-5 py-4 text-sm text-red-400 hover:bg-red-500/10 transition-all rounded-md mt-6 group"
                >
                  <LogOut size={20} className="text-red-400/70 group-hover:text-red-400" />
                  <span className="tracking-wide">Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[500px]"
              >
                {/* Header */}
                <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h1 className="text-3xl font-light text-gray-900 mb-1 font-serif tracking-wide capitalize">
                      {activeTab === "wishlist"
                        ? "Wishlist"
                        : activeTab.replace(/([A-Z])/g, " $1").trim()}
                    </h1>
                    <p className="text-zinc-500 text-sm">
                      Manage your account activity and preferences.
                    </p>
                  </div>
                  <Crown
                    className="text-[#D4AF37]/20 hidden md:block"
                    size={48}
                    strokeWidth={1}
                  />
                </div>

                {/* TAB: OVERVIEW */}
                {activeTab === "overview" && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className="bg-gray-50 border border-gray-100 p-6 rounded-lg group hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                        onClick={() => setActiveTab("orders")}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-gray-100 rounded-md text-[#D4AF37]">
                            <Package size={20} />
                          </div>
                        </div>
                        <h3 className="text-2xl text-gray-900 font-medium mb-1">
                          {orders.length}
                        </h3>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider">
                          Total Orders
                        </p>
                      </div>
                      <div
                        className="bg-gray-50 border border-gray-100 p-6 rounded-lg group hover:border-[#D4AF37]/30 transition-all cursor-pointer"
                        onClick={() => setActiveTab("wishlist")}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-gray-100 rounded-md text-[#D4AF37]">
                            <Heart size={20} />
                          </div>
                        </div>
                        <h3 className="text-2xl text-gray-900 font-medium mb-1">
                          {wishlistItems.length}
                        </h3>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider">
                          In Wishlist
                        </p>
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-6 rounded-lg group hover:border-[#D4AF37]/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-gray-100 rounded-md text-[#D4AF37]">
                            <Star size={20} />
                          </div>
                        </div>
                        <h3 className="text-xl text-gray-900 font-medium mb-1">
                          Silver
                        </h3>
                        <p className="text-zinc-500 text-xs uppercase tracking-wider">
                          Current Tier
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg text-gray-900 font-medium">
                            Personal Details
                          </h3>
                          <button
                            onClick={() => setActiveModal("editProfile")}
                            className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:text-gray-700 transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                              Full Name
                            </p>
                            <p className="text-gray-900 text-sm font-medium">
                              {fullName}
                            </p>
                          </div>
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                              Email Address
                            </p>
                            <p className="text-gray-900 text-sm font-medium">
                              {userData.email || "Not Provided"}
                            </p>
                          </div>
                          <div>
                            <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                              Mobile Number
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="p-1 px-1.5 bg-[#D4AF37]/10 rounded border border-[#D4AF37]/20">
                                <Smartphone
                                  size={10}
                                  className="text-[#D4AF37]"
                                />
                              </div>
                              <p className="text-[#D4AF37] text-sm font-semibold tracking-wide">
                                {userData.mobile || "Not Provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-lg text-gray-900 font-medium">
                            Quick Actions
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setActiveModal("trackOrder")}
                            className="p-4 bg-gray-50 border border-gray-100 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-center"
                          >
                            <Truck
                              className="mx-auto mb-2 text-[#D4AF37]"
                              size={20}
                            />
                            <span className="text-xs text-gray-900 uppercase font-bold">
                              Track
                            </span>
                          </button>
                          <button
                            onClick={() => navigate("/complete-profile", { state: { returnUrl: "/profile" } })}
                            className="p-4 bg-gray-50 border border-gray-100 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-center"
                          >
                            <MapPin
                              className="mx-auto mb-2 text-[#D4AF37]"
                              size={20}
                            />
                            <span className="text-xs text-gray-900 uppercase font-bold">
                              Address
                            </span>
                          </button>
                          <button
                            onClick={() => setActiveModal("chat")}
                            className="p-4 bg-gray-50 border border-gray-100 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-center"
                          >
                            <MessageSquare
                              className="mx-auto mb-2 text-[#D4AF37]"
                              size={20}
                            />
                            <span className="text-xs text-gray-900 uppercase font-bold">
                              Chat
                            </span>
                          </button>
                          <button
                            onClick={() => setActiveModal("changePassword")}
                            className="p-4 bg-gray-50 border border-gray-100 rounded hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all text-center"
                          >
                            <Lock
                              className="mx-auto mb-2 text-[#D4AF37]"
                              size={20}
                            />
                            <span className="text-xs text-gray-900 uppercase font-bold">
                              Security
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: ORDERS */}
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    {orders.length > 0 ? (
                      orders.map((order, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 border border-gray-100 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4"
                        >
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                              <Package size={24} className="text-zinc-600" />
                            </div>
                            <div>
                              <h4 className="text-gray-900 font-serif text-lg">
                                Order #
                                {order.id ||
                                  Math.random()
                                    .toString(36)
                                    .substr(2, 9)
                                    .toUpperCase()}
                              </h4>
                              <p className="text-zinc-500 text-sm">
                                {new Date().toLocaleDateString()} •{" "}
                                {order.items?.length || 1} items
                              </p>
                              <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] uppercase font-bold rounded">
                                Processing
                              </span>
                            </div>
                          </div>
                          <div className="text-right w-full md:w-auto">
                            <p className="text-gray-900 font-bold text-lg mb-2">
                              ₹{order.total?.toLocaleString() || "0"}
                            </p>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="secondary"
                                onClick={() => openTrackOrder(order)}
                                className="text-xs py-2 px-4 h-auto"
                              >
                                Track
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => openInvoice(order)}
                                className="text-xs py-2 px-4 bg-[#D4AF37] text-black h-auto"
                              >
                                View Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 border border-dashed border-gray-200 rounded-lg">
                        <Package
                          size={48}
                          className="text-zinc-700 mx-auto mb-4"
                        />
                        <h3 className="text-gray-900 font-serif text-xl mb-2">
                          No Recent Orders
                        </h3>
                        <Button
                          variant="primary"
                          onClick={() => navigate("/shop")}
                        >
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: ADDRESSES */}
                {activeTab === "addresses" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className={`bg-gray-50 border p-6 rounded-lg relative group transition-all ${selectedAddressId === addr.id ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]" : "border-gray-200 hover:border-gray-300"}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="bg-gray-100 text-zinc-600 text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                              <MapPin size={10} /> {addr.type}
                            </span>
                            <div className="flex items-center gap-2">
                              {selectedAddressId === addr.id ? (
                                <span className="text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                                  <Check size={10} /> Default
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleSetDefaultAddress(addr)}
                                  className="text-zinc-500 hover:text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest transition-colors"
                                >
                                  Set Default
                                </button>
                              )}
                              <button
                                onClick={() => navigate("/complete-profile", { state: { returnUrl: "/profile", editAddress: addr } })}
                                className="text-zinc-600 hover:text-[#D4AF37] transition-colors p-1"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteAddress(addr.id)}
                                className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <h4 className="text-gray-900 font-bold text-lg mb-1">
                            {addr.name}
                          </h4>
                          <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                            {addr.address}
                          </p>
                          <p className="text-zinc-500 text-xs">
                            Mobile:{" "}
                            <span className="text-zinc-300">{addr.mobile}</span>
                          </p>
                        </div>
                      ))}

                      <button
                        onClick={() => navigate("/complete-profile", { state: { returnUrl: "/profile" } })}
                        className="border border-dashed border-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:border-[#D4AF37]/50 hover:bg-white/[0.02] transition-all min-h-[200px] group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                          <Plus size={24} />
                        </div>
                        <p className="text-zinc-400 font-medium group-hover:text-gray-900">
                          Add New Address
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB: VAULT */}
                {activeTab === "wishlist" && (
                  <div className="space-y-6">
                    {wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden group hover:border-[#D4AF37]/50 transition-all"
                          >
                            <div className="aspect-[4/5] relative">
                              <img
                                src={item.image || item.images?.[0]}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                            <div className="p-4">
                              <h4 className="text-gray-900 font-serif text-lg truncate">
                                {item.name}
                              </h4>
                              <p className="text-[#D4AF37] font-medium mb-3">
                                ₹{item.price?.toLocaleString()}
                              </p>
                              <button
                                onClick={() => moveToCart(item)}
                                className="w-full py-2 bg-gray-100 hover:bg-[#D4AF37] hover:text-black text-gray-900 text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2"
                              >
                                <ShoppingBag size={14} /> Move to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 border border-dashed border-gray-200 rounded-lg">
                        <Heart
                          size={48}
                          className="text-zinc-700 mx-auto mb-4"
                        />
                        <h3 className="text-gray-900 font-serif text-xl mb-2">
                          Your Vault is Empty
                        </h3>
                        <Button
                          variant="primary"
                          onClick={() => navigate("/shop")}
                        >
                          Browse Collection
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB: PAYMENTS */}
                {activeTab === "payments" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cards.map((card) => (
                        <div
                          key={card.id}
                          className="bg-gradient-to-br from-zinc-900 to-black border border-gray-200 p-6 rounded-xl relative group hover:border-[#D4AF37]/50 transition-colors h-48 flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-gray-900 font-serif italic text-lg">
                              {card.type}
                            </span>
                            <button
                              onClick={() => handleDeleteCard(card.id)}
                              className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div>
                            <div className="flex gap-4 mb-4">
                              <span className="text-zinc-500 text-xl tracking-widest">
                                ••••
                              </span>
                              <span className="text-zinc-500 text-xl tracking-widest">
                                ••••
                              </span>
                              <span className="text-zinc-500 text-xl tracking-widest">
                                ••••
                              </span>
                              <span className="text-gray-900 text-xl tracking-widest">
                                {card.last4}
                              </span>
                            </div>
                            <div className="flex justify-between items-end">
                              <div>
                                <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-1">
                                  Card Holder
                                </p>
                                <p className="text-gray-800 font-medium uppercase tracking-wider text-sm">
                                  {card.name}
                                </p>
                              </div>
                              <div>
                                <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-1">
                                  Expires
                                </p>
                                <p className="text-gray-900 font-medium text-sm">
                                  {card.expiry}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => setActiveModal("addCard")}
                        className="border border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-[#D4AF37]/50 hover:bg-white/[0.02] transition-all h-48 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                          <Plus size={24} />
                        </div>
                        <p className="text-zinc-400 font-medium group-hover:text-gray-900">
                          Add New Card
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB: SETTINGS */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
                      <h3 className="text-lg text-gray-900 font-medium mb-6 flex items-center gap-2">
                        <Lock size={18} className="text-[#D4AF37]" /> Security
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                          <div>
                            <p className="text-gray-900 font-medium text-sm">
                              Change Password
                            </p>
                            <p className="text-zinc-500 text-xs">
                              Last changed 3 months ago
                            </p>
                          </div>
                          <Button
                            variant="secondary"
                            onClick={() => setActiveModal("changePassword")}
                            className="text-xs py-2 px-4 h-auto"
                          >
                            Update
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                          <div>
                            <p className="text-gray-900 font-medium text-sm">
                              Two-Factor Authentication
                            </p>
                            <p className="text-zinc-500 text-xs">
                              {settings.twoFactor ? "Enabled" : "Disabled"}
                            </p>
                          </div>
                          <div
                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings.twoFactor ? "bg-[#D4AF37]" : "bg-gray-300"} `}
                            onClick={() =>
                              setSettings({
                                ...settings,
                                twoFactor: !settings.twoFactor,
                              })
                            }
                          >
                            <div
                              className={`w-3 h-3 rounded-full absolute top-1 transition-all ${settings.twoFactor ? "bg-black right-1" : "bg-zinc-500 left-1"} `}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-6">
                      <h3 className="text-lg text-gray-900 font-medium mb-6 flex items-center gap-2">
                        <Bell size={18} className="text-[#D4AF37]" />{" "}
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                          <div>
                            <p className="text-gray-900 font-medium text-sm">
                              Order Updates
                            </p>
                            <p className="text-zinc-500 text-xs">
                              Receive updates about your order status
                            </p>
                          </div>
                          <div
                            className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${settings.emailNotifs ? "bg-[#D4AF37]" : "bg-gray-300"} `}
                            onClick={() =>
                              setSettings({
                                ...settings,
                                emailNotifs: !settings.emailNotifs,
                              })
                            }
                          >
                            <div
                              className={`w-3 h-3 rounded-full absolute top-1 transition-all ${settings.emailNotifs ? "bg-black right-1" : "bg-zinc-500 left-1"} `}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB: SUPPORT */}
                {activeTab === "support" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HelpCircle size={32} className="text-[#D4AF37]" />
                      </div>
                      <h3 className="text-gray-900 font-serif text-2xl mb-2">
                        How can we help?
                      </h3>
                      <p className="text-zinc-500 max-w-lg mx-auto mb-8">
                        Our royal concierge team is available to assist you.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Button
                          variant="primary"
                          onClick={() => setActiveModal("chat")}
                          className="bg-[#D4AF37] text-black"
                        >
                          Chat with Concierge
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            window.open("mailto:support@royal.com")
                          }
                        >
                          Email Support
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        "Shipping & Delivery",
                        "Returns & Exchanges",
                        "Product Care",
                        "Size Guide",
                      ].map((topic, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-100 rounded overflow-hidden"
                        >
                          <div
                            className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() =>
                              setActiveFaq(activeFaq === i ? null : i)
                            }
                          >
                            <span className="text-gray-900 font-medium text-sm">
                              {topic}
                            </span>
                            <ChevronDown
                              size={16}
                              className={`tex-in-00 transitio-ransform ${activeFaq === i ? "rotate-180" : ""} `}
                            />
                          </div>
                          {activeFaq === i && (
                            <div className="p-4 pt-0 text-zinc-400 text-sm leading-relaxed border-t border-gray-100 bg-gray-50">
                              Detailed information regarding {topic} will be
                              provided here. We facilitate global shipping with
                              insurance, offering a seamless experience for our
                              premium clients.
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- MODALS --- */}

          {/* Edit Profile */}
          {activeModal === "editProfile" && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg max-w-lg w-full animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-serif text-gray-900 mb-6">
                  Edit Profile
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={editForm.firstName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, firstName: e.target.value })
                      }
                      className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={editForm.lastName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lastName: e.target.value })
                      }
                      className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Mobile"
                    value={editForm.mobile}
                    onChange={(e) =>
                      setEditForm({ ...editForm, mobile: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleUpdateProfile}
                      className="flex-1 bg-[#D4AF37] text-black hover:bg-white border-none"
                    >
                      Save Changes
                    </Button>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-6 text-zinc-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Add Card */}
          {activeModal === "addCard" && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg max-w-lg w-full animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-serif text-gray-900 mb-6">
                  Add New Card
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={newCard.number}
                    onChange={(e) =>
                      setNewCard({ ...newCard, number: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={newCard.name}
                    onChange={(e) =>
                      setNewCard({ ...newCard, name: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                      className="bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvv: e.target.value })
                      }
                      className="bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleAddCard}
                      className="flex-1 bg-[#D4AF37] text-black hover:bg-white border-none"
                    >
                      Save Card
                    </Button>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-6 text-zinc-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Change Password */}
          {activeModal === "changePassword" && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg max-w-sm w-full animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-serif text-gray-900 mb-6">
                  Change Password
                </h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={passwordForm.current}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        current: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordForm.new}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, new: e.target.value })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={passwordForm.confirm}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirm: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-gray-300 p-3 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm"
                  />
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleChangePassword}
                      className="flex-1 bg-[#D4AF37] text-black hover:bg-white border-none"
                    >
                      Update
                    </Button>
                    <button
                      onClick={() => setActiveModal(null)}
                      className="px-6 text-zinc-500 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Modal */}
          {activeModal === "chat" && (
            <div className="fixed bottom-4 right-2 left-2 sm:left-auto sm:right-4 md:bottom-8 md:right-8 z-50 sm:w-[calc(100vw-2rem)] sm:max-w-sm md:w-96 bg-gray-50 border border-[#D4AF37] rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300 h-[500px]">
              <div className="bg-[#D4AF37] p-4 flex justify-between items-center text-black">
                <div className="flex items-center gap-2">
                  <MessageSquare size={18} />
                  <span className="font-bold uppercase tracking-wider text-sm">
                    Concierge
                  </span>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="hover:opacity-60 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                {chatHistory.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} `}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded text-sm ${msg.sender === "user"
                        ? "bg-[#D4AF37] text-black rounded-tr-none"
                        : "bg-gray-100 text-gray-900 rounded-tl-none"
                        } `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-200 bg-gray-50 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-white border border-gray-300 p-2 text-gray-900 focus:border-[#D4AF37] outline-none rounded-sm text-sm"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleChatSend()}
                />
                <button
                  onClick={handleChatSend}
                  className="bg-[#D4AF37] text-black p-2 rounded hover:bg-white transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Track Order Modal */}
          {activeModal === "trackOrder" && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg max-w-md w-full animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-serif text-gray-900 mb-6 flex items-center gap-2">
                  <Truck size={24} className="text-[#D4AF37]" /> Tracking Order
                  #{selectedOrder?.id}
                </h3>
                <div className="space-y-6 relative pl-4 border-l-2 border-gray-200 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-[#D4AF37] rounded-full border border-black"></div>
                    <p className="text-gray-900 font-medium text-sm">
                      Order Placed
                    </p>
                    <p className="text-zinc-500 text-xs">
                      We have received your order.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-200 rounded-full border border-gray-400"></div>
                    <p className="text-zinc-400 font-medium text-sm">
                      Processing
                    </p>
                    <p className="text-zinc-500 text-xs">
                      Your royal goods are being prepared.
                    </p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 bg-gray-200 rounded-full border border-gray-400"></div>
                    <p className="text-zinc-400 font-medium text-sm">Shipped</p>
                    <p className="text-zinc-500 text-xs">Pending dispatch.</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    onClick={() => setActiveModal(null)}
                    className="w-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-black"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Modal */}
          {activeModal === "invoice" && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-white text-black p-8 rounded-sm max-w-lg w-full animate-in fade-in zoom-in duration-200 shadow-xl">
                <div className="border-b-2 border-black pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-serif font-bold">INVOICE</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Royal Collection
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">#{selectedOrder?.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                    <span>Item Total</span>
                    <span>₹{selectedOrder?.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-gray-200 pb-2">
                    <span>Tax & Fees</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total Paid</span>
                    <span>₹{selectedOrder?.total?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded text-center text-xs text-gray-500 mb-6">
                  Thank you for your patronage. This is a computer generated
                  invoice.
                </div>
                <Button
                  onClick={() => setActiveModal(null)}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Close Invoice
                </Button>
              </div>
            </div>
          )}
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
                  className="relative bg-gray-100 border border-[#D4AF37]/30 p-8 rounded-lg max-w-sm w-full shadow-2xl text-center overflow-hidden"
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
                          className="flex-1 px-6 py-3 border border-gray-200 text-zinc-400 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-sm"
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
                        onClick={closeDialog}
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
      </div>
    </div>
  );
};

export default Profile;




