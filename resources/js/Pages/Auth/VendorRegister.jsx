import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Store,
    Building2,
    FileText,
    Upload,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Languages,
    AlertCircle,
    Loader2,
    FileCheck,
    X,
} from 'lucide-react';

export default function VendorRegister() {
    const [lang, setLang] = useState('bn');
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Form fields
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        phone: '',
        email: '',
        nidNumber: '',
        tradeLicenseNo: '',
        tradeLicenseFile: null,
        acceptedTerms: false,
    });

    const [filePreview, setFilePreview] = useState(null);

    const containerRef = useRef(null);
    const stepRef = useRef(null);

    useEffect(() => {
        if (stepRef.current) {
            gsap.fromTo(
                stepRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [step]);

    const t = {
        bn: {
            title: 'মার্চেন্ট রেজিস্ট্রেশন',
            subtitle: 'আমাদের সাথে আপনার ই-কমার্স ব্যবসা বাড়ান',
            step1: 'ব্যবসার বিবরণ',
            step2: 'KYC ও কাগজপত্র',
            step3: 'পর্যালোচনা',
            businessName: 'ব্যবসা / শপের নাম',
            ownerName: 'স্বত্বাধিকারীর নাম',
            phone: 'মোবাইল নম্বর',
            email: 'ইমেইল এড্রেস (ঐচ্ছিক)',
            nidNumber: 'জাতীয় পরিচয়পত্র (NID) নম্বর',
            tradeLicenseNo: 'ট্রেড লাইসেন্স নম্বর',
            uploadTitle: 'ট্রেড লাইসেন্স আপলোড করুন (ছবি/PDF)',
            uploadDesc: 'সর্বোচ্চ সাইজ: 5MB (JPG, PNG, PDF)',
            terms: 'আমি মার্চেন্ট শর্তাবলী ও গোপনীয়তা নীতি মেনে চলছি',
            nextBtn: 'পরবর্তী ধাপ',
            prevBtn: 'পূর্ববর্তী ধাপ',
            submitBtn: 'রেজিস্ট্রেশন জমা দিন',
            submitting: 'জমা দেওয়া হচ্ছে...',
            loginPrompt: 'ইতিমধ্যে মার্চেন্ট অ্যাকাউন্ট আছে?',
            loginLink: 'লগইন করুন',
            secureNotice: '১০০% নিরাপদ ও যাচাইকৃত রেজিস্টার ব্যবস্থা',
        },
        en: {
            title: 'Merchant Registration',
            subtitle: 'Grow your e-commerce business with our platform',
            step1: 'Business Info',
            step2: 'KYC Documents',
            step3: 'Review',
            businessName: 'Business / Store Name',
            ownerName: 'Owner Full Name',
            phone: 'Mobile Phone Number',
            email: 'Email Address (Optional)',
            nidNumber: 'NID Number',
            tradeLicenseNo: 'Trade License Number',
            uploadTitle: 'Upload Trade License Document',
            uploadDesc: 'Max file size: 5MB (JPG, PNG, PDF)',
            terms: 'I agree to the Merchant Terms of Service and Privacy Policy',
            nextBtn: 'Next Step',
            prevBtn: 'Back',
            submitBtn: 'Submit Application',
            submitting: 'Submitting...',
            loginPrompt: 'Already registered as a merchant?',
            loginLink: 'Sign In',
            secureNotice: '100% Encrypted & Verified Process',
        },
    }[lang];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    const handlePhoneChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.startsWith('880')) val = val.substring(3);
        if (val.startsWith('0')) val = val.substring(1);
        if (val.length <= 10) {
            handleInputChange('phone', val);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, tradeLicenseFile: 'File size exceeds 5MB limit' }));
            return;
        }
        handleInputChange('tradeLicenseFile', file);
        if (file.type.startsWith('image/')) {
            setFilePreview(URL.createObjectURL(file));
        } else {
            setFilePreview('pdf');
        }
    };

    const validateStep1 = () => {
        const errs = {};
        if (!formData.businessName.trim()) errs.businessName = 'Business name is required';
        if (!formData.ownerName.trim()) errs.ownerName = 'Owner name is required';
        if (formData.phone.length !== 10) errs.phone = 'Valid 10-digit BD phone required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        const errs = {};
        if (!formData.nidNumber.trim() || formData.nidNumber.length < 10) {
            errs.nidNumber = 'Valid NID number required (at least 10 digits)';
        }
        if (!formData.tradeLicenseNo.trim()) {
            errs.tradeLicenseNo = 'Trade License number is required';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) setStep(3);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.acceptedTerms) {
            setErrors((prev) => ({ ...prev, acceptedTerms: 'You must accept terms to proceed' }));
            return;
        }

        setLoading(true);
        const fullPhone = `+880${formData.phone}`;

        router.post(
            '/api/v1/auth/vendor/register',
            {
                ...formData,
                phone: fullPhone,
            },
            {
                onSuccess: () => {
                    router.visit(`/auth/otp/verify?phone=${encodeURIComponent(fullPhone)}&flow=vendor_pending`);
                },
                onError: (errs) => {
                    setLoading(false);
                    setErrors(errs);
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 flex flex-col justify-center items-center p-4 sm:p-6 relative font-sans overflow-x-hidden">
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

            {/* Main Card */}
            <div
                ref={containerRef}
                className="w-full max-w-xl bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10 my-8"
            >
                <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Store className="w-7 h-7 text-slate-950 stroke-[2.25]" />
                    </div>
                </div>

                <div className="text-center space-y-1 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        {t.title}
                    </h1>
                    <p className="text-sm text-slate-400">{t.subtitle}</p>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center justify-between mb-8 px-2 relative">
                    <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
                    <div
                        className="absolute top-1/2 left-8 h-0.5 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-300"
                        style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
                    />
                    {[
                        { num: 1, label: t.step1 },
                        { num: 2, label: t.step2 },
                        { num: 3, label: t.step3 },
                    ].map((s) => (
                        <div key={s.num} className="flex flex-col items-center relative z-10">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    step >= s.num
                                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                                }`}
                            >
                                {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                            </div>
                            <span className="text-[11px] font-medium text-slate-400 mt-1.5 hidden sm:block">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Steps */}
                <div ref={stepRef}>
                    {step === 1 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.businessName} *
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        placeholder="e.g. Dhaka Fashion Store"
                                        className="w-full bg-slate-950/70 border border-slate-700/70 rounded-xl px-3.5 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                    />
                                    <Building2 className="w-4 h-4 text-slate-500 absolute right-3.5 pointer-events-none" />
                                </div>
                                {errors.businessName && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.businessName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.ownerName} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.ownerName}
                                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                                    placeholder="Full legal name"
                                    className="w-full bg-slate-950/70 border border-slate-700/70 rounded-xl px-3.5 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                                {errors.ownerName && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.ownerName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.phone} *
                                </label>
                                <div className="flex items-center rounded-xl bg-slate-950/70 border border-slate-700/70 overflow-hidden">
                                    <span className="px-3.5 py-3 bg-slate-800/60 border-r border-slate-700/60 text-slate-300 font-semibold text-sm select-none">
                                        +880
                                    </span>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="1712345678"
                                        maxLength={10}
                                        className="w-full bg-transparent px-3.5 py-3 text-white text-sm focus:outline-none"
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.email}
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    placeholder="vendor@example.com"
                                    className="w-full bg-slate-950/70 border border-slate-700/70 rounded-xl px-3.5 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-full py-3.5 px-4 mt-2 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                            >
                                <span>{t.nextBtn}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.nidNumber} *
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        value={formData.nidNumber}
                                        onChange={(e) => handleInputChange('nidNumber', e.target.value)}
                                        placeholder="10 or 17 digit NID number"
                                        className="w-full bg-slate-950/70 border border-slate-700/70 rounded-xl px-3.5 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                    />
                                    <FileText className="w-4 h-4 text-slate-500 absolute right-3.5 pointer-events-none" />
                                </div>
                                {errors.nidNumber && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.nidNumber}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.tradeLicenseNo} *
                                </label>
                                <input
                                    type="text"
                                    value={formData.tradeLicenseNo}
                                    onChange={(e) => handleInputChange('tradeLicenseNo', e.target.value)}
                                    placeholder="TL-XXXXXX"
                                    className="w-full bg-slate-950/70 border border-slate-700/70 rounded-xl px-3.5 py-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                                />
                                {errors.tradeLicenseNo && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.tradeLicenseNo}</p>
                                )}
                            </div>

                            {/* File Upload Box */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                                    {t.uploadTitle}
                                </label>
                                <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/70 rounded-xl p-4 text-center bg-slate-950/40 transition-colors relative cursor-pointer group">
                                    <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                    />
                                    {filePreview ? (
                                        <div className="flex items-center justify-center gap-3">
                                            {filePreview === 'pdf' ? (
                                                <FileCheck className="w-8 h-8 text-emerald-400" />
                                            ) : (
                                                <img
                                                    src={filePreview}
                                                    alt="Preview"
                                                    className="w-12 h-12 object-cover rounded-lg border border-slate-700"
                                                />
                                            )}
                                            <div className="text-left text-xs">
                                                <p className="font-semibold text-white truncate max-w-[180px]">
                                                    {formData.tradeLicenseFile?.name}
                                                </p>
                                                <p className="text-slate-400">Ready for submission</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            <Upload className="w-7 h-7 text-slate-400 group-hover:text-emerald-400 mx-auto transition-colors" />
                                            <p className="text-xs font-medium text-slate-300">
                                                Click or drag file to upload
                                            </p>
                                            <p className="text-[11px] text-slate-500">{t.uploadDesc}</p>
                                        </div>
                                    )}
                                </div>
                                {errors.tradeLicenseFile && (
                                    <p className="text-xs text-rose-400 mt-1">{errors.tradeLicenseFile}</p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-1/3 py-3.5 px-4 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>{t.prevBtn}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-2/3 py-3.5 px-4 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all"
                                >
                                    <span>{t.nextBtn}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-slate-400">{t.businessName}:</span>
                                    <span className="font-semibold text-white">{formData.businessName}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-slate-400">{t.ownerName}:</span>
                                    <span className="font-semibold text-white">{formData.ownerName}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-slate-400">{t.phone}:</span>
                                    <span className="font-semibold text-white">+880{formData.phone}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-2">
                                    <span className="text-slate-400">{t.nidNumber}:</span>
                                    <span className="font-semibold text-white">{formData.nidNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">{t.tradeLicenseNo}:</span>
                                    <span className="font-semibold text-white">{formData.tradeLicenseNo}</span>
                                </div>
                            </div>

                            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={formData.acceptedTerms}
                                    onChange={(e) => handleInputChange('acceptedTerms', e.target.checked)}
                                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                                />
                                <span className="text-xs text-slate-300 leading-normal">{t.terms}</span>
                            </label>
                            {errors.acceptedTerms && (
                                <p className="text-xs text-rose-400">{errors.acceptedTerms}</p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-1/3 py-3.5 px-4 rounded-xl font-semibold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>{t.prevBtn}</span>
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !formData.acceptedTerms}
                                    className={`w-2/3 py-3.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                                        loading || !formData.acceptedTerms
                                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 active:scale-[0.99]'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                            <span>{t.submitting}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>{t.submitBtn}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
                    <span>{t.loginPrompt} </span>
                    <Link
                        href="/auth/login"
                        className="text-emerald-400 font-semibold hover:text-emerald-300 underline underline-offset-4 transition-colors"
                    >
                        {t.loginLink}
                    </Link>
                </div>
            </div>

            <div className="text-center text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
                <span>{t.secureNotice}</span>
            </div>
        </div>
    );
}
