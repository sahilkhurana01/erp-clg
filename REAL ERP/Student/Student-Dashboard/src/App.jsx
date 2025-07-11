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
      path: "/home",
      element: <Home />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/marks",
      element: <Marks />
    },
    {
      path: "/notifications",
      element: <Notifications />
    },
    {
      path: "/editprofile",
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
