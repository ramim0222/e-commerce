import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    Package,
    Plus,
    Trash2,
    Upload,
    Star,
    Layers,
    Save,
    CheckCircle2,
    DollarSign,
    Image as ImageIcon,
    Tag,
    X,
    Loader2,
} from 'lucide-react';

export default function VendorProductForm({ product: initialProduct, categories: initialCategories }) {
    const isEditing = !!initialProduct;

    const defaultCategories = [
        { id: 1, name: 'Electronics & Gadgets' },
        { id: 11, name: 'Smartphones & Feature Phones' },
        { id: 12, name: 'Laptops & Computers' },
        { id: 2, name: 'Fashion & Apparel' },
        { id: 21, name: "Men's Clothing" },
        { id: 22, name: "Women's Fashion" },
    ];

    const categories = initialCategories || defaultCategories;

    const [form, setForm] = useState({
        title_en: initialProduct?.title_en || '',
        title_bn: initialProduct?.title_bn || '',
        slug: initialProduct?.slug || '',
        description_en: initialProduct?.description_en || '',
        description_bn: initialProduct?.description_bn || '',
        category_id: initialProduct?.category_id || '',
        price: initialProduct?.price || '',
        compare_price: initialProduct?.compare_price || '',
        sku: initialProduct?.sku || '',
        stock: initialProduct?.stock || '',
        status: initialProduct?.status || 'active',
        images: initialProduct?.images || [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        ],
        primaryImageIndex: 0,
        variants: initialProduct?.variants || [
            { id: 1, color: 'Black', size: 'M', sku: 'SKU-01-BLK-M', price: '', stock: 10 },
            { id: 2, color: 'Black', size: 'L', sku: 'SKU-01-BLK-L', price: '', stock: 15 },
        ],
    });

    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('basic');
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleTitleChange = (val) => {
        setForm((prev) => ({
            ...prev,
            title_en: val,
            slug: val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        }));
    };

    // Variant Builder Handlers
    const addVariant = () => {
        setForm((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    id: Date.now(),
                    color: '',
                    size: '',
                    sku: prev.sku ? `${prev.sku}-V${prev.variants.length + 1}` : '',
                    price: '',
                    stock: 5,
                },
            ],
        }));
    };

    const updateVariant = (id, field, value) => {
        setForm((prev) => ({
            ...prev,
            variants: prev.variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
        }));
    };

    const removeVariant = (id) => {
        setForm((prev) => ({
            ...prev,
            variants: prev.variants.filter((v) => v.id !== id),
        }));
    };

    // Image Handlers
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImageUrls = files.map((file) => URL.createObjectURL(file));
        setForm((prev) => ({ ...prev, images: [...prev.images, ...newImageUrls] }));
    };

    const removeImage = (idx) => {
        setForm((prev) => {
            const nextImages = prev.images.filter((_, i) => i !== idx);
            return {
                ...prev,
                images: nextImages,
                primaryImageIndex: prev.primaryImageIndex >= nextImages.length ? 0 : prev.primaryImageIndex,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isEditing
            ? `/api/v1/vendor/products/${initialProduct.id}`
            : '/api/v1/vendor/products';

        router.post(url, form, {
            onSuccess: () => router.visit('/vendor/products'),
            onFinish: () => setLoading(false),
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
            <Head title={isEditing ? `Edit Product - ${form.title_en}` : 'Add New Product'} />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/vendor/products"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                            <Package className="w-6 h-6 text-emerald-400" />
                            <span>{isEditing ? 'Edit Product' : 'Add New Product'}</span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Fill in product details, variants, images, and inventory stock.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/vendor/products"
                        className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{isEditing ? 'Update Product' : 'Save & Publish'}</span>
                    </button>
                </div>
            </div>

            {/* Form Form Sections */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Basic Information */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                        <Tag className="w-4 h-4 text-emerald-400" />
                        <span>Basic Product Information</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Product Title (English) *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.title_en}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="e.g. Wireless Noise Canceling Headphones"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                পণ্যের নাম (বাংলা) *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.title_bn}
                                onChange={(e) => handleChange('title_bn', e.target.value)}
                                placeholder="যেমন: ওয়ারলেস হেডফোন"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                URL Slug
                            </label>
                            <input
                                type="text"
                                value={form.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 font-mono focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Category *
                            </label>
                            <select
                                value={form.category_id}
                                onChange={(e) => handleChange('category_id', e.target.value)}
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="">Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Description (English)
                        </label>
                        <textarea
                            rows={3}
                            value={form.description_en}
                            onChange={(e) => handleChange('description_en', e.target.value)}
                            placeholder="Detail feature specifications..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* 2. Pricing & Inventory */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                        <DollarSign className="w-4 h-4 text-emerald-400" />
                        <span>Pricing & Inventory Stock</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Selling Price (৳) *
                            </label>
                            <input
                                type="number"
                                required
                                value={form.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                placeholder="4500"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-bold"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Compare Price (৳)
                            </label>
                            <input
                                type="number"
                                value={form.compare_price}
                                onChange={(e) => handleChange('compare_price', e.target.value)}
                                placeholder="5200"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 focus:border-emerald-500 focus:outline-none line-through"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Base SKU Code *
                            </label>
                            <input
                                type="text"
                                required
                                value={form.sku}
                                onChange={(e) => handleChange('sku', e.target.value)}
                                placeholder="SKU-HD-9921"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                required
                                value={form.stock}
                                onChange={(e) => handleChange('stock', e.target.value)}
                                placeholder="25"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Product Variants Builder */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                            <Layers className="w-4 h-4 text-emerald-400" />
                            <span>Product Variants (Colors / Sizes)</span>
                        </h3>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Variant Option
                        </button>
                    </div>

                    <div className="space-y-3">
                        {form.variants.map((v, idx) => (
                            <div
                                key={v.id}
                                className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl items-center"
                            >
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                                        Color / Attribute
                                    </label>
                                    <input
                                        type="text"
                                        value={v.color}
                                        onChange={(e) => updateVariant(v.id, 'color', e.target.value)}
                                        placeholder="Black / Navy"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                                        Size
                                    </label>
                                    <input
                                        type="text"
                                        value={v.size}
                                        onChange={(e) => updateVariant(v.id, 'size', e.target.value)}
                                        placeholder="M / L / XL"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                                        Variant SKU
                                    </label>
                                    <input
                                        type="text"
                                        value={v.sku}
                                        onChange={(e) => updateVariant(v.id, 'sku', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                                        Stock Quantity
                                    </label>
                                    <input
                                        type="number"
                                        value={v.stock}
                                        onChange={(e) => updateVariant(v.id, 'stock', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                                    />
                                </div>
                                <div className="flex justify-end pt-3 sm:pt-0">
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(v.id)}
                                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Product Gallery & Images */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
                        <ImageIcon className="w-4 h-4 text-emerald-400" />
                        <span>Product Images & Gallery</span>
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {form.images.map((img, idx) => (
                            <div
                                key={idx}
                                className={`relative rounded-xl overflow-hidden border-2 h-28 group transition-all ${
                                    form.primaryImageIndex === idx
                                        ? 'border-emerald-500 shadow-md shadow-emerald-500/20'
                                        : 'border-slate-800'
                                }`}
                            >
                                <img src={img} alt="Product" className="w-full h-full object-cover" />
                                {form.primaryImageIndex === idx && (
                                    <span className="absolute top-1.5 left-1.5 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-slate-950" /> Primary
                                    </span>
                                )}
                                <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => handleChange('primaryImageIndex', idx)}
                                        className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                                        title="Set as Primary"
                                    >
                                        <Star className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-400"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Upload Box */}
                        <label className="border-2 border-dashed border-slate-800 hover:border-emerald-500/70 rounded-xl h-28 flex flex-col items-center justify-center cursor-pointer bg-slate-950/40 text-slate-400 hover:text-emerald-400 transition-colors">
                            <Upload className="w-6 h-6 mb-1" />
                            <span className="text-[11px] font-medium">Add Images</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* 5. Status Control */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-white text-sm">Product Visibility Status</h4>
                        <p className="text-xs text-slate-400">
                            Draft products remain hidden from the storefront marketplace catalog.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleChange('status', 'draft')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                form.status === 'draft'
                                    ? 'bg-slate-700 text-white'
                                    : 'bg-slate-950 text-slate-500'
                            }`}
                        >
                            Draft
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChange('status', 'active')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                form.status === 'active'
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-950 text-slate-500'
                            }`}
                        >
                            Active & Published
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
