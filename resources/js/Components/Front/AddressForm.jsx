import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { X, MapPin, Save, Home, Briefcase, Tag, CheckCircle2 } from 'lucide-react';

export default function AddressForm({ isOpen, onClose, onSave, addressToEdit }) {
    const isEditing = !!addressToEdit;

    const divisionsData = {
        Dhaka: {
            Dhaka: ['Dhanmondi', 'Gulshan', 'Uttara', 'Mirpur', 'Banani', 'Mohakhali'],
            Gazipur: ['Gazipur Sadar', 'Kaliakair', 'Sreepur'],
            Narayanganj: ['Narayanganj Sadar', 'Siddhirganj', 'Rupganj'],
        },
        Chittagong: {
            Chittagong: ['Agrabad', 'Panchlaish', 'Halishahar', 'GEC'],
            CoxsBazar: ['Coxs Bazar Sadar', 'Teknaf', 'Ukhiya'],
        },
        Sylhet: {
            Sylhet: ['Zindabazar', 'Amberkhana', 'Shahjalal Upazila'],
        },
    };

    const [label, setLabel] = useState(addressToEdit?.label || 'Home');
    const [name, setName] = useState(addressToEdit?.name || '');
    const [phone, setPhone] = useState(addressToEdit?.phone || '');
    const [division, setDivision] = useState(addressToEdit?.division || 'Dhaka');
    const [district, setDistrict] = useState(addressToEdit?.district || 'Dhaka');
    const [upazila, setUpazila] = useState(addressToEdit?.upazila || 'Dhanmondi');
    const [fullAddress, setFullAddress] = useState(addressToEdit?.fullAddress || '');
    const [isDefault, setIsDefault] = useState(addressToEdit?.isDefault || false);

    const backdropRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(
                modalRef.current,
                { opacity: 0, scale: 0.94, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
        }
    }, [isOpen]);

    const handleDivisionChange = (e) => {
        const div = e.target.value;
        setDivision(div);
        const dists = Object.keys(divisionsData[div] || {});
        const firstDist = dists[0] || '';
        setDistrict(firstDist);
        const upzs = divisionsData[div]?.[firstDist] || [];
        setUpazila(upzs[0] || '');
    };

    const handleDistrictChange = (e) => {
        const dist = e.target.value;
        setDistrict(dist);
        const upzs = divisionsData[division]?.[dist] || [];
        setUpazila(upzs[0] || '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const addressData = {
            id: addressToEdit?.id || Date.now(),
            label,
            name,
            phone: phone.startsWith('+880') ? phone : `+880${phone}`,
            division,
            district,
            upazila,
            fullAddress,
            isDefault,
        };
        onSave(addressData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            <div
                ref={backdropRef}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <div
                ref={modalRef}
                className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl z-10 text-slate-100 space-y-5"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-400" />
                        <span>{isEditing ? 'Edit Delivery Address' : 'Add New Delivery Address'}</span>
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Label Chips */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-300">Address Label</label>
                        <div className="flex gap-2">
                            {[
                                { key: 'Home', icon: Home },
                                { key: 'Office', icon: Briefcase },
                                { key: 'Other', icon: Tag },
                            ].map((item) => {
                                const IconComp = item.icon;
                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() => setLabel(item.key)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                            label === item.key
                                                ? 'bg-emerald-500 text-slate-950 border-emerald-500'
                                                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                                        }`}
                                    >
                                        <IconComp className="w-3.5 h-3.5" />
                                        <span>{item.key}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Recipient Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Legal Name"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="01712345678"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Cascading Location Selects */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Division *</label>
                            <select
                                value={division}
                                onChange={handleDivisionChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            >
                                {Object.keys(divisionsData).map((div) => (
                                    <option key={div} value={div}>{div}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">District *</label>
                            <select
                                value={district}
                                onChange={handleDistrictChange}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            >
                                {Object.keys(divisionsData[division] || {}).map((dist) => (
                                    <option key={dist} value={dist}>{dist}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">Upazila / Area *</label>
                            <select
                                value={upazila}
                                onChange={(e) => setUpazila(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                            >
                                {(divisionsData[division]?.[district] || []).map((upz) => (
                                    <option key={upz} value={upz}>{upz}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Street Address */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                            Street Address & Holding / Flat No *
                        </label>
                        <textarea
                            rows={2}
                            required
                            value={fullAddress}
                            onChange={(e) => setFullAddress(e.target.value)}
                            placeholder="House #12, Road #4, Block B..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                        />
                    </div>

                    {/* Default Toggle */}
                    <label className="flex items-center gap-2 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                            className="rounded border-slate-800 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                        />
                        <span className="text-xs text-slate-300">Set as default delivery address</span>
                    </label>

                    {/* Footer Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-1/3 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                        >
                            <Save className="w-4 h-4" /> Save Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
