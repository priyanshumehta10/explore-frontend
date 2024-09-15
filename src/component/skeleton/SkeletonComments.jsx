// SkeletonComments.js
import React from "react";
import SkeletonLoader from "./SkeletonLoader";

const SkeletonComments = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex space-x-3">
          <SkeletonLoader width="48px" height="48px" borderRadius="50%" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader width="70%" height="16px" />
            <SkeletonLoader width="50%" height="16px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonComments;
