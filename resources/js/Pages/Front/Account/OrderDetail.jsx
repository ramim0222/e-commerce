import React, { useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    Truck,
    MapPin,
    Download,
    Star,
    RotateCcw,
    CheckCircle2,
    Clock,
    Package,
    ShieldCheck,
    CreditCard,
} from 'lucide-react';

export default function OrderDetail({ order: initialOrder }) {
    const defaultOrder = {
        id: 101,
        orderNumber: 'ORD-2026-99210',
        date: '2026-08-06 14:32',
        status: 'delivered', // 'processing' | 'shipped' | 'delivered'
        paymentMethod: 'bKash Direct',
        paymentStatus: 'paid',
        total: 5260,
        subtotal: 5200,
        shippingFee: 60,
        courier: {
            name: 'Pathao Courier',
            trackingNumber: 'PTH-99812-BD',
            status: 'Delivered to recipient',
        },
        address: {
            name: 'Rahim Ahmed',
            phone: '+880 1712345678',
            fullAddress: 'House 42, Road 7A, Dhanmondi R/A, Dhaka-1209',
        },
        items: [
            {
                id: 1,
                productId: 101,
                title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                variant: 'Matte Black',
                price: 5200,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
                canReview: true,
                canReturn: true,
            },
        ],
        timeline: [
            { title: 'Order Placed & Paid', date: '06 Aug 2:32 PM', active: true },
            { title: 'Confirmed by Seller', date: '06 Aug 3:10 PM', active: true },
            { title: 'Shipped via Pathao', date: '07 Aug 10:00 AM', active: true },
            { title: 'Delivered', date: '07 Aug 4:45 PM', active: true },
        ],
    };

    const order = initialOrder || defaultOrder;
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
            <Head title={`Order Details - ${order.orderNumber}`} />

            {/* Top Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/account/orders"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                                {order.orderNumber}
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">
                                {order.status}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">Placed on {order.date}</p>
                    </div>
                </div>

                <button
                    onClick={() => alert('Downloading official PDF invoice...')}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Download Invoice (PDF)</span>
                </button>
            </div>

            {/* Layout Grid */}
            <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items & Tracking Timeline (2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Live Courier Stepper */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                                <Truck className="w-4 h-4 text-emerald-400" />
                                <span>Courier Tracking ({order.courier.name})</span>
                            </h3>
                            <span className="font-mono text-xs text-emerald-400 font-bold">
                                {order.courier.trackingNumber}
                            </span>
                        </div>

                        {/* Stepper Bar */}
                        <div className="grid grid-cols-4 gap-2 text-center relative pt-2">
                            {order.timeline.map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center relative z-10">
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                            step.active
                                                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                                : 'bg-slate-950 text-slate-600 border border-slate-800'
                                        }`}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-200 mt-2 line-clamp-1">
                                        {step.title}
                                    </span>
                                    <span className="text-[10px] text-slate-500">{step.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Purchased Items List */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-3">
                            Ordered Items ({order.items.length})
                        </h3>

                        <div className="divide-y divide-slate-800/60">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 first:pt-0 space-y-3">
                                    <div className="flex items-center justify-between gap-4">
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
                                                <span className="font-bold text-xs text-emerald-400 block mt-0.5">
                                                    ৳{item.price.toLocaleString()} x {item.quantity}
                                                </span>
                                            </div>
                                        </div>

                                        <span className="font-extrabold text-sm text-white">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Action Buttons for Delivered Items */}
                                    <div className="flex items-center gap-2 pt-2 justify-end">
                                        {item.canReview && (
                                            <Link
                                                href={`/product/review-form?order_item_id=${item.id}`}
                                                className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-semibold flex items-center gap-1 transition-all"
                                            >
                                                <Star className="w-3.5 h-3.5 fill-amber-400" /> Write Review
                                            </Link>
                                        )}

                                        {item.canReturn && (
                                            <Link
                                                href={`/account/return-request?order_id=${order.id}`}
                                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" /> Return / Exchange
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Address & Payment Summary */}
                <div className="space-y-6">
                    {/* Delivery Address */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>Delivery Address</span>
                        </h3>
                        <div className="text-xs text-slate-300 space-y-1">
                            <p className="font-bold text-white">{order.address.name}</p>
                            <p className="text-slate-400">{order.address.phone}</p>
                            <p className="text-slate-300 pt-1 leading-relaxed">{order.address.fullAddress}</p>
                        </div>
                    </div>

                    {/* Payment Recap */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                            <span>Payment Summary</span>
                        </h3>

                        <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold text-white">৳{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span className="font-semibold text-white">৳{order.shippingFee}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-extrabold text-white">
                                <span>Grand Total</span>
                                <span className="text-emerald-400">৳{order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
