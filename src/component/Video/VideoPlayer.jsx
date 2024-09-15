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
  const [subsNumber, setSubsNumber] = useState();
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/v/${videoDetails._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      const status = response.data.message;
      if (status === "Video liked successfully") {
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      } else if (status === "Video unliked successfully") {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error Like/unLike:", error);
    }
  };

  let userId = useSelector((state) => state.auth.userData);
  userId = userId._id;

  useEffect(() => {
    const likeCount = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/likes/count/video/${videoDetails._id}`,
        {
          withCredentials: true,
        }
      );
      const isSub = response.data.data.likeCount;
      setLikeCount(isSub);
    };

    likeCount();
  }, [videoDetails.owner]);

  useEffect(() => {
    const checkIsLiked = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/v1/likes/isLiked/v/${videoDetails._id}`,
        {
          withCredentials: true,
        }
      );
      const isSub = response.data.data.isLiked;
      setLiked(isSub);
    };

    checkIsLiked();
  }, [videoDetails.owner]);

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

  useEffect(() => {
    const checkSubscribersNumber = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/subscriptions/c/${videoDetails.owner}`,
          {
            withCredentials: true,
          }
        );
        const isSub = response.data.data;

        // Count the number of elements in the isSub array
        const subscribersCount = isSub.length;
        setSubsNumber(subscribersCount);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    };

    checkSubscribersNumber();
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
        setSubsNumber((prev) => prev + 1);
      } else if (status === "unsubscribed") {
        setSubscribed(false);
        setSubsNumber((prev) => prev - 1);
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
    }, 1000); // 1000 milliseconds = 1 second
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    // Loading Skeleton Component
    return (
      <div className="p-4 space-y-4">
        <div className="skeleton w-full h-60 md:h-96 rounded-lg"></div>
        <div className="skeleton h-6 w-1/2 rounded"></div>
        <div className="flex items-center space-x-4">
          <div className="skeleton rounded-full h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="skeleton h-4 w-3/4 rounded"></div>
            <div className="skeleton h-4 w-1/2 rounded"></div>
          </div>
        </div>
        <div className="skeleton h-20 w-full rounded"></div>
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
                {subsNumber} subscribers
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

        <div className="flex space-x-4 md:pl-3 mb-4">
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
            <p className="flex-1 pl-5">{likeCount}</p>
          </div>
          <div
            onClick={handleShare}
            className={`flex ${
              share ? "bg-cyan-200" : " bg-[#CDC4E3]"
            } p-2 m-0 px-5 rounded-se-3xl rounded-e-3xl`}
          >
            <button
              className={`flex items-center space-x-2 ${
                share ? "transform scale-125" : "transform scale-100"
              } transition-transform duration-200`}
            >
              <FaShare className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className=" md:pl-3 md:mb-2 text-gray-800  bg-[#E9E6F3] hover:bg-[#E3DEE9] p-3 rounded-2xl" onClick={toggleDescription}>
          <div className="flex-1  text-sm m-0  text-gray-500 ">
            {videoDetails.views} views •{" "}
            {new Date(videoDetails.createdAt).toDateString()}
          </div>
          <div
            className={`${
              showFullDescription ? "line-clamp-none" : "line-clamp-2"
            }`}
          >
            {videoDetails.description}
          </div>
          <button
            className="text-blue-500"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
