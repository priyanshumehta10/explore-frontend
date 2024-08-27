import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: []
}

const authSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        removeData: (state) => {
            state.status = false;
            state.userData = null;
        }
     }
})

export const {addData, removeData} = authSlice.actions;

export default authSlice.reducer;