import React, { useState, useEffect, useCallback } from 'react';
import { Save, Users, BookOpen, Calendar, CheckCircle, XCircle, Clock, Activity, Copy, BarChart3, Heart, Zap, Star, Trophy } from 'lucide-react';
import { classesAPI, subjectsAPI, studentsAPI, attendanceAPI } from '../api';

const MarksAttendance = () => {
    // State management
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [isHoliday, setIsHoliday] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showMarksSection, setShowMarksSection] = useState(false);
    const [marksData, setMarksData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    // Fetch classes and subjects on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [classesRes, subjectsRes] = await Promise.all([
                    classesAPI.getAll(1, 100),
                    subjectsAPI.getAll(1, 100)
                ]);
                
                setClasses(classesRes?.data || classesRes || []);
                setSubjects(subjectsRes?.data || subjectsRes || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch students when class changes
    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedClass) {
                try {
                    setLoading(true);
                    // Get all students and filter by class
                    const studentsRes = await studentsAPI.getAll(1, 100, '');
                    const allStudents = studentsRes?.data || studentsRes || [];
                    const classStudents = allStudents.filter(student => student.classId === selectedClass);
                    
                    setStudents(classStudents);

                    // Initialize attendance data
                    const initialAttendance = {};
                    const initialMarks = {};
                    classStudents.forEach(student => {
                        initialAttendance[student._id] = '';
                        initialMarks[student._id] = '';
                    });
                    setAttendanceData(initialAttendance);
                    setMarksData(initialMarks);
                } catch (error) {
                    console.error('Error fetching students:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudents();
    }, [selectedClass]);

    // Attendance options with fun styling
    const attendanceOptions = [
        {
            value: 'present',
            label: 'Present',
            icon: CheckCircle,
            color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
            activeColor: 'bg-emerald-100 border-emerald-400 text-emerald-700',
            shortcut: 'P'
        },
        {
            value: 'absent',
            label: 'Absent',
            icon: XCircle,
            color: 'bg-red-500 hover:bg-red-600 text-white',
            activeColor: 'bg-red-100 border-red-400 text-red-700',
            shortcut: 'A'
        },
        {
            value: 'medical',
            label: 'Medical',
            icon: Heart,
            color: 'bg-amber-500 hover:bg-amber-600 text-white',
            activeColor: 'bg-amber-100 border-amber-400 text-amber-700',
            shortcut: 'M'
        },
        {
            value: 'duty',
            label: 'On Duty',
            icon: Activity,
            color: 'bg-blue-500 hover:bg-blue-600 text-white',
            activeColor: 'bg-blue-100 border-blue-400 text-blue-700',
            shortcut: 'D'
        }
    ];

    // Show toast notification with fun animations
    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Handle attendance change
    const handleAttendanceChange = (studentId, value) => {
        if (isHoliday) return;
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: value
        }));

        // Fun feedback
        const messages = {
            present: '🎉 Great! Student marked present!',
            absent: '📝 Student marked absent',
            medical: '❤️ Hope they feel better soon!',
            duty: '🚀 Student on official duty!'
        };
        if (messages[value]) {
            showNotification(messages[value]);
        }
    };

    // Handle marks change
    const handleMarksChange = (studentId, value) => {
        if (isHoliday) return;
        const numValue = parseInt(value);
        if (value === '' || (numValue >= 0 && numValue <= 100)) {
            setMarksData(prev => ({
                ...prev,
                [studentId]: value
            }));
        }
    };

    // Bulk attendance actions
    const markAllAttendance = (status) => {
        if (isHoliday) return;
        const bulkData = {};
        students.forEach(student => {
            bulkData[student._id] = status;
        });
        setAttendanceData(bulkData);

        const messages = {
            present: '🎊 Wow! Everyone is present today!',
            absent: '📋 All students marked absent',
            medical: '🏥 Everyone on medical leave',
            duty: '⚡ Everyone on duty!'
        };
        showNotification(messages[status] || `All students marked as ${status}`);
    };

    // Copy previous day's data
    const copyPreviousData = async () => {
        if (isHoliday || !selectedClass) return;
        
        try {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            const previousAttendance = await attendanceAPI.getClassAttendance(selectedClass, yesterdayStr);
            if (previousAttendance.data && previousAttendance.data.length > 0) {
                const previousData = {};
                previousAttendance.data.forEach(record => {
                    previousData[record.studentId] = record.status;
                });
                setAttendanceData(previousData);
                showNotification('✨ Previous day\'s attendance copied!');
            } else {
                showNotification('📝 No previous attendance data found', 'warning');
            }
        } catch (error) {
            console.error('Error copying previous data:', error);
            showNotification('❌ Error copying previous data', 'error');
        }
    };

    // Calculate statistics
    const calculateStats = () => {
        const totalStudents = students.length;
        if (totalStudents === 0) return { avgAttendance: 0, presentCount: 0, absentCount: 0, medicalCount: 0, dutyCount: 0 };

        const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
        const absentCount = Object.values(attendanceData).filter(status => status === 'absent').length;
        const medicalCount = Object.values(attendanceData).filter(status => status === 'medical').length;
        const dutyCount = Object.values(attendanceData).filter(status => status === 'duty').length;
        const avgAttendance = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : 0;

        return { avgAttendance, presentCount, absentCount, medicalCount, dutyCount };
    };

    // Handle keyboard shortcuts
    const handleKeyPress = (e, studentId) => {
        const key = e.key.toUpperCase();
        const option = attendanceOptions.find(opt => opt.shortcut === key);
        if (option && !isHoliday && !loading) {
            handleAttendanceChange(studentId, option.value);
        }
    };

    // Save data
    const saveData = async () => {
        if (!selectedClass || !selectedSubject) {
            showNotification('⚠️ Please select class and subject first!', 'warning');
            return;
        }

        const unmarkedStudents = students.filter(student => !attendanceData[student._id]);
        if (unmarkedStudents.length > 0) {
            showNotification('📝 Please mark attendance for all students!', 'warning');
            return;
        }

        try {
            // Save attendance data
            const today = new Date().toISOString().split('T')[0];
            const attendanceRecords = students.map(student => ({
                studentId: student._id,
                classId: selectedClass,
                subjectId: selectedSubject,
                date: today,
                status: attendanceData[student._id],
                markedBy: 'teacher' // This should come from auth context
            }));

            // Save each attendance record
            for (const record of attendanceRecords) {
                await attendanceAPI.markAttendance(record);
            }

            showNotification('🎉 Attendance saved successfully! You\'re awesome!');
        } catch (error) {
            console.error('Error saving attendance:', error);
            showNotification('❌ Error saving attendance data', 'error');
        }
    };

    // Keyboard shortcuts
    const handleKeyPress = useCallback((e, studentId) => {
        if (isHoliday) return;

        const key = e.key.toLowerCase();
        switch (key) {
            case 'p':
                e.preventDefault();
                handleAttendanceChange(studentId, 'present');
                break;
            case 'a':
                e.preventDefault();
                handleAttendanceChange(studentId, 'absent');
                break;
            case 'm':
                e.preventDefault();
                handleAttendanceChange(studentId, 'medical');
                break;
            case 'd':
                e.preventDefault();
                handleAttendanceChange(studentId, 'duty');
                break;
        }
    }, [isHoliday]);

    const stats = calculateStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            {/* Decorative background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header with fun styling */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Attendance Magic ✨
                    </h1>
                    <p className="text-lg text-gray-600">Make attendance fun and effortless!</p>
                </div>

                {/* Class and Subject Selection */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                <Users className="inline w-4 h-4 mr-2 text-blue-500" />
                                Choose Your Class
                            </label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                                disabled={isHoliday || loading}
                            >
                                <option value="">🎓 Select a class</option>
                                {loading ? (
                                    <option value="">Loading classes...</option>
                                ) : (
                                    classes.map(cls => (
                                        <option key={cls._id} value={cls._id}>{cls.name}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                <BookOpen className="inline w-4 h-4 mr-2 text-purple-500" />
                                Pick Your Subject
                            </label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                                disabled={isHoliday || loading}
                            >
                                <option value="">📚 Select a subject</option>
                                {loading ? (
                                    <option value="">Loading subjects...</option>
                                ) : (
                                    subjects.map(subject => (
                                        <option key={subject._id} value={subject._id}>{subject.name}</option>
                                    ))
                                )}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => setIsHoliday(!isHoliday)}
                                className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${isHoliday
                                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                                    }`}
                            >
                                <Calendar className="inline w-4 h-4 mr-2" />
                                {isHoliday ? '🎉 Holiday Mode' : '🏖️ Mark Holiday'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics and Actions */}
                {selectedClass && selectedSubject && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Fun Statistics */}
                        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl shadow-lg border border-emerald-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    <Trophy className="inline w-6 h-6 mr-2 text-emerald-500" />
                                    Class Stats
                                </h3>
                                <div className="flex space-x-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/60 rounded-xl p-3 text-center">
                                    <div className="text-2xl font-bold text-emerald-600">{stats.presentCount}</div>
                                    <div className="text-sm text-gray-600">Present 🎉</div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-3 text-center">
                                    <div className="text-2xl font-bold text-blue-600">{students.length}</div>
                                    <div className="text-sm text-gray-600">Total 👥</div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-3 text-center">
                                    <div className="text-2xl font-bold text-purple-600">{stats.avgAttendance}%</div>
                                    <div className="text-sm text-gray-600">Rate 📈</div>
                                </div>
                                <div className="bg-white/60 rounded-xl p-3 text-center">
                                    <div className="text-2xl font-bold text-amber-600">{stats.medicalCount}</div>
                                    <div className="text-sm text-gray-600">Medical ❤️</div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border border-purple-100 p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">
                                <Zap className="inline w-6 h-6 mr-2 text-purple-500" />
                                Quick Actions
                            </h3>

                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    {attendanceOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => markAllAttendance(option.value)}
                                            disabled={isHoliday || loading}
                                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${isHoliday || loading
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : option.color
                                                }`}
                                        >
                                            <option.icon className="inline w-4 h-4 mr-1" />
                                            All {option.label}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={copyPreviousData}
                                    disabled={isHoliday || loading}
                                    className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${isHoliday || loading
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                        }`}
                                >
                                    <Copy className="inline w-4 h-4 mr-2" />
                                    ✨ Copy Previous Day
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Students Cards */}
                {selectedClass && selectedSubject && students.length > 0 && (
                    <div className="space-y-6">
                        {/* Section Header */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                📋 {classes.find(c => c._id === selectedClass)?.name || 'Class'} - {subjects.find(s => s._id === selectedSubject)?.name || 'Subject'}
                            </h2>
                            <p className="text-gray-600">Tap the buttons to mark attendance quickly!</p>
                        </div>

                        {/* Students Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                            {students.map((student, index) => {
                                const attendance = attendanceData[student._id];
                                const selectedOption = attendanceOptions.find(opt => opt.value === attendance);

                                return (
                                    <div
                                        key={student._id}
                                        className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${isHoliday || loading ? 'opacity-50 border-gray-200' :
                                            selectedOption ? selectedOption.activeColor : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                        onKeyDown={(e) => handleKeyPress(e, student._id)}
                                        tabIndex={0}
                                    >
                                        <div className="p-6">
                                            {/* Student Info */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${selectedOption ? selectedOption.color.split(' ')[0] : 'bg-gradient-to-r from-blue-400 to-purple-500'
                                                        }`}>
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">{student.name}</h3>
                                                        <p className="text-sm text-gray-500">{student.rollNo}</p>
                                                    </div>
                                                </div>

                                                {selectedOption && (
                                                    <div className="flex items-center space-x-2">
                                                        <selectedOption.icon className="w-5 h-5 text-current" />
                                                        <span className="text-sm font-medium">{selectedOption.label}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Attendance Buttons */}
                                            <div className="grid grid-cols-2 gap-2">
                                                {attendanceOptions.map(option => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleAttendanceChange(student._id, option.value)}
                                                        disabled={isHoliday || loading}
                                                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${isHoliday || loading
                                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                            : attendance === option.value
                                                                ? option.color + ' shadow-lg'
                                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                            }`}
                                                    >
                                                        <option.icon className="inline w-4 h-4 mr-1" />
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Keyboard Shortcut Hint */}
                                            <div className="mt-3 text-xs text-gray-400 text-center">
                                                Press {attendanceOptions.map(opt => opt.shortcut).join(', ')} for quick marking
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Marks Section Toggle */}


                        {/* Marks Section */}

                    </div>
                )}

                {/* Empty State */}
                {selectedClass && selectedSubject && students.length === 0 && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Students Found</h3>
                        <p className="text-gray-600">Looks like this class is empty. Add some students to get started!</p>
                    </div>
                )}
            </div>

            {/* Floating Save Button */}
            {selectedClass && selectedSubject && students.length > 0 && (
                <button
                    onClick={saveData}
                    disabled={isHoliday || loading}
                    className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 w-14 h-14 sm:w-auto sm:h-auto rounded-full flex items-center justify-center shadow-xl z-50 transition-transform duration-300 hover:scale-110
    ${isHoliday || loading
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : 'bg-gradient-to-br from-teal-400 to-blue-500 text-white'
                        }`}
                >
                    <Save className="w-6 h-6" />
                    {/* Optional text for desktop */}
                    <span className="hidden sm:inline ml-2 font-semibold">Save Magic!</span>
                </button>


            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-4 right-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl transform transition-all duration-500 z-50 animate-bounce">
                    <div className="flex items-center">
                        <CheckCircle className="w-6 h-6 mr-2" />
                        <span className="font-semibold">{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarksAttendance;