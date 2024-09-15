// SkeletonRelatedVideos.js
import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const SkeletonRelatedVideos = () => {
  return (
    <div className="flex flex-col space-y-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex space-x-3">
          <SkeletonLoader width="100px" height="60px" borderRadius="4px" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader width="80%" height="16px" />
            <SkeletonLoader width="60%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonRelatedVideos;
