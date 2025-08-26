import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Users, UserX, Clock } from 'lucide-react';

const AttendanceCard = ({
    studentData,
    results,
    attendance
}) => {
    // Calculate real attendance statistics
    const totalDays = attendance.length;
    const presentDays = attendance.filter(a => a.status === 'present').length;
    const absentDays = attendance.filter(a => a.status === 'absent').length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    
    // Get current date
    const currentDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    });

    const totalSegments = 18;
    const targetFilledSegments = Math.round((attendancePercentage / 100) * totalSegments);
    const angleStep = 180 / (totalSegments - 1);

    const [filled, setFilled] = useState(0);

    // Determine center message
    let message = "It's already great!";
    if (attendancePercentage < 50) {
        message = "Need attention!";
    } else if (attendancePercentage < 75) {
        message = "Keep improving!";
    }

    // Determine color of filled bars
    let barColor = "bg-green-500";
    if (attendancePercentage < 33) {
        barColor = "bg-red-500";
    } else if (attendancePercentage < 66) {
        barColor = "bg-yellow-400";
    }

    useEffect(() => {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            setFilled(count);
            if (count >= targetFilledSegments) clearInterval(interval);
        }, 60);
        return () => clearInterval(interval);
    }, [targetFilledSegments]);

    return (
        <div className="from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto h-full">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {/* Attendance Card */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
                            {/* Header Row */}
                            <div className="flex flex-col sm:flex-row sm:justify-between mb-9">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Total Attendance</h3>
                                    <p className="text-sm text-gray-500">{currentDate}</p>
                                </div>
                                <button className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 mt-2 sm:mt-0 text-sm">
                                    See All <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Progress Arc */}
                            <div className="relative mb-0 h-32 flex justify-center items-center">
                                <div className="relative w-56 h-28">
                                    {[...Array(totalSegments)].map((_, i) => {
                                        const rotate = -90 + i * angleStep;
                                        const isFilled = i < filled;
                                        return (
                                            <div
                                                key={i}
                                                className={`absolute left-1/2 top-1/2 w-2 sm:w-2.5 h-5 sm:h-6 rounded-md origin-bottom -translate-x-1/2 transition-all duration-200 
                                                    ${isFilled ? `${barColor} shadow-md` : 'bg-gray-300'}`}
                                                style={{
                                                    transform: `rotate(${rotate}deg) translateY(-75px)`
                                                }}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Center Text */}
                                <div className="absolute top-1/2 -translate-y-1/2 text-center">
                                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">{attendancePercentage}%</h2>
                                    <p className="text-sm text-gray-500 mt-1">{message}</p>
                                </div>
                            </div>

                            {/* Stats Bar */}
                            <div className="flex flex-row flex-wrap justify-between gap-2 mt-4">
                                {/* Present */}
                                <div className="text-center flex-1 h-20 bg-green-50 p-3 rounded-xl border border-green-100">
                                    <div className="flex justify-center mb-1">
                                        <Users className="text-green-600 w-4 h-4" />
                                    </div>
                                    <p className="text-xs text-gray-700">Present</p>
                                    <p className="text-green-600 font-bold text-lg">{presentDays}</p>
                                </div>

                                {/* Absent */}
                                <div className="text-center flex-1 h-20 bg-red-50 p-3 rounded-xl border border-red-100">
                                    <div className="flex justify-center mb-1">
                                        <UserX className="text-red-600 w-4 h-4" />
                                    </div>
                                    <p className="text-xs text-gray-700">Absent</p>
                                    <p className="text-red-500 font-bold text-lg">{absentDays}</p>
                                </div>

                                {/* Total Days */}
                                <div className="text-center flex-1 h-20 bg-blue-50 p-3 rounded-xl border border-blue-100">
                                    <div className="flex justify-center mb-1">
                                        <Clock className="text-blue-600 w-4 h-4" />
                                    </div>
                                    <p className="text-xs text-gray-700">Total Days</p>
                                    <p className="text-blue-600 font-bold text-lg">{totalDays}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="space-y-3 hidden lg:block">
                        {/* Quick Overview */}
                        <div className="bg-white rounded-xl shadow-xl p-6">
                            <h4 className="text-lg font-bold text-gray-800 mb-3">Quick Overview</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                                    <span className="text-gray-600">Attendance Rate</span>
                                    <span className="font-semibold text-gray-800">{attendancePercentage}%</span>
                                </div>
                                <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                                    <span className="text-gray-600">Total Days</span>
                                    <span className="font-semibold text-gray-800">{totalDays}</span>
                                </div>
                                <div className="flex justify-between bg-gray-50 p-2 rounded-lg">
                                    <span className="text-gray-600">Success Rate</span>
                                    <span className="font-semibold text-green-600">
                                        {totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-xl p-4">
                            <h4 className="text-lg font-bold mb-2">Performance</h4>
                            <div className="text-xl font-bold mb-1">
                                {attendancePercentage >= 90 ? 'Excellent' : attendancePercentage >= 75 ? 'Good' : 'Needs Improvement'}
                            </div>
                            <p className="text-blue-100 text-xs">
                                {attendancePercentage >= 90
                                    ? 'Keep up the great work!'
                                    : attendancePercentage >= 75
                                        ? "You're doing well!"
                                        : "Let's improve together!"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceCard;
