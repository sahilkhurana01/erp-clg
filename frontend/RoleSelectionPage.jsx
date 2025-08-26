import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Shield, ArrowRight } from 'lucide-react';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student Portal',
      description: 'Access your academic dashboard, view grades, check attendance, and manage your educational journey',
      icon: GraduationCap,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-600',
      route: '/student'
    },
    {
      id: 'teacher',
      title: 'Faculty Portal',
      description: 'Manage your classes, grade assignments, track student progress, and access teaching resources',
      icon: User,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      hoverColor: 'hover:from-emerald-600 hover:to-teal-600',
      route: '/teacher'
    },
    {
      id: 'admin',
      title: 'Administrative Portal',
      description: 'Oversee institutional operations, manage users, monitor system performance, and generate reports',
      icon: Shield,
      color: 'bg-gradient-to-r from-violet-500 to-purple-500',
      hoverColor: 'hover:from-violet-600 hover:to-purple-600',
      route: '/admin'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center mb-3 md:mb-4">
            <div className="bg-white rounded-full p-3 md:p-4 shadow-md">
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-slate-600" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-light text-slate-800 mb-2">
            Educational Resource Platform
          </h1>
          <p className="text-sm md:text-base text-slate-600">
            Welcome to our integrated learning management system. 
            Select your role to access personalized features and tools.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 md:mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <div
                key={role.id}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                onClick={() => navigate(role.route)}
              >
                <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 h-full border border-slate-100 hover:shadow-lg transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-light text-slate-800 mb-3 md:mb-4">
                    {role.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 mb-4 md:mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Action Button */}
                  <div className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 ${role.color} ${role.hoverColor} text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg`}>
                    <span className="text-sm md:text-base">Access Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-500">
          <p className="text-sm">
            Need assistance? Contact our support team
          </p>
          <p className="text-xs mt-2">
            © 2024 Educational Resource Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
