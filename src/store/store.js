import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import tweetSlice from './tweetSlice';
import topTweetSlice from './topTweetSlice';
import videoSlice from './videoSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        tweets : tweetSlice,
        topTweets:topTweetSlice,
        video : videoSlice
        //TODO: add more slices here for posts
    }
});


export default store;