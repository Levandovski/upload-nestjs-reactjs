import { createSlice } from "@reduxjs/toolkit";

interface IAuthenticate {
  authenticate: boolean;
}

const initialState: IAuthenticate = {
  authenticate: false,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addAuthenticate: (state: IAuthenticate, action: { payload: boolean }) => {
      state.authenticate = action.payload;
    },
    removeAuthenticate: (state: IAuthenticate) => {
      state.authenticate = initialState.authenticate;
    },
  },
});

export const { addAuthenticate, removeAuthenticate } = slice.actions;

interface ISelectAuth {
  auth: IAuthenticate;
}

export const selectAuthenticate = (state: ISelectAuth) =>
  state.auth.authenticate;

export default slice.reducer;
