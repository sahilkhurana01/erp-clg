import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RoleSelectionPage from "./RoleSelectionPage";
import StudentLogin from "./Pages/StudentLogin";
import TeacherLogin from "./Pages/TeacherLogin";
import AdminLogin from "./Pages/AdminLogin";
import "./App.css";

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
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
