import React from "react";
import axios from "axios";
import { useState } from "react";

const AcceptFriend = (props) => {
  const [userId, setUserId] = useState(props.id);
  const [requestMessage, setRequestMessage] = useState(null);
  const handleAccept = () => {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `http://localhost:8000/request/accept/${userId}`,
        {},
        { headers: { Authorization: token } }
      )
      .then((result) => {
        setRequestMessage("Accepted Request");
      });
  };
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `http://localhost:8000/request/accept/${userId}`,
        {},
        { headers: { Authorization: token } }
      )
      .then((result) => {
        setRequestMessage("Deleted Request");
      });
  };
  return (
    <div>
      {!requestMessage ? (
        <div>
          <button onClick={handleAccept}>Accept</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>{requestMessage}</div>
      )}
    </div>
  );
};

export default AcceptFriend;
