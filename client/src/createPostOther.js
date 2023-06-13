import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateOtherPost = (props) => {
  const [message, setMessage] = useState(null);
  const [firstName, setFirstName] = useState(props.firstName);
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
    <form onSubmit={handleSubmit} className="d-flex flex-grow-1">
      <textarea
        name="message"
        id="message"
        placeholder={`What would you like to tell ${firstName}?`}
        onChange={(e) => setMessage(e.target.value)}
        className="form-control"
      ></textarea>
      <button className="btn btn-primary">Post</button>
    </form>
  );
};

export default CreateOtherPost;
