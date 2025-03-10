import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null, // or use an empty object {}
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    clearUserInfo: (state) => {
      state.userInfo = null; // To clear user data on logout
    },
  },
});

export const { setUserInfo, clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
