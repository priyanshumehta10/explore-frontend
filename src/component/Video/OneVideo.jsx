import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import RelatedVideos from "./RelatedVideos";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import axios from "axios";
import Ghost from "../../assets/Ghost.gif"

const OneVideo = () => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [commentsDetails, setCommentsDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [videoDetails, setVideoDetails] = useState(null);

  const { videoId } = useParams(); // Get the video ID from URL params

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/${videoId}`,
          { withCredentials: true }
        );
        setVideoDetails(response.data.data); // Set the video details
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);


  useEffect(() => {
    if (videoDetails) {
      const fetchRelatedVideos = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/videos/userVideos?userId=${videoDetails.owner_id}`,
            { withCredentials: true }
          );
          setRelatedVideos(response.data.data.docs); // Set the related videos
        } catch (error) {
          console.error("Error fetching related videos:", error);
        }
      };

      fetchRelatedVideos();
    }
  }, [videoDetails]);

  // Fetch comments when the videoId changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/comments/${videoId}`,
          { withCredentials: true }
        );
        setCommentsDetails(response.data.data); // Set the comments
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [videoId]);

  if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
          <img src={Ghost} alt="Loading..." className='w-32 h-32' />
        </div>
          ) // Show loading state while fetching
    }

  return (
    <div className="flex flex-col bg-white shadow-none md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-3/5">
        <VideoPlayer videoDetails={videoDetails} />
        <Comments commentsDetails={commentsDetails} />
      </div>
      <div className="md:w-2/5">
        <RelatedVideos relatedVideos={relatedVideos} />
      </div>
    </div>
  );
};

export default OneVideo;
