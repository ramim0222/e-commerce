import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Store,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    XCircle,
    Eye,
    Building2,
    Users,
    Package,
    ShieldAlert,
    ChevronRight,
    ArrowUpDown,
    MoreVertical,
    Sparkles,
} from 'lucide-react';

export default function VendorsIndex({ vendors: initialVendors }) {
    const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pending' | 'approved' | 'suspended'
    const [search, setSearch] = useState('');
    const tableRef = useRef(null);

    // Mock data fallback if props are not yet passed from Laravel backend
    const mockVendors = [
        {
            id: 1,
            businessName: 'Dhaka Fashion Wear',
            ownerName: 'Rahim Ahmed',
            phone: '+8801712345678',
            status: 'pending',
            productCount: 0,
            joinDate: '2026-08-05',
            nid: '1992269123456',
        },
        {
            id: 2,
            businessName: 'Chittagong Electronics',
            ownerName: 'Tanvir Hossain',
            phone: '+8801812345679',
            status: 'approved',
            productCount: 42,
            joinDate: '2026-07-20',
            nid: '1988269987654',
        },
        {
            id: 3,
            businessName: 'Sylhet Organic Tea & Crafts',
            ownerName: 'Nusrat Jahan',
            phone: '+8801912345680',
            status: 'pending',
            productCount: 0,
            joinDate: '2026-08-06',
            nid: '1995269112233',
        },
        {
            id: 4,
            businessName: 'Rajshahi Silk House',
            ownerName: 'Karim Ullah',
            phone: '+8801512345681',
            status: 'suspended',
            productCount: 18,
            joinDate: '2026-06-15',
            nid: '1985269445566',
        },
    ];

    const vendorList = initialVendors || mockVendors;

    useEffect(() => {
        if (tableRef.current) {
            gsap.fromTo(
                tableRef.current.querySelectorAll('tr'),
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [activeTab, search]);

    const filteredVendors = vendorList.filter((v) => {
        const matchesTab = activeTab === 'all' || v.status === activeTab;
        const matchesSearch =
            v.businessName.toLowerCase().includes(search.toLowerCase()) ||
            v.ownerName.toLowerCase().includes(search.toLowerCase()) ||
            v.phone.includes(search);
        return matchesTab && matchesSearch;
    });

    const pendingCount = vendorList.filter((v) => v.status === 'pending').length;
    const approvedCount = vendorList.filter((v) => v.status === 'approved').length;
    const suspendedCount = vendorList.filter((v) => v.status === 'suspended').length;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between hidden md:flex">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950">
                            SA
                        </div>
                        <div>
                            <h2 className="font-bold text-sm text-white">SuperAdmin</h2>
                            <p className="text-[11px] text-emerald-400 font-medium">Platform Control</p>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors text-xs font-medium"
                        >
                            <Package className="w-4 h-4" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/vendors"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold"
                        >
                            <Store className="w-4 h-4" />
                            <span>Vendors Management</span>
                            {pendingCount > 0 && (
                                <span className="ml-auto bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {pendingCount}
                                </span>
                            )}
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
                <Head title="SuperAdmin - Vendors Management" />

                {/* Header Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                            <span>Vendors & Merchants</span>
                            <span className="text-xs bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                                {vendorList.length} Total
                            </span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Approve vendor KYC applications, manage store accounts, and monitor merchant statuses.
                        </p>
                    </div>
                </div>

                {/* Top Metrics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Pending Approval</p>
                            <p className="text-2xl font-bold text-amber-400 mt-1">{pendingCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                            <Clock className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Approved Merchants</p>
                            <p className="text-2xl font-bold text-emerald-400 mt-1">{approvedCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400 font-medium">Suspended Accounts</p>
                            <p className="text-2xl font-bold text-rose-400 mt-1">{suspendedCount}</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                            <XCircle className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    {/* Status Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        {[
                            { key: 'all', label: 'All Vendors', count: vendorList.length },
                            {
                                key: 'pending',
                                label: 'Pending Approval',
                                count: pendingCount,
                                isPendingTab: true,
                            },
                            { key: 'approved', label: 'Approved', count: approvedCount },
                            { key: 'suspended', label: 'Suspended', count: suspendedCount },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                                    activeTab === tab.key
                                        ? tab.isPendingTab
                                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                            : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                        : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                        activeTab === tab.key
                                            ? 'bg-slate-950/20 text-slate-950'
                                            : 'bg-slate-950 text-slate-300'
                                    }`}
                                >
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search vendor or phone..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                        />
                        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Vendors Table */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                    <th className="py-3.5 px-4">Business & Owner</th>
                                    <th className="py-3.5 px-4">Phone Number</th>
                                    <th className="py-3.5 px-4">Status</th>
                                    <th className="py-3.5 px-4">Products</th>
                                    <th className="py-3.5 px-4">Joined Date</th>
                                    <th className="py-3.5 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody ref={tableRef} className="divide-y divide-slate-800/60 text-xs">
                                {filteredVendors.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-slate-500">
                                            No vendors found matching criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVendors.map((vendor) => (
                                        <tr key={vendor.id} className="hover:bg-slate-800/40 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-emerald-400">
                                                        <Building2 className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white">
                                                            {vendor.businessName}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            {vendor.ownerName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-slate-300">
                                                {vendor.phone}
                                            </td>
                                            <td className="py-3.5 px-4">
                                                {vendor.status === 'pending' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                                        <Clock className="w-3 h-3" />
                                                        Pending
                                                    </span>
                                                )}
                                                {vendor.status === 'approved' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Approved
                                                    </span>
                                                )}
                                                {vendor.status === 'suspended' && (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                        <XCircle className="w-3 h-3" />
                                                        Suspended
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-3.5 px-4 font-semibold text-slate-300">
                                                {vendor.productCount} items
                                            </td>
                                            <td className="py-3.5 px-4 text-slate-400">
                                                {vendor.joinDate}
                                            </td>
                                            <td className="py-3.5 px-4 text-right">
                                                <Link
                                                    href={`/admin/vendors/${vendor.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Review</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
