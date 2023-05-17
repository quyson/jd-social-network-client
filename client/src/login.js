import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./redux/slices/userSlice";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:8000/login", {
      username: username,
      password: password,
    });
    localStorage.setItem("token", response.data.token);
    if (response.data.success) {
      dispatch(setCurrentUser(response.data.username));
      navigate("/profile");
    }
  };

  useEffect(() => {
    dispatch(setCurrentUser(null));
    localStorage.setItem("token", null);
  }, []);

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
