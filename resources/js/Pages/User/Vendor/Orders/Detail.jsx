import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    ShoppingBag,
    MapPin,
    Truck,
    CheckCircle2,
    Clock,
    Printer,
    PackageCheck,
    User,
    Phone,
    Calendar,
    DollarSign,
    Loader2,
} from 'lucide-react';

export default function VendorOrderDetail({ order: initialOrder }) {
    const defaultOrder = {
        id: 101,
        orderNumber: 'ORD-2026-99210',
        orderDate: '2026-08-06 14:32',
        status: 'processing', // 'new' | 'processing' | 'shipped' | 'delivered'
        courierStatus: 'Pending Booking',
        customer: {
            name: 'Rahim Ahmed',
            phone: '+880 171***5678',
            address: 'House 42, Road 7A, Dhanmondi R/A, Dhaka-1209',
        },
        items: [
            {
                id: 1,
                title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                sku: 'SKU-HD-9921',
                variant: 'Matte Black / Standard',
                price: 5200,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
            },
        ],
        subtotal: 5200,
        commissionDeducted: 520,
        vendorPayout: 4680,
        timeline: [
            { title: 'Order Placed', time: '2026-08-06 14:32', done: true },
            { title: 'Confirmed by Vendor', time: '2026-08-06 15:10', done: true },
            { title: 'Ready for Courier Pickup', time: 'Pending', done: false },
            { title: 'Delivered to Customer', time: 'Pending', done: false },
        ],
    };

    const order = initialOrder || defaultOrder;
    const [status, setStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);

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

    const handleUpdateStatus = (newStatus) => {
        setLoading(true);
        router.post(
            `/api/v1/vendor/orders/${order.id}/status`,
            { status: newStatus },
            {
                onSuccess: () => {
                    setStatus(newStatus);
                    setLoading(false);
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
            <Head title={`Vendor Order - ${order.orderNumber}`} />

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/vendor/orders"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                                {order.orderNumber}
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>Placed on {order.orderDate}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                    >
                        <Printer className="w-4 h-4" /> Print Packing Slip
                    </button>

                    {status === 'processing' && (
                        <button
                            onClick={() => handleUpdateStatus('shipped')}
                            disabled={loading}
                            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
                            <span>Mark Ready to Ship</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Layout Grid */}
            <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items & Financials (2 Cols) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Itemized List */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                            <ShoppingBag className="w-4 h-4 text-emerald-400" />
                            <span>Order Split Products ({order.items.length})</span>
                        </h3>

                        <div className="divide-y divide-slate-800/60">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-3 first:pt-0 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-xs text-white line-clamp-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-[11px] text-slate-400 font-mono">
                                                {item.sku} • {item.variant}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-xs text-white">
                                            ৳{item.price.toLocaleString()} x {item.quantity}
                                        </p>
                                        <p className="font-extrabold text-xs text-emerald-400 mt-0.5">
                                            ৳{(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vendor Payout Calculation Breakdown */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-3">
                            Financial Payout Summary
                        </h3>

                        <div className="space-y-2 text-xs text-slate-300">
                            <div className="flex justify-between">
                                <span>Items Total</span>
                                <span className="font-semibold text-white">৳{order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-rose-400">
                                <span>Platform Commission (10%)</span>
                                <span>-৳{order.commissionDeducted.toLocaleString()}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-extrabold text-emerald-400">
                                <span>Net Vendor Payout</span>
                                <span>৳{order.vendorPayout.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer Shipping & Timeline */}
                <div className="space-y-6">
                    {/* Customer Shipping Address Block */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>Customer Delivery Address</span>
                        </h3>

                        <div className="space-y-1.5 text-xs text-slate-300">
                            <p className="font-bold text-white flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-slate-400" />
                                <span>{order.customer.name}</span>
                            </p>
                            <p className="flex items-center gap-1.5 text-slate-400">
                                <Phone className="w-3.5 h-3.5 text-slate-500" />
                                <span>{order.customer.phone}</span>
                            </p>
                            <p className="text-slate-300 leading-relaxed pt-1">
                                {order.customer.address}
                            </p>
                        </div>
                    </div>

                    {/* Order Status Timeline */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-3">
                            Order Timeline
                        </h3>

                        <div className="space-y-3 pl-2 relative">
                            {order.timeline.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-3 text-xs">
                                    <div
                                        className={`w-3.5 h-3.5 rounded-full border-2 mt-0.5 shrink-0 ${
                                            step.done
                                                ? 'bg-emerald-500 border-emerald-400 shadow-md shadow-emerald-500/20'
                                                : 'bg-slate-950 border-slate-700'
                                        }`}
                                    />
                                    <div>
                                        <p className={`font-semibold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                                            {step.title}
                                        </p>
                                        <p className="text-[10px] text-slate-500">{step.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
