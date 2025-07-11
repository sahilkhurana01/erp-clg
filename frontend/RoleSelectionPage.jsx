import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Select Your Role</h1>
      <div className="space-x-4">
        <button onClick={() => handleRoleSelect('admin')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold">Admin</button>
        <button onClick={() => handleRoleSelect('teacher')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold">Teacher</button>
        <button onClick={() => handleRoleSelect('student')} className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold">Student</button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
