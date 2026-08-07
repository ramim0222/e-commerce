import React, { useRef, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import gsap from 'gsap';
import {
    CheckCircle2,
    PackageCheck,
    Truck,
    MapPin,
    ArrowRight,
    ShoppingBag,
    FileText,
    ShieldCheck,
} from 'lucide-react';

export default function OrderConfirmation({ order: initialOrder }) {
    const defaultOrder = {
        orderNumber: 'ORD-2026-99210',
        total: 5260,
        paymentMethod: 'Cash on Delivery (COD)',
        estimatedDelivery: '2 - 3 Business Days',
        address: 'House 42, Road 7A, Dhanmondi R/A, Dhaka',
        items: [
            {
                id: 1,
                title: 'Anker Soundcore Life Q30 Hybrid Noise Cancelling Headphones',
                variant: 'Matte Black',
                price: 5200,
                quantity: 1,
                vendor: 'TechGear BD',
            },
        ],
    };

    const order = initialOrder || defaultOrder;

    const cardRef = useRef(null);
    const checkRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
            );

            gsap.fromTo(
                checkRef.current,
                { scale: 0, rotate: -45 },
                { scale: 1, rotate: 0, duration: 0.5, delay: 0.2, ease: 'back.out(1.7)' }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
            <Head title={`Order Confirmed - ${order.orderNumber}`} />

            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div
                ref={cardRef}
                className="w-full max-w-lg bg-slate-900/85 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 relative z-10 text-center space-y-6"
            >
                {/* Checkmark Animation Icon */}
                <div className="flex justify-center">
                    <div
                        ref={checkRef}
                        className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-xl shadow-emerald-500/10"
                    >
                        <CheckCircle2 className="w-10 h-10 text-emerald-400 stroke-[2.25]" />
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <PackageCheck className="w-3.5 h-3.5" /> Order Placed Successfully
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight pt-1">
                        Thank You For Your Order!
                    </h1>
                    <p className="text-xs text-slate-400">
                        We have sent an order confirmation SMS & invoice to your mobile.
                    </p>
                </div>

                {/* Order ID Banner */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs">
                    <div className="text-left">
                        <p className="text-slate-400 font-medium">Order Number</p>
                        <p className="font-mono font-bold text-white text-sm mt-0.5">{order.orderNumber}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 font-medium">Total Amount</p>
                        <p className="font-extrabold text-emerald-400 text-sm mt-0.5">৳{order.total.toLocaleString()}</p>
                    </div>
                </div>

                {/* Delivery & Payment Details */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 text-left space-y-3 text-xs">
                    <div className="flex items-start gap-2.5">
                        <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-white">Estimated Delivery</p>
                            <p className="text-slate-400">{order.estimatedDelivery}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2.5 border-t border-slate-800/60 pt-2.5">
                        <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-white">Shipping Address</p>
                            <p className="text-slate-400 line-clamp-1">{order.address}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-2">
                    <Link
                        href="/account/orders"
                        className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-98"
                    >
                        <FileText className="w-4 h-4" />
                        <span>View Order Details</span>
                    </Link>

                    <Link
                        href="/"
                        className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2 transition-colors"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Continue Shopping</span>
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Need help with your order? Call +880 9612-000000</span>
            </div>
        </div>
    );
}
