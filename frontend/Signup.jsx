import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = () => {
        setError('');
        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        // Simulate backend call
        setTimeout(() => {
            console.log('Signup Data:', formData);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-sm mx-auto">
                <div className="bg-white rounded-[2.5rem] overflow-hidden min-h-[750px]">
                    <div className="px-6 pb-8">
                        {/* Logo */}
                        <div className="flex items-center justify-center mt-4 mb-8">
                            <img src="/src/assets/image.png" className="h-20" alt="Logo" />
                        </div>

                        {/* Heading */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
                            <p className="text-gray-500 text-sm">Sign up to get started</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        className="w-full border border-gray-300 rounded-3xl px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password *</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm your password"
                                    className="w-full border border-gray-300 rounded-3xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Signup Button */}
                            <button
                                onClick={handleSignup}
                                disabled={isLoading}
                                className="w-full bg-[rgba(228,1,2,1)] text-white py-3 rounded-3xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4"
                            >
                                {isLoading ? 'Creating account...' : 'Sign Up'}
                            </button>

                            {/* Already have account */}
                            <div className="text-center mt-4">
                                <span className="text-gray-500 text-sm">
                                    Already have an account?
                                    <button className="text-[rgba(228,1,2,1)] font-medium ml-1 hover:cursor-pointer">
                                        Login
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
        </div>
    );
};

export default Signup;
