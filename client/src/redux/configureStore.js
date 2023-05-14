import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import tokenSlice from "./slicers/tokenSlice";

const reducer = combineReducers({
  currentUser: userSlice,
  currentToken: tokenSlice,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
