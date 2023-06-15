import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotifications } from "./redux/slices/notificationsSlice";
import CreatePost from "./createPost";
import Homebar from "./homebar";
import Friendbar from "./friendBar";
import Post from "./post";

const Timeline = () => {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState(null);
  const [writeComment, setWriteComment] = useState(null);
  const currentUser = useSelector(
    (state) => state.user && state.user.currentUser
  );

  const [currentPostModal, setCurrentPostModal] = useState(null);

  const handleCurrentPostModal = (post) => {
    setCurrentPostModal(post);
  };

  const handleClosePostModal = () => {
    setCurrentPostModal(null);
    console.log(currentPostModal);
  };

  const dispatch = useDispatch();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/timeline`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        setPosts(result.data.friendPosts.reverse());
        setFriends(result.data.friends);
      });
    axios
      .get("http://localhost:8000/notifications", {
        headers: { Authorization: token },
      })
      .then((result) => {
        dispatch(setNotifications(result.data.notifications.reverse()));
      });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 bg-dark border-right border-white">
          <Homebar />
        </div>
        <div className="col-7 bg-dark d-flex flex-column">
          {currentPostModal && (
            <Post
              currentPostModal={currentPostModal}
              handleClosePostModal={handleClosePostModal}
              username={currentUser}
            />
          )}
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
          <div className="d-flex flex-column align-items-center">
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
                      {currentUser == element.user.username ? (
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
                              {element.user.username} -{" "}
                              {element.user.first_name} {element.user.last_name}
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
                              {element.user.username} -{" "}
                              {element.user.first_name} {element.user.last_name}
                            </div>
                          </Link>
                        </div>
                      )}
                      <div className="card-body" style={{ minHeight: "25%" }}>
                        <div className="card-text">
                          <div>{element.message}</div>
                        </div>
                      </div>

                      <div className="border-top border-bottom border-dark">
                        <div className="pl-4 ">{element.likes} Likes</div>
                      </div>
                      <div className="row font-weight-bold">
                        <div
                          className="col p-3 border-right  border-dark "
                          style={{ textAlign: "center" }}
                        >
                          Like
                        </div>
                        <div
                          className="col p-3 border-right  border-dark"
                          style={{ textAlign: "center" }}
                        >
                          Share
                        </div>
                        <div
                          className="col p-3 "
                          style={{ textAlign: "center" }}
                        >
                          Comment
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <div className="col-2 border-left border-white bg-dark">
          {friends ? <Friendbar friends={friends} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
