import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingBag,
    PackageCheck,
    Clock,
    Truck,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Search,
    User,
    Heart,
    MapPin,
    ArrowRight,
} from 'lucide-react';

export default function OrderHistory({ orders: initialOrders }) {
    const defaultOrders = [
        {
            id: 101,
            orderNumber: 'ORD-2026-99210',
            date: '2026-08-06',
            status: 'processing',
            total: 5260,
            itemCount: 1,
            firstItem: {
                title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
            },
        },
        {
            id: 102,
            orderNumber: 'ORD-2026-98102',
            date: '2026-07-20',
            status: 'delivered',
            total: 2950,
            itemCount: 1,
            firstItem: {
                title: 'Smart AMOLED Fitness Watch V2',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
            },
        },
    ];

    const [orders, setOrders] = useState(initialOrders || defaultOrders);
    const [activeTab, setActiveTab] = useState('all');
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.fromTo(
                containerRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, [activeTab]);

    const filteredOrders = orders.filter((o) => {
        if (activeTab === 'all') return true;
        return o.status === activeTab;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title="My Orders - E-Commerce BD" />

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
                        href="/account/profile"
                        className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
                    >
                        <User className="w-4 h-4 text-emerald-400" />
                        <span>My Account</span>
                    </Link>
                </div>
            </header>

            {/* Main Account Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
                {/* Account Navigation Sidebar */}
                <aside className="w-full md:w-64 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-1 h-fit">
                    <Link
                        href="/account/orders"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xs"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>My Orders</span>
                    </Link>
                    <Link
                        href="/account/wishlist"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-xs transition-colors"
                    >
                        <Heart className="w-4 h-4" />
                        <span>My Wishlist</span>
                    </Link>
                    <Link
                        href="/account/addresses"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-xs transition-colors"
                    >
                        <MapPin className="w-4 h-4" />
                        <span>Saved Addresses</span>
                    </Link>
                    <Link
                        href="/account/profile"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 font-medium text-xs transition-colors"
                    >
                        <User className="w-4 h-4" />
                        <span>Profile Settings</span>
                    </Link>
                </aside>

                {/* Right Orders List Area */}
                <main className="flex-1 space-y-6">
                    <div className="border-b border-slate-800 pb-4">
                        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                            <PackageCheck className="w-6 h-6 text-emerald-400" />
                            <span>Order History</span>
                        </h1>
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                                    activeTab === tab
                                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                        : 'bg-slate-800/70 text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Orders Cards List */}
                    {filteredOrders.length === 0 ? (
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                            <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
                            <h3 className="text-lg font-bold text-white">No Orders Found</h3>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto">
                                You haven't placed any orders matching this filter yet.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                            >
                                <span>Browse Products</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div ref={containerRef} className="space-y-4">
                            {filteredOrders.map((o) => (
                                <div
                                    key={o.id}
                                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 space-y-4 transition-all"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                                        <div>
                                            <span className="font-mono font-bold text-sm text-white">
                                                {o.orderNumber}
                                            </span>
                                            <p className="text-[11px] text-slate-400">Placed on {o.date}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                                                    o.status === 'delivered'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : o.status === 'shipped'
                                                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}
                                            >
                                                {o.status}
                                            </span>
                                            <span className="font-extrabold text-sm text-emerald-400">
                                                ৳{o.total.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={o.firstItem.image}
                                                alt={o.firstItem.title}
                                                className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-xs text-white line-clamp-1">
                                                    {o.firstItem.title}
                                                </h4>
                                                <p className="text-[11px] text-slate-400">
                                                    {o.itemCount > 1 ? `+ ${o.itemCount - 1} other item(s)` : '1 item'}
                                                </p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/account/orders/${o.id}`}
                                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                                        >
                                            <span>View Order</span>
                                            <ChevronRight className="w-4 h-4 text-emerald-400" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
