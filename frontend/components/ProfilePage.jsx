import React, { useState } from 'react';
import {
    User, Mail, Calendar, GraduationCap, MapPin, Edit3, Upload, Download,
    FileText, Shield, CheckCircle, Clock, AlertTriangle, Eye, EyeOff,
    MessageSquare, Star, Users, BookOpen, ClipboardList, TrendingUp,
    Phone, Award, Building, Plus, X, ChevronDown, ChevronRight,
    Lock, Smartphone, Globe, Chrome, Monitor, Lightbulb, Send,
    Camera, Menu, Settings, Key, Folder
} from 'lucide-react';

const ProfilePage = () => {
    // Sample data - in real app, this would come from props/API
    const [teacher, setTeacher] = useState({
        name: "Dr. Sarah Mitchell",
        email: "sarah.mitchell@school.edu",
        avatar: "/api/placeholder/120/120",
        subjects: ["Mathematics", "Statistics"],
        department: "Mathematics Department",
        joiningDate: "2019-08-15",
        specialization: "Advanced Calculus & Statistics",
        phone: "+1 (555) 123-4567",
        qualification: "Ph.D. in Mathematics",
        employeeId: "TCH-2019-001"
    });

    const [stats] = useState({
        totalClasses: 12,
        subjectsHandled: 3,
        attendanceThisMonth: 28,
        assignmentsGiven: 15,
        feedbacksPosted: 42
    });

    const [documents] = useState([
        { id: 1, name: "Resume_CV.pdf", type: "CV", status: "Verified", uploadDate: "2024-01-15" },
        { id: 2, name: "Masters_Degree.pdf", type: "Degree", status: "Verified", uploadDate: "2024-01-10" },
        { id: 3, name: "ID_Proof.pdf", type: "ID", status: "Pending", uploadDate: "2024-01-20" },
        { id: 4, name: "Experience_Letter.pdf", type: "Experience", status: "Verified", uploadDate: "2024-01-05" },
        { id: 5, name: "Appointment_Letter.pdf", type: "Appointment", status: "Verified", uploadDate: "2024-01-01" }
    ]);

    const [loginHistory] = useState([
        { id: 1, date: "2024-07-11", time: "09:15 AM", device: "Chrome on Windows", location: "New York, NY", suspicious: false },
        { id: 2, date: "2024-07-10", time: "08:30 AM", device: "Chrome on Windows", location: "New York, NY", suspicious: false },
        { id: 3, date: "2024-07-09", time: "07:45 AM", device: "Safari on iPhone", location: "New York, NY", suspicious: false },
        { id: 4, date: "2024-07-08", time: "09:00 AM", device: "Chrome on Windows", location: "New York, NY", suspicious: false },
        { id: 5, date: "2024-07-07", time: "11:30 PM", device: "Chrome on Linux", location: "Unknown", suspicious: true }
    ]);

    // State management
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showFAB, setShowFAB] = useState(false);
    const [expandedSections, setExpandedSections] = useState({});
    const [showPassword, setShowPassword] = useState({});
    const [enable2FA, setEnable2FA] = useState(false);

    // Form states
    const [editForm, setEditForm] = useState({
        name: teacher.name,
        phone: teacher.phone,
        qualification: teacher.qualification,
        specialization: teacher.specialization
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [feedbackForm, setFeedbackForm] = useState({
        category: 'suggestion',
        message: ''
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleEditProfile = () => {
        setTeacher(prev => ({
            ...prev,
            ...editForm
        }));
        setShowEditProfileModal(false);
    };

    const handlePasswordChange = () => {
        // Password change logic here
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    const handleFeedbackSubmit = () => {
        // Feedback submission logic here
        setShowFeedbackModal(false);
        setFeedbackForm({ category: 'suggestion', message: '' });
    };

    const getDeviceIcon = (device) => {
        if (device.includes('iPhone') || device.includes('Android')) return <Smartphone className="w-4 h-4" />;
        if (device.includes('Chrome')) return <Chrome className="w-4 h-4" />;
        return <Monitor className="w-4 h-4" />;
    };

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-gray-700" />
                </div>
            </div>
        </div>
    );

    const DocumentCard = ({ doc }) => (
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-800">{doc.type}</h4>
                        <p className="text-sm text-gray-600">{doc.name}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {doc.status === 'Verified' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                        <Clock className="w-5 h-5 text-orange-500" />
                    )}
                    <span className={`text-xs px-2 py-1 rounded-full ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                        {doc.status}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</p>
                <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-800 transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                    <button className="text-orange-600 hover:text-orange-800 transition-colors">
                        <Upload className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
            {/* Header */}
            <div className="bg-white/70 backdrop-blur-sm shadow-lg sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-3 rounded-full">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Teacher Profile</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile Overview Header */}
                <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 p-1">
                                <img
                                    src={teacher.avatar}
                                    alt={teacher.name}
                                    className="w-full h-full rounded-full object-cover bg-white"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                                <Camera className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                                <h2 className="text-3xl font-bold text-gray-800">{teacher.name}</h2>
                                <div className="bg-blue-100 px-3 py-1 rounded-full">
                                    <span className="text-blue-700 text-sm font-medium">📘 {teacher.employeeId}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">{teacher.email}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">{teacher.phone}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <Building className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">{teacher.department}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start space-x-2">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700">Since {new Date(teacher.joiningDate).getFullYear()}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                                <Award className="w-5 h-5 text-gray-500" />
                                <span className="text-gray-700">{teacher.specialization}</span>
                            </div>

                            <button
                                onClick={() => setShowEditProfileModal(true)}
                                className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-violet-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                            >
                                <Edit3 className="w-5 h-5" />
                                <span>Edit Profile</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Professional Stats */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <TrendingUp className="w-7 h-7 text-blue-600" />
                        <span>Professional Stats</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <StatCard
                            title="Classes Handled"
                            value={stats.totalClasses}
                            icon={Users}
                            color="from-green-50 to-emerald-50"
                        />
                        <StatCard
                            title="Subjects Taught"
                            value={stats.subjectsHandled}
                            icon={BookOpen}
                            color="from-orange-50 to-red-50"
                        />
                        <StatCard
                            title="Attendance (Month)"
                            value={stats.attendanceThisMonth}
                            icon={ClipboardList}
                            color="from-purple-50 to-pink-50"
                        />
                        <StatCard
                            title="Assignments Posted"
                            value={stats.assignmentsGiven}
                            icon={FileText}
                            color="from-yellow-50 to-orange-50"
                        />
                        <StatCard
                            title="Feedbacks Given"
                            value={stats.feedbacksPosted}
                            icon={MessageSquare}
                            color="from-cyan-50 to-blue-50"
                        />
                    </div>
                </div>

                {/* Document Vault */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                            <Folder className="w-7 h-7 text-blue-600" />
                            <span>Document Vault</span>
                        </h3>
                        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2">
                            <Plus className="w-5 h-5" />
                            <span>Upload New</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documents.map(doc => (
                            <DocumentCard key={doc.id} doc={doc} />
                        ))}
                    </div>
                </div>

                {/* Login Activity Timeline */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <Clock className="w-7 h-7 text-blue-600" />
                        <span>Login Activity</span>
                    </h3>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <div className="space-y-4">
                            {loginHistory.map(login => (
                                <div key={login.id} className="flex items-center space-x-4 p-4 hover:bg-white/50 rounded-xl transition-all duration-300">
                                    <div className="flex-shrink-0">
                                        {getDeviceIcon(login.device)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-gray-800">{login.date} at {login.time}</p>
                                                <p className="text-sm text-gray-600">{login.device}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-500">{login.location}</span>
                                                {login.suspicious && (
                                                    <AlertTriangle className="w-5 h-5 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Password & Security */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <Shield className="w-7 h-7 text-blue-600" />
                        <span>Security Settings</span>
                    </h3>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-800">Password</h4>
                                    <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                                </div>
                                <button
                                    onClick={() => setShowPasswordModal(true)}
                                    className="bg-gradient-to-r from-blue-500 to-violet-500 text-white px-4 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-violet-600 transition-all duration-300 flex items-center space-x-2"
                                >
                                    <Key className="w-4 h-4" />
                                    <span>Change Password</span>
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                                <button
                                    onClick={() => setEnable2FA(!enable2FA)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enable2FA ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enable2FA ? 'translate-x-6' : 'translate-x-1'
                                        }`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <MessageSquare className="w-7 h-7 text-blue-600" />
                        <span>Your Voice Matters</span>
                    </h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl">
                        <p className="text-gray-700 mb-4">Share your thoughts, suggestions, or report any issues. Your feedback helps us improve the platform.</p>
                        <button
                            onClick={() => setShowFeedbackModal(true)}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center space-x-2"
                        >
                            <Send className="w-5 h-5" />
                            <span>Share Feedback</span>
                        </button>
                    </div>
                </div>

                {/* Tips & Insights */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="bg-yellow-100 p-2 rounded-lg">
                                <Lightbulb className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">💡 Pro Tip</h3>
                        </div>
                        <p className="text-gray-700">Keep your profile updated with latest qualifications and achievements. This helps maintain your verification status and showcases your professional growth!</p>
                    </div>
                </div>
            </div>

            {/* Floating Action Button (Mobile) */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <button
                    onClick={() => setShowFAB(!showFAB)}
                    className="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {showFAB && (
                    <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 w-48">
                        <div className="space-y-3">
                            <button
                                onClick={() => { setShowEditProfileModal(true); setShowFAB(false); }}
                                className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <Edit3 className="w-5 h-5 text-gray-600" />
                                <span>Edit Profile</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-xl transition-colors">
                                <Upload className="w-5 h-5 text-gray-600" />
                                <span>Upload Document</span>
                            </button>
                            <button
                                onClick={() => { setShowPasswordModal(true); setShowFAB(false); }}
                                className="w-full flex items-center space-x-3 text-left p-3 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <Lock className="w-5 h-5 text-gray-600" />
                                <span>Change Password</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Profile Modal */}
            {showEditProfileModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
                            <button
                                onClick={() => setShowEditProfileModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                                <input
                                    type="text"
                                    value={editForm.qualification}
                                    onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                                <input
                                    type="text"
                                    value={editForm.specialization}
                                    onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowEditProfileModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditProfile}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-violet-600 transition-all duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Change Password</h3>
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword.current ? "text" : "password"}
                                        value={passwordForm.currentPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword.new ? "text" : "password"}
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword.confirm ? "text" : "password"}
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowPasswordModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-violet-600 transition-all duration-300"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">Share Your Feedback</h3>
                            <button
                                onClick={() => setShowFeedbackModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={feedbackForm.category}
                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                                >
                                    <option value="suggestion">Suggestion</option>
                                    <option value="complaint">Complaint</option>
                                    <option value="feature">Feature Request</option>
                                    <option value="bug">Bug Report</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    value={feedbackForm.message}
                                    onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                                    placeholder="Share your thoughts, suggestions, or report any issues..."
                                />
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowFeedbackModal(false)}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFeedbackSubmit}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Feedback</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;