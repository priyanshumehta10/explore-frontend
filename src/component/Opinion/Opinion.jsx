import React, { useEffect, useState } from "react";
import OpinionCart from "./OpinionCart";
import AddOpinionHome from "../home/AddOpinionHome";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Ghost from "../../assets/Ghost.gif";
import { setTweets } from "../../store/tweetSlice";

const Opinion = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const tweetsBySelector = useSelector((state) => state.tweets.tweets);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/tweets/",
          {
            withCredentials: true,
          }
        );
        const opinionsData = response.data.data;
        dispatch(setTweets(opinionsData));
      } catch (error) {
        console.error("Error fetching opinions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpinions();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <img src={Ghost} alt="Loading..." className="w-32 h-32" />
      </div>
    );
  }

  return (
    <div className="bg-[#F4F7FC] min-h-screen">
      <div className="pb-0">
        <AddOpinionHome />
      </div>
      <div className="flex-grow p-6 space-y-6">
        {tweetsBySelector.length > 0 ? (
          tweetsBySelector.map((opinion) => (
            <OpinionCart key={opinion._id} opinion={opinion} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No opinions yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opinion;
