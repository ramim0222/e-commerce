import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowLeft,
    Star,
    Upload,
    CheckCircle2,
    Loader2,
    ShieldCheck,
    Camera,
    X,
} from 'lucide-react';

const STAR_LABELS = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

export default function ProductReviewForm({ orderItem: initialItem }) {
    const defaultItem = {
        id: 1,
        productId: 101,
        orderId: 101,
        orderNumber: 'ORD-2026-99210',
        title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
        variant: 'Matte Black',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
        vendorName: 'TechGear BD',
    };

    const item = initialItem || defaultItem;

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [mediaPreviews, setMediaPreviews] = useState([]);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);
    const successRef = useRef(null);
    const starsRef = useRef([]);

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
                { opacity: 0, scale: 0.92, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
            );
        }
    }, [submitted]);

    const handleStarClick = (star) => {
        setRating(star);
        // Micro-animation on star click
        if (starsRef.current[star - 1]) {
            gsap.fromTo(
                starsRef.current[star - 1],
                { scale: 1.3 },
                { scale: 1, duration: 0.3, ease: 'back.out(2)' }
            );
        }
    };

    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 6);
        setMediaFiles(files);
        const previews = files.map((f) => URL.createObjectURL(f));
        setMediaPreviews(previews);
    };

    const removeMedia = (idx) => {
        setMediaPreviews((prev) => prev.filter((_, i) => i !== idx));
        setMediaFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const validate = () => {
        const e = {};
        if (!rating) e.rating = 'Please select a star rating.';
        if (reviewText.trim().length < 10) e.reviewText = 'Please write at least 10 characters.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);

        const form = new FormData();
        form.append('order_item_id', item.id);
        form.append('product_id', item.productId);
        form.append('rating', rating);
        form.append('body', reviewText);
        mediaFiles.forEach((f) => form.append('media[]', f));

        router.post('/api/v1/reviews', form, {
            onSuccess: () => setSubmitted(true),
            onFinish: () => setLoading(false),
        });
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex items-center justify-center p-4">
                <Head title="Review Submitted - Thank You!" />
                <div
                    ref={successRef}
                    className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl"
                >
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-white">Review Published!</h2>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Thank you for your verified review. Your feedback helps other shoppers make informed choices.
                    </p>
                    <div className="flex justify-center gap-0.5">
                        {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <Link
                        href={`/product/${item.productId}`}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Product Page</span>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 max-w-2xl mx-auto space-y-6">
            <Head title={`Write a Review - ${item.title}`} />

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                <Link
                    href={`/account/orders/${item.orderId}`}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span>Write a Verified Review</span>
                    </h1>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{item.orderNumber}</p>
                </div>
            </div>

            {/* Product Context Banner */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                />
                <div>
                    <p className="font-semibold text-xs text-white line-clamp-1">{item.title}</p>
                    <p className="text-[11px] text-slate-400">{item.variant} · Sold by {item.vendorName}</p>
                    <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                    </span>
                </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Star Rating Input */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                        Overall Rating *
                    </h3>

                    <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    ref={(el) => (starsRef.current[star - 1] = el)}
                                    onClick={() => handleStarClick(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-transform hover:scale-110 active:scale-95"
                                >
                                    <Star
                                        className={`w-9 h-9 transition-colors ${
                                            star <= (hoverRating || rating)
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-slate-700'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {(hoverRating || rating) > 0 && (
                            <span className="text-xs font-semibold text-amber-400">
                                {STAR_LABELS[(hoverRating || rating) - 1]}
                            </span>
                        )}
                    </div>

                    {errors.rating && (
                        <p className="text-[11px] text-rose-400 text-center">{errors.rating}</p>
                    )}
                </div>

                {/* Written Review */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                    <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
                        Your Written Review *
                    </h3>

                    <textarea
                        rows={5}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience with this product — quality, packaging, delivery, and anything else that would help other buyers..."
                        className={`w-full bg-slate-950 border rounded-xl px-3.5 py-3 text-xs text-white leading-relaxed focus:outline-none resize-none ${
                            errors.reviewText ? 'border-rose-500' : 'border-slate-800 focus:border-emerald-500'
                        }`}
                    />

                    <div className="flex justify-between items-center">
                        {errors.reviewText ? (
                            <p className="text-[11px] text-rose-400">{errors.reviewText}</p>
                        ) : (
                            <span className="text-[11px] text-slate-500">Minimum 10 characters</span>
                        )}
                        <span className="text-[11px] text-slate-500">{reviewText.length} chars</span>
                    </div>
                </div>

                {/* Photo / Video Upload */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                    <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-emerald-400" />
                        <span>Photos & Videos (Optional, up to 6)</span>
                    </h3>

                    <label className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-colors">
                        <Upload className="w-6 h-6 text-slate-500" />
                        <span className="text-xs text-slate-400">
                            Click to upload product photos or short videos
                        </span>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            multiple
                            className="sr-only"
                            onChange={handleMediaChange}
                        />
                    </label>

                    {mediaPreviews.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {mediaPreviews.map((src, i) => (
                                <div key={i} className="relative">
                                    <img
                                        src={src}
                                        alt={`Preview ${i + 1}`}
                                        className="w-20 h-20 object-cover rounded-xl border border-slate-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeMedia(i)}
                                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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
                                <Star className="w-4 h-4 fill-slate-950" />
                                <span>Submit Verified Review</span>
                            </>
                        )}
                    </button>

                    <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        Reviews are verified and may take up to 2 hours to appear publicly
                    </p>
                </div>
            </form>
        </div>
    );
}
