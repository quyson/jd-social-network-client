import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Friendbar = (props) => {
  const [friends, setFriends] = useState(props.friends);
  console.log(friends);
  return (
    <div className="pt-3" style={{ color: "white" }}>
      <h4 className="font-weight-bold border-bottom border-white mb-3 p-1">
        Friends
      </h4>
      <div>
        {friends ? (
          friends.map((friend) => {
            return (
              <Link to={`/pages/${friend._id}`}>
                <div className="mb-2 font-weight-bold">
                  {friend.first_name + " " + friend.last_name}
                </div>
              </Link>
            );
          })
        ) : (
          <div>no friends</div>
        )}
      </div>
    </div>
  );
};

export default Friendbar;
