import React, { useState } from "react";
import {
  Shield,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  KeyRound,
} from "lucide-react";

const AdminLogin = () => {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Admin Login:", { email, password });
    setIsLoading(false);
  };

  const handleForgotFlow = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setStep("forgotOTP");
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    setStep("forgotNewPassword");
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Password Reset to:", newPassword);
    setIsLoading(false);
    setStep("login");
    setNewPassword("");
    setConfirmPassword("");
  };

  const goBack = () => {
    if (step === "forgotOTP") setStep("forgotEmail");
    else if (step === "forgotNewPassword") setStep("forgotOTP");
    else setStep("login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center mb-3 md:mb-4">
            <div className="bg-white rounded-full p-3 md:p-4 shadow-md">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-slate-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-slate-800 mb-2">
            {step === "login"
              ? "Admin Login"
              : step === "forgotEmail"
                ? "Forgot Password"
                : step === "forgotOTP"
                  ? "Enter OTP"
                  : "Reset Password"}
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            {step === "login"
              ? "Enter your credentials to access the admin panel"
              : step === "forgotEmail"
                ? "Enter your registered email to receive OTP"
                : step === "forgotOTP"
                  ? "Check your email and enter the OTP"
                  : "Set a new password for your account"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-5">
          {(step === "login" || step === "forgotEmail") && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === "login" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "forgotOTP" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === "forgotNewPassword" && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    Passwords do not match.
                  </p>
                )}
              </div>
            </>
          )}

          {/* Continue Button */}
          <button
            onClick={() => {
              if (step === "login") handleLogin();
              else if (step === "forgotEmail") handleForgotFlow();
              else if (step === "forgotOTP") handleVerifyOtp();
              else handleResetPassword();
            }}
            disabled={
              isLoading ||
              (step === "login" && (!email || !password)) ||
              (step === "forgotEmail" && !email) ||
              (step === "forgotOTP" && !otp) ||
              (step === "forgotNewPassword" &&
                (!newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword))
            }
            className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${isLoading ||
                (step === "login" && (!email || !password)) ||
                (step === "forgotEmail" && !email) ||
                (step === "forgotOTP" && !otp) ||
                (step === "forgotNewPassword" &&
                  (!newPassword ||
                    !confirmPassword ||
                    newPassword !== confirmPassword))
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Please wait...
              </div>
            ) : step === "login" ? (
              "Sign In"
            ) : step === "forgotEmail" ? (
              "Send OTP"
            ) : step === "forgotOTP" ? (
              "Verify OTP"
            ) : (
              "Reset Password"
            )}
          </button>

          {/* Back Button */}
          {step !== "login" && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>

        {/* Forgot Password Trigger */}
        {step === "login" && (
          <div className="text-center mt-6 md:mt-8 text-sm">
            <button
              onClick={() => setStep("forgotEmail")}
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
