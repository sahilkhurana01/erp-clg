import React, { useState, useMemo } from 'react';
import {
    Download,
    Eye,
    Calendar,
    TrendingUp,
    Clock,
    AlertCircle,
    CheckCircle,
    Filter,
    ChevronDown,
    ChevronUp,
    FileText,
    Target,
    Gift,
    BarChart3,
    User,
    MessageSquare,
    X
} from 'lucide-react';

const PayrollPage = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [sortBy, setSortBy] = useState('month');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [showQueryModal, setShowQueryModal] = useState(false);
    const [queryForm, setQueryForm] = useState({
        month: '',
        issueType: '',
        description: ''
    });

    // Mock payroll data
    const payrollData = [
        {
            id: 1,
            month: 'June 2024',
            monthNum: 6,
            year: 2024,
            baseSalary: 85000,
            deductions: {
                pf: 10200,
                tax: 12750,
                leaves: 2833,
                total: 25783
            },
            netPay: 59217,
            status: 'paid',
            paidDate: '2024-06-30'
        },
        {
            id: 2,
            month: 'May 2024',
            monthNum: 5,
            year: 2024,
            baseSalary: 85000,
            deductions: {
                pf: 10200,
                tax: 12750,
                leaves: 0,
                total: 22950
            },
            netPay: 62050,
            status: 'paid',
            paidDate: '2024-05-31'
        },
        {
            id: 3,
            month: 'April 2024',
            monthNum: 4,
            year: 2024,
            baseSalary: 85000,
            deductions: {
                pf: 10200,
                tax: 12750,
                leaves: 0,
                total: 22950
            },
            netPay: 62050,
            status: 'paid',
            paidDate: '2024-04-30'
        },
        {
            id: 4,
            month: 'March 2024',
            monthNum: 3,
            year: 2024,
            baseSalary: 85000,
            deductions: {
                pf: 10200,
                tax: 12750,
                leaves: 1417,
                total: 24367
            },
            netPay: 60633,
            status: 'paid',
            paidDate: '2024-03-31'
        },
        {
            id: 5,
            month: 'February 2024',
            monthNum: 2,
            year: 2024,
            baseSalary: 82000,
            deductions: {
                pf: 9840,
                tax: 12300,
                leaves: 0,
                total: 22140
            },
            netPay: 59860,
            status: 'paid',
            paidDate: '2024-02-29'
        },
        {
            id: 6,
            month: 'January 2024',
            monthNum: 1,
            year: 2024,
            baseSalary: 82000,
            deductions: {
                pf: 9840,
                tax: 12300,
                leaves: 0,
                total: 22140
            },
            netPay: 59860,
            status: 'paid',
            paidDate: '2024-01-31'
        }
    ];

    const bonusData = [
        {
            type: 'Performance Bonus',
            amount: 15000,
            icon: '🎯',
            month: 'June 2024'
        },
        {
            type: 'Festival Bonus',
            amount: 8000,
            icon: '🎉',
            month: 'April 2024'
        }
    ];

    const attendanceData = {
        totalDays: 22,
        workedDays: 20,
        leaves: 2,
        lateMarks: 1,
        impact: 2833
    };

    // Filter and sort data
    const filteredData = useMemo(() => {
        let filtered = payrollData.filter(item => item.year.toString() === selectedYear);

        filtered.sort((a, b) => {
            let aVal = a[sortBy];
            let bVal = b[sortBy];

            if (sortBy === 'month') {
                aVal = a.monthNum;
                bVal = b.monthNum;
            }

            if (sortOrder === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });

        return filtered;
    }, [selectedYear, sortBy, sortOrder]);

    const itemsPerPage = 6;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const currentMonthData = payrollData[0];

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const handleQuerySubmit = () => {
        // Validation
        if (!queryForm.month || !queryForm.issueType || !queryForm.description) {
            alert('Please fill in all fields');
            return;
        }

        // Mock submission
        alert('Query submitted successfully! We will get back to you within 24 hours.');
        setShowQueryModal(false);
        setQueryForm({ month: '', issueType: '', description: '' });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const AttendanceCircle = ({ percentage }) => {
        const circumference = 2 * Math.PI * 45;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
            <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-in-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                        <div className="text-xs text-gray-600">Attendance</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 pb-24">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg mb-4 hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl">💰</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        💰 Payroll Insights
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Review your monthly salary details, payments, and deductions.
                    </p>
                </div>

                {/* Current Salary Summary */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-blue-500" />
                            Current Month Summary
                        </h2>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                ✅ Paid
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                            <div className="text-sm text-green-600 font-medium mb-1">Net Pay</div>
                            <div className="text-2xl font-bold text-green-700">{formatCurrency(currentMonthData.netPay)}</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                            <div className="text-sm text-blue-600 font-medium mb-1">Base Salary</div>
                            <div className="text-2xl font-bold text-blue-700">{formatCurrency(currentMonthData.baseSalary)}</div>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100">
                            <div className="text-sm text-orange-600 font-medium mb-1">Total Deductions</div>
                            <div className="text-2xl font-bold text-orange-700">{formatCurrency(currentMonthData.deductions.total)}</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                            <div className="text-sm text-purple-600 font-medium mb-1">PF Contribution</div>
                            <div className="text-2xl font-bold text-purple-700">{formatCurrency(currentMonthData.deductions.pf)}</div>
                        </div>
                    </div>

                    <button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        📄 Download Current Payslip
                    </button>
                </div>

                {/* Bonuses & Allowances */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Gift className="w-6 h-6 text-yellow-500" />
                        Bonuses & Allowances
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bonusData.map((bonus, index) => (
                            <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{bonus.icon}</span>
                                        <div>
                                            <div className="font-semibold text-gray-800">{bonus.type}</div>
                                            <div className="text-sm text-gray-600">{bonus.month}</div>
                                        </div>
                                    </div>
                                    <div className="text-xl font-bold text-green-600">{formatCurrency(bonus.amount)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leave & Attendance Impact */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-purple-500" />
                        Leave & Attendance Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Days Worked</span>
                                <span className="font-semibold text-green-600">{attendanceData.workedDays}/{attendanceData.totalDays}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Leaves Taken</span>
                                <span className="font-semibold text-orange-600">{attendanceData.leaves} days</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Late Marks</span>
                                <span className="font-semibold text-red-600">{attendanceData.lateMarks}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t">
                                <span className="text-gray-600">Salary Impact</span>
                                <span className="font-semibold text-red-600">-{formatCurrency(attendanceData.impact)}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <AttendanceCircle percentage={Math.round((attendanceData.workedDays / attendanceData.totalDays) * 100)} />
                        </div>
                    </div>
                </div>

                {/* Payroll Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-indigo-500" />
                            Payroll History
                        </h2>
                        <div className="flex items-center gap-4">
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                            </select>
                            <Filter className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 rounded-lg">
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors rounded-tl-lg"
                                        onClick={() => handleSort('month')}
                                    >
                                        <div className="flex items-center gap-2">
                                            Month
                                            {sortBy === 'month' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('baseSalary')}
                                    >
                                        <div className="flex items-center gap-2">
                                            Base Salary
                                            {sortBy === 'baseSalary' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Deductions
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => handleSort('netPay')}
                                    >
                                        <div className="flex items-center gap-2">
                                            Net Pay
                                            {sortBy === 'netPay' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paginatedData.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{item.month}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-900">{formatCurrency(item.baseSalary)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-900">{formatCurrency(item.deductions.total)}</div>
                                            <div className="text-xs text-gray-500">
                                                PF: {formatCurrency(item.deductions.pf)} | Tax: {formatCurrency(item.deductions.tax)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-green-600">{formatCurrency(item.netPay)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                {item.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-800 p-1 hover:bg-green-50 rounded transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-700">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded-lg transition-colors ${currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white border border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-white border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Motivational Section */}
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 mb-8 text-white text-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold mb-2">You're doing great!</h3>
                    <p className="text-purple-100">Keep up the excellent work. Your dedication is appreciated!</p>
                </div>

                {/* Raise Query Button */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => setShowQueryModal(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto"
                    >
                        <MessageSquare className="w-5 h-5" />
                        Raise a Payroll Query
                    </button>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-20 right-6 z-50">
                <button
                    onClick={() => alert('Downloading all payslips...')}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-110 group"
                >
                    <div className="hidden md:flex items-center gap-2 px-6 py-4">
                        <Download className="w-5 h-5" />
                        <span>💾 Download All Payslips</span>
                    </div>
                    <div className="md:hidden p-4">
                        <Download className="w-6 h-6" />
                    </div>
                </button>
            </div>

            {/* Query Modal */}
            {showQueryModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Raise Payroll Query</h3>
                            <button
                                onClick={() => setShowQueryModal(false)}
                                className="text-gray-500 hover:text-gray-700 p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                                <select
                                    value={queryForm.month}
                                    onChange={(e) => setQueryForm({ ...queryForm, month: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select Month</option>
                                    <option value="June 2024">June 2024</option>
                                    <option value="May 2024">May 2024</option>
                                    <option value="April 2024">April 2024</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                                <select
                                    value={queryForm.issueType}
                                    onChange={(e) => setQueryForm({ ...queryForm, issueType: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select Issue Type</option>
                                    <option value="Salary Calculation">Salary Calculation</option>
                                    <option value="Deduction Query">Deduction Query</option>
                                    <option value="Late Payment">Late Payment</option>
                                    <option value="Bonus/Allowance">Bonus/Allowance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={queryForm.description}
                                    onChange={(e) => setQueryForm({ ...queryForm, description: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Please describe your query in detail..."
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowQueryModal(false)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleQuerySubmit}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                                >
                                    Submit Query
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayrollPage;