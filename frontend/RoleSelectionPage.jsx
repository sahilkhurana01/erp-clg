import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, GraduationCap, Building2 } from 'lucide-react';

const RoleSelectionPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isHovered, setIsHovered] = useState(null);
    const navigate = useNavigate();

    const roles = [
        {
            id: 'admin',
            title: 'Admin',
            description: 'Manage system and users',
            icon: Shield
        },
        {
            id: 'teacher',
            title: 'Teacher',
            description: 'Create and manage courses',
            icon: User
        },
        {
            id: 'student',
            title: 'Student',
            description: 'Access courses and materials',
            icon: GraduationCap
        }
    ];

    const handleRoleSelect = (roleId) => {
        setSelectedRole(roleId);
    };

    const handleContinue = () => {
        if (!selectedRole) return;

        switch (selectedRole) {
            case 'admin':
                navigate('/admin');
                break;
            case 'teacher':
                navigate('/teacher');
                break;
            case 'student':
                navigate('/student');
                break;
            default:
                break;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-6 md:mb-12">
                    <div className="flex justify-center items-center mb-3 md:mb-6">
                        <div className="bg-white rounded-full p-3 md:p-4 shadow-md">
                            <Building2 className="h-6 w-6 md:h-8 md:w-8 text-slate-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-light text-slate-800 mb-2 md:mb-4">
                        Choose Your Role
                    </h1>
                    <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">
                        Select how you'd like to access the platform
                    </p>
                </div>

                {/* Role Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-12">
                    {roles.map((role) => {
                        const IconComponent = role.icon;
                        const isSelected = selectedRole === role.id;
                        const isHover = isHovered === role.id;

                        return (
                            <div
                                key={role.id}
                                className={`relative bg-white rounded-xl md:rounded-2xl shadow-md transition-all duration-300 cursor-pointer group ${isSelected ? 'ring-2 ring-blue-400 shadow-lg transform scale-105' : 'hover:shadow-lg'
                                    } ${isHover ? 'transform -translate-y-1 md:-translate-y-2' : ''}`}
                                onMouseEnter={() => setIsHovered(role.id)}
                                onMouseLeave={() => setIsHovered(null)}
                                onClick={() => handleRoleSelect(role.id)}
                            >
                                <div className="p-4 md:p-8 text-center">
                                    <div className="flex justify-center mb-3 md:mb-6">
                                        <div
                                            className={`p-2 md:p-4 rounded-full transition-all duration-300 ${isSelected ? 'bg-blue-100' : 'bg-slate-100 group-hover:bg-slate-200'
                                                }`}
                                        >
                                            <IconComponent
                                                className={`h-6 w-6 md:h-8 md:w-8 transition-colors duration-300 ${isSelected ? 'text-blue-600' : 'text-slate-600'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-1 md:mb-2">{role.title}</h3>
                                    <p className="text-slate-500 text-xs md:text-sm">{role.description}</p>
                                </div>

                                {isSelected && (
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-blue-500 text-white rounded-full p-1 md:p-2">
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Continue Button */}
                <div className="text-center mb-4 md:mb-8">
                    <button
                        onClick={handleContinue}
                        disabled={!selectedRole}
                        className={`px-8 md:px-10 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 ${selectedRole
                                ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        Continue
                    </button>
                </div>

                {/* Footer */}
                <div className="text-center text-slate-400 text-xs md:text-sm">
                    <p>Need help? Contact support</p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelectionPage;
