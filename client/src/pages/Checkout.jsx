import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Banknote, Truck, Plus, CheckCircle, Trash2, Edit2 } from 'lucide-react';
import Button from '../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showAddAddress, setShowAddAddress] = useState(false);

    // New Address Form State
    const [newAddress, setNewAddress] = useState({
        name: '',
        mobile: '',
        pincode: '',
        city: '',
        state: '',
        addressLine: '',
        type: 'Home'
    });

    useEffect(() => {
        // Load addresses from local storage
        const storedAddresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
        setSavedAddresses(storedAddresses);

        // Auto-select the first one if available
        if (storedAddresses.length > 0) {
            setSelectedAddressId(storedAddresses[0].id);
        } else {
            // If no address, show add form immediately
            setShowAddAddress(true);
        }
    }, []);

    const handleNewAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleSaveAddress = () => {
        if (!newAddress.name || !newAddress.mobile || !newAddress.addressLine || !newAddress.pincode) {
            alert("Please fill all required fields");
            return;
        }

        const addressObj = {
            id: Date.now(),
            name: newAddress.name,
            mobile: newAddress.mobile,
            address: `${newAddress.addressLine}, ${newAddress.city}, ${newAddress.state} - ${newAddress.pincode}`,
            type: newAddress.type
        };

        const updatedList = [...savedAddresses, addressObj];
        setSavedAddresses(updatedList);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedList));

        // Select this new address
        setSelectedAddressId(addressObj.id);

        // Reset and close form
        setNewAddress({ name: '', mobile: '', pincode: '', city: '', state: '', addressLine: '', type: 'Home' });
        setShowAddAddress(false);
    };

    const handlePlaceOrder = () => {
        if (!selectedAddressId) {
            alert("Please select a delivery address");
            return;
        }
        // Mock API call
        alert("Order Placed Successfully!");
        navigate('/'); // Go back home for now, or to an order success page
    };

    const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId);

    return (
        <div className="bg-royal-black min-h-screen pt-32 pb-20 px-4 md:px-0 font-sans text-white">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-3xl font-serif text-royal-gold mb-8 text-center">Secure Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT SIDE: Process Steps */}
                    <div className="lg:w-2/3 space-y-6">

                        {/* Step 1: Delivery Address */}
                        <div className={`bg-white/5 border ${step === 1 ? 'border-royal-gold' : 'border-white/10'} rounded-sm transition-all overflow-hidden`}>
                            {/* Header */}
                            <div className="p-4 md:p-6 bg-white/5 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-royal-gold text-black' : 'bg-gray-700 text-gray-400'}`}>1</span>
                                    Delivery Address
                                </h2>
                                {step > 1 && (
                                    <button onClick={() => setStep(1)} className="text-royal-gold text-sm font-bold uppercase border border-royal-gold/30 px-4 py-1 hover:bg-royal-gold hover:text-black transition-all">CHANGE</button>
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
                                                onClick={() => setSelectedAddressId(addr.id)}
                                                className={`border p-4 rounded-sm cursor-pointer relative transition-all ${selectedAddressId === addr.id ? 'border-royal-gold bg-royal-gold/5' : 'border-white/10 hover:border-white/30'}`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-1 ${selectedAddressId === addr.id ? 'border-royal-gold' : 'border-gray-500'}`}>
                                                        {selectedAddressId === addr.id && <div className="w-3 h-3 bg-royal-gold rounded-full"></div>}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-bold text-white text-lg">{addr.name}</span>
                                                            <span className="bg-white/10 text-gray-300 text-[10px] px-2 py-0.5 rounded uppercase font-bold">{addr.type}</span>
                                                            <span className="text-white font-bold ml-4">{addr.mobile}</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm leading-relaxed">{addr.address}</p>

                                                        {selectedAddressId === addr.id && (
                                                            <Button
                                                                onClick={(e) => { e.stopPropagation(); setStep(2); }}
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
                                    {!showAddAddress ? (
                                        <button
                                            onClick={() => setShowAddAddress(true)}
                                            className="flex items-center gap-2 text-royal-gold font-bold uppercase tracking-widest text-sm py-4 w-full border border-dashed border-white/20 hover:border-royal-gold hover:bg-white/5 justify-center transition-all"
                                        >
                                            <Plus size={18} /> Add New Address
                                        </button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="bg-gray-900 border border-white/10 p-6 rounded-sm mt-4"
                                        >
                                            <h3 className="text-royal-gold font-serif mb-6 uppercase tracking-widest text-sm">Add New Address</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <input type="text" name="name" placeholder="Name" value={newAddress.name} onChange={handleNewAddressChange} className="bg-black border border-white/20 p-3 text-white focus:border-royal-gold outline-none" />
                                                <input type="tel" name="mobile" placeholder="Mobile Number" value={newAddress.mobile} onChange={handleNewAddressChange} className="bg-black border border-white/20 p-3 text-white focus:border-royal-gold outline-none" />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                <input type="text" name="pincode" placeholder="Pincode" value={newAddress.pincode} onChange={handleNewAddressChange} className="bg-black border border-white/20 p-3 text-white focus:border-royal-gold outline-none" />
                                                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleNewAddressChange} className="bg-black border border-white/20 p-3 text-white focus:border-royal-gold outline-none" />
                                            </div>
                                            <div className="mb-4">
                                                <textarea name="addressLine" placeholder="Address (Area and Street)" rows="3" value={newAddress.addressLine} onChange={handleNewAddressChange} className="w-full bg-black border border-white/20 p-3 text-white focus:border-royal-gold outline-none resize-none"></textarea>
                                            </div>
                                            <div className="flex gap-4 mb-6">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="type" value="Home" checked={newAddress.type === 'Home'} onChange={handleNewAddressChange} className="accent-royal-gold" /> Home
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="radio" name="type" value="Work" checked={newAddress.type === 'Work'} onChange={handleNewAddressChange} className="accent-royal-gold" /> Work
                                                </label>
                                            </div>

                                            <div className="flex gap-4">
                                                <Button onClick={handleSaveAddress} className="bg-royal-gold text-black py-3 px-8 text-sm hover:bg-white">SAVE AND DELIVER HERE</Button>
                                                <button onClick={() => setShowAddAddress(false)} className="text-gray-400 font-bold uppercase text-xs hover:text-white">Cancel</button>
                                            </div>
                                        </motion.div>
                                    )}

                                </div>
                            )}

                            {/* Minimized View for Step 1 when Step 2 is active */}
                            {step > 1 && selectedAddress && (
                                <div className="p-6 bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-white">{selectedAddress.name}</span>
                                            <span className="bg-white/20 text-[10px] px-2 rounded uppercase font-bold">{selectedAddress.type}</span>
                                            <span className="text-gray-300 text-sm ml-2">{selectedAddress.mobile}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{selectedAddress.address}</p>
                                    </div>
                                    <CheckCircle className="text-royal-gold hidden md:block" />
                                </div>
                            )}
                        </div>


                        {/* Step 2: Payment Options */}
                        <div className={`bg-white/5 border ${step === 2 ? 'border-royal-gold' : 'border-white/10'} rounded-sm transition-all overflow-hidden`}>
                            <div className="p-4 md:p-6 bg-white/5 border-b border-white/5">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-royal-gold text-black' : 'bg-gray-700 text-gray-400'}`}>2</span>
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
                                            <p className="text-xs text-gray-400">Visa, Mastercard, RuPay</p>
                                        </div>
                                    </div>
                                    {/* Other dummy payment options */}
                                    <div className="border border-white/10 p-4 rounded flex items-center gap-4 cursor-pointer hover:border-white/30 opacity-50">
                                        <div className="w-5 h-5 rounded-full border border-gray-500"></div>
                                        <div className="text-blue-400 font-bold">UPI</div>
                                        <p className="font-bold">Google Pay / PhonePe / UPI</p>
                                    </div>

                                    <Button onClick={handlePlaceOrder} variant="primary" className="w-full py-4 text-sm font-bold tracking-widest bg-royal-gold text-black hover:bg-white shadow-[0_0_15px_rgba(212,175,55,0.3)] mt-6">
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
                        <div className="bg-white/5 border border-white/10 rounded-sm sticky top-28 overflow-hidden">
                            <div className="p-4 border-b border-white/10 bg-white/5">
                                <h3 className="text-gray-400 uppercase font-bold text-xs tracking-widest">Price Details</h3>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white">Price (1 item)</span>
                                    <span className="text-white">₹ 35,000</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-400">
                                    <span>Discount</span>
                                    <span>− ₹ 10,001</span>
                                </div>
                                <div className="flex justify-between text-sm text-white">
                                    <span>Platform Fee</span>
                                    <span>₹ 20</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Delivery Charges</span>
                                    <span className="text-green-400">Free</span>
                                </div>

                                <div className="border-t border-dashed border-white/20 pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-xl text-white">
                                        <span>Total Amount</span>
                                        <span>₹ 24,999</span>
                                    </div>
                                </div>

                                <div className="bg-green-900/20 border border-green-500/20 p-3 rounded text-xs text-green-400 font-medium text-center">
                                    You will save ₹10,001 on this order
                                </div>
                            </div>

                            <div className="p-4 bg-gray-900 border-t border-white/10 flex items-center gap-3">
                                <ShieldCheck className="text-gray-500" size={24} />
                                <p className="text-[10px] text-gray-500 uppercase tracking-wide">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
