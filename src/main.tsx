import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.tsx';
import Blogs from './pages/Blogs.tsx';
import Forums from './pages/Forums.tsx';
import Course from './pages/Course.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/blogs",
    element: <Blogs />,
  },
  {
    path: "/forums",
    element: <Forums />,
  },
  {
    path: "/course",
    element: <Course />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);