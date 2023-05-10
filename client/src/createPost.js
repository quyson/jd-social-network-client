import React from "react";
import axios from "axios";
import { useState } from "react";

const CreatePost = () => {
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:8000/createPost",
        { message: message },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="message"
        id="message"
        placeholder="What's on your mind?"
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button>Post</button>
    </form>
  );
};

export default CreatePost;
