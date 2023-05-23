import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LikePost from "./likePost";
import LikeComment from "./likeComment";

const GetPost = () => {
  const userParams = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/post/${userParams.id}`)
      .then((result) => console.log(result));
  });
  return <div>FUCK YOU</div>;
};

export default GetPost;
