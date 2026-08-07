import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    CreditCard,
    ShieldCheck,
    Save,
    Eye,
    EyeOff,
    CheckCircle2,
    ToggleLeft,
    ToggleRight,
    ArrowLeft,
    Key,
    Lock,
    Globe,
    Zap,
    Loader2,
} from 'lucide-react';

export default function PaymentGatewaySettings({ gateways: initialGateways }) {
    const defaultGateways = {
        bkash: {
            name: 'bKash Merchant Checkout',
            enabled: true,
            sandbox: true,
            appKey: 'bkash_app_key_test_99120',
            appSecret: 'bkash_secret_test_secret_key_xxxx',
            username: 'sandbox_user_01',
            password: 'sandbox_password_01',
        },
        nagad: {
            name: 'Nagad Payment Gateway',
            enabled: true,
            sandbox: true,
            merchantId: '680199210',
            publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE...',
            privateKey: 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoI...',
        },
        sslcommerz: {
            name: 'SSLCommerz (Cards & NetBanking)',
            enabled: false,
            sandbox: true,
            storeId: 'test_store_id',
            storePassword: 'test_store_password',
        },
        cod: {
            name: 'Cash on Delivery (COD)',
            enabled: true,
            advanceRequirement: false,
        },
    };

    const [gateways, setGateways] = useState(initialGateways || defaultGateways);
    const [showSecrets, setShowSecrets] = useState({});
    const [loading, setLoading] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(
                formRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
            );
        }
    }, []);

    const toggleShowSecret = (fieldKey) => {
        setShowSecrets((prev) => ({ ...prev, [fieldKey]: !prev[fieldKey] }));
    };

    const updateGatewayField = (gatewayKey, field, value) => {
        setGateways((prev) => ({
            ...prev,
            [gatewayKey]: {
                ...prev[gatewayKey],
                [field]: value,
            },
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post(
            '/api/v1/admin/payments/gateways',
            { gateways },
            {
                onSuccess: () => {
                    setSavedNotice(true);
                    setTimeout(() => setSavedNotice(false), 3000);
                },
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            <Head title="SuperAdmin - Payment Gateway Settings" />

            <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto space-y-6 w-full">
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
                                <CreditCard className="w-6 h-6 text-emerald-400" />
                                <span>Payment Gateway Settings</span>
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Configure credentials, API keys, and sandbox modes for Bangladesh payment gateways.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all self-start sm:self-auto"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>Save Configuration</span>
                    </button>
                </div>

                {savedNotice && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3.5 flex items-center gap-2 text-xs text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment gateway configurations updated successfully!</span>
                    </div>
                )}

                {/* Settings Form */}
                <form ref={formRef} onSubmit={handleSave} className="space-y-6">
                    {/* 1. bKash Settings */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{gateways.bkash.name}</span>
                                <span className="text-[10px] font-mono bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded border border-pink-500/20">
                                    bKash API v1.20
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                                    <span>Sandbox Test Mode</span>
                                    <input
                                        type="checkbox"
                                        checked={gateways.bkash.sandbox}
                                        onChange={(e) => updateGatewayField('bkash', 'sandbox', e.target.checked)}
                                        className="rounded border-slate-800 bg-slate-950 text-emerald-500"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => updateGatewayField('bkash', 'enabled', !gateways.bkash.enabled)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                        gateways.bkash.enabled
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                            : 'bg-slate-800 text-slate-500 border-slate-700'
                                    }`}
                                >
                                    {gateways.bkash.enabled ? 'Enabled' : 'Disabled'}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">bKash App Key</label>
                                <input
                                    type="text"
                                    value={gateways.bkash.appKey}
                                    onChange={(e) => updateGatewayField('bkash', 'appKey', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">bKash App Secret</label>
                                <div className="relative">
                                    <input
                                        type={showSecrets['bkashSecret'] ? 'text' : 'password'}
                                        value={gateways.bkash.appSecret}
                                        onChange={(e) => updateGatewayField('bkash', 'appSecret', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowSecret('bkashSecret')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showSecrets['bkashSecret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Nagad Settings */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{gateways.nagad.name}</span>
                                <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                                    Nagad PGW
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateGatewayField('nagad', 'enabled', !gateways.nagad.enabled)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                    gateways.nagad.enabled
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                        : 'bg-slate-800 text-slate-500 border-slate-700'
                                }`}
                            >
                                {gateways.nagad.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Nagad Merchant ID</label>
                                <input
                                    type="text"
                                    value={gateways.nagad.merchantId}
                                    onChange={(e) => updateGatewayField('nagad', 'merchantId', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Cash on Delivery Settings */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-sm text-white">{gateways.cod.name}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Allow customers to pay cash directly to courier upon package delivery.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => updateGatewayField('cod', 'enabled', !gateways.cod.enabled)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                gateways.cod.enabled
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-slate-800 text-slate-500 border-slate-700'
                            }`}
                        >
                            {gateways.cod.enabled ? 'Enabled' : 'Disabled'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
