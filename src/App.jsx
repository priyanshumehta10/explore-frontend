import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './component/index';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import SkeletonFooter from './component/skeleton/SkeletonFooter';
import SkeletonHeader from './component/skeleton/SkeletonHeader';

function App() {
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', { withCredentials: true });
        const userData = response.data.data.user;
  
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
  
    fetchCurrentUser();
  }, [dispatch]);
  
  return (
    <div className='min-h-screen flex flex-wrap bg-gray-100'>
      {loading ? (
        <>
          {/* Skeleton loaders for header and footer */}
          <SkeletonHeader />
          <main>
            {/* Optional: Add skeleton loading content for the main section */}
            <div className='flex flex-col items-center justify-center w-full p-4'>
              {/* Example of main content skeletons */}
              <div className='w-full max-w-md space-y-4'>
                <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                <div className='h-4 bg-gray-300 rounded w-full'></div>
              </div>
            </div>
          </main>
          <SkeletonFooter />
        </>
      ) : (
        <div className='w-full'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
