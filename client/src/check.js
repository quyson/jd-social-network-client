import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Check = () => {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/check").then((result) => {
      setUser(result.user);
      setMessage(result.message);
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
