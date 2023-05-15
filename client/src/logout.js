import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/slices/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      dispatch(setCurrentUser(null));
      navigate("/");
    } else {
      const result = await axios.post("http://localhost:8000/logout");
      if (result.data.logout) {
        navigate("/");
      } else {
        navigate("/");
        return;
      }
    }
  };

  return (
    <div>
      <button onClick={(e) => handleLogout(e)}>Log Out</button>
    </div>
  );
};

export default Logout;
