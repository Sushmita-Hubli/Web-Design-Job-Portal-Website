import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Pages/Home';
import About from './Pages/About';
import CompanyShowcase from './Pages/CompanyShowcase';
import Contact from './Pages/Contact';
import JobListing from './Pages/JobListing';
import AdminEmployees from './Pages/AdminEmployees';
import PrivateRoute from './Components/PrivateRoute'; // Import PrivateRoute
import AddJobs from './Pages/AddJobs';
// Simulated auth functions
const isAuthenticated = () => localStorage.getItem('isAuthenticated') === 'true';
const getUserType = () => localStorage.getItem('userType'); // 'admin' or 'employee'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "home", element: <Home /> },
  { path: "about", element: <About /> },
  { path: "companyshowcase", element: <CompanyShowcase /> },
  { path: "contact", element: <Contact /> },
  { path: "joblisting", element: <JobListing /> },
  { path: "adminemployees", element: <AdminEmployees /> },  // Define route for AddJobs page
  { path: "addjobs", element: <AddJobs /> },  // Define route for AddJobs page
 
  {
    path: "admin/employees",
    element: (
      <PrivateRoute isAdmin={true} isAuthenticated={isAuthenticated} userType={getUserType}>
        <AdminEmployees />
      </PrivateRoute>
    ),
  },
  { path: "login", element: <App /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
