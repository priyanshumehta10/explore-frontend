import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import tweetSlice from './tweetSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        tweets : tweetSlice,
        //TODO: add more slices here for posts
    }
});


export default store;