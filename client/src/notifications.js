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
                  <AcceptFriend id={element.id} />
                </div>
              );
            }
          })
        : null}
    </div>
  );
};

export default Notifications;
