import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Star,
    Filter,
    ExternalLink,
    Send,
    MessageSquare,
    CheckCircle2,
    Package,
} from 'lucide-react';

const StarRow = ({ count }) => (
    <span className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star
                key={s}
                className={`w-3.5 h-3.5 ${s <= count ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`}
            />
        ))}
    </span>
);

export default function VendorReviewsIndex({ reviews: initialReviews }) {
    const defaultReviews = [
        {
            id: 1,
            productId: 101,
            productTitle: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
            customerName: 'Rahim Ahmed',
            initials: 'RA',
            rating: 5,
            body: 'Absolutely amazing headphones! The noise cancellation is top-notch. Delivery was fast and packaging was pristine.',
            date: '2026-08-07',
            verified: true,
            vendorReply: null,
        },
        {
            id: 2,
            productId: 102,
            productTitle: 'Smart AMOLED Fitness Watch V2 with SpO2',
            productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
            customerName: 'Tanvir Hossain',
            initials: 'TH',
            rating: 4,
            body: 'Great watch for the price. Battery life could be better but the display is stunning.',
            date: '2026-08-05',
            verified: true,
            vendorReply: 'Thank you Tanvir! We appreciate your feedback. Battery optimization update coming next month.',
        },
        {
            id: 3,
            productId: 101,
            productTitle: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
            productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
            customerName: 'Nusrat Jahan',
            initials: 'NJ',
            rating: 3,
            body: 'Good quality but the ear cushions feel a bit stiff initially. Gets comfortable after a few days.',
            date: '2026-07-30',
            verified: true,
            vendorReply: null,
        },
    ];

    const [reviews, setReviews] = useState(initialReviews || defaultReviews);
    const [ratingFilter, setRatingFilter] = useState(0);
    const [replyDrafts, setReplyDrafts] = useState({});
    const [replyingSending, setReplyingSending] = useState({});

    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            gsap.fromTo(
                listRef.current.children,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
            );
        }
    }, [ratingFilter]);

    const filteredReviews = reviews.filter((r) =>
        ratingFilter === 0 ? true : r.rating === ratingFilter
    );

    const avgRating = reviews.length
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : '—';

    const handleSendReply = (reviewId) => {
        const reply = replyDrafts[reviewId];
        if (!reply?.trim()) return;
        setReplyingSending((prev) => ({ ...prev, [reviewId]: true }));

        router.post(
            `/api/v1/vendor/reviews/${reviewId}/reply`,
            { reply },
            {
                onSuccess: () => {
                    setReviews((prev) =>
                        prev.map((r) => (r.id === reviewId ? { ...r, vendorReply: reply } : r))
                    );
                    setReplyDrafts((prev) => ({ ...prev, [reviewId]: '' }));
                },
                onFinish: () => setReplyingSending((prev) => ({ ...prev, [reviewId]: false })),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-5xl mx-auto space-y-6">
            <Head title="Vendor - Product Reviews" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                        <span>Product Reviews</span>
                        <span className="text-xs bg-slate-800 text-slate-300 font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
                            {reviews.length} Total
                        </span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Monitor verified purchase reviews on your products and respond to build trust.
                    </p>
                </div>

                {/* Average Score Badge */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl px-5 py-3 text-center">
                    <p className="text-3xl font-extrabold text-amber-400">{avgRating}</p>
                    <div className="flex justify-center mt-1">
                        <StarRow count={Math.round(parseFloat(avgRating))} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Avg. Rating</p>
                </div>
            </div>

            {/* Rating Filter Bar */}
            <div className="flex items-center gap-2 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 overflow-x-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                {[0, 5, 4, 3, 2, 1].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRatingFilter(star)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-all ${
                            ratingFilter === star
                                ? 'bg-amber-500 text-slate-950 shadow-md'
                                : 'bg-slate-800/70 text-slate-400 hover:text-white'
                        }`}
                    >
                        {star === 0 ? 'All Reviews' : (
                            <>
                                <Star className="w-3 h-3 fill-current" /> {star} Stars
                            </>
                        )}
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            {filteredReviews.length === 0 ? (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                    <Star className="w-10 h-10 text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-white">No reviews for this rating filter</p>
                    <p className="text-xs text-slate-400">Try selecting a different star filter above.</p>
                </div>
            ) : (
                <div ref={listRef} className="space-y-4">
                    {filteredReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4"
                        >
                            {/* Review Header */}
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0">
                                        {review.initials}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-xs text-white">{review.customerName}</span>
                                            {review.verified && (
                                                <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
                                                    <CheckCircle2 className="w-3 h-3" /> Verified
                                                </span>
                                            )}
                                        </div>
                                        <StarRow count={review.rating} />
                                        <p className="text-[11px] text-slate-500 mt-0.5">{review.date}</p>
                                    </div>
                                </div>

                                <Link
                                    href={`/product/${review.productId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                    title="View product on storefront"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Product Context */}
                            <div className="flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 rounded-xl p-3">
                                <img
                                    src={review.productImage}
                                    alt={review.productTitle}
                                    className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                                />
                                <p className="text-[11px] text-slate-400 line-clamp-1">{review.productTitle}</p>
                            </div>

                            {/* Review Body */}
                            <p className="text-xs text-slate-200 leading-relaxed">{review.body}</p>

                            {/* Existing Vendor Reply */}
                            {review.vendorReply && (
                                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 space-y-1">
                                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                        Your Response
                                    </span>
                                    <p className="text-xs text-slate-300">{review.vendorReply}</p>
                                </div>
                            )}

                            {/* Reply Input */}
                            {!review.vendorReply && (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={replyDrafts[review.id] || ''}
                                        onChange={(e) =>
                                            setReplyDrafts((prev) => ({
                                                ...prev,
                                                [review.id]: e.target.value,
                                            }))
                                        }
                                        placeholder="Write a public response to this review..."
                                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={() => handleSendReply(review.id)}
                                        disabled={replyingSending[review.id]}
                                        className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shrink-0"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
