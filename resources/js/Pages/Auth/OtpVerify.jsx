import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import { KeyRound, ArrowRight, ShieldCheck, Languages, AlertCircle, Loader2, RefreshCw, Edit2 } from 'lucide-react';

export default function OtpVerify() {
    const [lang, setLang] = useState('bn');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const inputRefs = useRef([]);
    const cardRef = useRef(null);

    // Get phone from query params
    const searchParams = new URLSearchParams(window.location.search);
    const phone = searchParams.get('phone') || '+8801700000000';

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
            );
        });
        return () => ctx.revert();
    }, []);

    // Countdown timer effect
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const t = {
        bn: {
            title: 'ওটিপি যাচাইকরণ',
            subtitle: `${phone} নম্বরে পাঠানো ৬-ডিজিটের কোডটি দিন`,
            changePhone: 'নম্বর পরিবর্তন',
            resendPrompt: 'কোড পাননি?',
            resendBtn: 'পুনরায় পাঠান',
            timerText: 'সেকেন্ড পর চেষ্টা করুন',
            verifyBtn: 'যাচাই করুন',
            verifying: 'যাচাই করা হচ্ছে...',
            secureNotice: '১০০% নিরাপদ ও সুরক্ষিত',
            invalidOtp: 'অবৈধ ওটিপি কোড। পুনরায় চেষ্টা করুন।',
        },
        en: {
            title: 'OTP Verification',
            subtitle: `Enter the 6-digit code sent to ${phone}`,
            changePhone: 'Change number',
            resendPrompt: "Didn't receive code?",
            resendBtn: 'Resend OTP',
            timerText: 's remaining',
            verifyBtn: 'Verify & Continue',
            verifying: 'Verifying...',
            secureNotice: '100% Secure & Encrypted',
            invalidOtp: 'Invalid OTP code. Please try again.',
        },
    }[lang];

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);
            inputRefs.current[5]?.focus();
            setError('');
        }
    };

    const handleResend = () => {
        if (!canResend) return;
        setTimer(60);
        setCanResend(false);
        setError('');
        router.post('/api/v1/auth/otp/request', { phone });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) {
            setError(t.invalidOtp);
            gsap.to(cardRef.current, {
                x: [-10, 10, -8, 8, -4, 4, 0],
                duration: 0.4,
                ease: 'power2.inOut',
            });
            return;
        }

        setLoading(true);
        setError('');

        router.post(
            '/api/v1/auth/otp/verify',
            { phone, code },
            {
                onSuccess: (page) => {
                    const role = page.props?.auth?.user?.role || 'customer';
                    if (role === 'superadmin' || role === 'staff') {
                        router.visit('/admin/dashboard');
                    } else if (role === 'vendor') {
                        router.visit('/vendor/dashboard');
                    } else {
                        router.visit('/');
                    }
                },
                onError: (errs) => {
                    setLoading(false);
                    setError(errs.code || errs.message || t.invalidOtp);
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white transition-all text-xs font-medium backdrop-blur-md"
                >
                    <Languages className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
                </button>
            </div>

            <div
                ref={cardRef}
                className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <KeyRound className="w-7 h-7 text-slate-950 stroke-[2.25]" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-center space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            {t.title}
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {t.subtitle}
                        </p>
                        <div className="pt-1">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                            >
                                <Edit2 className="w-3 h-3" />
                                <span>{t.changePhone}</span>
                            </Link>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* 6-box OTP Input */}
                        <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
                            {otp.map((digit, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (inputRefs.current[idx] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(idx, e)}
                                    className="w-11 h-13 sm:w-13 sm:h-14 text-center text-xl font-bold text-white bg-slate-950/70 border border-slate-700/70 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all focus:outline-none"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400">
                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || otp.join('').length !== 6}
                            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                                loading || otp.join('').length !== 6
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.99]'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                    <span>{t.verifying}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t.verifyBtn}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Resend OTP Footer */}
                    <div className="pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400 space-y-1">
                        <p>{t.resendPrompt}</p>
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>{t.resendBtn}</span>
                            </button>
                        ) : (
                            <p className="text-slate-500">
                                {timer} {t.timerText}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
                <span>{t.secureNotice}</span>
            </div>
        </div>
    );
}
