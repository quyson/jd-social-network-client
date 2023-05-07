import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Logout = () => {
  const [navigate, setNavigate] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      localStorage.setItem("token", null);
      setNavigate(true);
    } else {
      const result = await axios.post("http://localhost:8000/logout");
      if (result.logout) {
        setNavigate(true);
      } else {
        return;
      }
    }
  };

  if (navigate) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <button onClick={(e) => handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
