import React from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FriendButton = (props) => {
  const userParams = useParams();
  const [friendRequestSent, setFriendRequestSent] = useState(
    props.friendRequestSent
  );

  const handleRequest = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/page/request/${userParams.id}`,
        { status: "friendRequest" },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        console.log(result.data.success);
        setFriendRequestSent(true);
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/request/cancel/${userParams.id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        console.log(result.data.success);
        setFriendRequestSent(false);
      });
  };

  return (
    <div>
      {friendRequestSent ? (
        <button onClick={handleCancel}>Cancel Request</button>
      ) : (
        <button onClick={handleRequest}>Add Friend</button>
      )}
    </div>
  );
};

export default FriendButton;
