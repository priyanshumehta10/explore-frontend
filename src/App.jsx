import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './component/index';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Ghost from './assets/Ghost.gif'; // Adjust the path to where your GIF is stored

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
        <div className='flex items-center justify-center h-screen w-full'>
          <img src={Ghost} alt="Loading..." className='w-32 h-32' />
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
