import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaComment, FaEdit, FaTrash } from "react-icons/fa";
import { deleteTweet, updateTweet } from "../../store/tweetSlice";
import moment from "moment";

const OpinionCart = ({ opinion }) => {
  const [liked, setLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(opinion.content);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userData._id);
  const ownerId = opinion.owner;

  useEffect(() => {
    const fetchIsLiked = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/likes/isLiked/t/${opinion._id}`,
          { withCredentials: true }
        );
        setLiked(response.data.data.isLiked);
      } catch (error) {
        console.error("Error fetching like status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIsLiked();
  }, [opinion._id]);

  const handleLikeClick = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/t/${opinion._id}`,
        {},
        { withCredentials: true }
      );
      setLiked(!liked);
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("Failed to toggle like. Please try again.");
    }
  };

  const handleCommentClick = () => {
    // Implement comment handling logic here
  };

  const handleEditClick = async () => {
    if (isEditing) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/v1/tweets/${opinion._id}`,
          { content: value },
          { withCredentials: true }
        );
        const contentData = response.data.data
        console.log("Tweet updated:", contentData);
        dispatch(updateTweet(contentData))
      } catch (error) {
        console.error("Error updating tweet:", error);
        alert("Failed to update tweet. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/tweets/${opinion._id}`, {
        withCredentials: true,
      });
      dispatch(deleteTweet(opinion._id));
    } catch (error) {
      console.error("Error deleting tweet:", error);
      alert("Failed to delete tweet. Please try again.");
    }
  };

  return (
    <div className="bg-[#E9E6F3] p-4 rounded-lg shadow-md flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
      <div className="flex items-start md:items-center w-full md:w-auto">
        <img
          src={opinion.avatar}
          alt={`${opinion.username}'s avatar`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-800">{opinion.username}</p>
            <p className="text-gray-600 text-sm pl-5">
              ~{moment(opinion.createdAt).fromNow()}
            </p>
          </div>
          {isEditing ? (
            <input
              type="text"
              className="text-gray-600 text-sm mt-2 p-2 border border-gray-300 rounded-md w-full"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <p className="text-gray-600 text-sm mt-2">{opinion.content}</p>
          )}
        </div>
      </div>

      <div className="flex space-x-4 w-full md:w-auto justify-around md:justify-end items-center">
        <button
          onClick={handleLikeClick}
          className={`flex items-center justify-center transition-transform duration-200 ${
            liked ? "transform scale-125 text-red-500" : "transform scale-100 text-gray-500"
          }`}
        >
          <FaHeart className="w-6 h-6" />
        </button>

        <button
          onClick={handleCommentClick}
          className="flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors duration-200"
        >
          <FaComment className="w-6 h-6" />
        </button>

        {userId === ownerId && (
          <>
            <button
              onClick={handleEditClick}
              className="flex items-center justify-center text-gray-500 hover:text-green-500 transition-colors duration-200"
            >
              <FaEdit className="w-6 h-6" />
            </button>

            <button
              onClick={handleDeleteClick}
              className="flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              <FaTrash className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OpinionCart;
