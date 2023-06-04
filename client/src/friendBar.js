import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Friendbar = (props) => {
  const [friends, setFriends] = useState(props.friends);
  return (
    <div className="p-4 font-bold text-stone-100 text-sm min-w-[25%]">
      <h1 className="pt-3 text-lg border-b-2 border-stone-600">Friends</h1>
      <ul className="pt-1">
        {friends
          ? friends.map((friend) => {
              return (
                <Link to={`/pages/${friend._id}`}>
                  <li className="py-3 hover:bg-stone-600 hover:rounded-lg">
                    {friend.first_name + " " + friend.last_name}
                  </li>
                </Link>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default Friendbar;
