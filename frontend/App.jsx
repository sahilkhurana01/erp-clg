import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RoleSelectionPage from './RoleSelectionPage';
import Login from './Login';
import StudentsPage from './pages/students';
import TeachersPage from './pages/teachers';
import ClassesPage from './pages/classes';
import AdminDashboard from './pages/admin-dashboard';
import TeacherDashboard from './pages/teacher-dashboard';
import StudentDashboard from './pages/student-dashboard';
import AdminAddUser from './pages/admin-add-user';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RoleSelectionPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
      <Route path="/teachers" element={<ProtectedRoute><TeachersPage /></ProtectedRoute>} />
      <Route path="/classes" element={<ProtectedRoute><ClassesPage /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/teacher-dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
      <Route path="/student-dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route path="/admin-add-user" element={<ProtectedRoute><AdminAddUser /></ProtectedRoute>} />
    </Routes>
  </Router>
);

export default App;
