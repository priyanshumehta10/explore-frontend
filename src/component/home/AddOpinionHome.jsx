import React, { useState } from "react";
import tweet from "../../assets/tweet.png";
import { FaPaperPlane } from "react-icons/fa";
import backgroundTweet from "../../assets/backgroundTweet.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addTweet } from "../../store/tweetSlice"; // Ensure this is correctly imported

const AddOpinionHome = () => {
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleButtonClick = async (data) => {
    try {
      setError("");
      setIsClicked(true);

      const response = await axios.post(
        "http://localhost:8000/api/v1/tweets/",
        data,
        { withCredentials: true }
      );
      const tweet = response.data.data;
      console.log(response);
      
      dispatch(addTweet())

      if (tweet) {
        dispatch(addTweet(tweet)); // Dispatch the action to add the tweet to the store
        reset(); // Clear the form field
      }
    } catch (error) {
      setError("Failed to post the tweet. Please try again.");
      console.error(error);
    } finally {
      setIsClicked(false);
    }
  };

  return (
    <div
      className="bg-[#E9E6F3] flex flex-col lg:flex-row items-center p-4 lg:p-6"
      style={{ minHeight: "45vh" }}
    >
      <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
        <div
          className="bg-cover bg-center rounded-full"
          style={{
            width: "120px",
            height: "115px",
            backgroundImage: `url(${tweet})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row items-start lg:items-center w-full max-w-3xl lg:max-w-none">
        <div
          className="bg-[#E9E6F3] border border-[#9E8DC9] p-4 rounded-lg flex flex-col lg:flex-row items-start w-full lg:max-w-[650px] lg:items-center"
          style={{
            backgroundImage: `url(${backgroundTweet})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center mb-4 lg:mb-0 lg:mr-4">
            <div
              className="rounded-full p-1"
              style={{
                width: "90px",
                height: "90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={user ? user.avatar : tweet}
                alt="avatar"
                className="rounded-full"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <p className="mt-2 text-sm font-medium text-center">
              {user ? user.fullName : "Full Name"}
            </p>
          </div>

          <div
            className="flex-grow border-4 border-[#9E8DC9] p-4 rounded-2xl flex flex-col items-start lg:items-center"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <textarea
              placeholder="Post your opinion here..."
              className="bg-[#E9E6F3] border-none outline-none w-full h-full p-2 resize-none overflow-auto"
              {...register("content", {
                required: "content is required",
              })}
              style={{
                backgroundColor: "rgba(233, 230, 243, 0)",
                fontFamily: "inherit",
                fontSize: "inherit",
                height: "100%",
              }}
            />
          </div>

          <button
            onClick={handleSubmit(handleButtonClick)}
            className={`text-white p-2 m-3 rounded-lg flex items-center justify-center mt-4 lg:mt-0 transition-colors duration-300 ${
              isClicked ? "bg-[#5A4B9F]" : "bg-[#3777ee]"
            }`}
            disabled={isClicked}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>

      <div
        className="flex-shrink-0 flex flex-col justify-center items-center text-center mt-4 lg:mt-0"
        style={{
          fontFamily: "Ribeye Marrow",
          fontWeight: 400,
          fontSize: "24px",
          width: "100%",
          maxWidth: "200px",
        }}
      >
        <div>ANNOUNCE</div>
        <div>YOUR</div>
        <div>OPINION</div>
      </div>

      {error && <div className="text-red-500 mt-4 lg:mt-0">{error}</div>}
    </div>
  );
};

export default AddOpinionHome;
