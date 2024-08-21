import React, { useEffect, useState } from 'react';
import VideoCart from './VideoCart';
import { useDispatch } from "react-redux";
import axios from "axios";

const Videos = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]); // State to hold the fetched videos
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVideos = async () => {
            console.log("Fetching videos"); // Log when fetchVideos is called
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/v1/videos/",
                    { withCredentials: true }
                );
                const videosData = response.data.data.docs;
                console.log("API Response:", videosData); // Log the API response
                setVideos(videosData); // Store the fetched videos in state
            } catch (error) {
                console.error("Error fetching videos:", error); // Log out on error
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchVideos(); // Call the function on component mount
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <div>
            {/* Pass the videos data as a prop to the VideoCart component */}
            <VideoCart videos={videos} />
        </div>
    );
};

export default Videos;
