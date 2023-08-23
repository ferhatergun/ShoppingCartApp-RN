import { createSlice } from "@reduxjs/toolkit";
import storage from "../storage";

// Başlangıç durumu
const initialState = {
  user: false,
  token: false,
};

// Eğer depolamadan gelen veriler varsa, bu işlevi kullanarak başlangıç durumu güncelle
const getInitialUser = async () => {
  const data = await storage.load({
    key: "user"
  });
  return data.userId;
};

const getInitialToken = async () => {
  const data = await storage.load({
    key: "user"
  });
  return data.token;
};

// İlk değerleri asenkron olarak alarak başlangıç durumunu güncelle
initialState.user = getInitialUser() || false;
initialState.token = getInitialToken() || false;

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
  }
});

export const { updateToken, updateUser } = userSlice.actions;

export default userSlice.reducer;
