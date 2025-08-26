import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ChevronDown,
    Menu,
    GraduationCap,
    BookOpen,
    Calendar,
    TrendingUp,
    Award,
    Target,
    Zap,
    Star,
    Trophy,
    BarChart3,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Sparkles
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { studentsAPI, resultsAPI, subjectsAPI } from "../../../../api";


const subjectsBySemester = {
    "Sem-1": ["Mathematics", "Physics", "Basic Electrical", "Environmental Science"],
    "Sem-2": ["Data Structures", "Digital Electronics", "OOP in C++", "Discrete Math"],
    "Sem-3": ["Operating Systems", "Computer Architecture", "Database Systems", "Design & Analysis"],
    "Sem-4": ["Artificial Intelligence", "Machine Learning", "Computer Networks", "Web Technologies"],
};

const testData = [
    { test: "MSE 1", score: 85, maxScore: 100, progress: "85%", color: "green", grade: "A", status: "excellent" },
    { test: "MSE 2", score: 74, maxScore: 100, progress: "74%", color: "blue", grade: "B+", status: "good" },
    { test: "Class Test 1", score: 66, maxScore: 100, progress: "66%", color: "yellow", grade: "B", status: "average" },
    { test: "Class Test 2", score: 79, maxScore: 100, progress: "79%", color: "blue", grade: "B+", status: "good" },
    { test: "PPT", score: 92, maxScore: 100, progress: "92%", color: "green", grade: "A+", status: "excellent" },
    { test: "Lab Task 1", score: 88, maxScore: 100, progress: "88%", color: "green", grade: "A", status: "excellent" },
    { test: "Lab Task 2", score: 81, maxScore: 100, progress: "81%", color: "blue", grade: "A-", status: "good" },
];

const getStatusIcon = (status) => {
    switch (status) {
        case "excellent": return <CheckCircle className="w-4 h-4 text-green-500" />;
        case "good": return <Target className="w-4 h-4 text-blue-500" />;
        case "average": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
        default: return <XCircle className="w-4 h-4 text-red-500" />;
    }
};

const getGradeColor = (grade) => {
    if (grade.includes("A")) return "text-green-600 bg-green-100";
    if (grade.includes("B")) return "text-blue-600 bg-blue-100";
    if (grade.includes("C")) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
};

const CustomDropdown = ({ options, value, onChange, placeholder, icon: Icon, compact = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 text-sm font-semibold text-blue-800 rounded-xl shadow-lg ${compact ? 'py-2 px-3' : 'py-3 px-4'} focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 backdrop-blur-sm`}
            >
                <div className="flex items-center gap-2">
                    <div className={`p-1 rounded-full bg-blue-100 ${compact ? 'scale-75' : ''}`}>
                        <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className={`truncate ${!value ? "text-gray-400 font-normal" : ""} ${compact ? 'text-xs' : ''}`}>
                        {value || placeholder}
                    </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white/95 backdrop-blur-lg border-2 border-blue-200 rounded-xl shadow-2xl z-50 animate-in slide-in-from-top-3 duration-300">
                    {options.map((option, index) => (
                        <button
                            key={option}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-800 border-b border-blue-100 last:border-b-0 ${value === option ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800" : "text-gray-700 hover:text-blue-700"}`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${value === option ? "bg-blue-500 shadow-lg" : "bg-gray-300"}`} />
                                <span className="flex-1">{option}</span>
                                {value === option && (
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className={`bg-gradient-to-r ${color === "green" ? "from-green-500 to-emerald-600" : color === "purple" ? "from-purple-500 to-indigo-600" : "from-blue-500 to-cyan-600"} p-4 rounded-xl shadow-lg text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}>
        <div className="flex items-center justify-between mb-2">
            <Icon className="w-6 h-6 opacity-80" />
            <span className="text-xs font-medium opacity-80">{subtitle}</span>
        </div>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="text-xs opacity-80">{title}</div>
    </div>
);



const MarksCard = ({ subject, animatedScores, isMobile = false }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                        <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            {subject}
                            <Zap className="w-5 h-5 text-orange-500" />
                        </h4>
                        <p className="text-sm text-gray-500">Assessment Overview & Performance</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        On Track
                    </div>
                    {!isMobile && (
                        <div className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                            <Menu className="w-4 h-4 text-gray-400" />
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {testData.map((mark, idx) => (
                    <div
                        key={idx}
                        className={`${isMobile ? 'p-3' : 'p-4'} rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 border-2 ${hoveredIndex === idx ? 'border-blue-300 shadow-lg' : 'border-gray-200'} transition-all duration-300 hover:shadow-md transform hover:-translate-y-1`}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} rounded-full flex items-center justify-center ${mark.color === "green" ? "bg-green-100" : mark.color === "blue" ? "bg-blue-100" : "bg-yellow-100"}`}>
                                    {getStatusIcon(mark.status)}
                                </div>
                                <div>
                                    <span className={`text-gray-800 font-semibold ${isMobile ? 'text-base' : 'text-lg'}`}>{mark.test}</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(mark.grade)}`}>
                                            {mark.grade}
                                        </span>
                                        <Clock className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500">Recently graded</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-2">
                                    <span className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'} ${mark.color === "green" ? "text-green-600" : mark.color === "blue" ? "text-blue-600" : "text-yellow-600"}`}>
                                        {animatedScores[idx] || 0}
                                    </span>
                                    <span className="text-gray-500 text-sm">/{mark.maxScore}</span>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {mark.status === "excellent" && <Trophy className="w-4 h-4 text-yellow-500" />}
                                    <span className="text-xs text-gray-500 capitalize">{mark.status}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner overflow-hidden">
                                <div
                                    className={`h-3 rounded-full transition-all duration-1000 ease-out ${mark.color === "green" ? "bg-gradient-to-r from-green-400 to-green-600" : mark.color === "blue" ? "bg-gradient-to-r from-blue-400 to-blue-600" : "bg-gradient-to-r from-yellow-400 to-yellow-600"}`}
                                    style={{
                                        width: animatedScores[idx] ? `${animatedScores[idx]}%` : '0%',
                                        boxShadow: hoveredIndex === idx ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                                    }}
                                />
                            </div>
                            {hoveredIndex === idx && (
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                                    {mark.progress}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Performance Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">Performance Summary</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Improving</span>
                    </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    You're doing great in {subject}! Keep up the excellent work.
                    <span className="font-medium text-blue-600"> Next goal: Maintain A+ average</span>
                </div>
            </div>
        </div>
    );
};

const MarksReport = () => {
    const [selectedSemester, setSelectedSemester] = useState("Sem-3");
    const [selectedSubject, setSelectedSubject] = useState("Operating Systems");
    const [animatedScores, setAnimatedScores] = useState({});
    
    // Real data states
    const [studentData, setStudentData] = useState(null);
    const [resultsData, setResultsData] = useState([]);
    const [subjectsData, setSubjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user.id) {
                    const student = await studentsAPI.getById(user.id);
                    setStudentData(student);
                    
                    // Fetch results data
                    const results = await resultsAPI.getByStudent(user.id);
                    setResultsData(results.data || []);
                    
                    // Fetch subjects data
                    const subjects = await subjectsAPI.getAll();
                    setSubjectsData(subjects.data || subjects || []);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const subjects = subjectsBySemester[selectedSemester] || [];

    // Calculate statistics from real data
    const totalMarks = resultsData.reduce((sum, result) => sum + (result.score || 0), 0);
    const averageScore = resultsData.length > 0 ? Math.round(totalMarks / resultsData.length) : 0;
    const excellentCount = resultsData.filter(result => (result.score || 0) >= 90).length;
    const highestScore = resultsData.length > 0 ? Math.max(...resultsData.map(result => result.score || 0)) : 0;

    useEffect(() => {
        const timer = setTimeout(() => {
            const scores = {};
            testData.forEach((test, index) => {
                scores[index] = test.score;
            });
            setAnimatedScores(scores);
        }, 500);
        return () => clearTimeout(timer);
    }, [selectedSubject]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 pt-4 pb-28 md:px-8 md:py-10">

            {/* Mobile View */}
            <div className="md:hidden max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                            <ArrowLeft className="text-blue-700 w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Performance Hub
                        </h2>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
                        <Zap className="w-4 h-4 text-orange-500" />
                        <span className="text-xs font-bold text-orange-600">Hot!</span>
                    </div>
                </div>

                {/* Floating Action Selectors */}
               

                {/* Quick Access Dropdowns */}
                <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Target className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800">Quick Select</span>
                    </div>
                    <div className="space-y-3">
                        <CustomDropdown
                            options={Object.keys(subjectsBySemester)}
                            value={selectedSemester}
                            onChange={(sem) => {
                                setSelectedSemester(sem);
                                setSelectedSubject(subjectsBySemester[sem][0]);
                            }}
                            placeholder="Choose Semester"
                            icon={Calendar}
                            compact={true}
                        />
                        <CustomDropdown
                            options={subjects}
                            value={selectedSubject}
                            onChange={setSelectedSubject}
                            placeholder="Choose Subject"
                            icon={BookOpen}
                            compact={true}
                        />
                    </div>
                </div>

                {/* Enhanced Profile Section */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-16 h-16 border-3 border-blue-400 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center shadow-lg">
                                    <span className="text-blue-600 text-2xl font-bold">H</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse">
                                    <Trophy className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-1">
                                    Hey Harsha!
                                    <Sparkles className="w-4 h-4 text-purple-500" />
                                </h3>
                                <p className="text-xs text-gray-600">Keep crushing it! 🚀</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{averageScore}%</div>
                            <div className="text-xs text-gray-500">Avg Score</div>
                        </div>
                    </div>

                    {/* Mini Stats Row */}
                    <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <Award className="w-5 h-5 text-green-500 mx-auto mb-1" />
                            <div className="text-lg font-bold text-green-600">{excellentCount}</div>
                            <div className="text-xs text-gray-500">Excellent</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <TrendingUp className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                            <div className="text-lg font-bold text-blue-600">{averageScore}%</div>
                            <div className="text-xs text-gray-500">Average</div>
                        </div>
                        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
                            <Zap className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                            <div className="text-lg font-bold text-purple-600">{highestScore}%</div>
                            <div className="text-xs text-gray-500">Best</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Marks Card */}
                <MarksCard subject={selectedSubject} animatedScores={animatedScores} isMobile={true} />

                
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex max-w-7xl mx-auto gap-8">
                {/* Left Panel */}
                <div className="w-1/3 bg-white rounded-3xl shadow-2xl p-6 border border-gray-200">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border-4 border-blue-400 flex items-center justify-center shadow-lg">
                                <span className="text-4xl font-bold text-blue-600">H</span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white shadow-md flex items-center justify-center animate-pulse">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                                <Star className="w-4 h-4 text-yellow-800" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            Harsha Kumar
                            <Sparkles className="w-5 h-5 text-purple-500" />
                        </h3>
                        <p className="text-sm text-gray-500 text-center mt-2">
                            Academic Performance Dashboard
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <StatCard
                            icon={TrendingUp}
                            title="Overall Average"
                            value={`${averageScore}%`}
                            subtitle="Current Performance"
                            color="blue"
                        />
                    </div>

                    {/* Dropdowns */}
                    <div className="space-y-4">
                        <CustomDropdown
                            options={Object.keys(subjectsBySemester)}
                            value={selectedSemester}
                            onChange={(sem) => {
                                setSelectedSemester(sem);
                                setSelectedSubject(subjectsBySemester[sem][0]);
                            }}
                            placeholder="Select Semester"
                            icon={Calendar}
                        />
                        <CustomDropdown
                            options={subjects}
                            value={selectedSubject}
                            onChange={setSelectedSubject}
                            placeholder="Select Subject"
                            icon={BookOpen}
                        />
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-2/3">
                    <MarksCard subject={selectedSubject} animatedScores={animatedScores} />
                </div>
            </div>
            <BottomNav />
        </div>
        
    );
};

export default MarksReport;