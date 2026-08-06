import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Store,
    Star,
    CheckCircle2,
    MapPin,
    Calendar,
    MessageCircle,
    ShoppingCart,
    Search,
    Package,
    ShieldCheck,
    TrendingUp,
} from 'lucide-react';

export default function VendorStorePage({ vendor: initialVendor, products: initialProducts }) {
    const defaultVendor = {
        id: 2,
        name: 'TechGear BD',
        description:
            'Official distributor of premium audio, smartphone gadgets, and gaming accessories in Bangladesh. 100% authentic products guaranteed.',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&auto=format&fit=crop&q=80',
        banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
        rating: 4.9,
        reviewCount: 342,
        joinDate: 'July 2025',
        location: 'Dhaka, Bangladesh',
        verified: true,
        responseRate: '98%',
    };

    const defaultProducts = [
        {
            id: 101,
            title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            price: 5200,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
        },
        {
            id: 104,
            title: 'Logitech MX Master 3S Wireless Performance Mouse',
            price: 9800,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
        },
    ];

    const vendor = initialVendor || defaultVendor;
    const [products, setProducts] = useState(initialProducts || defaultProducts);
    const [search, setSearch] = useState('');

    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [search]);

    const filteredProducts = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title={`${vendor.name} - Storefront`} />

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
                        href="/cart"
                        className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Link>
                </div>
            </header>

            {/* Vendor Cover Banner & Profile Card */}
            <div className="relative">
                <div className="h-48 sm:h-64 w-full overflow-hidden border-b border-slate-800 relative">
                    <img src={vendor.banner} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative -mt-16 z-10">
                    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={vendor.logo}
                                alt={vendor.name}
                                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-lg shrink-0"
                            />
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold text-white tracking-tight">
                                        {vendor.name}
                                    </h1>
                                    {vendor.verified && (
                                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Verified Seller
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                                        <span>{vendor.rating}</span>
                                        <span className="text-slate-400 font-normal">({vendor.reviewCount} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                        <span>{vendor.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                        <span>Member since {vendor.joinDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-initial py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
                                <MessageCircle className="w-4 h-4 text-emerald-400" />
                                <span>Contact Seller</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vendor Catalog & Description */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
                {/* About Seller Box */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
                    <h3 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
                        About This Seller
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {vendor.description}
                    </p>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-400" />
                        <span>Store Catalog ({filteredProducts.length})</span>
                    </h2>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search store items..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Vendor Products Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {filteredProducts.map((p) => (
                        <div
                            key={p.id}
                            className="bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-4 space-y-3 transition-all group flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="h-48 rounded-xl overflow-hidden relative">
                                    <img
                                        src={p.image}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <Link
                                    href={`/product/${p.id}`}
                                    className="font-semibold text-xs text-white hover:text-emerald-400 line-clamp-2 transition-colors block"
                                >
                                    {p.title}
                                </Link>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-sm text-emerald-400">
                                        ৳{p.price.toLocaleString()}
                                    </span>
                                    <div className="flex items-center gap-1 text-[11px] text-amber-400">
                                        <Star className="w-3 h-3 fill-amber-400" />
                                        <span>{p.rating}</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/product/${p.id}`}
                                    className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
