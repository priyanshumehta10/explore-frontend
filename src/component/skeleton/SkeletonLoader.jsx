// SkeletonLoader.js
import React from "react";

const SkeletonLoader = ({ width, height, borderRadius }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: width || "100%",
        height: height || "100%",
        borderRadius: borderRadius || "4px",
      }}
    ></div>
  );
};

export default SkeletonLoader;
