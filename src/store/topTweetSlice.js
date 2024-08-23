import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: [], // Array to hold tweets
    status: false, // Status to indicate if tweets are loaded
};

const tweetSlice = createSlice({
    name: "topTweets",
    initialState,
    reducers: {
        addTopTweets: (state, action) => {
            state.tweets = action.payload; // Set the tweets array with fetched tweets
            state.status = true; // Indicate that tweets are loaded
        },
        removeTopTweets: (state) => {
            state.tweets = []; // Clear all tweets
            state.status = false; // Reset the status to false
        }
    }
});

export const { addTopTweets,removeTopTweets } = tweetSlice.actions;

export default tweetSlice.reducer;
