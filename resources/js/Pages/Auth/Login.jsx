import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import { Phone, ArrowRight, ShieldCheck, Languages, Building2, AlertCircle, Loader2 } from 'lucide-react';

export default function Login() {
    const [lang, setLang] = useState('bn'); // 'bn' | 'en'
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const cardRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
            );
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    const t = {
        bn: {
            title: 'স্বাগতম',
            subtitle: 'আপনার মোবাইল নম্বর দিয়ে সাইন ইন বা রেজিস্ট্রেশন করুন',
            phoneLabel: 'মোবাইল নম্বর',
            phonePlaceholder: '1712345678',
            submitBtn: 'ওটিপি পাঠান',
            sending: 'ওটিপি পাঠানো হচ্ছে...',
            vendorPrompt: 'আপনি কি একজন মার্চেন্ট/বিক্রেতা?',
            vendorLink: 'মার্চেন্ট অ্যাকাউন্ট খুলুন',
            secureNotice: '১০০% নিরাপদ ও সুরক্ষিত লগইন',
            phoneError: 'সঠিক ১১-ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)',
        },
        en: {
            title: 'Welcome Back',
            subtitle: 'Sign in or register with your mobile phone number',
            phoneLabel: 'Phone Number',
            phonePlaceholder: '1712345678',
            submitBtn: 'Send OTP',
            sending: 'Sending OTP...',
            vendorPrompt: 'Are you a merchant or seller?',
            vendorLink: 'Register as a Vendor',
            secureNotice: '100% Secure & Encrypted Login',
            phoneError: 'Enter a valid 11-digit mobile number (e.g. 01712345678)',
        },
    }[lang];

    const handlePhoneChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.startsWith('880')) {
            val = val.substring(3);
        } else if (val.startsWith('0')) {
            val = val.substring(1);
        }
        if (val.length <= 10) {
            setPhone(val);
            setError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullPhone = `+880${phone}`;
        if (phone.length !== 10) {
            setError(t.phoneError);
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
            '/api/v1/auth/otp/request',
            { phone: fullPhone },
            {
                onSuccess: () => {
                    router.visit(`/auth/otp/verify?phone=${encodeURIComponent(fullPhone)}`);
                },
                onError: (errs) => {
                    setLoading(false);
                    setError(errs.phone || errs.message || 'Error sending OTP. Please try again.');
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans">
            {/* Background Decorative Blur Orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all text-xs font-medium backdrop-blur-md"
                    aria-label="Toggle Language"
                >
                    <Languages className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
                </button>
            </div>

            {/* Main Auth Card */}
            <div
                ref={cardRef}
                className="w-full max-w-md bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10"
            >
                {/* Brand Logo Header */}
                <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <ShieldCheck className="w-7 h-7 text-slate-950 stroke-[2.25]" />
                    </div>
                </div>

                <div ref={contentRef} className="space-y-6">
                    <div className="text-center space-y-1.5">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            {t.title}
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {t.subtitle}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                                {t.phoneLabel}
                            </label>
                            <div className="relative flex items-center rounded-xl bg-slate-950/70 border border-slate-700/70 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all overflow-hidden group">
                                <div className="flex items-center gap-1.5 px-3.5 py-3 bg-slate-800/60 border-r border-slate-700/60 text-slate-300 font-semibold text-sm select-none">
                                    <span className="text-base">🇧🇩</span>
                                    <span>+880</span>
                                </div>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    placeholder={t.phonePlaceholder}
                                    className="w-full bg-transparent px-3.5 py-3 text-white placeholder-slate-500 text-sm tracking-wide focus:outline-none"
                                    autoFocus
                                    maxLength={10}
                                />
                                <Phone className="w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 mr-3 transition-colors shrink-0" />
                            </div>
                            {error && (
                                <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5 animate-fadeIn">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || phone.length !== 10}
                            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                                loading || phone.length !== 10
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/40'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.99]'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                    <span>{t.sending}</span>
                                </>
                            ) : (
                                <>
                                    <span>{t.submitBtn}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center gap-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t.vendorPrompt}</span>
                            <Link
                                href="/auth/vendor/register"
                                className="text-emerald-400 font-semibold hover:text-emerald-300 underline underline-offset-4 transition-colors"
                            >
                                {t.vendorLink}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Trust Badge */}
            <div className="mt-8 text-center text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
                <span>{t.secureNotice}</span>
            </div>
        </div>
    );
}
