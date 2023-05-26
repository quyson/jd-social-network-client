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
        <div
          className="rounded-full w-6 h-6 bg-red-600 flex items-center justify-center font-bold"
          onClick={handleVisible}
        >
          <div>{notifications.length}</div>
        </div>
      ) : (
        <div onClick={handleVisible}>Notifications</div>
      )}
      {visNotifications && (
        <div className="fixed right-10 mt-5 bg-black border-2 border-white">
          <h1 className="py-4 px-2  text-2xl font-bold border-b-2 border-white">
            Notifications: {notifications.length}
          </h1>
          {notifications.map((element) => {
            if (element.status === "friendRequest") {
              return (
                <div className="p-4 border-b-2 border-white">
                  <Link to={`/page/${element.from}`}>
                    <div>{element.name} has sent you a friend request</div>
                  </Link>
                  <AcceptFriend id={element.from} />
                </div>
              );
            } else if (element.status === "newPost") {
              return (
                <div className="p-4 border-b-2 border-white">
                  {element.name} has posted on your profile!
                </div>
              );
            } else if (element.status === "newComment") {
              return (
                <div className="p-4 border-y-2 border-b-2 border-white">
                  {element.name} has commented on your post!
                </div>
              );
            } else if (element.status === "likeComment") {
              return (
                <div className="p-4 border-y-2 border-b-2 border-white">
                  {element.name} has liked your comment!
                </div>
              );
            } else if (element.status === "likePost") {
              return (
                <div className="p-4 border-y-2 border-b-2 border-white">
                  {element.name} has liked your post!
                </div>
              );
            } else {
              return (
                <div className="p-4 border-y-2 border-b-2 border-white ">
                  You are now friends with {element.name}
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
