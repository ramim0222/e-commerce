import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
    FileText,
    Shield,
    DollarSign,
    TrendingUp,
    ShoppingBag,
    Star,
    Percent,
    AlertTriangle,
    Eye,
    Check,
    X,
    Save,
    Loader2,
} from 'lucide-react';

export default function VendorDetail({ vendor: initialVendor }) {
    const defaultVendor = {
        id: 1,
        businessName: 'Dhaka Fashion Wear',
        ownerName: 'Rahim Ahmed',
        phone: '+8801712345678',
        email: 'rahim@dhakafashion.com',
        status: 'pending', // 'pending' | 'approved' | 'suspended'
        nidNumber: '1992269123456',
        tradeLicenseNo: 'TL-882910',
        tradeLicenseFileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
        nidFileUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&auto=format&fit=crop&q=80',
        commissionRate: 10.0,
        totalSales: 145000,
        totalOrders: 320,
        rating: 4.8,
        productCount: 45,
        joinedDate: '2026-08-05',
    };

    const vendor = initialVendor || defaultVendor;

    const [status, setStatus] = useState(vendor.status);
    const [commission, setCommission] = useState(vendor.commissionRate);
    const [isSavingCommission, setIsSavingCommission] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // 'approve' | 'suspend' | 'doc_preview'
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [processingAction, setProcessingAction] = useState(false);

    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    const handleApprove = () => {
        setProcessingAction(true);
        router.post(
            `/api/v1/admin/vendors/${vendor.id}/approve`,
            {},
            {
                onSuccess: () => {
                    setStatus('approved');
                    setActiveModal(null);
                },
                onFinish: () => setProcessingAction(false),
            }
        );
    };

    const handleSuspend = () => {
        setProcessingAction(true);
        router.post(
            `/api/v1/admin/vendors/${vendor.id}/suspend`,
            {},
            {
                onSuccess: () => {
                    setStatus('suspended');
                    setActiveModal(null);
                },
                onFinish: () => setProcessingAction(false),
            }
        );
    };

    const handleSaveCommission = (e) => {
        e.preventDefault();
        setIsSavingCommission(true);
        router.post(
            `/api/v1/admin/vendors/${vendor.id}/commission`,
            { commission_rate: commission },
            {
                onSuccess: () => setIsSavingCommission(false),
                onFinish: () => setIsSavingCommission(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex">
            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
                <Head title={`SuperAdmin - Vendor ${vendor.businessName}`} />

                {/* Top Navigation & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/vendors"
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-white tracking-tight">
                                    {vendor.businessName}
                                </h1>
                                {status === 'pending' && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Pending Review
                                    </span>
                                )}
                                {status === 'approved' && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Approved
                                    </span>
                                )}
                                {status === 'suspended' && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1">
                                        <XCircle className="w-3 h-3" /> Suspended
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Owner: {vendor.ownerName} • Phone: {vendor.phone}
                            </p>
                        </div>
                    </div>

                    {/* Header Workflow Buttons */}
                    <div className="flex items-center gap-2">
                        {status === 'pending' && (
                            <button
                                onClick={() => setActiveModal('approve')}
                                className="px-4 py-2 rounded-xl font-semibold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                            >
                                <Check className="w-4 h-4" />
                                <span>Approve Application</span>
                            </button>
                        )}

                        {status === 'approved' && (
                            <button
                                onClick={() => setActiveModal('suspend')}
                                className="px-4 py-2 rounded-xl font-semibold text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 transition-all"
                            >
                                <XCircle className="w-4 h-4" />
                                <span>Suspend Vendor</span>
                            </button>
                        )}

                        {status === 'suspended' && (
                            <button
                                onClick={() => setActiveModal('approve')}
                                className="px-4 py-2 rounded-xl font-semibold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Reactivate Account</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Dashboard Grid Layout */}
                <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Summary Cards Column (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                                    <span>Total Sales</span>
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>
                                <p className="text-xl font-bold text-white mt-2">
                                    ৳{vendor.totalSales.toLocaleString()}
                                </p>
                            </div>

                            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                                    <span>Total Orders</span>
                                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                                </div>
                                <p className="text-xl font-bold text-white mt-2">
                                    {vendor.totalOrders}
                                </p>
                            </div>

                            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                                    <span>Products</span>
                                    <Building2 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <p className="text-xl font-bold text-white mt-2">
                                    {vendor.productCount}
                                </p>
                            </div>

                            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                                    <span>Rating</span>
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                </div>
                                <p className="text-xl font-bold text-white mt-2">
                                    {vendor.rating} / 5.0
                                </p>
                            </div>
                        </div>

                        {/* KYC Verification & Document Viewer Panel */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    <span>KYC Documents & Verification</span>
                                </h3>
                                <span className="text-xs text-slate-400">
                                    NID & Trade License Review
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* NID Card */}
                                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-300">
                                            National ID (NID)
                                        </span>
                                        <span className="text-xs font-mono text-emerald-400">
                                            {vendor.nidNumber}
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSelectedDoc(vendor.nidFileUrl);
                                            setActiveModal('doc_preview');
                                        }}
                                        className="h-36 rounded-lg overflow-hidden border border-slate-800 relative group cursor-pointer"
                                    >
                                        <img
                                            src={vendor.nidFileUrl}
                                            alt="NID Document"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-xs font-medium text-white flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                                                <Eye className="w-3.5 h-3.5" /> Preview Document
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Trade License Card */}
                                <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-slate-300">
                                            Trade License
                                        </span>
                                        <span className="text-xs font-mono text-emerald-400">
                                            {vendor.tradeLicenseNo}
                                        </span>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setSelectedDoc(vendor.tradeLicenseFileUrl);
                                            setActiveModal('doc_preview');
                                        }}
                                        className="h-36 rounded-lg overflow-hidden border border-slate-800 relative group cursor-pointer"
                                    >
                                        <img
                                            src={vendor.tradeLicenseFileUrl}
                                            alt="Trade License Document"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-xs font-medium text-white flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                                                <Eye className="w-3.5 h-3.5" /> Preview Document
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Settings & Actions */}
                    <div className="space-y-6">
                        {/* Commission Rate Override Box */}
                        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 space-y-4">
                            <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                                <Percent className="w-4 h-4 text-emerald-400" />
                                <span>Platform Commission Override</span>
                            </h3>
                            <p className="text-xs text-slate-400">
                                Standard platform commission is 10.0%. Set a custom override for this vendor.
                            </p>

                            <form onSubmit={handleSaveCommission} className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="number"
                                        step="0.5"
                                        min="0"
                                        max="50"
                                        value={commission}
                                        onChange={(e) => setCommission(parseFloat(e.target.value))}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none pr-8 font-semibold"
                                    />
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                                        %
                                    </span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSavingCommission}
                                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 transition-all"
                                >
                                    {isSavingCommission ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4 text-emerald-400" />
                                    )}
                                    <span>Save Commission Rate</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* Document Preview Modal */}
            {activeModal === 'doc_preview' && selectedDoc && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-4 space-y-4 shadow-2xl">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                            <h3 className="font-semibold text-white text-sm">Document Preview</h3>
                            <button
                                onClick={() => setActiveModal(null)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="max-h-[75vh] overflow-auto rounded-xl">
                            <img src={selectedDoc} alt="Document" className="w-full h-auto rounded-xl" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
