import React, { useState, useEffect } from 'react';
import {
    Edit, Save, Eye, CircleHelp, Upload, RefreshCw, TrendingUp,
    Gauge, PercentCircle, CheckCircle, Plus, FileSpreadsheet,
    Download, AlertCircle, Users, Award, Target, BookOpen
} from 'lucide-react';

const MarksManagementPage = () => {
    // State management
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [students, setStudents] = useState([]);
    const [bulkMode, setBulkMode] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [stats, setStats] = useState({
        average: 0,
        highest: 0,
        lowest: 0,
        gradeDistribution: {}
    });

    // Sample data
    const classes = [
        { id: '1', name: '5th Sem CSE' },
        { id: '2', name: '6th Sem CSE' },
        { id: '3', name: '7th Sem CSE' },
        { id: '4', name: '8th Sem CSE' }
    ];

    const subjects = {
        '1': ['Data Structures', 'Algorithms', 'Database Management', 'Operating Systems'],
        '2': ['Software Engineering', 'Computer Networks', 'Web Development', 'Mobile Development'],
        '3': ['Machine Learning', 'Artificial Intelligence', 'Cloud Computing', 'Cybersecurity'],
        '4': ['Project Management', 'Advanced Algorithms', 'Blockchain', 'IoT Systems']
    };

    // Initialize sample students
    useEffect(() => {
        if (selectedClass && selectedSubject) {
            const sampleStudents = [
                { id: 1, name: 'Alice Johnson', roll: 'CS001', ia1: 85, ia2: 88, final: 92, remarks: '' },
                { id: 2, name: 'Bob Smith', roll: 'CS002', ia1: 78, ia2: 82, final: 85, remarks: '' },
                { id: 3, name: 'Charlie Brown', roll: 'CS003', ia1: 92, ia2: 89, final: 94, remarks: '' },
                { id: 4, name: 'Diana Prince', roll: 'CS004', ia1: 88, ia2: 91, final: 89, remarks: '' },
                { id: 5, name: 'Edward Norton', roll: 'CS005', ia1: 76, ia2: 79, final: 81, remarks: '' },
                { id: 6, name: 'Fiona Davis', roll: 'CS006', ia1: 94, ia2: 92, final: 96, remarks: '' },
                { id: 7, name: 'George Wilson', roll: 'CS007', ia1: 82, ia2: 85, final: 87, remarks: '' },
                { id: 8, name: 'Hannah Miller', roll: 'CS008', ia1: 90, ia2: 88, final: 91, remarks: '' }
            ].map(student => ({
                ...student,
                total: calculateTotal(student.ia1, student.ia2, student.final),
                grade: calculateGrade(calculateTotal(student.ia1, student.ia2, student.final)),
                hasChanged: false
            }));

            setStudents(sampleStudents);
        }
    }, [selectedClass, selectedSubject]);

    // Calculate statistics
    useEffect(() => {
        if (students.length > 0) {
            const totals = students.map(s => s.total);
            const average = totals.reduce((a, b) => a + b, 0) / totals.length;
            const highest = Math.max(...totals);
            const lowest = Math.min(...totals);

            const gradeDistribution = students.reduce((acc, student) => {
                acc[student.grade] = (acc[student.grade] || 0) + 1;
                return acc;
            }, {});

            setStats({ average, highest, lowest, gradeDistribution });
        }
    }, [students]);

    // Responsive check
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper functions
    const calculateTotal = (ia1, ia2, final) => {
        const ia1Val = parseFloat(ia1) || 0;
        const ia2Val = parseFloat(ia2) || 0;
        const finalVal = parseFloat(final) || 0;
        return Math.round((ia1Val * 0.2 + ia2Val * 0.3 + finalVal * 0.5) * 100) / 100;
    };

    const calculateGrade = (total) => {
        if (total >= 90) return 'A+';
        if (total >= 80) return 'A';
        if (total >= 70) return 'B+';
        if (total >= 60) return 'B';
        if (total >= 50) return 'C';
        return 'F';
    };

    const updateStudentMark = (studentId, field, value) => {
        const numValue = parseFloat(value) || 0;
        if (numValue < 0 || numValue > 100) return;

        setStudents(prev => prev.map(student => {
            if (student.id === studentId) {
                const updated = { ...student, [field]: numValue, hasChanged: true };
                updated.total = calculateTotal(updated.ia1, updated.ia2, updated.final);
                updated.grade = calculateGrade(updated.total);
                return updated;
            }
            return student;
        }));
    };

    const updateRemarks = (studentId, remarks) => {
        setStudents(prev => prev.map(student =>
            student.id === studentId ? { ...student, remarks, hasChanged: true } : student
        ));
    };

    const saveStudent = (studentId) => {
        setStudents(prev => prev.map(student =>
            student.id === studentId ? { ...student, hasChanged: false } : student
        ));
    };

    const handleBulkAction = (action, value) => {
        if (selectedStudents.length === 0) return;

        setStudents(prev => prev.map(student => {
            if (selectedStudents.includes(student.id)) {
                const updated = { ...student, hasChanged: true };
                if (action === 'setIA1') updated.ia1 = value;
                if (action === 'setIA2') updated.ia2 = value;
                if (action === 'setFinal') updated.final = value;
                if (action === 'clear') {
                    updated.ia1 = 0;
                    updated.ia2 = 0;
                    updated.final = 0;
                }
                updated.total = calculateTotal(updated.ia1, updated.ia2, updated.final);
                updated.grade = calculateGrade(updated.total);
                return updated;
            }
            return student;
        }));
    };

    const toggleStudentSelection = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const selectAllStudents = () => {
        setSelectedStudents(students.map(s => s.id));
    };

    const clearSelection = () => {
        setSelectedStudents([]);
    };

    // Components
    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <Icon className={`w-8 h-8 ${color} opacity-80`} />
            </div>
        </div>
    );

    const UploadModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Marks</h3>
                <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Drop your Excel file here or click to browse</p>
                        <input type="file" className="hidden" accept=".xlsx,.xls,.csv" />
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        <Download className="w-5 h-5 inline mr-2" />
                        Download Sample Template
                    </button>
                </div>
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={() => setShowUploadModal(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );

    const SubmitModal = () => (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Submit All Marks</h3>
                    <p className="text-gray-600 mb-6">Are you sure you want to submit marks for all students? This action cannot be undone.</p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <div className="flex justify-between text-sm">
                            <span>Total Students:</span>
                            <span className="font-semibold">{students.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Changed Records:</span>
                            <span className="font-semibold text-orange-600">{students.filter(s => s.hasChanged).length}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowSubmitModal(false)}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setShowSubmitModal(false);
                                alert('Marks submitted successfully!');
                            }}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                        >
                            Submit All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const MobileStudentCard = ({ student }) => (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4 border border-white/20">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.roll}</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{student.total}</p>
                    <p className="text-sm text-gray-600">{student.grade}</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">IA1</label>
                    <input
                        type="number"
                        value={student.ia1}
                        onChange={(e) => updateStudentMark(student.id, 'ia1', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                        min="0"
                        max="100"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">IA2</label>
                    <input
                        type="number"
                        value={student.ia2}
                        onChange={(e) => updateStudentMark(student.id, 'ia2', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                        min="0"
                        max="100"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">Final</label>
                    <input
                        type="number"
                        value={student.final}
                        onChange={(e) => updateStudentMark(student.id, 'final', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                        min="0"
                        max="100"
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="block text-xs text-gray-600 mb-1">Remarks</label>
                <textarea
                    value={student.remarks}
                    onChange={(e) => updateRemarks(student.id, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none"
                    rows="2"
                    placeholder="Add remarks..."
                />
            </div>

            <div className="flex gap-2">
                {student.hasChanged && (
                    <button
                        onClick={() => saveStudent(student.id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                    >
                        <Save className="w-4 h-4 inline mr-1" />
                        Save
                    </button>
                )}
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300">
                    <Eye className="w-4 h-4 inline mr-1" />
                    History
                </button>
            </div>
        </div>
    );

    const FloatingActionButton = () => (
        <div className="fixed bottom-6 right-6 z-40">
            <div className="relative">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center">
                    <Plus className="w-6 h-6" />
                </button>
                <div className="absolute bottom-16 right-0 space-y-3 opacity-0 pointer-events-none transition-all duration-300">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300"
                    >
                        <Upload className="w-5 h-5 text-indigo-600" />
                    </button>
                    <button className="bg-white shadow-lg w-12 h-12 rounded-full flex items-center justify-center hover:shadow-xl transition-all duration-300">
                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 mb-8 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-2xl">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">Manage Student Marks</h1>
                                <p className="text-gray-600">Prof. Sarah Johnson • Academic Session 2024-25</p>
                            </div>
                        </div>
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                            <RefreshCw className="w-5 h-5 inline mr-2" />
                            Refresh
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none bg-white/80 backdrop-blur-sm"
                            >
                                <option value="">Choose a class...</option>
                                {classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none bg-white/80 backdrop-blur-sm"
                                disabled={!selectedClass}
                            >
                                <option value="">Choose a subject...</option>
                                {selectedClass && subjects[selectedClass]?.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {selectedClass && selectedSubject && (
                    <>
                        {/* Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <StatCard
                                title="Class Average"
                                value={`${stats.average.toFixed(1)}%`}
                                icon={TrendingUp}
                                color="text-blue-600"
                            />
                            <StatCard
                                title="Highest Score"
                                value={`${stats.highest}%`}
                                icon={Award}
                                color="text-green-600"
                            />
                            <StatCard
                                title="Lowest Score"
                                value={`${stats.lowest}%`}
                                icon={Target}
                                color="text-orange-600"
                            />
                            <StatCard
                                title="Total Students"
                                value={students.length}
                                icon={Users}
                                color="text-purple-600"
                            />
                        </div>

                        {/* Bulk Actions */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Bulk Actions</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={selectAllStudents}
                                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300"
                                    >
                                        Select All
                                    </button>
                                    <button
                                        onClick={clearSelection}
                                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-300 transition-colors"
                                    >
                                        Clear Selection
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <Upload className="w-4 h-4 inline mr-2" />
                                    Upload Excel
                                </button>
                                <button
                                    onClick={() => handleBulkAction('clear')}
                                    className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300"
                                    disabled={selectedStudents.length === 0}
                                >
                                    Clear Selected
                                </button>
                                <button
                                    onClick={() => setShowSubmitModal(true)}
                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <CheckCircle className="w-4 h-4 inline mr-2" />
                                    Submit All Marks
                                </button>
                            </div>
                        </div>

                        {/* Marks Table/Cards */}
                        {isMobile ? (
                            <div className="space-y-4">
                                {students.map(student => (
                                    <MobileStudentCard key={student.id} student={student} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => selectedStudents.length === students.length ? clearSelection() : selectAllStudents()}
                                                        checked={selectedStudents.length === students.length}
                                                        className="rounded"
                                                    />
                                                </th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Roll No.</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">IA1 (20%)</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">IA2 (30%)</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">Final (50%)</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">Total</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">Grade</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold">Remarks</th>
                                                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {students.map(student => (
                                                <tr key={student.id} className={`hover:bg-blue-50/50 transition-colors ${student.hasChanged ? 'bg-green-50/50' : ''}`}>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedStudents.includes(student.id)}
                                                            onChange={() => toggleStudentSelection(student.id)}
                                                            className="rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.roll}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-800">{student.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <input
                                                            type="number"
                                                            value={student.ia1}
                                                            onChange={(e) => updateStudentMark(student.id, 'ia1', e.target.value)}
                                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center text-sm focus:border-indigo-500 focus:outline-none"
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <input
                                                            type="number"
                                                            value={student.ia2}
                                                            onChange={(e) => updateStudentMark(student.id, 'ia2', e.target.value)}
                                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center text-sm focus:border-indigo-500 focus:outline-none"
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <input
                                                            type="number"
                                                            value={student.final}
                                                            onChange={(e) => updateStudentMark(student.id, 'final', e.target.value)}
                                                            className="w-20 p-2 border border-gray-300 rounded-lg text-center text-sm focus:border-indigo-500 focus:outline-none"
                                                            min="0"
                                                            max="100"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="text-lg font-bold text-indigo-600">{student.total}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${student.grade === 'A+' ? 'bg-green-100 text-green-800' :
                                                                student.grade === 'A' ? 'bg-blue-100 text-blue-800' :
                                                                    student.grade === 'B+' ? 'bg-yellow-100 text-yellow-800' :
                                                                        student.grade === 'B' ? 'bg-orange-100 text-orange-800' :
                                                                            student.grade === 'C' ? 'bg-red-100 text-red-800' :
                                                                                'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {student.grade}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <textarea
                                                            value={student.remarks}
                                                            onChange={(e) => updateRemarks(student.id, e.target.value)}
                                                            className="w-32 p-2 border border-gray-300 rounded-lg text-sm focus:border-indigo-500 focus:outline-none resize-none"
                                                            rows="2"
                                                            placeholder="Add remarks..."
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex gap-2 justify-center">
                                                            {student.hasChanged && (
                                                                <button
                                                                    onClick={() => saveStudent(student.id)}
                                                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300"
                                                                >
                                                                    <Save className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300">
                                                                <Eye className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Grade Distribution */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-8 border border-white/20">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Grade Distribution</h3>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                {Object.entries(stats.gradeDistribution).map(([grade, count]) => (
                                    <div key={grade} className="text-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mx-auto mb-2 ${grade === 'A+' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                                                grade === 'A' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                                                    grade === 'B+' ? 'bg-gradient-to-r from-yellow-500 to-amber-600' :
                                                        grade === 'B' ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                                                            grade === 'C' ? 'bg-gradient-to-r from-red-500 to-rose-600' :
                                                                'bg-gradient-to-r from-gray-500 to-slate-600'
                                            }`}>
                                            {grade}
                                        </div>
                                        <p className="text-sm text-gray-600">{count} students</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Motivational Card */}
                        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-2xl shadow-lg p-6 mt-8 text-white text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Every mark you enter shapes a future! ✨</h3>
                            <p className="text-white/90">Your dedication to fair and accurate assessment helps students grow and succeed. Keep up the excellent work!</p>
                        </div>
                    </>
                )}

                {/* Submit Button - Sticky on Mobile */}
                {selectedClass && selectedSubject && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none md:mt-8">
                        <button
                            onClick={() => setShowSubmitModal(true)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3"
                        >
                            <CheckCircle className="w-6 h-6" />
                            🚀 Submit All Marks
                        </button>
                    </div>
                )}

                {/* Mobile FAB */}
                {isMobile && selectedClass && selectedSubject && <FloatingActionButton />}
            </div>

            {/* Modals */}
            {showUploadModal && <UploadModal />}
            {showSubmitModal && <SubmitModal />}
        </div>
    );
};

export default MarksManagementPage;