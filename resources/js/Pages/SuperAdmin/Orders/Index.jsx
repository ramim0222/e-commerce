import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ShoppingBag,
    Search,
    Filter,
    Download,
    Eye,
    CheckCircle2,
    Clock,
    XCircle,
    Truck,
    ArrowLeft,
    CreditCard,
    DollarSign,
    Building2,
} from 'lucide-react';

export default function SuperAdminOrdersIndex({ orders: initialOrders }) {
    const defaultOrders = [
        {
            id: 101,
            orderNumber: 'ORD-2026-99210',
            customerName: 'Rahim Ahmed',
            customerPhone: '+8801712345678',
            vendors: ['TechGear BD'],
            totalAmount: 5260,
            paymentMethod: 'COD',
            paymentStatus: 'unpaid',
            fulfillmentStatus: 'processing',
            date: '2026-08-06',
        },
        {
            id: 102,
            orderNumber: 'ORD-2026-99185',
            customerName: 'Tanvir Hossain',
            customerPhone: '+8801812345679',
            vendors: ['Gadget World'],
            totalAmount: 3010,
            paymentMethod: 'bKash',
            paymentStatus: 'paid',
            fulfillmentStatus: 'shipped',
            date: '2026-08-07',
        },
        {
            id: 103,
            orderNumber: 'ORD-2026-98920',
            customerName: 'Nusrat Jahan',
            customerPhone: '+8801912345680',
            vendors: ['Apex Crafts', 'TechGear BD'],
            totalAmount: 8520,
            paymentMethod: 'Nagad',
            paymentStatus: 'paid',
            fulfillmentStatus: 'delivered',
            date: '2026-08-04',
        },
    ];

    const [orders, setOrders] = useState(initialOrders || defaultOrders);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [paymentFilter, setPaymentFilter] = useState('all');

    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            gsap.fromTo(
                tableRef.current.querySelectorAll('tr'),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [statusFilter, paymentFilter, search]);

    const filteredOrders = orders.filter((o) => {
        const matchesStatus = statusFilter === 'all' || o.fulfillmentStatus === statusFilter;
        const matchesPayment = paymentFilter === 'all' || o.paymentMethod.toLowerCase() === paymentFilter.toLowerCase();
        const matchesSearch =
            o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(search.toLowerCase()) ||
            o.customerPhone.includes(search);
        return matchesStatus && matchesPayment && matchesSearch;
    });

    const exportCSV = () => {
        alert('Exporting order operations log as CSV...');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
            <Head title="SuperAdmin - Marketplace Orders Operations" />

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
                            <ShoppingBag className="w-6 h-6 text-emerald-400" />
                            <span>Platform Orders Master Control</span>
                            <span className="text-xs bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                                {orders.length} Total
                            </span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Monitor cross-vendor order splits, payment status, and courier fulfillment dispatch.
                        </p>
                    </div>
                </div>

                <button
                    onClick={exportCSV}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                    <Download className="w-4 h-4 text-emerald-400" />
                    <span>Export CSV</span>
                </button>
            </div>

            {/* Advanced Filters Toolbar */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="all">All Fulfillment Statuses</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>

                        <select
                            value={paymentFilter}
                            onChange={(e) => setPaymentFilter(e.target.value)}
                            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="all">All Payment Methods</option>
                            <option value="cod">Cash on Delivery (COD)</option>
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                        </select>
                    </div>

                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search order #, customer or phone..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            {/* Operations Dense Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                <th className="py-3.5 px-4">Order ID</th>
                                <th className="py-3.5 px-4">Customer</th>
                                <th className="py-3.5 px-4">Vendor Splits</th>
                                <th className="py-3.5 px-4">Total Amount</th>
                                <th className="py-3.5 px-4">Payment</th>
                                <th className="py-3.5 px-4">Fulfillment</th>
                                <th className="py-3.5 px-4">Date</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody ref={tableRef} className="divide-y divide-slate-800/60 text-xs">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="text-center py-12 text-slate-500">
                                        No platform orders found matching filter criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((o) => (
                                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3.5 px-4 font-mono font-bold text-white">
                                            <Link href={`/admin/orders/${o.id}`} className="hover:text-emerald-400">
                                                {o.orderNumber}
                                            </Link>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <p className="font-semibold text-white">{o.customerName}</p>
                                            <p className="text-[11px] text-slate-400 font-mono">{o.customerPhone}</p>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {o.vendors.map((v, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded border border-slate-700 font-medium"
                                                    >
                                                        {v}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-extrabold text-emerald-400">
                                            ৳{o.totalAmount.toLocaleString()}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                    o.paymentStatus === 'paid'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}
                                            >
                                                {o.paymentMethod} ({o.paymentStatus})
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span
                                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                                                    o.fulfillmentStatus === 'delivered'
                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                        : o.fulfillmentStatus === 'shipped'
                                                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}
                                            >
                                                {o.fulfillmentStatus}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-400">{o.date}</td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={`/admin/orders/${o.id}`}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> Inspect
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
