import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    RotateCcw,
    Upload,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Package,
    ShieldCheck,
} from 'lucide-react';

const RETURN_REASONS = [
    'Item received damaged',
    'Wrong item delivered',
    'Item not as described',
    'Quality does not match listing',
    'Duplicate or accidental order',
    'Changed my mind',
    'Other',
];

export default function ReturnRequest({ order: initialOrder }) {
    const defaultOrder = {
        id: 101,
        orderNumber: 'ORD-2026-99210',
        items: [
            {
                id: 1,
                title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                variant: 'Matte Black',
                price: 5200,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
                eligibleForReturn: true,
            },
        ],
    };

    const order = initialOrder || defaultOrder;

    const [selectedItems, setSelectedItems] = useState({});
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [returnMethod, setReturnMethod] = useState('pickup');
    const [photoFiles, setPhotoFiles] = useState([]);
    const [photoPreview, setPhotoPreview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);
    const successRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
            );
        }
    }, []);

    useEffect(() => {
        if (submitted && successRef.current) {
            gsap.fromTo(
                successRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [submitted]);

    const toggleItem = (itemId) => {
        setSelectedItems((prev) => ({
            ...prev,
            [itemId]: !prev[itemId],
        }));
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 4);
        setPhotoFiles(files);
        const previews = files.map((f) => URL.createObjectURL(f));
        setPhotoPreview(previews);
    };

    const validate = () => {
        const newErrors = {};
        const anySelected = Object.values(selectedItems).some(Boolean);
        if (!anySelected) newErrors.items = 'Please select at least one item to return.';
        if (!reason) newErrors.reason = 'Please select a reason for your return.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        const formData = new FormData();
        formData.append('order_id', order.id);
        formData.append('reason', reason);
        formData.append('notes', notes);
        formData.append('return_method', returnMethod);
        Object.keys(selectedItems)
            .filter((k) => selectedItems[k])
            .forEach((id) => formData.append('item_ids[]', id));
        photoFiles.forEach((f) => formData.append('evidence_photos[]', f));

        router.post('/api/v1/returns/request', formData, {
            onSuccess: () => setSubmitted(true),
            onFinish: () => setLoading(false),
        });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
                <Head title="Return Request Submitted" />
                <div
                    ref={successRef}
                    className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl"
                >
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-white">Return Request Submitted!</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Your return request has been received. Our support team will review it within 24–48 hours and contact you with next steps.
                    </p>
                    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-xs text-slate-300">
                        <span className="font-semibold text-white">Order: </span>
                        <span className="font-mono">{order.orderNumber}</span>
                    </div>
                    <Link
                        href={`/account/orders/${order.id}`}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Order Details</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-3xl mx-auto space-y-6">
            <Head title={`Return Request - ${order.orderNumber}`} />

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <Link
                    href={`/account/orders/${order.id}`}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <RotateCcw className="w-6 h-6 text-emerald-400" />
                        <span>Return / Exchange Request</span>
                    </h1>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{order.orderNumber}</p>
                </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 — Select Items */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                        <Package className="w-4 h-4 text-emerald-400" />
                        <span>Step 1 — Select Items to Return</span>
                    </h3>

                    {errors.items && (
                        <div className="flex items-center gap-2 text-xs text-rose-400">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{errors.items}</span>
                        </div>
                    )}

                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <label
                                key={item.id}
                                className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                    selectedItems[item.id]
                                        ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!selectedItems[item.id]}
                                    onChange={() => toggleItem(item.id)}
                                    className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                                />
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-12 h-12 rounded-xl object-cover border border-slate-800 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-xs text-white line-clamp-1">{item.title}</p>
                                    <p className="text-[11px] text-slate-400">{item.variant} · Qty: {item.quantity}</p>
                                </div>
                                <span className="font-bold text-xs text-emerald-400 shrink-0">
                                    ৳{item.price.toLocaleString()}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Step 2 — Return Reason */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                        Step 2 — Return Reason & Evidence
                    </h3>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Reason for Return *
                        </label>
                        <select
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className={`w-full bg-slate-950 border rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none ${
                                errors.reason ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                            }`}
                        >
                            <option value="">Select a reason...</option>
                            {RETURN_REASONS.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        {errors.reason && (
                            <p className="text-[11px] text-rose-400 mt-1">{errors.reason}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Additional Notes (Optional)
                        </label>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Describe the issue in detail..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>

                    {/* Photo Upload */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-2">
                            Evidence Photos (Up to 4, Optional)
                        </label>
                        <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-colors">
                            <Upload className="w-6 h-6 text-slate-500" />
                            <span className="text-xs text-slate-400">
                                Click to upload photos of the damaged/incorrect item
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="sr-only"
                                onChange={handlePhotoChange}
                            />
                        </label>

                        {photoPreview.length > 0 && (
                            <div className="flex gap-2 mt-3 flex-wrap">
                                {photoPreview.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Evidence ${i + 1}`}
                                        className="w-16 h-16 object-cover rounded-lg border border-slate-800"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Step 3 — Return Method */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                        Step 3 — Return Method
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { id: 'pickup', label: 'Courier Pickup', desc: 'We arrange free courier pickup from your address.' },
                            { id: 'dropoff', label: 'Drop-Off at Courier Hub', desc: 'Drop the parcel at your nearest Pathao / Steadfast hub.' },
                        ].map((m) => (
                            <div
                                key={m.id}
                                onClick={() => setReturnMethod(m.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1 ${
                                    returnMethod === m.id
                                        ? 'bg-slate-950 border-emerald-500 shadow-md shadow-emerald-500/10'
                                        : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-xs text-white">{m.label}</p>
                                    {returnMethod === m.id && (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-400">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="space-y-3">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <RotateCcw className="w-4 h-4" />
                                <span>Submit Return Request</span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Returns processed within 5–7 business days · Subject to review</span>
                    </div>
                </div>
            </form>
        </div>
    );
}
