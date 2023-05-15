import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const notifications = () => {
  /* const notifications = useSelector(
    (state) => state.notifications && state.notifications.notifications */
  const [visNotifications, setVisNotifications] = useState(false);

  const handleVisible = () => {
    setVisNotifications(!visNotifications);
  };
  return (
    <div>
      {notifications.length > 0 ? (
        <div onClick={handleVisible}>{notifications.length}</div>
      ) : (
        <div onClicl={handleVisible}>Notifications</div>
      )}
      {visNotifications ? {notifications.map((element) => {return(<div>{element}</div>)})} : null}
    </div>
  );
};

export default notifications;
