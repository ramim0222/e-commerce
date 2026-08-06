import React, { useState, useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import { Clock, ShoppingBag, ShieldCheck, Languages, CheckCircle2, MessageSquare, PhoneCall, ArrowRight } from 'lucide-react';

export default function VendorPendingApproval() {
    const [lang, setLang] = useState('bn');
    const cardRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.96 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
            );

            gsap.to(iconRef.current, {
                scale: 1.08,
                repeat: -1,
                yoyo: true,
                duration: 1.8,
                ease: 'sine.inOut',
            });
        });
        return () => ctx.revert();
    }, []);

    const t = {
        bn: {
            title: 'আবেদন জমা নেওয়া হয়েছে!',
            statusTag: 'পর্যালোচনাধীন (Pending)',
            message: 'আপনার মার্চেন্ট রেজিস্ট্রেশন আবেদন সফলভাবে আমাদের টিম এর কাছে পৌঁছেছে।',
            estimateTitle: 'আনুমানিক সময়',
            estimateDetail: '২৪-৪৮ ঘণ্টার মধ্যে অ্যাডমিন যাচাই করে এসএমএস/ইমেইলে নিশ্চিত করবে।',
            stepsTitle: 'পরবর্তী কি হবে?',
            step1: 'আমাদের ভেরিফিকেশন টিম আপনার ট্রেড লাইসেন্স ও NID চেক করবে।',
            step2: 'অনুমোদিত হলে আপনি মার্চেন্ট ড্যাশবোর্ডের অ্যাক্সেস পাবেন।',
            browseBtn: 'মার্কেটপ্লেস ব্রাউজ করুন',
            supportText: 'জরুরী সহায়তার জন্য যোগাযোগের নম্বর: +৮৮০ ৯৬১২-০০০০০০',
            secureNotice: '১০০% নিরাপদ ও স্বচ্ছ ভেরিফিকেশন প্রক্রিয়া',
        },
        en: {
            title: 'Application Received!',
            statusTag: 'Pending Approval',
            message: 'Your merchant application has been successfully submitted and is under review.',
            estimateTitle: 'Estimated Review Time',
            estimateDetail: 'Usually verified within 24-48 business hours via SMS/Email notification.',
            stepsTitle: 'What happens next?',
            step1: 'Our compliance team checks your Trade License & NID details.',
            step2: 'Upon approval, you gain instant access to your Vendor Dashboard.',
            browseBtn: 'Browse Marketplace Meanwhile',
            supportText: 'For urgent support, call: +880 9612-000000',
            secureNotice: '100% Secure & Transparent Verification',
        },
    }[lang];

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 sm:p-6 relative font-sans overflow-hidden">
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

            {/* Status Card */}
            <div
                ref={cardRef}
                className="w-full max-w-lg bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10 text-center"
            >
                {/* Animated Icon */}
                <div className="flex justify-center mb-6">
                    <div
                        ref={iconRef}
                        className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10"
                    >
                        <Clock className="w-8 h-8 text-amber-400 stroke-[2]" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{t.statusTag}</span>
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-1">
                            {t.title}
                        </h1>
                        <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                            {t.message}
                        </p>
                    </div>

                    {/* Review Time Box */}
                    <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-left space-y-1">
                        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{t.estimateTitle}</span>
                        </div>
                        <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                            {t.estimateDetail}
                        </p>
                    </div>

                    {/* Next Steps List */}
                    <div className="text-left space-y-2.5 pt-1">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            {t.stepsTitle}
                        </h3>
                        <ul className="space-y-2 text-xs text-slate-300">
                            <li className="flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                                    1
                                </span>
                                <span>{t.step1}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                                    2
                                </span>
                                <span>{t.step2}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Marketplace Button */}
                    <div className="pt-2">
                        <Link
                            href="/"
                            className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>{t.browseBtn}</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Support Contact */}
                    <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{t.supportText}</span>
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
