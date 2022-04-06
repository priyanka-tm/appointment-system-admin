import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Appointment from './pages/Appointment';
import Prescription from './pages/Prescription';
import Patient from './pages/Patient';
import NotFound from './pages/Page404';
import Doctor from './pages/Doctor';
import Login from './pages/Login';
import Department from './pages/Department';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        // { path: 'user', element: <User /> },
        { path: 'patient', element: <Patient /> },
        { path: 'doctor', element: <Doctor /> },
        { path: 'department', element: <Department /> },
        { path: 'appointment', element: <Appointment /> },
        { path: 'prescription', element: <Prescription /> },  
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '/dashboard', element: <Navigate to="/dashboard" /> },
        { path: '404', element: <NotFound /> }
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
