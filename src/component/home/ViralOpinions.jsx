import React from "react";
import backgroundTweet from "../../assets/backgroundTweet.png";
import tweet from "../../assets/tweet.png";
import moment from "moment";

const ViralOpinions = ({openion}) => {
  return (
    <div
      className="bg-[#E9E6F3] flex flex-col items-center p-4 lg:p-4"
      style={{ minHeight: "45vh" }}
    >
      {/* Header Section */}
      <div className="flex items-center mb-5 mr-auto">
        <div
          className="rounded-full"
          style={{
            width: "60px",
            height: "60px",
            overflow: "hidden",
            marginRight: "10px",
          }}
        >
          <img
            src={tweet}
            alt="Logo"
            className="w-full h-full"
          />
        </div>
        <h2
          className="text-2xl font-bold ml-5"
          style={{
            fontFamily: "Inknut Antiqua",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Some Viral Opinions....
        </h2>
      </div>

      {/* Opinions Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {openion.length > 0 ? (
          openion.slice(0, 3).map((opinion) => (
            <div
              key={opinion.tweetId}
              className="bg-white bg-opacity-5 border p-4 rounded-2xl"
              style={{
                backgroundImage: `url(${backgroundTweet})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "3px solid #9E8DC9",
              }}
            >
              <div className="flex items-center mb-2">
                <img
                  src={opinion.avatar}
                  alt="User Avatar"
                  className="rounded-full border-slate-950 border"
                  style={{ width: "40px", height: "40px", marginRight: "10px" }}
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <p className="text-lg font-medium">{opinion.username}</p>
                    <p className="text-sm text-gray-500">
                      ~{moment(opinion.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {opinion.likeCount} likes
                  </p>
                </div>
              </div>
              <p
                className="text-sm mb-4 line-clamp-2 bg-[#E9E6F3]"
                style={{
                  fontFamily: "Moderustic",
                  fontOpticalSizing: "auto",
                  fontWeight: 500,
                  fontStyle: "normal",
                }}
              >
                {opinion.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No viral opinions yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViralOpinions;
