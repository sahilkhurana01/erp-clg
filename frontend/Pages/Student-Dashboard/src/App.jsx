import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// Pages
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Marks from './Pages/Marks';
import Notifications from './Pages/Notifications';
import EditProfile from './Pages/EditProfile';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
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
    }
  ])
  return (
    <>
      <RouterProvider router={router} />


    </>
  );
}

export default App;
