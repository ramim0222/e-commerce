import React, { useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import gsap from 'gsap';
import {
    X,
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ShoppingBag,
} from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQty, onRemoveItem }) {
    const backdropRef = useRef(null);
    const drawerRef = useRef(null);

    const defaultItems = [
        {
            id: 1,
            title: 'Anker Soundcore Life Q30 Headphones',
            variant: 'Matte Black / Standard',
            price: 5200,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80',
        },
        {
            id: 2,
            title: 'Smart AMOLED Fitness Watch V2',
            variant: 'Space Gray / Standard',
            price: 2950,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
        },
    ];

    const items = cartItems.length > 0 ? cartItems : defaultItems;
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(
                backdropRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                drawerRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.4, ease: 'power3.out' }
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            />

            {/* Slide-Over Drawer */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div
                    ref={drawerRef}
                    className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl"
                >
                    {/* Drawer Header */}
                    <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 text-emerald-400" />
                            <h2 className="font-bold text-base text-white">Your Shopping Cart</h2>
                            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                                {items.length} items
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-slate-800/60">
                        {items.map((item) => (
                            <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                                />
                                <div className="flex-1 space-y-1">
                                    <h4 className="font-semibold text-xs text-white line-clamp-1">
                                        {item.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-400">{item.variant}</p>

                                    <div className="flex items-center justify-between pt-1">
                                        <span className="font-bold text-xs text-emerald-400">
                                            ৳{item.price.toLocaleString()}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5">
                                                <button
                                                    onClick={() => onUpdateQty && onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-1 text-slate-400 hover:text-white"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center text-xs font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQty && onUpdateQty(item.id, item.quantity + 1)}
                                                    className="p-1 text-slate-400 hover:text-white"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => onRemoveItem && onRemoveItem(item.id)}
                                                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Drawer Footer Subtotal & CTAs */}
                    <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/60 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400 font-medium">Subtotal</span>
                            <span className="font-extrabold text-white">৳{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="space-y-2">
                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                            >
                                <span>Proceed to Checkout</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center gap-2 transition-colors"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                <span>View Full Cart</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
