import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AcceptFriend from "./acceptFriend";
import { Link } from "react-router-dom";

const Notifications = () => {
  const notifications = useSelector(
    (state) => state.notification && state.notification.latestNotifications
  );

  const [visNotifications, setVisNotifications] = useState(false);

  const handleVisible = () => {
    setVisNotifications(!visNotifications);
  };

  return (
    <div>
      {notifications.length > 0 && notifications ? (
        <div onClick={handleVisible}>
          <div>{notifications.length}</div>
        </div>
      ) : (
        <div onClick={handleVisible}>Notifications</div>
      )}
      {visNotifications && (
        <div>
          <h1>Notifications: {notifications.length}</h1>
          {notifications.map((element) => {
            if (element.status === "friendRequest") {
              return (
                <div>
                  <Link to={`/page/${element.from}`}>
                    <div>{element.name} has sent you a friend request</div>
                  </Link>
                  <AcceptFriend id={element.from} />
                </div>
              );
            } else if (element.status === "newPost") {
              return <div>{element.name} has posted on your profile!</div>;
            } else if (element.status === "newComment") {
              return <div>{element.name} has commented on your post!</div>;
            } else if (element.status === "likeComment") {
              return <div>{element.name} has liked your comment!</div>;
            } else if (element.status === "likePost") {
              return <div>{element.name} has liked your post!</div>;
            } else {
              return <div>You are now friends with {element.name}</div>;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
