import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FriendButton from "./friendButton";
import Unfriend from "./unfriend";
import CreateOtherPost from "./createPostOther";
import LikePost from "./likePost";
import LikeComment from "./likeComment";
import Homebar from "./homebar";
import { Link } from "react-router-dom";

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
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col-9 d-flex flex-column align-items-center bg-dark">
          <div className="profile-header px-3 pt-3 border-bottom border-white">
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
                <div className="font-weight-bold">
                  {friendList.length} friends
                </div>
                {friends ? (
                  <Unfriend
                    friends={friends}
                    friendRequestSent={friendRequestSent}
                  />
                ) : (
                  <FriendButton friendRequestSent={friendRequestSent} />
                )}
              </div>
            </div>
            <div
              className="row mt-3"
              style={{ color: "white", textAlign: "center" }}
            >
              <div className="col profile-tab border-top border-left border-right border-white">
                Posts
              </div>
              <div className="col profile-tab border-top border-right border-white">
                About
              </div>
              <div className="col profile-tab border-right  border-top border-white">
                Friends
              </div>
              <div className="col profile-tab border-right  border-top border-white">
                Photos
              </div>
            </div>
          </div>
          <CreateOtherPost />
          {posts
            ? posts.map((element) => {
                return (
                  <div
                    className="card my-3 bg-secondary"
                    style={{ width: "80%" }}
                  >
                    {username == element.user.username ? (
                      <div
                        className="card-header d-flex align-items-center"
                        style={{ gap: "1rem" }}
                      >
                        <Link to={`/profile`}>
                          <div
                            className="rounded-circle bg-light"
                            style={{ height: "3rem", width: "3rem" }}
                          ></div>
                        </Link>
                        <Link to={`/profile`}>
                          <div
                            className="font-weight-bold"
                            style={{ color: "black" }}
                          >
                            {element.user.username} - {element.user.first_name}{" "}
                            {element.user.last_name}
                          </div>
                        </Link>
                      </div>
                    ) : (
                      <div
                        className="card-header d-flex align-items-center"
                        style={{ gap: "1rem" }}
                      >
                        <Link to={`/pages/${element.user._id}`}>
                          <div
                            className="rounded-circle bg-light"
                            style={{ height: "3rem", width: "3rem" }}
                          ></div>
                        </Link>
                        <Link to={`/pages/${element.user._id}`}>
                          <div
                            className="font-weight-bold"
                            style={{ color: "black" }}
                          >
                            {element.user.username} - {element.user.first_name}{" "}
                            {element.user.last_name}
                          </div>
                        </Link>
                      </div>
                    )}
                    <div className="card-body">
                      <div className="card-text">
                        <div>{element.message}</div>
                      </div>
                    </div>
                    <div className="border-top border-bottom border-dark">
                      <div className="pl-4 ">{element.likes} Likes</div>
                    </div>
                    <div className="row font-weight-bold border-bottom border-dark">
                      <div
                        className="col p-3 border-right  border-dark "
                        style={{ textAlign: "center" }}
                      >
                        <LikePost postId={element._id} />
                      </div>
                      <div
                        className="col p-3 border-right  border-dark"
                        style={{ textAlign: "center" }}
                      >
                        Share
                      </div>
                      <div className="col p-3 " style={{ textAlign: "center" }}>
                        Comment
                      </div>
                    </div>
                    <div className="container p-3">
                      {element.comments
                        ? element.comments.map((comment) => {
                            return (
                              <div
                                className="card mb-2 bg-dark p-1"
                                style={{ color: "white", fontSize: ".8rem" }}
                              >
                                <div
                                  className="d-flex align-items-center"
                                  style={{ gap: "1rem" }}
                                >
                                  <div
                                    className="rounded-circle bg-light"
                                    style={{ height: "2rem", width: "2rem" }}
                                  ></div>
                                  <div
                                    className="font-weight-bold"
                                    style={{ fontSize: ".9rem" }}
                                  >{`${element.user.username} (${element.user.first_name} ${element.user.last_name})`}</div>
                                </div>
                                <div className="card-text pl-5 pb-3">
                                  <div>{comment.message}</div>
                                </div>
                                <div
                                  className="d-flex align-items-center"
                                  style={{ gap: "1rem" }}
                                >
                                  <div>{comment.likes} Likes</div>
                                  <LikeComment commentId={comment._id} />
                                </div>
                              </div>
                            );
                          })
                        : null}
                      <div className="py-2">
                        <form
                          className="d-flex"
                          onSubmit={(e) => handleComment(element._id, e)}
                        >
                          <textarea
                            placeholder="Write a comment"
                            name="message"
                            onChange={(e) => setWriteComment(e.target.value)}
                            className="form-control"
                          ></textarea>
                          <button className="btn btn-primary">Comment</button>
                        </form>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default FullView;
