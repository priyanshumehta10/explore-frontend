import React, { useState } from 'react';
import MainLogo from '../MainLogo';
import { FaTimes, FaUpload, FaComments, FaFire, FaUser, FaSignOutAlt } from 'react-icons/fa';
import LogoutBtn from '../LogoutBtn';

const Header = () => {
  const [activeNav, setActiveNav] = useState('');
  const [isUploadActive, setIsUploadActive] = useState(false); // State to track upload button click

  const handleNavClick = (section) => {
    setActiveNav(section);
  };

  const handleUploadClick = () => {
    setIsUploadActive(!isUploadActive); // Toggle the active state
  };

  return (
    <div className='px-4 py-3 bg-[#E9E6F3]'>
      <header className="bg-[#CDC4E3] flex items-center justify-between p-3 mx-auto max-w-6xl" style={{ borderRadius: '20px', height: '60px' }}>
        {/* Logo Section */}
        <div className="flex items-center hover:font-bold px-2">
          <MainLogo width='30px' header="true" />
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
            <a
              href="#opinion"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${activeNav === 'opinion' ? 'bg-white' : ''}`}
              onClick={() => handleNavClick('opinion')}
            >
              <FaComments className="mr-1" /> Opinion
            </a>
            <a
              href="#trending"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${activeNav === 'trending' ? 'bg-white' : ''}`}
              onClick={() => handleNavClick('trending')}
            >
              <FaFire className="mr-1" /> Trending
            </a>
            <a
              href="#me"
              className={`px-3 py-1 flex items-center rounded-md hover:scale-105 transform transition-transform duration-200 hover:shadow-md ${activeNav === 'me' ? 'bg-white' : ''}`}
              onClick={() => handleNavClick('me')}
            >
              <FaUser className="mr-1" /> Me
            </a>
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

      {/* Always Visible Bottom Bar */}
      <div className="fixed inset-x-0 bottom-0 bg-[#CDC4E3] flex items-center justify-between p-3 md:hidden" style={{ height: '50px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)' }}>
        <nav className="flex items-center space-x-4 flex-grow">
          <a
            href="#opinion"
            className={`px-2 py-1 flex items-center rounded-md ${activeNav === 'opinion' ? 'bg-white' : ''}`}
            onClick={() => handleNavClick('opinion')}
          >
            <FaComments className="mr-1" />
          </a>
          <a
            href="#trending"
            className={`px-2 py-1 flex items-center rounded-md ${activeNav === 'trending' ? 'bg-white' : ''}`}
            onClick={() => handleNavClick('trending')}
          >
            <FaFire className="mr-1" />
          </a>
          <a
            href="#me"
            className={`px-2 py-1 flex items-center rounded-md ${activeNav === 'me' ? 'bg-white' : ''}`}
            onClick={() => handleNavClick('me')}
          >
            <FaUser className="mr-1" />
          </a>
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

        {/* Log Out Button with Icon */}
        <button className="px-2 py-1 text-xs rounded-md flex items-center space-x-1 bg-[#fc1a1a] text-white">
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
};

export default Header;
