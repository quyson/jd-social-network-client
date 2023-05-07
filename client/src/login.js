import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/login", {
      username: username,
      password: password,
    });
    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);
    setNavigate(true);
  };

  if (navigate) {
    window.location.reload();
    return <Navigate to={"/check"} />;
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label for="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label for="password">Password</label>
          <input
            name="password"
            id="password"
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Log In</button>
        </form>
      </div>
      <div>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
