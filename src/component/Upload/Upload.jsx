import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { FaUpload, FaImage } from 'react-icons/fa';

const Upload = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (videoFile) formData.append('videoFile', videoFile);
      if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
      formData.append('title', data.title);
      formData.append('description', data.description);

      const response = await axios.post('http://localhost:8000/api/v1/videos/', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Upload Response:', response.data);
      // Handle successful upload
    } catch (error) {
      console.error('Upload Error:', error);
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-[#E9E6F3] max-w-4xl mx-auto mt-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Upload Video</h2>

      {/* Video Upload Section */}
      <div className="w-full p-4 border-dashed border-2 bg-white border-gray-300 rounded-md mb-6 flex flex-col items-center justify-center">
        {videoFile ? (
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700">{videoFile.name}</p>
            <button
              className="text-blue-600 hover:underline mt-2"
              onClick={() => setVideoFile(null)}
            >
              Remove Video
            </button>
          </div>
        ) : (
          <>
            <FaUpload className="text-gray-400 text-6xl mb-4" />
            <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
              Select Video to Upload
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  setVideoFile(e.target.files[0]);
                  setValue('videoFile', e.target.files[0]); // Use react-hook-form to update the file input
                }}
                className="hidden"
              />
            </label>
          </>
        )}
      </div>

      {/* Thumbnail Upload Section */}
      <div className="w-full p-4 border-dashed border-2 bg-white border-gray-300 rounded-md mb-6 flex flex-col items-center justify-center">
        {thumbnailFile ? (
          <div className="flex flex-col items-center">
            <p className="mb-2 text-gray-700">{thumbnailFile.name}</p>
            <button
              className="text-blue-600 hover:underline mt-2"
              onClick={() => setThumbnailFile(null)}
            >
              Remove Thumbnail
            </button>
          </div>
        ) : (
          <>
            <FaImage className="text-gray-400 text-6xl mb-4" />
            <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500">
              Select Thumbnail to Upload
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setThumbnailFile(e.target.files[0]);
                  setValue('thumbnail', e.target.files[0]); // Use react-hook-form to update the file input
                }}
                className="hidden"
              />
            </label>
          </>
        )}
      </div>

      {/* Video Details Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-6">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Video Title"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm sm:text-base md:text-lg lg:text-xl"
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Video Description"
              className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm sm:text-base md:text-lg lg:text-xl"
              rows="4"
            />
          )}
        />
        {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        {errors.description && <p className="text-red-500 text-sm">Description is required</p>}

        {/* Upload Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 text-sm sm:text-base md:text-lg lg:text-xl"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
