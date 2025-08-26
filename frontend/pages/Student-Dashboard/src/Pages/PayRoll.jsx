import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CreditCard,
    DollarSign,
    Calendar,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    TrendingUp,
    Download,
    Eye,
    Receipt,
    Wallet,
    Shield,
    Info,
    Filter,
    Search,
    BarChart3,
    PieChart,
    FileText,
    Send,
    RefreshCw
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import { studentsAPI, resultsAPI, attendanceAPI } from "../../../../api";

const PayRoll = () => {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState(null);
    const [feeData, setFeeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState("current");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                setLoading(true);
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                if (user.id) {
                    const student = await studentsAPI.getById(user.id);
                    setStudentData(student);
                    
                    // Mock fee data - in real implementation, this would come from a fees API
                    const mockFeeData = {
                        totalFees: 50000,
                        paidAmount: 35000,
                        pendingAmount: 15000,
                        dueDate: "2024-03-15",
                        paymentHistory: [
                            {
                                id: 1,
                                date: "2024-01-15",
                                amount: 15000,
                                method: "Online Transfer",
                                status: "completed",
                                receipt: "RCP001",
                                description: "1st Semester Fees"
                            },
                            {
                                id: 2,
                                date: "2024-02-15",
                                amount: 20000,
                                method: "Credit Card",
                                status: "completed",
                                receipt: "RCP002",
                                description: "2nd Semester Fees"
                            }
                        ],
                        upcomingPayments: [
                            {
                                id: 1,
                                dueDate: "2024-03-15",
                                amount: 15000,
                                description: "3rd Semester Fees",
                                status: "pending"
                            }
                        ]
                    };
                    setFeeData(mockFeeData);
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const paymentMethods = [
        { id: "online", name: "Online Transfer", icon: CreditCard, color: "text-blue-600", bgColor: "bg-blue-100" },
        { id: "card", name: "Credit/Debit Card", icon: CreditCard, color: "text-green-600", bgColor: "bg-green-100" },
        { id: "upi", name: "UPI Payment", icon: Send, color: "text-purple-600", bgColor: "bg-purple-100" },
        { id: "cash", name: "Cash Payment", icon: DollarSign, icon: DollarSign, color: "text-orange-600", bgColor: "bg-orange-100" }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
            case "pending": return <Clock className="w-4 h-4 text-yellow-500" />;
            case "failed": return <XCircle className="w-4 h-4 text-red-500" />;
            default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "completed": return "text-green-600 bg-green-100 border-green-200";
            case "pending": return "text-yellow-600 bg-yellow-100 border-yellow-200";
            case "failed": return "text-red-600 bg-red-100 border-red-200";
            default: return "text-gray-600 bg-gray-100 border-gray-200";
        }
    };

    const filteredPayments = feeData?.paymentHistory?.filter(payment =>
        payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.receipt.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between max-w-4xl mx-auto">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                                Fee Management
                            </h1>
                            <p className="text-sm text-gray-600">
                                {studentData?.name || 'Student'} - {studentData?.classId || 'Class'} {studentData?.section || ''}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <RefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Fee Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Fees</p>
                                <p className="text-2xl font-bold text-gray-900">₹{feeData?.totalFees?.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                                <p className="text-2xl font-bold text-green-600">₹{feeData?.paidAmount?.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                                <p className="text-2xl font-bold text-orange-600">₹{feeData?.pendingAmount?.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Payment Progress</h3>
                        <span className="text-sm font-medium text-gray-600">
                            {Math.round((feeData?.paidAmount / feeData?.totalFees) * 100)}% Complete
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(feeData?.paidAmount / feeData?.totalFees) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>₹0</span>
                        <span>₹{feeData?.totalFees?.toLocaleString()}</span>
                    </div>
                </div>

                {/* Upcoming Payments */}
                {feeData?.upcomingPayments?.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
                        <div className="space-y-4">
                            {feeData.upcomingPayments.map((payment) => (
                                <div key={payment.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{payment.description}</p>
                                            <p className="text-sm text-gray-600">Due: {new Date(payment.dueDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-orange-600">₹{payment.amount.toLocaleString()}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                            {getStatusIcon(payment.status)}
                                            <span className="ml-1 capitalize">{payment.status}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Payment History */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search payments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Filter className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredPayments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <Receipt className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{payment.description}</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(payment.date).toLocaleDateString()} • {payment.method}
                                        </p>
                                        <p className="text-xs text-gray-500">Receipt: {payment.receipt}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                        {getStatusIcon(payment.status)}
                                        <span className="ml-1 capitalize">{payment.status}</span>
                                    </span>
                                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                                        <Download className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {paymentMethods.map((method) => (
                            <button
                                key={method.id}
                                className="flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                            >
                                <div className={`w-12 h-12 ${method.bgColor} rounded-full flex items-center justify-center`}>
                                    <method.icon className={`w-6 h-6 ${method.color}`} />
                                </div>
                                <span className="text-sm font-medium text-gray-700 text-center">{method.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                            <CreditCard className="w-5 h-5" />
                            <span className="font-medium">Pay Fees Now</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 p-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                            <FileText className="w-5 h-5" />
                            <span className="font-medium">Download Statement</span>
                        </button>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default PayRoll;
