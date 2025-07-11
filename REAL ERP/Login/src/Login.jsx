import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css'; 

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = () => {
        setIsLoading(true);
        // Mock login process
        setTimeout(() => {
            console.log('Login attempted with:', formData);
            setIsLoading(false);
        }, 2000);
    };

    const handleGoogleLogin = () => {
        console.log('Google login attempted');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            {/* Mobile Phone Container */}
            <div className="w-full max-w-sm mx-auto">
              
                    <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[700px]">
                        {/* Status Bar */}
                       
                        {/* Content */}
                        <div className="px-6 pb-8">
                            {/* Logo and App Name */}
                            <div className="flex items-center justify-center mb-8 mt-4">
                                <div className="flex items-center gap-2">
                                <img src="\src\assets\image.png" className='h-20' alt="" />
                                </div>
                            </div>

                            {/* Welcome Text */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                                <p className="text-gray-500 text-sm">Login to access your account</p>
                            </div>

                            {/* Form */}
                            <div className="space-y-4">
                                {/* Email Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-medium mb-2">
                                        Password *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Enter your password"
                                            className="w-full border border-gray-300 rounded-3xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                <button className="text-[rgba(228,1,2,1)] text-sm font-medium hover:cursor-pointer">
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Login Button */}
                                <button
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                className="w-full hover:cursor-pointer bg-[rgba(228,1,2,1)] text-white py-3 rounded-lg font-semibold  disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>

                                {/* Google Login Button */}
                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 mt-4 hover:cursor-pointer"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Continue with Google
                                </button>

                                {/* Sign Up Link */}
                                <div className="text-center mt-6">
                                    <span className="text-gray-500 text-sm">
                                        Don't have an account?
                                    <button className="text-[rgba(228,1,2,1)] font-medium hover:cursor-pointer ml-1">
                                            Sign up
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Home Indicator */}
                        <div className="flex justify-center pb-2">
                            <div className="w-32 h-1 bg-black rounded-full"></div>
                        </div>
                    
                </div>
            </div>

            {/* Desktop Version */}
            <div className="hidden lg:block fixed inset-0 bg-gray-50">
                <div className="flex items-center justify-center min-h-screen p-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                        {/* Logo and App Name */}
                        <div className="flex items-center justify-center mb-8">
                            <div className="flex items-center gap-3">
                                {/* <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                    </div>
                                </div> */}
                               <img src=".\src\assets\image.png" className='h-20' alt="" />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                            <p className="text-gray-500">Login to access your account</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="w-full border border-gray-300 rounded-3xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className=" rounded-3xl absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <button className="text-[rgba(228,1,2,1)] text-sm font-medium hover: cursor-pointer">
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="w-full bg-[rgba(228,1,2,1)] text-white py-3 rounded-3xl font-semibold  disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover: cursor-pointer"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>

                            {/* Google Login Button */}
                            <button
                                onClick={handleGoogleLogin}
                                className="w-full border border-gray-300 bg-white text-gray-700 py-3 rounded-3xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 hover: cursor-pointer"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <span className="text-gray-500">
                                    Don't have an account?
                                    <button className="text-[rgba(228,1,2,1)] font-medium ml-1  hover: cursor-pointer">
                                        Sign up
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;