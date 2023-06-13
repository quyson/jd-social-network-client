import React from "react";
import axios from "axios";
import { useState } from "react";
import FriendButton from "./friendButton";
import { Link } from "react-router-dom";
import Homebar from "./homebar";

const PrivateView = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [dob, setDob] = useState(props.dob);
  const [friendRequestSent, setFriendRequestSent] = useState(
    props.friendRequestSent
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col-9 d-flex flex-column align-items-center bg-dark">
          <div className="profile-header p-3 border-bottom border-white">
            <div className="d-flex" style={{ gap: "2rem" }}>
              <div
                className="bg-white rounded-circle"
                style={{ width: "13rem", height: "13rem" }}
              ></div>
              <div style={{ color: "white" }}>
                <h1 className="font-weight-bold">{username}</h1>
                <h4 className="font-weight-bold">
                  {firstName + " " + lastName}
                </h4>
                <FriendButton friendRequestSent={friendRequestSent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateView;
