import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [message, setMessage] = useState(null);
  const [file, setFile] = useState(null);
  const currentUser = useSelector((state) => state && state.user.currentUser);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file ? file : null);
    formData.append("message", message ? message : " ");
    axios
      .post("http://localhost:8000/createPost", formData, {
        headers: { Authorization: token },
      })
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleSubmit} className="d-flex flex-grow-1">
      <textarea
        name="message"
        id="message"
        placeholder={`What's on your mind, ${currentUser}?`}
        onChange={(e) => setMessage(e.target.value)}
        className="form-control"
      ></textarea>
      <input type={"file"} onChange={handleFile} name={"photo"}></input>
      <button className="btn btn-primary">Post</button>
    </form>
  );
};

export default CreatePost;
