import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/admin');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="bg-white border rounded-lg shadow p-4 mb-6 flex flex-wrap gap-3">
          <NavLink to="/admin/dashboard" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Overview</NavLink>
          <NavLink to="/admin/students" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Students</NavLink>
          <NavLink to="/admin/teachers" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Teachers</NavLink>
          <NavLink to="/admin/classes" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Classes</NavLink>
          <NavLink to="/admin/subjects" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Subjects</NavLink>
          <NavLink to="/admin/announcements" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Announcements</NavLink>
          <NavLink to="/admin/attendance" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Attendance</NavLink>
          <NavLink to="/admin/results" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Results</NavLink>
          <NavLink to="/admin/timetable" className={({ isActive }) => `px-3 py-1.5 rounded ${isActive ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>Timetable</NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;


