import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    MapPin,
    CreditCard,
    CheckCircle2,
    Truck,
    ShieldCheck,
    ArrowRight,
    Plus,
    Building2,
    Lock,
    ShoppingBag,
    Loader2,
    Store,
    AlertCircle,
} from 'lucide-react';
import AddressForm from '@/Components/Front/AddressForm';

export default function Checkout({ cart: initialCart, addresses: initialAddresses }) {
    const defaultAddresses = [
        {
            id: 1,
            label: 'Home',
            name: 'Rahim Ahmed',
            phone: '+8801712345678',
            division: 'Dhaka',
            district: 'Dhaka',
            upazila: 'Dhanmondi',
            fullAddress: 'House 42, Road 7A, Dhanmondi R/A',
            isDefault: true,
        },
    ];

    const defaultCart = [
        {
            vendorId: 2,
            vendorName: 'TechGear BD',
            items: [
                {
                    id: 1,
                    title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                    variant: 'Matte Black / Standard',
                    price: 5200,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
                },
            ],
        },
    ];

    const [addresses, setAddresses] = useState(initialAddresses || defaultAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || 1);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'bkash' | 'nagad' | 'card'
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const isDhaka = selectedAddress?.district?.toLowerCase().includes('dhaka');
    const shippingFee = isDhaka ? 60 : 120;

    const subtotal = defaultCart.reduce((acc, g) => acc + g.items.reduce((iAcc, item) => iAcc + item.price * item.quantity, 0), 0);
    const grandTotal = subtotal + shippingFee;

    const handleSaveAddress = (newAddress) => {
        setAddresses((prev) => [newAddress, ...prev]);
        setSelectedAddressId(newAddress.id);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post(
            '/api/v1/orders/checkout',
            {
                address_id: selectedAddressId,
                payment_method: paymentMethod,
            },
            {
                onSuccess: () => {
                    if (paymentMethod === 'cod') {
                        router.visit('/order-confirmation?order_id=ORD-99210');
                    } else {
                        router.visit('/payment/redirect?gateway=' + paymentMethod);
                    }
                },
                onError: () => setLoading(false),
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title="Checkout - E-Commerce BD" />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-base">
                            E
                        </div>
                        <span className="font-bold text-base text-white tracking-tight">
                            E-Commerce<span className="text-emerald-400">BD</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Secure 256-Bit Encrypted Checkout</span>
                    </div>
                </div>
            </header>

            {/* Main Checkout Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
                <div className="border-b border-slate-800 pb-4">
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-emerald-400" />
                        <span>Checkout</span>
                    </h1>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column (2 Cols) - Address & Payment */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* 1. Delivery Address Section */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-emerald-400" />
                                    <span>1. Select Delivery Address</span>
                                </h3>
                                <button
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" /> Add Address
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {addresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        onClick={() => setSelectedAddressId(addr.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                            selectedAddressId === addr.id
                                                ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                                                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                                                {addr.label}
                                            </span>
                                            {selectedAddressId === addr.id && (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            )}
                                        </div>
                                        <p className="font-semibold text-xs text-white">{addr.name}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{addr.phone}</p>
                                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                                            {addr.fullAddress}, {addr.upazila}, {addr.district}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 2. Payment Method Section */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                                <CreditCard className="w-4 h-4 text-emerald-400" />
                                <span>2. Choose Payment Method</span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    {
                                        id: 'cod',
                                        name: 'Cash on Delivery',
                                        subtitle: 'Pay cash when item arrives',
                                        badge: 'No Advance Required',
                                    },
                                    {
                                        id: 'bkash',
                                        name: 'bKash Direct',
                                        subtitle: 'Instant mobile payment',
                                        badge: 'Instant Instant',
                                    },
                                    {
                                        id: 'nagad',
                                        name: 'Nagad Pay',
                                        subtitle: 'Fast mobile wallet',
                                        badge: 'Instant Instant',
                                    },
                                ].map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                                            paymentMethod === method.id
                                                ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                                                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-xs text-white">{method.name}</span>
                                            {paymentMethod === method.id && (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-400">{method.subtitle}</p>
                                        <span className="inline-block text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                            {method.badge}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {paymentMethod === 'cod' && (
                                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-300">
                                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                    <span>
                                        Cash on Delivery is available. Please inspect the parcel upon arrival before paying the courier agent.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column (1 Col) - Sticky Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                                Order Summary
                            </h3>

                            <div className="space-y-3 divide-y divide-slate-800/60">
                                {defaultCart.map((g) => (
                                    <div key={g.vendorId} className="pt-3 first:pt-0 space-y-2">
                                        <span className="text-[11px] font-semibold text-emerald-400">
                                            {g.vendorName}
                                        </span>
                                        {g.items.map((i) => (
                                            <div key={i.id} className="flex justify-between text-xs">
                                                <span className="text-slate-300 line-clamp-1 flex-1 pr-2">
                                                    {i.title} (x{i.quantity})
                                                </span>
                                                <span className="font-bold text-white">
                                                    ৳{(i.price * i.quantity).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                                <div className="flex justify-between">
                                    <span>Items Subtotal</span>
                                    <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Delivery Charge ({isDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                                    <span className="font-semibold text-white">৳{shippingFee}</span>
                                </div>

                                <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold text-white">
                                    <span>Total Payable</span>
                                    <span className="text-emerald-400">৳{grandTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all active:scale-98"
                            >
                                {loading ? (
                                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                ) : (
                                    <>
                                        <span>Confirm & Place Order</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <div className="text-center pt-2">
                                <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    Buyer Protection & Money Back Guarantee
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Integrated Address Form Modal */}
            <AddressForm
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
                onSave={handleSaveAddress}
            />
        </div>
    );
}
