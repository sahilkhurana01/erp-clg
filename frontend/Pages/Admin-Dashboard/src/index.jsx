import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout';
import Overview from './pages/Overview';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import Announcements from './pages/Announcements';
import Attendance from './pages/Attendance';

const AdminDashboardApp = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Overview />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboardApp;


