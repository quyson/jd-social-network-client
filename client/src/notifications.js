import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AcceptFriend from "./acceptFriend";
import { Link } from "react-router-dom";
import "./styles.css";

const Notifications = (props) => {
  const notifications = useSelector(
    (state) => state.notification && state.notification.latestNotifications
  );

  return (
    <div className="modal" id="notifModal" role={"dialog"}>
      <div className="modal-dialog modal-dialog-scrollable ">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">
              Notifications: {notifications.length}
            </h1>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {notifications.map((element) => {
              if (element.status === "friendRequest") {
                return (
                  <div className="card">
                    <div className="card-body">
                      <Link to={`/page/${element.from}`} className="link">
                        <div>{element.name} has sent you a friend request</div>
                      </Link>
                    </div>
                    <div className="card-footer">
                      <AcceptFriend id={element.from} />
                    </div>
                  </div>
                );
              } else if (element.status === "newPost") {
                return (
                  <div className="card">
                    <Link to={`/page/${element.from}`}>
                      <div className="card-body">
                        {element.name} has posted on your profile!
                      </div>
                    </Link>
                  </div>
                );
              } else if (element.status === "newComment") {
                return (
                  <div className="card">
                    <div className="card-body">
                      {element.name} has commented on your post!
                    </div>
                  </div>
                );
              } else if (element.status === "likeComment") {
                return (
                  <div className="card">
                    <div className="card-body">
                      {element.name} has liked your comment!
                    </div>
                  </div>
                );
              } else if (element.status === "likePost") {
                return (
                  <div className="card">
                    <div className="card-body">
                      {element.name} has liked your post!
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="card">
                    <div className="card-body">
                      You are now friends with {element.name}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
