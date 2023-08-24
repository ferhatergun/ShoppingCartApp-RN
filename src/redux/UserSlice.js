import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const initialState = {
  user:  false,
  token: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { updateToken, updateUser } = userSlice.actions;

export default userSlice.reducer;
