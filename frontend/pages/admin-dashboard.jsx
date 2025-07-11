import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4 mb-8">
        <button onClick={() => navigate('/students')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold w-64">Manage Students</button>
        <button onClick={() => navigate('/teachers')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold w-64">Manage Teachers</button>
        <button onClick={() => navigate('/classes')} className="bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold w-64">Manage Classes</button>
      </div>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/login?role=admin'); }} className="text-red-500 underline">Logout</button>
    </div>
  );
};

export default AdminDashboard;