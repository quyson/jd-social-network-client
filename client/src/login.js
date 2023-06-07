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
      navigate("/timeline");
    }
  };

  useEffect(() => {
    dispatch(setCurrentUser(null));
    localStorage.setItem("token", null);
  }, []);

  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="form-group d-flex flex-column justify-content-center align-items-center"
        style={{ height: "50vh", width: "20vw" }}
      >
        <div
          className="bg-dark rounded text-light mb-4 font-weight-bold d-flex justify-content-center align-items-center"
          style={{ height: "7rem", width: "7rem", fontSize: "4rem" }}
        >
          JD
        </div>
        <h3 className=" mb-4">Please Sign In</h3>
        <label for="username" className="sr-only">
          Username
        </label>
        <input
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-4"
          placeholder="Username"
          required
        ></input>
        <label for="password" className="sr-only">
          Password
        </label>
        <input
          name="password"
          id="password"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-4"
          placeholder="Password"
          required
        ></input>
        <button
          className="btn btn-lg btn-primary btn-block btn-sm mb-2"
          type="submit"
        >
          Log In
        </button>
        <div>
          <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
