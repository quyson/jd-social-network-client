import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import Logout from "./logout";
import Check from "./check";
import Profile from "./profile";
import Navbar from "./navbar";
import Facebook from "./facebook";
import SearchResults from "./searchResults";
import GetOthersPage from "./othersPage";
import { useSelector, useDispatch } from "react-redux";
import GetPost from "./post";
import Timeline from "./timeline";
import axios from "axios";
import { setCurrentUser } from "./redux/slices/userSlice";

const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != "null") {
      axios
        .get("http://localhost:8000/getUser", {
          headers: { Authorization: token },
        })
        .then((result) => {
          dispatch(setCurrentUser(result.data.user));
        });
    } else {
      return;
    }
  }, []);
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <div>{currentUser !== null && <Navbar />}</div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/timeline" element={<Timeline />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/search/:id" element={<SearchResults />}></Route>
        <Route path="/pages/:id" element={<GetOthersPage />}></Route>
        <Route path="/post/:id" element={<GetPost />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
