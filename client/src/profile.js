import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [bio, setBio] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [postVis, setPostVis] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/profile", {
        headers: { Authorization: token },
      })
      .then((result) => {
        console.log(result);
        setFirstName(result.data.resultUser.first_name);
        setLastName(result.data.resultUser.last_name);
        setUsername(result.data.resultUser.username);
        setFriendList(result.data.resultUser.friendList);
        setBio(result.data.resultUser.bio);
        setDob(result.data.resultUser.dob);
        setSex(result.data.resultUser.sex);
      });
  }, []);

  return (
    <div>
      <div>{firstName}</div>
      <div>{lastName}</div>
      <div>{username}</div>
    </div>
  );
};

export default Profile;
