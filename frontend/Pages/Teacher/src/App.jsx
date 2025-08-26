import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Students from './Pages/Students';
import Marks from './Pages/Marks';
import Attendance from './Pages/Attendance';
import Payroll from './Pages/Payroll';
import TimeTable from './Pages/TimeTable';
import Layout from './layout';
import './App.css';
import Profile from './Pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/students',
    element: (
      <Layout>
        <Students />
      </Layout>
    ),
  },
  {
    path: '/marks',
    element: (
      <Layout>
        <Marks />
      </Layout>
    ),
  },
  {
    path: '/attendance',
    element: (
      <Layout>
        <Attendance />
      </Layout>
    ),
  },
  {
    path: '/payroll',
    element: (
      <Layout>
        <Payroll />
      </Layout>
    ),
  },
 
  {
    path: '/timetable',
    element: (
      <Layout>
        <TimeTable />
      </Layout>
    ),
  },
  {
    path: '/profile',
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
