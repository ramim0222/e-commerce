import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import { Loader2, ShieldCheck, ArrowRight, AlertCircle, RefreshCw, Lock } from 'lucide-react';

export default function PaymentRedirect({ gateway = 'bKash', redirectUrl, errorMsg }) {
    const [seconds, setSeconds] = useState(3);
    const [failed, setFailed] = useState(!!errorMsg);

    const spinnerRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, scale: 0.95, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
            );

            gsap.to(spinnerRef.current, {
                rotate: 360,
                repeat: -1,
                duration: 2,
                ease: 'linear',
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (failed) return;
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    } else {
                        router.visit('/order-confirmation?order_id=ORD-2026-99210');
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [failed, redirectUrl]);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
            <Head title={`Redirecting to ${gateway}...`} />

            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div
                ref={cardRef}
                className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10 text-center space-y-6"
            >
                {!failed ? (
                    <>
                        <div className="flex justify-center">
                            <div className="w-20 h-20 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center relative shadow-xl">
                                <div ref={spinnerRef} className="absolute inset-0 rounded-3xl border-2 border-emerald-500/20 border-t-emerald-500" />
                                <span className="font-bold text-lg text-emerald-400 font-mono uppercase">{gateway}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Connecting to {gateway} Gateway
                            </h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Please wait while we securely transfer you to complete your payment. Do not reload or close this page.
                            </p>
                        </div>

                        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono font-semibold">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Redirecting in {seconds} seconds...</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-rose-400" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-white tracking-tight">
                                Payment Connection Failed
                            </h2>
                            <p className="text-xs text-rose-400 leading-relaxed">
                                {errorMsg || 'Unable to connect to the payment gateway. Please try again.'}
                            </p>
                        </div>

                        <div className="pt-2 space-y-2">
                            <Link
                                href="/checkout"
                                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Return to Checkout & Retry</span>
                            </Link>
                        </div>
                    </>
                )}
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted Payment Session</span>
            </div>
        </div>
    );
}
