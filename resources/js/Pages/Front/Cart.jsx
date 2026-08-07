import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingCart,
    Store,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    Tag,
    Truck,
    ShieldCheck,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    ShoppingBag,
} from 'lucide-react';

export default function Cart({ cart: initialCart }) {
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
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
                },
            ],
        },
        {
            vendorId: 3,
            vendorName: 'Gadget World',
            items: [
                {
                    id: 2,
                    title: 'Smart AMOLED Fitness Watch V2 with SpO2',
                    variant: 'Space Gray / Standard',
                    price: 2950,
                    quantity: 2,
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80',
                },
            ],
        },
    ];

    const [cartGroups, setCartGroups] = useState(initialCart || defaultCart);
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [shippingZone, setShippingZone] = useState('dhaka'); // 'dhaka' | 'outside'

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

    const updateQuantity = (vendorId, itemId, delta) => {
        setCartGroups((prev) =>
            prev.map((group) => {
                if (group.vendorId === vendorId) {
                    return {
                        ...group,
                        items: group.items.map((item) =>
                            item.id === itemId
                                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                                : item
                        ),
                    };
                }
                return group;
            })
        );
    };

    const removeItem = (vendorId, itemId) => {
        setCartGroups((prev) =>
            prev
                .map((group) => {
                    if (group.vendorId === vendorId) {
                        return {
                            ...group,
                            items: group.items.filter((item) => item.id !== itemId),
                        };
                    }
                    return group;
                })
                .filter((group) => group.items.length > 0)
        );
    };

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (couponCode.toUpperCase() === 'WELCOME10') {
            setAppliedCoupon({ code: 'WELCOME10', discount: 500 });
            setCouponError('');
        } else {
            setCouponError('Invalid coupon code. Try WELCOME10');
        }
    };

    const subtotal = cartGroups.reduce((acc, group) => {
        return acc + group.items.reduce((gAcc, item) => gAcc + item.price * item.quantity, 0);
    }, 0);

    const shippingFee = shippingZone === 'dhaka' ? 60 : 120;
    const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
    const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

    const totalItemCount = cartGroups.reduce((acc, g) => acc + g.items.reduce((iAcc, item) => iAcc + item.quantity, 0), 0);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title="Shopping Cart - E-Commerce BD" />

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

                    <Link
                        href="/"
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                </div>
            </header>

            {/* Main Cart Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
                <div className="border-b border-slate-800 pb-5">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                        <ShoppingCart className="w-7 h-7 text-emerald-400" />
                        <span>Shopping Cart ({totalItemCount} Items)</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Review your items, apply coupons, and proceed to checkout.
                    </p>
                </div>

                {cartGroups.length === 0 ? (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                        <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
                        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link
                            href="/category/electronics"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
                        >
                            <span>Explore Marketplace</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items Grouped by Vendor (2 Cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartGroups.map((group) => (
                                <div
                                    key={group.vendorId}
                                    className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4"
                                >
                                    {/* Vendor Header */}
                                    <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-emerald-400 font-semibold text-xs">
                                        <Store className="w-4 h-4" />
                                        <span>Shipment from {group.vendorName}</span>
                                    </div>

                                    {/* Items List */}
                                    <div className="space-y-4 divide-y divide-slate-800/60">
                                        {group.items.map((item) => (
                                            <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                                                    />
                                                    <div>
                                                        <h4 className="font-semibold text-xs text-white line-clamp-1">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[11px] text-slate-400">{item.variant}</p>
                                                        <span className="font-bold text-xs text-emerald-400 block mt-1">
                                                            ৳{item.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                                                    {/* Qty Stepper */}
                                                    <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-1">
                                                        <button
                                                            onClick={() => updateQuantity(group.vendorId, item.id, -1)}
                                                            className="p-1.5 text-slate-400 hover:text-white"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-8 text-center text-xs font-bold text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(group.vendorId, item.id, 1)}
                                                            className="p-1.5 text-slate-400 hover:text-white"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>

                                                    <span className="font-extrabold text-sm text-white w-24 text-right">
                                                        ৳{(item.price * item.quantity).toLocaleString()}
                                                    </span>

                                                    <button
                                                        onClick={() => removeItem(group.vendorId, item.id)}
                                                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary & Coupon Panel (1 Col) */}
                        <div className="space-y-6">
                            {/* Coupon Box */}
                            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                                <h3 className="font-semibold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <Tag className="w-4 h-4 text-emerald-400" />
                                    <span>Discount Coupon</span>
                                </h3>

                                {appliedCoupon ? (
                                    <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="font-bold">{appliedCoupon.code} (-৳{appliedCoupon.discount})</span>
                                        </div>
                                        <button
                                            onClick={() => setAppliedCoupon(null)}
                                            className="text-slate-400 hover:text-white"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter coupon (e.g. WELCOME10)"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white uppercase focus:border-emerald-500 focus:outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold shrink-0"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && (
                                            <p className="text-[11px] text-rose-400">{couponError}</p>
                                        )}
                                    </form>
                                )}
                            </div>

                            {/* Summary Panel */}
                            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                                    Order Summary
                                </h3>

                                <div className="space-y-2.5 text-xs text-slate-300">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-white">৳{subtotal.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span>Shipping Zone</span>
                                        <select
                                            value={shippingZone}
                                            onChange={(e) => setShippingZone(e.target.value)}
                                            className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                                        >
                                            <option value="dhaka">Inside Dhaka (৳60)</option>
                                            <option value="outside">Outside Dhaka (৳120)</option>
                                        </select>
                                    </div>

                                    {appliedCoupon && (
                                        <div className="flex justify-between text-emerald-400 font-semibold">
                                            <span>Coupon Discount</span>
                                            <span>-৳{discountAmount.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold text-white">
                                        <span>Grand Total</span>
                                        <span className="text-emerald-400">৳{grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <div className="text-center pt-2">
                                    <span className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                        100% Secure Checkout Guarantee
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
