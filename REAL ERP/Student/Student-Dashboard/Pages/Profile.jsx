import React from "react";
import {
    ChevronRight,
    User,
    CreditCard,
    Bell,
    Shield,
    Languages,
    Eye,
    FileText,
    HelpCircle,
    Users,
    LogOut
} from "lucide-react";
import BottomNav from "../components/BottomNav";

const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-neutral-100 pb-24 px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="relative bg-white h-40 md:h-48 flex items-center justify-center rounded-b-3xl shadow-md border-b">
                    {/* Avatar */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-60px] w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 16s0-4 4-4 4 4 4 4v1a4 4 0 01-8 0v-1zm8-6a4 4 0 100-8 4 4 0 000 8z"
                            />
                        </svg>
                    </div>
                </div>

                {/* User Info */}
                <div className="mt-20 flex flex-col items-center md:mt-24">
                    <h3 className="font-bold text-xl md:text-2xl text-gray-800">Harsha</h3>
                    <p className="text-sm md:text-base text-gray-500">HarshaKumara98@gmail.com</p>
                </div>

                {/* Profile Options */}
                <div className="bg-white mx-1 md:mx-0 mt-6 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100">
                    {[
                        ["Edit Profile", User],
                        ["Payment Option", CreditCard],
                        ["Notifications", Bell],
                        ["Security", Shield],
                        ["Language", Languages, "English (US)"],
                        ["Dark Mode", Eye],
                        ["Terms & Conditions", FileText],
                        ["Help Center", HelpCircle],
                        ["Invite Friends", Users],
                        ["Logout", LogOut]
                    ].map(([label, Icon, extra], idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between py-4 px-1 hover:bg-neutral-50 cursor-pointer transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <Icon className="h-5 w-5 md:h-6 md:w-6 text-gray-600" />
                                <span className="text-gray-800 text-sm md:text-base font-medium">{label}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {extra && (
                                    <span className="text-neutral-700 text-xs md:text-sm font-medium">{extra}</span>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Navigation for mobile only */}
                <div className="block md:hidden">
                    <BottomNav />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
