import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateOtherPost = () => {
  const [message, setMessage] = useState(null);
  const userParams = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:8000/page/createPost/${userParams.id}`,
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

export default CreateOtherPost;
