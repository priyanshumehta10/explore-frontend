import React, { useState } from "react";
import tweet from "../../assets/tweet.png";
import { FaPaperPlane } from "react-icons/fa";
import backgroundTweet from "../../assets/backgroundTweet.png";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addTweet } from "../../store/tweetSlice";

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

      if (tweet) {
        dispatch(addTweet(tweet));
        reset({ content: "" });
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
      className="bg-[#E9E6F3] p-6 lg:p-12 flex flex-col lg:flex-row items-center lg:justify-between"
      style={{ minHeight: "35vh" }}
    >
      {/* Logo Section for Large Screens */}
      <div className="hidden lg:flex flex-col items-center mr-8">
        <div
          className="bg-cover bg-center rounded-full"
          style={{
            width: "150px",
            height: "145px",
            backgroundImage: `url(${tweet})`,
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col lg:flex-row items-center w-full max-w-5xl">
        <div
          className="relative bg-[#E9E6F3] border border-[#9E8DC9] p-6 rounded-lg flex flex-col lg:flex-row items-start lg:items-center w-full"
          style={{
            backgroundImage: `url(${backgroundTweet})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Avatar and Text Section */}
          <div className="flex items-center mb-4 lg:mb-0 lg:mr-6">
            {/* Avatar */}
            <div className="rounded-full p-1 flex flex-col items-center justify-center">
              <img
                src={user ? user.avatar : tweet}
                alt="avatar"
                className="rounded-full w-24 h-24"
              />
              <p className="mt-2 hidden lg:block text-center whitespace-nowrap overflow-hidden text-ellipsis text-lg">
                {user?.fullName}
              </p>
            </div>

            {/* Text Section for Small Screens */}
            <div className="ml-2 lg:hidden">
              <p className="text-sm font-medium text-center">{user ? user.fullName : "Full Name"}</p>
              <div
                className="text-center font-bold mt-2"
                style={{
                  fontFamily: "Ribeye Marrow",
                  fontWeight: 400,
                  fontSize: "42px",
                }}
              >
                ANNOUNCE YOUR OPINION
              </div>
            </div>
          </div>

          {/* Textarea and Button */}
          <div className="flex-grow lg:max-w-[500px] w-full"> {/* Increased max width */}
            <textarea
              placeholder="Post your opinion here..."
              className="w-full h-40 p-3 bg-transparent border-none outline-none resize-none overflow-auto"
              {...register("content", {
                required: "Content is required",
              })}
              style={{ fontFamily: "inherit", fontSize: "18px" }}
            />
          </div>

          <button
            onClick={handleSubmit(handleButtonClick)}
            className={`text-white p-4 ml-auto rounded-lg flex items-center  justify-center transition-colors duration-300 text-xl ${ // Increased padding and font size
              isClicked ? "bg-[#5A4B9F]" : "bg-[#3777ee]" 
            }`}
            disabled={isClicked}
          >
            <FaPaperPlane size={24} /> {/* Increased icon size */}
          </button>
        </div>
      </div>

      {/* "Announce Your Opinion" for Large Screens */}
      <div
        className="hidden lg:flex flex-col items-center text-center mt-4 lg:mt-0"
        style={{
          fontFamily: "Ribeye Marrow",
          fontWeight: 400,
          fontSize: "30px",
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
