import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './component/index';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const userStatus = useSelector((state) => state.auth.status);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log('Fetching current user'); // Log when fetchCurrentUser is called
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/current-user', { withCredentials: true });
        const userData = response.data.data.user;
        console.log('API Response:', userData); // Log the API response
  
        if (userData) {
          dispatch(login(userData)); // Dispatch login action with user data
        } else {
          dispatch(logout()); // Log out if no user data is returned
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(logout()); // Log out on error
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    fetchCurrentUser(); // Call the function on component mount
  }, [dispatch]); 
  
  return (
    <div className='min-h-screen flex flex-wrap bg-gray-100'>
      {/* Conditional rendering based on loading state */}
      {loading ? (
        <div className='flex items-center justify-center h-screen w-full'>
          <p className='text-xl text-gray-700'>Loading...</p>
        </div>
      ) : (
        <div className='w-full'>
          <Header />
          <main>
            {/* Outlet for rendering nested routes */}
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
