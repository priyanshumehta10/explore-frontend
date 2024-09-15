import React from "react";

const SkeletonVideoCart = () => {
  return (
    <div className="bg-white rounded-lg p-4 pb-0 animate-pulse">
      <div className="mb-1 border-0.5 border-zinc-600 rounded-2xl overflow-hidden">
        <div className="w-full h-44 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex items-center mt-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 mr-3"></div>
        <div className="flex-1 flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 rounded mt-2 w-2/3"></div>
      <div className="flex justify-between text-xs mt-2">
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonVideoCart;
