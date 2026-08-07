import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingBag,
    Search,
    Truck,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    Package,
    ArrowUpDown,
    RotateCcw,
    Filter,
} from 'lucide-react';

export default function VendorOrdersIndex({ orders: initialOrders }) {
    const defaultOrders = [
        {
            id: 101,
            orderNumber: 'ORD-2026-99210',
            customerName: 'Rahim Ahmed',
            itemsCount: 2,
            totalAmount: 5200,
            status: 'processing', // 'new' | 'processing' | 'shipped' | 'delivered' | 'returned'
            orderDate: '2026-08-06',
        },
        {
            id: 102,
            orderNumber: 'ORD-2026-99185',
            customerName: 'Tanvir Hossain',
            itemsCount: 1,
            totalAmount: 2950,
            status: 'new',
            orderDate: '2026-08-07',
        },
        {
            id: 103,
            orderNumber: 'ORD-2026-98920',
            customerName: 'Nusrat Jahan',
            itemsCount: 3,
            totalAmount: 8400,
            status: 'shipped',
            orderDate: '2026-08-04',
        },
        {
            id: 104,
            orderNumber: 'ORD-2026-98511',
            customerName: 'Karim Ullah',
            itemsCount: 1,
            totalAmount: 1200,
            status: 'delivered',
            orderDate: '2026-07-28',
        },
    ];

    const [orders, setOrders] = useState(initialOrders || defaultOrders);
    const [activeTab, setActiveTab] = useState('all');
    const [search, setSearch] = useState('');
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            gsap.fromTo(
                tableRef.current.querySelectorAll('tr'),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [activeTab, search]);

    const markAsShipped = (orderId) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: 'shipped' } : o))
        );
    };

    const filteredOrders = orders.filter((o) => {
        const matchesTab = activeTab === 'all' || o.status === activeTab;
        const matchesSearch =
            o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            <Head title="Vendor - Order Fulfillment" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <ShoppingBag className="w-6 h-6 text-emerald-400" />
                        <span>Vendor Orders & Fulfillment</span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                            {orders.length} Total
                        </span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Manage customer order splits, print packing slips, and trigger shipping updates.
                    </p>
                </div>
            </div>

            {/* Status Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                    {[
                        { key: 'all', label: 'All Orders' },
                        { key: 'new', label: 'New Orders' },
                        { key: 'processing', label: 'Processing' },
                        { key: 'shipped', label: 'Shipped' },
                        { key: 'delivered', label: 'Delivered' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                activeTab === tab.key
                                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                    : 'bg-slate-800/70 text-slate-400 hover:text-white'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search order # or customer..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <th className="py-3.5 px-4">Order Details</th>
                                <th className="py-3.5 px-4">Customer</th>
                                <th className="py-3.5 px-4">Items</th>
                                <th className="py-3.5 px-4">Vendor Payout</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4">Order Date</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody ref={tableRef} className="divide-y divide-slate-800/60 text-xs">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-slate-500">
                                        No orders found matching status filter.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                                            <Link href={`/vendor/orders/${o.id}`} className="hover:text-emerald-400">
                                                {o.orderNumber}
                                            </Link>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-200 font-medium">{o.customerName}</td>
                                        <td className="py-3.5 px-4 text-slate-300">{o.itemsCount} item(s)</td>
                                        <td className="py-3.5 px-4 font-bold text-emerald-400">
                                            ৳{o.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            {o.status === 'new' && (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                    New Order
                                                </span>
                                            )}
                                            {o.status === 'processing' && (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                    Processing
                                                </span>
                                            )}
                                            {o.status === 'shipped' && (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                                    Shipped
                                                </span>
                                            )}
                                            {o.status === 'delivered' && (
                                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    Delivered
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-400">{o.orderDate}</td>
                                        <td className="py-3.5 px-4 text-right space-x-2">
                                            {o.status === 'processing' && (
                                                <button
                                                    onClick={() => markAsShipped(o.id)}
                                                    className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 text-xs font-semibold transition-all inline-flex items-center gap-1"
                                                >
                                                    <Truck className="w-3 h-3" /> Ship
                                                </button>
                                            )}
                                            <Link
                                                href={`/vendor/orders/${o.id}`}
                                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-block"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
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
