// SkeletonVideoPlayer.js
import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const SkeletonVideoPlayer = () => {
  return (
    <div className="flex flex-col space-y-4">
      <SkeletonLoader width="100%" height="360px" borderRadius="8px" />
      <div className="flex items-center space-x-3">
        <SkeletonLoader width="48px" height="48px" borderRadius="50%" />
        <SkeletonLoader width="60%" height="24px" />
      </div>
      <SkeletonLoader width="80%" height="16px" />
    </div>
  );
};

export default SkeletonVideoPlayer;
