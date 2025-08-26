import React, { useState, useEffect } from "react";
import useAuthStore from "../../../../store/authStore";
import BottomNav from "../components/BottomNav";
import { NavLink, useNavigate } from "react-router-dom";
import { studentsAPI, attendanceAPI, resultsAPI } from "../../../../api";
import {
    ChevronRight,
    User,
    CreditCard,
    Bell,
    Languages,
    Eye,
    LogOut,
    ImagePlus,
    ArrowLeft,
    GraduationCap,
    Mail,
    BadgeCheck,
    School,
    Trophy,
    BookOpen,
    Star,
    Award,
    Users,
    Target,
    Coffee,
    MapPin,
    Phone,
    Globe,
    Settings,
    Activity,
    TrendingUp,
    Heart,
    MessageCircle,
    Share2,
    Download,
    Edit3,
    Camera,
    Sparkles,
    Flame,
    Medal,
    Crown,
    Gift,
    Clock,
    BarChart3,
    PieChart,
    Bookmark,
    ThumbsUp,
    Volume2,
    VolumeX,
    Palette,
    Shield,
    HelpCircle,
    FileText,
    Briefcase,
    Music,
    Gamepad2,
    Video,
    Mic,
    Headphones,
    MessageSquare,
    Send,
    Plus,
    Minus,
    RefreshCw,
    Filter,
    Search,
    Home,
    Compass,
    Calendar,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Link,
    Copy,
    Facebook,
    Twitter,
    Instagram,
    Github,
    Linkedin,
    Youtube,
    Twitch
} from "lucide-react";

const profileOptions = [
    { label: "Edit Profile", icon: User, description: "Personalize your profile", to: "/editprofile" },
    { label: "Payment & Fees", icon: CreditCard, description: "Manage payments & scholarships", to: "/payroll" },
    { label: "Notifications", icon: Bell, description: "Stay updated with alerts", to: "/notifications" },
    { label: "Language", icon: Languages, extra: "English (US)", description: "Choose your preferred language", to: "/language" },
    { label: "Dark Mode", icon: Eye, description: "Toggle theme preference", isToggle: true },
    { label: "Logout", icon: LogOut, description: "Sign out of your account", isAction: true },
];

const achievements = [
    { title: "Dean's List", icon: Trophy, color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Coding Champion", icon: Crown, color: "text-purple-600", bgColor: "bg-purple-100" },
    { title: "Team Leader", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Perfect Attendance", icon: Award, color: "text-green-600", bgColor: "bg-green-600" },
];

const ProfilePage = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [resultsData, setResultsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
    const [showAchievements, setShowAchievements] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [currentPage, setCurrentPage] = useState('profile');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user.id) {
                    const student = await studentsAPI.getById(user.id);
                    setStudentData(student);
                    
                    // Fetch attendance data
                    const now = new Date();
                    const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
                    const endDate = now.toISOString().split('T')[0];
                    const attendance = await attendanceAPI.getStudentAttendance(user.id, startDate, endDate);
                    setAttendanceData(attendance.data || []);
                    
                    // Fetch results data
                    const results = await resultsAPI.getByStudent(user.id);
                    setResultsData(results.data || []);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const calculateAttendanceStats = () => {
        if (!attendanceData.length) return { present: 0, total: 0, percentage: 0 };
        
        const present = attendanceData.filter(a => a.status === 'present').length;
        const total = attendanceData.length;
        const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
        
        return { present, total, percentage };
    };

    const calculatePerformanceStats = () => {
        if (!resultsData.length) return { average: 0, highest: 0, subjects: 0 };
        
        const scores = resultsData.map(r => r.score || 0);
        const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        const highest = Math.max(...scores, 0);
        const subjects = resultsData.length;
        
        return { average, highest, subjects };
    };

    const attendanceStats = calculateAttendanceStats();
    const performanceStats = calculatePerformanceStats();

    const stats = [
        { label: "GPA", value: performanceStats.average > 0 ? (performanceStats.average / 10).toFixed(1) : "N/A", icon: Target, color: "text-emerald-600" },
        { label: "Attendance", value: `${attendanceStats.percentage}%`, icon: TrendingUp, color: "text-blue-600" },
        { label: "Subjects", value: performanceStats.subjects.toString(), icon: BookOpen, color: "text-purple-600" },
        { label: "Highest Score", value: performanceStats.highest.toString(), icon: Award, color: "text-orange-600" },
    ];

    const quickActions = [
        { label: "Edit Profile", icon: Edit3, color: "bg-blue-500" },
        { label: "Share Profile", icon: Share2, color: "bg-green-500" },
        { label: "Download Resume", icon: Download, color: "bg-purple-500" },
        { label: "Settings", icon: Settings, color: "bg-orange-500" },
    ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleOptionClick = async (option) => {
        if (option.label === "Dark Mode") {
            setIsDarkMode(!isDarkMode);
        } else if (option.label === "Notifications") {
            setIsNotificationEnabled(!isNotificationEnabled);
        } else if (option.label === "Edit Profile") {
            setCurrentPage('edit-profile');
        } else if (option.label === "Logout") {
            const { logout } = useAuthStore.getState();
            try {
                await logout();
            } finally {
                navigate('/student');
            }
        }
    };

    const handleNavigation = (page) => {
        setCurrentPage(page);
    };

    const renderProfileOption = (option, idx, isMobile = false) => {
        const { label, icon: Icon, extra, description, to, isToggle, isAction } = option;

        const Content = (
            <div className="flex justify-between w-full group">
                <div className="flex gap-3 items-start w-full">
                    {/* Icon Box */}
                    <div className={`p-${isMobile ? '2' : '3'} rounded-lg shrink-0 ${isDarkMode ? 'bg-gray-700' : isMobile ? 'bg-blue-50' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-${isMobile ? '4' : '5'} w-${isMobile ? '4' : '5'} ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>

                    {/* Text Info */}
                    <div className="flex-1 text-left">
                        <span className={`${isDarkMode ? 'text-white' : isMobile ? 'text-gray-900' : 'text-blue-900'} text-${isMobile ? 'sm' : 'base'} font-${isMobile ? 'medium' : 'semibold'} block`}>
                            {label}
                        </span>
                        {description && (
                            <p className={`text-${isMobile ? 'xs' : 'sm'} mt-${isMobile ? '0.5' : '1'} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Extra Info (Right side) */}
                <div className="flex items-center gap-2 ml-2">
                    {extra && (
                        <span className={`text-blue-600 text-${isMobile ? 'xs' : 'sm'} font-medium ${isMobile ? '' : 'bg-blue-50 px-3 py-1 rounded-full'} whitespace-nowrap`}>
                            {extra}
                        </span>
                    )}
                    {label === "Dark Mode" && (
                        <div className={`w-${isMobile ? '10' : '12'} h-${isMobile ? '5' : '6'} rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
                            <div className={`absolute top-0.5 left-0.5 w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'} rounded-full bg-white transition-transform ${isDarkMode ? `translate-x-${isMobile ? '5' : '6'}` : ''}`}></div>
                        </div>
                    )}
                    <ChevronRight className={`w-${isMobile ? '4' : '5'} h-${isMobile ? '4' : '5'} text-gray-400 ${!isMobile ? 'group-hover:text-blue-600 transition-colors' : ''}`} />
                </div>
            </div>
        );

        // Handle different types of options
        if (isAction) {
            return (
                <button
                    key={idx}
                    onClick={() => handleOptionClick(option)}
                    className={`w-full ${isMobile ? 'p-3' : 'p-4'} rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                        isDarkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                    } border shadow-sm hover:shadow-md`}
                >
                    {Content}
                </button>
            );
        }

        if (to) {
            return (
                <NavLink
                    key={idx}
                    to={to}
                    className={({ isActive }) =>
                        `w-full ${isMobile ? 'p-3' : 'p-4'} rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                            isActive
                                ? isDarkMode 
                                    ? 'bg-blue-600 text-white border-blue-500' 
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                : isDarkMode 
                                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                                    : 'bg-white hover:bg-gray-50 border-gray-200'
                        } border shadow-sm hover:shadow-md`
                    }
                >
                    {Content}
                </NavLink>
            );
        }

        return (
            <div
                key={idx}
                className={`w-full ${isMobile ? 'p-3' : 'p-4'} rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                    isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 border-gray-600' 
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                } border shadow-sm hover:shadow-md`}
            >
                {Content}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <>
            <div className={`min-h-screen sm:mb-5 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} px-4 md:px-10 py-6 md:py-10`}>
                {/* Floating Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
                    <div className="absolute bottom-32 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-25 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-12 h-12 bg-pink-200 rounded-full opacity-30 animate-bounce"></div>
                </div>

                {/* Mobile View */}
                <div className="mb-6 md:hidden max-w-md mx-auto relative z-10 pb-15">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-blue-600 font-semibold mb-6 gap-2 hover:text-blue-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back
                    </button>

                    {/* Profile Card */}
                    <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} pt-6 pb-6 px-4 sm:px-6 rounded-3xl shadow-xl border backdrop-blur-sm`}>
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-28 h-28 mx-auto rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl -mt-16">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <div className="text-center">
                                        <Camera className="h-7 w-10 text-white mb-1" />
                                        <span className="text-xs text-white font-medium">Upload</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Info */}
                        <div className="text-center mt-4 mb-6">
                            <h3 className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                                {studentData?.name || 'Student Name'}
                                <Sparkles className="inline-block ml-2 h-5 w-5 text-yellow-500" />
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                                {studentData?.classId || 'Class'} • Roll: {studentData?.rollNo || 'N/A'}
                            </p>
                            <div className="flex justify-center items-center gap-2 text-xs text-blue-600 font-medium">
                                <MapPin className="h-3 w-3" />
                                <span>{studentData?.section || 'Section'}</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {stats.map((stat, idx) => (
                                <div key={idx} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-3 text-center hover:scale-105 transition-transform`}>
                                    <stat.icon className={`h-4 w-4 ${stat.color} mx-auto mb-1`} />
                                    <div className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Profile Options */}
                        <div className="space-y-2">
                            {profileOptions.map((option, idx) => renderProfileOption(option, idx, true))}
                        </div>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex gap-8 max-w-7xl mx-auto relative z-10">
                    {/* Left Panel */}
                    <div className={`w-1/3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-100 via-white to-indigo-100 border-blue-100'} rounded-2xl shadow-2xl p-8 border backdrop-blur-sm`}>
                        <div className="flex flex-col items-center">
                            {/* Profile Picture */}
                            <div className="relative mb-6">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {profileImage ? (
                                        <img src={profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <Camera className="h-8 w-8 text-white mb-1" />
                                            <span className="text-sm text-white font-medium">Upload</span>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="text-center mb-">
                                <h3 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2 flex items-center justify-center gap-2`}>
                                    {studentData?.name || 'Student Name'}
                                    <Sparkles className="h-6 w-6 text-yellow-500" />
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                                    {studentData?.classId || 'Class'} • {studentData?.section || 'Section'}
                                </p>
                                <div className="flex justify-center items-center gap-2 text-sm text-blue-600 font-medium mb-4">
                                    <MapPin className="h-4 w-4" />
                                    <span>{studentData?.rollNo || 'Roll Number'}</span>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 gap-2 w-full mb-3">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl p-2 text-center hover:scale-105 transition-transform shadow-sm`}>
                                        <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                                        <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Detailed Info */}
                            <div className={`w-full ${isDarkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl p-6 shadow-sm space-y-4`}>
                                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center gap-2`}>
                                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                                    Academic Details
                                </h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <BadgeCheck className="h-4 w-4 text-blue-500" />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            <strong>Roll No:</strong> {studentData?.rollNo || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <GraduationCap className="h-4 w-4 text-green-500" />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            <strong>Course:</strong> {studentData?.classId || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <School className="h-4 w-4 text-purple-500" />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            <strong>Section:</strong> {studentData?.section || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-4 w-4 text-red-500" />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                                            <strong>Email:</strong> {studentData?.email || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className={`w-2/3 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-2xl border backdrop-blur-sm`}>
                        <div className="mb-8">
                            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-700'} mb-2 flex items-center gap-3`}>
                                Welcome Back, {studentData?.name?.split(' ')[0] || 'Student'}!
                                <div className="animate-bounce">👋</div>
                            </h2>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Manage your profile settings and preferences here. Keep your account secure and up-to-date.
                            </p>
                        </div>

                        {/* Profile Options Grid */}
                        <div className="grid grid-cols-1 gap-7.5">
                            {profileOptions.map((option, idx) => renderProfileOption(option, idx, false))}
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </>
    );
};

export default ProfilePage;