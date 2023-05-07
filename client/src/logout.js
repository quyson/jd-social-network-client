import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("y");
    if (localStorage.getItem("token")) {
      console.log("u");
      localStorage.setItem("token", null);
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
      <button onClick={(e) => handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
