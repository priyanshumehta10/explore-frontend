import React, { useEffect,useState }  from "react";
import { useSelector,useDispatch } from "react-redux";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import backgroundTweet from "../../assets/backgroundTweet.png";
import { clearTweets, setTweets } from "../../store/tweetSlice";
import axios from "axios";

const ViralOpinions = () => {
  const [loading, setLoading] = useState(true);
  const [openion,setOpenion] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchCurrentOpenions = async () => {
      console.log('Fetching current user'); // Log when fetchCurrentUser is called
      try {
        const response = await axios.get('http://localhost:8000/api/v1/tweets/', { withCredentials: true });
        const userData = response.data.data;
        setOpenion(userData)
  
        if (userData) {
          dispatch(setTweets(userData)); // Dispatch login action with user data
        } else {
          dispatch(clearTweets()); // Log out if no user data is returned
        }
      } catch (error) {
        console.error('Error fetching current user:', error);
        dispatch(clearTweets()); // Log out on error
      } finally {
        setLoading(false); // End loading state
      }
    };
  
    fetchCurrentOpenions(); // Call the function on component mount
  }, []); 
  const viralOpinions = useSelector((state) => state.tweets.setTweets);

  return (
    <div
      className="bg-[#E9E6F3] flex flex-col items-center p-4 lg:p-6"
      style={{ minHeight: "45vh" }}
    >
      <h2
        className="text-center text-2xl font-bold mb-6"
        style={{ fontFamily: "Ribeye Marrow" }}
      >
        Viral Opinions
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {openion.length > 0 ? (
          openion.map((opinion, index) => (
            <div
              key={index}
              className="bg-[#E9E6F3] border border-[#9E8DC9] p-4 rounded-lg m-4 w-full max-w-xs flex flex-col items-center"
              style={{
                backgroundImage: `url(${backgroundTweet})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                className="rounded-full p-1 mb-4"
                style={{
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={opinion.userAvatar}
                  alt="User Avatar"
                  className="rounded-full"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <p className="text-lg font-medium text-center mb-2">
                {opinion.userName}
              </p>
              <p className="text-sm text-center mb-4">{opinion.content}</p>
              <div className="flex justify-around w-full">
                <button
                  className="text-blue-500 flex items-center justify-center"
                >
                  <FaThumbsUp className="mr-1" /> {opinion.likes}
                </button>
                <button
                  className="text-blue-500 flex items-center justify-center"
                >
                  <FaComment className="mr-1" /> {opinion.comments}
                </button>
              </div>
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
