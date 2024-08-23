import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import backgroundTweet from "../../assets/backgroundTweet.png";
import axios from "axios";
import { removeTopTweets, addTopTweets } from "../../store/topTweetSlice";
import tweet from "../../assets/tweet.png";
import moment from "moment";

const ViralOpinions = () => {
  const [loading, setLoading] = useState(true);
  const [openion, setOpenion] = useState([]);
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
    <div
      className="bg-[#E9E6F3] flex flex-col items-center p-4 lg:p-4"
      style={{ minHeight: "45vh" }}
    >
      <div className="flex items-center mb-3 mr-auto">
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
            style={{ width: "100%", height: "100%" }}
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
      <div className="w-full flex justify-center space-x-4">
        {openion.length > 0 ? (
          openion.slice(0, 3).map((opinion) => (
            <div
              key={opinion.tweetId}
              className="bg-white bg-opacity-100 border p-4 rounded-2xl flex-shrink-2"
              style={{
                backgroundImage: `url(${backgroundTweet})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "300px",
                border: "3px solid #9E8DC9",
              }}
            >
              <div className="flex items-center mb-2">
                <img
                  src={opinion.avatar}
                  alt="User Avatar"
                  className="rounded-full"
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
              <p className="text-sm mb-4 line-clamp-2" style={{
            fontFamily: "Moderustic",
            fontOpticalSizing: "auto",
  fontWeight: 500,
  fontStyle: "normal",
          }}>{opinion.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No viral opinions yet.</p>
        )}
      </div>
    </div>
  );
};

export default ViralOpinions;
