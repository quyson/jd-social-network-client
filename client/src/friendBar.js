import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Friendbar = (props) => {
  const [friends, setFriends] = useState(props.friends);
  return (
    <div>
      <h1>Friends</h1>
      <ul>
        {friends
          ? friends.map((friend) => {
              return (
                <Link to={`/pages/${friend._id}`}>
                  <li>{friend.first_name + " " + friend.last_name}</li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default Friendbar;
