import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  data: {
    email: '',
    name: '',
    photo: '',
    accessToken: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.isAuthenticated = true;
      state.data.email = action.payload.data.user.email;
      state.data.name = action.payload.data.user.name;
      state.data.accessToken = action.payload.token;
      state.data.photo = action.payload.data.user.photo;
    },
    doRegister: (state, action) => {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.data.email = action.payload.data.user.email;
      state.data.name = action.payload.data.user.name;
      state.data.accessToken = action.payload.token;
      state.data.photo = action.payload.data.user.photo;
    },
  },
});

export const { doLogin, doRegister } = userSlice.actions;

export default userSlice.reducer;
