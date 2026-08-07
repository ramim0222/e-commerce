import React, { useState, useRef, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    Truck,
    ShieldCheck,
    Save,
    Eye,
    EyeOff,
    CheckCircle2,
    ArrowLeft,
    MapPin,
    DollarSign,
    Loader2,
    Building2,
    Settings,
} from 'lucide-react';

export default function CourierSettings({ couriers: initialCouriers, zonePricing: initialZones }) {
    const defaultCouriers = {
        pathao: {
            name: 'Pathao Courier API',
            enabled: true,
            clientId: 'pth_client_99210',
            clientSecret: 'pth_secret_key_x992011a',
            storeId: '448102',
        },
        steadfast: {
            name: 'Steadfast Courier API',
            enabled: true,
            apiKey: 'sf_api_key_889210a',
            secretKey: 'sf_secret_key_992011b',
        },
        redx: {
            name: 'RedX Logistics API',
            enabled: false,
            accessToken: 'redx_token_secret_xxxx',
        },
    };

    const defaultZones = [
        { id: 1, name: 'Inside Dhaka City', code: 'DHAKA_CITY', fee: 60, estimatedDays: '1-2 Days' },
        { id: 2, name: 'Outside Dhaka (Suburbs / All Bangladesh)', code: 'OUTSIDE_DHAKA', fee: 120, estimatedDays: '2-4 Days' },
        { id: 3, name: 'Express Same-Day Delivery (Dhaka Only)', code: 'EXPRESS_DHAKA', fee: 180, estimatedDays: 'Same Day (6 Hours)' },
    ];

    const [couriers, setCouriers] = useState(initialCouriers || defaultCouriers);
    const [zones, setZones] = useState(initialZones || defaultZones);
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

    const updateCourierField = (courierKey, field, value) => {
        setCouriers((prev) => ({
            ...prev,
            [courierKey]: {
                ...prev[courierKey],
                [field]: value,
            },
        }));
    };

    const updateZoneFee = (id, fee) => {
        setZones((prev) =>
            prev.map((z) => (z.id === id ? { ...z, fee: parseFloat(fee) || 0 } : z))
        );
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post(
            '/api/v1/admin/shipping/couriers',
            { couriers, zones },
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
            <Head title="SuperAdmin - Courier & Shipping Settings" />

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
                                <Truck className="w-6 h-6 text-emerald-400" />
                                <span>Courier & Shipping Zone Settings</span>
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Manage API integrations for Pathao, Steadfast, RedX, and set delivery zone pricing rates.
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
                        <span>Courier credentials & zone rates updated successfully!</span>
                    </div>
                )}

                <form ref={formRef} onSubmit={handleSave} className="space-y-6">
                    {/* 1. Zone Pricing Table Section */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span>Marketplace Delivery Zone Shipping Fees</span>
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {zones.map((zone) => (
                                <div key={zone.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <span className="font-semibold text-xs text-white">{zone.name}</span>
                                        <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                            {zone.estimatedDays}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                                            Delivery Fee (৳)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={zone.fee}
                                                onChange={(e) => updateZoneFee(zone.id, e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-bold"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">
                                                ৳
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 2. Pathao Courier API */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{couriers.pathao.name}</span>
                                <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">
                                    Pathao API v2
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateCourierField('pathao', 'enabled', !couriers.pathao.enabled)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                    couriers.pathao.enabled
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                        : 'bg-slate-800 text-slate-500 border-slate-700'
                                }`}
                            >
                                {couriers.pathao.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Client ID</label>
                                <input
                                    type="text"
                                    value={couriers.pathao.clientId}
                                    onChange={(e) => updateCourierField('pathao', 'clientId', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Secret</label>
                                <div className="relative">
                                    <input
                                        type={showSecrets['pathaoSecret'] ? 'text' : 'password'}
                                        value={couriers.pathao.clientSecret}
                                        onChange={(e) => updateCourierField('pathao', 'clientSecret', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowSecret('pathaoSecret')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showSecrets['pathaoSecret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Store ID</label>
                                <input
                                    type="text"
                                    value={couriers.pathao.storeId}
                                    onChange={(e) => updateCourierField('pathao', 'storeId', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Steadfast Courier API */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-white">{couriers.steadfast.name}</span>
                                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                                    Steadfast API
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateCourierField('steadfast', 'enabled', !couriers.steadfast.enabled)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                                    couriers.steadfast.enabled
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                        : 'bg-slate-800 text-slate-500 border-slate-700'
                                }`}
                            >
                                {couriers.steadfast.enabled ? 'Enabled' : 'Disabled'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">API Key</label>
                                <input
                                    type="text"
                                    value={couriers.steadfast.apiKey}
                                    onChange={(e) => updateCourierField('steadfast', 'apiKey', e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-300 mb-1">Secret Key</label>
                                <div className="relative">
                                    <input
                                        type={showSecrets['sfSecret'] ? 'text' : 'password'}
                                        value={couriers.steadfast.secretKey}
                                        onChange={(e) => updateCourierField('steadfast', 'secretKey', e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => toggleShowSecret('sfSecret')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showSecrets['sfSecret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
