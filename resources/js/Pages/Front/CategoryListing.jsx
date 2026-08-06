import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Filter,
    SlidersHorizontal,
    Star,
    ShoppingCart,
    X,
    ChevronDown,
    ArrowUpDown,
    PackageX,
    Check,
    Search,
    User,
} from 'lucide-react';

export default function CategoryListing({ category: initialCategory, products: initialProducts }) {
    const category = initialCategory || {
        id: 1,
        name: 'Electronics & Gadgets',
        slug: 'electronics',
        subcategories: ['Smartphones', 'Laptops', 'Audio & Headphones', 'Smart Watches', 'Accessories'],
    };

    const defaultProducts = [
        {
            id: 1,
            title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            price: 5200,
            rating: 4.9,
            brand: 'Anker',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
            vendor: 'TechGear BD',
        },
        {
            id: 2,
            title: 'Smart AMOLED Fitness Watch V2 with SpO2 Sensor',
            price: 2950,
            rating: 4.7,
            brand: 'Haylou',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
            vendor: 'Gadget World',
        },
        {
            id: 3,
            title: 'Apple MacBook Air M2 13.6" 8GB/256GB - Space Gray',
            price: 118000,
            rating: 5.0,
            brand: 'Apple',
            inStock: true,
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=80',
            vendor: 'iStore BD',
        },
        {
            id: 4,
            title: 'Logitech MX Master 3S Wireless Performance Mouse',
            price: 9800,
            rating: 4.8,
            brand: 'Logitech',
            inStock: false,
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=80',
            vendor: 'TechGear BD',
        },
    ];

    const [products, setProducts] = useState(initialProducts || defaultProducts);
    const [selectedSubcat, setSelectedSubcat] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [sortBy, setSortBy] = useState('newest');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const gridRef = useRef(null);

    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [selectedSubcat, minPrice, maxPrice, selectedBrand, inStockOnly, minRating, sortBy]);

    const activeFilters = [];
    if (selectedSubcat) activeFilters.push({ key: 'subcat', label: selectedSubcat });
    if (minPrice || maxPrice) activeFilters.push({ key: 'price', label: `৳${minPrice || 0} - ৳${maxPrice || '∞'}` });
    if (selectedBrand) activeFilters.push({ key: 'brand', label: selectedBrand });
    if (inStockOnly) activeFilters.push({ key: 'stock', label: 'In Stock Only' });
    if (minRating > 0) activeFilters.push({ key: 'rating', label: `${minRating}★ & Above` });

    const removeFilter = (key) => {
        if (key === 'subcat') setSelectedSubcat('');
        if (key === 'price') { setMinPrice(''); setMaxPrice(''); }
        if (key === 'brand') setSelectedBrand('');
        if (key === 'stock') setInStockOnly(false);
        if (key === 'rating') setMinRating(0);
    };

    const clearAllFilters = () => {
        setSelectedSubcat('');
        setMinPrice('');
        setMaxPrice('');
        setSelectedBrand('');
        setInStockOnly(false);
        setMinRating(0);
    };

    const filteredProducts = products.filter((p) => {
        if (selectedBrand && p.brand !== selectedBrand) return false;
        if (inStockOnly && !p.inStock) return false;
        if (minRating > 0 && p.rating < minRating) return false;
        if (minPrice && p.price < parseFloat(minPrice)) return false;
        if (maxPrice && p.price > parseFloat(maxPrice)) return false;
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title={`Category - ${category.name}`} />

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

                    <div className="flex items-center gap-3">
                        <Link
                            href="/cart"
                            className="p-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Category Banner Header */}
            <div className="bg-slate-900 border-b border-slate-800 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <h1 className="text-2xl font-bold text-white tracking-tight">{category.name}</h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Showing {filteredProducts.length} items in marketplace
                    </p>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full flex flex-col md:flex-row gap-8">
                {/* Sidebar Filter Panel */}
                <aside className="w-full md:w-64 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-6 h-fit hidden md:block">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                            <span>Filters</span>
                        </h3>
                        {activeFilters.length > 0 && (
                            <button
                                onClick={clearAllFilters}
                                className="text-xs text-emerald-400 font-semibold hover:underline"
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Subcategories */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-300">Sub-categories</label>
                        <div className="space-y-1">
                            {category.subcategories.map((sub) => (
                                <button
                                    key={sub}
                                    onClick={() => setSelectedSubcat(selectedSubcat === sub ? '' : sub)}
                                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                        selectedSubcat === sub
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                                    }`}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-300">Price Range (৳)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-1/2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                            />
                        </div>
                    </div>

                    {/* In Stock Only */}
                    <label className="flex items-center gap-2 cursor-pointer pt-2">
                        <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => setInStockOnly(e.target.checked)}
                            className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300">In Stock Only</span>
                    </label>
                </aside>

                {/* Right Product Grid Area */}
                <main className="flex-1 space-y-6">
                    {/* Toolbar & Sort Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                        {/* Active Filter Chips */}
                        <div className="flex flex-wrap items-center gap-2">
                            {activeFilters.map((f) => (
                                <span
                                    key={f.key}
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                >
                                    <span>{f.label}</span>
                                    <button onClick={() => removeFilter(f.key)}>
                                        <X className="w-3 h-3 hover:text-white" />
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <span className="text-xs text-slate-400">Sort By:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="newest">Newest Arrivals</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                            <PackageX className="w-12 h-12 text-slate-600 mx-auto" />
                            <h3 className="text-lg font-bold text-white">No Products Found</h3>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto">
                                No products matched your selected filters. Try clearing some filters.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-md"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    ) : (
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
                                            {!p.inStock && (
                                                <span className="absolute top-2 left-2 bg-rose-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                                                    Out of Stock
                                                </span>
                                            )}
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
        </div>
    );
}
