import React, { useState } from 'react';
import { User, Eye, EyeOff, Mail, Lock, KeyRound } from 'lucide-react';

const TeacherLogin = () => {
  const [view, setView] = useState('login'); // login | forgot-email | otp | reset
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Login:', { email, password });
    setIsLoading(false);
  };

  const handleEmailSubmit = () => {
    // Assume email is always valid
    console.log("Email verified:", email);
    setView('otp');
  };

  const handleOtpSubmit = () => {
    // Assume OTP is valid
    console.log("OTP verified:", otp);
    setView('reset');
  };

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      console.log("Password reset successful:", password);
      setView('login');
    } else {
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center mb-3 md:mb-4">
            <div className="bg-white rounded-full p-3 md:p-4 shadow-md">
              <User className="h-6 w-6 md:h-8 md:w-8 text-slate-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-slate-800 mb-2">
            Teacher Login
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            {view === 'login' && 'Enter your credentials to access your dashboard'}
            {view === 'forgot-email' && 'Enter your registered email'}
            {view === 'otp' && 'Enter the OTP sent to your email'}
            {view === 'reset' && 'Reset your password securely'}
          </p>
        </div>

        {/* Login / Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-5">
          {view === 'login' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleLogin}
                disabled={isLoading || !email || !password}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${isLoading || !email || !password
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md'
                  }`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <div className="text-center">
                <button
                  className="text-sm text-blue-500 hover:text-blue-600 transition"
                  onClick={() => setView('forgot-email')}
                >
                  Forgot your password?
                </button>
              </div>
            </>
          )}

          {view === 'forgot-email' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                onClick={handleEmailSubmit}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
              >
                Send OTP
              </button>
              <button
                className="text-sm text-slate-500 hover:text-slate-700"
                onClick={() => setView('login')}
              >
                Back to login
              </button>
            </>
          )}

          {view === 'otp' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">OTP</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
              <button
                onClick={handleOtpSubmit}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
              >
                Verify OTP
              </button>
            </>
          )}

          {view === 'reset' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="New password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  placeholder="Confirm password"
                />
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition"
              >
                Reset Password
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 md:mt-8 text-slate-400 text-xs md:text-sm">
          <p>Teacher access portal • Contact admin if needed</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
