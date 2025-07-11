// src/components/BottomNav.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home, BookOpen, MessageCircle, Wallet, User, Menu, Bell ,X
} from 'lucide-react';

const navItems = [
    { label: 'Home', icon: Home, to: '/' },
    { label: 'Notifications', icon: Bell, to: '/notifications' },
    { label: 'Marks', icon: MessageCircle, to: '/marks' },
    { label: 'Pay Roll', icon: Wallet, to: '/payroll' },
    { label: 'Profile', icon: User, to: '/profile' },
];

const BottomNav = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 📱 Mobile Bottom Navigation Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-3 lg:hidden z-50">
                {navItems.map((item, idx) => (
                    <NavLink
                        key={idx}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex flex-col items-center text-xs font-medium transition-colors duration-200 px-2 py-1 rounded-lg ${
                                isActive 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                            }`
                        }
                    >
                        <item.icon size={20} className="mb-1" />
                        <span className="text-[10px] leading-tight">{item.label}</span>
                    </NavLink>
                ))}
            </div>

            {/* 💻 Desktop Floating Menu Button (Bottom Left) */}
            <div className="hidden lg:block fixed bottom-6 left-6 z-[60]">
                {/* Floating Circle Button with Animation */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        open ? 'rotate-90' : 'rotate-0'
                    }`}
                >
                    {open ? <X size={24} /> : <Menu size={28} />}
                </button>

                {/* Animated Backdrop - Fixed positioning and z-index */}
                {open && (
                    <div 
                        className="fixed inset-0 bg-black/20 z-40"
                        onClick={() => setOpen(false)}
                        style={{ backdropFilter: 'blur(4px)' }}
                    />
                )}

                {/* Floating Menu Box with Animations */}
                <div className={`absolute bottom-16 left-0 transition-all duration-300 ease-out z-50 ${
                    open 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
                    <div className="bg-white rounded-2xl shadow-2xl p-4 w-56 border border-gray-100">
                        {/* Menu Header */}
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                            {/* <h3 className="text-lg font-semibold text-gray-800">Navigation</h3> */}
                            <div className="w-8 h-8 ml-3 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm font-medium">Menu</span>
                            </div>
                        </div>

                        {/* Menu Items with Staggered Animation */}
                        <div className="space-y-2">
                            {navItems.map((item, idx) => (
                                <NavLink
                                    key={idx}
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                                            isActive 
                                                ? 'text-blue-600 bg-blue-50 border border-blue-200 shadow-sm' 
                                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:shadow-sm'
                                        }`
                                    }
                                    style={{
                                        animationDelay: `${idx * 100}ms`,
                                        animation: open ? 'slideInFromLeft 0.3s ease-out forwards' : 'none'
                                    }}
                                >
                                    <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                        'isActive' ? 'bg-blue-100' : 'bg-gray-100'
                                    }`}>
                                        <item.icon size={18} />
                                    </div>
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>

                        {/* Menu Footer */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                            <div className="text-xs text-gray-500 text-center">
                                Student Dashboard v1.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for Animations */}
            <style jsx>{`
                @keyframes slideInFromLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
            `}</style>
        </>
    );
};

export default BottomNav;
