import React, { useState } from 'react';
import { GraduationCap, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

const StudentLogin = () => {
    const [step, setStep] = useState(0); // 0: login, 1: email input, 2: otp, 3: new password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Student Login:', { email, password });
        setIsLoading(false);
    };

    const handleSendOTP = () => {
        if (!email) return;
        console.log('Sending OTP to:', email);
        setStep(2);
    };

    const handleVerifyOTP = () => {
        if (!otp) return;
        console.log('Verifying OTP:', otp);
        setStep(3);
    };

    const handleResetPassword = () => {
        console.log('Resetting password to:', newPassword);
        setStep(0);
        setNewPassword('');
        setOtp('');
        setPassword('');
        alert('Password reset successfully. Please login again.');
    };

    const goBack = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <div className="flex justify-center items-center mb-3 md:mb-4">
                        <div className="bg-white rounded-full p-3 md:p-4 shadow-md">
                            <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-slate-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-light text-slate-800 mb-2">
                        {step === 0 ? 'Student Login' :
                            step === 1 ? 'Reset Password' :
                                step === 2 ? 'Enter OTP' :
                                    'Set New Password'}
                    </h1>
                    <p className="text-sm md:text-base text-slate-600">
                        {step === 0 && 'Enter your credentials to access your account'}
                        {step === 1 && 'Enter your registered email to receive OTP'}
                        {step === 2 && 'Enter the OTP sent to your email'}
                        {step === 3 && 'Create a new password'}
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                    {step > 0 && (
                        <button onClick={goBack} className="mb-4 flex items-center text-sm text-slate-500 hover:text-slate-700 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" /> Back
                        </button>
                    )}

                    {step === 0 && (
                        <div className="space-y-4 md:space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                                    </button>
                                </div>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading || !email || !password}
                                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${isLoading || !email || !password
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                                    }`}
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                onClick={handleSendOTP}
                                disabled={!email}
                                className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                            >
                                Send OTP
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                onClick={handleVerifyOTP}
                                disabled={!otp}
                                className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                onClick={handleResetPassword}
                                disabled={!newPassword}
                                className="w-full py-3 rounded-xl font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all"
                            >
                                Reset Password
                            </button>
                        </div>
                    )}
                </div>

                {/* Forgot Password Button */}
                {step === 0 && (
                    <div className="text-center mt-4 md:mt-6">
                        <button onClick={() => setStep(1)} className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
                            Forgot your password?
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-6 md:mt-8 text-slate-400 text-xs md:text-sm">
                    <p>Student portal access • Contact support if needed</p>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
