import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

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
            return <div>{element}</div>;
          })
        : null}
      <div>yo</div>
    </div>
  );
};

export default Notifications;
