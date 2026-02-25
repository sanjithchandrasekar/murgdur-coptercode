import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  Plus,
  CheckCircle,
  Trash2,
  Edit2,
  Crown,
} from "lucide-react";
import Button from "../components/common/Button";
import BackButton from "../components/common/BackButton";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder } from "../utils/sanity";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const user = JSON.parse(localStorage.getItem("userProfile") || "null");

  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);

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

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
    type: "Home",
  });

  useEffect(() => {
    // Load addresses from local storage
    const storedAddresses = JSON.parse(
      localStorage.getItem("savedAddresses") || "[]",
    );
    setSavedAddresses(storedAddresses);

    // Prioritize previously selected global address
    const globalSelected = JSON.parse(
      localStorage.getItem("selectedAddress") || "null",
    );
    if (globalSelected) {
      setSelectedAddressId(globalSelected.id);
    } else if (storedAddresses.length > 0) {
      // Fallback to first one
      setSelectedAddressId(storedAddresses[0].id);
      localStorage.setItem("selectedAddress", JSON.stringify(storedAddresses[0]));

    } else {
      // If no addresses, prompt to add one
      // Optionally redirect: navigate("/complete-profile", { state: { returnUrl: "/checkout" } });
    }
  }, []);

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr.id);
    localStorage.setItem("selectedAddress", JSON.stringify(addr));
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.name ||
      !newAddress.mobile ||
      !newAddress.addressLine ||
      !newAddress.pincode
    ) {
      showRoyalNotice("Incomplete", "Please fill in all address details.");
      return;
    }

    const addressObj = {
      id: Date.now(),
      name: newAddress.name,
      mobile: newAddress.mobile,
      address: `${newAddress.addressLine}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`,
      type: newAddress.type,
    };

    const updatedList = [...savedAddresses, addressObj];
    setSavedAddresses(updatedList);
    localStorage.setItem("savedAddresses", JSON.stringify(updatedList));

    // Select this new address
    setSelectedAddressId(addressObj.id);
    localStorage.setItem("selectedAddress", JSON.stringify(addressObj));

    // Reset and close form
    setNewAddress({
      name: "",
      mobile: "",
      pincode: "",
      city: "",
      state: "",
      addressLine: "",
      type: "Home",
    });
    setShowAddAddress(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      showRoyalNotice(
        "Address Required",
        "Please select a delivery address."
      );
      return;
    }

    const selectedAddr = savedAddresses.find((a) => a.id === selectedAddressId);

    const orderData = {
      orderNumber: `ORD-${Date.now()}`,
      customer: user?._id ? { _type: "reference", _ref: user._id } : undefined,
      items: cartItems.map((item) => ({
        productId: item.id.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image,
      })),
      totalAmount: getCartTotal(),
      shippingAddress: selectedAddr
        ? `${selectedAddr.name}, ${selectedAddr.address}`
        : "No Address Provided",
      paymentMethod: "Cash on Delivery", // Mock payment method
      status: "ordered",
    };

    const result = await createOrder(orderData);

    if (result) {
      clearCart();
      showRoyalNotice(
        "Order Placed",
        "Your order has been placed successfully! Track it in your profile.",
        "alert",
        () => {
          navigate("/profile", { state: { activeTab: "orders" } });
        }
      );
    } else {
      showRoyalNotice(
        "Order Failed",
        "There was an error placing your order. Please try again."
      );
    }
  };

  const selectedAddress = savedAddresses.find(
    (a) => a.id === selectedAddressId,
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 px-6 md:px-12 font-sans text-gray-900">
      <div className="container mx-auto max-w-7xl relative">
        <div className="mb-8">
          <BackButton className="text-gray-400 hover:text-royal-gold" />
        </div>
        <h1 className="text-3xl font-serif text-royal-gold mb-8 text-center">
          Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDE: Process Steps */}
          <div className="lg:w-2/3 space-y-6">
            {/* Step 1: Delivery Address */}
            <div
              className={`bg-gray-50 border ${step === 1 ? "border-royal-gold" : "border-gray-200"} rounded-sm transition-all overflow-hidden`}
            >
              {/* Header */}
              <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? "bg-royal-gold text-black" : "bg-gray-700 text-gray-400"}`}
                  >
                    1
                  </span>
                  Delivery Address
                </h2>
                {step > 1 && (
                  <button
                    onClick={() => setStep(1)}
                    className="text-royal-gold text-sm font-bold uppercase border border-royal-gold/30 px-4 py-1 hover:bg-royal-gold hover:text-black transition-all"
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {/* Content */}
              {step === 1 && (
                <div className="p-6 space-y-6">
                  {/* Saved Addresses List */}
                  <div className="space-y-4">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => handleAddressSelect(addr)}
                        className={`border p-4 rounded-sm cursor-pointer relative transition-all ${selectedAddressId === addr.id ? "border-royal-gold bg-royal-gold/5" : "border-gray-200 hover:border-gray-400"}`}
                      >
                        <div className="flex items-start gap-6">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${selectedAddressId === addr.id ? "border-royal-gold" : "border-gray-500"}`}
                          >
                            {selectedAddressId === addr.id && (
                              <div className="w-3 h-3 bg-royal-gold rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                              <span className="font-bold text-gray-900 text-lg">
                                {addr.name}
                              </span>
                              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded uppercase font-bold">
                                {addr.type}
                              </span>
                              <span className="text-gray-900 font-bold">
                                {addr.mobile}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate("/complete-profile", {
                                    state: {
                                      returnUrl: "/checkout",
                                      editAddress: addr,
                                    },
                                  });
                                }}
                                className="ml-auto text-gray-500 hover:text-royal-gold p-1 transition-colors"
                              >
                                <Edit2 size={16} />
                              </button>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {addr.address}
                            </p>

                            {selectedAddressId === addr.id && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setStep(2);
                                }}
                                className="mt-4 py-3 px-8 text-xs bg-royal-gold text-black hover:bg-white"
                              >
                                DELIVER HERE
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address Toggle */}
                  {/* Add New Address Button */}
                  <button
                    onClick={() => navigate("/complete-profile", { state: { returnUrl: "/checkout" } })}
                    className="flex items-center gap-2 text-royal-gold font-bold uppercase tracking-widest text-sm py-4 w-full border border-dashed border-gray-300 hover:border-royal-gold hover:bg-gray-50 justify-center transition-all"
                  >
                    <Plus size={18} /> Add New Address
                  </button>
                </div>
              )}

              {/* Minimized View for Step 1 when Step 2 is active */}
              {step > 1 && selectedAddress && (
                <div className="p-6 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">
                        {selectedAddress.name}
                      </span>
                      <span className="bg-gray-100 text-[10px] px-2 rounded uppercase font-bold text-gray-600">
                        {selectedAddress.type}
                      </span>
                      <span className="text-gray-600 text-sm ml-2">
                        {selectedAddress.mobile}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {selectedAddress.address}
                    </p>
                  </div>
                  <CheckCircle className="text-royal-gold hidden md:block" />
                </div>
              )}
            </div>

            {/* Step 2: Payment Options */}
            <div
              className={`bg-white border ${step === 2 ? "border-royal-gold" : "border-gray-200"} rounded-sm transition-all overflow-hidden`}
            >
              <div className="p-4 md:p-6 bg-gray-50 border-b border-gray-100">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? "bg-royal-gold text-black" : "bg-gray-700 text-gray-400"}`}
                  >
                    2
                  </span>
                  Payment Options
                </h2>
              </div>

              {step === 2 && (
                <div className="p-6 space-y-4">
                  <div className="border border-royal-gold bg-royal-gold/10 p-4 rounded flex items-center gap-4 cursor-pointer">
                    <div className="w-5 h-5 rounded-full border border-royal-gold flex items-center justify-center">
                      <div className="w-3 h-3 bg-royal-gold rounded-full"></div>
                    </div>
                    <CreditCard className="text-royal-gold" />
                    <div>
                      <p className="font-bold">Credit/Debit Card</p>
                      <p className="text-xs text-gray-400">
                        Visa, Mastercard, RuPay
                      </p>
                    </div>
                  </div>
                  {/* Other dummy payment options */}
                  <div className="border border-gray-200 p-4 rounded flex items-center gap-4 cursor-pointer hover:border-gray-400 opacity-50">
                    <div className="w-5 h-5 rounded-full border border-gray-500"></div>
                    <div className="text-blue-400 font-bold">UPI</div>
                    <p className="font-bold">Google Pay / PhonePe / UPI</p>
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    variant="gold"
                    className="w-full py-4 shadow-[0_0_15px_rgba(212,175,55,0.3)] mt-6"
                  >
                    CONFIRM ORDER
                  </Button>

                  <div className="flex gap-2 mt-4 text-xs text-gray-400 justify-center">
                    <ShieldCheck size={16} className="text-green-400" />
                    <p>100% Safe & Secure Payment</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Mini Order Summary (Same as before but styled) */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 border border-gray-200 rounded-sm sticky top-28 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-gray-600 uppercase font-bold text-xs tracking-widest">
                  Price Details
                </h3>
              </div>

              <div className="p-6 space-y-4">
                {(() => {
                  const totalMRP = cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
                  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
                  const totalSellingPrice = totalMRP - totalDiscount;
                  const deliveryFee = totalSellingPrice > 5000 ? 0 : 500;
                  const total = totalSellingPrice + 20 + deliveryFee;
                  return (
                    <>
                      <div className="flex justify-between text-sm text-gray-900">
                        <span>Price ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                        <span>₹{totalSellingPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-900">
                        <span>Platform Fee</span>
                        <span>₹20</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-900">
                        <span>Delivery Charges</span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-400">Free</span>
                        ) : (
                          <span>₹{deliveryFee}</span>
                        )}
                      </div>
                      <div className="border-t border-dashed border-gray-300 pt-4 mt-4">
                        <div className="flex justify-between font-bold text-xl text-gray-900">
                          <span>Total Amount</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                      {totalDiscount > 0 && (
                        <div className="bg-green-900/20 border border-green-500/20 p-3 rounded text-xs text-green-400 font-medium text-center">
                          You will save ₹{totalDiscount.toLocaleString()} on this order
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>

              <div className="p-4 bg-gray-100 border-t border-gray-200 flex items-center gap-3">
                <ShieldCheck className="text-gray-500" size={24} />
                <p className="text-[10px] text-gray-500 uppercase tracking-wide">
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </p>
              </div>
            </div>
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
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {dialog.message}
              </p>

              <div className="flex gap-4">
                {dialog.type === "confirm" ? (
                  <>
                    <button
                      onClick={closeDialog}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-600 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors rounded-sm"
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
                      dialog.onConfirm?.();
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

export default Checkout;
