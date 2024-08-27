import React from 'react';

const RelatedVideos = ({ relatedVideos }) => {
  return (
    <div className="w-full  bg-white rounded-lg  overflow-hidden">
      <h2 className="text-xl font-semibold p-4 border-b">Related Videos</h2>
      <div className="space-y-4 p-4">
        {relatedVideos.length > 0 ? (
          relatedVideos.map((video) => (
            <div key={video._id} className="flex space-x-4 p-2 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out">
              <img
                className="w-32 h-18 object-cover rounded-lg"
                src={video.thumbnail || "https://via.placeholder.com/128x72.png?text=No+Thumbnail"}
                alt="Related Video Thumbnail"
              />
              <div>
                <h3 className="text-sm font-semibold line-clamp-2">{video.title}</h3>
                <p className="text-gray-600 text-xs mt-1">{video.username}</p>
                <p className="text-gray-600 text-xs">{video.views.toLocaleString()} views • {video.timeAgo}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No related videos found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedVideos;
