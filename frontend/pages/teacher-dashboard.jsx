import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      <p className="mb-8">Welcome, Teacher!</p>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login?role=teacher'); }} className="text-red-500 underline">Logout</button>
    </div>
  );
};

export default TeacherDashboard;