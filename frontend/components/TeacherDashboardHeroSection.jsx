import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Users, Calendar, MapPin, Coffee } from 'lucide-react';
import { teachersAPI, classesAPI, subjectsAPI, attendanceAPI } from '../api';

export default function TeacherHeroSection() {
    const [teacherData, setTeacherData] = useState(null);
    const [classesData, setClassesData] = useState([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                setLoading(true);
                // Get teacher profile from localStorage or context
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user.id) {
                    // Fetch teacher data
                    const teacher = await teachersAPI.getById(user.id);
                    setTeacherData(teacher);
                    
                    // Fetch classes taught by this teacher
                    const classes = await classesAPI.getAll();
                    const teacherClasses = classes.filter(cls => cls.teacherId === user.id);
                    setClassesData(teacherClasses);
                    
                    // Fetch subjects taught by this teacher
                    const subjects = await subjectsAPI.getAll();
                    const teacherSubjects = subjects.filter(subj => subj.teacherId === user.id);
                    setSubjectsData(teacherSubjects);
                    
                    // Fetch today's attendance for teacher's classes
                    const today = new Date().toISOString().split('T')[0];
                    const attendancePromises = teacherClasses.map(cls => 
                        attendanceAPI.getClassAttendance(cls._id, today)
                    );
                    const attendanceResults = await Promise.all(attendancePromises);
                    const allAttendance = attendanceResults.flatMap(result => result.data || []);
                    setAttendanceData(allAttendance);
                }
            } catch (error) {
                console.error('Error fetching teacher data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, []);

    // Calculate real statistics
    const classesToday = classesData.length;
    const totalDuration = classesData.length * 45; // Assuming 45 minutes per class
    const totalStudents = attendanceData.length;
    const attendancePercentage = totalStudents > 0 ? 
        (attendanceData.filter(a => a.status === 'present').length / totalStudents * 100).toFixed(1) : 0;

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

    if (loading) {
        return (
            <div className="min-h-screen lg:-mb-36 sm:mb-6 p-4 md:p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

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
                                <span className="text-2xl font-bold text-gray-800">{classesToday}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Duration:</span>
                                <span className="text-lg font-semibold text-blue-600">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Performance Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">Performance</h3>
                                <p className="text-blue-100 text-sm">
                                    {attendancePercentage >= 80 ? 'Excellent' : 
                                     attendancePercentage >= 60 ? 'Good' : 
                                     attendancePercentage >= 40 ? 'Average' : 'Needs Improvement'}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-opacity-20 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <p className="text-blue-100 italic">
                            {attendancePercentage >= 80 ? 'Outstanding attendance in your classes!' :
                             attendancePercentage >= 60 ? 'Good engagement in your classes!' :
                             attendancePercentage >= 40 ? 'Moderate engagement, room for improvement.' :
                             'Consider strategies to improve student engagement.'}
                        </p>
                    </div>

                    {/* 5. Semi-Circle Graph Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <SemiCircleProgress
                            percentage={attendancePercentage}
                            label="Attendance Rate"
                            subtitle="Today's Classes"
                        />
                    </div>

                    {/* 6. Subject Summary Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Subjects Taught</h3>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {subjectsData.slice(0, 3).map((subject, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-gray-600">{subject.name}</span>
                                    <span className="text-sm font-semibold text-purple-600">{subject.code}</span>
                                </div>
                            ))}
                            {subjectsData.length === 0 && (
                                <p className="text-gray-500 text-sm">No subjects assigned yet</p>
                            )}
                        </div>
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
                            {classesData.length > 0 ? (
                                <>
                                    <div className="flex items-center space-x-3">
                                        <BookOpen className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{classesData[0]?.name || 'No Class'}</p>
                                            <p className="text-sm text-gray-600">Class</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="font-semibold text-gray-800">Next Period</p>
                                            <p className="text-sm text-gray-600">Time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="font-semibold text-gray-800">Section: {classesData[0]?.section || 'N/A'}</p>
                                            <p className="text-sm text-gray-600">Location</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 text-sm">No classes scheduled today</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. Quick Stats Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
                            <div className="w-10 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <BookOpen className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">{subjectsData.length}</p>
                                    <p className="text-sm text-gray-600">Subjects</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Users className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">{classesData.length}</p>
                                    <p className="text-sm text-gray-600">Classes</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <div>
                                    <p className="font-semibold text-gray-800">{totalStudents}</p>
                                    <p className="text-sm text-gray-600">Total Students</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}