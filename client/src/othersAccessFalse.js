import React from "react";
import axios from "axios";
import { useState } from "react";
import FriendButton from "./friendButton";

const PrivateView = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [dob, setDob] = useState(props.dob);

  return (
    <div>
      <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{username}</div>
        <div>{bio}</div>
        <div>{dob}</div>
      </div>
      <FriendButton />
    </div>
  );
};

export default PrivateView;
