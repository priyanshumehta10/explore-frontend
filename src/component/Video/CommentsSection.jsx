import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments";
import SkeletonComments from "../skeleton/SkeletonComments";

const CommentsSection = ({ videoId, page, setPage, commentsCount }) => {
  const [commentsDetails, setCommentsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/comments/${videoId}?page=${page}&limit=10`,
          { withCredentials: true }
        );
        setCommentsDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId, page]);

  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(commentsCount / 10)) {
      setPage(newPage); // Trigger fetching comments for the new page
  
      // Optimistic update: Clear the current comments and show a loading state
      setCommentsDetails([]);
      setLoading(true);
  
      try {
        // Fetch the new comments data
        const response = await axios.get(
          `http://localhost:8000/api/v1/comments/${videoId}?page=${newPage}&limit=10`,
          { withCredentials: true }
        );
        setCommentsDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <SkeletonComments />;
  }

  return (
    <div>
      <Comments commentsDetails={commentsDetails} videoId={videoId} />
      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(commentsCount / 10) }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-1 px-3 py-1 rounded-md ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CommentsSection);
