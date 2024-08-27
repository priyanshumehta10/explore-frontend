import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import VideoCart from "../home/VideoCart";

const Trending = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const TrendingVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/videos/trending`,
          { withCredentials: true }
        );
        const TrendingVideos = response.data.data;
        console.log(TrendingVideos);
        setVideos(TrendingVideos);
      } catch (error) {
        console.error("Error fetching opinions:", error);
      } finally {
        setLoading(false);
      }
    };
    TrendingVideo();
  }, [dispatch]);


  return (
    <div>
      <VideoCart videos={videos}  />
    </div>
  );
};

export default Trending;
