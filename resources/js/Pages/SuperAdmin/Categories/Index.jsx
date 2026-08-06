import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    FolderTree,
    Plus,
    Edit3,
    Trash2,
    ChevronRight,
    ChevronDown,
    Folder,
    FolderOpen,
    Image as ImageIcon,
    X,
    Save,
    Layers,
    ArrowLeft,
    Check,
    Search,
} from 'lucide-react';

export default function CategoriesIndex({ categories: initialCategories }) {
    const defaultCategories = [
        {
            id: 1,
            name_en: 'Electronics & Gadgets',
            name_bn: 'ইলেকট্রনিক্স ও গ্যাজেট',
            slug: 'electronics-gadgets',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&auto=format&fit=crop&q=80',
            parentId: null,
            children: [
                {
                    id: 11,
                    name_en: 'Smartphones & Feature Phones',
                    name_bn: 'স্মার্টফোন ও ফিচার ফোন',
                    slug: 'smartphones',
                    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80',
                    parentId: 1,
                    children: [],
                },
                {
                    id: 12,
                    name_en: 'Laptops & Computers',
                    name_bn: 'ল্যাপটপ ও কম্পিউটার',
                    slug: 'laptops-computers',
                    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80',
                    parentId: 1,
                    children: [],
                },
            ],
        },
        {
            id: 2,
            name_en: 'Fashion & Apparel',
            name_bn: 'ফ্যাশন ও পোশাক',
            slug: 'fashion-apparel',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&auto=format&fit=crop&q=80',
            parentId: null,
            children: [
                {
                    id: 21,
                    name_en: "Men's Clothing",
                    name_bn: 'পুরুষের পোশাক',
                    slug: 'mens-clothing',
                    image: 'https://images.unsplash.com/photo-1490578474895-699bc4e2cf59?w=400&auto=format&fit=crop&q=80',
                    parentId: 2,
                    children: [],
                },
                {
                    id: 22,
                    name_en: "Women's Fashion",
                    name_bn: 'নারীদের ফ্যাশন',
                    slug: 'womens-fashion',
                    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=80',
                    parentId: 2,
                    children: [],
                },
            ],
        },
    ];

    const [categories, setCategories] = useState(initialCategories || defaultCategories);
    const [expanded, setExpanded] = useState({ 1: true, 2: true });
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [formData, setFormData] = useState({
        name_en: '',
        name_bn: '',
        slug: '',
        parentId: '',
        image: '',
    });

    const modalRef = useRef(null);

    useEffect(() => {
        if (isModalOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.94, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isModalOpen]);

    const toggleExpand = (id) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const openAddModal = (parentId = '') => {
        setEditingCategory(null);
        setFormData({ name_en: '', name_bn: '', slug: '', parentId: parentId ? String(parentId) : '', image: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (cat) => {
        setEditingCategory(cat);
        setFormData({
            name_en: cat.name_en,
            name_bn: cat.name_bn || '',
            slug: cat.slug,
            parentId: cat.parentId ? String(cat.parentId) : '',
            image: cat.image || '',
        });
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        router.post(
            editingCategory ? `/api/v1/admin/categories/${editingCategory.id}` : '/api/v1/admin/categories',
            formData,
            {
                onSuccess: () => setIsModalOpen(false),
                onFinish: () => setIsModalOpen(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
            {/* Main Container */}
            <main className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
                <Head title="SuperAdmin - Category Tree Management" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/dashboard"
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                <FolderTree className="w-6 h-6 text-emerald-400" />
                                <span>Category Tree Management</span>
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Organize marketplace categories, sub-categories, and localized Bangla names.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => openAddModal()}
                        className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Root Category</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search category by name or Bangla name..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>

                {/* Category Tree View Container */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40">
                            {/* Parent Row */}
                            <div className="flex items-center justify-between p-3.5 bg-slate-900/90 hover:bg-slate-800/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleExpand(cat.id)}
                                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                                    >
                                        {expanded[cat.id] ? (
                                            <ChevronDown className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>
                                    {cat.image ? (
                                        <img
                                            src={cat.image}
                                            alt={cat.name_en}
                                            className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                                            <Folder className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-sm text-white">{cat.name_en}</h3>
                                            <span className="text-xs text-emerald-400 font-medium font-bn">
                                                ({cat.name_bn})
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 font-mono">/{cat.slug}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => openAddModal(cat.id)}
                                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3 h-3 text-emerald-400" /> Sub
                                    </button>
                                    <button
                                        onClick={() => openEditModal(cat)}
                                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Children Tree */}
                            {expanded[cat.id] && cat.children && cat.children.length > 0 && (
                                <div className="divide-y divide-slate-800/40 pl-8 pr-4 py-2 bg-slate-950/70 border-t border-slate-800/60 space-y-1">
                                    {cat.children.map((sub) => (
                                        <div
                                            key={sub.id}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/30 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Layers className="w-3.5 h-3.5 text-slate-500" />
                                                <div>
                                                    <span className="font-semibold text-xs text-slate-200">
                                                        {sub.name_en}
                                                    </span>
                                                    <span className="text-xs text-slate-400 ml-2 font-bn">
                                                        ({sub.name_bn})
                                                    </span>
                                                    <p className="text-[10px] text-slate-500 font-mono">/{sub.slug}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <button
                                                    onClick={() => openEditModal(sub)}
                                                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Add / Edit Category Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div
                        ref={modalRef}
                        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl"
                    >
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <h3 className="font-bold text-white text-base">
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Category Name (English) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name_en}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name_en: e.target.value,
                                            slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                                        })
                                    }
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    ক্যাটাগরি নাম (বাংলা) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name_bn}
                                    onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    URL Slug
                                </label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:border-emerald-500 focus:outline-none font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">
                                    Category Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                                >
                                    <Save className="w-4 h-4" /> Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
