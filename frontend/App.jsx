import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import useAuthStore from './store/authStore';
import RoleSelectionPage from "./RoleSelectionPage";
import StudentLogin from "./Pages/StudentLogin";
import TeacherLogin from "./Pages/TeacherLogin";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboardApp from "./Pages/Admin-Dashboard/src/index";
import StudentDashboard from "./Pages/Student-Dashboard/src/Pages/Home";
import TeacherDashboard from "./Pages/Teacher/src/Pages/Home";
import "./App.css";
import Home from "./Pages/Student-Dashboard/src/Pages/Home";
import Profile from "./Pages/Student-Dashboard/src/Pages/Profile";
import Marks from "./Pages/Student-Dashboard/src/Pages/Marks";
import Notifications from "./Pages/Student-Dashboard/src/Pages/Notifications";
import EditProfile from "./Pages/Student-Dashboard/src/Pages/EditProfile";
import TimeTable from "./Pages/Teacher/src/Pages/TimeTable";
import Students from "./Pages/Teacher/src/Pages/Students";
import TeachersMarks from "./Pages/Teacher/src/Pages/Marks" ;
import Attendance from "./Pages/Teacher/src/Pages/Attendance";
import Payroll from "./Pages/Teacher/src/Pages/Payroll";
import TeachersProfile from "./Pages/Teacher/src/Pages/Profile";


// Create the modern route configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleSelectionPage />
  },
  {
    path: "/student",
    element: <StudentLogin />
  },
  {
    path: "/teacher",
    element: <TeacherLogin />
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/admin/*",
    element: <AdminDashboardApp />
  },
  {
    path: "/student/dashboard",
    element: <StudentDashboard />
  },
  {
    path: "/teacher/dashboard",
    element: <TeacherDashboard />
  },
  {
    path: "/student/home",
    element: <Home />
  },
  {
    path: "/student/profile",
    element: <Profile />
  },
  {
    path: "/student/marks",
    element: <Marks />
  },
  {
    path: "/student/notifications",
    element: <Notifications />
  },
  {
    path: "/student/editprofile",
    element: <EditProfile />
  },
  {
    path: "/teacher/timetable",
    element: <TimeTable />
  },
  {
    path: "/teacher/students",
    element: <Students />
  },
  {
    path: "/teacher/marks",
    element: <TeachersMarks />
  },
  {
    path: "/teacher/attendance",
    element: <Attendance />
  },
  {
    path: "/teacher/payroll",
    element: <Payroll />
  },
  {
    path: "/teacher/profile",
    element: <TeachersProfile />
  },
]);

function App() {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    // Initialize auth store on app start
    initialize();
  }, [initialize]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
