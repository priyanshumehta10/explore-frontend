import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { HiDotsVertical } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const RelatedVideos = () => {
  const [videoDetails, setVideoDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/videos/?page=1&limit=16', {
          withCredentials: true,
        });
        const videosData = response.data.data.docs;
        setVideoDetails(videosData);
        dispatch(addData(videosData));
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [dispatch]);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b">Related Videos</h2>
      <div className="space-y-4 p-4">
        {loading ? (
          <>
            {Array(16)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse flex items-start space-x-3 p-2 pb-1 rounded-lg bg-[#E9E6F3]"
                >
                  <div className="w-32 h-18 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
          </>
        ) : videoDetails.length > 0 ? (
          videoDetails.map((video) => (
            <NavLink
              to={`/${video._id}`}
              key={video._id}
              className="relative flex items-start space-x-4 p-2 pb-1 rounded-lg bg-[#E9E6F3] hover:bg-[#E3DEE9] transition duration-150 ease-in-out"
            >
              <div className="flex space-x-4">
                <img
                  className="w-32 h-20 object-cover rounded-lg"
                  src={video.thumbnail || 'https://via.placeholder.com/128x72.png?text=No+Thumbnail'}
                  alt="Related Video Thumbnail"
                  style={{ width: '162px', height: '90px' }} // Set fixed size for the thumbnail
                />
                <div>
                  <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                  <p className="text-gray-600 text-xs mt-1">{video.username}</p>
                  <p className="text-gray-600 text-xs">
                    {video.views.toLocaleString()} views • {moment(video.createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <button className="absolute top-3 right-2 text-gray-500 hover:text-gray-700">
                <HiDotsVertical size={16} />
              </button>
            </NavLink>
          ))
        ) : (
          <p className="text-gray-600 text-center">No related videos found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedVideos;
