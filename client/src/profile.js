import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import CreatePost from "./createPost";
import { useSelector, useDispatch } from "react-redux";
import LikePost from "./likePost";
import LikeComment from "./likeComment";
import Homebar from "./homebar";
import { Link } from "react-router-dom";
import Post from "./post";
import "./styles.css";

const Profile = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const [bio, setBio] = useState(null);
  const [dob, setDob] = useState(null);
  const [sex, setSex] = useState(null);
  const [posts, setPosts] = useState([]);
  const [writeComment, setWriteComment] = useState(null);
  const [currentPostModal, setCurrentPostModal] = useState(null);

  const handleCurrentPostModal = (post) => {
    setCurrentPostModal(post);
  };

  const handleClosePostModal = () => {
    setCurrentPostModal(null);
    console.log(currentPostModal);
  };

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
        setPosts(result.data.resultPost.reverse());
      });
  }, []);

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

  console.log(currentPostModal);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col-9 d-flex flex-column align-items-center bg-dark">
          {currentPostModal && (
            <Post
              currentPostModal={currentPostModal}
              handleClosePostModal={handleClosePostModal}
              username={username}
            />
          )}
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
          <div
            className="align-self-center bg-dark border border-white my-4 pt-3 px-3 rounded d-flex flex-column"
            style={{ width: "75%", color: "white" }}
          >
            <div
              className="d-flex pb-3 border-bottom border-white"
              style={{ gap: "1rem" }}
            >
              <div
                className="rounded-circle bg-light"
                style={{ height: "3rem", width: "3rem" }}
              ></div>
              <CreatePost />
            </div>
            <div className="row">
              <div
                className="col py-3 border-right border-white postButton"
                style={{ textAlign: "center" }}
              >
                Live Video
              </div>
              <div
                className="col py-3  border-right border-white postButton"
                style={{ textAlign: "center" }}
              >
                Upload Photo
              </div>
              <div
                className="col py-3 postButton"
                style={{ textAlign: "center" }}
              >
                Feeling Activity
              </div>
            </div>
          </div>
          {posts
            ? posts.map((element) => {
                return (
                  <div
                    className="card my-3 bg-secondary"
                    style={{ width: "80%" }}
                    onClick={(e) => handleCurrentPostModal(element)}
                    data-toggle="modal"
                    data-target="#postModal"
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
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: "1rem" }}
                        >
                          <Link to={`/pages/${element.user._id}`}>
                            <div
                              className="font-weight-bold"
                              style={{ color: "black" }}
                            >
                              {element.user.username} -{" "}
                              {element.user.first_name} {element.user.last_name}
                            </div>
                          </Link>
                          <div
                            className="font-weight-bold"
                            style={{ fontSize: ".9rem", color: "black" }}
                          >
                            {`> ${username} (${firstName} ${lastName})`}
                          </div>
                        </div>
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
                                  >{`${comment.user.username} (${comment.user.first_name} ${comment.user.last_name})`}</div>
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

export default Profile;
