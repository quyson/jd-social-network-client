import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FullView from "./othersAccessTrue";
import PrivateView from "./othersAccessFalse";
import { useSelector } from "react-redux";

const GetOthersPage = () => {
  const userParams = useParams();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [bio, setBio] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [friendRequestSent, setFriendRequestSent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [access, setAccess] = useState(null);
  const [friends, setFriends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/page/${userParams.id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        if (result.data.access && result.data.friends) {
          setFirstName(result.data.resultUser.first_name);
          setLastName(result.data.resultUser.last_name);
          setUsername(result.data.resultUser.username);
          setFriendList(result.data.resultUser.friendList);
          setBio(result.data.resultUser.bio);
          setDob(result.data.resultUser.dob);
          setSex(result.data.resultUser.sex);
          setPosts(result.data.resultPost);
          setFriends(true);
          setAccess(true);
          setLoading(false);
        }
        if (result.data.access && !result.data.friends) {
          setFirstName(result.data.resultUser.first_name);
          setLastName(result.data.resultUser.last_name);
          setUsername(result.data.resultUser.username);
          setFriendList(result.data.resultUser.friendList);
          setBio(result.data.resultUser.bio);
          setDob(result.data.resultUser.dob);
          setSex(result.data.resultUser.sex);
          setPosts(result.data.resultPost);
          setFriends(false);
          setAccess(true);
          setLoading(false);
        }
        if (!result.data.access) {
          if (result.data.friendRequestSent) {
            setFriendRequestSent(true);
          }
          setFriendRequestSent(false);
          setFirstName(result.data.resultUser.first_name);
          setLastName(result.data.resultUser.last_name);
          setUsername(result.data.resultUser.username);
          setBio(result.data.resultUser.bio);
          setDob(result.data.resultUser.dob);
        }
      });
  }, []);

  if (loading) {
    return <div>...Loading Page</div>;
  }

  return (
    <div>
      {access ? (
        <FullView
          firstName={firstName}
          lastName={lastName}
          username={username}
          friendList={friendList}
          bio={bio}
          dob={dob}
          posts={posts}
          sex={sex}
          friends={friends}
          friendRequestSent={friendRequestSent}
        />
      ) : (
        <PrivateView
          firstName={firstName}
          lastName={lastName}
          username={username}
          bio={bio}
          dob={dob}
          friendRequestSent={friendRequestSent}
        />
      )}
    </div>
  );
};

export default GetOthersPage;
