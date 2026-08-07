import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    ShoppingBag,
    CreditCard,
    Truck,
    MapPin,
    Shield,
    User,
    Phone,
    Calendar,
    Building2,
    DollarSign,
    CheckCircle2,
    Clock,
    AlertTriangle,
    XCircle,
    RotateCcw,
    Loader2,
    ShieldAlert,
} from 'lucide-react';

export default function SuperAdminOrderDetail({ order: initialOrder }) {
    const defaultOrder = {
        id: 101,
        orderNumber: 'ORD-2026-99210',
        orderDate: '2026-08-06 14:32',
        status: 'processing',
        paymentMethod: 'bKash Direct',
        paymentStatus: 'paid',
        transactionId: 'TRX-BKASH-88910293',
        grandTotal: 5260,
        customer: {
            id: 42,
            name: 'Rahim Ahmed',
            email: 'rahim@example.com',
            phone: '+8801712345678',
            address: 'House 42, Road 7A, Dhanmondi R/A, Dhaka-1209',
        },
        courier: {
            provider: 'Pathao Courier',
            trackingId: 'PTH-99812-BD',
            status: 'Picked up from vendor',
        },
        vendorSplits: [
            {
                vendorId: 2,
                vendorName: 'TechGear BD',
                commissionRate: 10.0,
                subtotal: 5200,
                commission: 520,
                payout: 4680,
                status: 'shipped',
                items: [
                    {
                        id: 1,
                        title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                        sku: 'SKU-HD-9921',
                        variant: 'Matte Black',
                        price: 5200,
                        quantity: 1,
                    },
                ],
            },
        ],
        timeline: [
            { title: 'Order Placed & bKash Payment Verified', time: '2026-08-06 14:32', done: true },
            { title: 'Vendor Split Assigned to TechGear BD', time: '2026-08-06 14:35', done: true },
            { title: 'Courier Waybill Created (Pathao)', time: '2026-08-06 15:10', done: true },
            { title: 'Package Out for Delivery', time: 'Pending', done: false },
        ],
    };

    const order = initialOrder || defaultOrder;
    const [status, setStatus] = useState(order.status);
    const [overrideModal, setOverrideModal] = useState(false);
    const [overrideStatus, setOverrideStatus] = useState(order.status);
    const [loading, setLoading] = useState(false);

    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    const handleConfirmOverride = () => {
        setLoading(true);
        router.post(
            `/api/v1/admin/orders/${order.id}/override-status`,
            { status: overrideStatus },
            {
                onSuccess: () => {
                    setStatus(overrideStatus);
                    setOverrideModal(false);
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
            <Head title={`SuperAdmin - Order ${order.orderNumber}`} />

            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/orders"
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white tracking-tight font-mono">
                                {order.orderNumber}
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {status.toUpperCase()}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            <span>Created on {order.orderDate}</span>
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setOverrideModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Manual Status Override</span>
                </button>
            </div>

            {/* Layout Grid */}
            <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main 2 Columns: Vendor Splits & Transactions */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Vendor Splits & Products */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                            <Building2 className="w-4 h-4 text-emerald-400" />
                            <span>Vendor Split Dispatches ({order.vendorSplits.length})</span>
                        </h3>

                        {order.vendorSplits.map((split) => (
                            <div key={split.vendorId} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                                    <span className="font-bold text-xs text-emerald-400">{split.vendorName}</span>
                                    <span className="text-[10px] font-mono text-slate-400">
                                        Commission Rate: {split.commissionRate}%
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {split.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-xs">
                                            <span className="text-white font-medium">{item.title} (x{item.quantity})</span>
                                            <span className="font-bold text-slate-300">৳{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 border-t border-slate-800/60 flex justify-between text-xs text-slate-400 font-mono">
                                    <span>Subtotal: ৳{split.subtotal}</span>
                                    <span>Commission: -৳{split.commission}</span>
                                    <span className="text-emerald-400 font-bold">Payout: ৳{split.payout}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Transaction Details */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                            <CreditCard className="w-4 h-4 text-emerald-400" />
                            <span>Payment Transaction Record</span>
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div>
                                <p className="text-slate-400">Method</p>
                                <p className="font-semibold text-white mt-0.5">{order.paymentMethod}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Transaction ID</p>
                                <p className="font-mono font-bold text-emerald-400 mt-0.5">{order.transactionId}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Amount Paid</p>
                                <p className="font-bold text-white mt-0.5">৳{order.grandTotal.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-slate-400">Status</p>
                                <span className="inline-block mt-0.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-bold text-[10px] rounded border border-emerald-500/20">
                                    {order.paymentStatus.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Courier & History */}
                <div className="space-y-6">
                    {/* Customer Link Box */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                            <User className="w-4 h-4 text-emerald-400" />
                            <span>Customer Profile</span>
                        </h3>

                        <div className="space-y-1.5 text-xs text-slate-300">
                            <Link
                                href={`/admin/customers/${order.customer.id}`}
                                className="font-bold text-white text-sm hover:text-emerald-400 underline block"
                            >
                                {order.customer.name}
                            </Link>
                            <p className="font-mono text-slate-400">{order.customer.phone}</p>
                            <p className="text-slate-400">{order.customer.email}</p>
                            <p className="text-slate-300 pt-1 leading-relaxed">{order.customer.address}</p>
                        </div>
                    </div>

                    {/* Courier Booking Card */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                            <Truck className="w-4 h-4 text-emerald-400" />
                            <span>Courier & Delivery Tracking</span>
                        </h3>

                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Courier Provider:</span>
                                <span className="font-bold text-white">{order.courier.provider}</span>
                            </div>
                            <div className="flex justify-between font-mono">
                                <span className="text-slate-400">Tracking Waybill:</span>
                                <span className="text-emerald-400 font-bold">{order.courier.trackingId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Status:</span>
                                <span className="font-semibold text-slate-200">{order.courier.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manual Override Confirmation Modal */}
            {overrideModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <h3 className="font-bold text-white text-base flex items-center gap-2 text-rose-400">
                            <ShieldAlert className="w-5 h-5" /> Confirm Order Override
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            Overriding order status manually alters system inventory and vendor payout triggers.
                        </p>

                        <div className="space-y-2">
                            <label className="block text-xs font-semibold text-slate-400">Target Status</label>
                            <select
                                value={overrideStatus}
                                onChange={(e) => setOverrideStatus(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                            >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setOverrideModal(false)}
                                className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmOverride}
                                disabled={loading}
                                className="w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-slate-950 flex items-center justify-center gap-1.5"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Override'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
