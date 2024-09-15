import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addData } from '../../store/videoSlice';
import VideoCart from './VideoCart.jsx';
import SkeletonVideo from '../skeleton/SkeletonVideo.jsx';

const Videos = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/videos/', { withCredentials: true });
        const videosData = response.data.data.docs;
        setVideos(videosData);
        dispatch(addData(videosData));
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [dispatch]);

  if (loading) {
    // Render a list of skeleton loaders while the data is being fetched
    return (
      <div className="p-4 space-y-4">
        {Array(4).fill().map((_, index) => (
          <SkeletonVideo key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <VideoCart videos={videos} />
    </div>
  );
};

export default Videos;
