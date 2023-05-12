import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FriendButton = (props) => {
  const userParams = useParams();

  const handleRequest = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/page/request/${userParams.id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        console.log(result.data.success);
      });
  };
  return (
    <div>
      <button onClick={handleRequest}>Add Friend</button>
    </div>
  );
};

export default FriendButton;
