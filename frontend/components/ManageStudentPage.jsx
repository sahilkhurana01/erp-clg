import React, { useState, useEffect, useMemo } from 'react';
import {
    Search,
    Target,
    Download,
    Users,
    TrendingUp,
    AlertTriangle,
    UserX,
    ChevronDown,
    MoreVertical,
    Eye,
    MessageSquare,
    UserMinus,
    Calendar,
    StickyNote,
    Plus,
    Filter,
    RefreshCw,
    BarChart3,
    Award,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    X,
    Tag,
    Star,
    Heart
} from 'lucide-react';

const ManageStudents = () => {
    // Sample data - in real app, this would come from props or API
    const [students, setStudents] = useState([
        {
            id: 1,
            rollNo: 'CSE001',
            name: 'Rahul Sharma',
            email: 'rahul.sharma@student.edu',
            attendance: 85.5,
            internalMarks: 78,
            gpa: 7.8,
            status: 'active',
            tags: ['Topper', 'Active'],
            notes: ['Good performance in programming', 'Participates actively in class'],
            subjects: ['Data Structures', 'Algorithms', 'Database Systems']
        },
        {
            id: 2,
            rollNo: 'CSE002',
            name: 'Priya Patel',
            email: 'priya.patel@student.edu',
            attendance: 72.3,
            internalMarks: 65,
            gpa: 6.5,
            status: 'active',
            tags: ['Low Attendance'],
            notes: ['Needs improvement in attendance'],
            subjects: ['Data Structures', 'Algorithms', 'Database Systems']
        },
        {
            id: 3,
            rollNo: 'CSE003',
            name: 'Arjun Kumar',
            email: 'arjun.kumar@student.edu',
            attendance: 92.1,
            internalMarks: 88,
            gpa: 8.7,
            status: 'active',
            tags: ['Topper', 'Leadership'],
            notes: ['Excellent student', 'Helps peers with studies'],
            subjects: ['Data Structures', 'Algorithms', 'Database Systems']
        },
        {
            id: 4,
            rollNo: 'CSE004',
            name: 'Sneha Gupta',
            email: 'sneha.gupta@student.edu',
            attendance: 68.9,
            internalMarks: 45,
            gpa: 4.5,
            status: 'active',
            tags: ['At Risk', 'Needs Support'],
            notes: ['Struggling with coursework', 'Recommended for tutoring'],
            subjects: ['Data Structures', 'Algorithms', 'Database Systems']
        },
        {
            id: 5,
            rollNo: 'CSE005',
            name: 'Vikram Singh',
            email: 'vikram.singh@student.edu',
            attendance: 79.4,
            internalMarks: 72,
            gpa: 7.2,
            status: 'active',
            tags: ['Improvement'],
            notes: ['Showing steady progress'],
            subjects: ['Data Structures', 'Algorithms', 'Database Systems']
        }
    ]);

    const [filteredStudents, setFilteredStudents] = useState(students);
    const [selectedClass, setSelectedClass] = useState('5th Semester CSE');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rollNo');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(10);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [showFAB, setShowFAB] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Available classes and subjects
    const classes = ['5th Semester CSE', '6th Semester CSE', '7th Semester CSE', '8th Semester CSE'];
    const subjects = {
        '5th Semester CSE': ['All Subjects', 'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems'],
        '6th Semester CSE': ['All Subjects', 'Software Engineering', 'Computer Networks', 'Machine Learning'],
        '7th Semester CSE': ['All Subjects', 'Distributed Systems', 'AI', 'Cybersecurity'],
        '8th Semester CSE': ['All Subjects', 'Project Work', 'Internship', 'Advanced Topics']
    };

    // Tag options
    const availableTags = [
        { name: 'Topper', color: 'bg-green-100 text-green-800' },
        { name: 'Active', color: 'bg-blue-100 text-blue-800' },
        { name: 'Low Attendance', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'At Risk', color: 'bg-red-100 text-red-800' },
        { name: 'Needs Support', color: 'bg-orange-100 text-orange-800' },
        { name: 'Improvement', color: 'bg-purple-100 text-purple-800' },
        { name: 'Leadership', color: 'bg-indigo-100 text-indigo-800' }
    ];

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Performance stats
    const performanceStats = useMemo(() => {
        const totalStudents = filteredStudents.length;
        const avgAttendance = filteredStudents.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
        const avgGPA = filteredStudents.reduce((sum, student) => sum + student.gpa, 0) / totalStudents;
        const atRiskCount = filteredStudents.filter(student => student.attendance < 75 || student.gpa < 6.0).length;
        const failingCount = filteredStudents.filter(student => student.gpa < 4.0).length;

        return {
            avgAttendance: avgAttendance.toFixed(1),
            avgGPA: avgGPA.toFixed(1),
            atRiskCount,
            failingCount
        };
    }, [filteredStudents]);

    // Filter and sort students
    useEffect(() => {
        let filtered = [...students];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(student =>
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply subject filter
        if (selectedSubject !== 'All Subjects') {
            filtered = filtered.filter(student =>
                student.subjects.includes(selectedSubject)
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredStudents(filtered);
        setCurrentPage(1);
    }, [students, searchQuery, selectedSubject, sortBy, sortOrder]);

    // Pagination
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleNoteSubmit = () => {
        if (newNote.trim() && currentStudent) {
            setStudents(prev => prev.map(student =>
                student.id === currentStudent.id
                    ? { ...student, notes: [...student.notes, newNote.trim()] }
                    : student
            ));
            setNewNote('');
            setShowNoteModal(false);
        }
    };

    const exportStudentList = () => {
        const csvContent = [
            ['Roll No', 'Name', 'Email', 'Attendance %', 'Internal Marks', 'GPA', 'Tags'],
            ...filteredStudents.map(student => [
                student.rollNo,
                student.name,
                student.email,
                student.attendance,
                student.internalMarks,
                student.gpa,
                student.tags.join('; ')
            ])
        ];

        const csvString = csvContent.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedClass}_${selectedSubject}_students.csv`;
        a.click();
    };

    const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
        <div
            className={`p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${color}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
                <Icon className="w-8 h-8 text-gray-700" />
            </div>
        </div>
    );

    const ActionDropdown = ({ student, onAction }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <MoreVertical className="w-4 h-4" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                        <div className="py-1">
                            <button
                                onClick={() => { onAction('view', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                            </button>
                            <button
                                onClick={() => { onAction('message', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Send Message
                            </button>
                            <button
                                onClick={() => { onAction('attendance', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                View Attendance
                            </button>
                            <button
                                onClick={() => { onAction('note', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <StickyNote className="w-4 h-4 mr-2" />
                                Add Note
                            </button>
                            <button
                                onClick={() => { onAction('analytics', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <BarChart3 className="w-4 h-4 mr-2" />
                                View Analytics
                            </button>
                            <button
                                onClick={() => { onAction('inactive', student); setIsOpen(false); }}
                                className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                            >
                                <UserMinus className="w-4 h-4 mr-2" />
                                Mark as Inactive
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const handleAction = (action, student) => {
        setCurrentStudent(student);
        switch (action) {
            case 'note':
                setShowNoteModal(true);
                break;
            case 'analytics':
                setShowAnalyticsModal(true);
                break;
            case 'view':
                alert(`Viewing profile for ${student.name}`);
                break;
            case 'message':
                alert(`Sending message to ${student.name}`);
                break;
            case 'attendance':
                alert(`Viewing attendance for ${student.name}`);
                break;
            case 'inactive':
                if (confirm(`Mark ${student.name} as inactive?`)) {
                    setStudents(prev => prev.map(s =>
                        s.id === student.id ? { ...s, status: 'inactive' } : s
                    ));
                }
                break;
        }
    };

    const getTagColor = (tagName) => {
        const tag = availableTags.find(t => t.name === tagName);
        return tag ? tag.color : 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <Target className="w-8 h-8 text-indigo-600" />
                            <h1 className="text-2xl font-bold text-gray-900">Manage Students in Your Class</h1>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => window.location.reload()}
                                className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                            <button
                                onClick={exportStudentList}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <Download className="w-4 h-4" />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                            <select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {classes.map(cls => (
                                    <option key={cls} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                {subjects[selectedClass]?.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, roll no, or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard
                        title="Avg Attendance"
                        value={`${performanceStats.avgAttendance}%`}
                        icon={Calendar}
                        color="bg-blue-100"
                        onClick={() => console.log('Filter by attendance')}
                    />
                    <StatCard
                        title="Avg GPA"
                        value={performanceStats.avgGPA}
                        icon={Award}
                        color="bg-green-100"
                        onClick={() => console.log('Filter by GPA')}
                    />
                    <StatCard
                        title="At-Risk Students"
                        value={performanceStats.atRiskCount}
                        icon={AlertTriangle}
                        color="bg-yellow-100"
                        onClick={() => console.log('Filter at-risk students')}
                    />
                    <StatCard
                        title="Failing Students"
                        value={performanceStats.failingCount}
                        icon={UserX}
                        color="bg-red-100"
                        onClick={() => console.log('Filter failing students')}
                    />
                </div>

                {/* Student Table */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('rollNo')}
                                    >
                                        Roll No {sortBy === 'rollNo' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('name')}
                                    >
                                        Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('attendance')}
                                    >
                                        Attendance % {sortBy === 'attendance' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('internalMarks')}
                                    >
                                        Internal Marks {sortBy === 'internalMarks' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th
                                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort('gpa')}
                                    >
                                        GPA {sortBy === 'gpa' && (sortOrder === 'asc' ? '↑' : '↓')}
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tags
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {student.rollNo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                                    <div className="text-sm text-gray-500">{student.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-sm text-gray-900">{student.attendance}%</div>
                                                <div className={`ml-2 w-2 h-2 rounded-full ${student.attendance >= 75 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {student.internalMarks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${student.gpa >= 7 ? 'bg-green-100 text-green-800' :
                                                        student.gpa >= 5 ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}
                                                onClick={() => handleAction('analytics', student)}
                                            >
                                                {student.gpa}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-wrap gap-1">
                                                {student.tags.map((tag, index) => (
                                                    <span key={index} className={`px-2 py-1 text-xs rounded-full ${getTagColor(tag)}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <ActionDropdown student={student} onAction={handleAction} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{indexOfFirstStudent + 1}</span> to{' '}
                                    <span className="font-medium">{Math.min(indexOfLastStudent, filteredStudents.length)}</span> of{' '}
                                    <span className="font-medium">{filteredStudents.length}</span> results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === i + 1
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button for Mobile */}
                {isMobile && (
                    <div className="fixed bottom-20 right-6 z-50">
                        <div className="relative">
                            <button
                                onClick={() => setShowFAB(!showFAB)}
                                className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                            >
                                <Plus className={`w-6 h-6 transition-transform ${showFAB ? 'rotate-45' : ''}`} />
                            </button>

                            {showFAB && (
                                <div className="absolute bottom-16 right-0 space-y-2">
                                    <button
                                        onClick={() => {
                                            setShowFAB(false);
                                            document.querySelector('input[placeholder*="Search"]').focus();
                                        }}
                                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm"
                                    >
                                        <Search className="w-4 h-4" />
                                        <span>Search</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowFAB(false);
                                            exportStudentList();
                                        }}
                                        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span>Export</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Note Modal */}
                {showNoteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Add Note for {currentStudent?.name}</h3>
                                    <button
                                        onClick={() => setShowNoteModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Previous Notes */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Notes:</h4>
                                    <div className="space-y-2 max-h-32 overflow-y-auto">
                                        {currentStudent?.notes.map((note, index) => (
                                            <div key={index} className="bg-gray-50 p-2 rounded-lg text-sm text-gray-700">
                                                {note}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* New Note */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Note:</label>
                                    <textarea
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        rows="3"
                                        placeholder="Enter your note here..."
                                    />
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        onClick={handleNoteSubmit}
                                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Add Note
                                    </button>
                                    <button
                                        onClick={() => setShowNoteModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Analytics Modal */}
                {showAnalyticsModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Analytics for {currentStudent?.name}</h3>
                                    <button
                                        onClick={() => setShowAnalyticsModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Student Info Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-blue-600">Attendance</p>
                                                <p className="text-2xl font-bold text-blue-800">{currentStudent?.attendance}%</p>
                                            </div>
                                            <Calendar className="w-8 h-8 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-green-600">Current GPA</p>
                                                <p className="text-2xl font-bold text-green-800">{currentStudent?.gpa}</p>
                                            </div>
                                            <Award className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-purple-600">Internal Marks</p>
                                                <p className="text-2xl font-bold text-purple-800">{currentStudent?.internalMarks}</p>
                                            </div>
                                            <BookOpen className="w-8 h-8 text-purple-600" />
                                        </div>
                                    </div>
                                </div>

                                {/* Performance Trend */}
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h4>
                                    <div className="h-32 bg-white rounded-lg flex items-center justify-center">
                                        <div className="text-center text-gray-500">
                                            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                                            <p>Performance chart would be displayed here</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Subject-wise Performance */}
                                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
                                    <div className="space-y-3">
                                        {currentStudent?.subjects.map((subject, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                                <span className="font-medium text-gray-900">{subject}</span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-indigo-600 h-2 rounded-full"
                                                            style={{ width: `${Math.random() * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600">{(Math.random() * 10).toFixed(1)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Notes */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Notes</h4>
                                    <div className="space-y-2">
                                        {currentStudent?.notes.slice(-3).map((note, index) => (
                                            <div key={index} className="bg-white p-3 rounded-lg text-sm text-gray-700">
                                                {note}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Motivational Section */}
                <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
                    <div className="text-center">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-pink-200" />
                        <h3 className="text-2xl font-bold mb-2">Helping students grow, one step at a time 💡</h3>
                        <p className="text-indigo-100 text-lg">
                            Your dedication to student success makes a real difference. Every note, every moment of guidance,
                            and every effort to understand your students better contributes to their growth and future success.
                        </p>
                        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-indigo-200">
                            <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{filteredStudents.length} students under your guidance</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>Making education meaningful</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;