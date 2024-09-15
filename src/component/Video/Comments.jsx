import React, { useState, useEffect } from "react";
import { FaThumbsUp, FaReply } from "react-icons/fa";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const Comments = ({ commentsDetails, videoId  }) => {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [comments, setComments] = useState(commentsDetails); // Local state for comments

  const user = useSelector((state) => state.auth.userData);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        { content: newComment },
        { withCredentials: true }
      );
      
      const addedComment = response.data.data; // Adjust based on your API response structure
      setComments((prevComments) => [addedComment, ...prevComments]); // Add new comment to the local state
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async (commentId) => {
    try {
      const commentLike = await axios.post(
        `http://localhost:8000/api/v1/likes/toggle/c/${commentId}`,
        {},
        { withCredentials: true }
      );
      const status = commentLike.data.message;

      if (status === "Comment liked successfully") {
        setLikedComments((prev) => ({
          ...prev,
          [commentId]: true,
        }));
        setLikeCounts((prev) => ({
          ...prev,
          [commentId]: (prev[commentId] || 0) + 1,
        }));
      } else if (status === "Comment unliked successfully") {
        setLikedComments((prev) => ({
          ...prev,
          [commentId]: false,
        }));
        setLikeCounts((prev) => ({
          ...prev,
          [commentId]: Math.max((prev[commentId] || 0) - 1, 0),
        }));
      }
    } catch (error) {
      console.error("Error Like/unLike:", error);
    }
  };

  useEffect(() => {
    const fetchLikeCounts = async () => {
      try {
        const responses = await Promise.all(
          comments.map((comment) =>
            axios.get(
              `http://localhost:8000/api/v1/likes/count/comment/${comment._id}`,
              { withCredentials: true }
            )
          )
        );

        const counts = {};
        responses.forEach((response, index) => {
          const commentId = comments[index]._id;
          counts[commentId] = response.data.data.likeCount || 0;
        });

        setLikeCounts(counts);
      } catch (error) {
        console.error("Error fetching like counts:", error);
      }
    };

    fetchLikeCounts();
  }, [comments]);

  useEffect(() => {
    const checkLikedComments = async () => {
      try {
        const responses = await Promise.all(
          comments.map((comment) =>
            axios.get(
              `http://localhost:8000/api/v1/likes/isLiked/c/${comment._id}`,
              { withCredentials: true }
            )
          )
        );

        const initialLikedComments = {};
        responses.forEach((response, index) => {
          const commentId = comments[index]._id;
          initialLikedComments[commentId] = response.data.data.isLiked;
        });

        setLikedComments(initialLikedComments);
      } catch (error) {
        console.error("Error checking liked comments:", error);
      }
    };

    checkLikedComments();
  }, [comments]);

  const handleReply = async (commentId) => {
    // Implement your reply logic here
    await axios.post(`http://localhost:8000/api/v1/replies`, { commentId });
  };

  return (
    <div className="w-full bg-white rounded-lg mt-4">
      <h2 className="text-xl font-semibold pl-9 p-3 rounded-3xl bg-[#E9E6F3]  border-b">
        Comments 
      </h2>

      {/* Comment Input Area */}
      <div className="flex items-start space-x-4 p-4">
        <img
          className="w-10 h-10 rounded-full"
          src={user.avatar} // Replace with user's avatar or a placeholder
          alt="Your Avatar"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a public comment..."
            className="w-full p-2 border-2 rounded-lg border-[#CDC4E3] focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => setNewComment("")}
              className="px-4 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Existing Comments Section */}
      <div className="pb-2 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex p-4 items-start bg-[#E9E6F3] hover:bg-[#E3DEE9] space-x-4 rounded-md shadow-sm"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={comment.avatar}
              alt="Commenter Avatar"
            />
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {comment.username}{" "}
                <span className="text-xs text-gray-500">
                  ~ {moment(comment.createdAt).fromNow()}{" "}
                </span>
              </p>
              <p className="text-gray-700 text-sm">{comment.content}</p>
              <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                <button
                  className={`flex items-center space-x-1 ${
                    likedComments[comment._id] ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => handleLike(comment._id)}
                >
                  <FaThumbsUp className="w-4 h-4" />
                  <span>{likeCounts[comment._id] || 0}</span>
                </button>
                <button
                  className="flex items-center space-x-1 text-blue-600"
                  onClick={() => handleReply(comment._id)}
                >
                  <FaReply className="w-4 h-4" /> <span>Reply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
