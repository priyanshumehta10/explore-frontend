import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [], // Array to hold tweets
    status: false, // Status to indicate if tweets are loaded
};

const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        setTweets: (state, action) => {
            state.tweets = action.payload; // Set the tweets array with fetched tweets
            state.status = true; // Indicate that tweets are loaded
        },
        addTweet: (state, action) => {
            state.tweets.push(action.payload); // Add a new tweet to the list
        },
        updateTweet: (state, action) => {
            const index = state.tweets.findIndex(tweet => tweet._id === action.payload._id);
            if (index !== -1) {
                state.tweets[index] = action.payload; // Update an existing tweet
            }
        },
        deleteTweet: (state, action) => {
            state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload);  // Remove the tweet with the matching ID
        },
        
        clearTweets: (state) => {
            state.tweets = []; // Clear all tweets
            state.status = false; // Reset the status to false
        }
    }
});

export const { setTweets, addTweet, updateTweet, deleteTweet, clearTweets, toggleLike } = tweetSlice.actions;

export default tweetSlice.reducer;
