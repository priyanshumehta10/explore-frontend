import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
// import tweetSlice from './tweetSlice';
import topTweetSlice from './topTweetSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        // tweets : tweetSlice,
        topTweets:topTweetSlice
        //TODO: add more slices here for posts
    }
});


export default store;