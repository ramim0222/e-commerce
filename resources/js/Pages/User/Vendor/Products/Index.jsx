import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Plus,
    Search,
    Filter,
    Package,
    Edit3,
    Trash2,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    CheckSquare,
    Square,
    Eye,
    TrendingUp,
    Building2,
    ArrowUpDown,
    MoreHorizontal,
    ToggleLeft,
    ToggleRight,
} from 'lucide-react';

export default function VendorProductsIndex({ products: initialProducts }) {
    const defaultProducts = [
        {
            id: 1,
            title: 'Wireless Noise Canceling Headphones',
            sku: 'SKU-HD-9921',
            price: 4500,
            stock: 24,
            category: 'Electronics',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80',
        },
        {
            id: 2,
            title: 'Premium Cotton Panjabi - Olive Green',
            sku: 'SKU-PJ-1022',
            price: 2800,
            stock: 3, // Low stock
            category: 'Fashion',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf03b0?w=400&auto=format&fit=crop&q=80',
        },
        {
            id: 3,
            title: 'Smart Fitness Tracker Watch V2',
            sku: 'SKU-SW-3044',
            price: 3200,
            stock: 0, // Out of stock
            category: 'Electronics',
            status: 'draft',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80',
        },
        {
            id: 4,
            title: 'Handcrafted Jute Tote Bag',
            sku: 'SKU-BG-4401',
            price: 950,
            stock: 50,
            category: 'Crafts',
            status: 'active',
            image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&auto=format&fit=crop&q=80',
        },
    ];

    const [products, setProducts] = useState(initialProducts || defaultProducts);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            gsap.fromTo(
                tableRef.current.querySelectorAll('tr'),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [statusFilter, search]);

    const toggleStatus = (id) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: p.status === 'active' ? 'draft' : 'active' } : p))
        );
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredProducts.map((p) => p.id));
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const filteredProducts = products.filter((p) => {
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const matchesSearch =
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.sku.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            <Head title="Vendor - Products Catalog" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Package className="w-6 h-6 text-emerald-400" />
                        <span>Products Catalog</span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                            {products.length} Total
                        </span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Manage your inventory, prices, SKUs, and store product visibility.
                    </p>
                </div>

                <Link
                    href="/vendor/products/create"
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                </Link>
            </div>

            {/* Filters Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                    {['all', 'active', 'draft'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                                statusFilter === status
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-800/70 text-slate-400 hover:text-white'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search product title, SKU, category..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedIds.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-400">
                    <span>{selectedIds.length} item(s) selected</span>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                            Bulk Activate
                        </button>
                        <button className="px-3 py-1 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 rounded-lg transition-colors">
                            Delete Selected
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <th className="py-3.5 px-4 w-10">
                                    <button onClick={toggleSelectAll}>
                                        {selectedIds.length === filteredProducts.length && filteredProducts.length > 0 ? (
                                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <Square className="w-4 h-4 text-slate-500" />
                                        )}
                                    </button>
                                </th>
                                <th className="py-3.5 px-4">Product</th>
                                <th className="py-3.5 px-4">SKU</th>
                                <th className="py-3.5 px-4">Price</th>
                                <th className="py-3.5 px-4">Inventory Stock</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody ref={tableRef} className="divide-y divide-slate-800/60 text-xs">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-slate-500">
                                        No products found in catalog.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3.5 px-4">
                                            <button onClick={() => toggleSelectOne(p.id)}>
                                                {selectedIds.includes(p.id) ? (
                                                    <CheckSquare className="w-4 h-4 text-emerald-400" />
                                                ) : (
                                                    <Square className="w-4 h-4 text-slate-500" />
                                                )}
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-10 h-10 object-cover rounded-lg border border-slate-700 shrink-0"
                                                />
                                                <div>
                                                    <Link
                                                        href={`/vendor/products/${p.id}/edit`}
                                                        className="font-semibold text-white hover:text-emerald-400 transition-colors line-clamp-1"
                                                    >
                                                        {p.title}
                                                    </Link>
                                                    <span className="text-[10px] text-slate-400">
                                                        {p.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-mono text-slate-400">{p.sku}</td>
                                        <td className="py-3.5 px-4 font-bold text-white">৳{p.price.toLocaleString()}</td>
                                        <td className="py-3.5 px-4">
                                            {p.stock === 0 ? (
                                                <span className="text-rose-400 font-semibold flex items-center gap-1">
                                                    <XCircle className="w-3.5 h-3.5" /> Out of stock
                                                </span>
                                            ) : p.stock <= 5 ? (
                                                <span className="text-amber-400 font-semibold flex items-center gap-1">
                                                    <AlertTriangle className="w-3.5 h-3.5" /> Low stock ({p.stock})
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 font-medium">{p.stock} in stock</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <button
                                                onClick={() => toggleStatus(p.id)}
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                                                    p.status === 'active'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : 'bg-slate-800 text-slate-400 border-slate-700'
                                                }`}
                                            >
                                                {p.status === 'active' ? 'Active' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={`/vendor/products/${p.id}/edit`}
                                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-block"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
