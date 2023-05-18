import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import FriendButton from "./friendButton";

const Unfriend = (props) => {
  const [friendRequestSent, setFriendRequestSent] = useState(
    props.friendRequestSent
  );
  const [friends, setFriends] = useState(props.friends);
  const userParams = useParams();
  const handleUnfriend = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/page/unfriend/${userParams.id}`,
        {},
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        console.log(result.data.success);
        setFriends(false);
      });
  };
  return (
    <div>
      {friends ? (
        <button onClick={handleUnfriend}>Friends</button>
      ) : (
        <FriendButton friendRequestSent={friendRequestSent} />
      )}
    </div>
  );
};

export default Unfriend;
