import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Timeline = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/timeline`, {
        headers: { Authorization: token },
      })
      .then((result) => console.log(result));
  });
  return <div>yo</div>;
};

export default Timeline;
