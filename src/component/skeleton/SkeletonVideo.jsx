import React from "react";

const SkeletonVideo = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg p-4 pb-0">
      {/* Skeleton for Thumbnail */}
      <div className="mb-1 bg-[#E9E6F3] rounded-2xl h-44 w-full"></div>
      {/* Skeleton for Avatar and Title */}
      <div className="flex items-center mt-2">
        <div className="w-9 h-9 bg-[#E9E6F3] rounded-full mr-3"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#E9E6F3] rounded w-3/4"></div>
          <div className="h-4 bg-[#E9E6F3] rounded w-1/2"></div>
        </div>
      </div>
      {/* Skeleton for Channel Name */}
      <div className="h-3 bg-[#E9E6F3] rounded w-1/4 mt-2 ml-12"></div>
      {/* Skeleton for Views and Time */}
      <div className="h-3 bg-[#E9E6F3] rounded w-1/3 mt-2 ml-12"></div>
    </div>
  );
};

export default SkeletonVideo;
