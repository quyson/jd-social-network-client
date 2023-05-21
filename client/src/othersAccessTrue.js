import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendButton from "./friendButton";
import Unfriend from "./unfriend";
import CreateOtherPost from "./createPostOther";
import LikePost from "./likePost";

const FullView = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [username, setUsername] = useState(props.username);
  const [friendList, setFriendList] = useState(props.friendList);
  const [bio, setBio] = useState(props.bio);
  const [dob, setDob] = useState(props.dob);
  const [sex, setSex] = useState(props.sex);
  const [posts, setPosts] = useState(props.posts);
  const [writePost, setWritePosts] = useState(null);
  const [writeComment, setWriteComment] = useState(null);
  const [friends, setFriends] = useState(props.friends);
  const [friendRequestSent, setFriendRequestSent] = useState(
    props.friendRequestSent
  );

  const handleComment = (postId, e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(postId);
    axios
      .post(
        `http://localhost:8000/post/createComment/${postId}`,
        { message: writeComment },
        {
          headers: { Authorization: token },
        }
      )
      .then((result) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        <div>{firstName}</div>
        <div>{lastName}</div>
        <div>{username}</div>
        <div>{bio}</div>
        <div>{dob}</div>
        <div>{sex}</div>
        {friends ? (
          <Unfriend friends={friends} friendRequestSent={friendRequestSent} />
        ) : (
          <FriendButton friendRequestSent={friendRequestSent} />
        )}
      </div>
      <CreateOtherPost />
      {posts
        ? posts.map((element) => {
            return (
              <div>
                <div>
                  {element.user.username} - {element.user.first_name}{" "}
                  {element.user.last_name}
                </div>
                <div>{element.message}</div>
                <div>{element.likes} likes</div>
                <div>
                  <LikePost postId={element._id} />
                </div>
                {element.comments
                  ? element.comments.map((comment) => {
                      return <div>{comment.message}</div>;
                    })
                  : null}
                <div>
                  <form onSubmit={(e) => handleComment(element._id, e)}>
                    <textarea
                      placeholder="Write a comment"
                      name="message"
                      onChange={(e) => setWriteComment(e.target.value)}
                    ></textarea>
                    <button>Comment</button>
                  </form>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default FullView;
