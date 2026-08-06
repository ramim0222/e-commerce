import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingBag,
    Search,
    User,
    ShoppingCart,
    Zap,
    ChevronRight,
    Star,
    Heart,
    Flame,
    ArrowRight,
    ShieldCheck,
    Truck,
    Clock,
    Tag,
    Menu,
    X,
} from 'lucide-react';

export default function Home({ banners: initialBanners, flashSale: initialFlashSale, categories: initialCategories, products: initialProducts }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(2);
    const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

    const heroRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, []);

    const categories = initialCategories || [
        { id: 1, name: 'Electronics', slug: 'electronics', icon: '📱', count: '1.2k items' },
        { id: 2, name: 'Fashion & Wearables', slug: 'fashion', icon: '👕', count: '3.4k items' },
        { id: 3, name: 'Home Appliances', slug: 'home-appliances', icon: '🍳', count: '850 items' },
        { id: 4, name: 'Beauty & Health', slug: 'beauty', icon: '💄', count: '2.1k items' },
        { id: 5, name: 'Groceries & Organic', slug: 'groceries', icon: '🍎', count: '4.5k items' },
    ];

    const flashProducts = initialFlashSale || [
        {
            id: 101,
            title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            price: 5200,
            originalPrice: 6800,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
            vendor: 'TechGear BD',
        },
        {
            id: 102,
            title: 'Smart AMOLED Fitness Watch V2 with SpO2',
            price: 2950,
            originalPrice: 4200,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
            vendor: 'Gadget World',
        },
        {
            id: 103,
            title: 'Premium Handcrafted Leather Oxford Shoes',
            price: 3400,
            originalPrice: 4500,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80',
            vendor: 'Apex Crafts',
        },
    ];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.visit(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title="E-Commerce - Premium Online Marketplace" />

            {/* Persistent Header */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-lg shadow-lg shadow-emerald-500/20">
                            E
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight hidden sm:block">
                            E-Commerce<span className="text-emerald-400">BD</span>
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products, brands, or categories..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </form>

                    {/* Actions Menu */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/auth/login"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
                        >
                            <User className="w-4 h-4 text-emerald-400" />
                            <span className="hidden md:inline">Account / Login</span>
                        </Link>

                        <Link
                            href="/cart"
                            className="relative p-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-500 text-slate-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Landing Sections */}
            <main className="flex-1 space-y-10 pb-12">
                {/* Hero Banner Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
                    <div
                        ref={heroRef}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="space-y-4 max-w-xl z-10 text-center md:text-left">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <Flame className="w-3.5 h-3.5 fill-emerald-400" /> MEGA E-COMMERCE SALE
                            </span>
                            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                                Premium Products Delivered Across Bangladesh
                            </h1>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Explore top verified vendors, exclusive discounts, and 100% genuine products with cash on delivery.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                                <Link
                                    href="/category/electronics"
                                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all active:scale-95"
                                >
                                    <span>Shop Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 relative flex justify-center">
                            <img
                                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&auto=format&fit=crop&q=80"
                                alt="Shopping Banner"
                                className="rounded-2xl shadow-2xl border border-slate-800 max-h-72 object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Flash Sale Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                    <Zap className="w-5 h-5 fill-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                                        <span>Flash Deals</span>
                                        <span className="text-xs bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                                            Limited Time
                                        </span>
                                    </h2>
                                    <p className="text-xs text-slate-400">Ends soon! Grab before stock runs out.</p>
                                </div>
                            </div>

                            {/* Live Countdown Timer */}
                            <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                                <Clock className="w-4 h-4 text-emerald-400" />
                                <span>Ends In:</span>
                                <span className="bg-slate-950 px-2 py-1 rounded-md text-emerald-400 font-bold border border-slate-800">
                                    {String(timeLeft.hours).padStart(2, '0')}h
                                </span>
                                <span>:</span>
                                <span className="bg-slate-950 px-2 py-1 rounded-md text-emerald-400 font-bold border border-slate-800">
                                    {String(timeLeft.minutes).padStart(2, '0')}m
                                </span>
                                <span>:</span>
                                <span className="bg-slate-950 px-2 py-1 rounded-md text-emerald-400 font-bold border border-slate-800">
                                    {String(timeLeft.seconds).padStart(2, '0')}s
                                </span>
                            </div>
                        </div>

                        {/* Flash Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {flashProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-emerald-500/50 transition-all group relative"
                                >
                                    <div className="h-44 rounded-lg overflow-hidden relative">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-2 left-2 bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                                            -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                                        </span>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-[11px] text-slate-400 font-medium">{p.vendor}</p>
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="font-semibold text-xs text-white hover:text-emerald-400 line-clamp-2 transition-colors"
                                        >
                                            {p.title}
                                        </Link>
                                    </div>

                                    <div className="flex items-center justify-between pt-1">
                                        <div>
                                            <span className="font-bold text-sm text-emerald-400">
                                                ৳{p.price.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-slate-500 line-through ml-2">
                                                ৳{p.originalPrice.toLocaleString()}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Categories Grid Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-white tracking-tight">Explore Categories</h2>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {categories.map((c) => (
                                <Link
                                    key={c.id}
                                    href={`/category/${c.slug}`}
                                    className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-4 flex flex-col items-center text-center space-y-2 group transition-all"
                                >
                                    <span className="text-3xl group-hover:scale-110 transition-transform">
                                        {c.icon}
                                    </span>
                                    <span className="font-semibold text-xs text-white group-hover:text-emerald-400 transition-colors">
                                        {c.name}
                                    </span>
                                    <span className="text-[10px] text-slate-400">{c.count}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Persistent Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 text-xs text-slate-400 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <span className="font-bold text-white text-sm">E-Commerce BD</span>
                        <p className="text-[11px] leading-relaxed">
                            Bangladesh's trusted multi-vendor online marketplace. Certified products, secure payments, and fast shipping.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold text-white">Customer Care</h4>
                        <ul className="space-y-1">
                            <li><Link href="/help" className="hover:text-emerald-400">Help Center</Link></li>
                            <li><Link href="/order-tracking" className="hover:text-emerald-400">Track Order</Link></li>
                            <li><Link href="/returns" className="hover:text-emerald-400">Returns & Refunds</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold text-white">Earn With Us</h4>
                        <ul className="space-y-1">
                            <li><Link href="/auth/vendor/register" className="hover:text-emerald-400 font-semibold text-emerald-400">Become a Vendor</Link></li>
                            <li><Link href="/affiliate" className="hover:text-emerald-400">Affiliate Program</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold text-white">Secure Payments</h4>
                        <div className="flex gap-2 font-bold text-[10px] text-slate-300">
                            <span className="px-2 py-1 bg-slate-950 rounded border border-slate-800">bKash</span>
                            <span className="px-2 py-1 bg-slate-950 rounded border border-slate-800">Nagad</span>
                            <span className="px-2 py-1 bg-slate-950 rounded border border-slate-800">COD</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 mt-6 border-t border-slate-800/60 text-center text-[11px]">
                    © 2026 E-Commerce BD. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
