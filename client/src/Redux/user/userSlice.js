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
    UpdateuserStart: (state) => {
      state.Loading = true;
    },
    UpdateuserSuccess: (state, action) => {
      state.currentuser = action.payload;
      state.Error = null;
      state.Loading = false;
    },
    UpdateuserFailure: (state, action) => {
      state.Error = action.payload;
      state.Loading = false;
    },
    DeletedUserStart: (state) => {
      state.Loading = true;
    },
    DeletedUserSuccess: (state) => {
      state.currentuser = null;
      state.Loading = false;
      state.Error = null;
    },
    DeletedUserFailure: (state, action) => {
      state.Loading = false;
      state.Error = action.payload;
    },
    SignoutUserStart: (state) => {
      state.Loading = true;
    },
    SignoutUserSuccess: (state) => {
      state.currentuser = null;
      state.Loading = false;
      state.Error = null;
    },
    SignoutUserFailure: (state, action) => {
      state.Error = action.payload;
      state.Loading = false;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  UpdateuserStart,
  UpdateuserSuccess,
  UpdateuserFailure,
  DeletedUserStart,
  DeletedUserFailure,
  DeletedUserSuccess,
  SignoutUserStart,
  SignoutUserSuccess,
  SignoutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
