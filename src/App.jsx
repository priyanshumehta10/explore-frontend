import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import axios from 'axios';
import { Footer, Header } from './component/index';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const initializeUser = () => {
      const storedUserData = localStorage.getItem('userData');
      const storedStatus = localStorage.getItem('status');

      if (storedUserData && storedStatus) {
        const userData = JSON.parse(storedUserData);
        const data = userData.data
        console.log(data);
        
        dispatch(login( data ));
        setLoading(false);
      } else {
        fetchCurrentUser(); // Fetch user data if not available in localStorage
      }
    };
    if (userStatus) {
      
      const fetchCurrentUser = async () => {
        try {
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', { withCredentials: true });
        const userData = response.data;
        
        if (userData) {
          dispatch(login({ userData }));
          localStorage.setItem('userData', JSON.stringify(userData));
          localStorage.setItem('status', JSON.stringify(true));
        } else {
          dispatch(logout());
          localStorage.removeItem('userData');
          localStorage.removeItem('status');
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(logout());
        localStorage.removeItem('userData');
        localStorage.removeItem('status');
      } finally {
        setLoading(false);
      }
    }
    };

    initializeUser()  
  }, [dispatch]);

  return (
    <div className='min-h-screen flex flex-wrap bg-gray-100'>
      {loading ? (
        <div className='flex items-center justify-center h-screen w-full'>
          <p className='text-xl text-gray-700'>Loading...</p>
        </div>
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
