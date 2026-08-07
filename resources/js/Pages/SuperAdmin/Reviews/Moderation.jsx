import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Star,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ShieldCheck,
    Clock,
    ArrowLeft,
    MessageSquare,
} from 'lucide-react';

const StarRow = ({ count }) => (
    <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`w-3.5 h-3.5 ${s <= count ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
        ))}
    </span>
);

export default function ReviewsModeration({ reviews: initialReviews }) {
    const defaultReviews = [
        {
            id: 1,
            productId: 101,
            productTitle: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
            customerName: 'Karim Ullah',
            initials: 'KU',
            rating: 2,
            body: 'The headphones stopped working after 3 days. Very disappointed with the product quality.',
            submittedPhotos: [
                'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=200&auto=format&fit=crop&q=80',
            ],
            submittedAt: '2026-08-07 11:40 AM',
            vendorName: 'TechGear BD',
            verified: true,
        },
        {
            id: 2,
            productId: 102,
            productTitle: 'Smart AMOLED Fitness Watch V2 with SpO2',
            productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
            customerName: 'Sadia Islam',
            initials: 'SI',
            rating: 5,
            body: 'Absolutely perfect! Exactly as described. Will definitely order again. Highly recommended!',
            submittedPhotos: [],
            submittedAt: '2026-08-07 09:15 AM',
            vendorName: 'Gadget World',
            verified: true,
        },
        {
            id: 3,
            productId: 103,
            productTitle: 'USB-C Braided Fast Charging Cable 2m',
            productImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop&q=80',
            customerName: 'Anonymous User',
            initials: 'AU',
            rating: 1,
            body: 'Spam review with promotional link - buy cheap stuff at www.spam.com!!!',
            submittedPhotos: [],
            submittedAt: '2026-08-06 06:22 PM',
            vendorName: 'Cable Zone',
            verified: false,
        },
    ];

    const [queue, setQueue] = useState(initialReviews || defaultReviews);
    const [rejectReasons, setRejectReasons] = useState({});
    const [processing, setProcessing] = useState({});

    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            gsap.fromTo(
                listRef.current.children,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
            );
        }
    }, []);

    const handleAction = (reviewId, action) => {
        setProcessing((prev) => ({ ...prev, [reviewId]: action }));

        router.post(
            `/api/v1/admin/reviews/${reviewId}/${action}`,
            { reject_reason: rejectReasons[reviewId] || '' },
            {
                onSuccess: () => {
                    const el = document.getElementById(`review-card-${reviewId}`);
                    if (el) {
                        gsap.to(el, {
                            opacity: 0,
                            height: 0,
                            marginBottom: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            duration: 0.35,
                            ease: 'power2.in',
                            onComplete: () => setQueue((prev) => prev.filter((r) => r.id !== reviewId)),
                        });
                    } else {
                        setQueue((prev) => prev.filter((r) => r.id !== reviewId));
                    }
                },
                onFinish: () => setProcessing((prev) => ({ ...prev, [reviewId]: null })),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
            <Head title="SuperAdmin - Review Moderation Queue" />

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
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                            <span>Review Moderation Queue</span>
                            <span className="text-xs bg-amber-500/10 text-amber-400 font-medium px-2.5 py-0.5 rounded-full border border-amber-500/20">
                                {queue.length} Pending
                            </span>
                        </h1>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Approve or reject customer reviews before they go live on the storefront.
                        </p>
                    </div>
                </div>
            </div>

            {/* Queue List */}
            {queue.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="text-lg font-bold text-white">All Reviews Cleared!</h3>
                    <p className="text-xs text-slate-400">No pending reviews in the moderation queue.</p>
                </div>
            ) : (
                <div ref={listRef} className="space-y-4">
                    {queue.map((review) => (
                        <div
                            key={review.id}
                            id={`review-card-${review.id}`}
                            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 overflow-hidden"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                                        {review.initials}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-xs text-white">{review.customerName}</span>
                                            {review.verified ? (
                                                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-0.5">
                                                    <AlertCircle className="w-3 h-3" /> Unverified
                                                </span>
                                            )}
                                        </div>
                                        <StarRow count={review.rating} />
                                        <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {review.submittedAt}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Product Context */}
                            <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                                <img
                                    src={review.productImage}
                                    alt={review.productTitle}
                                    className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                                />
                                <div>
                                    <p className="text-[11px] text-white font-medium line-clamp-1">{review.productTitle}</p>
                                    <p className="text-[10px] text-slate-500">Sold by {review.vendorName}</p>
                                </div>
                            </div>

                            {/* Review Body */}
                            <p className="text-xs text-slate-200 leading-relaxed border-l-2 border-slate-700 pl-3">
                                {review.body}
                            </p>

                            {/* Submitted Photos */}
                            {review.submittedPhotos.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {review.submittedPhotos.map((src, i) => (
                                        <img
                                            key={i}
                                            src={src}
                                            alt={`Evidence ${i + 1}`}
                                            className="w-16 h-16 object-cover rounded-xl border border-slate-800"
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Reject Reason (Optional) */}
                            <input
                                type="text"
                                value={rejectReasons[review.id] || ''}
                                onChange={(e) =>
                                    setRejectReasons((prev) => ({
                                        ...prev,
                                        [review.id]: e.target.value,
                                    }))
                                }
                                placeholder="Reject reason (optional) — shown to customer on rejection"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:border-rose-500/50 focus:outline-none"
                            />

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={() => handleAction(review.id, 'approve')}
                                    disabled={!!processing[review.id]}
                                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/15 transition-all"
                                >
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Approve & Publish</span>
                                </button>
                                <button
                                    onClick={() => handleAction(review.id, 'reject')}
                                    disabled={!!processing[review.id]}
                                    className="flex-1 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <XCircle className="w-4 h-4" />
                                    <span>Reject & Hide</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
