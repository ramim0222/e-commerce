import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingCart,
    Star,
    ShieldCheck,
    Truck,
    RotateCcw,
    Store,
    Plus,
    Minus,
    Heart,
    Share2,
    Check,
    AlertCircle,
    ChevronRight,
    MessageCircle,
    CheckCircle2,
    Zap,
} from 'lucide-react';

export default function ProductDetail({ product: initialProduct }) {
    const defaultProduct = {
        id: 101,
        title: 'Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Headphones',
        brand: 'Anker',
        price: 5200,
        comparePrice: 6800,
        rating: 4.9,
        reviewCount: 128,
        sku: 'SKU-ANK-Q30',
        inStock: true,
        stockCount: 18,
        vendor: {
            id: 2,
            name: 'TechGear BD',
            rating: 4.9,
            logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
        },
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
        ],
        colors: [
            { name: 'Matte Black', class: 'bg-slate-900' },
            { name: 'Navy Blue', class: 'bg-blue-900' },
            { name: 'Silver Gray', class: 'bg-slate-400' },
        ],
        sizes: ['Standard', 'Pro Foam Cushion'],
        description:
            'Advanced Hybrid Active Noise Cancellation reduces up to 95% of low-frequency ambient sound. Features 40mm silk-diaphragm drivers, Hi-Res Audio certification, and 40-hour battery life with Fast Charging.',
        specs: [
            { label: 'Bluetooth Version', value: 'V5.0' },
            { label: 'Battery Life', value: '40 Hours (ANC On) / 60 Hours (ANC Off)' },
            { label: 'Fast Charge', value: '5 mins = 4 hours playtime' },
            { label: 'Warranty', value: '18 Months Official Warranty' },
        ],
    };

    const product = initialProduct || defaultProduct;

    const [selectedImg, setSelectedImg] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [addedToCart, setAddedToCart] = useState(false);

    const mainImgRef = useRef(null);

    useEffect(() => {
        if (mainImgRef.current) {
            gsap.fromTo(
                mainImgRef.current,
                { opacity: 0.6, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [selectedImg]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col pb-24 md:pb-8">
            <Head title={`${product.title} - E-Commerce BD`} />

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

            {/* Main Product Layout */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 relative">
                            <img
                                ref={mainImgRef}
                                src={product.images[selectedImg]}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-emerald-500 text-slate-950 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                                Official Warranty
                            </span>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImg(idx)}
                                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                        selectedImg === idx
                                            ? 'border-emerald-500 shadow-md shadow-emerald-500/20'
                                            : 'border-slate-800 opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details & Controls */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            {/* Vendor Badge */}
                            <Link
                                href={`/vendor/store/${product.vendor.id}`}
                                className="inline-flex items-center gap-2 text-xs text-emerald-400 font-semibold hover:underline"
                            >
                                <Store className="w-3.5 h-3.5" />
                                <span>Sold by {product.vendor.name}</span>
                            </Link>

                            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                                {product.title}
                            </h1>

                            {/* Ratings & SKU */}
                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1 text-amber-400 font-bold">
                                    <Star className="w-4 h-4 fill-amber-400" />
                                    <span>{product.rating}</span>
                                    <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                                </div>
                                <span className="text-slate-500 font-mono">SKU: {product.sku}</span>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                            <div>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                                        ৳{product.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-slate-500 line-through">
                                        ৳{product.comparePrice.toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                                    Save ৳{(product.comparePrice - product.price).toLocaleString()} (Inclusive of VAT)
                                </p>
                            </div>

                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded-full border border-emerald-500/20">
                                {product.inStock ? `${product.stockCount} In Stock` : 'Out of Stock'}
                            </span>
                        </div>

                        {/* Color Selector */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-300">
                                Color: <span className="text-emerald-400 font-bold">{selectedColor}</span>
                            </label>
                            <div className="flex gap-3">
                                {product.colors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c.name)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${c.class} ${
                                            selectedColor === c.name
                                                ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-slate-950 scale-110'
                                                : 'border-slate-700 opacity-80'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size / Type Selector */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-300">Option / Type</label>
                            <div className="flex gap-3">
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                            selectedSize === s
                                                ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/20'
                                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                                        }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & CTA Buttons */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-2 text-slate-400 hover:text-white"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-2 text-slate-400 hover:text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                                        addedToCart
                                            ? 'bg-emerald-400 text-slate-950'
                                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-98'
                                    }`}
                                >
                                    {addedToCart ? (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span>Added to Cart!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>Fast Island Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>100% Genuine</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <RotateCcw className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>7 Days Replacement</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs: Description, Specs, Reviews */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex border-b border-slate-800 gap-6">
                        {['description', 'specs', 'reviews'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 text-xs font-bold capitalize transition-all border-b-2 ${
                                    activeTab === tab
                                        ? 'border-emerald-500 text-emerald-400'
                                        : 'border-transparent text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'description' && (
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                            {product.description}
                        </p>
                    )}

                    {activeTab === 'specs' && (
                        <div className="max-w-xl space-y-2">
                            {product.specs.map((s, idx) => (
                                <div key={idx} className="flex justify-between py-2 border-b border-slate-800/60 text-xs">
                                    <span className="text-slate-400">{s.label}</span>
                                    <span className="font-semibold text-white">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Mobile Sticky Add-to-Cart Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-3 flex items-center justify-between md:hidden shadow-2xl">
                <div>
                    <p className="text-xs text-slate-400">Total Price</p>
                    <p className="text-lg font-extrabold text-emerald-400">
                        ৳{(product.price * quantity).toLocaleString()}
                    </p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="py-2.5 px-6 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
