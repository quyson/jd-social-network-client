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
        <div className="flex gap-2 py-2">
          <button
            className="p-1 rounded-full border-2 border-white hover:bg-blue-600"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="p-1 rounded-full border-2 border-white  hover:bg-blue-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      ) : (
        <div>{requestMessage}</div>
      )}
    </div>
  );
};

export default AcceptFriend;
