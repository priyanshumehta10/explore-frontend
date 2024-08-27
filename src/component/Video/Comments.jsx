import React, { useState } from 'react';

const Comments = ({ commentsDetails }) => {
  const [newComment, setNewComment] = useState('');
  console.log(commentsDetails);
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    console.log('New comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="w-full bg-white rounded-lg  overflow-hidden mt-4">
      <h2 className="text-xl font-semibold p-4 border-b">Comments</h2>
      <div className="p-4 space-y-4">
        {commentsDetails.map((comment) => (
          <div key={comment._id} className="flex space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={comment.avatar}
              alt="Commenter Avatar"
            />
            <div>
              <p className="font-semibold">{comment.username}</p>
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-gray-500 text-xs">{}</p>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded-lg"
          />
          <button 
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
