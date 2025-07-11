import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download, RefreshCw, Eye, AlertCircle, CheckCircle, X, Plus } from 'lucide-react';

const TimetablePage = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showSwapModal, setShowSwapModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Monday');
    const [swapRequests, setSwapRequests] = useState([
        { id: 1, day: 'Tuesday', time: '10:00 AM', subject: 'Physics', reason: 'Medical appointment', status: 'pending' },
        { id: 2, day: 'Friday', time: '2:00 PM', subject: 'Chemistry', reason: 'Conference attendance', status: 'accepted' }
    ]);

    // Mock timetable data
    const timetableData = {
        Monday: [
            { time: '9:00 AM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' },
            { time: '10:00 AM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' },
            { time: '11:00 AM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' },
            { time: '2:00 PM', subject: 'Biology', room: 'Room 210', color: 'bg-yellow-100' }
        ],
        Tuesday: [
            { time: '9:00 AM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' },
            { time: '10:00 AM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' },
            { time: '11:00 AM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' },
            { time: '3:00 PM', subject: 'Biology', room: 'Room 210', color: 'bg-yellow-100' }
        ],
        Wednesday: [
            { time: '9:00 AM', subject: 'Biology', room: 'Room 210', color: 'bg-yellow-100' },
            { time: '10:00 AM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' },
            { time: '2:00 PM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' },
            { time: '3:00 PM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' }
        ],
        Thursday: [
            { time: '9:00 AM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' },
            { time: '10:00 AM', subject: 'Biology', room: 'Room 210', color: 'bg-yellow-100' },
            { time: '11:00 AM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' },
            { time: '2:00 PM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' }
        ],
        Friday: [
            { time: '9:00 AM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' },
            { time: '10:00 AM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' },
            { time: '11:00 AM', subject: 'Biology', room: 'Room 210', color: 'bg-yellow-100' },
            { time: '2:00 PM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' }
        ],
        Saturday: [
            { time: '9:00 AM', subject: 'Physics', room: 'Room 101', color: 'bg-blue-100' },
            { time: '10:00 AM', subject: 'Mathematics', room: 'Room 105', color: 'bg-purple-100' },
            { time: '11:00 AM', subject: 'Chemistry', room: 'Room 203', color: 'bg-green-100' }
        ]
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'];

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    // Get current day
    const getCurrentDay = () => {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return dayNames[currentTime.getDay()];
    };

    // Get next class
    const getNextClass = () => {
        const currentDay = getCurrentDay();
        if (currentDay === 'Sunday') return null;

        const todayClasses = timetableData[currentDay] || [];
        const now = currentTime.getHours() * 60 + currentTime.getMinutes();

        for (const classItem of todayClasses) {
            const [time, period] = classItem.time.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
            const classTime = adjustedHours * 60 + minutes;

            if (classTime > now) {
                const timeRemaining = classTime - now;
                const hoursRemaining = Math.floor(timeRemaining / 60);
                const minutesRemaining = timeRemaining % 60;

                return {
                    ...classItem,
                    timeRemaining: hoursRemaining > 0 ? `${hoursRemaining}h ${minutesRemaining}m` : `${minutesRemaining}m`
                };
            }
        }
        return null;
    };

    // Check if a class is currently active
    const isClassActive = (classTime) => {
        const [time, period] = classTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const adjustedHours = period === 'PM' && hours !== 12 ? hours + 12 : hours;
        const classStart = adjustedHours * 60 + minutes;
        const classEnd = classStart + 60; // Assuming 1-hour classes
        const now = currentTime.getHours() * 60 + currentTime.getMinutes();

        return now >= classStart && now < classEnd;
    };

    // Handle swap request
    const handleSwapRequest = (formData) => {
        const newRequest = {
            id: Date.now(),
            day: formData.day,
            time: formData.time,
            subject: formData.subject,
            reason: formData.reason,
            status: 'pending'
        };
        setSwapRequests([...swapRequests, newRequest]);
        setShowSwapModal(false);
    };

    // Download timetable as PDF
    const downloadTimetable = () => {
        window.print();
    };

    const nextClass = getNextClass();

    // Swap Form Component
    const SwapForm = ({ onSubmit, onCancel, days, timeSlots }) => {
        const [formData, setFormData] = useState({
            day: days[0],
            time: timeSlots[0],
            subject: '',
            reason: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            if (formData.subject && formData.reason) {
                onSubmit(formData);
            }
        };

        return (
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                    <select
                        value={formData.day}
                        onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter subject name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <textarea
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows="3"
                        placeholder="Enter reason for swap request"
                    />
                </div>

                <div className="flex space-x-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                    >
                        Submit Request
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                            <Calendar className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">📅 Weekly Class Timetable</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">Track your weekly class schedule, upcoming periods, and manage swaps.</p>
                </div>

                {/* Next Class Reminder */}
                {nextClass && (
                    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Next Class</h3>
                                    <p className="text-sm text-gray-600">
                                        {nextClass.subject} at {nextClass.time} in {nextClass.room}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    Starts in {nextClass.timeRemaining}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mobile Day Selector */}
                <div className="md:hidden mb-6">
                    <select
                        value={selectedDay}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full p-3 bg-white rounded-xl shadow-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </select>
                </div>

                {/* Timetable Grid - Desktop */}
                <div className="hidden md:block bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left font-semibold text-gray-700">Time</th>
                                    {days.map(day => (
                                        <th key={day} className="p-4 text-center font-semibold text-gray-700 min-w-36">
                                            {day}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {timeSlots.map(time => (
                                    <tr key={time} className="border-t border-gray-100">
                                        <td className="p-4 font-medium text-gray-600">{time}</td>
                                        {days.map(day => {
                                            const classData = timetableData[day]?.find(c => c.time === time);
                                            const isActive = classData && day === getCurrentDay() && isClassActive(time);

                                            return (
                                                <td key={`${day}-${time}`} className="p-2">
                                                    {classData ? (
                                                        <div className={`p-3 rounded-xl ${classData.color} ${isActive ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''} transition-all duration-200 hover:shadow-md`}>
                                                            {isActive && (
                                                                <div className="flex items-center justify-center mb-1">
                                                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">🟢 Live</span>
                                                                </div>
                                                            )}
                                                            <div className="font-semibold text-gray-800 text-sm">{classData.subject}</div>
                                                            <div className="text-xs text-gray-600 mt-1">{classData.room}</div>
                                                        </div>
                                                    ) : (
                                                        <div className="p-3 rounded-xl bg-gray-50 text-center text-gray-400 text-sm">
                                                            Free
                                                        </div>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Timetable - Mobile */}
                <div className="md:hidden bg-white rounded-2xl shadow-xl p-4 mb-8">
                    <h3 className="font-semibold text-gray-800 mb-4">{selectedDay} Schedule</h3>
                    <div className="space-y-3">
                        {(timetableData[selectedDay] || []).map((classData, index) => {
                            const isActive = selectedDay === getCurrentDay() && isClassActive(classData.time);

                            return (
                                <div key={index} className={`p-4 rounded-xl ${classData.color} ${isActive ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}`}>
                                    {isActive && (
                                        <div className="flex items-center mb-2">
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">🟢 Live</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-semibold text-gray-800">{classData.subject}</div>
                                            <div className="text-sm text-gray-600">{classData.room}</div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">{classData.time}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Swap Requests */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Swap Requests</h3>
                        <button
                            onClick={() => setShowSwapModal(true)}
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>Request Swap</span>
                        </button>
                    </div>

                    {swapRequests.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No swap requests yet</p>
                    ) : (
                        <div className="space-y-3">
                            {swapRequests.map(request => (
                                <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <div className="font-medium text-gray-800">{request.subject}</div>
                                        <div className="text-sm text-gray-600">{request.day} at {request.time}</div>
                                        <div className="text-xs text-gray-500">Reason: {request.reason}</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {request.status === 'pending' && (
                                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                                        )}
                                        {request.status === 'accepted' && (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Accepted
                                            </span>
                                        )}
                                        {request.status === 'rejected' && (
                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center">
                                                <X className="w-3 h-3 mr-1" />
                                                Rejected
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips & Motivation Card */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold">🚀 Pro Tip</h3>
                            <p className="text-sm opacity-90">Block 10 minutes before each lecture to revise your flow and prepare materials.</p>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <button
                    onClick={downloadTimetable}
                    className="fixed bottom-20 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 z-50"
                >
                    <Download className="w-6 h-6" />
                </button>
            </div>

            {/* Swap Modal */}
            {showSwapModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Request Class Swap</h3>
                            <button
                                onClick={() => setShowSwapModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <SwapForm onSubmit={handleSwapRequest} onCancel={() => setShowSwapModal(false)} days={days} timeSlots={timeSlots} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimetablePage;