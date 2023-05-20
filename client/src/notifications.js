import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import AcceptFriend from "./acceptFriend";

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
        <div onClick={handleVisible}>{notifications.length}</div>
      ) : (
        <div onClick={handleVisible}>Notifications</div>
      )}
      {visNotifications
        ? notifications.map((element) => {
            if (element.status == "friendRequest") {
              return (
                <div>
                  <div>{element.name} has sent you a friend request</div>
                  <AcceptFriend id={element.from} />
                </div>
              );
            } else if (element.status == "newPost") {
              return <div>{element.name} has posted on your profile!</div>;
            } else if (element.status == "newComment") {
              return <div>{element.name} has commented on your post!</div>;
            } else {
              return <div>You are now friends with {element.name}</div>;
            }
          })
        : null}
    </div>
  );
};

export default Notifications;
