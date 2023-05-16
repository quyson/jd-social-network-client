import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import tokenSlice from "./slices/tokenSlice";
import notificationsSlice from "./slices/notificationsSlice";

const reducer = combineReducers({
  user: userSlice,
  token: tokenSlice,
  notification: notificationsSlice,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
