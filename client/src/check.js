import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Check = () => {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:8000/check", { headers: { Authorization: token } })
      .then((result) => {
        setUser(result.data.user.username);
        setMessage(result.data.message);
      });
  }, []);
  return (
    <div>
      <div>{user}</div>
      <div>{message}</div>
    </div>
  );
};

export default Check;
