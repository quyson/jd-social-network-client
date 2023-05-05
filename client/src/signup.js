import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [cPassword, setCPassword] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [navigate, setNavigate] = useState(false);

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
    });

    if (result.success) {
      setNavigate(true);
    }

    if (navigate) {
      window.location.reload();
      return <Navigate to={"/"} />;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          onChange={(e) => setFirstName(e.target.value)}
        ></input>
        <label for="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          onChange={(e) => setLastName(e.target.value)}
        ></input>
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
        <label for="cPassword">Confirm Password</label>
        <input
          name="cPassword"
          id="cPassword"
          type={"password"}
          onChange={(e) => setCPassword(e.target.value)}
        ></input>
        <label for="dob">Date of Birth</label>
        <input
          type={"date"}
          name="dob"
          id="dob"
          onChange={(e) => setDob(e.target.value)}
        ></input>
        <label for="sex">Sex</label>
        <select id="sex" name="sex" onChange={(e) => setSex(e.target.value)}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Else">Other</option>
        </select>
        <button>Register</button>
      </form>
    </div>
  );
};

export default Signup;
