import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [privacy, setPrivate] = useState(true);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState("Male");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cPassword != password) {
      console.log("Passwords do not match");
      return;
    }
    const result = await axios.post("http://localhost:8000/signup", {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      sex: sex,
      dob: dob,
      private: privacy,
    });

    if (result.data.success) {
      navigate("/");
    }
  };

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
        style={{ height: "50vh", width: "30vw" }}
      >
        <h2>Register</h2>
        <h5>Join the JD Social Network.</h5>
        <div className="row mb-3">
          <div className="col">
            <label for="first_name" className="sr-only">
              First Name
            </label>
            <input
              name="first_name"
              id="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              required
              placeholder="First Name"
            ></input>
          </div>
          <div className="col">
            <label for="last_name" className="sr-only">
              Last Name
            </label>
            <input
              name="last_name"
              id="last_name"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              required
              placeholder="Last Name"
            ></input>
          </div>
        </div>
        <label for="username" className="sr-only">
          Username
        </label>
        <input
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-3"
          required
          placeholder="Username"
        ></input>

        <div className="row mb-3">
          <div className="col">
            <label for="password" className="sr-only">
              Password
            </label>
            <input
              name="password"
              id="password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
              placeholder="Password"
            ></input>
          </div>
          <div className="col">
            <label for="cPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              name="cPassword"
              id="cPassword"
              type={"password"}
              onChange={(e) => setCPassword(e.target.value)}
              className="form-control"
              required
              placeholder="Confirm Password"
            ></input>
          </div>
        </div>

        <label for="private">Privacy</label>
        <select
          id="private"
          name="private"
          onChange={(e) => setPrivate(e.target.value)}
          className="custom-select mb-2"
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
        <label for="dob">Date of Birth</label>
        <input
          type={"date"}
          name="dob"
          id="dob"
          onChange={(e) => setDob(e.target.value)}
          className="mb-2"
        ></input>
        <label for="sex">Sex</label>
        <select
          id="sex"
          name="sex"
          onChange={(e) => setSex(e.target.value)}
          className="custom-select mb-2"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Else">Other</option>
        </select>
        <button className="btn btn-primary btn-block">Register</button>
      </form>
    </div>
  );
};

export default Signup;
