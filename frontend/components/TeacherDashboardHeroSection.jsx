import React from 'react';
import { BookOpen, Clock, Users, Calendar, MapPin, Coffee } from 'lucide-react';

export default function TeacherHeroSection() {
    // Semi-circle progress component
    const SemiCircleProgress = ({ percentage, label, subtitle }) => {
        const radius = 60;
        const circumference = Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="flex flex-col items-center">
                <div className="relative">
                    <svg width="140" height="80" viewBox="0 0 140 80">
                        {/* Background arc */}
                        <path
                            d="M 20 70 A 50 50 0 0 1 120 70"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="8"
                            strokeLinecap="round"
                        />
                        {/* Progress arc */}
                        <path
                            d="M 20 70 A 50 50 0 0 1 120 70"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={`${(percentage / 100) * 157} 157`}
                            className="transition-all duration-1000 ease-out"
                        />
                        {/* Gradient definition */}
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                        <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <p className="font-semibold text-gray-800">{label}</p>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen lg:-mb-36 sm:mb-6 p-4 md:p-6">
            
            {/* Main Grid - 2 columns on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column */}
                <div className="space-y-6">

                    {/* 1. Classes Today Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Classes Today</h3>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Classes Today:</span>
                                <span className="text-2xl font-bold text-gray-800">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Duration:</span>
                                <span className="text-lg font-semibold text-blue-600">4h 30min</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Performance Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">Performance</h3>
                                <p className="text-blue-100 text-sm">Good</p>
                            </div>
                            <div className="w-10 h-10 bg-opacity-20 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-blue-100 italic">
                            "Great engagement in your last 3 classes!"
                        </p>
                    </div>

                    {/* 5. Semi-Circle Graph Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <SemiCircleProgress
                            percentage={76.3}
                            label="Syllabus Completion"
                            subtitle="This Semester"
                        />
                  
                    </div>

                </div>

                {/* Right Column */}
                <div className="space-y-6">

                    {/* 3. Next Class Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Next Class</h3>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <BookOpen className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">11th-B Chemistry</p>
                                    <p className="text-sm text-gray-600">Subject</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">10:30 AM - 11:15 AM</p>
                                    <p className="text-sm text-gray-600">Time</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">Room: Lab 2</p>
                                    <p className="text-sm text-gray-600">Location</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Meeting Reminder Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Meeting Today</h3>
                            <div className="w-10 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Coffee className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">2:00 PM</p>
                                    <p className="text-sm text-gray-600">Time</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">Conference Hall</p>
                                    <p className="text-sm text-gray-600">Venue</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <BookOpen className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">Term Review</p>
                                    <p className="text-sm text-gray-600">Agenda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}