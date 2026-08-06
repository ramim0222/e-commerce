import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Search,
    SlidersHorizontal,
    Star,
    ShoppingCart,
    X,
    PackageX,
    Sparkles,
    ArrowRight,
    Tag,
} from 'lucide-react';

export default function SearchResults({ query: initialQuery, products: initialProducts }) {
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const query = initialQuery || searchParams?.get('q') || 'headphones';

    const defaultProducts = [
        {
            id: 101,
            title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            price: 5200,
            rating: 4.9,
            brand: 'Anker',
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
            vendor: 'TechGear BD',
        },
        {
            id: 104,
            title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
            price: 36500,
            rating: 5.0,
            brand: 'Sony',
            category: 'Electronics',
            image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&auto=format&fit=crop&q=80',
            vendor: 'iStore BD',
        },
    ];

    const [products, setProducts] = useState(initialProducts || defaultProducts);
    const [searchTerm, setSearchTerm] = useState(query);
    const [sortBy, setSortBy] = useState('relevance');

    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [searchTerm, sortBy]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.visit(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title={`Search Results for "${query}"`} />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-base">
                            E
                        </div>
                        <span className="font-bold text-base text-white tracking-tight">
                            E-Commerce<span className="text-emerald-400">BD</span>
                        </span>
                    </Link>

                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </form>

                    <Link
                        href="/cart"
                        className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Link>
                </div>
            </header>

            {/* Search Header Banner */}
            <div className="bg-slate-900 border-b border-slate-800 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                <span>Search Results for</span>
                                <span className="text-emerald-400">"{query}"</span>
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Found {products.length} matching item(s) across catalog
                            </p>
                        </div>

                        {/* Did You Mean Suggestion */}
                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>Did you mean: </span>
                            <button
                                onClick={() => {
                                    setSearchTerm('wireless headphones');
                                    router.visit('/search?q=wireless+headphones');
                                }}
                                className="text-emerald-400 font-semibold hover:underline"
                            >
                                wireless headphones
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Results Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-6">
                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400">Showing {products.length} products</span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Sort:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                        <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
                        <h3 className="text-lg font-bold text-white">No exact matches found for "{query}"</h3>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto">
                            Try checking for typos or browse our top categories instead.
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                            <Link
                                href="/category/electronics"
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold"
                            >
                                Browse Electronics
                            </Link>
                            <Link
                                href="/category/fashion"
                                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold"
                            >
                                Browse Fashion
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {products.map((p) => (
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
                                    <div className="space-y-1">
                                        <span className="text-[11px] text-slate-400 font-medium">{p.vendor}</span>
                                        <Link
                                            href={`/product/${p.id}`}
                                            className="font-semibold text-xs text-white hover:text-emerald-400 line-clamp-2 transition-colors block"
                                        >
                                            {p.title}
                                        </Link>
                                    </div>
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
                )}
            </main>
        </div>
    );
}
