import React, { useEffect, useState } from "react";
import moment from "moment";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import ViralOpinions from "./ViralOpinions";
import axios from "axios";
import { removeTopTweets, addTopTweets } from "../../store/topTweetSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const VideoCart = ({ videos }) => {

  const [openion, setOpenion] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentOpenions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/likes/topLiked",
          { withCredentials: true }
        );
        const userData = response.data.data;
        setOpenion(userData);

        if (userData) {
          dispatch(addTopTweets(userData));
        } else {
          dispatch(removeTopTweets());
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        dispatch(removeTopTweets());
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentOpenions();
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 gap-6 bg-white md:grid-cols-2 lg:grid-cols-3 p-4">
      {videos.map((video, index) => (
        <React.Fragment key={video._id}>
          <NavLink to={`/${video._id}`} className="bg-white rounded-lg p-4 pb-0 ">
            {/* Thumbnail Image with Border and Lazy Loading */}
            <div className="mb-1 border-0.5 border-zinc-600 rounded-2xl overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                className="w-full h-44 object-cover rounded-lg"
              />
            </div>
            {/* Avatar and Video Title with Three-Dot Icon */}
            <div className="flex items-center ">
              <img
                src={video.avatar}
                alt={video.username}
                className="w-9 h-9 rounded-full mr-3"
              />
              <div className="flex-1 flex items-center justify-between">
                <h3
                  className="text-lg font-semibold line-clamp-2"
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: 500,
                    fontStyle: "normal",
                  }}
                >
                  {video.title}
                </h3>
                <button className="text-gray-500 hover:text-gray-700">
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            {/* Channel Name */}
            <p className="text-gray-500 text-sm pl-12 mb-0">{video.username}</p>
            {/* Views and Time since upload in one line */}
            <div className="text-xs pl-12 text-gray-500 flex justify-between">
              <p>{video.views} views</p>
              <p>| {moment(video.createdAt).fromNow()}</p>
            </div>
          </NavLink>

          {/* Show the custom component/message after the first three videos */}
          {index === 5 && (
            <div className="col-span-full mt-6">
              <ViralOpinions openion={openion} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default VideoCart;
