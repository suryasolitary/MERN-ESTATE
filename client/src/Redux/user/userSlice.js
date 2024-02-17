import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentuser: null,
  Error: null,
  Loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.Loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.Error = null;
      state.Loading = false;
    },
    signinFailure: (state, action) => {
      state.Error = action.payload;
      state.Loading = false;
    },
  },
});

export const { signinStart, signinSuccess, signinFailure } = userSlice.actions;

export default userSlice.reducer;
