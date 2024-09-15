import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import RelatedVideos from "./RelatedVideos";
import CommentsSection from "./CommentsSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import SkeletonVideoPlayer from "../skeleton/SkeletonVideoPlayer";
import SkeletonRelatedVideos from "../skeleton/SkeletonRelatedVideos";
import { FaTimes } from "react-icons/fa"; // Import FaTimes for close icon

const OneVideo = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [page, setPage] = useState(1); // Initialize page as 1
  const { videoId } = useParams();

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/${videoId}`,
          { withCredentials: true }
        );
        setVideoDetails(response.data.data);
        console.log(videoDetails);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);



  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/comments/${videoId}/count`,
          { withCredentials: true }
        );
        setCommentsCount(response.data.data.count); // Adjust based on API response
      } catch (error) {
        console.error("Error fetching comments count:", error);
      }
    };

    fetchCommentsCount();
  }, [videoId]);

  const toggleCommentsModal = () => {
    setShowCommentsModal(!showCommentsModal);
  };

  if (loading) {
    return (
      <div className="flex flex-col bg-white shadow-none md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
        <div className="md:w-3/5">
          <SkeletonVideoPlayer />
          <SkeletonRelatedVideos />
        </div>
        <div className="md:w-2/5">
          <SkeletonRelatedVideos />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white shadow-none md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
      <div className="md:w-3/5">
        <VideoPlayer videoDetails={videoDetails} />
        {/* Button to open comments in modal on small screens */}
        <div className="bg-[#E9E6F3] rounded-3xl mt-3" onClick={toggleCommentsModal}>
          <button className="md:hidden text-black text-xl font-semibold pl-5 pb-5 mt-4">
            Comments ({commentsCount})
          </button>
        </div>
        {/* Show comments normally on larger screens */}
        <div className="hidden md:block">
          <CommentsSection videoId={videoId} page={page} setPage={setPage} commentsCount={commentsCount} />
        </div>
      </div>
      <div className="md:w-2/5">
        <RelatedVideos  />
      </div>

      {/* Modal for comments on small screens */}
      {showCommentsModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
          <div
            className="bg-white w-full h-[75%] rounded-t-lg p-6 transition-transform duration-300 ease-in-out transform translate-y-full"
            style={{ transform: showCommentsModal ? 'translateY(0)' : 'translateY(100%)' }}
          >
            <button
              className="absolute border-red-400 border-2 top-4 mb-5 text-red-500 text-2xl"
              onClick={toggleCommentsModal}
            >
              <FaTimes />
            </button>
            <div className="overflow-y-auto h-full pt-3 pb-8">
              <CommentsSection videoId={videoId} page={page} setPage={setPage} commentsCount={commentsCount} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneVideo;
