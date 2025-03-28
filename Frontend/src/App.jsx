import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const App = () => {
  const { user, checkAuth, isCheckingAuth, onLineUsers } = useAuthStore();
  const { theme } = useThemeStore();


  console.log('Online Users: ', onLineUsers);

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={'/'} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to={'/login'} />} />
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen w-full text-5xl font-bold">
              404 Not Found
            </div>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
