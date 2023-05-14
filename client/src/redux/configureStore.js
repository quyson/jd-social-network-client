import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const reducer = combineReducers({
    currentUser: userSlice,
    currentToken: 
})

const store = configureStore({
	reducer: reducer
});


export default store

