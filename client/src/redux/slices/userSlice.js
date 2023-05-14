import { createSlice, configureStore } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null },
  reducers: {
    setUsername: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
