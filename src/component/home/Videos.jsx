import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import axios from "axios";
import Ghost from "../../assets/Ghost.gif"
import { addData } from '../../store/videoSlice';
import VideoCart from './VideoCart.jsx';

const Videos = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]); // State to hold the fetched videos
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVideos = async () => {
            // console.log("Fetching videos"); // Log when fetchVideos is called
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/videos/",
                    { withCredentials: true }
                );
                const videosData = response.data.data.docs;
                // console.log("API Response:", videosData); // Log the API response
                setVideos(videosData); 
                dispatch(addData(videosData))// Store the fetched videos in state
            } catch (error) {
                console.error("Error fetching videos:", error); // Log out on error
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchVideos(); // Call the function on component mount
    }, [dispatch]);
    

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
          <img src={Ghost} alt="Loading..." className='w-32 h-32' />
        </div>
          ) // Show loading state while fetching
    }

    return (
        <div>
            {/* Pass the videos data as a prop to the VideoCart component */}
            <VideoCart videos={videos} />
        </div>
    );
};

export default Videos;
