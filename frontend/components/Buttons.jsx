// src/components/FeatureGrid.jsx
import React from 'react';
import {
    CalendarCheck,
    CalendarX,
    DollarSign,
    Megaphone,
    Plane,
    Grid3x3
} from 'lucide-react';

const features = [
    { icon: <CalendarCheck className="text-blue-600 w-6 h-6" />, label: 'Attendance' },
    { icon: <CalendarX className="text-red-500 w-6 h-6" />, label: 'Track Leave' },
    { icon: <DollarSign className="text-yellow-500 w-6 h-6" />, label: 'Payroll' },
    { icon: <Megaphone className="text-blue-500 w-6 h-6" />, label: 'Notice Board' },
    { icon: <Plane className="text-orange-500 w-6 h-6" />, label: 'Holidays' },
    { icon: <Grid3x3 className="text-gray-600 w-6 h-6" />, label: 'Show more' },
];

const FeatureGrid = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2 mt-4">
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
                {features.map((item, idx) => (
                    <button
                        key={idx}
                        className="flex flex-col items-center justify-center px-3 py-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-400 hover:scale-[1.03] transition-all duration-200"
                    >
                        {item.icon}
                        <span className="mt-1 text-[0.8rem] font-medium text-gray-800">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FeatureGrid;
