import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LikePost from "./likePost";
import LikeComment from "./likeComment";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Post = (props, handleCloseModal) => {
  const [writeComment, setWriteComment] = useState(null);

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
    <div className="modal" id="postModal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {props.username == props.currentPostModal.user.username ? (
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
                  <div className="font-weight-bold" style={{ color: "black" }}>
                    {props.currentPostModal.user.username} -{" "}
                    {props.currentPostModal.user.first_name}{" "}
                    {props.currentPostModal.user.last_name}
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className="card-header d-flex align-items-center"
                style={{ gap: "1rem" }}
              >
                <Link to={`/pages/${props.currentPostModal.user._id}`}>
                  <div
                    className="rounded-circle bg-light"
                    style={{ height: "3rem", width: "3rem" }}
                  ></div>
                </Link>
                <Link to={`/pages/${props.currentPostModal.user._id}`}>
                  <div className="font-weight-bold" style={{ color: "black" }}>
                    {props.currentPostModal.user.username} -{" "}
                    {props.currentPostModal.user.first_name}{" "}
                    {props.currentPostModal.user.last_name}
                  </div>
                </Link>
              </div>
            )}
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => props.handleCloseModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{props.currentPostModal.message}</p>
            <div className="border-top border-bottom border-dark">
              <div className="pl-4 ">{props.currentPostModal.likes} Likes</div>
            </div>
            <div className="col p-3">
              <LikePost postId={props.currentPostModal._id} />
            </div>
            <div className="container p-3">
              {props.currentPostModal.comments
                ? props.currentPostModal.comments.map((comment) => {
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
                          >{`${props.currentPostModal.user.username} (${props.currentPostModal.user.first_name} ${props.currentPostModal.user.last_name})`}</div>
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
                  onSubmit={(e) => handleComment(props.currentPostModal._id, e)}
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
        </div>
      </div>
    </div>
  );
};

export default Post;
