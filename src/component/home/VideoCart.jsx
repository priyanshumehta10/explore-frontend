import React from "react";
import moment from "moment";
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'; // Using Heroicons for the three-dot icon

const VideoCart = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 gap-6 bg-white md:grid-cols-2 lg:grid-cols-3 p-4">
      {videos.map((video) => (
        <div key={video._id} className="bg-white rounded-lg p-4">
          {/* Thumbnail Image with Border and Lazy Loading */}
          <div className="mb-1 border-2 border-zinc-600 rounded-2xl overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              loading="lazy"
              className="w-full h-48 object-cover"
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
                  fontWeight: 600,
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
          <p className="text-gray-600  pl-12">{video.username}</p>
          {/* Views and Time since upload in one line */}
          <div className="text-sm pl-12 text-gray-500 flex justify-between">
            <p>{video.views} views</p>
            <p>|  {moment(video.createdAt).fromNow()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoCart;
