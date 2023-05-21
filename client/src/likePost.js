import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const LikePost = (props) => {
  const [postId, setPostId] = useState(props.postId);

  const handleLike = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/post/like/${postId}`,
        {},
        { headers: { Authorization: token } }
      )
      .then((result) => {
        console.log(result.data.newLikes);
      });
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default LikePost;
