import React, { useEffect, useState } from "react";
import Ghost from "../../assets/Ghost.gif";
import ReactPlayer from "react-player";
import { FaHeart, FaShare } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoPlayer = ({ videoDetails, loading }) => {
  const [liked, setLiked] = useState(false);
  const [share, setShare] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  let userId = useSelector((state) => state.auth.userData);
      userId = userId._id
      console.log(userId);
      
  useEffect(() => {
    const checkSubscription = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/subscriptions/c/${videoDetails.owner}`,
        {
          withCredentials: true,
        }
      );
      const isSub = response.data.data;
      
      const isUserSubscribed = await isSub.some(
        (sub) => sub.subscriberId === userId
      );

      setSubscribed(isUserSubscribed);
    };

    checkSubscription();
  }, [videoDetails.owner]);


  const handleSubscribe = async () => {
    try {
      const subscription = await axios.post(
        `http://localhost:8000/api/v1/subscriptions/c/${videoDetails.owner}`,
        {},
        {
          withCredentials: true,
        }
      );

      const status = subscription.data.message;
      
      if (status === "subscribed") {
        setSubscribed(true);
      } else if (status === "unsubscribed") {
        setSubscribed(false);
      }
    } catch (error) {
      console.error("Error subscribing/unsubscribing:", error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShare(!share);
    setTimeout(() => {
      setShare(false);
    }, 1000); // 2000 milliseconds = 2 seconds
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <img src={Ghost} alt="Loading..." className="w-32 h-32" />
      </div>
    );
  }

  if (!videoDetails) {
    return <div className="text-center p-4">No video details available</div>;
  }

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden">
      {/* Video Player */}
      <div className="relative w-full h-0 pb-[56.25%] md:ml-8 rounded-lg overflow-hidden">
        {/* 16:9 aspect ratio */}
        <ReactPlayer
          url={videoDetails.videoFile}
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0 rounded-xl"
        />
      </div>
      {/* Video Details */}
      <div className="md:pl-5 md:pt-1 pt-0 mt-0">
        <h1 className="text-xl font-bold mb-2 md:ml-4 line-clamp-2">
          {videoDetails.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:ml-4">
          <div className="text-sm text-gray-500 mb-2 md:hidden">
            {videoDetails.views} views •{" "}
            {new Date(videoDetails.createdAt).toDateString()}
          </div>
          <div className="flex items-center mb-2 w-full">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={videoDetails.avatar}
              alt="Owner Avatar"
            />
            <div className="text-gray-700 flex-grow">
              <p className="font-semibold text-xl">{videoDetails.username}</p>
              <p className="text-sm text-gray-500">
                {videoDetails.subscriberCount} subscribers
              </p>
            </div>
            {/* Subscribe Button */}
            <button
              className={`ml-4 px-4 py-2 text-sm font-semibold rounded hover:scale-105 ${
                subscribed
                  ? "bg-customColor border-[#9E8DC9] border border-3 text-[#000]"
                  : "bg-red-600 text-white"
              } transition-colors duration-300`}
              onClick={handleSubscribe}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>

        <div className="flex space-x-4 md:mb-4">
          <div
            onClick={handleLike}
            className={`flex ${
              liked ? "bg-red-500" : " bg-[#CDC4E3]"
            } p-2 px-5 rounded-ss-3xl rounded-bl-3xl `}
          >
            <button
              className={`flex-1 items-center justify-center transition-transform text-white duration-200 ${
                liked ? "transform scale-125" : "transform scale-100"
              }`}
            >
              <FaHeart className="w-6 h-6" />
            </button>
            <p className="flex-1 pl-5">32</p>
          </div>
          <div
            onClick={handleShare}
            className={`flex ${
              share ? "bg-cyan-200" : " bg-[#CDC4E3]"
            } p-2 m-0 px-5 rounded-se-3xl rounded-e-3xl`}
          >
            <button className={`flex items-center space-x-2 ${
                share ? "transform scale-125" : "transform scale-100"
              } text-blue-600 hover:text-blue-800`}>
              <FaShare className="w-6 h-6" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="hidden md:block text-sm text-gray-500">
          {videoDetails.views} views •{" "}
          {new Date(videoDetails.createdAt).toDateString()}
        </p>
        <div className="text-gray-800 md:flex md:justify-between md:items-center">
          <div>
            <p>
              {showFullDescription
                ? videoDetails.description
                : `${videoDetails.description.substring(0, 100)}...`}
            </p>
            <button
              onClick={toggleDescription}
              className="text-blue-600 hover:underline mt-2"
            >
              {showFullDescription ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
