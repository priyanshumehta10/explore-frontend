import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainLogo from '../MainLogo';
import { FaTimes, FaUpload, FaComments, FaFire, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LogoutBtn from '../LogoutBtn';

const Header = () => {
  const [isUploadActive, setIsUploadActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  const handleUploadClick = () => {
    setIsUploadActive(!isUploadActive);
    navigate('/upload'); // Navigate to the /upload route
  };

  return (
    <div className='sticky top-0 z-50'>
      {/* Main Header */}
      <header className="bg-[#CDC4E3] flex items-center justify-between p-3 mx-auto max-w-6xl" style={{ borderRadius: '20px', height: '60px' }}>
        {/* Logo Section */}
        <div className="flex items-center hover:font-bold px-2">
          <Link to="/" className="flex items-center">
            <MainLogo width='30px' header="true" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-grow max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl pl-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-sm border-2 border-[#9E8DC9] bg-[#ECE6F0] rounded-md pr-10"
            style={{ borderRadius: '18px' }}
          />
          <FaTimes className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>

        {/* Desktop Navigation and Buttons */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <nav className="flex space-x-4 text-sm px-4">
            <Link
              to="/opinion"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${location.pathname === '/opinion' ? 'bg-white' : ''}`}
            >
              <FaComments className="mr-1" /> Opinion
            </Link>
            <Link
              to="/trending"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${location.pathname === '/trending' ? 'bg-white' : ''}`}
            >
              <FaFire className="mr-1" /> Trending
            </Link>
            <Link
              to="/me"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${location.pathname === '/me' ? 'bg-white' : ''}`}
            >
              <FaUser className="mr-1" /> Me
            </Link>
          </nav>

          {/* Upload Button */}
          <div className='pr-2'>
            <button
              onClick={handleUploadClick}
              className={`p-2 rounded-full hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${
                isUploadActive ? 'bg-white text-[#9E8DC9]' : 'bg-[#9E8DC9] text-white'
              }`}
            >
              <FaUpload />
            </button>
          </div>
          <LogoutBtn />
        </div>
      </header>

      {/* Fixed Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 bg-[#E9E6F3] flex items-center justify-between p-3 md:hidden" style={{ height: '50px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)' }}>
        <nav className="flex items-center space-x-4 flex-grow">
          <Link
            to="/opinion"
            className={`px-2 py-1 flex items-center rounded-md ${location.pathname === '/opinion' ? 'bg-white' : ''}`}
          >
            <FaComments className="mr-1" />
          </Link>
          <Link
            to="/trending"
            className={`px-2 py-1 flex items-center rounded-md ${location.pathname === '/trending' ? 'bg-white' : ''}`}
          >
            <FaFire className="mr-1" />
          </Link>
          <Link
            to="/me"
            className={`px-2 py-1 flex items-center rounded-md ${location.pathname === '/me' ? 'bg-white' : ''}`}
          >
            <FaUser className="mr-1" />
          </Link>
        </nav>

        {/* Upload Button */}
        <div className='px-4'>
          <button
            onClick={handleUploadClick}
            className={`p-2 rounded-full ${
              isUploadActive ? 'bg-white text-[#9E8DC9]' : 'bg-[#9E8DC9] text-white'
            }`}
          >
            <FaUpload />
          </button>
        </div>

        {/* Log Out Button */}
        <button className="px-2 py-1 text-xs rounded-md flex items-center space-x-1 bg-[#fc1a1a] text-white">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Header;
